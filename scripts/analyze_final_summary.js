const fs = require('fs');
const path = require('path');

const finalRecords = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_final.json', 'utf8'));
const v2Records = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_v2.json', 'utf8'));
const v1Records = JSON.parse(fs.readFileSync('docs/all_india_provisional_result.json', 'utf8'));

console.log(`========================================================================`);
console.log(`MCC ALL INDIA ROUND 1: FINAL RESULT vs V2 vs V1 COMPARISON`);
console.log(`========================================================================`);
console.log(`Final Total Records: ${finalRecords.length}`);
console.log(`V2 Total Records:    ${v2Records.length}`);
console.log(`V1 Total Records:    ${v1Records.length}`);

// Compare Final with V2
let exactFinalV2 = 0;
let diffFinalV2 = 0;
const diffsFinalV2 = [];

for (let i = 0; i < finalRecords.length; i++) {
  const rF = finalRecords[i];
  const r2 = v2Records[i];

  if (!r2 || rF.sno !== r2.sno || rF.rank !== r2.rank || rF.allottedInstitute !== r2.allottedInstitute ||
      rF.allottedQuota !== r2.allottedQuota || rF.course !== r2.course ||
      rF.allottedCategory !== r2.allottedCategory || rF.candidateCategory !== r2.candidateCategory) {
    diffFinalV2++;
    diffsFinalV2.push({ index: i, final: rF, v2: r2 });
  } else {
    exactFinalV2++;
  }
}

console.log(`\nComparison between Final and V2:`);
console.log(` - Exact identical records: ${exactFinalV2}`);
console.log(` - Differences found: ${diffFinalV2}`);

if (diffFinalV2 > 0) {
  console.log(`\nSample Differences (Final vs V2):`);
  diffsFinalV2.slice(0, 10).forEach(d => console.log(d));
} else {
  console.log(` => FINAL Result is 100% IDENTICAL to V2 list! (MCC finalized the V2 allocations).`);
}

// Function to classify PwD
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

function getInstInfo(inst) {
  const l = inst.toLowerCase();
  
  // TG Government Medical
  const isTGGMC = (
    l.includes('aiims, bibi nagar') ||
    l.includes('osmania medical college') ||
    l.includes('gandhi medical college, secunderabad') ||
    l.includes('employees state insurance coporation medical college, sanath nagar') ||
    l.includes('kakatiya medical college') ||
    (l.includes('government medical college') && (
      l.includes('nizamabad') ||
      l.includes('mancherial') ||
      l.includes('quthbullapur') ||
      l.includes('nagarkurnool') ||
      l.includes('nirmal') ||
      l.includes('siddipet') ||
      l.includes('suryapet') ||
      l.includes('wanaparthy') ||
      l.includes('mahabubnagar') ||
      l.includes('jangaon') ||
      l.includes('ramagundam') ||
      l.includes('karimnagar') ||
      l.includes('khammam') ||
      l.includes('sangareddy') ||
      l.includes('vikarabad') ||
      l.includes('kodangal') ||
      l.includes('narayanpet') ||
      l.includes('mahabubabad') ||
      l.includes('kamareddy') ||
      l.includes('rajanna sircilla') ||
      l.includes('kumuram bheem') ||
      l.includes('mulugu') ||
      l.includes('jayashankar bhupalpally') ||
      l.includes('bhadradri kothagudem') ||
      l.includes('jagtial')
    )) ||
    (l.includes('rajiv gandio institute of medical sciences') && l.includes('adilabad')) ||
    (l.includes('rajiv gandhi institute of medical sciences') && l.includes('adilabad'))
  );

  const isTGGDC = l.includes('government dental college') && l.includes('hyderabad');

  const isAPGMC = (
    l.includes('aiims mangalagiri') ||
    l.includes('andhra medical college') ||
    l.includes('rangaraya medical college') ||
    l.includes('guntur medical college') ||
    l.includes('s v medical college') ||
    l.includes('kurnool medical college') ||
    l.includes('government siddhartha medical college') ||
    l.includes('svims - sri padmavathi') ||
    l.includes('acsr government medical college') ||
    (l.includes('government medical college') && (
      l.includes('kadapa') ||
      l.includes('eluru') ||
      l.includes('ongole') ||
      l.includes('nandyal') ||
      l.includes('vizianagaram') ||
      l.includes('rajamahendravaram') ||
      l.includes('paderu') ||
      l.includes('machilipatnam') ||
      l.includes('piduguralla') ||
      l.includes('anantapur') ||
      l.includes('markapur') ||
      l.includes('madanapalle') ||
      l.includes('adoni') ||
      l.includes('pulivendula')
    )) ||
    (l.includes('rajiv gandhi institute of medical sciences') && (
      l.includes('srikakulam') ||
      l.includes('kadapa') ||
      l.includes('ongole')
    ))
  );

  const isAPGDC = (
    (l.includes('government dental college') || l.includes('govt dental college')) &&
    (l.includes('vijayawada') || l.includes('kadapa') || l.includes('rims kadapa'))
  );

  if (isTGGMC) return { state: 'Telangana', type: 'Govt Medical', course: 'MBBS' };
  if (isTGGDC) return { state: 'Telangana', type: 'Govt Dental', course: 'BDS' };
  if (isAPGMC) return { state: 'Andhra Pradesh', type: 'Govt Medical', course: 'MBBS' };
  if (isAPGDC) return { state: 'Andhra Pradesh', type: 'Govt Dental', course: 'BDS' };
  return null;
}

const nonPwdFinal = finalRecords.filter(r => !isPwD(r));

// Analyze TG & AP Govt Colleges
function getSummary(recs, groupName) {
  recs.sort((a, b) => a.rank - b.rank);
  const getCatClosing = (cat) => {
    const cr = recs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
    return cr.length > 0 ? cr[cr.length - 1].rank : '-';
  };
  const last = recs[recs.length - 1];
  return {
    group: groupName,
    seats: recs.length,
    open: getCatClosing('Open'),
    ews: getCatClosing('EWS'),
    obc: getCatClosing('OBC'),
    sc: getCatClosing('SC'),
    st: getCatClosing('ST'),
    lastRank: last ? last.rank : '-',
    lastCat: last ? last.allottedCategory : '-',
    lastCollege: last ? last.allottedInstitute.split(',')[0] : '-'
  };
}

const tgGovtMBBSFinal = nonPwdFinal.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Telangana' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
});

const tgGovtBDSFinal = nonPwdFinal.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Telangana' && info.type === 'Govt Dental';
});

const apGovtMBBSFinal = nonPwdFinal.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
});

const apGovtBDSFinal = nonPwdFinal.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Dental';
});

console.log('\n========================================================================================');
console.log('FINAL RESULT: TELANGANA & ANDHRA PRADESH GOVT CLOSING RANKS (NON-PWD)');
console.log('========================================================================================');

const finalSummary = [
  getSummary(tgGovtMBBSFinal, 'Telangana Govt MBBS'),
  getSummary(tgGovtBDSFinal, 'Telangana Govt BDS'),
  getSummary(apGovtMBBSFinal, 'Andhra Govt MBBS'),
  getSummary(apGovtBDSFinal, 'Andhra Govt BDS')
];

console.table(finalSummary);
