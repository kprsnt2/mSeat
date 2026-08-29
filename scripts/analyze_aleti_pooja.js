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

// Find candidate: ALETI POOJA
const cand = candidates.find(c => c.sno === 8039 || c.neetRank === 282055 || c.rollNo === '4204101570');
console.log('========================================================================');
console.log('CANDIDATE 3 PROFILE: ALETI POOJA');
console.log('========================================================================');
console.log(cand);

const ahead = candidates.filter(c => c.sno < cand.sno);
console.log(`\nTotal Candidates Ahead in State: ${ahead.length}`);

// Category breakdown ahead
const totalScAhead = ahead.filter(c => c.category.startsWith('SC'));
const sc1Ahead = ahead.filter(c => c.category === 'SC1');
const sc2Ahead = ahead.filter(c => c.category === 'SC2');
const sc3Ahead = ahead.filter(c => c.category === 'SC3');
const sc4Ahead = ahead.filter(c => c.category === 'SC4');

console.log(`Total SC Candidates Ahead: ${totalScAhead.length} -> Overall SC Rank: #${totalScAhead.length + 1}`);
console.log(`SC-2 Candidates Ahead:     ${sc2Ahead.length} -> State SC-2 Category Rank: #${sc2Ahead.length + 1}`);

const sc2FemaleAhead = sc2Ahead.filter(c => c.gender === 'F');
console.log(`SC-2 Female Ahead:         ${sc2FemaleAhead.length} -> State SC-2 Female Rank: #${sc2FemaleAhead.length + 1}`);
console.log(`SC-2 Male Ahead:           ${sc2Ahead.length - sc2FemaleAhead.length}`);

// AIQ exits ahead
let allAiqAhead = 0;
let scAiqAhead = 0;
let sc2AiqAhead = 0;
let sc2FemaleAiqAhead = 0;

for (let c of ahead) {
  if (aiqByRank.has(c.neetRank)) {
    allAiqAhead++;
    if (c.category.startsWith('SC')) scAiqAhead++;
    if (c.category === 'SC2') {
      sc2AiqAhead++;
      if (c.gender === 'F') sc2FemaleAiqAhead++;
    }
  }
}

console.log(`\nAIQ Exits Ahead: Total ${allAiqAhead}, SC ${scAiqAhead}, SC-2 ${sc2AiqAhead}`);
console.log(`Effective State General Rank: #${cand.sno - allAiqAhead}`);
console.log(`Effective Overall SC Rank:    #${totalScAhead.length + 1 - scAiqAhead}`);
console.log(`Effective SC-2 Rank:          #${sc2Ahead.length + 1 - sc2AiqAhead}`);
console.log(`Effective SC-2 Female Rank:   #${sc2FemaleAhead.length + 1 - sc2FemaleAiqAhead}`);

// College Eligibility Check
const govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

console.log(`\n========================================================================`);
console.log(`COLLEGE ELIGIBILITY ANALYSIS FOR AIR 282,055 (ALETI POOJA - SC-2 FEMALE)`);
console.log(`========================================================================`);

// 1. Govt Colleges
console.log('\n--- Govt Medical Colleges SC-2 Cutoff Comparison ---');
let govtChances = [];
for (let c of govtColleges) {
  const kr = c.knownRanks || {};
  const sc2 = kr.SC_2 || 0;
  if (sc2 > 0) {
    const diff = sc2 - cand.neetRank;
    govtChances.push({
      name: c.name,
      place: c.place,
      sc2Cutoff: sc2,
      diff,
      status: diff >= 0 ? 'DIRECTLY ELIGIBLE' : (diff >= -20000 ? 'VERY HIGH CHANCE IN R2/R3' : (diff >= -35000 ? 'GOOD CHANCE' : 'LOW'))
    });
  }
}
govtChances.sort((a, b) => b.sc2Cutoff - a.sc2Cutoff);
console.table(govtChances.slice(0, 10));

// 2. Private Medical Colleges Cat-A (MBBS)
console.log('\n--- Private Medical Colleges (Cat-A Govt Convenor MBBS - 100% Guaranteed) ---');
const pvtEligible = [];
for (let c of pvtColleges) {
  const kr = c.knownRanks || {};
  const sc2 = kr.SC_2 || 0;
  if (sc2 >= cand.neetRank) {
    pvtEligible.push({
      name: c.name,
      place: c.place,
      cutoffAIR: sc2,
      safetyMargin: `+${(sc2 - cand.neetRank).toLocaleString()} Safe`
    });
  }
}
pvtEligible.sort((a, b) => a.cutoffAIR - b.cutoffAIR);
console.table(pvtEligible.slice(0, 10));
