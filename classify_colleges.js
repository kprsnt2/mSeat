const fs = require('fs');
const path = require('path');

const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));
const allInsts = [...new Set(records.map(r => r.allottedInstitute))];

// Let's write a filter for TG and AP
const tgGMC = [];
const tgGDC = [];
const apGMC = [];
const apGDC = [];
const tgPvt = [];
const apPvt = [];
const otherInsts = [];

for (let inst of allInsts) {
  const l = inst.toLowerCase();
  
  // TG Government Medical
  if (
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
  ) {
    tgGMC.push(inst);
  } else if (l.includes('government dental college') && l.includes('hyderabad')) {
    tgGDC.push(inst);
  } else if (l.includes('malla reddy') || l.includes('mallareddy')) {
    tgPvt.push(inst);
  }
  // AP Government Medical
  else if (
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
  ) {
    apGMC.push(inst);
  } else if (
    (l.includes('government dental college') || l.includes('govt dental college')) &&
    (l.includes('vijayawada') || l.includes('kadapa') || l.includes('rims kadapa'))
  ) {
    apGDC.push(inst);
  } else if (l.includes('gitam')) {
    apPvt.push(inst);
  } else {
    otherInsts.push(inst);
  }
}

console.log(`TG GMC Count: ${tgGMC.length}`);
console.log(`TG GDC Count: ${tgGDC.length}`);
console.log(`TG Pvt Count: ${tgPvt.length}`);
console.log(`AP GMC Count: ${apGMC.length}`);
console.log(`AP GDC Count: ${apGDC.length}`);
console.log(`AP Pvt Count: ${apPvt.length}`);

// Let's also check if any in otherInsts contains 'andhra' or 'telangana'
console.log('\nChecking remaining otherInsts for any AP/TG references:');
for (let inst of otherInsts) {
  const l = inst.toLowerCase();
  if (l.includes('andhra') || l.includes('telangana')) {
    console.log('  Remaining:', inst);
  }
}
