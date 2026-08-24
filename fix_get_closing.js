const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const oldGetClosingRank = `function getClosingRank(college, category) {
  let normCat = category.replace('-', '').replace('_', '');
  if (normCat === 'OPEN') normCat = 'OC';
  
  if (college.adjustedCatRanks && college.adjustedCatRanks[normCat]) {
    return college.adjustedCatRanks[normCat];
  }
  if (college.adjustedCatRanks && college.adjustedCatRanks['SC'] && normCat.startsWith('SC')) {
    return college.adjustedCatRanks['SC'];
  }
  
  const ocRank = college.adjustedCatRanks ? college.adjustedCatRanks['OC'] : (college.ocClosingCatRank || 9999999);
  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
  };
  return Math.round(ocRank * (stateCatRatios[category] || 0.117) / 0.35);
}`;

const newGetClosingRank = `function getClosingRank(college, category) {
  // Normalize category to match knownCatRanks keys (e.g. BC_A, SC_2)
  let searchCat = category;
  if (searchCat === 'OPEN' || searchCat === 'OC') searchCat = 'OC';
  else if (searchCat.length === 3 && (searchCat.startsWith('BC') || searchCat.startsWith('SC'))) {
    searchCat = searchCat.substring(0, 2) + '_' + searchCat.substring(2);
  }

  if (college.adjustedCatRanks && college.adjustedCatRanks[searchCat] !== undefined) {
    return college.adjustedCatRanks[searchCat];
  }
  if (college.adjustedCatRanks && college.adjustedCatRanks['SC'] !== undefined && searchCat.startsWith('SC')) {
    return college.adjustedCatRanks['SC'];
  }
  
  const ocRank = (college.adjustedCatRanks && college.adjustedCatRanks['OC']) ? college.adjustedCatRanks['OC'] : (college.ocClosingCatRank || 9999999);
  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.15, SC_2: 0.15, SC_3: 0.15, SC: 0.15, ST: 0.10
  };
  return Math.round(ocRank * (stateCatRatios[category] || 0.15) / 0.35);
}`;

appJs = appJs.replace(oldGetClosingRank, newGetClosingRank);
fs.writeFileSync('app.js', appJs);
console.log("Patched getClosingRank bug!");
