const fs = require('fs');
const path = require('path');

const meritText = fs.readFileSync(path.join(__dirname, 'docs', 'merit_list_tg_extracted.txt'), 'utf8');
const lines = meritText.split('\n');

let scoreMap = {}; // score -> { count, minRank, maxRank, avgRank, minSno, maxSno }

for (let line of lines) {
  const matches = [...line.matchAll(/(\d+)\s+(\d+)\s+(\d+)\s+(.*?)\s+(Female|Male)\s+(OBC-\s*NCL\s*\(Central List\)|General|Gen-EWS|SC|ST)\s+(\d+)/g)];
  for (let m of matches) {
    const sno = parseInt(m[1]);
    const neetRank = parseInt(m[2]);
    const score = parseInt(m[7]);

    if (!scoreMap[score]) {
      scoreMap[score] = { score, minRank: neetRank, maxRank: neetRank, minSno: sno, maxSno: sno, count: 1 };
    } else {
      scoreMap[score].maxRank = Math.max(scoreMap[score].maxRank, neetRank);
      scoreMap[score].minRank = Math.min(scoreMap[score].minRank, neetRank);
      scoreMap[score].maxSno = Math.max(scoreMap[score].maxSno, sno);
      scoreMap[score].minSno = Math.min(scoreMap[score].minSno, sno);
      scoreMap[score].count++;
    }
  }
}

// Convert to array sorted by score descending
const points = Object.values(scoreMap).sort((a, b) => b.score - a.score);

console.log(`Extracted ${points.length} unique score points from TG Merit List.`);

console.log("\nSample Data Points (Score -> AIR Rank & State S.No):");
points.filter(p => p.score % 20 === 0 || p.score === 393 || p.score > 650 || p.score < 200).forEach(p => {
  console.log(`Score: ${p.score} | AIR Rank Range: ${p.minRank} - ${p.maxRank} (Avg: ${Math.round((p.minRank+p.maxRank)/2)}) | State S.No Range: ${p.minSno} - ${p.maxSno}`);
});

fs.writeFileSync('score_rank_real_points.json', JSON.stringify(points, null, 2));
