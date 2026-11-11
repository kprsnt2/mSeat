const fs = require('fs');
const govt = require('../final_accurate_govt.json');
const pvt = require('../final_accurate_pvt.json');
const allColleges = [...govt, ...pvt];

const customList = `
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
  return { optNo, code, fullLine: l.trim() };
});

const myCategory = 'SC_2';
let results = [];

const mapping = {
  'APLO': 'Apollo',
  'KMHDKAMINENI': 'Kamineni Academy',
  'MAMSMAMATA,': 'Mamata Academy',
  'BASK': 'Bhaskar',
  'MNRS': 'MNR',
  'SVSM': 'S.V.S.',
  'MEDI': 'Medicity',
  'KMNI': 'Kamineni Institute',
  'CMRM': 'CMR',
  'AIMD': 'Arundathi',
  'DPMR': 'Dr Patnam',
  'CARK': 'Ananda Rao',
  'PRTM': 'Prathima Institute',
  'MAHE': 'Maheshwara',
  'MHVR': 'Mahavir',
  'RVMC': 'RVM',
  'PRIW': 'Prathima Relief',
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
      if (pref.code === 'MAMSMAMATA,') col = allColleges.find(c => c.name.toLowerCase().includes('mamata') && c.place.toLowerCase().includes('bachupally'));
      if (pref.code === 'PRTM') col = allColleges.find(c => c.name.toLowerCase().includes('prathima') && c.place.toLowerCase().includes('karimnagar'));
      if (pref.code === 'PRIW') col = allColleges.find(c => c.name.toLowerCase().includes('prathima') && c.place.toLowerCase().includes('warangal'));
      if (pref.code === 'MMTA') col = allColleges.find(c => c.name.toLowerCase().includes('mamata') && c.place.toLowerCase().includes('khammam'));
      if (pref.code === 'KMHDKAMINENI') col = allColleges.find(c => c.name.toLowerCase().includes('kamineni') && c.place.toLowerCase().includes('lb nagar'));
      if (pref.code === 'KMNI') col = allColleges.find(c => c.name.toLowerCase().includes('kamineni') && c.place.toLowerCase().includes('narketpally'));
  }

  let cutoff = col && col.knownRanks ? col.knownRanks[myCategory] : 9999999;
  if (!cutoff || cutoff === 9999999) cutoff = 9999999;
  
  results.push({
    pref: pref,
    name: col ? col.name : pref.code,
    cutoff: cutoff
  });
}

// Sort by cutoff ascending (hardest to get first)
results.sort((a, b) => {
    // If it's a new college (9999999), push it to the bottom
    if (a.cutoff === 9999999 && b.cutoff !== 9999999) return 1;
    if (b.cutoff === 9999999 && a.cutoff !== 9999999) return -1;
    return a.cutoff - b.cutoff;
});

console.log("REORDERED PRIVATE COLLEGES:");
let sno = 37;
results.forEach(r => {
    // Replace the old optNo with the new SNo
    let parts = r.pref.fullLine.split(' ');
    parts[0] = sno;
    console.log(parts.join(' '));
    sno++;
});
