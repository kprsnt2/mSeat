const fs = require('fs');
const path = require('path');

const recordsV2 = JSON.parse(fs.readFileSync('docs/all_india_provisional_result_v2.json', 'utf8'));
const recordsV1 = JSON.parse(fs.readFileSync('docs/all_india_provisional_result.json', 'utf8'));

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

function analyzeDataset(records, label) {
  const nonPwd = records.filter(r => !isPwD(r));

  const tgMBBS = nonPwd.filter(r => {
    const info = getInstInfo(r.allottedInstitute);
    return info && info.state === 'Telangana' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
  });

  const tgBDS = nonPwd.filter(r => {
    const info = getInstInfo(r.allottedInstitute);
    return info && info.state === 'Telangana' && info.type === 'Govt Dental';
  });

  const apMBBS = nonPwd.filter(r => {
    const info = getInstInfo(r.allottedInstitute);
    return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
  });

  const apBDS = nonPwd.filter(r => {
    const info = getInstInfo(r.allottedInstitute);
    return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Dental';
  });

  const getStats = (recs, name) => {
    recs.sort((a, b) => a.rank - b.rank);
    const getCat = (cat) => {
      const cr = recs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
      return cr.length > 0 ? cr[cr.length - 1].rank : '-';
    };
    const last = recs[recs.length - 1];
    return {
      group: name,
      seats: recs.length,
      open: getCat('Open'),
      ews: getCat('EWS'),
      obc: getCat('OBC'),
      sc: getCat('SC'),
      st: getCat('ST'),
      lastRank: last ? last.rank : '-',
      lastCat: last ? last.allottedCategory : '-',
      lastCollege: last ? last.allottedInstitute.split(',')[0] : '-'
    };
  };

  return {
    label,
    tgMBBS: getStats(tgMBBS, 'Telangana Govt MBBS'),
    tgBDS: getStats(tgBDS, 'Telangana Govt BDS'),
    apMBBS: getStats(apMBBS, 'Andhra Govt MBBS'),
    apBDS: getStats(apBDS, 'Andhra Govt BDS')
  };
}

const v1Stats = analyzeDataset(recordsV1, 'V1');
const v2Stats = analyzeDataset(recordsV2, 'V2');

console.log('\n========================================================================================');
console.log('TELANGANA & ANDHRA PRADESH GOVT CLOSING RANKS: V1 vs V2 COMPARISON');
console.log('========================================================================================');

const summaryTable = [
  { Dataset: 'V1', ...v1Stats.tgMBBS },
  { Dataset: 'V2', ...v2Stats.tgMBBS },
  { Dataset: 'V1', ...v1Stats.tgBDS },
  { Dataset: 'V2', ...v2Stats.tgBDS },
  { Dataset: 'V1', ...v1Stats.apMBBS },
  { Dataset: 'V2', ...v2Stats.apMBBS },
  { Dataset: 'V1', ...v1Stats.apBDS },
  { Dataset: 'V2', ...v2Stats.apBDS },
];

console.table(summaryTable);

// Let's also check TG merit list candidates ahead in v2
const meritText = fs.readFileSync('docs/merit_list_tg_extracted.txt', 'utf8');
const regex = /(\d{1,5})\s+(\d{1,7})\s+(\d{10})\s+([A-Za-z\s\.\,\'\-]+?)\s+(Male|Female)\s+(SC|ST|OBC-\s*NCL\s*\(Central\s*List\)|General-EWS|General|EWS|BC-[A-E]|Gen-EWS)(?:\s+(PwD|PWD|YES|NO))?\s+(\d{2,3})/g;

const cands = [];
let m;
while ((m = regex.exec(meritText)) !== null) {
  cands.push({
    sno: parseInt(m[1], 10),
    neetRank: parseInt(m[2], 10),
    rollNo: m[3],
    name: m[4].trim(),
    gender: m[5],
    category: m[6].trim().replace(/\s+/g, ' '),
    score: parseInt(m[8], 10)
  });
}

const aiqV2ByRank = new Map();
for (let r of recordsV2) {
  if (!aiqV2ByRank.has(r.rank)) aiqV2ByRank.set(r.rank, []);
  aiqV2ByRank.get(r.rank).push(r);
}

const ahead = cands.filter(c => c.sno < 8902 && c.neetRank < 289635);
const aheadInV2 = ahead.filter(c => aiqV2ByRank.has(c.neetRank));
const scAheadInV2 = aheadInV2.filter(c => c.category === 'SC' || c.category.includes('SC'));

console.log(`\nIn V2: Total TG Candidates Ahead with AIQ Seat = ${aheadInV2.length}`);
console.log(`In V2: Total SC Candidates Ahead with AIQ Seat = ${scAheadInV2.length}`);
