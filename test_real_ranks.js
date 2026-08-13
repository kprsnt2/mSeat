const fs = require('fs');

const code = fs.readFileSync('app.js', 'utf8');

// Extract scoreRankData array and functions
const dataMatch = code.match(/const scoreRankData = (\[[\s\S]*?\n\]);/);
const scoreRankData = JSON.parse(dataMatch[1]);

function estimateRank(score) {
  if (score >= 720) return 1;
  if (score <= 144) return 1236000;
  const data = scoreRankData;
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
}

function scoreToPercentile(score) {
  const rank = estimateRank(score);
  const total = 2209000;
  return Math.max(0, Math.min(100, ((total - rank) / total * 100))).toFixed(2);
}

console.log("=== REAL RANK VERIFICATION ===");
console.log(`Score 393 -> Est. AIR: ${estimateRank(393).toLocaleString()} | Est. State S.No: ${estimateStateRank(289635).toLocaleString()} | Percentile: ${scoreToPercentile(393)}%`);
console.log(`Score 500 -> Est. AIR: ${estimateRank(500).toLocaleString()} | Est. State S.No: ${estimateStateRank(estimateRank(500)).toLocaleString()} | Percentile: ${scoreToPercentile(500)}%`);
console.log(`Score 600 -> Est. AIR: ${estimateRank(600).toLocaleString()} | Est. State S.No: ${estimateStateRank(estimateRank(600)).toLocaleString()} | Percentile: ${scoreToPercentile(600)}%`);
