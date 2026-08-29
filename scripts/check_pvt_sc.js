const fs = require('fs');
const pvtColleges = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

const candAIR = 289635;
console.log(`\n========================================================================`);
console.log(`TELANGANA PRIVATE MEDICAL COLLEGES (Govt Convenor Quota - Cat A)`);
console.log(`Candidate AIR: ${candAIR.toLocaleString()} | Score: 393 | SC / SC-2`);
console.log(`========================================================================\n`);

const eligiblePvt = [];
for (let c of pvtColleges) {
  const kr = c.knownRanks || {};
  const sc2 = kr.SC_2;
  const sc1 = kr.SC_1;
  const sc = kr.SC;

  const item = {
    name: c.name,
    place: c.place,
    SC_1: sc1 || '-',
    SC_2: sc2 || '-',
    SC_Gen: sc || '-',
    isEligible_SC2: (sc2 && sc2 >= candAIR) ? 'YES' : 'NO',
    diff: sc2 ? (sc2 - candAIR) : '-'
  };

  if (sc2 && sc2 >= candAIR) {
    eligiblePvt.push(item);
  }
}

console.log(`✅ Eligible Private Medical Colleges (Cat-A Govt Convenor Seats for SC-2): ${eligiblePvt.length} colleges`);
eligiblePvt.sort((a, b) => a.SC_2 - b.SC_2);
console.table(eligiblePvt);
