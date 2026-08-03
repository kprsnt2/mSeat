const fs = require('fs');

const list = JSON.parse(fs.readFileSync('clean_sc2_colleges.json', 'utf8'));

const candAIR = 289635;
const candScore = 393;

console.log("=== ALL 62 COLLEGES SC-2 ROUND 3 CUTOFFS ===");
console.log(`Candidate AIR: ${candAIR} | Marks: ${candScore}\n`);

let eligibleCount = 0;
let borderlineCount = 0;

list.forEach((c, index) => {
  const status = c.sc2Rank >= candAIR ? "✅ ALLOCATED / SAFE" : (c.sc2Rank >= 270000 ? "⚠️ CLOSE BORDERLINE" : "❌ CLOSED ABOVE");
  if (c.sc2Rank >= candAIR) eligibleCount++;
  if (c.sc2Rank >= 270000 && c.sc2Rank < candAIR) borderlineCount++;
  
  console.log(`${(index+1).toString().padStart(2, ' ')}. [${c.type}] SNO ${c.sno} | Rank: ${c.sc2Rank.toLocaleString()} | Marks: ${c.sc2Score} | Status: ${status} | ${c.name}`);
});

console.log(`\nSummary:`);
console.log(`- Colleges Allocated / Eligible in Round 3 (AIR <= Cutoff): ${eligibleCount}`);
console.log(`- Borderline Colleges (Close to Candidate's AIR): ${borderlineCount}`);
