const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');

const snoMap = fs.readFileSync('sno_to_cat_ranks_2026.json', 'utf8');
const govt = JSON.parse(fs.readFileSync('merged_govt_app.json', 'utf8'));
const pvt = JSON.parse(fs.readFileSync('merged_pvt_app.json', 'utf8'));

const govtCode = `const govtColleges = ${JSON.stringify(govt, null, 2)};\n`;
const pvtCode = `const pvtColleges = ${JSON.stringify(pvt, null, 2)};\n`;

let newAppJs = appJs.replace(/const govtColleges = \[[\s\S]*?\];\n/, govtCode);
newAppJs = newAppJs.replace(/const pvtColleges = \[[\s\S]*?\];\n/, pvtCode);

const snoMapCode = `const snoToCatRanks2026 = ${snoMap};\n\n`;

const oldEstCatRank = `function estimateCategoryRank(air, category, stateRank) {
  // Calculate state-level category rank based on state merit list proportions
  const sRank = stateRank || estimateStateRank(air);
  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
  };
  return Math.max(1, Math.round(sRank * (stateCatRatios[category] || 0.117)));
}`;

const newEstCatRank = `function estimateCategoryRank(air, category, stateRank) {
  const sRank = stateRank || estimateStateRank(air);
  
  if (snoToCatRanks2026[sRank]) {
    const ranks = snoToCatRanks2026[sRank];
    let normCat = category.replace('-', '').replace('_', '');
    if (normCat === 'OPEN') normCat = 'OC';
    if (ranks[normCat]) return ranks[normCat];
    if (ranks['OC']) return ranks['OC']; 
  }

  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
  };
  return Math.max(1, Math.round(sRank * (stateCatRatios[category] || 0.117)));
}`;

newAppJs = newAppJs.replace(oldEstCatRank, snoMapCode + newEstCatRank);

const oldGetClosingRank = `function getClosingRank(college, category) {
  if (college.knownRanks && college.knownRanks[category] !== undefined && college.knownRanks[category] !== null) {
    return college.knownRanks[category];
  }
  if (college.knownRanks && college.knownRanks['SC'] !== undefined && college.knownRanks['SC'] !== null && category.startsWith('SC')) {
    return college.knownRanks['SC'];
  }
  const multipliers = getCategoryMultipliers(college.ocClosing);
  const multiplier = multipliers[category] || 1;
  return Math.round(college.ocClosing * multiplier);
}`;

const newGetClosingRank = `function computeAdjustedCatRanks() {
  let cumulativeGovtSeats = 0;
  let cumulativePvtSeats = 0;
  
  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
  };

  govtColleges.forEach(c => {
    cumulativeGovtSeats += (c.seatsIncreased || 0);
    c.adjustedCatRanks = { ...c.knownCatRanks };
    for (let cat in c.knownCatRanks) {
      if (c.knownCatRanks[cat] !== 9999999) {
        c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round(cumulativeGovtSeats * (stateCatRatios[cat] || 0.117));
      }
    }
  });

  pvtColleges.forEach(c => {
    cumulativePvtSeats += (c.seatsIncreased || 0);
    c.adjustedCatRanks = { ...c.knownCatRanks };
    for (let cat in c.knownCatRanks) {
      if (c.knownCatRanks[cat] !== 9999999) {
        c.adjustedCatRanks[cat] = c.knownCatRanks[cat] + Math.round((cumulativeGovtSeats + cumulativePvtSeats) * (stateCatRatios[cat] || 0.117));
      }
    }
  });
}
computeAdjustedCatRanks();

function getClosingRank(college, category) {
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

newAppJs = newAppJs.replace(oldGetClosingRank, newGetClosingRank);

const oldIsEligible = `function isEligible(rank, college, category) {
  const closing = getClosingRank(college, category);
  return rank <= closing;
}`;

const newIsEligible = `function isEligible(rank, college, category) {
  const catRank = estimateCategoryRank(rank, category);
  const closing = getClosingRank(college, category);
  return catRank <= closing;
}`;

newAppJs = newAppJs.replace(oldIsEligible, newIsEligible);

fs.writeFileSync('app_patched.js', newAppJs);
console.log("Patched app.js successfully.");
