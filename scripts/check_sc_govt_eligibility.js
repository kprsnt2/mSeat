const fs = require('fs');
const path = require('path');

// Let's check parsed_colleges.json or final_accurate_govt.json
let govtColleges = [];
if (fs.existsSync('final_accurate_govt.json')) {
  govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
} else if (fs.existsSync('merged_govt_2026.json')) {
  govtColleges = JSON.parse(fs.readFileSync('merged_govt_2026.json', 'utf8'));
} else if (fs.existsSync('merged_govt.json')) {
  govtColleges = JSON.parse(fs.readFileSync('merged_govt.json', 'utf8'));
}

console.log(`Loaded ${govtColleges.length} govt colleges.`);
console.log('Sample college:', govtColleges[0]);

// Candidate details:
// AIR: 289635 | Score: 393 | SC / SC-2 | Female | OU
const candAIR = 289635;
const candScore = 393;

// Let's inspect SC cutoffs across all colleges
console.log('\n========================================================================');
console.log(`TELANGANA GOVT MBBS COLLEGES - SC / SC-2 CUTOFF ANALYSIS`);
console.log(`Candidate AIR: ${candAIR.toLocaleString()} | Score: ${candScore} | SC-2 Female`);
console.log('========================================================================\n');

const eligible = [];
const borderline = [];
const higherCutoff = [];

for (let c of govtColleges) {
  // Check available SC rank fields
  const scRank = c.sc2Rank || c.scRank || c.sc_rank || c.scClosingRank || c.sc2_rank;
  const scScore = c.sc2Score || c.scScore || c.sc_score || c.scClosingScore || c.sc2_score;
  const name = c.cName || c.name || c.collegeName || c.college;

  if (scRank) {
    const diff = scRank - candAIR;
    const item = {
      name,
      cutoffRank: scRank,
      cutoffScore: scScore,
      diff,
      isEligible: diff >= 0
    };

    if (diff >= 0) {
      eligible.push(item);
    } else if (diff >= -25000) {
      borderline.push(item);
    } else {
      higherCutoff.push(item);
    }
  }
}

console.log(`✅ DEFINITELY ELIGIBLE GOVT COLLEGES (Cutoff Rank > ${candAIR.toLocaleString()}): ${eligible.length}`);
eligible.sort((a, b) => a.cutoffRank - b.cutoffRank);
eligible.forEach((c, idx) => {
  console.log(`${idx + 1}. ${c.name} | Cutoff AIR: ${c.cutoffRank.toLocaleString()} (Score: ${c.cutoffScore}) | Margin: +${c.diff.toLocaleString()} ranks safe`);
});

console.log(`\n⚠️ BORDERLINE / POSSIBLE IN LATER ROUNDS: ${borderline.length}`);
borderline.sort((a, b) => b.cutoffRank - a.cutoffRank);
borderline.forEach((c, idx) => {
  console.log(`${idx + 1}. ${c.name} | Cutoff AIR: ${c.cutoffRank.toLocaleString()} (Score: ${c.cutoffScore}) | Short by: ${Math.abs(c.diff).toLocaleString()} ranks`);
});

console.log(`\n❌ TOP TIER GOVT COLLEGES (Closed earlier): ${higherCutoff.length}`);
higherCutoff.sort((a, b) => b.cutoffRank - a.cutoffRank);
higherCutoff.forEach((c, idx) => {
  console.log(`${idx + 1}. ${c.name} | Cutoff AIR: ${c.cutoffRank.toLocaleString()} (Score: ${c.cutoffScore}) | Short by: ${Math.abs(c.diff).toLocaleString()} ranks`);
});
