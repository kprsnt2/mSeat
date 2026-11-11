const fs = require('fs');
const path = require('path');

// 1. Check MCC AIQ Allotments from TG colleges
const records = JSON.parse(fs.readFileSync('docs/all_india_provisional_result.json', 'utf8'));

// Filter all allotments in TG Govt colleges
const tgGovtColleges = records.filter(r => {
  const l = r.allottedInstitute.toLowerCase();
  const isTG = (
    l.includes('aiims, bibi nagar') ||
    l.includes('osmania medical college') ||
    l.includes('gandhi medical college, secunderabad') ||
    l.includes('employees state insurance coporation medical college, sanath nagar') ||
    l.includes('kakatiya medical college') ||
    l.includes('government medical college') ||
    l.includes('rajiv gandhi institute of medical sciences, adilabad') ||
    (l.includes('government dental college') && l.includes('hyderabad'))
  ) && (
    l.includes('telangana') || l.includes('hyderabad') || l.includes('secunderabad') || l.includes('warangal') ||
    l.includes('nizamabad') || l.includes('karimnagar') || l.includes('khammam') || l.includes('mahabubnagar') ||
    l.includes('siddipet') || l.includes('suryapet') || l.includes('wanaparthy') || l.includes('sangareddy') ||
    l.includes('mancherial') || l.includes('ramagundam') || l.includes('jagtial') || l.includes('kothagudem') ||
    l.includes('nagarkurnool') || l.includes('mahabubabad') || l.includes('bhadradri') || l.includes('asifabad') ||
    l.includes('asifafabad') || l.includes('bhupalpally') || l.includes('jangaon') || l.includes('kamareddy') ||
    l.includes('mulugu') || l.includes('narayanpet') || l.includes('nirmal') || l.includes('sircilla') ||
    l.includes('vikarabad') || l.includes('kodangal') || l.includes('quthbullapur')
  ) && !l.includes('karnataka') && !l.includes('raichur') && !l.includes('bhopal') && !l.includes('shimla') && !l.includes('puducherry') && !l.includes('nagpur') && !l.includes('thane') && !l.includes('dhanbad') && !l.includes('goa') && !l.includes('pondicherry');

  return isTG;
});

console.log(`Total MCC Allotted Seats in TG Govt Colleges: ${tgGovtColleges.length}`);

// Group by College and Course and Quota
const collegeMap = {};
for (let r of tgGovtColleges) {
  const cName = r.allottedInstitute.split(',')[0].trim();
  const course = r.course;
  const quota = r.allottedQuota;
  const key = `${cName} (${course})`;
  if (!collegeMap[key]) {
    collegeMap[key] = {
      name: cName,
      course,
      totalMCC: 0,
      quotas: {},
      scSeats: 0,
      stSeats: 0,
      obcSeats: 0,
      ewsSeats: 0,
      openSeats: 0
    };
  }
  collegeMap[key].totalMCC++;
  collegeMap[key].quotas[quota] = (collegeMap[key].quotas[quota] || 0) + 1;
  const cat = r.allottedCategory.toUpperCase();
  if (cat.includes('SC')) collegeMap[key].scSeats++;
  else if (cat.includes('ST')) collegeMap[key].stSeats++;
  else if (cat.includes('OBC')) collegeMap[key].obcSeats++;
  else if (cat.includes('EWS')) collegeMap[key].ewsSeats++;
  else collegeMap[key].openSeats++;
}

console.table(collegeMap);

// Check total seat intake from final_accurate_govt.json
let govtCollegesData = [];
if (fs.existsSync('final_accurate_govt.json')) {
  govtCollegesData = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
}
console.log(`Total GMCs in database: ${govtCollegesData.length}`);
let totalGovtIntake = 0;
for (let c of govtCollegesData) {
  totalGovtIntake += (c.intake || 0);
}
console.log(`Total Govt MBBS Intake in TG database: ${totalGovtIntake}`);
