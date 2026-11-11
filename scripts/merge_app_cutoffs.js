const fs = require('fs');

const rawColleges = JSON.parse(fs.readFileSync('full_category_cutoffs.json', 'utf8'));

// Format clean JavaScript arrays for app.js
let govtList = [];
let pvtList = [];

// Base list of user's colleges with fees & intake
const userGovtColleges = [
  { id: 1, name: "Gandhi Medical College", place: "Secunderabad", intake: 250, fee: 29000 },
  { id: 2, name: "Osmania Medical College", place: "Hyderabad", intake: 250, fee: 12000 },
  { id: 3, name: "ESIC Medical College", place: "Hyderabad", intake: 150, fee: 100000 },
  { id: 4, name: "Kakatiya Medical College", place: "Warangal", intake: 250, fee: 52000 },
  { id: 5, name: "Govt Medical College, Siddipet", place: "Siddipet", intake: 150, fee: 41000 },
  { id: 6, name: "Govt Medical College, Mahabubnagar", place: "Mahabubnagar", intake: 175, fee: 41000 },
  { id: 7, name: "Govt Medical College, Sangareddy", place: "Sangareddy", intake: 150, fee: 84000 },
  { id: 8, name: "Govt Medical College, Rajanna Sircilla", place: "Rajanna Sircilla", intake: 100, fee: 41000 },
  { id: 9, name: "Govt Medical College, Karimnagar", place: "Karimnagar", intake: 100, fee: 41000 },
  { id: 10, name: "Govt Medical College, Vikarabad", place: "Vikarabad", intake: 100, fee: 41000 },
  { id: 11, name: "Govt Medical College, Jangaon", place: "Jangaon", intake: 100, fee: 41000 },
  { id: 12, name: "Govt Medical College, Medak", place: "Medak", intake: 50, fee: 41000 },
  { id: 13, name: "Govt Medical College, Maheshwaram", place: "Maheshwaram", intake: 50, fee: 41000 },
  { id: 14, name: "Govt Medical College, Nalgonda", place: "Nalgonda", intake: 150, fee: 12000 },
  { id: 15, name: "Govt Medical College, Jagtial", place: "Jagtial", intake: 150, fee: 84000 },
  { id: 16, name: "Govt Medical College, Mahabubabad", place: "Mahabubabad", intake: 150, fee: 84000 },
  { id: 17, name: "Govt Medical College, Bhadradri Kothagudem", place: "Bhadradri Kothagudem", intake: 150, fee: 41000 },
  { id: 18, name: "Govt Medical College, Nagarkurnool", place: "Nagarkurnool", intake: 150, fee: 41000 },
  { id: 19, name: "RIMS Adilabad", place: "Adilabad", intake: 120, fee: 41000 },
  { id: 20, name: "Govt Medical College, Nizamabad", place: "Nizamabad", intake: 175, fee: 64000 },
  { id: 21, name: "Govt Medical College, Ramagundam", place: "Ramagundam", intake: 150, fee: 84000 },
  { id: 22, name: "Govt Medical College, Nirmal", place: "Nirmal", intake: 100, fee: 59200 },
  { id: 23, name: "Govt Medical College, Khammam", place: "Khammam", intake: 100, fee: 41000 },
  { id: 24, name: "Govt Medical College, Jayashankar Bhupalpally", place: "Jayashankar Bhupalpally", intake: 100, fee: 41000 },
  { id: 25, name: "Govt Medical College, Kamareddy", place: "Kamareddy", intake: 100, fee: 41000 },
  { id: 26, name: "Govt Medical College, K.B. Asifabad", place: "Kumuram Bheem Asifabad", intake: 100, fee: 41000 },
  { id: 27, name: "Govt Medical College, Narsampet", place: "Narsampet", intake: 50, fee: 64000 },
  { id: 28, name: "Govt Medical College, Jogulamba", place: "Jogulamba", intake: 50, fee: 41000 },
  { id: 29, name: "Govt Medical College, Mulugu", place: "Mulugu", intake: 50, fee: 64000 },
  { id: 30, name: "Govt Medical College, Narayanpet", place: "Narayanpet", intake: 50, fee: 41000 },
  { id: 31, name: "Govt Medical College, Yadadri Bhuvanagiri", place: "Yadadri Bhuvanagiri", intake: 50, fee: 64000 },
  { id: 32, name: "Govt Medical College, Quthbullapur", place: "Quthbullapur", intake: 50, fee: 76000 },
  { id: 33, name: "Govt Medical College, Kodangal", place: "Kodangal", intake: 50, fee: 76000 },
  { id: 34, name: "Govt Medical College, Suryapet", place: "Suryapet", intake: 150, fee: 29000 },
  { id: 35, name: "Govt Medical College, Mancherial", place: "Mancherial", intake: 100, fee: 64000 },
  { id: 36, name: "Govt Medical College, Wanaparthy", place: "Wanaparthy", intake: 100, fee: 64000 }
];

