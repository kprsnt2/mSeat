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

function cleanCollegeName(inst) {
  // Return the main identifiable name of the college
  let s = inst.split(',')[0].trim();
  const parts = inst.split(',');
  if (s.toLowerCase().startsWith('government medical college') && parts.length > 1) {
    s = `${parts[0].trim()} (${parts[1].trim()})`;
  } else if (s.toLowerCase().startsWith('rajiv gandhi institute of medical sciences') && parts.length > 1) {
    s = `${parts[0].trim()} (${parts[1].trim()})`;
  }
  return s;
}

const nonPwd = records.filter(r => !isPwD(r));

// TG Govt Colleges
const tgGovtColleges = [
  'AIIMS, Bibi Nagar, Hyderabad,AIIMS Bibinagar (Hyderabad Metropolitan Region) Telangana 508126',
  'Osmania Medical College, Hyderabad,HYDERABAD',
  'Gandhi Medical College, Secunderabad,MUSHEERABAD, SECUNDERABAD',
  'Employees State Insurance Coporation Medical College, Sanath Nagar, Hyderabad,Sanathnagar, Hyderabad',
  'Kakatiya Medical College, Warangal,SVP Road, Warangal',
  'Government Medical College, Nizamabad,R.P.Road, Near Bustand, Khaleelwadi Nizamabad',
  'Government Medical College, Siddipet,Survey No 54, Ensanpalli Village, Siddipet Mandal, Siddipet',
  'Government Medical College, Mahabubnagar,Government Medical College Mahabubnagar,Thirumala Hills, Edira Village.Mahabubnagar',
  'Government Medical College, Nalgonda,OFFICE OF THE PRINCIPAL, GOVERNMENT MEDICAL COLLGEGE,GANDHAMVARI GUDEM,SLBC,SAGAR ROAD,NALGONDA,TELA',
  'Government Medical College, Suryapet,AMARAVADI NAGAR, TALLAGADDA, SURYAPET-508213 Suraypet Dist',
  'Government Medical College, Sangareddy,OPP. TOWN POLICE STATION, NETAJI NAGAR, SANGAREDDY DISTRICT, TELANGANA - 502001',
  'Government Medical College, Karimnagar,The Additional DME /Principal, Government Medical College Karimnagar, Jagtial NH 563, Kothapalli,',
  'GOVERNMENT MEDICAL COLLEGE KHAMMAM,Wyra Road, Khammam',
  'Government Medical College, Mancherial,Government Medical College Mancherial, Gudipet Haziput mandal, Mancherial District, Telangana, 5042',
  'Government Medical College, Ramagundam,SURVEY NUMBER 92 95 96 MALKAPUR VILLAGE RAMAGUNDAM',
  'Government Medical College, Jagtial,Government Medical College, Jagtial, Jagtial Village, Jagtial Tehsil, Jagtial Dist',
  'Government Medical College, Wanaparthy,Marrikunta, Pebbair Road, Wanaparthy District, Telangana state.',
  'Government Medical College, Nagarkurnool,Sy no. 237, Uyyalawada village, Nanagarkurnool',
  'Government Medical College, Mahabubabad,Government Medical College, Mahabubabad, Servey No 551-1-P ,Torrur Road ,Near SP Office , Mahabubaba',
  'Government Medical College, Bhadradri Kothagudem,Besides Sammakka Saarakka temple, Opp KSM Petrol bunk, end of 6th Battalion Rd, Palvancha, Telangana',
  'Rajiv Gandhi Institute of Medical Sciences, adilabad,MAIN ROAD, OLD NH 07, ADILABAD TOWN ADILABAD DISTRICT, TELANGANA STATE-504001',
  'Government Medical College, Nirmal,BESIDE DIVYA GARDEN , DIVYA NAGAR NIRMAL',
  'Government Medical College, Kamareddy,Office of the Principal, Government Medical College Devanpally, Kamareddy, Telangana',
  'Government Medical College, Rajanna Sircilla,GOVERNMENT MEDICAL COLLEGE NEAR KASTURBA GIRLS SCHOOL PEDDUR SIRCILLA DISTRICT RAJANNA SIRCILLA',
  'GOVERNMENT MEDICAL COLLEGE VIKARABAD,ANANTHAGIRI HILLS VIKARABAD VIKARABAD DISTRICT TELANGANA 501101',
  'GOVERNMENT MEDICAL COLLEGE JANGAON,gmc.jangaon@gmail.com, 24, Weavers Colony, Jangaon, Telangana, 506167',
  'Government Medical College, Jayashankar Bhupalpally,Manzoor Nagar Road, Besides thousand quarters, Jayashankar, Bhupalpally',
  'GOVERNMENT MEDICAL COLLEGE KUMURAM BHEEM ASIFAFABAD,Government Medical College Ankushapur District Kumuram Bheem Asifabad Telangana',
  'Government medical College, Quthbullapur,Government Medical College Quthbullapur, Plot A2-4, ECIL cross roads, Kushaiguda Hyderabad, Med',
  'GOVERNMENT MEDICAL COLLEGE, KODANGAL,SURVEY NO 51 KOKAT BESIDE MOTHER AND CHILD HOSPITAL TANDUR VIKARABAD DISTRICT TELANGANA 501141 gmc',
  'Government Medical College, Narayanpet,Government Medical College Narayanpet Jajapur Narayanpet District Telangana Pincode 509210',
  'Government Medical College, Mulugu,gmc.mulugu@gmail.com',
  'Government Dental College Hyderabad,GOVERNMENT DENTAL COLLEGE AND HOSPITAL, AFZALGUNJ, HYDERABAD - 500012'
];

