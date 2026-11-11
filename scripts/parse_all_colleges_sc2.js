const fs = require('fs');

const text = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Parse college blocks
// Standard row format:
// R | OPEN | EWS | BC-A | BC-B | BC-C | BC-D | BC-E | SC-1 | SC-2 | SC-3 | ST
// M | OPEN | EWS | BC-A | BC-B | BC-C | BC-D | BC-E | SC-1 | SC-2 | SC-3 | ST

const pages = text.split('--- PAGE ');

let colleges = [];

for (let p of pages) {
  if (!p.trim()) continue;
  
  const lines = p.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // We look for lines containing ' | R | ' or ' | M | '
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes(' | R | ') || line.includes(' | R ') || line.startsWith('R | ')) {
      // Find R line and M line
      const rLine = line;
      let mLine = "";
      if (i + 1 < lines.length && (lines[i+1].includes(' | M | ') || lines[i+1].startsWith('M | '))) {
        mLine = lines[i+1];
      }
      
      // Look around for College Name and Type (GOVT / PVT-A)
      let collegeName = "";
      let collegeType = "";
      let sno = "";
      
      // Search lines before or after for name/type
      for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
        const cur = lines[j];
        if (cur.includes('GOVT') || cur.includes('PVT-A')) {
          collegeType = cur.includes('GOVT') ? 'GOVT' : 'PVT-A';
        }
        if (/^\d+\s*\|/.test(cur) || /\|\s*\d+\s*\|/.test(cur)) {
          const m = cur.match(/\d+/);
          if (m) sno = m[0];
        }
      }
      
      // Extract R values (split by '|')
      const rParts = rLine.split('|').map(s => s.trim());
      const mParts = mLine ? mLine.split('|').map(s => s.trim()) : [];
      
      // Indexes: R is usually at index 1 or 2.
      // Columns: R, OPEN, EWS, BC-A, BC-B, BC-C, BC-D, BC-E, SC-1, SC-2, SC-3, ST
      // SC-2 is index 9 (or relative to R)
      let rIdx = rParts.indexOf('R');
      if (rIdx !== -1) {
        const sc2Rank = rParts[rIdx + 9] || rParts[rIdx + 8]; // depending on index
        const sc2Marks = mParts.length > 0 ? (mParts[rParts.indexOf('R') + 9] || mParts[rParts.indexOf('R') + 8]) : '';
        
        colleges.push({
          rawLine: line,
          rParts,
          mParts,
          sc2Rank,
          sc2Marks
        });
      }
    }
  }
}

console.log(`Extracted ${colleges.length} raw college data rows.`);
