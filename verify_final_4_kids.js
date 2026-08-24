const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

const kids = [
  { name: 'KAVVAMPALLI MANASA', sno: 5884, rollNo: '4202105120', rank: 232422, score: 417, gender: 'F' },
  { name: 'ALETI POOJA', sno: 8039, rollNo: '4204101570', rank: 282055, score: 396, gender: 'F' },
  { name: 'YACHARAM SAI POOJA (Your Kid)', sno: 8333, rollNo: '4204101514', rank: 289635, score: 393, gender: 'F' },
  { name: 'BOLLEPAKA DHANUSHA', sno: 11919, rollNo: '4208202445', rank: 399237, score: 355, gender: 'F' }
];

// Verify candidate profiles in TG merit
console.log('========================================================================');
console.log('FINAL STRICT VERIFICATION OF 4 CANDIDATES');
console.log('========================================================================');

const sc2Pool = candidates.filter(c => c.category === 'SC2');
sc2Pool.sort((a, b) => a.sno - b.sno);

const sc2NonAiq = sc2Pool.filter(c => !aiqByRank.has(c.neetRank));

kids.forEach((k, idx) => {
  const candInList = candidates.find(c => c.sno === k.sno || c.rollNo === k.rollNo);
  const sc2Ahead = sc2Pool.filter(c => c.sno < k.sno);
  const sc2FemAhead = sc2Ahead.filter(c => c.gender === 'F');
  
  const sc2NonAiqAhead = sc2NonAiq.filter(c => c.sno < k.sno);
  const sc2NonAiqFemAhead = sc2NonAiqAhead.filter(c => c.gender === 'F');

  console.log(`\nCandidate #${idx + 1}: ${k.name}`);
  console.log(`• Roll No: ${k.rollNo} | Score: ${k.score} | NEET AIR: ${k.rank.toLocaleString()} | State S.No: #${k.sno}`);
  console.log(`• SC-2 Category Rank: #${sc2Ahead.length + 1} (Effective after AIQ R1: #${sc2NonAiqAhead.length + 1})`);
  console.log(`• SC-2 Female Category Rank: #${sc2FemAhead.length + 1} (Effective after AIQ R1: #${sc2NonAiqFemAhead.length + 1})`);
});

// Cutoff Summary
console.log('\n========================================================================');
console.log('SEAT POOL CAPACITY VS CANDIDATE POSITIONS');
console.log('========================================================================');
console.log('Total Available SC-2 Seats (Govt + Non-Minority Pvt Cat-A):');
console.log('1. Govt SC-2 General:  172 Seats');
console.log('2. Govt SC-2 Female:    84 Seats (Total Govt: 256)');
console.log('3. Pvt SC-2 General:   122 Seats');
console.log('4. Pvt SC-2 Female:     60 Seats (Total Pvt: 182)');
console.log('Total SC-2 MBBS Seats: 438 Seats');

console.log('\nCumulative Female Capacity in SC-2:');
console.log('• Govt SC-2 Female Cap: ~84 dedicated seats + share of 172 general seats = ~170-190 female ranks');
console.log('• Total MBBS SC-2 Female Cap (Govt + Pvt): 144 dedicated female seats + ~200 general share = ~340-360 female ranks');
