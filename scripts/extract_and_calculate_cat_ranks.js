const fs = require('fs');

const appJsContent = fs.readFileSync('app.js', 'utf8');

const govtMatch = appJsContent.match(/const govtColleges = (\[[\s\S]*?\]);\n\n\/\//);
const pvtMatch = appJsContent.match(/const pvtColleges = (\[[\s\S]*?\]);\n\n\/\//);

let govtColleges = eval(govtMatch[1]);
let pvtColleges = eval(pvtMatch[1]);

const text = fs.readFileSync('docs/last_year_merit_list_final_tg_extracted.txt', 'utf8');
const regex = /\b(\d{1,5})\s+(\d{10})\s+(\d{1,7})\s+(\d{2,3})(?:\s+\d{2,3})?\s+(\d{2,3})\s+([A-Za-z\s\.\,\'\-]+?)\s+([MF])\s+(SC1|SC2|SC3|SC|ST|OC|BCA|BCB|BCC|BCD|BCE)\b(?:\s+(YES))?(?:\s+(MSM|MIN|CHM|SIK|JAI|CHR))?/g;

const airToCatRank = new Map();
const catCounters = {};

let match;
while ((match = regex.exec(text)) !== null) {
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

function getCatRankForAIR(air, category) {
  if (!air || air === 9999999) return 9999999;
  
  let normCat = category.replace('-', '').replace('_', '');
  if (normCat === 'OPEN') normCat = 'OC';
  
  let closestAir = null;
  let minDiff = Infinity;
  
  // Find the closest AIR *THAT ACTUALLY HAS THIS CATEGORY RANK*
  for (let [candAir, ranks] of airToCatRank.entries()) {
    if (ranks[normCat] !== undefined) {
      const diff = Math.abs(candAir - air);
      if (diff < minDiff) {
        minDiff = diff;
        closestAir = candAir;
      }
    }
  }
  
  if (closestAir) {
    const ranks = airToCatRank.get(closestAir);
    return ranks[normCat];
  }
  
  return 9999999;
}

for (const c of govtColleges) {
  c.knownCatRanks = {};
  for (const cat in c.knownRanks) {
    c.knownCatRanks[cat] = getCatRankForAIR(c.knownRanks[cat], cat);
  }
  c.ocClosingCatRank = getCatRankForAIR(c.ocClosing, 'OC');
}

for (const c of pvtColleges) {
  c.knownCatRanks = {};
  for (const cat in c.knownRanks) {
    c.knownCatRanks[cat] = getCatRankForAIR(c.knownRanks[cat], cat);
  }
  c.ocClosingCatRank = getCatRankForAIR(c.ocClosing, 'OC');
}

fs.writeFileSync('merged_govt_app.json', JSON.stringify(govtColleges, null, 2));
fs.writeFileSync('merged_pvt_app.json', JSON.stringify(pvtColleges, null, 2));
console.log("Done extracting and converting app.js data accurately.");
