const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'docs', 'last_year_merit_list_final_tg_extracted.txt'), 'utf8');

// Regex matching candidate entries:
// S.No (1-5 digits), RollNo (10 digits), Rank (1-7 digits), Score, Grace/Marks... Name, Gender (F|M), Category (SC1|SC2|SC3|SC|ST|OC|EWS|BCA|BCB|BCC|BCD|BCE)
const regex = /(\d+)\s+(\d{10})\s+(\d+)\s+(\d+)\s+(.*?)\s+([FM])\s+(SC1|SC2|SC3|SC|ST|OC|EWS|BCA|BCB|BCC|BCD|BCE)\b/g;

let allEntries = [];
let sc2Count = 0;
let scTotalCount = 0;

const matches = [...text.matchAll(regex)];
console.log(`Matched ${matches.length} candidate records in final merit list.`);

let candFInfo = null;
let candEInfo = null;
let poojaInfo = null;

for (let m of matches) {
  const sno = parseInt(m[1]);
  const rollNo = m[2];
  const rank = parseInt(m[3]);
  const score = parseInt(m[4]);
  const name = m[5].trim();
  const gender = m[6];
  const cat = m[7];

  const isSC = cat.startsWith('SC');
  const isSC2 = cat === 'SC2';

  if (isSC) scTotalCount++;
  if (isSC2) sc2Count++;

  const record = {
    sno,
    rollNo,
    rank,
    score,
    name,
    gender,
    cat,
    sc2Rank: isSC2 ? sc2Count : null,
    overallScRank: isSC ? scTotalCount : null,
    currentSC2Count: sc2Count,
    currentSCTotalCount: scTotalCount
  };

  if (name.includes('CANDIDATE F') || sno === 6718 || rollNo === 'REDACTED') {
    candFInfo = record;
  }
  if (name.includes('CANDIDATE E') || sno === 8758 || rollNo === 'REDACTED') {
    candEInfo = record;
  }
  if (name.includes('CANDIDATE C') || sno === 8902 || rollNo === 'REDACTED') {
    poojaInfo = record;
  }
}

console.log("\n=========================================================================");
console.log("LAST YEAR FINAL MERIT LIST SC CATEGORY EXACT RANK CALCULATIONS");
console.log("=========================================================================\n");

console.log("1. LAST GOVT COLLEGE CUTOFF CANDIDATE (CANDIDATE F):");
if (candFInfo) {
  console.log(`   - Name: ${candFInfo.name} | Gender: ${candFInfo.gender} | Category: ${candFInfo.cat}`);
  console.log(`   - State S.No: ${candFInfo.sno}`);
  console.log(`   - NEET All India Rank (AIR): ${candFInfo.rank.toLocaleString()} | Score: ${candFInfo.score}`);
  console.log(`   - SC2 Category Rank: #${candFInfo.currentSC2Count}`);
  console.log(`   - Overall SC Merit Rank (SC1+SC2+SC3): #${candFInfo.currentSCTotalCount}`);
}

console.log("\n2. LAST PRIVATE COLLEGE CUTOFF CANDIDATE (CANDIDATE E):");
if (candEInfo) {
  console.log(`   - Name: ${candEInfo.name} | Gender: ${candEInfo.gender} | Category: ${candEInfo.cat}`);
  console.log(`   - State S.No: ${candEInfo.sno}`);
  console.log(`   - NEET All India Rank (AIR): ${candEInfo.rank.toLocaleString()} | Score: ${candEInfo.score}`);
  console.log(`   - SC2 Category Rank: #${candEInfo.currentSC2Count}`);
  console.log(`   - Overall SC Merit Rank (SC1+SC2+SC3): #${candEInfo.currentSCTotalCount}`);
}

console.log("\n3. YOUR KID / CANDIDATE (CANDIDATE C - State S.No 8902):");
if (poojaInfo) {
  console.log(`   - Name: ${poojaInfo.name} | Gender: ${poojaInfo.gender} | Category: ${poojaInfo.cat}`);
  console.log(`   - State S.No: ${poojaInfo.sno}`);
  console.log(`   - NEET All India Rank (AIR): ${poojaInfo.rank.toLocaleString()} | Score: ${poojaInfo.score}`);
  console.log(`   - SC2 Category Rank: #${poojaInfo.currentSC2Count}`);
  console.log(`   - Overall SC Merit Rank (SC1+SC2+SC3): #${poojaInfo.currentSCTotalCount}`);
} else {
  console.log("   (Checking position around S.No 8902 in the list...)");
}

console.log(`\nTOTAL SC2 Candidates in State: ${sc2Count}`);
console.log(`TOTAL Overall SC (SC1+SC2+SC3) Candidates in State: ${scTotalCount}`);
