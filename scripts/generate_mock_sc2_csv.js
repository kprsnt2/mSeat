const fs = require('fs');
const path = require('path');

// 1. Load Data
const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));

// Build AIQ lookup by Rank
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// Filter SC2 candidates who are NOT in AIQ
const sc2Pool = candidates.filter(c => c.category === 'SC2');

// Sort strictly by State Merit (S.No)
sc2Pool.sort((a, b) => a.sno - b.sno);

// Seat Matrix Definition
let seatMatrix = {
  OC: 0,
  Govt_SC2_General: 172,
  Govt_SC2_Female: 84,
  Pvt_SC2_General: 137,
  Pvt_SC2_Female: 68
};

const csvData = [];
csvData.push(['S.No', 'NEET Rank', 'Score', 'Roll No', 'Name', 'Gender', 'Category', 'AIQ Status', 'State SC-2 Rank', 'State SC-2 Female Rank', 'Mock Allotment Phase', 'Final Mock Alloted Seat Type']);

let sc2Rank = 1;
let sc2FemaleRank = 1;

for (let c of sc2Pool) {
  let isAiq = aiqByRank.has(c.neetRank);
  let aiqStatus = isAiq ? 'EXITED TO ALL INDIA QUOTA' : 'STATE POOL';
  
  let currentFemaleRank = c.gender === 'F' ? sc2FemaleRank++ : '-';
  let currentSc2Rank = sc2Rank++;

  let allotmentPhase = 'N/A';
  let finalAllotment = 'UNALLOTTED (BDS / AYUSH)';

  if (isAiq) {
    allotmentPhase = 'ALL INDIA QUOTA';
    finalAllotment = 'ALL INDIA SEAT (AIIMS/JIPMER/AIQ)';
  } else {
    // Run State Mock Counselling
    if (c.sno <= 3300) {
      allotmentPhase = 'OPEN CATEGORY (OC)';
      finalAllotment = 'OPEN CATEGORY (UNRESERVED MBBS)';
      seatMatrix.OC++;
    } else if (seatMatrix.Govt_SC2_General > 0) {
      allotmentPhase = 'SC-2 STATE QUOTA';
      finalAllotment = 'GOVERNMENT MBBS (SC-2 General)';
      seatMatrix.Govt_SC2_General--;
    } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'F') {
      allotmentPhase = 'SC-2 STATE QUOTA';
      finalAllotment = 'GOVERNMENT MBBS (SC-2 Female)';
      seatMatrix.Govt_SC2_Female--;
    } else if (seatMatrix.Govt_SC2_Female > 0 && c.gender === 'M') {
      // Male skipped for Govt Female seat, falls to Private General
      if (seatMatrix.Pvt_SC2_General > 0) {
        allotmentPhase = 'SC-2 STATE QUOTA';
        finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
        seatMatrix.Pvt_SC2_General--;
      }
    } else if (seatMatrix.Pvt_SC2_General > 0) {
      allotmentPhase = 'SC-2 STATE QUOTA';
      finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 General)';
      seatMatrix.Pvt_SC2_General--;
    } else if (seatMatrix.Pvt_SC2_Female > 0 && c.gender === 'F') {
      allotmentPhase = 'SC-2 STATE QUOTA';
      finalAllotment = 'PRIVATE MBBS CAT-A (SC-2 Female)';
      seatMatrix.Pvt_SC2_Female--;
    } else if (seatMatrix.Pvt_SC2_Female > 0 && c.gender === 'M') {
      // Male skipped for Pvt Female seat
      allotmentPhase = 'WAITLISTED';
    } else {
      allotmentPhase = 'WAITLISTED';
    }
  }

  // Escape CSV commas
  const cleanName = `"${c.name.replace(/"/g, '""')}"`;

  csvData.push([
    c.sno,
    c.neetRank,
    c.neetScore,
    c.rollNo,
    cleanName,
    c.gender,
    c.category,
    aiqStatus,
    currentSc2Rank,
    currentFemaleRank,
    allotmentPhase,
    finalAllotment
  ].join(','));
}

const csvPath = path.join(__dirname, 'docs', 'Mock_Allotment_SC2_Candidates.csv');
fs.writeFileSync(csvPath, csvData.join('\n'), 'utf8');
console.log(`Mock allotment CSV generated at: ${csvPath}`);
