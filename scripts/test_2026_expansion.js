const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8').replace(/document\./g, '{}');

// Evaluate colleges for AIR 289,635 and SC-2 category
const govtMatch = code.match(/const govtColleges = (\[[\s\S]*?\n\]);/);
const pvtMatch = code.match(/const pvtColleges = (\[[\s\S]*?\n\]);/);

const govtColleges = JSON.parse(govtMatch[1]);
const pvtColleges = JSON.parse(pvtMatch[1]);

const candAIR = 289635;
const cat = 'SC_2';

let eligibleGovt = [];
let eligiblePvt = [];

govtColleges.forEach(c => {
  const closing = c.knownRanks[cat] || c.knownRanks['SC'] || c.ocClosing;
  if (candAIR <= closing) {
    eligibleGovt.push({ name: c.name, intake: c.intake, closing });
  }
});

pvtColleges.forEach(c => {
  const closing = c.knownRanks[cat] || c.knownRanks['SC'] || c.ocClosing;
  if (candAIR <= closing) {
    eligiblePvt.push({ name: c.name, intake: c.intake, closing, seatsIncreased: c.seatsIncreased || 0 });
  }
});

console.log("================ 2026 SEAT EXPANSION TEST RESULT ================");
console.log(`Candidate AIR: ${candAIR.toLocaleString()} | Category: SC-2 | Score: 393`);
console.log(`Eligible Govt Colleges: ${eligibleGovt.length}`);
console.log(`Eligible Private (Cat-A) Colleges: ${eligiblePvt.length}`);
console.log("\nEligible Private Colleges list:");
eligiblePvt.forEach(c => {
  console.log(`  - ${c.name} (${c.intake} seats, +${c.seatsIncreased} added) | Closing Rank: ${c.closing.toLocaleString()}`);
});
