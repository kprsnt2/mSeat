const fs = require('fs');
const path = require('path');

const v1 = JSON.parse(fs.readFileSync('docs/all_india_provisional_result.json', 'utf8'));
const v2 = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_v2.json', 'utf8'));

console.log(`========================================================================`);
console.log(`COMPARISON: ALL INDIA PROVISIONAL RESULT V1 vs V2`);
console.log(`========================================================================`);
console.log(`v1 Total Records: ${v1.length}`);
console.log(`v2 Total Records: ${v2.length}`);

// Compare record by record
let exactMatches = 0;
let diffCount = 0;
const diffs = [];

// Create maps by SNo and by Rank
const v1Map = new Map(v1.map(r => [r.sno, r]));
const v2Map = new Map(v2.map(r => [r.sno, r]));

for (let r2 of v2) {
  const r1 = v1Map.get(r2.sno);
  if (!r1) {
    diffs.push({ type: 'ADDED_IN_V2', sno: r2.sno, r2 });
    diffCount++;
  } else {
    // Check fields
    const rankDiff = r1.rank !== r2.rank;
    const instDiff = r1.allottedInstitute !== r2.allottedInstitute;
    const quotaDiff = r1.allottedQuota !== r2.allottedQuota;
    const courseDiff = r1.course !== r2.course;
    const catDiff = r1.allottedCategory !== r2.allottedCategory;
    const candCatDiff = r1.candidateCategory !== r2.candidateCategory;

    if (rankDiff || instDiff || quotaDiff || courseDiff || catDiff || candCatDiff) {
      diffCount++;
      diffs.push({
        type: 'MODIFIED',
        sno: r2.sno,
        changes: {
          rank: rankDiff ? `${r1.rank} -> ${r2.rank}` : undefined,
          institute: instDiff ? `[v1]: ${r1.allottedInstitute} | [v2]: ${r2.allottedInstitute}` : undefined,
          quota: quotaDiff ? `${r1.allottedQuota} -> ${r2.allottedQuota}` : undefined,
          course: courseDiff ? `${r1.course} -> ${r2.course}` : undefined,
          allottedCategory: catDiff ? `${r1.allottedCategory} -> ${r2.allottedCategory}` : undefined,
          candidateCategory: candCatDiff ? `${r1.candidateCategory} -> ${r2.candidateCategory}` : undefined,
        },
        v1: r1,
        v2: r2
      });
    } else {
      exactMatches++;
    }
  }
}

for (let r1 of v1) {
  if (!v2Map.has(r1.sno)) {
    diffs.push({ type: 'REMOVED_IN_V2', sno: r1.sno, r1 });
    diffCount++;
  }
}

console.log(`Exact Matches: ${exactMatches}`);
console.log(`Differences Found: ${diffCount}`);

if (diffCount > 0) {
  console.log(`\n--- First 20 Differences ---`);
  diffs.slice(0, 20).forEach((d, i) => {
    console.log(`\nDiff #${i + 1} (${d.type}) [SNo: ${d.sno}]:`);
    console.log(d.changes || d);
  });
} else {
  console.log('No differences found between v1 and v2 data.');
}

// Check by Rank mapping as well (in case SNo shifted)
const v1RankMap = new Map();
for (let r of v1) {
  v1RankMap.set(`${r.rank}_${r.allottedInstitute}`, r);
}
const v2RankMap = new Map();
for (let r of v2) {
  v2RankMap.set(`${r.rank}_${r.allottedInstitute}`, r);
}

let rankInstMatches = 0;
for (let [k, r] of v2RankMap.entries()) {
  if (v1RankMap.has(k)) rankInstMatches++;
}
console.log(`\nRank + Institute unique pairs matching: ${rankInstMatches} / ${v2RankMap.size}`);
