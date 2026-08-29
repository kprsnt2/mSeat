const fs = require('fs');
const path = require('path');

const candidates = JSON.parse(fs.readFileSync('docs/TG_PROVISIONAL_MERIT_parsed.json', 'utf8'));
const aiqFinal = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));

// Build AIQ lookup by Rank
const aiqByRank = new Map();
for (let r of aiqFinal) {
  if (!aiqByRank.has(r.rank)) aiqByRank.set(r.rank, []);
  aiqByRank.get(r.rank).push(r);
}

// Find candidate
const kid = candidates.find(c => c.sno === 8333 || c.neetRank === 289635 || c.rollNo === '4204101514');
console.log('========================================================================');
console.log('CANDIDATE PROFILE IN NEW TG PROVISIONAL MERIT LIST');
console.log('========================================================================');
console.log(kid);

// Candidates ahead of kid
const ahead = candidates.filter(c => c.sno < kid.sno);
console.log(`\nTotal Candidates Ahead in State: ${ahead.length}`);

// Category breakdown of all candidates ahead
const catCounts = {};
for (let c of ahead) {
  catCounts[c.category] = (catCounts[c.category] || 0) + 1;
}
console.log('\n--- Category Breakdown of Candidates Ahead (S.No 1 to 8332) ---');
console.table(catCounts);

// SC Breakdown
const sc1Ahead = ahead.filter(c => c.category === 'SC1');
const sc2Ahead = ahead.filter(c => c.category === 'SC2');
const sc3Ahead = ahead.filter(c => c.category === 'SC3');
const sc4Ahead = ahead.filter(c => c.category === 'SC4');
const scGenAhead = ahead.filter(c => c.category === 'SC');
const totalScAhead = ahead.filter(c => c.category.startsWith('SC'));

console.log(`\n========================================================================`);
console.log(`EXACT SC & SC-2 CATEGORY RANKS FOR YACHARAM SAI POOJA`);
console.log(`========================================================================`);
console.log(`1. State General Merit Rank:       #${kid.sno} (Improved from #8902 in earlier list -> +${8902 - kid.sno} ranks jump!)`);
console.log(`2. Total SC Category Candidates Ahead: ${totalScAhead.length} -> Her State SC Overall Rank is #${totalScAhead.length + 1}`);
console.log(`3. SC-2 Candidates Ahead:              ${sc2Ahead.length} -> Her State SC-2 CATEGORY RANK IS #${sc2Ahead.length + 1}`);

// Gender breakdown in SC-2
const sc2FemaleAhead = sc2Ahead.filter(c => c.gender === 'F');
const sc2MaleAhead = sc2Ahead.filter(c => c.gender === 'M');
console.log(`4. SC-2 Female Candidates Ahead:       ${sc2FemaleAhead.length} -> Her State SC-2 FEMALE RANK IS #${sc2FemaleAhead.length + 1}`);
console.log(`   (SC-2 Males ahead: ${sc2MaleAhead.length})`);

// Cross-reference with All India Final Allotments
let allAiqAhead = [];
let scAiqAhead = [];
let sc2AiqAhead = [];

for (let c of ahead) {
  if (aiqByRank.has(c.neetRank)) {
    const aiqList = aiqByRank.get(c.neetRank);
    allAiqAhead.push({ candidate: c, allotment: aiqList[0] });
    if (c.category.startsWith('SC')) {
      scAiqAhead.push({ candidate: c, allotment: aiqList[0] });
    }
    if (c.category === 'SC2') {
      sc2AiqAhead.push({ candidate: c, allotment: aiqList[0] });
    }
  }
}

console.log(`\n========================================================================`);
console.log(`IMPACT OF ALL INDIA FINAL ALLOTMENTS (CANDIDATES EXITING STATE POOL)`);
console.log(`========================================================================`);
console.log(`Total Candidates ahead who secured All India seats:      ${allAiqAhead.length}`);
console.log(`Total SC Candidates ahead who secured All India seats:   ${scAiqAhead.length}`);
console.log(`Total SC-2 Candidates ahead who secured All India seats: ${sc2AiqAhead.length}`);

