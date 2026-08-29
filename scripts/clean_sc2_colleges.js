const fs = require('fs');

const layoutText = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Parse each college cleanly:
// Format in cutoff_layout.txt:
// Line 1: [S.NO] | [COLLEGE NAME] | [TYPE] (or on adjacent lines)
// Line 2: R | OPEN | EWS | BC-A | BC-B | BC-C | BC-D | BC-E | SC-1 | SC-2 | SC-3 | ST
// Line 3: M | OPEN | EWS | BC-A | BC-B | BC-C | BC-D | BC-E | SC-1 | SC-2 | SC-3 | ST

const pages = layoutText.split('--- PAGE ');

let collegeList = [];

for (let p of pages) {
  if (!p.trim()) continue;
  const lines = p.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('R | ') || line.includes(' | R | ')) {
      const rParts = line.split('|').map(s => s.trim());
      
      // Find M line nearby
      let mParts = [];
      for (let j = i + 1; j <= Math.min(lines.length - 1, i + 3); j++) {
        if (lines[j].startsWith('M | ') || lines[j].includes(' | M | ')) {
          mParts = lines[j].split('|').map(s => s.trim());
          break;
        }
      }
      
      // Extract college name and type
      let nameStr = "";
      let typeStr = "";
      let snoStr = "";
      
      for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
        const l = lines[j];
        if (l.includes('PVT-A')) typeStr = 'PVT-A';
        if (l.includes('GOVT') && !typeStr) typeStr = 'GOVT';
        
        const mSno = l.match(/^(\d{1,2})\s*\|/);
        if (mSno) snoStr = mSno[1];
      }
      
      // Let's locate the college name line
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        const l = lines[j];
        if (!l.includes(' | R | ') && !l.includes(' | M | ') && !l.includes('SEAT') && !l.includes('ROUND-3') && !l.includes('Statement') && !l.includes('KNR') && !l.includes('PAGE') && !l.includes('S NO') && !l.includes('MEDICAL COLLEGES') && l.trim().length > 3) {
          nameStr += " " + l.replace(/\|\s*(GOVT|PVT-A)/g, '').replace(/^\d+\s*\|/, '').trim();
        }
      }
      
      let rIdx = rParts.indexOf('R');
      if (rIdx !== -1) {
        let sc2RankVal = rParts[rIdx + 9];
        let sc2ScoreVal = mParts.length > 0 ? mParts[mParts.indexOf('M') + 9] : '-';
        
        collegeList.push({
          sno: snoStr,
          name: nameStr.trim(),
          type: typeStr || 'GOVT/PVT-A',
          sc2RankStr: sc2RankVal,
          sc2ScoreStr: sc2ScoreVal,
          sc2Rank: parseInt(sc2RankVal) || 9999999,
          sc2Score: parseInt(sc2ScoreVal) || 0
        });
      }
    }
  }
}

console.log("Found colleges count:", collegeList.length);

// Sort by SC-2 Cutoff Rank
collegeList.sort((a, b) => a.sc2Rank - b.sc2Rank);

fs.writeFileSync('clean_sc2_colleges.json', JSON.stringify(collegeList, null, 2));
