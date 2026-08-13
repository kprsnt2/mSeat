const fs = require('fs');

const layoutText = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Let's parse page by page cleanly
const pages = layoutText.split('--- PAGE ');

let collegeList = [];

for (let pIdx = 1; pIdx < pages.length; pIdx++) {
  const pText = pages[pIdx];
  const lines = pText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // We notice each page has lines. Let's dump page lines to inspect structure
  console.log(`\n================ PAGE ${pIdx} (${lines.length} lines) ================`);
  for (let l of lines) {
    console.log(l);
  }
}
