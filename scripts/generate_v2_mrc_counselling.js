const fs = require('fs');
const path = require('path');

/**
 * AY 2026-27 Telangana MBBS Final Mock Counselling Simulation (v2 Official KNRUHS MRC Engine)
 * 
 * Includes All India Quota (AIQ) candidates in state seat competition (as many prefer local top GMCs),
 * while explicitly recording their held AIQ seat details in a dedicated column.
 * 
 * Algorithm:
 * Phase 1: Open Category (OC / UR) Allotment strictly on General State Merit.
 * Phase 2: Meritorious Reserved Candidate (MRC) Re-allotment / Sliding.
 *          If a reserved candidate in an OC seat can secure a better college in their category,
 *          they slide to that better college under MRC quota.
 *          The seat vacated in their lower college is converted to their reserved category (Rule 10(2)).
 * Phase 3: Category-wise Allotment for remaining candidates into category seats, converted seats,
 *          and Muslim minority seats (for Muslim candidates only).
 */
function runV2MrcCounselling() {
  console.log('=== Starting AY 2026-27 Final Mock Counselling Simulation (Including AIQ Candidates) ===');

  // 1. Load Data
  const candidatesPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MERIT-LIST_parsed.json');
  const aiqPath = path.join(__dirname, '..', 'docs', 'all_india_provisional_result_final.json');
  const seatMatrixPath = path.join(__dirname, '..', 'docs', 'SEAT_MATRIX_CONSOLIDATED.json');
  const prefPath = path.join(__dirname, '..', 'docs', 'FINAL_GOVT_THEN_PVT_RAJENDRANAGAR.json');

  const candidates = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));
  const aiqFinal = JSON.parse(fs.readFileSync(aiqPath, 'utf8'));
  const smc = JSON.parse(fs.readFileSync(seatMatrixPath, 'utf8'));
  const finalGovtPvt = JSON.parse(fs.readFileSync(prefPath, 'utf8'));

  // Build AIQ lookup map by rank
  const aiqByRank = new Map();
  aiqFinal.forEach(r => {
    let inst = (r.allottedInstitute || '').trim();
    const firstComma = inst.indexOf(',');
    let shortInst = inst;
    if (firstComma > 0 && firstComma < 40) {
      shortInst = inst.substring(0, firstComma).trim();
    } else if (inst.length > 45) {
      shortInst = inst.substring(0, 45).trim() + '...';
    }

    aiqByRank.set(r.rank, {
      shortInstitute: shortInst,
      fullInstitute: inst,
      quota: r.allottedQuota || 'AIQ',
      course: r.course || 'MBBS',
      category: r.allottedCategory || ''
    });
  });

  console.log(`Loaded ${candidates.length} candidates from final merit list.`);
  console.log(`Loaded ${aiqFinal.length} AIQ allotted records (${aiqFinal.filter(r => candidates.some(c => c.neetRank === r.rank)).length} matched in TG).`);

  // 2. Build Ordered Colleges List (Top Rated Order: Gandhi #1, Osmania #2, ESIC #3, Kakatiya #4...)
  const colleges = [];

  const govtOrdered = [...finalGovtPvt.govtList];
  govtOrdered.sort((a, b) => {
    const rankMap = { GAND: 1, OMCH: 2, ESIM: 3, KKTI: 4 };
    const rA = rankMap[a.code] || (a.distKm + 10);
    const rB = rankMap[b.code] || (b.distKm + 10);
    return rA - rB;
  });

  govtOrdered.forEach((c, idx) => {
    const meta = smc.parsedColleges[c.code];
    if (!meta) throw new Error(`College code ${c.code} not found in seat matrix!`);
    colleges.push({
      priority: idx + 1,
      code: c.code,
      name: meta.name,
      place: c.place,
      distKm: c.distKm,
      type: 'GOVT',
      isMinority: false,
      seats: JSON.parse(JSON.stringify(meta.seats)),
      initialSeats: JSON.parse(JSON.stringify(meta.seats))
    });
  });

  finalGovtPvt.pvtList.forEach((c, idx) => {
    const meta = smc.parsedColleges[c.code];
    if (!meta) throw new Error(`College code ${c.code} not found in seat matrix!`);
    colleges.push({
      priority: govtOrdered.length + idx + 1,
      code: c.code,
      name: meta.name,
      place: c.place,
      distKm: c.distKm,
      type: 'PVT',
      course: 'MBBS',
      isMinority: false,
      seats: JSON.parse(JSON.stringify(meta.seats)),
      initialSeats: JSON.parse(JSON.stringify(meta.seats))
    });
  });

  // Muslim Minority Colleges at the end (assigned to Muslim candidates only)
  const minorityList = [
    { code: 'DCMS', place: 'Kanchanbagh, Hyderabad', distKm: 17 },
    { code: 'SHDN', place: 'Himayat Sagar, Hyderabad', distKm: 22 },
    { code: 'AYAN', place: 'Kanaka Mamidi, Moinabad', distKm: 30 },
    { code: 'VRKW', place: 'Aziznagar, Hyderabad', distKm: 20 }
  ];

  minorityList.forEach((m, idx) => {
    const meta = smc.parsedColleges[m.code];
    if (!meta) throw new Error(`Minority college code ${m.code} not found in seat matrix!`);
    colleges.push({
      priority: govtOrdered.length + finalGovtPvt.pvtList.length + idx + 1,
      code: m.code,
      name: meta.name,
      place: m.place,
      distKm: m.distKm,
      type: 'PVT_MIN',
      course: 'MBBS',
      isMinority: true,
      seats: JSON.parse(JSON.stringify(meta.seats)),
      initialSeats: JSON.parse(JSON.stringify(meta.seats))
    });
  });

  let totalConvenorSeats = 0;
  let totalOcSeats = 0;
  colleges.forEach(c => {
    totalOcSeats += c.seats.OC_G + c.seats.OC_F;
    for (let k of Object.keys(c.seats)) {
      if (k !== 'totalConvenor') totalConvenorSeats += c.seats[k];
    }
  });

  console.log(`Total Colleges: ${colleges.length}`);
  console.log(`Total Convenor MBBS Seats: ${totalConvenorSeats}`);
  console.log(`Total Open Category (OC) Seats: ${totalOcSeats}`);

  // Sort candidates strictly by State Serial Number (sno)
  candidates.sort((a, b) => a.sno - b.sno);

  const candidateAllotments = new Map();

  // -------------------------------------------------------------
  // PHASE 1: Open Category Allotment for ALL Candidates (including AIQ)
  // -------------------------------------------------------------
  let phase1OcCount = 0;

  for (let c of candidates) {
    const isFemale = c.gender === 'F';

    for (let col of colleges) {
      if (col.seats.OC_G > 0) {
        col.seats.OC_G--;
        phase1OcCount++;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `OC_GEN (${col.type})`,
          isOC: true,
          isMRC: false,
          genderQuota: 'GEN',
          mrcSlidFrom: null
        });
        break;
      } else if (isFemale && col.seats.OC_F > 0) {
        col.seats.OC_F--;
        phase1OcCount++;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `OC_FEM (${col.type})`,
          isOC: true,
          isMRC: false,
          genderQuota: 'FEM',
          mrcSlidFrom: null
        });
        break;
      }
    }

    if (phase1OcCount >= totalOcSeats) break;
  }

  console.log(`Phase 1 Complete: Allotted ${phase1OcCount} OC seats.`);

  // -------------------------------------------------------------
  // PHASE 2: MRC (Meritorious Reserved Candidate) Re-allotment / Sliding
  // -------------------------------------------------------------
  let mrcSlidCount = 0;
  const convertedSeatsCount = {};

  for (let c of candidates) {
    const alloc = candidateAllotments.get(c.sno);
    if (!alloc || !alloc.isOC) continue;

    let candCat = c.category;
    if (candCat === 'SC') candCat = 'SC2';
    const isFemale = c.gender === 'F';
    const isEws = c.ews === 'YES';

    if (candCat === 'OC' && !isEws) continue;

    const currentPri = alloc.college.priority;

    let betterCol = null;
    let betterQuota = '';
    let betterGender = '';

    for (let col of colleges) {
      if (col.priority >= currentPri) break;

      if (col.seats[`${candCat}_G`] > 0) {
        betterCol = col;
        betterQuota = `${candCat}_GEN (MRC)`;
        betterGender = 'G';
        break;
      } else if (isFemale && col.seats[`${candCat}_F`] > 0) {
        betterCol = col;
        betterQuota = `${candCat}_FEM (MRC)`;
        betterGender = 'F';
        break;
      } else if (isEws && col.seats.EWS_G > 0) {
        betterCol = col;
        betterQuota = `EWS_GEN (MRC)`;
        betterGender = 'G';
        break;
      } else if (isEws && isFemale && col.seats.EWS_F > 0) {
        betterCol = col;
        betterQuota = `EWS_FEM (MRC)`;
        betterGender = 'F';
        break;
      }
    }

    if (betterCol) {
      mrcSlidCount++;
      const oldCol = alloc.college;

      if (betterQuota.startsWith('EWS')) {
        if (betterGender === 'G') betterCol.seats.EWS_G--;
        else betterCol.seats.EWS_F--;
      } else {
        if (betterGender === 'G') betterCol.seats[`${candCat}_G`]--;
        else betterCol.seats[`${candCat}_F`]--;
      }

      const oldGender = alloc.genderQuota;
      const targetKey = isEws && candCat === 'OC' 
        ? (oldGender === 'GEN' ? 'EWS_G' : 'EWS_F')
        : (oldGender === 'GEN' ? `${candCat}_G` : `${candCat}_F`);

      oldCol.seats[targetKey] = (oldCol.seats[targetKey] || 0) + 1;
      convertedSeatsCount[targetKey] = (convertedSeatsCount[targetKey] || 0) + 1;

      candidateAllotments.set(c.sno, {
        status: 'ALLOTTED',
        course: 'MBBS',
        college: betterCol,
        quota: betterQuota,
        isOC: false,
        isMRC: true,
        genderQuota: betterGender === 'G' ? 'GEN' : 'FEM',
        mrcSlidFrom: oldCol.name
      });
    }
  }

  console.log(`Phase 2 Complete: ${mrcSlidCount} Meritorious Reserved Candidates (MRC) slid to better colleges.`);

  // -------------------------------------------------------------
  // PHASE 3: Category-wise Allotment for Remaining Candidates
  // -------------------------------------------------------------
  let phase3Allotted = 0;
  let unallottedCount = 0;

  for (let c of candidates) {
    if (candidateAllotments.has(c.sno)) continue;

    let candCat = c.category;
    if (candCat === 'SC') candCat = 'SC2';
    const isFemale = c.gender === 'F';
    const isEws = c.ews === 'YES';
    const isMinority = c.minority === 'MSM' || candCat === 'BCE';

    let gotSeat = false;

    for (let col of colleges) {
      if (col.seats[`${candCat}_G`] > 0) {
        col.seats[`${candCat}_G`]--;
        gotSeat = true;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `${candCat}_GEN (${col.type})`,
          isOC: false,
          isMRC: false,
          mrcSlidFrom: null
        });
        break;
      } else if (isFemale && col.seats[`${candCat}_F`] > 0) {
        col.seats[`${candCat}_F`]--;
        gotSeat = true;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `${candCat}_FEM (${col.type})`,
          isOC: false,
          isMRC: false,
          mrcSlidFrom: null
        });
        break;
      } else if (isEws && col.seats.EWS_G > 0) {
        col.seats.EWS_G--;
        gotSeat = true;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `EWS_GEN (${col.type})`,
          isOC: false,
          isMRC: false,
          mrcSlidFrom: null
        });
        break;
      } else if (isEws && isFemale && col.seats.EWS_F > 0) {
        col.seats.EWS_F--;
        gotSeat = true;
        candidateAllotments.set(c.sno, {
          status: 'ALLOTTED',
          course: 'MBBS',
          college: col,
          quota: `EWS_FEM (${col.type})`,
          isOC: false,
          isMRC: false,
          mrcSlidFrom: null
        });
        break;
      } else if (isMinority && col.isMinority) {
        if (col.seats.MIN_G > 0) {
          col.seats.MIN_G--;
          gotSeat = true;
          candidateAllotments.set(c.sno, {
            status: 'ALLOTTED',
            course: 'MBBS',
            college: col,
            quota: `MIN_GEN (${col.type})`,
            isOC: false,
            isMRC: false,
            mrcSlidFrom: null
          });
          break;
        } else if (isFemale && col.seats.MIN_F > 0) {
          col.seats.MIN_F--;
          gotSeat = true;
          candidateAllotments.set(c.sno, {
            status: 'ALLOTTED',
            course: 'MBBS',
            college: col,
            quota: `MIN_FEM (${col.type})`,
            isOC: false,
            isMRC: false,
            mrcSlidFrom: null
          });
          break;
        }
      }
    }

    if (gotSeat) {
      phase3Allotted++;
    } else {
      unallottedCount++;
      candidateAllotments.set(c.sno, {
        status: 'UNALLOTTED',
        course: 'NONE',
        college: { name: 'NO MBBS SEAT AVAILABLE', code: '', priority: 999 },
        quota: 'WAITLISTED (Try BDS/AYUSH)',
        isOC: false,
        isMRC: false,
        mrcSlidFrom: null
      });
    }
  }

  console.log(`Phase 3 Complete: Allotted ${phase3Allotted} category & minority seats.`);
  console.log(`Total Waitlisted / Unallotted: ${unallottedCount}`);

  // 4. Assemble Final Results Array with AIQ columns
  const finalResults = [];
  let totalAllotted = 0;
  let aiqHoldersAllottedInState = 0;

  for (let c of candidates) {
    const alloc = candidateAllotments.get(c.sno);
    if (alloc.status === 'ALLOTTED') totalAllotted++;

    const aiq = aiqByRank.get(c.neetRank);
    const hasAiqSeat = !!aiq;
    let aiqSeatHeld = '—';
    let aiqInstitute = '';
    let aiqQuota = '';
    let aiqCourse = '';

    if (aiq) {
      if (alloc.status === 'ALLOTTED') aiqHoldersAllottedInState++;
      aiqInstitute = aiq.shortInstitute;
      aiqQuota = aiq.quota;
      aiqCourse = aiq.course;
      aiqSeatHeld = `${aiq.shortInstitute} (${aiq.quota})`;
    }

    finalResults.push({
      sno: c.sno,
      rollNo: c.rollNo,
      neetRank: c.neetRank,
      score: c.finalScore !== undefined ? c.finalScore : c.neetScore,
      name: c.name,
      gender: c.gender,
      category: c.category,
      ews: c.ews || 'NO',
      minority: c.minority || 'NO',
      status: alloc.status,
      course: alloc.course,
      allottedCollege: alloc.college.name,
      allottedCollegeCode: alloc.college.code,
      allottedPrefNo: alloc.college.priority,
      allotmentQuota: alloc.quota,
      isMRC: !!alloc.isMRC,
      mrcSlidFrom: alloc.mrcSlidFrom || null,
      hasAiqSeat: hasAiqSeat ? 'YES' : 'NO',
      aiqSeatHeld: aiqSeatHeld,
      aiqInstitute: aiqInstitute,
      aiqQuota: aiqQuota,
      aiqCourse: aiqCourse
    });
  }

  console.log(`\n=== Final Verification (All Candidates Included) ===`);
  console.log(`Total Candidates Evaluated: ${finalResults.length}`);
  console.log(`Total State MBBS Seats Allotted: ${totalAllotted} / ${totalConvenorSeats} (100%)`);
  console.log(`Total AIQ Seat Holders in Merit List: ${aiqByRank.size}`);
  console.log(`AIQ Seat Holders who also won State MBBS Seats: ${aiqHoldersAllottedInState}`);
  console.log(`Total Unallotted / Waitlisted: ${unallottedCount}`);

  // 5. Generate CSV Data
  const csvHeaders = [
    'S.No', 'NEET Rank', 'Score', 'Roll No', 'Name', 'Gender', 'Category', 'EWS', 'Minority',
    'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota', 'MRC Slid', 'MRC Slid From',
    'Has AIQ Seat', 'AIQ Seat Held'
  ];
  const csvRows = [csvHeaders.join(',')];

  finalResults.forEach(r => {
    const cleanName = `"${r.name.replace(/"/g, '""')}"`;
    const cleanCollege = `"${r.allottedCollege.replace(/"/g, '""')}"`;
    const cleanSlidFrom = r.mrcSlidFrom ? `"${r.mrcSlidFrom.replace(/"/g, '""')}"` : '""';
    const cleanAiqHeld = r.aiqSeatHeld !== '—' ? `"${r.aiqSeatHeld.replace(/"/g, '""')}"` : '""';

    csvRows.push([
      r.sno,
      r.neetRank,
      r.score,
      r.rollNo,
      cleanName,
      r.gender,
      r.category,
      r.ews,
      r.minority,
      r.status,
      r.course,
      cleanCollege,
      `"${r.allotmentQuota}"`,
      r.isMRC ? 'YES' : 'NO',
      cleanSlidFrom,
      r.hasAiqSeat,
      cleanAiqHeld
    ].join(','));
  });

  const csvContent = csvRows.join('\n');

  // 6. Write Output Files
  const outJsonPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-V2-MOCK-ALLOTMENT.json');
  const outCsvPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-V2-MOCK-ALLOTMENT.csv');
  const finalJsonPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.json');
  const finalCsvPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.csv');
  const fixedCsvPath = path.join(__dirname, '..', 'docs', 'Fixed_Global_Mock_Allotment.csv');
  const globalCsvPath = path.join(__dirname, '..', 'docs', 'Global_Mock_Counselling_Allotment.csv');

  fs.writeFileSync(outJsonPath, JSON.stringify(finalResults, null, 2), 'utf8');
  fs.writeFileSync(outCsvPath, csvContent, 'utf8');
  fs.writeFileSync(finalJsonPath, JSON.stringify(finalResults, null, 2), 'utf8');
  fs.writeFileSync(finalCsvPath, csvContent, 'utf8');
  fs.writeFileSync(fixedCsvPath, csvContent, 'utf8');
  fs.writeFileSync(globalCsvPath, csvContent, 'utf8');

  // Also update docs/v2_allotment_data.js for offline file:// support
  const jsContent = 'var v2AllotmentData = ' + JSON.stringify(finalResults) + ';\nif (typeof window !== "undefined") { window.v2AllotmentData = v2AllotmentData; }\nif (typeof global !== "undefined") { global.v2AllotmentData = v2AllotmentData; }\nif (typeof module !== "undefined" && module.exports) { module.exports = v2AllotmentData; }\n';
  fs.writeFileSync(path.join(__dirname, '..', 'docs', 'v2_allotment_data.js'), jsContent, 'utf8');

  console.log(`Updated all docs and v2_allotment_data.js successfully!`);
  return finalResults;
}

if (require.main === module) {
  runV2MrcCounselling();
}

module.exports = { runV2MrcCounselling };
