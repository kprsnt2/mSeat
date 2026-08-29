const fs = require('fs');
const path = require('path');

async function parseAllIndiaV2() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const filePath = path.join(__dirname, 'docs', 'all_india_provisional_result_v2.pdf');
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  console.log(`Loaded PDF v2 with ${doc.numPages} pages.`);

  const records = [];
  let currentRecord = null;

  for (let p = 3; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();

    // Group items by rowY (transform[4])
    const items = content.items
      .map(it => ({
        str: it.str.trim(),
        rowY: Math.round(it.transform[4]),
        colX: Math.round(it.transform[5]),
      }))
      .filter(it => it.str.length > 0);

    // Sort items by rowY ascending, then colX ascending
    items.sort((a, b) => {
      if (Math.abs(a.rowY - b.rowY) <= 3) {
        return a.colX - b.colX;
      }
      return a.rowY - b.rowY;
    });

    const rows = [];
    let currentRow = [];
    let curY = null;
    for (let item of items) {
      if (curY === null || Math.abs(item.rowY - curY) <= 3) {
        currentRow.push(item);
        if (curY === null) curY = item.rowY;
      } else {
        rows.push({ y: curY, items: currentRow });
        currentRow = [item];
        curY = item.rowY;
      }
    }
    if (currentRow.length > 0) {
      rows.push({ y: curY, items: currentRow });
    }

    for (let row of rows) {
      // Check if header or footer
      const rowStr = row.items.map(i => i.str).join(' ');
      if (
        rowStr.includes('Provisional NEET-UG Counselling') ||
        rowStr.includes('Allotted Quota') ||
        rowStr.includes('Page No.') ||
        rowStr.includes('Candidate Category') ||
        rowStr.startsWith('SNo Rank')
      ) {
        continue;
      }

      // Check if row starts with SNo and Rank
      const snoItem = row.items.find(i => i.colX < 45 && /^\d+$/.test(i.str));
      const rankItem = row.items.find(i => i.colX >= 45 && i.colX < 90 && /^\d+$/.test(i.str));

      if (snoItem && rankItem) {
        if (currentRecord) {
          records.push(currentRecord);
        }

        const sno = parseInt(snoItem.str, 10);
        const rank = parseInt(rankItem.str, 10);

        let quotaParts = [];
        let instParts = [];
        let courseParts = [];
        let allCatParts = [];
        let candCatParts = [];
        let remarksParts = [];

        for (let it of row.items) {
          if (it === snoItem || it === rankItem) continue;
          if (it.colX >= 90 && it.colX < 180) quotaParts.push(it.str);
          else if (it.colX >= 180 && it.colX < 565) instParts.push(it.str);
          else if (it.colX >= 565 && it.colX < 645) courseParts.push(it.str);
          else if (it.colX >= 645 && it.colX < 695) allCatParts.push(it.str);
          else if (it.colX >= 695 && it.colX < 765) candCatParts.push(it.str);
          else if (it.colX >= 765) remarksParts.push(it.str);
        }

        currentRecord = {
          sno,
          rank,
          allottedQuota: quotaParts.join(' ').trim(),
          allottedInstitute: instParts.join(' ').trim(),
          course: courseParts.join(' ').trim(),
          allottedCategory: allCatParts.join(' ').trim(),
          candidateCategory: candCatParts.join(' ').trim(),
          remarks: remarksParts.join(' ').trim(),
          page: p
        };
      } else if (currentRecord) {
        for (let it of row.items) {
          if (it.colX >= 90 && it.colX < 180) {
            currentRecord.allottedQuota += ' ' + it.str;
          } else if (it.colX >= 180 && it.colX < 565) {
            currentRecord.allottedInstitute += ' ' + it.str;
          } else if (it.colX >= 565 && it.colX < 645) {
            currentRecord.course += ' ' + it.str;
          } else if (it.colX >= 645 && it.colX < 695) {
            currentRecord.allottedCategory += ' ' + it.str;
          } else if (it.colX >= 695 && it.colX < 765) {
            currentRecord.candidateCategory += ' ' + it.str;
          } else if (it.colX >= 765) {
            currentRecord.remarks += ' ' + it.str;
          }
        }
      }
    }

    if (p % 200 === 0 || p === doc.numPages) {
      console.log(`Processed page ${p}/${doc.numPages}... Records parsed so far: ${records.length}`);
    }
  }

  if (currentRecord) {
    records.push(currentRecord);
  }

  console.log(`\nParsing complete! Total records in v2: ${records.length}`);

  // Clean strings
  for (let r of records) {
    r.allottedQuota = r.allottedQuota.replace(/\s+/g, ' ').trim();
    r.allottedInstitute = r.allottedInstitute.replace(/\s+/g, ' ').trim();
    r.course = r.course.replace(/\s+/g, ' ').trim();
    r.allottedCategory = r.allottedCategory.replace(/\s+/g, ' ').trim();
    r.candidateCategory = r.candidateCategory.replace(/\s+/g, ' ').trim();
    r.remarks = r.remarks.replace(/\s+/g, ' ').trim();
  }

  // Save to JSON
  fs.writeFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result_v2.json'), JSON.stringify(records, null, 2), 'utf8');

  // Convert to CSV
  function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  const csvHeaders = ['SNo', 'Rank', 'Allotted Quota', 'Allotted Institute', 'Course', 'Allotted Category', 'Candidate Category', 'Remarks'];
  const csvLines = [csvHeaders.join(',')];

  for (let r of records) {
    csvLines.push([
      r.sno,
      r.rank,
      escapeCSV(r.allottedQuota),
      escapeCSV(r.allottedInstitute),
      escapeCSV(r.course),
      escapeCSV(r.allottedCategory),
      escapeCSV(r.candidateCategory),
      escapeCSV(r.remarks)
    ].join(','));
  }

  const csvPath = path.join(__dirname, 'docs', 'all_india_provisional_result_v2.csv');
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
  console.log(`Saved CSV v2 to: ${csvPath}`);
}

parseAllIndiaV2().catch(console.error);
