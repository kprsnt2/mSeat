const express = require('express');
const cors = require('cors');
const path = require('path');
const { handleToolCall, TOOLS } = require('./mseat_mcp_server');
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StreamableHTTPServerTransport } = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// Tool schemas for OpenAI Function Calling
const OPENAI_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'predict_college_allotment',
      description: 'Predict eligible MBBS colleges in Telangana based on score/rank, category, and gender.',
      parameters: {
        type: 'object',
        properties: {
          neet_score: { type: 'number', description: 'NEET score out of 720' },
          neet_rank: { type: 'number', description: 'NEET AIR rank' },
          category: { type: 'string', description: 'Category: OC, EWS, BC_A, BC_B, BC_C, BC_D, BC_E, SC_1, SC_2, SC_3, SC, ST' },
          gender: { type: 'string', description: 'Female or Male' }
        },
        required: ['category']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_college_cutoffs',
      description: 'Get cutoff ranks for a specific medical college.',
      parameters: {
        type: 'object',
        properties: {
          college_name: { type: 'string', description: 'College name or place' },
          category: { type: 'string', description: 'Category filter' }
        },
        required: ['college_name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_seat_expansion_stats',
      description: 'Get 2026 seat expansion stats and new college additions.',
      parameters: { type: 'object', properties: {} }
    }
  }
];

// Helper to call OpenAI API
async function callOpenAI(messages, apiKey) {
  const payload = {
    model: OPENAI_MODEL,
    messages,
    tools: OPENAI_TOOLS,
    tool_choice: 'auto'
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

// API Chat Endpoint using OpenAI gpt-5.4-mini (with MCP fallback)
app.post('/api/chat', async (req, res) => {
  const { message, history, category, neetScore, neetRank, gender } = req.body;
  const apiKey = req.headers['x-openai-api-key'] || process.env.OPENAI_API_KEY;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Fallback to local prediction engine if no OpenAI key
  if (!apiKey) {
    try {
      const pred = handleToolCall('predict_college_allotment', {
        neet_score: parseFloat(neetScore) || 393,
        neet_rank: parseFloat(neetRank) || undefined,
        category: category || 'SC_2',
        gender: gender || 'Female'
      });

      const replyText = formatFallbackResponse(message, pred);
      return res.json({
        model: 'mseat-local-mcp-engine',
        message: replyText,
        data: pred
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Use OpenAI gpt-5.4-mini model
  try {
    const systemPrompt = `You are mSeat AI, an expert medical college admission counselor specialized in Telangana (TG) NEET MBBS Competent Authority Quota admissions.
Current Year: 2026.
Primary Model: ${OPENAI_MODEL}.

Always format your response cleanly using Markdown tables, lists, and badge indicators:
- [Safe]: Cutoff is easily cleared
- [Borderline]: Close call
- [Unlikely]: Cutoff out of range

Rules:
- State Merit S.No 8902 / 393 marks for SC2 female -> 0 GMC chance, 100% Pvt A-Category seat (Mamata Bachupally, CMR, PMR Chevella, Mahavir).
- Always be encouraging, precise, and accurate.`;

    let messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message }
    ];

    let apiRes = await callOpenAI(messages, apiKey);
    let choice = apiRes.choices?.[0]?.message;

    // Handle tool call if model requests it
    if (choice?.tool_calls?.length) {
      const toolCall = choice.tool_calls[0];
      const fnName = toolCall.function.name;
      const fnArgs = JSON.parse(toolCall.function.arguments || '{}');

      const toolResult = handleToolCall(fnName, fnArgs);

      messages.push(choice);
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult)
      });

      // Final completion after tool execution
      const finalRes = await callOpenAI(messages, apiKey);
      const finalMessage = finalRes.choices?.[0]?.message?.content || 'Prediction complete.';

      return res.json({
        model: OPENAI_MODEL,
        message: finalMessage,
        data: toolResult
      });
    }

    return res.json({
      model: OPENAI_MODEL,
      message: choice?.content || 'Prediction complete.'
    });

  } catch (err) {
    console.error("OpenAI Chat Error:", err.message);
    // Fallback on error
    const pred = handleToolCall('predict_college_allotment', {
      neet_score: parseFloat(neetScore) || 393,
      category: category || 'SC_2'
    });
    return res.json({
      model: `${OPENAI_MODEL} (fallback)`,
      message: formatFallbackResponse(message, pred),
      data: pred
    });
  }
});

// Official MCP Server Integration — Streamable HTTP (stateless, works on Vercel serverless)
function createMcpServer() {
  const server = new Server({
    name: "mseat",
    version: "1.0.0"
  }, {
    capabilities: {
      tools: {}
    }
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = handleToolCall(request.params.name, request.params.arguments || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: error.message }]
      };
    }
  });

  return server;
}

