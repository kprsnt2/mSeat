const fs = require('fs');
const path = require('path');

// 1. Load Data
const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const govtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtCollegesRaw = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));
const aiqByRank = new Set(aiqFinal.map(r => r.rank));

// Reservation percentages (standard TG rules)
const RES = {
  OC: 0.50,
  BCA: 0.07, BCB: 0.10, BCC: 0.01, BCD: 0.07, BCE: 0.04,
  SC1: 0.01, SC2: 0.07, SC3: 0.06, SC4: 0.01,
  ST: 0.06
};

// Helper: Distribute seats using Largest Remainder Method
function distributeSeatsExactly(colleges, cat, targetTotal) {
  let totalAssigned = 0;
  for (let c of colleges) {
    let exact = c.stateShare * RES[cat];
    c.matrix[cat] = { total: Math.floor(exact), remainder: exact - Math.floor(exact), gen: 0, fem: 0 };
    totalAssigned += c.matrix[cat].total;
  }
  
  let remaining = targetTotal - totalAssigned;
  colleges.sort((a, b) => b.matrix[cat].remainder - a.matrix[cat].remainder);
  
  for (let i = 0; i < remaining; i++) {
    colleges[i % colleges.length].matrix[cat].total++;
  }

  // Split into Gen (67%) and Fem (33%) using Largest Remainder
  let targetFemTotal = Math.round(targetTotal * 0.33);
  let totalFemAssigned = 0;
  
  for (let c of colleges) {
    let exactFem = c.matrix[cat].total * 0.33;
    c.matrix[cat].fem = Math.floor(exactFem);
    c.matrix[cat].femRemainder = exactFem - Math.floor(exactFem);
    totalFemAssigned += c.matrix[cat].fem;
  }
  
  let remainingFem = targetFemTotal - totalFemAssigned;
  colleges.sort((a, b) => b.matrix[cat].femRemainder - a.matrix[cat].femRemainder);
  
  for (let i = 0; i < remainingFem; i++) {
    // Only give female seat if total > 0 and we haven't made all of them female (unless total is 1)
    if (colleges[i % colleges.length].matrix[cat].total > colleges[i % colleges.length].matrix[cat].fem) {
      colleges[i % colleges.length].matrix[cat].fem++;
    }
  }

  for (let c of colleges) {
    c.matrix[cat].gen = c.matrix[cat].total - c.matrix[cat].fem;
  }
}

// 2. Prepare Colleges
let govtColleges = [];
let totalGovtShare = 0;

for (let c of govtCollegesRaw) {
  let stateShare = 0;
  if (c.name.includes('AIIMS')) continue;
  if (c.name.includes('ESIC')) stateShare = 76;
  else stateShare = Math.round((c.intake || 100) * 0.85);
  
  totalGovtShare += stateShare;
  govtColleges.push({
    name: c.name,
    type: 'GOVT',
    course: 'MBBS',
    stateShare: stateShare,
    matrix: {},
    priorityRank: c.knownRanks && c.knownRanks.SC_2 ? c.knownRanks.SC_2 : 999999
  });
}

let pvtColleges = [];
let totalPvtShare = 0;

for (let c of pvtCollegesRaw) {
  // Minority colleges do not have SC/ST/BC reservations. Exclude them from this pool.
  if (c.name.includes('Minority')) continue; 
  
  let stateShare = Math.round((c.intake || 150) * 0.50);
  totalPvtShare += stateShare;
  pvtColleges.push({
    name: c.name,
    type: 'PVT',
    course: 'MBBS',
    stateShare: stateShare,
    matrix: {},
    priorityRank: c.knownRanks && c.knownRanks.SC_2 ? c.knownRanks.SC_2 : 999999
  });
}

// Apply Largest Remainder Method per category
Object.keys(RES).forEach(cat => {
  let govtTarget = Math.round(totalGovtShare * RES[cat]);
  distributeSeatsExactly(govtColleges, cat, govtTarget);
  
  let pvtTarget = Math.round(totalPvtShare * RES[cat]);
  distributeSeatsExactly(pvtColleges, cat, pvtTarget);
});

