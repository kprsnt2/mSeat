const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));

// Build AIQ lookup by Rank
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// Filter SC2 candidates who are NOT in AIQ
const sc2Pool = candidates.filter(c => c.category === 'SC2' && !aiqByRank.has(c.neetRank));

// Sort strictly by State Merit (S.No)
sc2Pool.sort((a, b) => a.sno - b.sno);

// Seat Matrix Definition
let seatMatrix = {
  OC: 0, // Unreserved Open Category (S.No <= 3300 roughly)
  Govt_SC2_General: 172,
  Govt_SC2_Female: 84,
  Pvt_SC2_General: 137,
  Pvt_SC2_Female: 68
};

let allotted = [];
let targetKids = ['4204101514', '4208202445', '4204101570']; // Yacharam Sai Pooja, Dhanusha, Aleti Pooja
let resultsForTargets = {};

let malesSkippedForFemales_Govt = 0;
let malesSkippedForFemales_Pvt = 0;

for (let c of sc2Pool) {
  let allotment = 'UNALLOTTED (BDS / AYUSH / ROUND 3 SLIDING)';
  
  if (c.sno <= 3300) {
    allotment = 'OPEN CATEGORY (OC) SEAT';
    seatMatrix.OC++;
  } else if (seatMatrix.Govt_SC2_General > 0) {
    allotment = 'GOVERNMENT MBBS (SC-2 General)';
    seatMatrix.Govt_SC2_General--;
  } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'F') {
    allotment = 'GOVERNMENT MBBS (SC-2 Female)';
    seatMatrix.Govt_SC2_Female--;
  } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'M') {
    // Male skipped for Govt Female seat, falls to Private General
    malesSkippedForFemales_Govt++;
    if (seatMatrix.Pvt_SC2_General > 0) {
      allotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
      seatMatrix.Pvt_SC2_General--;
    } else {
      allotment = 'UNALLOTTED';
    }
  } else if (seatMatrix.Pvt_SC2_General > 0) {
    allotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
    seatMatrix.Pvt_SC2_General--;
  } else if (seatMatrix.Pvt_SC2_Female > 0 && c.gender === 'F') {
    allotment = 'PRIVATE MBBS CAT-A (SC-2 Female)';
    seatMatrix.Pvt_SC2_Female--;
  } else if (seatMatrix.Pvt_SC2_Female > 0 && c.gender === 'M') {
    malesSkippedForFemales_Pvt++;
    allotment = 'UNALLOTTED';
  }

  const record = {
    sno: c.sno,
    rank: c.neetRank,
    score: c.neetScore,
    name: c.name,
    gender: c.gender,
    allotment
  };
  
  allotted.push(record);
  
  if (targetKids.includes(c.rollNo)) {
    resultsForTargets[c.rollNo] = record;
  }
}

console.log('=========================================================');
console.log('MOCK COUNSELLING RESULTS FOR SC-2 CATEGORY');
console.log('=========================================================');
console.log(`\nTotal SC-2 Candidates Participated: ${sc2Pool.length}`);
console.log(`SC-2 Candidates who got Open Category (OC) Seats: ${seatMatrix.OC}`);
console.log(`\nRemaining Seats After Mock Round 1:`);
console.table({
  'Govt SC-2 General': seatMatrix.Govt_SC2_General,
  'Govt SC-2 Female': seatMatrix.Govt_SC2_Female,
  'Pvt SC-2 General': seatMatrix.Pvt_SC2_General,
  'Pvt SC-2 Female': seatMatrix.Pvt_SC2_Female
});
console.log(`\nMales pushed to Private because Govt was Female-Only: ${malesSkippedForFemales_Govt}`);
console.log(`Males pushed out of MBBS because Pvt was Female-Only: ${malesSkippedForFemales_Pvt}`);

console.log('\n=========================================================');
console.log('SPECIFIC RESULTS FOR YOUR CANDIDATES');
console.log('=========================================================');
console.log('\n1. YACHARAM SAI POOJA (AIR 289,635)');
console.log(resultsForTargets['4204101514']);

console.log('\n2. ALETI POOJA (AIR 282,055)');
console.log(resultsForTargets['4204101570']);

console.log('\n3. BOLLEPAKA DHANUSHA (AIR 399,237)');
console.log(resultsForTargets['4208202445']);

// Find exactly where the seats ran out
const lastGovtGen = allotted.filter(c => c.allotment === 'GOVERNMENT MBBS (SC-2 General)').pop();
const lastGovtFem = allotted.filter(c => c.allotment === 'GOVERNMENT MBBS (SC-2 Female)').pop();
const lastPvtGen = allotted.filter(c => c.allotment === 'PRIVATE MBBS CAT-A (SC-2 General)').pop();
const lastPvtFem = allotted.filter(c => c.allotment === 'PRIVATE MBBS CAT-A (SC-2 Female)').pop();

console.log('\n=========================================================');
console.log('MOCK CUTOFFS (LAST ALLOTTED SC-2 CANDIDATES)');
console.log('=========================================================');
console.log('Last Govt SC-2 General Allotment:', lastGovtGen ? `AIR ${lastGovtGen.rank} (S.No ${lastGovtGen.sno}) - ${lastGovtGen.gender}` : 'N/A');
console.log('Last Govt SC-2 Female Allotment:', lastGovtFem ? `AIR ${lastGovtFem.rank} (S.No ${lastGovtFem.sno}) - ${lastGovtFem.gender}` : 'N/A');
console.log('Last Private SC-2 General Allotment:', lastPvtGen ? `AIR ${lastPvtGen.rank} (S.No ${lastPvtGen.sno}) - ${lastPvtGen.gender}` : 'N/A');
console.log('Last Private SC-2 Female Allotment:', lastPvtFem ? `AIR ${lastPvtFem.rank} (S.No ${lastPvtFem.sno}) - ${lastPvtFem.gender}` : 'N/A');
