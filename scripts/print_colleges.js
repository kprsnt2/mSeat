const fs = require('fs');
const path = require('path');

const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

// Find unique institutes in TG
const tgColleges = [];
const apColleges = [];

for (let r of records) {
  const inst = r.allottedInstitute;
  const lower = inst.toLowerCase();

  const isTG = (
    lower.includes('telangana') ||
    lower.includes('hyderabad') ||
    lower.includes('secunderabad') ||
    lower.includes('bibinagar') ||
    lower.includes('bibi nagar') ||
    lower.includes('warangal') ||
    lower.includes('nizamabad') ||
    lower.includes('karimnagar') ||
    lower.includes('khammam') ||
    lower.includes('mahabubnagar') ||
    lower.includes('siddipet') ||
    lower.includes('suryapet') ||
    lower.includes('mancherial') ||
    lower.includes('ramagundam') ||
    lower.includes('jagtial') ||
    lower.includes('kothagudem') ||
    lower.includes('nagarkurnool') ||
    lower.includes('wanaparthy') ||
    lower.includes('sangareddy') ||
    lower.includes('mahabubabad') ||
    lower.includes('bhadradri') ||
    lower.includes('asifabad') ||
    lower.includes('asifafabad') ||
    lower.includes('bhupalpally') ||
    lower.includes('jangaon') ||
    lower.includes('kamareddy') ||
    lower.includes('mulugu') ||
    lower.includes('narayanpet') ||
    lower.includes('nirmal') ||
    lower.includes('sircilla') ||
    lower.includes('vikarabad') ||
    lower.includes('kodangal') ||
    lower.includes('quthbullapur') ||
    lower.includes('osmania') ||
    lower.includes('gandhi medical college, secunderabad') ||
    lower.includes('kakatiya') ||
    lower.includes('sanath nagar') ||
    lower.includes('sanathnagar')
  ) && !lower.includes('karnataka') && !lower.includes('raichur') && !lower.includes('bhopal') && !lower.includes('shimla') && !lower.includes('puducherry') && !lower.includes('nagpur') && !lower.includes('thane') && !lower.includes('dhanbad') && !lower.includes('goa') && !lower.includes('pondicherry');

  const isAP = (
    lower.includes('andhra') ||
    lower.includes('visakhapatnam') ||
    lower.includes('vijayawada') ||
    lower.includes('vijaywada') ||
    lower.includes('guntur') ||
    lower.includes('tirupati') ||
    lower.includes('kurnool') ||
    lower.includes('mangalagiri') ||
    lower.includes('kakinada') ||
    lower.includes('anantapur') ||
    lower.includes('nellore') ||
    lower.includes('kadapa') ||
    lower.includes('ongole') ||
    lower.includes('srikakulam') ||
    lower.includes('machilipatnam') ||
    lower.includes('eluru') ||
    lower.includes('rajamahendravaram') ||
    lower.includes('nandyal') ||
    lower.includes('vizianagaram') ||
    lower.includes('paderu') ||
    lower.includes('markapur') ||
    lower.includes('madanapalle') ||
    lower.includes('adoni') ||
    lower.includes('pulivendula') ||
    lower.includes('svims') ||
    lower.includes('rangaraya') ||
    lower.includes('acsr')
  ) && !lower.includes('nagarkurnool') && !lower.includes('karnataka') && !lower.includes('tamil nadu') && !lower.includes('maharashtra');

  if (isTG && !tgColleges.includes(inst)) tgColleges.push(inst);
  if (isAP && !apColleges.includes(inst)) apColleges.push(inst);
}

console.log('TG Total Colleges:', tgColleges.length);
tgColleges.forEach((c, i) => console.log(`${i+1}: ${c}`));

console.log('\nAP Total Colleges:', apColleges.length);
apColleges.forEach((c, i) => console.log(`${i+1}: ${c}`));
