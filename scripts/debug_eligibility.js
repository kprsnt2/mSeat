const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8').replace(/document\./g, '{}');

// Evaluate isEligible for 289566 and SC_2
const govtMatch = code.match(/const govtColleges = (\[[\s\S]*?\n\]);/);
const pvtMatch = code.match(/const pvtColleges = (\[[\s\S]*?\n\]);/);

const govtColleges = JSON.parse(govtMatch[1]);
const pvtColleges = JSON.parse(pvtMatch[1]);

function getCategoryMultipliers(ocRank) {
  return { OC: 1.0, EWS: 1.15, BC_A: 2.1, BC_B: 1.3, BC_C: 1.8, BC_D: 1.25, BC_E: 1.35, SC: 2.1, SC_1: 2.8, SC_2: 2.1, SC_3: 2.0, ST: 2.0 };
}

function getClosingRank(college, category) {
  if (college.knownRanks && college.knownRanks[category] !== undefined && college.knownRanks[category] !== null) {
    return college.knownRanks[category];
  }
  if (college.knownRanks && college.knownRanks['SC'] !== undefined && college.knownRanks['SC'] !== null && category.startsWith('SC')) {
    return college.knownRanks['SC'];
  }
  const multipliers = getCategoryMultipliers(college.ocClosing);
  const multiplier = multipliers[category] || 1;
  return Math.round(college.ocClosing * multiplier);
}

function isEligible(rank, college, category) {
  const closing = getClosingRank(college, category);
  return rank <= closing;
}

console.log("=== EVALUATING ELIGIBILITY IN APP.JS ===");
console.log("AIR:", 289566, "Category: SC_2");

let gCount = 0;
govtColleges.forEach(c => {
  const closing = getClosingRank(c, 'SC_2');
  const elig = isEligible(289566, c, 'SC_2');
  if (elig) gCount++;
  console.log(`[Govt] ${c.name} | Closing: ${closing} | Elig: ${elig}`);
});

let pCount = 0;
pvtColleges.forEach(c => {
  const closing = getClosingRank(c, 'SC_2');
  const elig = isEligible(289566, c, 'SC_2');
  if (elig) pCount++;
  console.log(`[Pvt] ${c.name} | Closing: ${closing} | Elig: ${elig}`);
});

console.log(`\nGovt Eligible: ${gCount}, Pvt Eligible: ${pCount}, Total: ${gCount + pCount}`);
