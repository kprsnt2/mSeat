const fs = require('fs');
const path = require('path');

async function parseTGProvisionalMerit() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const filePath = path.join(__dirname, 'docs', 'TG-PROVISIONAL-MERIT.pdf');
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  console.log(`Loaded TG-PROVISIONAL-MERIT.pdf with ${doc.numPages} pages.`);

  const candidates = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    
    // Group text items by line
    // In this PDF, items are laid out horizontally. Let's inspect string concatenation per page.
    const pageText = content.items.map(it => it.str).join(' ');

    // Match candidate rows
    // Pattern: SNo (1-5 digits), RollNo (10 digits), Rank (1-7 digits), Score (2-3 digits), [NCC score], Final Score, Name, Gender (M/F), Category (OC/BCA/BCB/BCC/BCD/BCE/SC1/SC2/SC3/SC4/ST/etc.), [EWS: YES], [Minority: MSM/MIN]
    // Example: 8333   4204101514   289635   393   393   YACHARAM SAI POOJA   F   SC2
    // Let's use regex matching
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
        page: p
      });
    }

    if (p % 100 === 0 || p === doc.numPages) {
      console.log(`Processed page ${p}/${doc.numPages}... Candidates parsed: ${candidates.length}`);
    }
  }

  console.log(`Total Candidates parsed: ${candidates.length}`);

  // Deduplicate if any
  const uniqueCands = [];
  const seenSno = new Set();
  for (let c of candidates) {
    if (!seenSno.has(c.sno)) {
      seenSno.add(c.sno);
      uniqueCands.push(c);
    }
  }

  console.log(`Unique Candidates: ${uniqueCands.length}`);

  // Save to JSON
  fs.writeFileSync(path.join(__dirname, 'docs', 'TG_PROVISIONAL_MERIT_parsed.json'), JSON.stringify(uniqueCands, null, 2), 'utf8');

  // Convert to CSV
  function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  const csvHeaders = ['SNo', 'RollNo', 'NEET_Rank', 'NEET_Score', 'Final_Score', 'Candidate_Name', 'Gender', 'Category', 'EWS', 'Minority'];
  const csvLines = [csvHeaders.join(',')];

  for (let c of uniqueCands) {
    csvLines.push([
      c.sno,
      c.rollNo,
      c.neetRank,
      c.neetScore,
      c.finalScore,
      escapeCSV(c.name),
      c.gender,
      c.category,
      c.ews,
      c.minority
    ].join(','));
  }

  const csvPath = path.join(__dirname, 'docs', 'TG_PROVISIONAL_MERIT.csv');
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`Saved TG Merit CSV to: ${csvPath}`);
}

parseTGProvisionalMerit().catch(console.error);