const userPvtColleges = [
  { id: 101, name: "Bhaskar Medical College", place: "Moinabad, Rangareddy", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 102, name: "Apollo Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000 },
  { id: 103, name: "Maheshwara Medical College", place: "Patancheru, Medak", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 104, name: "TRR Institute of Medical Sciences", place: "Inole, Patancheru", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 105, name: "MNR Medical College", place: "Sangareddy", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000 },
  { id: 106, name: "Neelima Institute of Medical Sciences", place: "Medchal", intake: 200, feeA: 60000, feeB: 1500000, feeC: 2250000 },
  { id: 107, name: "Arundathi Institute of Medical Sciences", place: "Dundigal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 108, name: "CMR Institute of Medical Sciences", place: "Kandalkoya, Medchal", intake: 250, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 109, name: "Dr Patnam Mahender Reddy IMS", place: "Chevella", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 110, name: "Medicity Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000 },
  { id: 111, name: "Nova Institute of Medical Sciences", place: "Hayathnagar", intake: 250, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 112, name: "Deccan College of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1250000, feeC: 2500000 },
  { id: 113, name: "Ayaan Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000 },
  { id: 114, name: "Dr VRK Women's Medical College", place: "Hyderabad", intake: 100, feeA: 60000, feeB: 1200000, feeC: 2400000 },
  { id: 115, name: "Shadan Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2400000 },
  { id: 116, name: "Mamata Academy of Medical Sciences", place: "Bachupally", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000 },
  { id: 117, name: "C Ananda Rao IMS", place: "Karimnagar", intake: 200, feeA: 60000, feeB: 1300000, feeC: 2600000 },
  { id: 118, name: "Prathima Institute of Medical Sciences", place: "Karimnagar", intake: 250, feeA: 60000, feeB: 1500000, feeC: 2250000 },
  { id: 119, name: "Kamineni Institute of Medical Sciences", place: "Narketpally", intake: 200, feeA: 60000, feeB: 1300000, feeC: 2600000 },
  { id: 120, name: "Mamata Medical College", place: "Khammam", intake: 200, feeA: 60000, feeB: 1200000, feeC: 2400000 },
  { id: 121, name: "S.V.S. Medical College", place: "Mahabubnagar", intake: 150, feeA: 60000, feeB: 1250000, feeC: 2500000 },
  { id: 122, name: "Surabhi Institute of Medical Sciences", place: "Siddipet", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 123, name: "Kamineni Academy of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000 },
  { id: 124, name: "Mahavir Institute of Medical Sciences", place: "Vikarabad", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 125, name: "Father Colombo IMS", place: "Warangal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2310000 },
  { id: 126, name: "Pratima Relief IMS", place: "Warangal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000 },
  { id: 127, name: "RVM Medical College", place: "Mulugu", intake: 250, feeA: 60000, feeB: 1200000, feeC: 2400000 }
];

// Helper to find matching official cutoffs
function findCutoff(cName) {
  const norm = cName.toLowerCase();
  for (let r of rawColleges) {
    const rNorm = r.name.toLowerCase();
    if (norm.split(' ')[0] && rNorm.includes(norm.split(' ')[0]) && norm.split(' ')[1] && rNorm.includes(norm.split(' ')[1])) {
      return r.knownRanks;
    }
  }
  return null;
}

// Build merged lists
const finalGovt = userGovtColleges.map(c => {
  const ranks = findCutoff(c.name) || {};
  return {
    ...c,
    ocClosing: ranks.OC || 100000,
    knownRanks: ranks
  };
});

const finalPvt = userPvtColleges.map(c => {
  const ranks = findCutoff(c.name) || {};
  return {
    ...c,
    ocClosing: ranks.OC || 180000,
    knownRanks: ranks
  };
});

fs.writeFileSync('merged_govt.json', JSON.stringify(finalGovt, null, 2));
fs.writeFileSync('merged_pvt.json', JSON.stringify(finalPvt, null, 2));
console.log("Successfully generated merged college cutoffs!");
