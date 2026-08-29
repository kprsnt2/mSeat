const fs = require('fs');
const govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));

const candAIR = 289635;
console.log(`Candidate AIR: ${candAIR.toLocaleString()}`);

const rows = [];
for (let c of govtColleges) {
  const kr = c.knownRanks || {};
  rows.push({
    name: c.name,
    place: c.place,
    SC_1: kr.SC_1 || '-',
    SC_2: kr.SC_2 || '-',
    SC_3: kr.SC_3 || '-',
    SC_Gen: kr.SC || '-',
    isEligible_SC2: (kr.SC_2 && kr.SC_2 >= candAIR) ? 'YES' : 'NO',
    margin_SC2: kr.SC_2 ? (kr.SC_2 - candAIR) : '-'
  });
}

console.table(rows);
