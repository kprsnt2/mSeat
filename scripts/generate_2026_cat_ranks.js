const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const catCounters = {};
const sNoData = {};

for (const c of candidates) {
  const sno = c.sno;
  let cat = c.category.trim();
  const isEWS = c.ews === 'YES';

  const ranks = { OC: sno };
  
  if (isEWS) {
    catCounters['EWS'] = (catCounters['EWS'] || 0) + 1;
    ranks['EWS'] = catCounters['EWS'];
  }
  
  if (cat.length === 3 && (cat.startsWith('BC') || cat.startsWith('SC'))) {
    cat = cat.substring(0, 2) + '_' + cat.substring(2);
  }
  
  if (cat !== 'OC') {
    catCounters[cat] = (catCounters[cat] || 0) + 1;
    ranks[cat] = catCounters[cat];
    
    if (cat.startsWith('SC')) {
      catCounters['SC'] = (catCounters['SC'] || 0) + 1;
      ranks['SC'] = catCounters['SC'];
    }
  }

  // Include candidate details for UI auto-fill
  sNoData[sno] = {
    air: c.neetRank,
    score: c.score,
    cat: c.category.trim(),
    ews: isEWS,
    gender: c.gender === 'M' ? 'male' : 'female',
    minority: c.minority || 'none',
    ranks: ranks
  };
}

fs.writeFileSync('sno_to_cat_ranks_2026.json', JSON.stringify(sNoData));
console.log("Done generating 2026 category ranks with candidate metadata!");
