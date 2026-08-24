const fs = require('fs');

const govt = JSON.parse(fs.readFileSync('merged_govt_app.json', 'utf8'));
const pvt = JSON.parse(fs.readFileSync('merged_pvt_app.json', 'utf8'));
const snoMap = JSON.parse(fs.readFileSync('sno_to_cat_ranks_2026.json', 'utf8'));

let cumulativeGovtSeats = 0;
let cumulativePvtSeats = 0;
const stateCatRatios = {
  OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
  BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
};

govt.forEach(c => {
  cumulativeGovtSeats += (c.seatsIncreased || 0);
  c.adjustedCatRanks = { ...c.knownCatRanks };
  for (let cat in c.knownCatRanks) {
    if (c.knownCatRanks[cat] !== 9999999) {
      c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round(cumulativeGovtSeats * (stateCatRatios[cat] || 0.117));
    }
  }
  c.ocClosingCatRank = (c.ocClosingCatRank || 9999999) + Math.round(cumulativeGovtSeats);
});

pvt.forEach(c => {
  cumulativePvtSeats += (c.seatsIncreased || 0);
  c.adjustedCatRanks = { ...c.knownCatRanks };
  for (let cat in c.knownCatRanks) {
    if (c.knownCatRanks[cat] !== 9999999) {
      c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round((cumulativeGovtSeats + cumulativePvtSeats) * (stateCatRatios[cat] || 0.117));
    }
  }
  c.ocClosingCatRank = (c.ocClosingCatRank || 9999999) + Math.round(cumulativeGovtSeats + cumulativePvtSeats);
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
  const ocRank = college.adjustedCatRanks && college.adjustedCatRanks['OC'] ? college.adjustedCatRanks['OC'] : (college.ocClosingCatRank || 9999999);
  return Math.round(ocRank * (stateCatRatios[category] || 0.117) / 0.35);
}

const kids = [
  { name: 'KAVVAMPALLI MANASA', sno: 5884, category: 'SC_2' },
  { name: 'ALETI POOJA', sno: 8039, category: 'SC_2' },
  { name: 'YACHARAM SAI POOJA', sno: 8333, category: 'SC_2' },
  { name: 'BOLLEPAKA DHANUSHA', sno: 11919, category: 'SC_2' }
];

console.log("==================================================");
console.log("ALLOCATION RESULTS WITH NEW CATEGORY RANK LOGIC");
console.log("==================================================\n");

kids.forEach(k => {
  const data = snoMap[k.sno];
  const catRank = data.ranks['SC2'] || data.ranks['SC_2'] || 999999;
  
  let allocated = null;
  const prefs = [...[...govt], ...[...pvt].filter(c => !c.name.includes('Minority'))].sort((a,b)=>(a.ocClosing||999999)-(b.ocClosing||999999)); /*
    ...[...govt].sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999)),
    ...[...pvt].sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999))
  ];
  
  */ for (const c of prefs) {
    const closing = getClosingRank(c, 'SC_2');
    if (catRank <= closing) {
      allocated = { college: c, closingRank: closing };
      break;
    }
  }
  
  console.log(`Candidate: ${k.name}`);
  console.log(`- State S.No: ${k.sno} | SC2 Rank: ${catRank}`);
  if (allocated) {
    console.log(`- ✅ Allotted to: ${allocated.college.name} (${allocated.college.type})`);
    console.log(`- Cutoff Margin: Safe by ${allocated.closingRank - catRank} ranks (Closing SC2 Rank: ${allocated.closingRank})`);
  } else {
    console.log(`- ❌ UNALLOTTED. No colleges available for this SC2 rank.`);
  }
  console.log("");
});
