const fs = require('fs');

const points = JSON.parse(fs.readFileSync('score_rank_real_points.json', 'utf8'));

// Filter clean key points
const cleanPoints = points.map(p => ({
  score: p.score,
  rank: Math.round((p.minRank + p.maxRank) / 2),
  stateSno: Math.round((p.minSno + p.maxSno) / 2)
}));

console.log("Total real points:", cleanPoints.length);

let appJs = fs.readFileSync('app.js', 'utf8');

// Replace scoreRankData in app.js
const scoreRankDataStr = `const scoreRankData = ${JSON.stringify(cleanPoints, null, 2)};`;

appJs = appJs.replace(/const scoreRankData = \[[\s\S]*?\n\];/, scoreRankDataStr);

// Also update estimateStateRank logic in app.js to interpolate state S.No accurately
const newEstimateFunctions = `function estimateRank(score) {
  if (score >= 720) return 1;
  if (score <= 144) return 1236000;

  const data = scoreRankData; // sorted descending by score

  for (let i = 0; i < data.length - 1; i++) {
    if (score <= data[i].score && score >= data[i + 1].score) {
      const scoreDiff = data[i].score - data[i + 1].score;
      if (scoreDiff === 0) return data[i].rank;
      const rankDiff = data[i + 1].rank - data[i].rank;
      const ratio = (data[i].score - score) / scoreDiff;
      return Math.round(data[i].rank + ratio * rankDiff);
    }
  }
  return data[data.length - 1].rank;
}

function estimateStateRank(air) {
  const data = scoreRankData;
  for (let i = 0; i < data.length - 1; i++) {
    if (air >= data[i].rank && air <= data[i + 1].rank) {
      const rDiff = data[i + 1].rank - data[i].rank;
      if (rDiff === 0) return data[i].stateSno;
      const sDiff = data[i + 1].stateSno - data[i].stateSno;
      const ratio = (air - data[i].rank) / rDiff;
      return Math.round(data[i].stateSno + ratio * sDiff);
    }
  }
  return Math.max(1, Math.round(air * 0.035));
}`;

appJs = appJs.replace(/function estimateRank\(score\) \{[\s\S]*?\n\}/, `// Updated estimateRank`);
appJs = appJs.replace(/function estimateStateRank\(air\) \{[\s\S]*?\n\}/, `// Updated estimateStateRank`);

// Insert the new functions properly
appJs = appJs.replace(`// Updated estimateRank`, newEstimateFunctions);
appJs = appJs.replace(`// Updated estimateStateRank\n`, '');

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Updated app.js with real merit list score-to-rank and state serial number data!");
