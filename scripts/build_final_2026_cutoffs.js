const fs = require('fs');

let govtColleges = JSON.parse(fs.readFileSync('merged_govt_2026.json', 'utf8'));
let pvtColleges = JSON.parse(fs.readFileSync('merged_pvt_2026.json', 'utf8'));

// Apply proportional seat expansion to cutoffs for all categories
function applyProportionalExpansion(colleges) {
  colleges.forEach(c => {
    if (c.seatsIncreased && c.knownRanks) {
      // Seat expansion ratio
      const ratio = 1 + (c.seatsIncreased / (c.intake - c.seatsIncreased)) * 0.35; // ~35% of seat percentage expands cutoff
      Object.keys(c.knownRanks).forEach(cat => {
        if (c.knownRanks[cat] && c.knownRanks[cat] !== 9999999) {
          c.knownRanks[cat] = Math.round(c.knownRanks[cat] * ratio);
        }
      });
      if (c.ocClosing) {
        c.ocClosing = Math.round(c.ocClosing * ratio);
      }
    }
  });
}

applyProportionalExpansion(govtColleges);
applyProportionalExpansion(pvtColleges);

let appContent = fs.readFileSync('app.js', 'utf8');

const govtStr = `const govtColleges = ${JSON.stringify(govtColleges, null, 2)};`;
const pvtStr = `const pvtColleges = ${JSON.stringify(pvtColleges, null, 2)};`;

appContent = appContent.replace(/const govtColleges = \[[\s\S]*?\n\];/, govtStr);
appContent = appContent.replace(/const pvtColleges = \[[\s\S]*?\n\];/, pvtStr);

fs.writeFileSync('app.js', appContent, 'utf8');
console.log("Applied final 2026 seat expansion cutoffs to app.js successfully!");
