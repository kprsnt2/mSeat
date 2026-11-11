const fs = require('fs');
const path = require('path');

const cutoffText = fs.readFileSync(path.join(__dirname, 'docs', 'TS MBBS-College Wise Cut off (OU) ROUND-3_extracted.txt'), 'utf8');

console.log("=== CUTOFF TEXT LENGTH ===", cutoffText.length);
console.log(cutoffText.substring(0, 4000));
