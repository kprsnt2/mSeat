const fs = require('fs');
const path = require('path');

const cutoffText = fs.readFileSync(path.join(__dirname, 'docs', 'TS MBBS-College Wise Cut off (OU) ROUND-3_extracted.txt'), 'utf8');
const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');

// 1. Get details of candidate 8902
console.log("================ CANDIDATE PROFILE ================");
const lines = meritText.split('\n');
let candLine = "";
for (let l of lines) {
  if (l.includes('8902')) {
    candLine = l;
    break;
  }
}
console.log("Raw Merit Record:\n", candLine);

// 2. Parse all colleges and SC-2 cutoffs
// Let's write a parser for the cutoff document
console.log("\n================ ROUND 3 COLLEGE-WISE SC-2 CUTOFFS ================");

// The cutoff text consists of repeated blocks or tabular data.
// Let's dump line by line to see how colleges align with rows.
fs.writeFileSync('cutoff_debug.txt', cutoffText);

console.log("Wrote cutoff_debug.txt");
