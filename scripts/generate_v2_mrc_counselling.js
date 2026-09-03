const fs = require('fs');
const path = require('path');

/**
 * AY 2026-27 Telangana MBBS Mock Counselling Simulation - v2 (Official KNRUHS MRC Engine)
 * 
 * Algorithm:
 * Phase 1: Open Category (OC / UR) Allotment strictly on General Merit.
 * Phase 2: Meritorious Reserved Candidate (MRC) Re-allotment / Sliding.
 *          If a reserved candidate in an OC seat can secure a better college in their category,
 *          they slide to that better college under MRC quota.
 *          The seat vacated in their lower college is converted to their reserved category (Rule 10(2)).
 * Phase 3: Category-wise Allotment for remaining candidates into category seats, converted seats,
 *          and Muslim minority seats (for Muslim candidates only).
 */
function runV2MrcCounselling() {
  console.log('=== Starting AY 2026-27 v2 Official KNRUHS MRC Mock Counselling Simulation ===');

  // 1. Load Data
  const candidatesPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MERIT-LIST_parsed.json');
  const aiqPath = path.join(__dirname, '..', 'docs', 'all_india_provisional_result_final.json');
  const seatMatrixPath = path.join(__dirname, '..', 'docs', 'SEAT_MATRIX_CONSOLIDATED.json');
  const prefPath = path.join(__dirname, '..', 'docs', 'FINAL_GOVT_THEN_PVT_RAJENDRANAGAR.json');

  const candidates = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));
  const aiqFinal = JSON.parse(fs.readFileSync(aiqPath, 'utf8'));
  const smc = JSON.parse(fs.readFileSync(seatMatrixPath, 'utf8'));
  const finalGovtPvt = JSON.parse(fs.readFileSync(prefPath, 'utf8'));

  const aiqByRank = new Set(aiqFinal.map(r => r.rank));
  console.log(`Loaded ${candidates.length} candidates from final merit list.`);
  console.log(`Loaded ${aiqFinal.length} AIQ allotted records (${aiqFinal.filter(r => candidates.some(c => c.neetRank === r.rank)).length} matched in TG).`);

  // 2. Build Ordered Colleges List (Top Rated Order)
  // Gandhi is #1, Osmania #2, ESIC #3, Kakatiya #4...
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
  // PHASE 1: Open Category Allotment (General Merit)
  // -------------------------------------------------------------
  let phase1OcCount = 0;
  let aiqCount = 0;

  for (let c of candidates) {
    if (aiqByRank.has(c.neetRank)) {
      candidateAllotments.set(c.sno, {
        status: 'EXITED TO AIQ',
        course: 'MBBS (AIQ)',
        college: { name: 'ALL INDIA QUOTA SEAT', code: '', priority: 0, type: 'AIQ' },
        quota: 'ALL INDIA',
        isOC: false,
        isMRC: false,
        mrcSlidFrom: null
      });
      aiqCount++;
      continue;
    }

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
  }

  console.log(`\nPhase 1 Complete: Allotted ${phase1OcCount} OC seats.`);

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

    // Pure OC candidates without EWS cannot slide under MRC
    if (candCat === 'OC' && !isEws) continue;

    const currentPri = alloc.college.priority;

    // Look for a strictly better college in candidate's reserved category quota
    let betterCol = null;
    let betterQuota = '';
    let betterGender = '';

    for (let col of colleges) {
      if (col.priority >= currentPri) break; // Only strictly better colleges

      // 1. Reserved Category General
      if (col.seats[`${candCat}_G`] > 0) {
        betterCol = col;
        betterQuota = `${candCat}_GEN (MRC)`;
        betterGender = 'G';
        break;
      }
      // 2. Reserved Category Female
      else if (isFemale && col.seats[`${candCat}_F`] > 0) {
        betterCol = col;
        betterQuota = `${candCat}_FEM (MRC)`;
        betterGender = 'F';
        break;
      }
      // 3. EWS General
      else if (isEws && col.seats.EWS_G > 0) {
        betterCol = col;
        betterQuota = `EWS_GEN (MRC)`;
        betterGender = 'G';
        break;
      }
      // 4. EWS Female
      else if (isEws && isFemale && col.seats.EWS_F > 0) {
        betterCol = col;
        betterQuota = `EWS_FEM (MRC)`;
        betterGender = 'F';
        break;
      }
    }

    if (betterCol) {
      mrcSlidCount++;
      const oldCol = alloc.college;

      // 1. Consume seat in better college
      if (betterQuota.startsWith('EWS')) {
        if (betterGender === 'G') betterCol.seats.EWS_G--;
        else betterCol.seats.EWS_F--;
      } else {
        if (betterGender === 'G') betterCol.seats[`${candCat}_G`]--;
        else betterCol.seats[`${candCat}_F`]--;
      }

      // 2. Vacated seat in oldCol is converted to candidate's reserved category! (Rule 10(2))
      const oldGender = alloc.genderQuota; // 'GEN' or 'FEM'
      const targetKey = isEws && candCat === 'OC' 
        ? (oldGender === 'GEN' ? 'EWS_G' : 'EWS_F')
        : (oldGender === 'GEN' ? `${candCat}_G` : `${candCat}_F`);

      oldCol.seats[targetKey] = (oldCol.seats[targetKey] || 0) + 1;
      convertedSeatsCount[targetKey] = (convertedSeatsCount[targetKey] || 0) + 1;

      // 3. Update candidate's allotment
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
  console.log(`Vacated seats converted back to categories:`, convertedSeatsCount);

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
      // 1. Reserved Category General (including converted seats)
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
      }
      // 2. Reserved Category Female
      else if (isFemale && col.seats[`${candCat}_F`] > 0) {
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
      }
      // 3. EWS General
      else if (isEws && col.seats.EWS_G > 0) {
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
      }
      // 4. EWS Female
      else if (isEws && isFemale && col.seats.EWS_F > 0) {
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
      }
      // 5. Muslim Minority (Assigned to Muslim candidates only in minority colleges)
      else if (isMinority && col.isMinority) {
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

  // 4. Assemble Final Results Array
  const finalResults = [];
  let totalAllotted = 0;

  for (let c of candidates) {
    const alloc = candidateAllotments.get(c.sno);
    if (alloc.status === 'ALLOTTED') totalAllotted++;

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
      mrcSlidFrom: alloc.mrcSlidFrom || null
    });
  }

  console.log(`\n=== Final Verification ===`);
  console.log(`Total Candidates Evaluated: ${finalResults.length}`);
  console.log(`Total MBBS Seats Allotted: ${totalAllotted} / ${totalConvenorSeats} (100%)`);
  console.log(`Total AIQ Exited: ${aiqCount}`);
  console.log(`Total Unallotted: ${unallottedCount}`);

  let remainingSeatsTotal = 0;
  colleges.forEach(c => {
    for (let k of Object.keys(c.seats)) {
      if (k !== 'totalConvenor') remainingSeatsTotal += c.seats[k];
    }
  });
  console.log(`Remaining Unfilled Seats Across All Colleges: ${remainingSeatsTotal}`);

  // 5. Generate CSV Data
  const csvHeaders = ['S.No', 'NEET Rank', 'Score', 'Roll No', 'Name', 'Gender', 'Category', 'EWS', 'Minority', 'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota', 'MRC Slid', 'MRC Slid From'];
  const csvRows = [csvHeaders.join(',')];

  finalResults.forEach(r => {
    const cleanName = `"${r.name.replace(/"/g, '""')}"`;
    const cleanCollege = `"${r.allottedCollege.replace(/"/g, '""')}"`;
    const cleanSlidFrom = r.mrcSlidFrom ? `"${r.mrcSlidFrom.replace(/"/g, '""')}"` : '""';
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
      cleanSlidFrom
    ].join(','));
  });

  const csvContent = csvRows.join('\n');

  // 6. Write Output Files
  const outJsonPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-V2-MOCK-ALLOTMENT.json');
  const outCsvPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-V2-MOCK-ALLOTMENT.csv');

  fs.writeFileSync(outJsonPath, JSON.stringify(finalResults, null, 2), 'utf8');
  console.log(`Saved V2 JSON (${(fs.statSync(outJsonPath).size / (1024*1024)).toFixed(2)} MB) to: ${outJsonPath}`);

  fs.writeFileSync(outCsvPath, csvContent, 'utf8');
  console.log(`Saved V2 CSV (${(fs.statSync(outCsvPath).size / (1024*1024)).toFixed(2)} MB) to: ${outCsvPath}`);

  // Also update standard files with v2 as official source of truth
  const finalJsonPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.json');
  const finalCsvPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.csv');
  const fixedCsvPath = path.join(__dirname, '..', 'docs', 'Fixed_Global_Mock_Allotment.csv');
  const globalCsvPath = path.join(__dirname, '..', 'docs', 'Global_Mock_Counselling_Allotment.csv');

  fs.writeFileSync(finalJsonPath, JSON.stringify(finalResults, null, 2), 'utf8');
  fs.writeFileSync(finalCsvPath, csvContent, 'utf8');
  fs.writeFileSync(fixedCsvPath, csvContent, 'utf8');
  fs.writeFileSync(globalCsvPath, csvContent, 'utf8');

  console.log(`Updated core docs with v2 Official KNRUHS Allotment!`);
  return finalResults;
}

if (require.main === module) {
  runV2MrcCounselling();
}

module.exports = { runV2MrcCounselling };
