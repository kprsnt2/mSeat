const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8').replace(/document\./g, '{}');
const pvtMatch = code.match(/const pvtColleges = (\[[\s\S]*?\n\]);/);
const pvtColleges = JSON.parse(pvtMatch[1]);

console.log("=== INSPECTING PVT COLLEGES SC_2 CUTOFFS IN APP.JS ===");
pvtColleges.forEach(c => {
  console.log(`${c.id}. ${c.name} | knownRanks keys:`, Object.keys(c.knownRanks || {}), '| SC_2 value:', c.knownRanks ? c.knownRanks['SC_2'] : 'NO KNOWN RANKS');
});
