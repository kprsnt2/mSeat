#!/usr/bin/env node

/**
 * mSeat MCP Server - Model Context Protocol Server for TS MBBS Admissions
 * Provides tool capabilities for:
 * 1. predict_college_allotment
 * 2. get_college_cutoffs
 * 3. search_merit_list
 * 4. compare_colleges
 * 5. get_seat_expansion_stats
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function loadJsonData(filename) {
  const p1 = path.join(__dirname, filename);
  if (fs.existsSync(p1)) return JSON.parse(fs.readFileSync(p1, 'utf8'));
  const p2 = path.join(process.cwd(), filename);
  if (fs.existsSync(p2)) return JSON.parse(fs.readFileSync(p2, 'utf8'));
  return [];
}

const govtColleges = loadJsonData('final_accurate_govt.json');
const pvtColleges = loadJsonData('final_accurate_pvt.json');
const scoreRankData = loadJsonData('score_rank_real_points.json');

const allColleges = [
  ...govtColleges.map(c => ({ ...c, typeText: 'GOVT' })),
  ...pvtColleges.map(c => ({ ...c, typeText: 'PVT-A' }))
];

// Helper: Estimate NEET Rank & State S.No from Score
function estimateRankFromScore(score) {
  if (score >= 720) return { air: 1, stateSno: 1 };
  if (score <= 144) return { air: 1236000, stateSno: 45000 };

  const data = scoreRankData; // sorted descending
  for (let i = 0; i < data.length - 1; i++) {
    if (score <= data[i].score && score >= data[i + 1].score) {
      const sDiff = data[i].score - data[i + 1].score;
      if (sDiff === 0) return { air: data[i].minRank, stateSno: data[i].minSno };
      const rDiff = data[i + 1].minRank - data[i].minRank;
      const snoDiff = data[i + 1].minSno - data[i].minSno;
      const ratio = (data[i].score - score) / sDiff;

      return {
        air: Math.round(data[i].minRank + ratio * rDiff),
        stateSno: Math.round(data[i].minSno + ratio * snoDiff)
      };
    }
  }
  return { air: 300000, stateSno: 9000 };
}

// Tool Definitions
const TOOLS = [
  {
    name: 'predict_college_allotment',
    description: 'Predicts eligible Govt and Pvt-A MBBS colleges in Telangana for a candidate based on NEET score or AIR, category, and gender.',
    inputSchema: {
      type: 'object',
      properties: {
        neet_score: { type: 'number', description: 'NEET Score out of 720' },
        neet_rank: { type: 'number', description: 'NEET All India Rank (AIR)' },
        category: { type: 'string', description: 'Reservation Category: OC, EWS, BC_A, BC_B, BC_C, BC_D, BC_E, SC_1, SC_2, SC_3, SC, ST' },
        gender: { type: 'string', description: 'Female or Male' }
      },
      required: ['category']
    }
  },
  {
    name: 'get_college_cutoffs',
    description: 'Retrieves Round 1, 2, and 3 cutoff ranks and scores for a specific medical college.',
    inputSchema: {
      type: 'object',
      properties: {
        college_name: { type: 'string', description: 'Full or partial college name (e.g., Gandhi, Mamata, Siddipet)' },
        category: { type: 'string', description: 'Category filter (optional)' }
      },
      required: ['college_name']
    }
  },
  {
    name: 'search_merit_list',
    description: 'Searches for candidates in the Telangana State Merit List by name, roll number, or serial number.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term: Name, Roll Number, or S.No' },
        year: { type: 'string', description: '2026 (current) or 2025 (last year). Default 2026' }
      },
      required: ['query']
    }
  },
  {
    name: 'compare_colleges',
    description: 'Compares two medical colleges side-by-side on cutoffs, intake, fees, and safety margins.',
    inputSchema: {
      type: 'object',
      properties: {
        college_a: { type: 'string', description: 'First college name' },
        college_b: { type: 'string', description: 'Second college name' },
        category: { type: 'string', description: 'Category (optional)' }
      },
      required: ['college_a', 'college_b']
    }
  },
  {
    name: 'get_seat_expansion_stats',
    description: 'Returns 2026 seat expansion stats and new college additions in Telangana MBBS admissions.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Tool Executors
function handleToolCall(name, args) {
  switch (name) {
    case 'predict_college_allotment': {
      let air = args.neet_rank;
      let score = args.neet_score;
      let estStateSno = null;

      if (!air && score) {
        const est = estimateRankFromScore(score);
        air = est.air;
        estStateSno = est.stateSno;
      }
      if (!air) air = 289635;

      const catKey = (args.category || 'OC').toUpperCase().replace('-', '_');
      
      let eligibleGmc = [];
      let eligiblePvt = [];
      let borderline = [];

      allColleges.forEach(c => {
        const cutoff = c.knownRanks?.[catKey] || c.knownRanks?.SC || c.knownRanks?.OC;
        if (!cutoff || cutoff === 9999999) return;

        const diff = cutoff - air;
        const item = {
          name: c.name,
          place: c.place,
          type: c.typeText,
          cutoffRank: cutoff,
          safetyMargin: diff
        };

        if (diff >= 0) {
          if (c.typeText === 'GOVT') eligibleGmc.push(item);
          else eligiblePvt.push(item);
        } else if (diff >= -30000) {
          borderline.push(item);
        }
      });

      eligibleGmc.sort((a, b) => a.cutoffRank - b.cutoffRank);
      eligiblePvt.sort((a, b) => a.cutoffRank - b.cutoffRank);
      borderline.sort((a, b) => b.cutoffRank - a.cutoffRank);

      return {
        query: { neet_score: score, neet_rank: air, category: catKey, estimated_state_sno: estStateSno },
        summary: {
          total_eligible_gmc: eligibleGmc.length,
          total_eligible_pvt: eligiblePvt.length,
          total_borderline: borderline.length
        },
        eligible_govt_colleges: eligibleGmc,
        eligible_private_colleges: eligiblePvt,
        borderline_colleges: borderline
      };
    }

    case 'get_college_cutoffs': {
      const q = args.college_name.toLowerCase();
      const cat = args.category ? args.category.toUpperCase().replace('-', '_') : null;

      const matches = allColleges.filter(c => c.name.toLowerCase().includes(q) || c.place.toLowerCase().includes(q));

      const results = matches.map(c => {
        let ranks = c.knownRanks || {};
        if (cat && ranks[cat]) {
          ranks = { [cat]: ranks[cat] };
        }
        return {
          id: c.id,
          name: c.name,
          place: c.place,
          type: c.typeText,
          intake: c.intake,
          fees: c.typeText === 'GOVT' ? '₹29,000 / year' : `A-Cat: ₹${c.feeA || 60000}/yr, B-Cat: ₹${c.feeB || 1300000}/yr`,
          cutoffs: ranks
        };
      });

      return { count: results.length, colleges: results };
    }

    case 'search_merit_list': {
      const query = args.query.toLowerCase();
      const year = args.year || '2026';
      const meritFile = (year === '2025' || year === '2024') ? 'last_year_merit_list_final_tg_extracted.txt' : 'merit_list_tg_extracted.txt';
      const filePath = path.join(__dirname, 'docs', meritFile);
      if (!fs.existsSync(filePath)) {
        return { year: year, count: 0, results: [], error: 'Merit list file not found' };
      }
      const text = fs.readFileSync(filePath, 'utf8');

      const lines = text.split('\n');
      const matches = [];

      for (let line of lines) {
        if (line.toLowerCase().includes(query)) {
          matches.push(line.trim());
          if (matches.length >= 20) break;
        }
      }

      return { year: year, count: matches.length, results: matches };
    }

    case 'compare_colleges': {
      const qA = args.college_a.toLowerCase();
      const qB = args.college_b.toLowerCase();

      const colA = allColleges.find(c => c.name.toLowerCase().includes(qA));
      const colB = allColleges.find(c => c.name.toLowerCase().includes(qB));

      if (!colA || !colB) {
        return { error: 'Could not find one or both colleges for comparison' };
      }

      return {
        college_a: { name: colA.name, type: colA.typeText, intake: colA.intake, cutoffs: colA.knownRanks },
        college_b: { name: colB.name, type: colB.typeText, intake: colB.intake, cutoffs: colB.knownRanks }
      };
    }

    case 'get_seat_expansion_stats': {
      return {
        total_gmc_colleges: govtColleges.length,
        total_pvt_colleges: pvtColleges.length,
        total_gmc_intake: govtColleges.reduce((acc, c) => acc + (c.intake || 0), 0),
        total_pvt_intake: pvtColleges.reduce((acc, c) => acc + (c.intake || 0), 0),
        gmc_seat_increases: [
          { college: "GMC Mahabubnagar", increase: "+25 seats (175 -> 200)" },
          { college: "GMC Nizamabad", increase: "+30 seats (120 -> 150)" },
          { college: "GMC Siddipet", increase: "+25 seats (175 -> 200)" },
          { college: "RIMS Adilabad", increase: "+30 seats (120 -> 150)" }
        ],
        pvt_seat_increases: [
          { college: "Bhaskar Medical College", increase: "+50 seats (150 -> 200)" },
          { college: "Maheshwara Medical College", increase: "+100 seats (150 -> 250)" },
          { college: "Malla Reddy IMS", increase: "+50 seats (200 -> 250)" },
          { college: "Mamata Academy Bachupally", increase: "+50 seats (150 -> 200)" },
          { college: "MNR Medical College Sangareddy", increase: "+100 seats (150 -> 250)" }
        ],
        new_colleges: ["Raja Rajeshwari Institute of Medical Sciences (Girls) - 150 Seats"]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

if (require.main === module) {
  if (process.argv.includes('--test')) {
    console.log("=== TESTING MCP SERVER TOOLS DIRECTLY ===");
    console.log("Prediction Tool Output:");
    console.log(JSON.stringify(handleToolCall('predict_college_allotment', { neet_score: 393, category: 'SC_2' }), null, 2));
    console.log("\nSeat Expansion Stats:");
    console.log(JSON.stringify(handleToolCall('get_seat_expansion_stats', {}), null, 2));
    process.exit(0);
  }

  // JSON-RPC Stdio Interface for MCP
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) => {
    if (!line.trim()) return;

    try {
      const request = JSON.parse(line);
      const { id, method, params } = request;

      if (method === 'initialize') {
        const response = {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'mseat-mcp-server', version: '1.0.0' }
          }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } else if (method === 'tools/list') {
        const response = {
          jsonrpc: '2.0',
          id,
          result: { tools: TOOLS }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } else if (method === 'tools/call') {
        const { name, arguments: args } = params;
        try {
          const result = handleToolCall(name, args || {});
          const response = {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
            }
          };
          process.stdout.write(JSON.stringify(response) + '\n');
        } catch (err) {
          const response = {
            jsonrpc: '2.0',
            id,
            error: { code: -32603, message: err.message }
          };
          process.stdout.write(JSON.stringify(response) + '\n');
        }
      } else if (method === 'notifications/initialized') {
        // no-op
      } else {
        const response = {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: 'Method not found' }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      }
    } catch (err) {
      // Ignore invalid JSON
    }
  });
}

module.exports = { handleToolCall, TOOLS };
