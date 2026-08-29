const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');
const aiqRecords = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

// Build AIQ lookup by Rank
const aiqByRank = new Map();
for (let r of aiqRecords) {
  aiqByRank.set(r.rank, r);
}

// Regex to match candidate entries
// Example: 8902 289635 4201202238 YACHARAM SAI POOJA Female SC 393
// Category can be: SC, ST, OBC- NCL (Central List), General, General-EWS, etc.
// Sometimes PWD status is present e.g. "PwD" or empty.
// S.No is 1 to ~40,000. NEET Rank is 1 to ~1,500,000. Roll no is 10 digits (e.g. 4201202238).

const candRegex = /(\d{1,5})\s+(\d{1,7})\s+(\d{10})\s+(.+?)\s+(Male|Female)\s+(SC|ST|OBC-\s*NCL\s*\(Central\s*List\)|General-EWS|General|EWS|BC-[A-E])(?:\s+(PwD|PWD|YES|NO))?\s+(\d{2,3})/g;

const candidates = [];
let match;
while ((match = candRegex.exec(meritText)) !== null) {
  candidates.push({
    sno: parseInt(match[1], 10),
    neetRank: parseInt(match[2], 10),
    rollNo: match[3],
    name: match[4].trim(),
    gender: match[5],
    category: match[6].trim(),
    pwd: match[7] || 'NO',
    score: parseInt(match[8], 10)
  });
}

console.log(`Parsed ${candidates.length} candidates from Telangana Merit List.`);

// Find target candidate
const myKid = candidates.find(c => c.sno === 8902 || c.neetRank === 289635 || c.name.includes('SAI POOJA'));
console.log('Target Candidate:', myKid);

// If 8902 wasn't caught, let's search specifically around 8902
if (!myKid) {
  const idx = meritText.indexOf('289635');
  console.log('Substring around 289635:', meritText.substring(Math.max(0, idx - 100), idx + 200));
}

// Filter candidates ahead
const targetSno = myKid ? myKid.sno : 8902;
const targetRank = myKid ? myKid.neetRank : 289635;

const ahead = candidates.filter(c => c.sno < targetSno);
console.log(`\nTotal candidates ahead in State Merit List (S.No < ${targetSno}): ${ahead.length}`);

// Category breakdown of candidates ahead
const scAhead = ahead.filter(c => c.category.toUpperCase().includes('SC'));
const scFemaleAhead = scAhead.filter(c => c.gender.toLowerCase() === 'female');

console.log(`SC Candidates Ahead: ${scAhead.length} (Her State SC Category Rank is #${scAhead.length + 1})`);
console.log(`SC Female Candidates Ahead: ${scFemaleAhead.length} (Her State SC Female Category Rank is #${scFemaleAhead.length + 1})`);

// Check how many TG candidates ahead got AIQ Allotments
let allAiqAhead = [];
let scAiqAhead = [];

for (let c of ahead) {
  if (aiqByRank.has(c.neetRank)) {
    const aiqSeat = aiqByRank.get(c.neetRank);
    allAiqAhead.push({ candidate: c, allotment: aiqSeat });
    if (c.category.toUpperCase().includes('SC')) {
      scAiqAhead.push({ candidate: c, allotment: aiqSeat });
    }
  }
}

console.log(`\nTotal TG candidates ahead who secured an All India Seat in Round 1: ${allAiqAhead.length}`);
console.log(`Total SC candidates ahead who secured an All India Seat in Round 1: ${scAiqAhead.length}`);

console.log('\n--- Details of SC Candidates Ahead Allotted AIQ Seats ---');
scAiqAhead.forEach((item, idx) => {
  const c = item.candidate;
  const a = item.allotment;
  console.log(`${idx + 1}. TG S.No ${c.sno} | AIR ${c.neetRank} | Score ${c.score} | ${c.name} (${c.gender}) -> ${a.allottedInstitute.split(',')[0]} (${a.course}, ${a.allottedCategory}, Quota: ${a.allottedQuota})`);
});
