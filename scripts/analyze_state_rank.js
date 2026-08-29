const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');
const aiqRecords = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

// Build AIQ lookup by Rank
const aiqByRank = new Map();
for (let r of aiqRecords) {
  aiqByRank.set(r.rank, r);
}

// Parse Telangana Merit List
// Format lines in merit list:
// S.No, NEET Rank, Roll No, Name, Gender, Category, Score
const lines = meritText.split('\n');
console.log(`Total lines in merit list: ${lines.length}`);

// Let's inspect line format
const parsedCandidates = [];
const candRegex = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.+?)\s+(Female|Male)\s+([A-Z0-9\-\/]+)\s+(\d+)/;

for (let line of lines) {
  const m = line.match(candRegex);
  if (m) {
    parsedCandidates.push({
      sno: parseInt(m[1], 10),
      neetRank: parseInt(m[2], 10),
      rollNo: m[3],
      name: m[4].trim(),
      gender: m[5],
      category: m[6].trim(),
      score: parseInt(m[7], 10),
      rawLine: line
    });
  }
}

console.log(`Successfully parsed ${parsedCandidates.length} candidates from Telangana Merit List.`);

// Find target candidate: YACHARAM SAI POOJA / Rank 289635 / SNo 8902
const myKid = parsedCandidates.find(c => c.sno === 8902 || c.neetRank === 289635 || c.name.includes('SAI POOJA'));
console.log('Target Candidate:', myKid);

if (!myKid) {
  console.log('Candidate not found via regex, searching lines directly...');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('8902') || lines[i].includes('289635') || lines[i].includes('SAI POOJA')) {
      console.log(`Line ${i}:`, lines[i]);
    }
  }
}

// Let's analyze all candidates ahead of candidate S.No 8902
const targetSno = myKid ? myKid.sno : 8902;
const targetRank = myKid ? myKid.neetRank : 289635;

const aheadCandidates = parsedCandidates.filter(c => c.sno < targetSno);
console.log(`Total candidates ahead in Telangana Merit List: ${aheadCandidates.length}`);

// SC candidates ahead
const scAhead = aheadCandidates.filter(c => c.category.toUpperCase().includes('SC'));
console.log(`Total SC candidates ahead in TG Merit List: ${scAhead.length}`);

// SC Female candidates ahead
const scFemaleAhead = scAhead.filter(c => c.gender.toLowerCase() === 'female');
console.log(`Total SC Female candidates ahead in TG Merit List: ${scFemaleAhead.length}`);

// Check how many TG candidates ahead got AIQ Allotment
let tgAheadInAIQ = 0;
let scAheadInAIQ = [];

for (let c of aheadCandidates) {
  if (aiqByRank.has(c.neetRank)) {
    tgAheadInAIQ++;
    if (c.category.toUpperCase().includes('SC')) {
      scAheadInAIQ.push({
        candidate: c,
        allotment: aiqByRank.get(c.neetRank)
      });
    }
  }
}

console.log(`Total TG candidates ahead who got AIQ Allotment: ${tgAheadInAIQ}`);
console.log(`SC candidates ahead in TG who got AIQ Allotment: ${scAheadInAIQ.length}`);

console.log('\n--- SC Candidates Ahead who secured AIQ Allotments ---');
scAheadInAIQ.forEach((item, idx) => {
  const c = item.candidate;
  const a = item.allotment;
  console.log(`${idx + 1}. TG S.No ${c.sno} | AIR ${c.neetRank} | ${c.name} (${c.gender}) -> ${a.allottedInstitute.split(',')[0]} (${a.course}, ${a.allottedCategory}, Quota: ${a.allottedQuota})`);
});
