const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const text = fs.readFileSync(path.join(docsDir, 'last_year_merit_list_final_tg_extracted.txt'), 'utf8');

// Let's print out lines matching DANTADE SRIMAYI, DAGGUPATI ARPITHA, YACHARAM SAI POOJA
console.log("=== SEARCHING CANDIDATES IN LAST YEAR FINAL MERIT LIST ===");

const lines = text.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('DAGGUPATI ARPITHA') || line.includes('DANTADE SRIMAYI') || line.includes('SAI POOJA') || line.includes('312829') || line.includes('260591')) {
    console.log(`L${i}: ${line}`);
  }
}

// Now let's parse all candidates from last_year_merit_list_final_tg_extracted.txt
// Let's see the column header structure
console.log("\n=== HEADER PREVIEW ===");
for (let i = 0; i < 30; i++) {
  console.log(`L${i}: ${lines[i]}`);
}
