const fs = require('fs');
const path = require('path');

async function extractPDF() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const docsDir = path.join(__dirname, 'docs');
  const filePath = path.join(docsDir, 'last_year_merit_list_final_tg.pdf');
  
  console.log(`Extracting ${filePath}...`);
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
  
  const outFile = path.join(docsDir, 'last_year_merit_list_final_tg_extracted.txt');
  fs.writeFileSync(outFile, fullText, 'utf8');
  console.log(`Saved extracted text to ${outFile} (${fullText.length} chars)`);
}

extractPDF().catch(console.error);
