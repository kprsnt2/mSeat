const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

const kidSno = 8333; // YACHARAM SAI POOJA
const ahead = candidates.filter(c => c.sno < kidSno);

console.log('========================================================================');
console.log('CANDIDATES AHEAD OF YOUR KID (S.NO 1 TO 8332)');
console.log('========================================================================');

const sc1 = ahead.filter(c => c.category === 'SC1');
const sc2 = ahead.filter(c => c.category === 'SC2');
const sc3 = ahead.filter(c => c.category === 'SC3');
const sc4 = ahead.filter(c => c.category === 'SC4');
const scOther = ahead.filter(c => c.category === 'SC');

console.log(`Total Candidates Ahead: ${ahead.length}`);
console.log(`\nSC Sub-Category Breakdown Ahead:`);
console.log(`• SC-1 (1% quota):  ${sc1.length} candidates ahead (Male: ${sc1.filter(c => c.gender==='M').length}, Female: ${sc1.filter(c => c.gender==='F').length})`);
console.log(`• SC-2 (7% quota):  ${sc2.length} candidates ahead (Male: ${sc2.filter(c => c.gender==='M').length}, Female: ${sc2.filter(c => c.gender==='F').length})`);
console.log(`• SC-3 (6% quota):  ${sc3.length} candidates ahead (Male: ${sc3.filter(c => c.gender==='M').length}, Female: ${sc3.filter(c => c.gender==='F').length})`);
console.log(`• SC-4 (1% quota):  ${sc4.length} candidates ahead (Male: ${sc4.filter(c => c.gender==='M').length}, Female: ${sc4.filter(c => c.gender==='F').length})`);
if (scOther.length > 0) console.log(`• Unspecified SC:   ${scOther.length} candidates ahead`);

console.log(`\nTotal SC Candidates Ahead: ${sc1.length + sc2.length + sc3.length + sc4.length + scOther.length}`);

// AIQ exits ahead for each SC subcategory
console.log(`\n--- AIQ Round 1 Exits Ahead ---`);
console.log(`• SC-1 AIQ Exits: ${sc1.filter(c => aiqByRank.has(c.neetRank)).length}`);
console.log(`• SC-2 AIQ Exits: ${sc2.filter(c => aiqByRank.has(c.neetRank)).length}`);
console.log(`• SC-3 AIQ Exits: ${sc3.filter(c => aiqByRank.has(c.neetRank)).length}`);
console.log(`• SC-4 AIQ Exits: ${sc4.filter(c => aiqByRank.has(c.neetRank)).length}`);

// Seat Matrix Calculation
const govtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

let govtSeats = 0;
for (let c of govtCollegesRaw) {
  if (c.name.includes('AIIMS')) continue;
  govtSeats += c.name.includes('ESIC') ? 76 : Math.round((c.intake || 100) * 0.85);
}

let pvtSeats = 0;
for (let c of pvtCollegesRaw) {
  if (c.name.includes('Minority')) continue;
  pvtSeats += Math.round((c.intake || 150) * 0.50);
}

console.log('\n========================================================================');
console.log('SEAT MATRIX COMPARISON (GOVT VS PVT)');
console.log('========================================================================');
console.log(`Govt State Quota Seats: ${govtSeats} | Pvt Cat-A Non-Minority Seats: ${pvtSeats} | Total: ${govtSeats + pvtSeats}`);

const printMatrix = (name, pct) => {
  const gTotal = Math.round(govtSeats * pct);
  const gFem = Math.round(gTotal * 0.33);
  const gGen = gTotal - gFem;

  const pTotal = Math.round(pvtSeats * pct);
  const pFem = Math.round(pTotal * 0.33);
  const pGen = pTotal - pFem;

  const total = gTotal + pTotal;
  const tFem = gFem + pFem;
  const tGen = gGen + pGen;

  console.log(`\n${name} (${pct * 100}% Reservation):`);
  console.log(`  Govt Seats:  ${gTotal} (Gen: ${gGen}, Fem: ${gFem})`);
  console.log(`  Pvt Seats:   ${pTotal} (Gen: ${pGen}, Fem: ${pFem})`);
  console.log(`  Total Seats: ${total} (Gen: ${tGen}, Fem: ${tFem})`);
};

printMatrix('SC-1 (Relli & allied)', 0.01);
printMatrix('SC-2 (Madiga & allied)', 0.07);
printMatrix('SC-3 (Mala & allied)', 0.06);
printMatrix('SC-4 (Adi Andhra & allied)', 0.01);
