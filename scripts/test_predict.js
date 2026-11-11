const fs = require('fs');
const govt = require('../final_accurate_govt.json');
const pvt = require('../final_accurate_pvt.json');
const allColleges = [...govt, ...pvt];

const customList = `
1 GANDGANDHI MEDICAL SECBAD HYD MBBSREG
2 OMCHOSMANIA MEDICAL HYDERABAD HYD MBBSREG
3 ESIM ESI MEDICAL SANATNGR HYD MBBSREG
4 KKTI KAKATIYA MEDICAL WARANGAL WGL MBBSREG
5 GSGRGOVT SANGAREDDY SANGAREDDY MED MBBSREG
6 GMCMGOVT MEDICAL, MBN MBNAGAR MBN MBBSREG
7 RADL RAJIV INST MEDICAL ADILABAD ADB MBBSREG
8 GVKBGOVT VIKARABAD VIKARABAD RR MBBSREG
9 SGMCGOVT SIDDIPET SIDDIPET MED MBBSREG
10 GQTBGOVT QUTHBULLAPUR QUTHBULLAPUR RR MBBSREG
11 GNGKGOVT NAGARKURNOOL NAGARKURNOOLMBN MBBSREG
12 GJGNGOVT JANGAON JANGAON WGL MBBSREG
13 GMNLGOVT NALGONDA NALGONDA NLG MBBSREG
14 GWNPGOVT WANAPARTHY WANAPARTHY MBN MBBSREG
15 GMDKGOVT MEDAK MEDAK MED MBBSREG
16 GMSRGOVT SURYAPET SURYAPET NLG MBBSREG
17 GMHBGOVT MAHABUBABAD MAHABUBABAD WGL MBBSREG
18 GKMRGOVT KAMAREDDY KAMAREDDY NZB MBBSREG
19 GSRCGOVT RAJANNA SIRCILLA SIRCILLA KRM MBBSREG
20 GKHMGOVT KHAMMAM KHAMMAM KHM MBBSREG
21 GKRMGOVT KARIMNAGAR KARIMNAGAR KRM MBBSREG
22 GVNZGOVT MEDICAL, NZB NIZAMBAD NZB MBBSREG
23 GJTL GOVT JAGITYAL JAGITYAL KRM MBBSREG
24 GJBP GOVT JAYASHANKAR BHUPALPALLY BHUPALPALLY WGL MBBSREG
25 GNRMGOVT NIRMAL NIRMAL ADB MBBSREG
26 SIMS SINGARENI INST RAMAGUNDAM KRM MBBSREG
27 GMCLGOVT MANCHERIAL MANCHERIAL ADB MBBSREG
28 GMBKGOVT BHADRADRI KOTHAGUDEM KHM MBBSREG
29 GASF GOVT KUMURAM BHEEM ASIFABAD ASIFABAD ADB MBBSREG
30 GMHRGOVT MAHESHWARAM MAHESHWARAMRR MBBSREG
31 GYDT GOVT YADADRI YADADRI NLG MBBSREG
32 GKDL GOVT KODANGAL KODANGAL MBN MBBSREG
33 GNRNGOVT NARAYANPET NARAYANPET MBN MBBSREG
34 GGWLGOVT GADWAL GADWAL MBN MBBSREG
35 GNRSGOVT NARSAMPET NARSAMPET WGL MBBSREG
36 GMULGOVT MULUGU MULUGU WGL MBBSREG
37 APLO APOLLO MEDICAL, HYD HYDERABAD HYD MBBSREG
38 KMHDKAMINENI ACADEMY LBNAGAR HYD MBBSREG
39 MAMSMAMATA, BACHUPALLY BACHUPALLY HYD MBBSREG
40 BASK BHASKAR, MOINABAD MOINABAD RR MBBSREG
41 MNRS MNR SANGAREDDY SANGARDY MED MBBS REG
42 SVSM S.V.S. MEDICAL, MBN MBNAGAR MBN MBBS REG
43 MEDI MEDICITY GHANPUR GHANAPUR RR MBBS REG
44 KMNI KAMINENI, NARKETPALY NRKTPLY NLG MBBS REG
45 CMRM CMR MEDCHAL MEDCHAL RR MBBS REG
46 AIMD ARUNDATHI DUNDIGAL DUNDIGAL HYD MBBS REG
47 DPMR DR PATNAM, CHEVELLA CHEVELLA RR MBBS REG
48 CARK C ANANDA RAO, KRM KRMNAGAR KRM MBBS REG
49 PRTM PRATHIMA,KARIMNAGAR KRMNAGAR KRM MBBS REG
50 MAHE MAHESHWARA, MEDAK PATNCHRU MED MBBS REG
51 MHVR MAHAVIR, VIKARABAD VIKARBAD RR MBBS REG
52 RVMC RVM MEDICAL, MEDAK SIDDIPET MED MBBS REG
53 PRIW PRATHIMA,WARANGAL WARANGAL WGL MBBS REG
54 NOVA NOVA, HAYATHNAGAR HAYATHNAGAR RR MBBS REG
55 TRRM TRR, SANGAREDDY SANGARDY MED MBBS REG
56 RAJE RAJA RAJESHWARI PATNCHRU MED MBBS REG
57 SURB SURABHI, SIDDIPET SIDDIPET MED MBBS REG
58 MMTA MAMATA, KHAMMAM KHAMMAM KHM MBBS REG
59 FCIM FATHER COLOMBO WGL WARANGAL WGL MBBS RE
`;

