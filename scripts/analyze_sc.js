const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const meritText = fs.readFileSync(path.join(docsDir, 'merit_list_tg_extracted.txt'), 'utf8');
const cutoffText = fs.readFileSync(path.join(docsDir, 'TS MBBS-College Wise Cut off (OU) ROUND-3_extracted.txt'), 'utf8');

// 1. Find exact record for S.No 8902
console.log("=== CANDIDATE RECORD FOR STATE SERIAL 8902 ===");
const meritLines = meritText.split('\n');
let candidateLine = "";
for (let line of meritLines) {
  if (line.includes('8902')) {
    console.log(line);
    candidateLine = line;
  }
}

// 2. Calculate category rank (How many SC / SC-2 candidates are ahead of S.No 8902 in the merit list)
// Let's count SC candidates up to S.No 8902
let totalScBefore = 0;
let match8902 = null;

// Pattern matching for merit list lines: S.No, NEET Rank, Roll No, Name, Gender, Category, Score
// Let's parse all candidates up to 8902
const regex = /(\d+)\s+(\d+)\s+(\d+)\s+(.+?)\s+(Female|Male)\s+(.+?)\s+(\d+)/g;

// Let's also parse the cutoff file properly.
// The cutoff file has table rows with college name, OPEN, EWS, BC-A, BC-B, BC-C, BC-D, BC-E, SC-1, SC-2, SC-3, ST.
// R: Rank, M: Marks
console.log("\n=== CUTOFF ANALYSIS FOR SC-2 CATEGORY ===");
console.log(cutoffText.substring(0, 2000));
