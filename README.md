# ⚕️ mSeat: Telangana MBBS Mock Counselling 2026

**mSeat** is an advanced mock counselling predictor for Telangana NEET MBBS admissions (KNRUHS). It simulates seat allocations across all 36 Government and 30 Private Medical Colleges using historical cutoffs (2024-2025 Round 3), State Merit Lists, and newly added seats for 2026.

🌐 **Live Website**: [https://kprsnt2.github.io/mSeat/](https://kprsnt2.github.io/mSeat/)

---

## 🤖 AI & MCP Integration (How it Works)

mSeat features an integrated **AI Admission Counselor** that processes natural language queries to predict cutoffs, compare colleges, and explain seat expansion statistics.

Depending on how you run mSeat, the AI interacts with you in three different ways:

### 1. Static Web Mode (GitHub Pages)
When you visit the live site at `https://kprsnt2.github.io/mSeat/`, the AI Chatbot runs using a **Local MCP Engine** directly in your browser. 
* **How to use**: Just click the floating 🤖 button in the bottom right corner and ask questions like:
  * *"what about 353 marks"*
  * *"450 marks OC category female"*
  * *"Mamata Bachupally vs CMR Medchal"*
  * *"2026 seat expansion stats"*
* **Backend**: It uses a built-in NLP algorithm to extract your score, category, and intent, instantly generating predictions based on the 2026 cutoff engine without needing an OpenAI API key or backend server.

### 2. Full LLM Mode (Local Server with OpenAI)
For rich, conversational AI responses powered by `gpt-5.4-mini`, you can run the backend server locally. The server automatically routes queries through OpenAI and executes MCP tool calls.

**Setup**:
1. Clone the repository: `git clone https://github.com/kprsnt2/mSeat.git`
2. Open the directory: `cd mSeat`
3. Install dependencies: `npm install express body-parser` (if not installed)
4. Set your OpenAI API key in your terminal:
   * **Windows (PowerShell)**: `$env:OPENAI_API_KEY="sk-your-key-here"`
   * **Mac/Linux**: `export OPENAI_API_KEY="sk-your-key-here"`
5. Start the server: `node server.js`
6. Open your browser to `http://localhost:3000`. The Chat UI will automatically detect the local backend and route your queries through the OpenAI model!

### 3. MCP Server Mode (For Claude Desktop / Cursor / Other AI Agents)
mSeat exposes a standard **Model Context Protocol (MCP)** server that you can plug into any MCP-compatible AI assistant! This allows Claude or Cursor to query the Telangana medical cutoffs directly.

**Available MCP Tools**:
* `predict_college_allotment`: Predicts eligible colleges based on NEET score and category.
* `get_college_cutoffs`: Retrieves detailed round-wise cutoffs for a specific college.
* `search_merit_list`: Searches the official 2025/2026 State Merit Lists for specific candidates by Name, Roll No, or S.No.
* `compare_colleges`: Compares two medical colleges side-by-side.
* `get_seat_expansion_stats`: Returns data on the 810+ newly added MBBS seats in Telangana for 2026.

**How to connect (e.g. Claude Desktop)**:
Add the following to your `claude_desktop_config.json`:
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
Restart Claude Desktop, and you can now ask Claude to *"Check the Telangana SC2 medical cutoffs for 393 marks using mSeat"*!

---

## 🛠️ Built With
* **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Glassmorphism & Dark Theme)
* **Backend**: Node.js, Express
* **AI Engine**: OpenAI API (`gpt-5.4-mini`) & Custom MCP fallback Engine
* **Data**: Official KNRUHS Round 3 Cutoffs & Final State Merit Lists

## ⚠️ Disclaimer
mSeat is a simulation and prediction tool. Actual ranks and allocations for official counselling may vary. Always refer to the official [KNRUHS portal](https://knruhs.telangana.gov.in) for final web options and official notifications.
