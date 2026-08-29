const fs = require('fs');
const path = require('path');

async function extractPDF(filePath, label) {
  // Dynamic import for ESM module
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`EXTRACTING: ${label}`);
  console.log(`${'='.repeat(80)}\n`);
  
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  console.log(`Pages: ${doc.numPages}`);
  
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
    if (i % 50 === 0) console.log(`  Processed ${i}/${doc.numPages} pages...`);
  }
  
  console.log(`Total text length: ${fullText.length} chars\n`);
  
  const outFile = filePath.replace('.pdf', '_extracted.txt');
  fs.writeFileSync(outFile, fullText, 'utf8');
  console.log(`Full text saved to: ${outFile}`);
  
  // Preview
  console.log(`\n--- PREVIEW (first 3000 chars) ---\n`);
  console.log(fullText.substring(0, 3000));
  console.log(`\n--- END PREVIEW ---\n`);
  
  return fullText;
}

async function main() {
  const docsDir = path.join(__dirname, 'docs');
  
  // Extract merit list
  const meritText = await extractPDF(
    path.join(docsDir, 'merit_list_tg.pdf'),
    'Telangana Merit List'
  );
  
  // Extract cutoff list
  const cutoffText = await extractPDF(
    path.join(docsDir, 'TS MBBS-College Wise Cut off (OU) ROUND-3.pdf'),
    'TS MBBS College Wise Cutoff (OU) Round 3'
  );

  // ---- SEARCH FOR SERIAL NUMBER 8902 ----
  console.log(`\n${'='.repeat(80)}`);
  console.log('SEARCHING FOR STATE SERIAL NO: 8902 in MERIT LIST');
  console.log(`${'='.repeat(80)}\n`);
  
  const lines = meritText.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('8902')) {
      found = true;
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + 3);
      console.log(`Found "8902" at line ${i}:`);
      for (let j = start; j < end; j++) {
        console.log(`  ${j === i ? '>>>' : '   '} L${j}: ${lines[j]}`);
      }
      console.log('');
    }
  }
  if (!found) {
    // Search word by word
    console.log('Not found in line-split. Searching raw text...');
    const idx = meritText.indexOf('8902');
    if (idx > -1) {
      console.log(`Found at char index ${idx}:`);
      console.log(meritText.substring(Math.max(0, idx - 200), idx + 200));
    } else {
      console.log('8902 not found in merit list text.');
    }
  }

  // ---- SC CUTOFF DATA ----
  console.log(`\n${'='.repeat(80)}`);
  console.log('SC CATEGORY CUTOFF DATA (Round 3)');
  console.log(`${'='.repeat(80)}\n`);
  
  const cutLines = cutoffText.split('\n');
  for (let i = 0; i < cutLines.length; i++) {
    if (/\bSC\b/.test(cutLines[i]) || /\bsc\b/.test(cutLines[i])) {
      const start = Math.max(0, i - 1);
      const end = Math.min(cutLines.length, i + 2);
      for (let j = start; j < end; j++) {
        console.log(`  L${j}: ${cutLines[j]}`);
      }
      console.log('');
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  console.error(err.stack);
});
