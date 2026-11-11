const fs = require('fs');
const path = require('path');

async function parseFinalMerit() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const filePath = path.join(process.cwd(), 'docs', 'AY-2026-27-FINAL-MERIT-LIST.pdf');
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  console.log('Loaded PDF, pages:', doc.numPages);
  
  const candidates = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const pageText = content.items.map(it => it.str).join(' ');

    // Match candidate rows
    // SNo (1-5 digits), RollNo (10 digits), Rank (1-7 digits), Score (2-3 digits), [NCC score], Final Score, Name, Gender (M/F), Category, [EWS], [Minority]
    const rowRegex = /(\d{1,5})\s+(\d{10})\s+(\d{1,7})\s+(\d{2,3})(?:\s+(\d{2,3}))?\s+(\d{2,3})\s+([A-Za-z\s\.\,\'\-]+?)\s+([MF])\s+([A-Za-z0-9]+)(?:\s+(YES))?(?:\s+(MSM|MIN|CHM|SIK|JAI|CHR))?(?=\s+\d{1,5}\s+\d{10}|\s*$)/g;

    let match;
    while ((match = rowRegex.exec(pageText)) !== null) {
      candidates.push({
        sno: parseInt(match[1], 10),
        rollNo: match[2],
        neetRank: parseInt(match[3], 10),
        neetScore: parseInt(match[4], 10),
        finalScore: parseInt(match[6], 10),
        name: match[7].trim(),
        gender: match[8],
        category: match[9].trim(),
        ews: match[10] || 'NO',
        minority: match[11] || 'NO',
      });
    }
  }

  console.log(`Total Candidates parsed: ${candidates.length}`);

  // Deduplicate by SNo
  const uniqueCands = [];
  const seenSno = new Set();
  for (let c of candidates) {
    if (!seenSno.has(c.sno)) {
      seenSno.add(c.sno);
      uniqueCands.push(c);
    }
  }

  console.log(`Unique Candidates: ${uniqueCands.length}`);

  // Save parsed JSON
  const jsonPath = path.join(process.cwd(), 'docs', 'AY-2026-27-FINAL-MERIT-LIST_parsed.json');
  fs.writeFileSync(jsonPath, JSON.stringify(uniqueCands, null, 2), 'utf8');

  // Convert to app.js format rawMeritData: [sno, air, score, category, gender, ewsFlag]
  const rawDataArray = uniqueCands.map(c => [
    c.sno,
    c.neetRank,
    c.finalScore,
    c.category.replace('_', '').toUpperCase(),
    c.gender,
    c.ews === 'YES' ? 1 : 0
  ]);

  // Inject into app.js
  const appCode = fs.readFileSync('app.js', 'utf8');
  const newDataStr = JSON.stringify(rawDataArray).replace(/\],\[/g, '],[') + ';';
  
  const updatedAppCode = appCode.replace(/var rawMeritData = \[[\s\S]*?\];/, 'var rawMeritData = ' + newDataStr);
  fs.writeFileSync('app.js', updatedAppCode, 'utf8');

  console.log(`Updated app.js with new rawMeritData of length ${rawDataArray.length}`);
  
  // Also print around 8366 to verify
  console.log('\n--- New Data around S.No 8366 ---');
  for (const c of rawDataArray) {
    if (c[0] >= 8364 && c[0] <= 8368) {
      console.log(`S.No=${c[0]} AIR=${c[1]} Cat=${c[3]}`);
    }
  }
}

parseFinalMerit().catch(console.error);
