const fs = require('fs');
const path = require('path');

const govtCollegesData = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));

let totalIntake = 0;
let totalAIQ15 = 0;
let totalState85 = 0;

const collegeBreakdown = [];

for (let c of govtCollegesData) {
  const intake = c.intake || 100;
  const name = c.name;
  totalIntake += intake;

  let aiq15 = 0;
  let state85 = 0;

  if (name.includes('AIIMS')) {
    aiq15 = intake;
    state85 = 0;
  } else if (name.includes('ESIC')) {
    // ESIC Sanath Nagar: 150 intake -> 22 AIQ 15% + 52 ESI IP + 76 State Quota
    aiq15 = 74; // Through MCC
    state85 = intake - 74; // 76 through KNRUHS
  } else {
    aiq15 = Math.round(intake * 0.15);
    state85 = intake - aiq15;
  }

  totalAIQ15 += aiq15;
  totalState85 += state85;

  const scGovtSeats = Math.round(state85 * 0.15);

  collegeBreakdown.push({
    name,
    intake,
    mccShare: aiq15,
    stateShare: state85,
    scStateSeats: scGovtSeats
  });
}

console.log(`\n===============================================================`);
console.log(`TELANGANA GOVERNMENT MBBS SEAT MATRIX BREAKDOWN`);
console.log(`===============================================================`);
console.log(`Total Government Medical Colleges: ${govtCollegesData.length}`);
console.log(`Total Govt MBBS Intake: ${totalIntake} seats`);
console.log(`Total Seats Contributed to MCC (15% AIQ + AIIMS + ESIC): ${totalAIQ15} seats`);
console.log(`Total Seats Retained for Telangana State Quota (85% KNRUHS): ${totalState85} seats`);
console.log(`Total SC Seats in State Govt Colleges (15% of 85%): ${Math.round(totalState85 * 0.15)} seats`);

console.log('\n--- Sample College Breakdown ---');
console.table(collegeBreakdown.slice(0, 15));
