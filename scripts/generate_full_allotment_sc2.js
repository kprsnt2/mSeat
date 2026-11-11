const fs = require('fs');
const path = require('path');

// 1. Load Data
const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const govtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// 2. Build College Preference Array
let colleges = [];

// Helper to calculate seats
function createCollegeRecord(c, type) {
  let intake = c.intake || 100;
  let stateShare = 0;
  if (type === 'GOVT') {
    if (c.name.includes('AIIMS')) return null;
    if (c.name.includes('ESIC')) stateShare = 76;
    else stateShare = Math.round(intake * 0.85);
  } else {
    stateShare = Math.round(intake * 0.50);
  }
  
  let sc2Seats = Math.round(stateShare * 0.07);
  // Guarantee at least 1 seat for small intakes, otherwise math.round might be 0 for very small
  if (sc2Seats === 0 && stateShare > 0) sc2Seats = 1;

  let femSeats = Math.round(sc2Seats * 0.33);
  let genSeats = sc2Seats - femSeats;
  
  let cutoff = c.knownRanks && c.knownRanks.SC_2 ? c.knownRanks.SC_2 : 999999;
  
  return {
    name: c.name,
    type: type, // 'GOVT' or 'PVT'
    course: 'MBBS',
    genSeats: genSeats,
    femSeats: femSeats,
    priorityRank: cutoff // Lower is better
  };
}

for (let c of govtCollegesRaw) {
  let rec = createCollegeRecord(c, 'GOVT');
  if (rec) colleges.push(rec);
}
// Sort Govt by priority
let govtColleges = colleges.filter(c => c.type === 'GOVT').sort((a, b) => a.priorityRank - b.priorityRank);

let pvtList = [];
for (let c of pvtCollegesRaw) {
  let rec = createCollegeRecord(c, 'PVT');
  if (rec && !c.name.includes('Minority')) {
    pvtList.push(rec);
  }
}
// Sort Pvt by priority
pvtList.sort((a, b) => a.priorityRank - b.priorityRank);

// Combine: All Govt first, then all Pvt
let orderedColleges = [...govtColleges, ...pvtList];

// Add BDS (Dental)
orderedColleges.push({ name: 'Govt Dental College, Hyderabad', type: 'GOVT', course: 'BDS', genSeats: 3, femSeats: 1, priorityRank: 999999 });
orderedColleges.push({ name: 'Top Private Dental Colleges (Combined Pool)', type: 'PVT', course: 'BDS', genSeats: 50, femSeats: 25, priorityRank: 999999 });
orderedColleges.push({ name: 'Peripheral Private Dental Colleges (Combined Pool)', type: 'PVT', course: 'BDS', genSeats: 100, femSeats: 50, priorityRank: 999999 });

// Add AYUSH
orderedColleges.push({ name: 'Govt Ayurvedic/Homeo Colleges (BAMS/BHMS)', type: 'GOVT', course: 'AYUSH', genSeats: 30, femSeats: 15, priorityRank: 999999 });
orderedColleges.push({ name: 'Private AYUSH Colleges (BAMS/BHMS)', type: 'PVT', course: 'AYUSH', genSeats: 100, femSeats: 50, priorityRank: 999999 });
orderedColleges.push({ name: 'B.Sc Nursing (Govt/Pvt Pool)', type: 'NURSING', course: 'NURSING', genSeats: 200, femSeats: 100, priorityRank: 999999 });

// 3. Run Mock Allotment
const sc2Pool = candidates.filter(c => c.category === 'SC2');
sc2Pool.sort((a, b) => a.sno - b.sno);

const csvData = [];
csvData.push(['S.No', 'NEET Rank', 'Score', 'Name', 'Gender', 'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota']);

let ocCount = 0;

for (let c of sc2Pool) {
  let isAiq = aiqByRank.has(c.neetRank);
  let status = 'ALLOTTED';
  let course = 'N/A';
  let allottedCollege = 'N/A';
  let allotmentQuota = 'N/A';
  
  if (isAiq) {
    status = 'EXITED TO AIQ';
    course = 'MBBS (AIQ)';
    allottedCollege = 'ALL INDIA QUOTA SEAT';
    allotmentQuota = 'ALL INDIA SC';
  } else if (c.sno <= 3300) {
    status = 'ALLOTTED (OC)';
    course = 'MBBS';
    allottedCollege = 'Open Category (OC) State Merit Pool';
    allotmentQuota = 'UNRESERVED / OPEN CATEGORY';
    ocCount++;
  } else {
    let gotSeat = false;
    for (let col of orderedColleges) {
      if (col.genSeats > 0) {
        col.genSeats--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `SC2_GEN (${col.type})`;
        gotSeat = true;
        break;
      } else if (c.gender === 'F' && col.femSeats > 0) {
        col.femSeats--;
        course = col.course;
        allottedCollege = col.name;
        allotmentQuota = `SC2_FEM (${col.type})`;
        gotSeat = true;
        break;
      }
    }
    if (!gotSeat) {
      status = 'UNALLOTTED';
      course = 'NONE';
      allottedCollege = 'NO SEAT AVAILABLE';
      allotmentQuota = 'WAITLISTED';
    }
  }

  const cleanName = `"${c.name.replace(/"/g, '""')}"`;
  csvData.push([
    c.sno,
    c.neetRank,
    c.neetScore,
    cleanName,
    c.gender,
    status,
    course,
    `"${allottedCollege}"`,
    allotmentQuota
  ].join(','));
}

const csvPath = path.join(__dirname, 'docs', 'Full_College_Mock_Allotment_SC2.csv');
fs.writeFileSync(csvPath, csvData.join('\n'), 'utf8');
console.log(`Mock allotment CSV with College Names generated at: ${csvPath}`);
