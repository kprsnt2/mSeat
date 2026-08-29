const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const text = fs.readFileSync(path.join(docsDir, 'last_year_merit_list_final_tg_extracted.txt'), 'utf8');

const lines = text.split('\n');

let allCandidates = [];
let sc2Count = 0;
let overallScCount = 0;

// Search for candidates
let targetArpitha = null;
let targetPooja = null;
let targetSrimayi = null;

// Pattern matching for candidates in last_year_merit_list_final_tg_extracted.txt
// Line format: S.No Roll No Rank Score Grace Marks Final Score Name Gender Category EWS Minority
// Example: 6718 4203102540 260591 375 375 DAGGUPATI ARPITHA F SC2
// Example: 8758 4221101078 312829 351 351 DANTADE SRIMAYI F SC2

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Match candidate lines
  // We can search for SC1, SC2, SC3 or any candidate line
  if (line.includes('DAGGUPATI ARPITHA')) {
    targetArpitha = { lineIndex: i, text: line };
  }
  if (line.includes('SAI POOJA') || line.includes('4204101514')) {
    targetPooja = { lineIndex: i, text: line };
  }
  if (line.includes('DANTADE SRIMAYI')) {
    targetSrimayi = { lineIndex: i, text: line };
  }
}

console.log("=== TARGET CANDIDATES RAW LINES ===");
console.log("DAGGUPATI ARPITHA (Last Govt):", targetArpitha);
console.log("YACHARAM SAI POOJA (Candidate):", targetPooja);
console.log("DANTADE SRIMAYI (Last Pvt):", targetSrimayi);

// Now let's parse ALL lines chronologically from top to bottom
let parsedList = [];
let sc2RankCounter = 0;
let overallScRankCounter = 0;

// Let's write a robust parser for lines containing candidate records
for (let line of lines) {
  // Regex to extract candidate record
  // S.No (digits) ... Category (SC1|SC2|SC3|SC|ST|OC|EWS|BCA|BCB|BCC|BCD|BCE)
  const catMatch = line.match(/\b(SC1|SC2|SC3|SC|ST|OC|EWS|BCA|BCB|BCC|BCD|BCE)\b/);
  if (catMatch) {
    const cat = catMatch[1];
    const isSC = cat.startsWith('SC');
    const isSC2 = cat === 'SC2';

    if (isSC) {
      overallScRankCounter++;
    }
    if (isSC2) {
      sc2RankCounter++;
    }

    // Check if this line is one of our key candidates
    if (line.includes('DAGGUPATI ARPITHA')) {
      console.log("\nFOUND DAGGUPATI ARPITHA:");
      console.log(`- State S.No: 6718`);
      console.log(`- SC2 Category Rank: ${sc2RankCounter}`);
      console.log(`- Overall SC Category Rank: ${overallScRankCounter}`);
      console.log(`- NEET AIR: 260,591 | Score: 375`);
    }

    if (line.includes('4204101514') || line.includes('SAI POOJA')) {
      console.log("\nFOUND YACHARAM SAI POOJA:");
      console.log(`- State S.No: 8902`);
      console.log(`- SC2 Category Rank: ${sc2RankCounter}`);
      console.log(`- Overall SC Category Rank: ${overallScRankCounter}`);
      console.log(`- NEET AIR: 289,635 | Score: 393`);
    }

    if (line.includes('DANTADE SRIMAYI')) {
      console.log("\nFOUND DANTADE SRIMAYI:");
      console.log(`- State S.No: 8758`);
      console.log(`- SC2 Category Rank: ${sc2RankCounter}`);
      console.log(`- Overall SC Category Rank: ${overallScRankCounter}`);
      console.log(`- NEET AIR: 312,829 | Score: 351`);
    }
  }
}

console.log(`\nTOTAL SC2 Candidates in entire list: ${sc2RankCounter}`);
console.log(`TOTAL Overall SC Candidates in entire list: ${overallScRankCounter}`);
