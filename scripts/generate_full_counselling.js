const fs = require('fs');
const path = require('path');

// 1. Load Data
const candidates = JSON.parse(fs.readFileSync('docs/AY-2026-27-FINAL-MERIT-LIST_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const govtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// Reservation Percentages
const RES = {
  OC: 0.50,
  BCA: 0.07, BCB: 0.10, BCC: 0.01, BCD: 0.07, BCE: 0.04,
  SC1: 0.01, SC2: 0.07, SC3: 0.06, SC4: 0.01,
  ST: 0.06 // Using standard 6% (or 10%, will use 6% to ensure it fits ~100%)
};

let colleges = [];

function createCollegeMatrix(c, type) {
  let intake = c.intake || 100;
  let stateShare = 0;
  if (type === 'GOVT') {
    if (c.name.includes('AIIMS')) return null;
    if (c.name.includes('ESIC')) stateShare = 76;
    else stateShare = Math.round(intake * 0.85);
  } else {
    stateShare = Math.round(intake * 0.50);
  }

  if (stateShare <= 0) return null;

  let matrix = {};
  for (let cat of Object.keys(RES)) {
    let totalCatSeats = Math.round(stateShare * RES[cat]);
    // Ensure at least 1 seat for 1% categories if stateShare > 50
    if (totalCatSeats === 0 && RES[cat] >= 0.01 && stateShare >= 50) totalCatSeats = 1; 

    let femSeats = Math.round(totalCatSeats * 0.33);
    let genSeats = totalCatSeats - femSeats;
    matrix[cat] = { gen: genSeats, fem: femSeats };
  }

  // Find priority / cutoff for sorting
  let cutoff = c.knownRanks && c.knownRanks.SC_2 ? c.knownRanks.SC_2 : (c.knownRanks && c.knownRanks.Open ? c.knownRanks.Open : 999999);

  return {
    name: c.name,
    type: type,
    course: 'MBBS',
    matrix: matrix,
    priorityRank: cutoff
  };
}

// Build and sort colleges
for (let c of govtCollegesRaw) {
  let rec = createCollegeMatrix(c, 'GOVT');
  if (rec) colleges.push(rec);
}
let govtColleges = colleges.filter(c => c.type === 'GOVT').sort((a, b) => a.priorityRank - b.priorityRank);

let pvtList = [];
for (let c of pvtCollegesRaw) {
  let rec = createCollegeMatrix(c, 'PVT');
  // Skip minority colleges for standard simulation to prevent skewing
  if (rec && !c.name.includes('Minority')) pvtList.push(rec);
}
pvtList.sort((a, b) => a.priorityRank - b.priorityRank);

let orderedColleges = [...govtColleges, ...pvtList];

// Sort candidates
candidates.sort((a, b) => a.sno - b.sno);

const csvData = [];
csvData.push(['S.No', 'NEET Rank', 'Score', 'Name', 'Gender', 'Category', 'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota']);

let allotments = 0;

for (let c of candidates) {
  let isAiq = aiqByRank.has(c.neetRank);
  let status = 'ALLOTTED';
  let course = 'N/A';
  let allottedCollege = 'N/A';
  let allotmentQuota = 'N/A';
  
  if (isAiq) {
    status = 'EXITED TO AIQ';
    course = 'MBBS (AIQ)';
    allottedCollege = 'ALL INDIA QUOTA SEAT';
    allotmentQuota = 'ALL INDIA';
  } else {
    let gotSeat = false;
    let candCat = c.category; // e.g. 'OC', 'BCA', 'SC2'
    if (candCat === 'SC') candCat = 'SC2'; // Fallback for unspecified SC
    
    // Check colleges in order
    for (let col of orderedColleges) {
      // 1. Try OC General
      if (col.matrix.OC.gen > 0) {
        col.matrix.OC.gen--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `OC_GEN (${col.type})`;
        gotSeat = true;
        break;
      }
      // 2. Try OC Female
      else if (c.gender === 'F' && col.matrix.OC.fem > 0) {
        col.matrix.OC.fem--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `OC_FEM (${col.type})`;
        gotSeat = true;
        break;
      }
      // 3. Try Category General
      else if (col.matrix[candCat] && col.matrix[candCat].gen > 0) {
        col.matrix[candCat].gen--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `${candCat}_GEN (${col.type})`;
        gotSeat = true;
        break;
      }
      // 4. Try Category Female
      else if (c.gender === 'F' && col.matrix[candCat] && col.matrix[candCat].fem > 0) {
        col.matrix[candCat].fem--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `${candCat}_FEM (${col.type})`;
        gotSeat = true;
        break;
      }
    }
    
    if (!gotSeat) {
      status = 'UNALLOTTED';
      course = 'NONE';
      allottedCollege = 'NO MBBS SEAT AVAILABLE';
      allotmentQuota = 'WAITLISTED (Try BDS/AYUSH)';
    } else {
      allotments++;
    }
  }

  const cleanName = `"${c.name.replace(/"/g, '""')}"`;
  csvData.push([
    c.sno,
    c.neetRank,
    c.neetScore,
    cleanName,
    c.gender,
    c.category,
    status,
    course,
    `"${allottedCollege}"`,
    allotmentQuota
  ].join(','));
}

const csvPath = path.join(__dirname, '..', 'docs', 'Global_Mock_Counselling_Allotment.csv');
fs.writeFileSync(csvPath, csvData.join('\n'), 'utf8');
console.log(`Global Mock allotment CSV generated for ${candidates.length} candidates at: ${csvPath}`);
console.log(`Total State MBBS Allotments made: ${allotments}`);
