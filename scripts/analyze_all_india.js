const fs = require('fs');
const path = require('path');

const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

console.log(`Total records: ${records.length}`);

// Sample record
console.log('Sample record:', records[0]);

// Find all unique states or college names
// Let's find all records mentioning Telangana, Hyderabad, Secunderabad, Bibinagar, Warangal, Nizamabad, etc.
// And Andhra Pradesh, Visakhapatnam, Vijayawada, Guntur, Tirupati, Kurnool, Mangalagiri, etc.

const tgKeywords = [
  'telangana', 'hyderabad', 'secunderabad', 'bibinagar', 'warangal', 'nizamabad',
  'karimnagar', 'khammam', 'mahabubnagar', 'siddipet', 'nalgonda', 'suryapet',
  'mancherial', 'ramagundam', 'jagtial', 'kothagudem', 'nagarkurnool', 'wanaparthy',
  'sangareddy', 'mahabubabad', 'bhadradri', 'asifabad', 'bhupalpally', 'jangaon',
  'kamareddy', 'mulugu', 'narayanpet', 'nirmal', 'rajanna', 'vikarabad', 'gandhi medical',
  'osmania', 'kakatiya', 'esic medical college, sanath nagar'
];

const apKeywords = [
  'andhra', 'visakhapatnam', 'vijayawada', 'guntur', 'tirupati', 'kurnool',
  'mangalagiri', 'kakinada', 'anantapur', 'nellore', 'kadapa', 'ongole',
  'srikakulam', 'machilipatnam', 'eluru', 'rajamahendravaram', 'nandyal',
  'vizianagaram', 'paderu', 'markapur', 'madanapalle', 'adoni', 'pulivendula',
  'svims', 'andhra medical college', 'rangaraya', 'acsr'
];

// Let's filter records
function isTG(inst) {
  const lower = inst.toLowerCase();
  return tgKeywords.some(k => lower.includes(k));
}

function isAP(inst) {
  const lower = inst.toLowerCase();
  return apKeywords.some(k => lower.includes(k));
}

const tgRecords = records.filter(r => isTG(r.allottedInstitute));
const apRecords = records.filter(r => isAP(r.allottedInstitute));

console.log(`\nMatched TG records: ${tgRecords.length}`);
console.log(`Matched AP records: ${apRecords.length}`);

// Unique colleges in TG
const tgColleges = [...new Set(tgRecords.map(r => r.allottedInstitute))];
console.log(`\nTG Colleges (${tgColleges.length}):`);
tgColleges.forEach(c => console.log(' - ' + c));

// Unique colleges in AP
const apColleges = [...new Set(apRecords.map(r => r.allottedInstitute))];
console.log(`\nAP Colleges (${apColleges.length}):`);
apColleges.forEach(c => console.log(' - ' + c));
