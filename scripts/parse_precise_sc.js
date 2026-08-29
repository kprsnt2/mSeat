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

let arpithaInfo = null;
let srimayiInfo = null;
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

  if (name.includes('DAGGUPATI ARPITHA') || sno === 6718 || rollNo === '4203102540') {
    arpithaInfo = record;
  }
  if (name.includes('DANTADE SRIMAYI') || sno === 8758 || rollNo === '4221101078') {
    srimayiInfo = record;
  }
  if (name.includes('SAI POOJA') || sno === 8902 || rollNo === '4204101514') {
    poojaInfo = record;
  }
}

console.log("\n=========================================================================");
console.log("LAST YEAR FINAL MERIT LIST SC CATEGORY EXACT RANK CALCULATIONS");
console.log("=========================================================================\n");

console.log("1. LAST GOVT COLLEGE CUTOFF CANDIDATE (DAGGUPATI ARPITHA):");
if (arpithaInfo) {
  console.log(`   - Name: ${arpithaInfo.name} | Gender: ${arpithaInfo.gender} | Category: ${arpithaInfo.cat}`);
  console.log(`   - State S.No: ${arpithaInfo.sno}`);
  console.log(`   - NEET All India Rank (AIR): ${arpithaInfo.rank.toLocaleString()} | Score: ${arpithaInfo.score}`);
  console.log(`   - SC2 Category Rank: #${arpithaInfo.currentSC2Count}`);
  console.log(`   - Overall SC Merit Rank (SC1+SC2+SC3): #${arpithaInfo.currentSCTotalCount}`);
}

console.log("\n2. LAST PRIVATE COLLEGE CUTOFF CANDIDATE (DANTADE SRIMAYI):");
if (srimayiInfo) {
  console.log(`   - Name: ${srimayiInfo.name} | Gender: ${srimayiInfo.gender} | Category: ${srimayiInfo.cat}`);
  console.log(`   - State S.No: ${srimayiInfo.sno}`);
  console.log(`   - NEET All India Rank (AIR): ${srimayiInfo.rank.toLocaleString()} | Score: ${srimayiInfo.score}`);
  console.log(`   - SC2 Category Rank: #${srimayiInfo.currentSC2Count}`);
  console.log(`   - Overall SC Merit Rank (SC1+SC2+SC3): #${srimayiInfo.currentSCTotalCount}`);
}

console.log("\n3. YOUR KID / CANDIDATE (YACHARAM SAI POOJA - State S.No 8902):");
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