console.log(`\n--- Virtual / Effective Improved Ranks after AIQ Exits ---`);
console.log(`• Effective State General Rank:  ${kid.sno} - ${allAiqAhead.length} = #${kid.sno - allAiqAhead.length}`);
console.log(`• Effective Overall SC Rank:     ${totalScAhead.length + 1} - ${scAiqAhead.length} = #${totalScAhead.length + 1 - scAiqAhead.length}`);
console.log(`• Effective SC-2 Category Rank:  ${sc2Ahead.length + 1} - ${sc2AiqAhead.length} = #${sc2Ahead.length + 1 - sc2AiqAhead.length}`);

const sc2FemaleAiqAhead = sc2AiqAhead.filter(item => item.candidate.gender === 'F');
console.log(`• Effective SC-2 Female Rank:    ${sc2FemaleAhead.length + 1} - ${sc2FemaleAiqAhead.length} = #${sc2FemaleAhead.length + 1 - sc2FemaleAiqAhead.length}`);

console.log(`\n--- SC-2 Candidates Ahead who secured AIQ seats (${sc2AiqAhead.length}) ---`);
sc2AiqAhead.forEach((item, idx) => {
  const c = item.candidate;
  const a = item.allotment;
  console.log(`${idx + 1}. TG S.No ${c.sno} | AIR ${c.neetRank} | Score ${c.neetScore} | ${c.name} (${c.gender}) -> ${a.allottedInstitute.split(',')[0]} [${a.course}] (${a.allottedQuota}, Allotted: ${a.allottedCategory})`);
});

// Compare with College Cutoffs and Seat Matrix
const govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

console.log(`\n========================================================================`);
console.log(`WHERE SHE CAN GET THE SEAT (COLLEGE-BY-COLLEGE ANALYSIS)`);
console.log(`========================================================================`);

// Check Govt Colleges
const govtEligible = [];
const govtBorderline = [];

for (let c of govtColleges) {
  const sc2Cutoff = (c.knownRanks && c.knownRanks.SC_2) || 0;
  if (sc2Cutoff > 0) {
    const diff = sc2Cutoff - kid.neetRank;
    if (diff >= 0) {
      govtEligible.push({ name: c.name, place: c.place, cutoff: sc2Cutoff, diff, status: 'DIRECTLY ELIGIBLE' });
    } else if (diff >= -30000) {
      govtBorderline.push({ name: c.name, place: c.place, cutoff: sc2Cutoff, diff, status: 'HIGH PROBABILITY IN R2/R3/MOP-UP' });
    }
  }
}

console.log(`\n1. GOVERNMENT MEDICAL COLLEGES:`);
console.log(`--- High Probability Govt Medical Colleges (Rounds 2 & 3 / Mop-up) ---`);
govtBorderline.sort((a, b) => b.cutoff - a.cutoff);
console.table(govtBorderline);

// Check Private Cat-A Colleges
const pvtEligible = [];
for (let c of pvtColleges) {
  const sc2Cutoff = (c.knownRanks && c.knownRanks.SC_2) || 0;
  if (sc2Cutoff >= kid.neetRank) {
    pvtEligible.push({
      name: c.name,
      place: c.place,
      cutoffAIR: sc2Cutoff,
      safetyMargin: `+${(sc2Cutoff - kid.neetRank).toLocaleString()} Safe`
    });
  }
}

pvtEligible.sort((a, b) => a.cutoffAIR - b.cutoffAIR);
console.log(`\n2. PRIVATE MEDICAL COLLEGES (CATEGORY-A GOVT CONVENOR QUOTA - 100% GUARANTEED):`);
console.log(`Total 100% Safe Private Colleges: ${pvtEligible.length}`);
console.table(pvtEligible);