const lines = customList.trim().split('\n');
const prefs = lines.map(l => {
  const parts = l.trim().split(' ');
  const optNo = parts[0];
  const code = parts[1];
  return { optNo, code };
});

const myRank = 289635;
const myCategory = 'SC_2';

console.log("Evaluating for Rank:", myRank, "Category:", myCategory);
console.log("------------------------------------------------------");

let results = [];
let unknownColleges = [];

const mapping = {
  'GANDGANDHI': 'Gandhi',
  'OMCHOSMANIA': 'Osmania',
  'ESIM': 'ESI',
  'KKTI': 'Kakatiya',
  'GSGRGOVT': 'Sangareddy',
  'GMCMGOVT': 'Mahabubnagar',
  'RADL': 'RIMS Adilabad',
  'GVKBGOVT': 'Vikarabad',
  'SGMCGOVT': 'Siddipet',
  'GQTBGOVT': 'Quthbullapur',
  'GNGKGOVT': 'Nagarkurnool',
  'GJGNGOVT': 'Jangaon',
  'GMNLGOVT': 'Nalgonda',
  'GWNPGOVT': 'Wanaparthy',
  'GMDKGOVT': 'Medak',
  'GMSRGOVT': 'Suryapet',
  'GMHBGOVT': 'Mahabubabad',
  'GKMRGOVT': 'Kamareddy',
  'GSRCGOVT': 'Rajanna Sircilla',
  'GKHMGOVT': 'Khammam',
  'GKRMGOVT': 'Karimnagar',
  'GVNZGOVT': 'Nizamabad',
  'GJTL': 'Jagtial', // Fixed
  'GJBP': 'Bhupalpally',
  'GNRMGOVT': 'Nirmal',
  'SIMS': 'Singareni', // Doesn't exist, it's Ramagundam GMC now
  'GMCLGOVT': 'Mancherial',
  'GMBKGOVT': 'Bhadradri',
  'GASF': 'Asifabad',
  'GMHRGOVT': 'Maheshwaram',
  'GYDT': 'Yadadri',
  'GKDL': 'Kodangal',
  'GNRNGOVT': 'Narayanpet',
  'GGWLGOVT': 'Jogulamba', // Gadwal is Jogulamba Gadwal
  'GNRSGOVT': 'Narsampet',
  'GMULGOVT': 'Mulugu',
  'APLO': 'Apollo',
  'KMHDKAMINENI': 'Kamineni Academy',
  'MAMSMAMATA,': 'Mamata Academy',
  'BASK': 'Bhaskar',
  'MNRS': 'MNR',
  'SVSM': 'S.V.S.', // Fixed
  'MEDI': 'Medicity', // Fixed
  'KMNI': 'Kamineni Institute',
  'CMRM': 'CMR',
  'AIMD': 'Arundathi',
  'DPMR': 'Dr Patnam', // Fixed
  'CARK': 'Ananda Rao',
  'PRTM': 'Prathima Institute',
  'MAHE': 'Maheshwara',
  'MHVR': 'Mahavir',
  'RVMC': 'RVM',
  'PRIW': 'Prathima Relief', // Fixed
  'NOVA': 'Nova',
  'TRRM': 'TRR',
  'RAJE': 'Raja Rajeshwari',
  'SURB': 'Surabhi',
  'MMTA': 'Mamata Medical',
  'FCIM': 'Father Colombo'
};

