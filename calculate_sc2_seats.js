const fs = require('fs');
const path = require('path');

const govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

// 1. Government Medical Colleges (85% State Quota)
let totalGovtIntake = 0;
let totalGovtStateSeats = 0;

for (let c of govtColleges) {
  const intake = c.intake || 100;
  totalGovtIntake += intake;

  let stateShare = 0;
  if (c.name.includes('AIIMS')) {
    stateShare = 0;
  } else if (c.name.includes('ESIC')) {
    stateShare = 76; // 74 through MCC, 76 through KNRUHS
  } else {
    stateShare = Math.round(intake * 0.85);
  }
  totalGovtStateSeats += stateShare;
}

// In Telangana: SC Reservation = 15%
// Sub-categorization:
// SC-1: 1%
// SC-2: 7%
// SC-3: 6%
// SC-4: 1%
// Total: 15%

const govt_SC_Total = Math.round(totalGovtStateSeats * 0.15);
const govt_SC1 = Math.round(totalGovtStateSeats * 0.01);
const govt_SC2 = Math.round(totalGovtStateSeats * 0.07);
const govt_SC3 = Math.round(totalGovtStateSeats * 0.06);
const govt_SC4 = Math.round(totalGovtStateSeats * 0.01);

const govt_SC2_Female = Math.round(govt_SC2 * 0.33);
const govt_SC2_General = govt_SC2 - govt_SC2_Female;

// 2. Private Medical Colleges (Category-A 50% Convenor Quota)
let totalPvtIntake = 0;
let totalPvtCatA = 0;

for (let c of pvtColleges) {
  const intake = c.intake || 150;
  totalPvtIntake += intake;
  const catA = Math.round(intake * 0.50); // 50% seats under Convenor Quota
  totalPvtCatA += catA;
}

const pvt_SC_Total = Math.round(totalPvtCatA * 0.15);
const pvt_SC1 = Math.round(totalPvtCatA * 0.01);
const pvt_SC2 = Math.round(totalPvtCatA * 0.07);
const pvt_SC3 = Math.round(totalPvtCatA * 0.06);
const pvt_SC4 = Math.round(totalPvtCatA * 0.01);

const pvt_SC2_Female = Math.round(pvt_SC2 * 0.33);
const pvt_SC2_General = pvt_SC2 - pvt_SC2_Female;

console.log('========================================================================');
console.log('TELANGANA MBBS SC & SC-2 SEAT MATRIX BREAKDOWN');
console.log('========================================================================');

console.log('\n--- 1. GOVERNMENT MEDICAL COLLEGES (State 85% Convenor Quota) ---');
console.log(`Total Colleges:                 ${govtColleges.length}`);
console.log(`Total Govt MBBS Intake:         ${totalGovtIntake}`);
console.log(`Total State Quota Seats (85%):  ${totalGovtStateSeats}`);
console.log(`Total SC Seats (15%):           ${govt_SC_Total}`);
console.log(`• SC-1 Seats (1%):              ${govt_SC1}`);
console.log(`• SC-2 Seats (7%):              ${govt_SC2} (General: ${govt_SC2_General}, Female 33%: ${govt_SC2_Female})`);
console.log(`• SC-3 Seats (6%):              ${govt_SC3}`);
console.log(`• SC-4 Seats (1%):              ${govt_SC4}`);

console.log('\n--- 2. PRIVATE MEDICAL COLLEGES (Category-A 50% Govt Convenor Quota) ---');
console.log(`Total Colleges:                 ${pvtColleges.length}`);
console.log(`Total Private MBBS Intake:      ${totalPvtIntake}`);
console.log(`Total Cat-A Convenor Seats:     ${totalPvtCatA}`);
console.log(`Total SC Seats (15%):           ${pvt_SC_Total}`);
console.log(`• SC-1 Seats (1%):              ${pvt_SC1}`);
console.log(`• SC-2 Seats (7%):              ${pvt_SC2} (General: ${pvt_SC2_General}, Female 33%: ${pvt_SC2_Female})`);
console.log(`• SC-3 Seats (6%):              ${pvt_SC3}`);
console.log(`• SC-4 Seats (1%):              ${pvt_SC4}`);

console.log('\n--- 3. TOTAL COMBINED STATE CONVENOR QUOTA (GOVT + PRIVATE CAT-A) ---');
console.log(`Total Subsidized MBBS Seats:    ${totalGovtStateSeats + totalPvtCatA}`);
console.log(`Total SC Seats (15%):           ${govt_SC_Total + pvt_SC_Total}`);
console.log(`• TOTAL SC-2 SEATS (7%):        ${govt_SC2 + pvt_SC2} Seats`);
console.log(`  - SC-2 General Seats:         ${govt_SC2_General + pvt_SC2_General}`);
console.log(`  - SC-2 Female Seats (33%):    ${govt_SC2_Female + pvt_SC2_Female}`);