// Single /mcp endpoint handles GET, POST, DELETE — fully stateless
app.all('/mcp', async (req, res) => {
  try {
    const server = createMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,  // stateless — no session tracking needed
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);

    // Clean up after response
    res.on('close', () => {
      transport.close();
      server.close();
    });
  } catch (err) {
    console.error("MCP Request Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "MCP request failed", details: err.message });
    }
  }
});

// Keep legacy SSE endpoints alive as redirects (backward compat)
app.get('/api/mcp/sse', (req, res) => {
  res.status(200).json({
    message: "mSeat MCP server has moved to Streamable HTTP transport",
    endpoint: "/mcp",
    method: "POST"
  });
});

function formatFallbackResponse(userMsg, payload) {
  const qLower = (userMsg || '').toLowerCase();

  let conversationText = '';
  if (payload && payload.history) {
    conversationText = payload.history.filter(h => h.role === 'user').map(h => h.content).join(' ');
  }
  conversationText += ' ' + qLower;
  const fullText = conversationText.toLowerCase();

  // 1. Check for Score override in history or query
  let score = parseFloat(payload ? payload.neetScore : 393) || 393;
  const scoreMatches = fullText.match(/(\d{3})\s*(marks|score|pts)?/g);
  if (scoreMatches && scoreMatches.length > 0) {
    const lastMatch = scoreMatches[scoreMatches.length - 1];
    const match = lastMatch.match(/(\d{3})/);
    if (match && parseInt(match[1]) >= 100 && parseInt(match[1]) <= 720) {
      score = parseInt(match[1]);
    }
  }

  // 2. Check for Category override in history or query
  let catKey = (payload ? payload.category : 'SC_2') || 'SC_2';
  catKey = catKey.toUpperCase().replace('-', '_');

  const categories = ['oc', 'ews', 'bc-a', 'bca', 'bc-b', 'bcb', 'bc-c', 'bcc', 'bc-d', 'bcd', 'bc-e', 'bce', 'sc-1', 'sc1', 'sc-2', 'sc2', 'sc-3', 'sc3', 'st'];
  let latestCatIndex = -1;
  categories.forEach(cat => {
    const idx = fullText.lastIndexOf(cat);
    if (idx > latestCatIndex) {
      latestCatIndex = idx;
      if (cat === 'oc') catKey = 'OC';
      else if (cat === 'ews') catKey = 'EWS';
      else if (cat === 'bc-a' || cat === 'bca') catKey = 'BC_A';
      else if (cat === 'bc-b' || cat === 'bcb') catKey = 'BC_B';
      else if (cat === 'bc-c' || cat === 'bcc') catKey = 'BC_C';
      else if (cat === 'bc-d' || cat === 'bcd') catKey = 'BC_D';
      else if (cat === 'bc-e' || cat === 'bce') catKey = 'BC_E';
      else if (cat === 'sc-1' || cat === 'sc1') catKey = 'SC_1';
      else if (cat === 'sc-2' || cat === 'sc2') catKey = 'SC_2';
      else if (cat === 'sc-3' || cat === 'sc3') catKey = 'SC_3';
      else if (cat === 'st') catKey = 'ST';
    }
  });

  // 3. Comparison Intent
  if (qLower.includes(' vs ') || qLower.includes('versus') || qLower.includes('compare')) {
    const parts = qLower.split(/vs|versus|compare/i);
    const colA = parts[0]?.trim() || 'mamata';
    const colB = parts[1]?.trim() || 'cmr';
    const comp = handleToolCall('compare_colleges', { college_a: colA, college_b: colB, category: catKey });
    if (comp.college_a && comp.college_b) {
      const cA = comp.college_a;
      const cB = comp.college_b;
      return `### ⚖️ College Comparison (${catKey} Category)\n\n` +
        `| Metric | **${cA.name}** | **${cB.name}** |\n` +
        `| :--- | :--- | :--- |\n` +
        `| **Type** | ${cA.type} | ${cB.type} |\n` +
        `| **Intake** | ${cA.intake} Seats | ${cB.intake} Seats |\n` +
        `| **${catKey} Cutoff AIR** | ${cA.cutoffs?.[catKey] || 'N/A'} | ${cB.cutoffs?.[catKey] || 'N/A'} |\n`;
    }
  }

  // 4. Seat Stats Intent
  if (qLower.includes('seat') || qLower.includes('expansion') || qLower.includes('stats') || qLower.includes('increase')) {
    const stats = handleToolCall('get_seat_expansion_stats', {});
    let text = `### 📊 2026 Telangana MBBS Seat Expansion Stats\n\n`;
    text += `* **Total GMC Intake**: ${stats.total_gmc_intake} Seats (${stats.total_gmc_colleges} Colleges)\n`;
    text += `* **Total Pvt Intake**: ${stats.total_pvt_intake} Seats (${stats.total_pvt_colleges} Colleges)\n\n`;
    text += `#### Government Seat Increases (+110 seats):\n`;
    stats.gmc_seat_increases.forEach(s => text += `- **${s.college}**: ${s.increase}\n`);
    text += `\n#### Private Seat Increases (+350 seats):\n`;
    stats.pvt_seat_increases.forEach(s => text += `- **${s.college}**: ${s.increase}\n`);
    return text;
  }

  // 5. Run prediction tool dynamically
  const pred = handleToolCall('predict_college_allotment', { neet_score: score, category: catKey });
  const { query, summary, eligible_govt_colleges, eligible_private_colleges, borderline_colleges } = pred;

  let text = `### 🤖 mSeat AI Admission Prediction (${OPENAI_MODEL})\n\n`;
  text += `**Evaluated Profile**: Score **${score} Marks** | Est. AIR **${query.neet_rank.toLocaleString()}** | Est. State S.No **#${query.estimated_state_sno.toLocaleString()}** | Category **${catKey}**\n\n`;

  if (eligible_govt_colleges.length > 0) {
    text += `#### 🏛️ Eligible Government Medical Colleges (${eligible_govt_colleges.length}):\n`;
    eligible_govt_colleges.slice(0, 5).forEach(c => {
      text += `- **${c.name}** (${c.place}) - Cutoff AIR ${c.cutoffRank.toLocaleString()} (+${c.safetyMargin.toLocaleString()} ranks safe)\n`;
    });
    text += `\n`;
  } else {
    text += `ℹ️ *No Government Medical Colleges clear the cutoff at ${score} marks for ${catKey} category.*\n\n`;
  }

  if (eligible_private_colleges.length > 0) {
    text += `#### ✅ Eligible Private A-Category Colleges (${eligible_private_colleges.length} Total):\n\n`;
    text += `| College Name | Location | ${catKey} Cutoff AIR | Safety Margin |\n| :--- | :--- | :---: | :---: |\n`;
    eligible_private_colleges.slice(0, 6).forEach(c => {
      text += `| **${c.name}** | ${c.place} | ${c.cutoffRank.toLocaleString()} | **+${c.safetyMargin.toLocaleString()} ranks safe** |\n`;
    });
  }

  if (borderline_colleges.length > 0) {
    text += `\n#### ⚡ Upgradation / Close Call Colleges:\n`;
    borderline_colleges.slice(0, 3).forEach(c => {
      text += `- **${c.name}** (${c.type}): Cutoff AIR ${c.cutoffRank.toLocaleString()} (Short by ${Math.abs(c.safetyMargin).toLocaleString()} ranks)\n`;
    });
  }

  return text;
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 mSeat Backend & AI Chatbot Server running on http://localhost:${PORT}`);
    console.log(`🤖 LLM Model Engine configured: ${OPENAI_MODEL}`);
  });
}

module.exports = app;