for (const pref of prefs) {
  let col = null;
  const mapName = mapping[pref.code];
  if (mapName) {
      col = allColleges.find(c => c.name.toLowerCase().includes(mapName.toLowerCase()) && (pref.code === 'MAHE' ? c.type === 'pvt' : true));
      if (pref.code === 'SIMS') col = allColleges.find(c => c.name.toLowerCase().includes('ramagundam'));
      if (pref.code === 'MAMSMAMATA,') col = allColleges.find(c => c.name.toLowerCase().includes('mamata') && c.place.toLowerCase().includes('bachupally'));
      if (pref.code === 'PRTM') col = allColleges.find(c => c.name.toLowerCase().includes('prathima') && c.place.toLowerCase().includes('karimnagar'));
      if (pref.code === 'PRIW') col = allColleges.find(c => c.name.toLowerCase().includes('prathima') && c.place.toLowerCase().includes('warangal'));
      if (pref.code === 'MMTA') col = allColleges.find(c => c.name.toLowerCase().includes('mamata') && c.place.toLowerCase().includes('khammam'));
      if (pref.code === 'KMHDKAMINENI') col = allColleges.find(c => c.name.toLowerCase().includes('kamineni') && c.place.toLowerCase().includes('lb nagar'));
      if (pref.code === 'KMNI') col = allColleges.find(c => c.name.toLowerCase().includes('kamineni') && c.place.toLowerCase().includes('narketpally'));
  }

  if (!col) {
    console.log(`Could not find college code ${pref.code} in database`);
    continue;
  }
  
  let cutoff = col.knownRanks && col.knownRanks[myCategory];
  if (!cutoff || cutoff === 9999999 || cutoff === null) {
      unknownColleges.push({prefNo: pref.optNo, name: col.name});
      continue;
  }
  
  const diff = cutoff - myRank;
  
  results.push({
    prefNo: pref.optNo,
    code: pref.code,
    name: col.name,
    cutoff: cutoff,
    diff: diff
  });
}

const safe = results.filter(r => r.diff >= 0);
const borderline = results.filter(r => r.diff < 0).sort((a,b) => b.diff - a.diff); // top 5 closest

console.log("\nSAFE COLLEGES (You will get these in R1):");
safe.forEach(s => console.log(`#${s.prefNo} ${s.name} (${s.code}) - Cutoff: ${s.cutoff} (Margin: +${s.diff})`));
if (safe.length === 0) console.log("None");

console.log("\nBORDERLINE COLLEGES (Closest cutoffs, might get in R2/R3 or Stray):");
borderline.forEach(s => console.log(`#${s.prefNo} ${s.name} (${s.code}) - Cutoff: ${s.cutoff} (Short by: ${Math.abs(s.diff)})`));

console.log("\nNEW/UNKNOWN COLLEGES IN LIST (No previous year cutoff):");
unknownColleges.forEach(s => console.log(`#${s.prefNo} ${s.name}`));

console.log("\nWORST CASE / AVERAGE / BEST CASE:");
if (safe.length > 0) {
    const firstSafe = safe[0];
    console.log(`WORST CASE: You will definitely get #${safe[safe.length-1].prefNo} ${safe[safe.length-1].name}`);
    console.log(`AVERAGE CASE (Round 1/2): ${firstSafe.name} (Pref #${firstSafe.prefNo})`);
}

if (borderline.length > 0) {
    console.log(`BEST CASE (Round 3 / Stray): ${borderline[0].name} (Pref #${borderline[0].prefNo}), Currently short by ${Math.abs(borderline[0].diff)} ranks. High chance in R3.`);
} else if (safe.length > 0) {
    console.log(`BEST CASE (Round 3): ${safe[0].name} (Pref #${safe[0].prefNo})`);
} else {
    console.log("BEST CASE (Round 3): Very tough to get any established college based on R1 data. Might get into New Colleges (like Arundathi or Raja Rajeshwari) in R3 or Stray.");
}
