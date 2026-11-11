const fs = require('fs');

const rawColleges = JSON.parse(fs.readFileSync('full_category_cutoffs.json', 'utf8'));

console.log("Total raw colleges extracted from Round 3 PDF layout:", rawColleges.length);

// Let's print out all rawColleges to inspect names
rawColleges.forEach((c, i) => {
  console.log(`${i+1}. SNO: ${c.sno} | Type: ${c.type} | Name: "${c.name}" | SC_2: ${c.knownRanks ? c.knownRanks.SC_2 : 'NONE'}`);
});