// AP Govt Colleges
const apGovtColleges = [
  'AIIMS Mangalagiri ,ALL INDIA INSTITUTE OF MEDICAL SCIENCES NEAR TADEPALLI MANGALAGIRI GUNTUR (Dt) ANDHRA PRADESH',
  'Andhra Medical College, Visakhapatnam,MAHARANI PETA NEAR COLLECTORATE KGH CAMPUS VISAKHAPATNAM',
  'Guntur Medical College, Guntur,Kannavarithoa Opp. NGOs Association Building',
  'S V Medical College, Tirupati,NEAR VIVEKANDANDA CIRCLE, ALIPIRI ROAD TIRUPATI',
  'Kurnool Medical College, Kurnool,BUDHAWARPET, KURNOOL.',
  'Rangaraya Medical College, Kakinada,PITHAPURAM ROAD, KAKINADA',
  'Government Siddhartha Medical College, Vijaywada,Beside New Government General Hospital Gunadala Vijayawada',
  'SVIMS - Sri Padmavathi Medical College for Women, Alipiri Road, Tirupati,SVIMS, ALIPIRI ROAD, TIRUPATI (Female Seat only )',
  'ACSR Government Medical College,OPP. TO AC SUBBA REDDY STADIUM DARGAMITTA NELLORE SPSR NELLORE DISTRICT, ANDHRA PRADESH',
  'Government Medical College, Kadapa ( previously Rajiv Gandhi Institute of Medical Sciences, Kadapa),GOVERNMENT MEDICAL COLLEGE RIMS PUTLAMPALLI, YSR KADAPA DIST. G.M.C.,KADAPA.,A.P',
  'Government Medical College, Ongole (previously Rajiv Gandhi Institute of Medical Sciences, Ongole),BHAGYANAGAR 5TH LANE, RIMS, ONGOLE, PRAKASAM DISTRICT, ANDHRA PRADESH',
  'Rajiv Gandhi Institute of Medical Sciences, Srikakulam,Balaga Srikakulam',
  'Government Medical College, Eluru,SURVEY NO 60, BEHIND OLD BUS STAND, ELURU',
  'Government Medical College, Machilipatnam,KARA AGRAHARAM, NEAR RADAR STATION, MACHILIPATNAM, KRISHNA DISTRICT, ANDHRA PRADESH -521002',
  'Government Medical College, Rajamahendravaram,Government Medical College,D.No.55-4-1,Central Jail Road ,Near CTRI, Rajamahendravaram.',
  'Government medical college, vizianagaram,Opposite Central Tribal University , Near JNTU Gajularega, Vizianagaram, Andhra Pradesh, 535003',
  'Government Medical College, Nandyal,principalgmcnandyala@gmail.com',
  'Government Medical College, Paderu,TALARASINGI VILLAGE,PADERU, ASR DISTRICT',
  'Government Medical College, Piduguralla,BRAHMMANAPALLE VILLAGE, STATE HIGHWAY-2,PIDUGURALLA MANDAL , PALNADU DISTRICT',
  'Government Dental College and Hospital, Vijayawada,Government Dental College and Hospital, Machavaram Post, Vijayawada - 520004',
  'Govt Dental College RIMS Kadapa,PRINCIPAL GOVT DENTAL COLLEGE, RIMS, PUTLAMPALLI KADAPA State ANDHRA PRADESH Pin 516004, Andhra Pradesh, 516004'
];

function generateCollegeTable(colList, stateName) {
  console.log(`\n========================================================================================`);
  console.log(`${stateName.toUpperCase()} GOVERNMENT COLLEGES - CLOSING RANKS BY CATEGORY (ROUND 1)`);
  console.log(`========================================================================================`);

  const results = [];

  for (let inst of colList) {
    const cRecs = nonPwd.filter(r => r.allottedInstitute === inst);
    cRecs.sort((a, b) => a.rank - b.rank);
    
    const isBDS = cRecs.length > 0 && cRecs[0].course.toUpperCase().includes('BDS');
    const course = isBDS ? 'BDS' : 'MBBS';

    const getCatClosing = (cat) => {
      const cr = cRecs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
      return cr.length > 0 ? cr[cr.length - 1].rank : '-';
    };

    const getCatOpening = (cat) => {
      const cr = cRecs.filter(r => getCategoryGroup(r.allottedCategory) === cat.toUpperCase());
      return cr.length > 0 ? cr[0].rank : '-';
    };

    const lastRecord = cRecs.length > 0 ? cRecs[cRecs.length - 1] : null;

    results.push({
      college: cleanCollegeName(inst),
      course,
      seats: cRecs.length,
      openClosing: getCatClosing('Open'),
      ewsClosing: getCatClosing('EWS'),
      obcClosing: getCatClosing('OBC'),
      scClosing: getCatClosing('SC'),
      stClosing: getCatClosing('ST'),
      lastSeatRank: lastRecord ? lastRecord.rank : '-',
      lastSeatCat: lastRecord ? lastRecord.allottedCategory : '-'
    });
  }

  // Sort by open closing rank (numeric)
  results.sort((a, b) => {
    const valA = typeof a.openClosing === 'number' ? a.openClosing : 999999;
    const valB = typeof b.openClosing === 'number' ? b.openClosing : 999999;
    return valA - valB;
  });

  console.table(results);
  return results;
}

const tgResults = generateCollegeTable(tgGovtColleges, 'Telangana');
const apResults = generateCollegeTable(apGovtColleges, 'Andhra Pradesh');

// Save detailed json for reporting
fs.writeFileSync(path.join(__dirname, 'docs', 'state_govt_cutoffs_summary.json'), JSON.stringify({ tgResults, apResults }, null, 2), 'utf8');
