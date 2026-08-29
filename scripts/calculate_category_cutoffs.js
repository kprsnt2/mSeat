const fs = require('fs');

const text = fs.readFileSync('docs/last_year_merit_list_final_tg_extracted.txt', 'utf8');

// The text has candidates concatenated. 
// A candidate usually starts with SNo (1-5 digits), Roll No (10 digits), Rank (1-7 digits), Score (3 digits).
// Example: 245   4204101135   16156   542   542   DEEVANSHI MEHROTRA   F   OC
const regex = /\b(\d{1,5})\s+(\d{10})\s+(\d{1,7})\s+(\d{2,3})(?:\s+\d{2,3})?\s+(\d{2,3})\s+([A-Za-z\s\.\,\'\-]+?)\s+([MF])\s+(SC1|SC2|SC3|SC|ST|OC|BCA|BCB|BCC|BCD|BCE)\b(?:\s+(YES))?(?:\s+(MSM|MIN|CHM|SIK|JAI|CHR))?/g;

const airToCatRank = new Map();
const catCounters = {};

let match;
let count = 0;
while ((match = regex.exec(text)) !== null) {
  count++;
  const sno = parseInt(match[1]);
  const air = parseInt(match[3]);
  const category = match[8];
  const isEWS = match[9] === 'YES';

  const ranks = { OC: sno };
  
  if (isEWS) {
    catCounters['EWS'] = (catCounters['EWS'] || 0) + 1;
    ranks['EWS'] = catCounters['EWS'];
  }
  
  if (category !== 'OC') {
    catCounters[category] = (catCounters[category] || 0) + 1;
    ranks[category] = catCounters[category];
    
    if (category.startsWith('SC')) {
      catCounters['SC'] = (catCounters['SC'] || 0) + 1;
      ranks['SC'] = catCounters['SC'];
    }
  }

  airToCatRank.set(air, ranks);
}

console.log("Parsed", count, "candidates.");
console.log("Counters:", catCounters);
console.log("Rank for AIR 85048:", airToCatRank.get(85048));

const govt = JSON.parse(fs.readFileSync('merged_govt_2026.json', 'utf8'));
const pvt = JSON.parse(fs.readFileSync('merged_pvt_2026.json', 'utf8'));

function getCatRankForAIR(air, category) {
  if (!air || air === 9999999) return 9999999;
  
  let normCat = category.replace('-', '').replace('_', '');
  if (normCat === 'OPEN') normCat = 'OC';
  
  if (airToCatRank.has(air)) {
    const ranks = airToCatRank.get(air);
    return ranks[normCat] || ranks['OC']; 
  }
  
  let closestAir = null;
  let minDiff = Infinity;
  for (let [candAir, ranks] of airToCatRank.entries()) {
    const diff = Math.abs(candAir - air);
    if (diff < minDiff) {
      minDiff = diff;
      closestAir = candAir;
    }
  }
  
  if (closestAir) {
    const ranks = airToCatRank.get(closestAir);
    return ranks[normCat] || ranks['OC'];
  }
  return 9999999;
}

for (const c of govt) {
  c.knownCatRanks = {};
  for (const cat in c.knownRanks) {
    c.knownCatRanks[cat] = getCatRankForAIR(c.knownRanks[cat], cat);
  }
  c.ocClosingCatRank = getCatRankForAIR(c.ocClosing, 'OC');
}

for (const c of pvt) {
  c.knownCatRanks = {};
  for (const cat in c.knownRanks) {
    c.knownCatRanks[cat] = getCatRankForAIR(c.knownRanks[cat], cat);
  }
  c.ocClosingCatRank = getCatRankForAIR(c.ocClosing, 'OC');
}

fs.writeFileSync('merged_govt_2026.json', JSON.stringify(govt, null, 2));
fs.writeFileSync('merged_pvt_2026.json', JSON.stringify(pvt, null, 2));
console.log("Updated merged_govt_2026.json and merged_pvt_2026.json with knownCatRanks!");
