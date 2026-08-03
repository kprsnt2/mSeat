const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const meritText = fs.readFileSync(path.join(docsDir, 'merit_list_tg_extracted.txt'), 'utf8');
const cutoffText = fs.readFileSync(path.join(docsDir, 'TS MBBS-College Wise Cut off (OU) ROUND-3_extracted.txt'), 'utf8');

// 1. Analyze candidate 8902 in merit list
const lines = meritText.split('\n');

let scCount = 0;
let candidateInfo = null;

// Regex to capture line entries
// Example: 8902   289635   4204101514 YACHARAM SAI POOJA   Female   SC   393
const entryRegex = /(\d+)\s+(\d+)\s+(\d+)\s+(.+?)\s+(Female|Male)\s+([A-Za-z0-9\-\s\(\)]+?)\s+(\d+)/;

for (let line of lines) {
  // Check if line contains entry
  // A line can have multiple entries or single entry concatenated
  // Let's split by digit patterns or search
  const matches = [...line.matchAll(/(\d+)\s+(\d+)\s+(\d+)\s+(.*?)\s+(Female|Male)\s+(OBC-\s*NCL\s*\(Central List\)|General|Gen-EWS|SC|ST)\s+(\d+)/g)];
  for (let m of matches) {
    const sno = parseInt(m[1]);
    const neetRank = parseInt(m[2]);
    const rollNo = m[3];
    const name = m[4].trim();
    const gender = m[5];
    const cat = m[6].trim();
    const score = parseInt(m[7]);

    if (cat === 'SC') {
      scCount++;
    }

    if (sno === 8902) {
      candidateInfo = {
        sno,
        neetRank,
        rollNo,
        name,
        gender,
        cat,
        score,
        scRank: scCount
      };
    }
  }
}

console.log("=== CANDIDATE DETAIL ===");
console.log(candidateInfo);
console.log(`Total SC Candidates up to S.No 8902: ${scCount}`);

// Now let's parse Cutoff file
fs.writeFileSync('cutoff_raw.txt', cutoffText);
