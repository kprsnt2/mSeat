const fs = require('fs');

const govt = JSON.parse(fs.readFileSync('merged_govt_app.json', 'utf8')).filter(c => Object.keys(c.knownCatRanks).length > 0);
const pvt = JSON.parse(fs.readFileSync('merged_pvt_app.json', 'utf8')).filter(c => Object.keys(c.knownCatRanks).length > 0 && !c.name.includes('Minority'));
const snoMap = JSON.parse(fs.readFileSync('sno_to_cat_ranks_2026.json', 'utf8'));

let cumulativeGovtSeats = 110;
let cumulativePvtSeats = 700;

govt.forEach(c => {
  c.adjustedCatRanks = { ...c.knownCatRanks };
  for (let cat in c.knownCatRanks) {
    c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round(cumulativeGovtSeats * 0.15); // Strict 15% SC allocation
  }
*/

pvt.forEach(c => {
  c.adjustedCatRanks = { ...c.knownCatRanks };
  for (let cat in c.knownCatRanks) {
    c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round((cumulativeGovtSeats + cumulativePvtSeats) * 0.15);
  }
});

function getClosingRank(college, category) {
  let normCat = category.replace('-', '').replace('_', '');
  if (normCat === 'OPEN') normCat = 'OC';
  if (college.adjustedCatRanks && college.adjustedCatRanks[normCat]) {
    return college.adjustedCatRanks[normCat];
  }
  if (college.adjustedCatRanks && college.adjustedCatRanks['SC'] && normCat.startsWith('SC')) {
    return college.adjustedCatRanks['SC'];
  }
  return 9999999;
}

const kids = [
  { name: 'KAVVAMPALLI MANASA', sno: 5884, category: 'SC_2' },
  { name: 'ALETI POOJA', sno: 8039, category: 'SC_2' },
  { name: 'YACHARAM SAI POOJA', sno: 8333, category: 'SC_2' },
  { name: 'BOLLEPAKA DHANUSHA', sno: 11919, category: 'SC_2' }
];

/*(k => {
  const data = snoMap[k.sno];
  const catRank = data.ranks['SC_2'];
  
  let allocated = null;
  const prefs = [...govt, ...pvt].sort((a,b) => getClosingRank(a, 'SC_2') - getClosingRank(b, 'SC_2')); // Sort by Strict SC2 Cutoff
  
  for (const c of prefs) {
    const closing = getClosingRank(c, 'SC_2');
    if (catRank <= closing) {
      allocated = { college: c, closingRank: closing };
      break;
    }
  }
  
  console.log(`Candidate: ${k.name}`);
  console.log(`- State S.No: ${k.sno} | Exact SC2 Rank: ${catRank}`);
  if (allocated) {
    console.log(`- Allotted to: ${allocated.college.name} (${allocated.college.type})`);
    console.log(`- Cutoff Margin: Safe by ${allocated.closingRank - catRank} ranks (Closing SC2 Rank: ${allocated.closingRank})`);
  } else {
    console.log(`- UNALLOTTED.`);
  }
  console.log("");
});

 prefs.filter(c=>c.type==='govt').forEach(c => console.log(c.name, getClosingRank(c, 'SC_2')));