// Re-sort back to priority order
govtColleges.sort((a, b) => a.priorityRank - b.priorityRank);
pvtColleges.sort((a, b) => a.priorityRank - b.priorityRank);

let orderedColleges = [...govtColleges, ...pvtColleges];

// Check SC2 seats strictly generated
let sc2GovtGen = 0, sc2GovtFem = 0, sc2PvtGen = 0, sc2PvtFem = 0;
for (let c of govtColleges) { sc2GovtGen += c.matrix.SC2.gen; sc2GovtFem += c.matrix.SC2.fem; }
for (let c of pvtColleges) { sc2PvtGen += c.matrix.SC2.gen; sc2PvtFem += c.matrix.SC2.fem; }

console.log(`Fixed Seat Matrix Generated!`);
console.log(`Govt SC2 Seats: ${sc2GovtGen} Gen, ${sc2GovtFem} Fem (Total: ${sc2GovtGen+sc2GovtFem})`);
console.log(`Pvt SC2 Seats: ${sc2PvtGen} Gen, ${sc2PvtFem} Fem (Total: ${sc2PvtGen+sc2PvtFem})`);
console.log(`Total SC-2 Seats: ${sc2GovtGen+sc2GovtFem+sc2PvtGen+sc2PvtFem}`);

// 3. Run Allotment
candidates.sort((a, b) => a.sno - b.sno);

const csvData = [];
csvData.push(['S.No', 'NEET Rank', 'Score', 'Name', 'Gender', 'Category', 'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota']);

let allotments = 0;
let kidResult = null;

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
    let candCat = c.category; 
    if (candCat === 'SC') candCat = 'SC2'; 
    
    // Check colleges in order
    for (let col of orderedColleges) {
      if (col.matrix.OC.gen > 0) {
        col.matrix.OC.gen--;
        course = col.course; allottedCollege = col.name; allotmentQuota = `OC_GEN (${col.type})`; gotSeat = true; break;
      } else if (c.gender === 'F' && col.matrix.OC.fem > 0) {
        col.matrix.OC.fem--;
        course = col.course; allottedCollege = col.name; allotmentQuota = `OC_FEM (${col.type})`; gotSeat = true; break;
      } else if (col.matrix[candCat] && col.matrix[candCat].gen > 0) {
        col.matrix[candCat].gen--;
        course = col.course; allottedCollege = col.name; allotmentQuota = `${candCat}_GEN (${col.type})`; gotSeat = true; break;
      } else if (c.gender === 'F' && col.matrix[candCat] && col.matrix[candCat].fem > 0) {
        col.matrix[candCat].fem--;
        course = col.course; allottedCollege = col.name; allotmentQuota = `${candCat}_FEM (${col.type})`; gotSeat = true; break;
      }
    }
    
    if (!gotSeat) {
      status = 'UNALLOTTED';
      course = 'NONE'; allottedCollege = 'NO MBBS SEAT AVAILABLE'; allotmentQuota = 'WAITLISTED (Try BDS/AYUSH)';
    } else {
      allotments++;
    }
  }

  const cleanName = `"${c.name.replace(/"/g, '""')}"`;
  const row = [c.sno, c.neetRank, c.neetScore, cleanName, c.gender, c.category, status, course, `"${allottedCollege}"`, allotmentQuota].join(',');
  csvData.push(row);
  
  if (c.rollNo === '4204101514') kidResult = row;
}

const csvPath = path.join(__dirname, 'docs', 'Fixed_Global_Mock_Allotment.csv');
fs.writeFileSync(csvPath, csvData.join('\n'), 'utf8');
console.log(`\nFixed Mock allotment CSV generated for ${candidates.length} candidates at: ${csvPath}`);
console.log(`Total State MBBS Allotments made: ${allotments}`);
console.log(`\nYour Daughter's Result:`);
console.log(kidResult);
