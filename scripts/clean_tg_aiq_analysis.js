const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');
const aiqRecords = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

const aiqByRank = new Map();
for (let r of aiqRecords) {
  if (!aiqByRank.has(r.rank)) aiqByRank.set(r.rank, []);
  aiqByRank.get(r.rank).push(r);
}

// Cleaner line-by-line / token parsing
// Let's tokenize by SNo (which starts with digits at beginning of record)
// In meritText, records are like: "<SNo>   <Rank>   <RollNo>   <Name>   <Gender>   <Category>   [PwD]   <Score>"
const tokens = meritText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Split on individual lines or normalize spaces
const lines = tokens.split('\n');
const parsed = [];

for (let line of lines) {
  // Check if line contains a candidate row
  // Regex looking for: SNo (1-5 digits), Rank (1-7 digits), RollNo (10 digits), Name, Gender, Category, Score (2-3 digits)
  const regex = /(\d{1,5})\s+(\d{1,7})\s+(\d{10})\s+([A-Za-z\s\.\,\'\-]+?)\s+(Male|Female)\s+(SC|ST|OBC-\s*NCL\s*\(Central\s*List\)|General-EWS|General|EWS|BC-[A-E]|Gen-EWS)(?:\s+(PwD|PWD|YES|NO))?\s+(\d{2,3})/g;
  let m;
  while ((m = regex.exec(line)) !== null) {
    parsed.push({
      sno: parseInt(m[1], 10),
      neetRank: parseInt(m[2], 10),
      rollNo: m[3],
      name: m[4].trim(),
      gender: m[5],
      category: m[6].trim().replace(/\s+/g, ' '),
      score: parseInt(m[8], 10)
    });
  }
}

console.log(`Cleanly parsed candidates: ${parsed.length}`);

// Unique by Roll No / S.No
const uniqueCands = [];
const seenRoll = new Set();
for (let c of parsed) {
  if (!seenRoll.has(c.rollNo)) {
    seenRoll.add(c.rollNo);
    uniqueCands.push(c);
  }
}

console.log(`Unique candidates: ${uniqueCands.length}`);

// Kid check
const myKid = uniqueCands.find(c => c.sno === 8902 || c.neetRank === 289635);
console.log('Kid record:', myKid);

// Total TG candidates in AIQ
const totalTgInAiq = uniqueCands.filter(c => aiqByRank.has(c.neetRank));
console.log(`Total Telangana students with AIQ Allotment: ${totalTgInAiq.length}`);

// Candidates ahead of kid
const ahead = uniqueCands.filter(c => c.sno < (myKid ? myKid.sno : 8902) && c.neetRank < 289635);
console.log(`Total Candidates ahead of kid in TG Merit List: ${ahead.length}`);

const aheadInAiq = ahead.filter(c => aiqByRank.has(c.neetRank));
console.log(`Total Candidates AHEAD of kid with AIQ Allotment: ${aheadInAiq.length}`);

// Breakdown by category of ahead candidates with AIQ seats
const catCount = {};
for (let c of aheadInAiq) {
  let cat = c.category;
  if (cat.includes('SC')) cat = 'SC';
  else if (cat.includes('ST')) cat = 'ST';
  else if (cat.includes('OBC') || cat.includes('BC')) cat = 'OBC / BC';
  else if (cat.includes('EWS') || cat.includes('Gen-EWS') || cat.includes('General-EWS')) cat = 'EWS';
  else cat = 'OC / General';

  catCount[cat] = (catCount[cat] || 0) + 1;
}

console.log('\nCategory breakdown of candidates ahead with AIQ seats:');
console.table(catCount);

// Clean SC Candidates Ahead with AIQ seats
const scAhead = aheadInAiq.filter(c => c.category === 'SC' || c.category.includes('SC'));
console.log(`\nExact SC Candidates Ahead with AIQ Seats: ${scAhead.length}`);

const scTable = scAhead.map((c, i) => {
  const a = aiqByRank.get(c.neetRank)[0];
  return {
    sno: c.sno,
    rank: c.neetRank,
    score: c.score,
    name: c.name,
    gender: c.gender,
    allottedCollege: a.allottedInstitute.split(',')[0],
    course: a.course,
    quota: a.allottedQuota,
    allottedCategory: a.allottedCategory
  };
});

console.table(scTable);
