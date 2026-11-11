const fs = require('fs');
const path = require('path');

const layoutText = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Parse all 62 colleges with category cutoffs
// Categories: OPEN, EWS, BC_A, BC_B, BC_C, BC_D, BC_E, SC_1, SC_2, SC_3, ST
const pages = layoutText.split('--- PAGE ');

let collegeDataList = [];

for (let p of pages) {
  if (!p.trim()) continue;
  const lines = p.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('R | ') || line.includes(' | R | ')) {
      const rParts = line.split('|').map(s => s.trim());
      
      let mParts = [];
      for (let j = i + 1; j <= Math.min(lines.length - 1, i + 3); j++) {
        if (lines[j].startsWith('M | ') || lines[j].includes(' | M | ')) {
          mParts = lines[j].split('|').map(s => s.trim());
          break;
        }
      }
      
      let typeStr = "GOVT";
      let snoStr = "";
      
      for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
        const l = lines[j];
        if (l.includes('PVT-A')) typeStr = 'PVT-A';
        if (l.includes('GOVT') && !typeStr) typeStr = 'GOVT';
        const mSno = l.match(/^(\d{1,2})\s*\|/);
        if (mSno) snoStr = mSno[1];
      }
      
      let nameStr = "";
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        const l = lines[j];
        if (!l.includes(' | R | ') && !l.includes(' | M | ') && !l.includes('SEAT') && !l.includes('ROUND-3') && !l.includes('Statement') && !l.includes('KNR') && !l.includes('PAGE') && !l.includes('S NO') && !l.includes('MEDICAL COLLEGES') && l.trim().length > 3) {
          nameStr += " " + l.replace(/\|\s*(GOVT|PVT-A)/g, '').replace(/^\d+\s*\|/, '').trim();
        }
      }
      
      let rIdx = rParts.indexOf('R');
      if (rIdx !== -1) {
        // R indices:
        // OPEN: rIdx+1, EWS: rIdx+2, BC-A: rIdx+3, BC-B: rIdx+4, BC-C: rIdx+5, BC-D: rIdx+6, BC-E: rIdx+7, SC-1: rIdx+8, SC-2: rIdx+9, SC-3: rIdx+10, ST: rIdx+11
        const parseVal = (str) => {
          if (!str || str === '-') return 9999999;
          return parseInt(str.replace(/,/g, '')) || 9999999;
        };
        
        const knownRanks = {
          OC: parseVal(rParts[rIdx + 1]),
          EWS: parseVal(rParts[rIdx + 2]),
          BC_A: parseVal(rParts[rIdx + 3]),
          BC_B: parseVal(rParts[rIdx + 4]),
          BC_C: parseVal(rParts[rIdx + 5]),
          BC_D: parseVal(rParts[rIdx + 6]),
          BC_E: parseVal(rParts[rIdx + 7]),
          SC_1: parseVal(rParts[rIdx + 8]),
          SC_2: parseVal(rParts[rIdx + 9]),
          SC_3: parseVal(rParts[rIdx + 10]),
          SC: parseVal(rParts[rIdx + 9]), // Default SC mapped to SC-2
          ST: parseVal(rParts[rIdx + 11])
        };
        
        collegeDataList.push({
          sno: parseInt(snoStr) || collegeDataList.length + 1,
          name: nameStr.trim(),
          type: typeStr === 'GOVT' ? 'govt' : 'pvt',
          knownRanks
        });
      }
    }
  }
}

console.log(`Parsed ${collegeDataList.length} colleges with full Round 3 category cutoffs.`);
fs.writeFileSync('full_category_cutoffs.json', JSON.stringify(collegeDataList, null, 2));
