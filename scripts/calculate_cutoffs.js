const fs = require('fs');
const path = require('path');

const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

// Check candidate details in workspace
console.log("=== CHECKING CANDIDATES FROM WORKSPACE IN ALL INDIA RESULT ===");
const targetRanks = [289635, 312829, 260591];
for (let tr of targetRanks) {
  const match = records.filter(r => r.rank === tr);
  console.log(`Rank ${tr}:`, match.length > 0 ? match : 'Not allotted / Not in list');
}

// Function to classify PwD
function isPwD(r) {
  const cat1 = (r.allottedCategory || '').toUpperCase();
  const cat2 = (r.candidateCategory || '').toUpperCase();
  const q = (r.allottedQuota || '').toUpperCase();
  return cat1.includes('PWD') || cat2.includes('PWD') || cat1.includes('PH') || cat2.includes('PH') || q.includes('PWD') || q.includes('PH');
}

// Categorization helper
function getCategoryGroup(cat) {
  const c = (cat || '').toUpperCase();
  if (c.includes('SC')) return 'SC';
  if (c.includes('ST')) return 'ST';
  if (c.includes('OBC') || c.includes('BC')) return 'OBC';
  if (c.includes('EWS')) return 'EWS';
  if (c.includes('OPEN') || c.includes('GEN') || c.includes('UR')) return 'OPEN';
  return 'OTHER';
}

// Check colleges
const allInsts = [...new Set(records.map(r => r.allottedInstitute))];

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

// Analyze non-PwD seats
const nonPwdRecords = records.filter(r => !isPwD(r));
console.log(`Total non-PwD records: ${nonPwdRecords.length} (out of ${records.length})`);

// Filter TG Govt Medical (MBBS) & AP Govt Medical (MBBS)
const tgGovtMBBS = nonPwdRecords.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Telangana' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
});

const tgGovtBDS = nonPwdRecords.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Telangana' && info.type === 'Govt Dental';
});

const apGovtMBBS = nonPwdRecords.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Medical' && r.course.toUpperCase().includes('MBBS');
});

const apGovtBDS = nonPwdRecords.filter(r => {
  const info = getInstInfo(r.allottedInstitute);
  return info && info.state === 'Andhra Pradesh' && info.type === 'Govt Dental';
});

console.log(`TG Govt MBBS allotted seats (non-PwD): ${tgGovtMBBS.length}`);
console.log(`TG Govt BDS allotted seats (non-PwD): ${tgGovtBDS.length}`);
console.log(`AP Govt MBBS allotted seats (non-PwD): ${apGovtMBBS.length}`);
console.log(`AP Govt BDS allotted seats (non-PwD): ${apGovtBDS.length}`);

function analyzeGroup(groupName, recs) {
  console.log(`\n===============================================================`);
  console.log(`ANALYSIS: ${groupName} (Non-PwD Seats: ${recs.length})`);
  console.log(`===============================================================`);
  
  if (recs.length === 0) {
    console.log('No records found.');
    return;
  }

  // Sort by rank ascending
  recs.sort((a, b) => a.rank - b.rank);
  const first = recs[0];
  const last = recs[recs.length - 1];

  console.log(`First Allotted Rank: ${first.rank} -> ${first.allottedInstitute.split(',')[0]} (${first.allottedCategory})`);
  console.log(`LAST ALLOTTED RANK (Overall): ${last.rank} -> ${last.allottedInstitute.split(',')[0]} (Allotted: ${last.allottedCategory}, Cand: ${last.candidateCategory}, Quota: ${last.allottedQuota})`);

  // Category wise breakdown
  const cats = ['Open', 'EWS', 'OBC', 'SC', 'ST'];
  console.log(`\n--- Category Wise Cutoff / Last Allotted Rank ---`);
  for (let cat of cats) {
    const catRecs = recs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
    if (catRecs.length > 0) {
      const lastInCat = catRecs[catRecs.length - 1];
      const firstInCat = catRecs[0];
      console.log(`Category [${cat}]: Opening Rank = ${firstInCat.rank}, LAST RANK = ${lastInCat.rank} | College: ${lastInCat.allottedInstitute.split(',')[0]} | Quota: ${lastInCat.allottedQuota}`);
    }
  }

  // College-wise breakdown
  console.log(`\n--- College Wise Summary (sorted by SC closing rank & Open closing rank) ---`);
  const colMap = new Map();
  for (let r of recs) {
    const cName = r.allottedInstitute.split(',')[0].trim();
    if (!colMap.has(cName)) colMap.set(cName, []);
    colMap.get(cName).push(r);
  }

  const colSummaries = [];
  for (let [cName, cRecs] of colMap.entries()) {
    cRecs.sort((a, b) => a.rank - b.rank);
    const getCatClosing = (cat) => {
      const cr = cRecs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
      return cr.length > 0 ? cr[cr.length - 1].rank : 'N/A';
    };
    colSummaries.push({
      college: cName,
      totalSeats: cRecs.length,
      openClosing: getCatClosing('Open'),
      ewsClosing: getCatClosing('EWS'),
      obcClosing: getCatClosing('OBC'),
      scClosing: getCatClosing('SC'),
      stClosing: getCatClosing('ST'),
      lastRank: cRecs[cRecs.length - 1].rank,
      lastRankCat: cRecs[cRecs.length - 1].allottedCategory
    });
  }

  // Sort colleges by open closing rank
  colSummaries.sort((a, b) => (typeof a.openClosing === 'number' ? a.openClosing : 999999) - (typeof b.openClosing === 'number' ? b.openClosing : 999999));
  console.table(colSummaries);
}

analyzeGroup('TELANGANA GOVT MBBS (AIQ + Central/AIIMS + ESIC IP)', tgGovtMBBS);
analyzeGroup('ANDHRA PRADESH GOVT MBBS (AIQ + Central/AIIMS)', apGovtMBBS);
analyzeGroup('TELANGANA GOVT BDS', tgGovtBDS);
analyzeGroup('ANDHRA PRADESH GOVT BDS', apGovtBDS);
