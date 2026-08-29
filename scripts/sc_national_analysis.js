const fs = require('fs');
const path = require('path');

const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

function isPwD(r) {
  const cat1 = (r.allottedCategory || '').toUpperCase();
  const cat2 = (r.candidateCategory || '').toUpperCase();
  const q = (r.allottedQuota || '').toUpperCase();
  return cat1.includes('PWD') || cat2.includes('PWD') || cat1.includes('PH') || cat2.includes('PH') || q.includes('PWD') || q.includes('PH');
}

function getCategoryGroup(cat) {
  const c = (cat || '').toUpperCase();
  if (c.includes('SC')) return 'SC';
  if (c.includes('ST')) return 'ST';
  if (c.includes('OBC') || c.includes('BC')) return 'OBC';
  if (c.includes('EWS')) return 'EWS';
  if (c.includes('OPEN') || c.includes('GEN') || c.includes('UR')) return 'OPEN';
  return 'OTHER';
}

function getCleanCollegeName(inst) {
  // Extract college name before location details, but keeping the distinct city/district
  const parts = inst.split(',');
  if (parts.length >= 2) {
    const c0 = parts[0].trim();
    const c1 = parts[1].trim();
    if (c0.toLowerCase().includes('government medical college') || c0.toLowerCase().includes('rajiv gandhi institute') || c0.toLowerCase().includes('aiims') || c0.toLowerCase().includes('employees state insurance')) {
      return `${c0}, ${c1}`;
    }
    return c0;
  }
  return inst;
}

// Let's filter out PwD
const nonPwd = records.filter(r => !isPwD(r));

// National SC stats
const allScMBBS = nonPwd.filter(r => getCategoryGroup(r.allottedCategory) === 'SC' && r.course.toUpperCase().includes('MBBS'));
const allScBDS = nonPwd.filter(r => getCategoryGroup(r.allottedCategory) === 'SC' && r.course.toUpperCase().includes('BDS'));
const allScAll = nonPwd.filter(r => getCategoryGroup(r.allottedCategory) === 'SC');

console.log(`\n===============================================================`);
console.log(`NATIONAL SC ALLOTMENT SUMMARY (Round 1 AIQ / Central / Deemed)`);
console.log(`===============================================================`);
console.log(`Total SC Seats Allotted (Non-PwD): ${allScAll.length}`);
console.log(`SC MBBS Non-PwD Seats: ${allScMBBS.length}`);
console.log(`SC BDS Non-PwD Seats: ${allScBDS.length}`);

allScMBBS.sort((a, b) => a.rank - b.rank);
console.log(`SC MBBS All India Round 1: Opening AIR = ${allScMBBS[0].rank}, Closing AIR = ${allScMBBS[allScMBBS.length - 1].rank} (${allScMBBS[allScMBBS.length - 1].allottedInstitute.split(',')[0]}, Quota: ${allScMBBS[allScMBBS.length - 1].allottedQuota})`);

// SC MBBS in Govt Colleges only (exclude Deemed / Self-Financed)
const govtScMBBS = allScMBBS.filter(r => !r.allottedQuota.toLowerCase().includes('deemed') && !r.allottedQuota.toLowerCase().includes('self-finance') && !r.allottedQuota.toLowerCase().includes('management'));
govtScMBBS.sort((a, b) => a.rank - b.rank);
console.log(`SC MBBS GOVT Colleges (AIQ/Central/ESIC): Opening AIR = ${govtScMBBS[0].rank}, Closing AIR = ${govtScMBBS[govtScMBBS.length - 1].rank} (${govtScMBBS[govtScMBBS.length - 1].allottedInstitute.split(',')[0]}, Quota: ${govtScMBBS[govtScMBBS.length - 1].allottedQuota})`);

// SC BDS in Govt Colleges
const govtScBDS = allScBDS.filter(r => !r.allottedQuota.toLowerCase().includes('deemed') && !r.allottedQuota.toLowerCase().includes('self-finance') && !r.allottedQuota.toLowerCase().includes('management'));
govtScBDS.sort((a, b) => a.rank - b.rank);
console.log(`SC BDS GOVT Colleges: Opening AIR = ${govtScBDS[0].rank}, Closing AIR = ${govtScBDS[govtScBDS.length - 1].rank} (${govtScBDS[govtScBDS.length - 1].allottedInstitute.split(',')[0]})`);

// Print top and bottom 5 for SC Govt MBBS
console.log('\nTop 5 SC Govt MBBS allotments:');
govtScMBBS.slice(0, 5).forEach(r => console.log(`  AIR ${r.rank} -> ${r.allottedInstitute.split(',')[0]} (${r.allottedQuota})`));

console.log('\nLast 5 SC Govt MBBS allotments:');
govtScMBBS.slice(-5).forEach(r => console.log(`  AIR ${r.rank} -> ${r.allottedInstitute.split(',')[0]} (${r.allottedQuota})`));
