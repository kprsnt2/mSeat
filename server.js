const express = require('express');
const cors = require('cors');
const path = require('path');
const { handleToolCall } = require('./mseat_mcp_server');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.4-mini';

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

// Direct Tool Endpoint for MCP integration
app.post('/api/mcp', (req, res) => {
  const { tool, args } = req.body;
  try {
    const result = handleToolCall(tool, args || {});
    res.json({ success: true, tool, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function formatFallbackResponse(userMsg, pred) {
  const { query, summary, eligible_private_colleges, borderline_colleges } = pred;
  const cat = query.category || 'SC2';
  const score = query.neet_score || '393';
  const air = query.neet_rank || 289606;

  let text = `### 🤖 mSeat AI Admission Prediction (${OPENAI_MODEL})\n\n`;
  text += `**Candidate Profile**: Score **${score}** | AIR **${air.toLocaleString()}** | Category **${cat}**\n\n`;

  if (eligible_private_colleges.length > 0) {
    text += `#### ✅ Top Guaranteed A-Category (Convenor) Private Colleges (${eligible_private_colleges.length} Total):\n\n`;
    text += `| College Name | Location | SC2 Cutoff AIR | Safety Margin |\n| :--- | :--- | :---: | :---: |\n`;
    eligible_private_colleges.slice(0, 7).forEach(c => {
      text += `| **${c.name}** | ${c.place} | ${c.cutoffRank.toLocaleString()} | **+${c.safetyMargin.toLocaleString()} ranks safe** |\n`;
    });
  }

  if (borderline_colleges.length > 0) {
    text += `\n#### ⚡ Upgradation / Close Call Colleges:\n`;
    borderline_colleges.slice(0, 4).forEach(c => {
      text += `- **${c.name}** (${c.type}): Cutoff AIR ${c.cutoffRank.toLocaleString()} (Short by ${Math.abs(c.safetyMargin).toLocaleString()} ranks)\n`;
    });
  }

  text += `\n> **Summary**: 100% chance for A-Category Private MBBS seats in top colleges like Mamata Academy Bachupally, CMR Medchal, PMR Chevella, and Mahavir Vikarabad!`;
  return text;
}

app.listen(PORT, () => {
  console.log(`🚀 mSeat Backend & AI Chatbot Server running on http://localhost:${PORT}`);
  console.log(`🤖 LLM Model Engine configured: ${OPENAI_MODEL}`);
});
