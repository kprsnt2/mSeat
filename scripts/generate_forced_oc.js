const fs = require('fs');
const path = require('path');

// 1. Load Data
const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// 2. Count total OC seats available in the state (excluding minority colleges)
const govtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

let totalStateSeats = 0;
for (let c of govtCollegesRaw) {
  if (c.name.includes('AIIMS')) continue;
  totalStateSeats += (c.name.includes('ESIC')) ? 76 : Math.round((c.intake || 100) * 0.85);
}
for (let c of pvtCollegesRaw) {
  if (c.name.includes('Minority')) continue;
  totalStateSeats += Math.round((c.intake || 150) * 0.50);
}

const totalOcSeats = Math.round(totalStateSeats * 0.50);
console.log(`Total State MBBS Seats: ${totalStateSeats}`);
console.log(`Total Open Category (OC) Seats: ${totalOcSeats}`);

// 3. Find the exact S.No where the OC seats run out
let nonAiqCount = 0;
let ocCutoffSno = 0;
candidates.sort((a, b) => a.sno - b.sno);

for (let c of candidates) {
  if (!aiqByRank.has(c.neetRank)) {
    nonAiqCount++;
    if (nonAiqCount === totalOcSeats) {
      ocCutoffSno = c.sno;
      break;
    }
  }
}
console.log(`The Open Category cutoff strictly stops at S.No: ${ocCutoffSno}`);

// 4. Distribute SC-2 Seats (Forced OC method)
const sc2Pool = candidates.filter(c => c.category === 'SC2' && !aiqByRank.has(c.neetRank));
sc2Pool.sort((a, b) => a.sno - b.sno);

let seatMatrix = {
  OC: 0,
  Govt_SC2_General: 172,
  Govt_SC2_Female: 84,
  Pvt_SC2_General: 122,
  Pvt_SC2_Female: 60
};

const csvData = [];
csvData.push(['S.No', 'NEET Rank', 'Score', 'Name', 'Gender', 'Category', 'Mock Allotment Phase']);

let ocSc2Count = 0;

for (let c of sc2Pool) {
  let finalAllotment = 'UNALLOTTED (WAITLISTED)';

  if (c.sno <= ocCutoffSno) {
    finalAllotment = 'OPEN CATEGORY (UNRESERVED MBBS)';
    ocSc2Count++;
  } else if (seatMatrix.Govt_SC2_General > 0) {
    finalAllotment = 'GOVERNMENT MBBS (SC-2 General)';
    seatMatrix.Govt_SC2_General--;
  } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'F') {
    finalAllotment = 'GOVERNMENT MBBS (SC-2 Female)';
    seatMatrix.Govt_SC2_Female--;
  } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'M') {
    if (seatMatrix.Pvt_SC2_General > 0) {
      finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
      seatMatrix.Pvt_SC2_General--;
    }
  } else if (seatMatrix.Pvt_SC2_General > 0) {
    finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
    seatMatrix.Pvt_SC2_General--;
  } else if (seatMatrix.Pvt_SC2_Female > 0 && c.gender === 'F') {
    finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 Female)';
    seatMatrix.Pvt_SC2_Female--;
  }

  const cleanName = `"${c.name.replace(/"/g, '""')}"`;
  csvData.push([
    c.sno, c.neetRank, c.neetScore, cleanName, c.gender, c.category, finalAllotment
  ].join(','));
}

const csvPath = path.join(__dirname, 'docs', 'Forced_OC_Mock_Allotment_SC2.csv');
fs.writeFileSync(csvPath, csvData.join('\n'), 'utf8');

console.log(`\nResults of FORCED OC SIMULATION:`);
console.log(`Number of top SC-2 students pushed into OC seats: ${ocSc2Count}`);
console.log(`\nLast Allotted Cutoffs:`);
const lines = csvData.slice(1);
console.log(`Govt Gen:`, lines.filter(l => l.includes('GOVERNMENT MBBS (SC-2 General)')).pop());
console.log(`Govt Fem:`, lines.filter(l => l.includes('GOVERNMENT MBBS (SC-2 Female)')).pop());
console.log(`Pvt Gen:`, lines.filter(l => l.includes('PRIVATE MBBS CAT-A (SC-2 General)')).pop());
console.log(`Pvt Fem:`, lines.filter(l => l.includes('PRIVATE MBBS CAT-A (SC-2 Female)')).pop());
