const fs = require('fs');

const colleges = JSON.parse(fs.readFileSync('parsed_colleges.json', 'utf8'));

// Candidate S.No 8902 details
const cand = {
  sno: 8902,
  name: "YACHARAM SAI POOJA",
  gender: "Female",
  category: "SC",
  subCategory: "SC-2",
  neetRank: 289635,
  score: 393
};

console.log("==========================================================================");
console.log(`TELANGANA MBBS ROUND 3 SEAT ALLOCATION ANALYSIS FOR SC-2 CATEGORY`);
console.log(`Candidate Name: ${cand.name} | Gender: ${cand.gender}`);
console.log(`State Merit S.No: ${cand.sno} | Category: SC (${cand.subCategory})`);
console.log(`NEET 2026 AIR: ${cand.neetRank.toLocaleString()} | NEET Score: ${cand.score} Marks`);
console.log("==========================================================================\n");

// Clean list of colleges and their SC-2 Round 3 cutoff data
let eligibleColleges = [];
let notEligibleColleges = [];

for (let c of colleges) {
  const rank = c.sc2Rank;
  const score = c.sc2Score;
  
  if (rank) {
    const isEligible = cand.neetRank <= rank; // AIR <= Closing Rank means eligible/allocated
    const item = {
      name: c.cName,
      type: c.typeText,
      closingRank: rank,
      closingScore: score,
      isEligible,
      rankDiff: rank - cand.neetRank
    };
    
    if (isEligible) {
      eligibleColleges.push(item);
    } else {
      notEligibleColleges.push(item);
    }
  }
}

// Sort eligible by closing rank ascending (most competitive first)
eligibleColleges.sort((a, b) => a.closingRank - b.closingRank);
notEligibleColleges.sort((a, b) => b.closingRank - a.closingRank);

console.log(`✅ ELIGIBLE / ALLOCATED COLLEGES IN ROUND 3 (${eligibleColleges.length} Colleges):`);
console.log("---------------------------------------------------------------------------------------------------");
console.log("College Name | Type | SC-2 Cutoff Rank | SC-2 Cutoff Score | Safety Margin");
console.log("---------------------------------------------------------------------------------------------------");
eligibleColleges.forEach(c => {
  console.log(`${c.name} | ${c.type} | Rank: ${c.closingRank.toLocaleString()} | Marks: ${c.closingScore} | +${c.rankDiff.toLocaleString()} ranks safe`);
});

console.log("\n❌ COLLEGES CLOSED ABOVE CANDIDATE'S RANK IN ROUND 3:");
console.log("---------------------------------------------------------------------------------------------------");
notEligibleColleges.forEach(c => {
  console.log(`${c.name} | ${c.type} | Cutoff Rank: ${c.closingRank.toLocaleString()} | Cutoff Marks: ${c.closingScore} | Short by ${Math.abs(c.rankDiff).toLocaleString()} ranks`);
});
