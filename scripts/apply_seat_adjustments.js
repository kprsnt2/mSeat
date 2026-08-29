const fs = require('fs');

let govtColleges = JSON.parse(fs.readFileSync('merged_govt.json', 'utf8'));
let pvtColleges = JSON.parse(fs.readFileSync('merged_pvt.json', 'utf8'));

console.log(`Original: ${govtColleges.length} Govt, ${pvtColleges.length} Pvt colleges.`);

// 1. Update Govt seat increases
// GMC Mahabubnagar (+25 -> 200)
// GMC Nizamabad (+30 -> 150)
// GMC Siddipet (+25 -> 200)
// RIMS Adilabad (+30 -> 150)

govtColleges.forEach(c => {
  const norm = c.name.toLowerCase();
  if (norm.includes('mahabubnagar') || norm.includes('mahaboobnagar')) {
    c.intake = 200;
    c.seatsIncreased = 25;
  } else if (norm.includes('nizamabad')) {
    c.intake = 150;
    c.seatsIncreased = 30;
  } else if (norm.includes('siddipet')) {
    c.intake = 200;
    c.seatsIncreased = 25;
  } else if (norm.includes('adilabad') || norm.includes('rims')) {
    c.intake = 150;
    c.seatsIncreased = 30;
  }
});

// 2. Update Private seat increases
// Bhaskar (+50 -> 200)
// Maheshwara (+100 -> 250)
// Malla Reddy IMS (+50 -> 250)
// Malla Reddy Women (+50 -> 250)
// Mamata Academy Bachupally (+50 -> 200)
// MNR Sangareddy (+100 -> 250)
// SVS Mahabubnagar (+50 -> 200)
// Shadan (+100 -> 250)

pvtColleges.forEach(c => {
  const norm = c.name.toLowerCase();
  if (norm.includes('bhaskar')) {
    c.intake = 200; c.seatsIncreased = 50;
  } else if (norm.includes('maheshwara')) {
    c.intake = 250; c.seatsIncreased = 100;
  } else if (norm.includes('malla reddy') || norm.includes('mallareddy')) {
    c.intake = 250; c.seatsIncreased = 50;
  } else if (norm.includes('mamata academy') || norm.includes('bachupally')) {
    c.intake = 200; c.seatsIncreased = 50;
  } else if (norm.includes('mnr')) {
    c.intake = 250; c.seatsIncreased = 100;
  } else if (norm.includes('s.v.s') || norm.includes('svs')) {
    c.intake = 200; c.seatsIncreased = 50;
  } else if (norm.includes('shadan')) {
    c.intake = 250; c.seatsIncreased = 100;
  }
});

// Check if Raja Rajeshwari IMS Girls is in pvtColleges, if not add it
let hasRR = pvtColleges.some(c => c.name.toLowerCase().includes('raja rajeshwari') || c.name.toLowerCase().includes('rajarajeshwari'));
if (!hasRR) {
  pvtColleges.push({
    id: 128,
    name: "Raja Rajeshwari Institute of Medical Sciences (Girls)",
    place: "Telangana",
    intake: 150,
    seatsIncreased: 150,
    isNew: true,
    feeA: 60000,
    feeB: 1155000,
    feeC: 2300000,
    ocClosing: 175000,
    knownRanks: {
      OC: 175000,
      EWS: 180000,
      BC_A: 320000,
      BC_B: 210000,
      BC_C: 320000,
      BC_D: 200000,
      BC_E: 210000,
      SC_1: 310000,
      SC_2: 315000,
      SC_3: 280000,
      SC: 315000,
      ST: 265000
    }
  });
}

// 3. Adjust knownRanks cutoffs for colleges with increased seats
// When seats increase by +50, cutoff rank expands by ~6%
// When seats increase by +100, cutoff rank expands by ~12%
function adjustCutoffs(collegeList) {
  collegeList.forEach(c => {
    if (c.seatsIncreased && c.knownRanks) {
      const expansionFactor = c.seatsIncreased >= 100 ? 1.12 : c.seatsIncreased >= 50 ? 1.06 : 1.03;
      Object.keys(c.knownRanks).forEach(cat => {
        if (c.knownRanks[cat] && c.knownRanks[cat] !== 9999999) {
          c.knownRanks[cat] = Math.round(c.knownRanks[cat] * expansionFactor);
        }
      });
    }
  });
}

adjustCutoffs(govtColleges);
adjustCutoffs(pvtColleges);

fs.writeFileSync('merged_govt_2026.json', JSON.stringify(govtColleges, null, 2));
fs.writeFileSync('merged_pvt_2026.json', JSON.stringify(pvtColleges, null, 2));

console.log(`Updated data: ${govtColleges.length} Govt, ${pvtColleges.length} Pvt colleges.`);
