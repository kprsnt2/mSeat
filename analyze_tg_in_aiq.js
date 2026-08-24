const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');
const aiqRecords = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

// Build AIQ map by Rank
const aiqByRank = new Map();
for (let r of aiqRecords) {
  // If multiple students have same rank in AIQ, keep an array
  if (!aiqByRank.has(r.rank)) {
    aiqByRank.set(r.rank, []);
  }
  aiqByRank.get(r.rank).push(r);
}

// Regex to parse TG Merit List
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

console.log(`Total parsed candidates in TG Merit List: ${candidates.length}`);

// Find candidate S.No 8902 / AIR 289635
const myKid = candidates.find(c => c.sno === 8902 || c.neetRank === 289635);
console.log('Kid details:', myKid);

// 1. Total Telangana candidates who got AIQ seats across the ENTIRE merit list
const allTgMatches = [];
for (let c of candidates) {
  if (aiqByRank.has(c.neetRank)) {
    allTgMatches.push({ candidate: c, allotments: aiqByRank.get(c.neetRank) });
  }
}
console.log(`Total TG candidates in Merit List who secured AIQ seats: ${allTgMatches.length}`);

// 2. Candidates ABOVE my kid (sno < 8902 / neetRank < 289635)
const aheadCandidates = candidates.filter(c => c.sno < (myKid ? myKid.sno : 8902));
console.log(`Total TG candidates ahead of kid: ${aheadCandidates.length}`);

const aheadMatches = [];
for (let c of aheadCandidates) {
  if (aiqByRank.has(c.neetRank)) {
    aheadMatches.push({ candidate: c, allotments: aiqByRank.get(c.neetRank) });
  }
}
console.log(`Total TG candidates AHEAD who secured AIQ seats: ${aheadMatches.length}`);

// Category breakdown of all TG students ahead who got AIQ seats
const catBreakdown = {};
for (let m of aheadMatches) {
  const cat = m.candidate.category;
  let simpleCat = 'OC / General';
  if (cat.includes('SC')) simpleCat = 'SC';
  else if (cat.includes('ST')) simpleCat = 'ST';
  else if (cat.includes('OBC') || cat.includes('BC')) simpleCat = 'OBC / BC';
  else if (cat.includes('EWS')) simpleCat = 'EWS';

  if (!catBreakdown[simpleCat]) catBreakdown[simpleCat] = 0;
  catBreakdown[simpleCat]++;
}
console.log('\n--- Category Breakdown of TG Candidates Ahead in AIQ ---');
console.table(catBreakdown);

// Institution type breakdown of TG students ahead
const instTypeBreakdown = {
  AIIMS: 0,
  JIPMER: 0,
  Central_Deemed_Delhi: 0,
  ESIC_IP_Quota: 0,
  Telangana_Govt_Colleges_AIQ: 0,
  Other_State_Govt_Colleges_AIQ: 0,
  Deemed_Pvt: 0,
  BDS_Nursing: 0
};

for (let m of aheadMatches) {
  const a = m.allotments[0];
  const inst = (a.allottedInstitute || '').toLowerCase();
  const quota = (a.allottedQuota || '').toLowerCase();
  const course = (a.course || '').toUpperCase();

  if (course.includes('BDS') || course.includes('NURSING')) {
    instTypeBreakdown.BDS_Nursing++;
  } else if (quota.includes('deemed') || quota.includes('self-finance') || quota.includes('management')) {
    instTypeBreakdown.Deemed_Pvt++;
  } else if (inst.includes('aiims')) {
    instTypeBreakdown.AIIMS++;
  } else if (inst.includes('jipmer')) {
    instTypeBreakdown.JIPMER++;
  } else if (quota.includes('esic') || quota.includes('esi') || quota.includes('employees state insurance scheme(esi)')) {
    instTypeBreakdown.ESIC_IP_Quota++;
  } else if (
    inst.includes('telangana') ||
    inst.includes('hyderabad') ||
    inst.includes('secunderabad') ||
    inst.includes('warangal') ||
    inst.includes('osmania') ||
    inst.includes('gandhi medical') ||
    inst.includes('kakatiya') ||
    inst.includes('nizamabad') ||
    inst.includes('siddipet') ||
    inst.includes('karimnagar') ||
    inst.includes('mahabubnagar') ||
    inst.includes('khammam') ||
    inst.includes('suryapet') ||
    inst.includes('nalgonda') ||
    inst.includes('mancherial') ||
    inst.includes('ramagundam') ||
    inst.includes('jagtial') ||
    inst.includes('wanaparthy') ||
    inst.includes('nagarkurnool') ||
    inst.includes('sangareddy')
  ) {
    instTypeBreakdown.Telangana_Govt_Colleges_AIQ++;
  } else {
    instTypeBreakdown.Other_State_Govt_Colleges_AIQ++;
  }
}

console.log('\n--- Institution Type Breakdown of TG Candidates Ahead in AIQ ---');
console.table(instTypeBreakdown);

// SC candidates ahead who got AIQ seats
const scAheadList = aheadMatches.filter(m => m.candidate.category.includes('SC'));
console.log(`\nTotal SC Candidates Ahead with AIQ Seat: ${scAheadList.length}`);
console.log('\n--- All SC Candidates Ahead in AIQ ---');
scAheadList.forEach((m, i) => {
  const c = m.candidate;
  const a = m.allotments[0];
  console.log(`${i+1}. TG SNo ${c.sno} | AIR ${c.neetRank} | Score ${c.score} | ${c.name} (${c.gender}) -> ${a.allottedInstitute.split(',')[0]} [${a.course}] (${a.allottedQuota}, Allotted Cat: ${a.allottedCategory})`);
});
