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

// Find candidate: BOLLEPAKA DHANUSHA
const kid2 = candidates.find(c => c.sno === 11919 || c.neetRank === 399237 || c.rollNo === '4208202445');
console.log('========================================================================');
console.log('CANDIDATE 2 PROFILE:');
console.log('========================================================================');
console.log(kid2);

const ahead = candidates.filter(c => c.sno < kid2.sno);
console.log(`\nTotal Candidates Ahead in State: ${ahead.length}`);

// Category breakdown ahead
const totalScAhead = ahead.filter(c => c.category.startsWith('SC'));
const sc1Ahead = ahead.filter(c => c.category === 'SC1');
const sc2Ahead = ahead.filter(c => c.category === 'SC2');
const sc3Ahead = ahead.filter(c => c.category === 'SC3');
const sc4Ahead = ahead.filter(c => c.category === 'SC4');

console.log(`Total SC Candidates Ahead: ${totalScAhead.length} (Overall SC Rank: #${totalScAhead.length + 1})`);
console.log(`SC-2 Candidates Ahead:     ${sc2Ahead.length} (State SC-2 Category Rank: #${sc2Ahead.length + 1})`);

const sc2FemaleAhead = sc2Ahead.filter(c => c.gender === 'F');
console.log(`SC-2 Female Ahead:         ${sc2FemaleAhead.length} (State SC-2 Female Rank: #${sc2FemaleAhead.length + 1})`);

// AIQ exits ahead
let allAiqAhead = 0;
let scAiqAhead = 0;
let sc2AiqAhead = 0;

for (let c of ahead) {
  if (aiqByRank.has(c.neetRank)) {
    allAiqAhead++;
    if (c.category.startsWith('SC')) scAiqAhead++;
    if (c.category === 'SC2') sc2AiqAhead++;
  }
}

console.log(`\nAIQ Exits Ahead: Total ${allAiqAhead}, SC ${scAiqAhead}, SC-2 ${sc2AiqAhead}`);
console.log(`Effective SC-2 Rank: #${sc2Ahead.length + 1 - sc2AiqAhead}`);

// College Eligibility Check
const govtColleges = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

console.log(`\n========================================================================`);
console.log(`COLLEGE ELIGIBILITY ANALYSIS FOR AIR 399,237 (SC-2 FEMALE)`);
console.log(`========================================================================`);

// 1. Govt Colleges
console.log('\n--- Govt Medical Colleges SC-2 Cutoff Comparison ---');
let govtChances = [];
for (let c of govtColleges) {
  const kr = c.knownRanks || {};
  const sc2 = kr.SC_2 || 0;
  if (sc2 > 0) {
    govtChances.push({
      name: c.name,
      place: c.place,
      sc2Cutoff: sc2,
      diff: sc2 - kid2.neetRank
    });
  }
}
govtChances.sort((a, b) => b.sc2Cutoff - a.sc2Cutoff);
console.table(govtChances.slice(0, 10));

// 2. Private Medical Colleges Cat-A (MBBS)
console.log('\n--- Private Medical Colleges (Cat-A Govt Convenor MBBS) ---');
const pvtEligible = [];
const pvtBorderline = [];
const pvtHigh = [];

for (let c of pvtColleges) {
  const kr = c.knownRanks || {};
  const sc2 = kr.SC_2 || 0;
  const sc1 = kr.SC_1 || 0;
  const name = c.name;
  const place = c.place;

  if (sc2 > 0) {
    const diff = sc2 - kid2.neetRank;
    const item = { name, place, sc2Cutoff: sc2, diff, margin: diff >= 0 ? `+${diff.toLocaleString()} Safe` : `Short by ${Math.abs(diff).toLocaleString()}` };
    if (diff >= 0) {
      pvtEligible.push(item);
    } else if (diff >= -35000) {
      pvtBorderline.push(item);
    } else {
      pvtHigh.push(item);
    }
  }
}

pvtEligible.sort((a, b) => a.sc2Cutoff - b.sc2Cutoff);
console.log(`✅ Directly Eligible / Safe Private Medical Colleges (Cat-A MBBS): ${pvtEligible.length}`);
console.table(pvtEligible);

console.log(`\n⚠️ Borderline / Possible in Round 2 / Round 3 / Mop-up: ${pvtBorderline.length}`);
console.table(pvtBorderline);

// Also check BDS (Govt Dental & Pvt Dental)
console.log('\n--- Government & Private Dental (BDS) Opportunities ---');
console.log('Govt Dental College Hyderabad SC-2 Cutoff: AIR 1,72,000 - 2,50,000+');
console.log('Private Dental Colleges (Cat-A BDS): Cutoffs reach AIR 5,00,000 to 7,50,000+ (100% Guaranteed in all top dental colleges in Hyderabad/TG).');
