const fs = require('fs');
const path = require('path');

async function parseTable() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const docsDir = path.join(__dirname, 'docs');
  const filePath = path.join(docsDir, 'TS MBBS-College Wise Cut off (OU) ROUND-3.pdf');
  
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  console.log(`Total Pages: ${doc.numPages}`);
  
  let allPagesData = [];
  
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    
    // Sort text items by Y position (top to bottom), then X position (left to right)
    const items = content.items.map(item => ({
      str: item.str.trim(),
      x: item.transform[4],
      y: item.transform[5]
    })).filter(item => item.str.length > 0);
    
    // Group into lines by Y position (with threshold ~3px)
    let linesMap = [];
    items.sort((a, b) => b.y - a.y || a.x - b.x);
    
    let currentLine = [];
    let lastY = null;
    
    for (let item of items) {
      if (lastY === null || Math.abs(item.y - lastY) < 4) {
        currentLine.push(item);
      } else {
        currentLine.sort((a, b) => a.x - b.x);
        linesMap.push(currentLine);
        currentLine = [item];
      }
      lastY = item.y;
    }
    if (currentLine.length > 0) {
      currentLine.sort((a, b) => a.x - b.x);
      linesMap.push(currentLine);
    }
    
    allPagesData.push({ pageNum: i, lines: linesMap });
  }
  
  // Save formatted layout to a clean text file
  let fullOutput = "";
  for (let page of allPagesData) {
    fullOutput += `\n--- PAGE ${page.pageNum} ---\n`;
    for (let l of page.lines) {
      fullOutput += l.map(item => item.str).join(' | ') + '\n';
    }
  }
  
  fs.writeFileSync('cutoff_layout.txt', fullOutput, 'utf8');
  console.log("Saved structured layout to cutoff_layout.txt");
}

parseTable().catch(console.error);
