# ⚕️ mSeat: Telangana MBBS Mock Counselling 2026

**mSeat** is an advanced mock counselling predictor for Telangana NEET MBBS admissions (KNRUHS). It simulates seat allocations across all 36 Government and 30 Private Medical Colleges using historical cutoffs (2024-2025 Round 3), State Merit Lists, and newly added seats for 2026.

🌐 **Live Website**: [https://mseat.kprsnt.in](https://mseat.kprsnt.in) *(or [https://mbbsseat.vercel.app](https://mbbsseat.vercel.app))*

---

## 🤖 AI & MCP Integration (How it Works)

mSeat features an integrated **AI Admission Counselor** that processes natural language queries to predict cutoffs, compare colleges, and explain seat expansion statistics.

Depending on how you run mSeat, the AI interacts with you in three different ways:

### 1. Web Mode (Vercel & Custom Domain)
When you visit the live site at [https://mseat.kprsnt.in](https://mseat.kprsnt.in), the AI Chatbot seamlessly connects to the backend OpenAI API / MCP prediction engine.
* **How to use**: Just click the floating 🤖 button in the bottom right corner and ask questions like:
  * *"what about 353 marks"*
  * *"450 marks OC category female"*
  * *"Mamata Bachupally vs CMR Medchal"*
  * *"2026 seat expansion stats"*
* **Backend**: Routes through OpenAI with function calling and full cutoff prediction tools. If no API key is provided, it falls back to the high-accuracy local rule engine.

### 2. Vercel Cloud Deployment (with OpenAI API)
Deploy effortlessly to Vercel with serverless API support:
1. Import the repository on [Vercel](https://vercel.com).
2. Under **Project Settings > Environment Variables**, add:
   * `OPENAI_API_KEY`: `your-openai-api-key`
   * *(Optional)* `OPENAI_MODEL`: `gpt-4o-mini` (or `gpt-4o`)
3. Click **Deploy**. Your live mSeat deployment will automatically use the OpenAI backend for counseling!

### 3. Full LLM Mode (Local Server with OpenAI)
For local development powered by OpenAI (`gpt-4o-mini` default), run the backend server locally:

**Setup**:
1. Clone the repository: `git clone https://github.com/kprsnt2/mSeat.git`
2. Open the directory: `cd mSeat`
3. Install dependencies: `npm install`
4. Set your OpenAI API key in your terminal:
   * **Windows (PowerShell)**: `$env:OPENAI_API_KEY="sk-your-key-here"`
   * **Mac/Linux**: `export OPENAI_API_KEY="sk-your-key-here"`
5. Start the server: `npm start` (or `node server.js`)
6. Open your browser to `http://localhost:3000`.

### 4. MCP Server Mode (For Claude Desktop / Cursor / Custom Clients)
mSeat exposes a standard **Model Context Protocol (MCP)** server that you can plug into any MCP-compatible AI assistant! 

**Two Ways to Connect**:

**A. Local Stdio (Claude Desktop)**
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "mseat": {
      "command": "node",
      "args": ["/absolute/path/to/mSeat/mseat_mcp_server.js"]
    }
  }
}
```

**B. Remote API via SSE (Server-Sent Events)**
When you run `node server.js`, it automatically hosts a full-scale MCP SSE server!
You can connect external clients or custom web applications directly to the API endpoint:
* **SSE Endpoint**: `http://localhost:3000/api/mcp/sse`
* **Message POST Endpoint**: `http://localhost:3000/api/mcp/messages`
Restart Claude Desktop, and you can now ask Claude to *"Check the Telangana SC2 medical cutoffs for 393 marks using mSeat"*!

---

## 🛠️ Built With
* **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Glassmorphism & Dark Theme)
* **Backend**: Node.js, Express
* **AI Engine**: OpenAI API (`gpt-4o-mini`) & Custom MCP fallback Engine
* **Data**: Official KNRUHS Round 3 Cutoffs & Final State Merit Lists

## ⚠️ Disclaimer
mSeat is a simulation and prediction tool. Actual ranks and allocations for official counselling may vary. Always refer to the official [KNRUHS portal](https://knruhs.telangana.gov.in) for final web options and official notifications.
