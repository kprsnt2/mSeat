const fs = require('fs');

const text = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Parse colleges precisely from cutoff_layout.txt
const lines = text.split('\n');

let colleges = [];
let currentCollege = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.includes(' | R | ') || line.startsWith('R | ') || line.includes(' | R ')) {
    const rParts = line.split('|').map(s => s.trim());
    let mParts = [];
    
    // Check next 2 lines for M (marks) line
    for (let j = i + 1; j <= Math.min(lines.length - 1, i + 3); j++) {
      if (lines[j].includes(' | M | ') || lines[j].startsWith('M | ') || lines[j].includes(' | M ')) {
        mParts = lines[j].split('|').map(s => s.trim());
        break;
      }
    }
    
    // Collect text lines nearby for college name & SNO & Type
    let nameText = "";
    let typeText = "GOVT";
    let snoVal = "";
    
    for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
      const l = lines[j];
      if (l.includes('PVT-A')) typeText = 'PVT-A';
      if (l.includes('GOVT') && !l.includes('GOVT.')) typeText = 'GOVT';
      
      const mNo = l.match(/^(\d{1,2})\s*\|/);
      if (mNo) snoVal = mNo[1];
    }
    
    // Find SC-2 index in R parts
    // Header format: SEAT | OPEN | EWS | BC-A | BC-B | BC-C | BC-D | BC-E | SC-1 | SC-2 | SC-3 | ST
    // R parts array index of R is where 'R' appears
    let rIdx = rParts.indexOf('R');
    if (rIdx !== -1) {
      let sc2RankStr = rParts[rIdx + 9]; // 9th position after R
      let sc2ScoreStr = mParts.length > 0 ? mParts[mParts.indexOf('M') + 9] : '-';
      
      // Let's also grab college name by looking at lines surrounding R
      let cName = "";
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        const l = lines[j];
        if (!l.includes(' | R | ') && !l.includes(' | M | ') && !l.includes('SEAT') && !l.includes('ROUND-3') && !l.includes('Statement') && !l.includes('KNR') && !l.includes('PAGE') && l.trim().length > 3) {
          cName += " " + l.replace(/\|\s*(GOVT|PVT-A)/g, '').replace(/^\d+\s*\|/, '').trim();
        }
      }
      
      colleges.push({
        lineIndex: i,
        rawR: line,
        rawM: mParts.join(' | '),
        rParts,
        mParts,
        sc2RankStr,
        sc2ScoreStr,
        sc2Rank: parseInt(sc2RankStr) || null,
        sc2Score: parseInt(sc2ScoreStr) || null,
        cName: cName.trim(),
        typeText
      });
    }
  }
}

console.log(`Parsed ${colleges.length} raw college rows.`);
fs.writeFileSync('parsed_colleges.json', JSON.stringify(colleges, null, 2));
