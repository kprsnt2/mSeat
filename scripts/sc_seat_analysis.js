const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');

// Parse all SC candidates from merit list
const lines = meritText.split('\n');

let scCandidates = [];

// Regex to capture line entries
for (let line of lines) {
  const matches = [...line.matchAll(/(\d+)\s+(\d+)\s+(\d+)\s+(.*?)\s+(Female|Male)\s+(OBC-\s*NCL\s*\(Central List\)|General|Gen-EWS|SC|ST)\s+(\d+)/g)];
  for (let m of matches) {
    const sno = parseInt(m[1]);
    const neetRank = parseInt(m[2]);
    const rollNo = m[3];
    const name = m[4].trim();
    const gender = m[5];
    const cat = m[6].trim();
    const score = parseInt(m[7]);

    if (cat === 'SC') {
      scCandidates.push({ sno, neetRank, rollNo, name, gender, cat, score });
    }
  }
}

console.log(`Total SC Candidates in Telangana Merit List: ${scCandidates.length}`);

// SC candidates ahead of S.No 8902 (score 393, S.No 8902)
const aheadSC = scCandidates.filter(c => c.sno <= 8902);
console.log(`SC Candidates at or ahead of S.No 8902: ${aheadSC.length}`);

// Breakdown of SC candidates by score ranges
const sc550plus = scCandidates.filter(c => c.score >= 550).length;
const sc500plus = scCandidates.filter(c => c.score >= 500).length;
const sc450plus = scCandidates.filter(c => c.score >= 450).length;
const sc400plus = scCandidates.filter(c => c.score >= 400).length;
const sc393plus = scCandidates.filter(c => c.score >= 393).length;

console.log("\n=== SC CANDIDATES SCORE BREAKDOWN IN TELANGANA ===");
console.log(`SC Score >= 550 (High AIQ / Top Govt chance): ${sc550plus}`);
console.log(`SC Score >= 500 (Solid Govt Medical College): ${sc500plus}`);
console.log(`SC Score >= 450 (Govt Medical College): ${sc450plus}`);
console.log(`SC Score >= 400: ${sc400plus}`);
console.log(`SC Score >= 393 (Candidate's Score): ${sc393plus}`);

// Save SC list for analysis
fs.writeFileSync('sc_candidates.json', JSON.stringify(scCandidates, null, 2));
