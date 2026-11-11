const fs = require('fs');
const path = require('path');

function runFinalMockCounselling() {
  console.log('--- Starting AY 2026-27 Final Mock Counselling Simulation ---');

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
  console.log(`Loaded ${aiqFinal.length} AIQ allotted records.`);

  // 2. Build Ordered Colleges List
  // Priority: 36 Govt -> 23 Private Cat-A -> 4 Minority Cat-A (ordered by Rajendranagar distance)
  const orderedColleges = [];

  // Govt Colleges (36)
  finalGovtPvt.govtList.forEach((c, idx) => {
    const meta = smc.parsedColleges[c.code];
    if (!meta) throw new Error(`College code ${c.code} not found in seat matrix!`);
    orderedColleges.push({
      prefNo: idx + 1,
      code: c.code,
      name: meta.name,
      place: c.place,
      distKm: c.distKm,
      type: 'GOVT',
      course: 'MBBS',
      isMinority: false,
      seats: JSON.parse(JSON.stringify(meta.seats)),
      initialSeats: JSON.parse(JSON.stringify(meta.seats))
    });
  });

  // Private Non-Minority Colleges (23)
  finalGovtPvt.pvtList.forEach((c, idx) => {
    const meta = smc.parsedColleges[c.code];
    if (!meta) throw new Error(`College code ${c.code} not found in seat matrix!`);
    orderedColleges.push({
      prefNo: finalGovtPvt.govtList.length + idx + 1,
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

  // Minority Colleges (4)
  const minorityCodes = [
    { code: 'DCMS', place: 'Kanchanbagh, Hyderabad', distKm: 17 },
    { code: 'SHDN', place: 'Himayat Sagar, Hyderabad', distKm: 22 },
    { code: 'AYAN', place: 'Kanaka Mamidi, Moinabad', distKm: 30 },
    { code: 'VRKW', place: 'Aziznagar, Hyderabad', distKm: 20 }
  ];

  minorityCodes.forEach((m, idx) => {
    const meta = smc.parsedColleges[m.code];
    if (!meta) throw new Error(`Minority college code ${m.code} not found in seat matrix!`);
    orderedColleges.push({
      prefNo: finalGovtPvt.govtList.length + finalGovtPvt.pvtList.length + idx + 1,
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

  console.log(`Total ordered colleges: ${orderedColleges.length} (36 Govt, 23 Pvt, 4 Minority).`);

  // Count total initial convenor seats
  let totalAvailableSeats = 0;
  orderedColleges.forEach(c => {
    for (let k of Object.keys(c.seats)) {
      if (k !== 'totalConvenor') totalAvailableSeats += c.seats[k];
    }
  });
  console.log(`Total MBBS Convenor seats available across all colleges: ${totalAvailableSeats}`);

  // 3. Sort Candidates by State Serial Number (sno)
  candidates.sort((a, b) => a.sno - b.sno);

  // 4. Run Mock Counselling Simulation
  const results = [];
  let aiqCount = 0;
  let allottedCount = 0;
  let unallottedCount = 0;

  const quotaBreakdown = {};
  const collegeAllotmentCounts = {};

  for (let c of candidates) {
    const isAiq = aiqByRank.has(c.neetRank);
    let status = 'ALLOTTED';
    let course = 'MBBS';
    let allottedCollege = 'N/A';
    let allottedCollegeCode = '';
    let allottedPrefNo = -1;
    let allotmentQuota = 'N/A';

    if (isAiq) {
      status = 'EXITED TO AIQ';
      course = 'MBBS (AIQ)';
      allottedCollege = 'ALL INDIA QUOTA SEAT';
      allotmentQuota = 'ALL INDIA';
      aiqCount++;
    } else {
      let gotSeat = false;
      let candCat = c.category;
      if (candCat === 'SC') candCat = 'SC2'; // standard TG fallback
      const isFemale = c.gender === 'F';
      const isEws = c.ews === 'YES';
      const isMinority = c.minority === 'MSM' || candCat === 'BCE';

      for (let col of orderedColleges) {
        // Rule 1: Merit in Open Category (General)
        if (col.seats.OC_G > 0) {
          col.seats.OC_G--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `OC_GEN (${col.type})`;
          break;
        }
        // Rule 2: Merit in Open Category (Female)
        else if (isFemale && col.seats.OC_F > 0) {
          col.seats.OC_F--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `OC_FEM (${col.type})`;
          break;
        }
        // Rule 3: EWS Reservation
        else if (isEws && col.seats.EWS_G > 0) {
          col.seats.EWS_G--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `EWS_GEN (${col.type})`;
          break;
        }
        else if (isEws && isFemale && col.seats.EWS_F > 0) {
          col.seats.EWS_F--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `EWS_FEM (${col.type})`;
          break;
        }
        // Rule 4: Reserved Category (General)
        else if (col.seats[`${candCat}_G`] > 0) {
          col.seats[`${candCat}_G`]--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `${candCat}_GEN (${col.type})`;
          break;
        }
        // Rule 5: Reserved Category (Female)
        else if (isFemale && col.seats[`${candCat}_F`] > 0) {
          col.seats[`${candCat}_F`]--;
          gotSeat = true;
          allottedCollege = col.name;
          allottedCollegeCode = col.code;
          allottedPrefNo = col.prefNo;
          allotmentQuota = `${candCat}_FEM (${col.type})`;
          break;
        }
        // Rule 6: Minority Quota (Muslim Minority in minority colleges)
        else if (isMinority && col.isMinority) {
          if (col.seats.MIN_G > 0) {
            col.seats.MIN_G--;
            gotSeat = true;
            allottedCollege = col.name;
            allottedCollegeCode = col.code;
            allottedPrefNo = col.prefNo;
            allotmentQuota = `MIN_GEN (${col.type})`;
            break;
          } else if (isFemale && col.seats.MIN_F > 0) {
            col.seats.MIN_F--;
            gotSeat = true;
            allottedCollege = col.name;
            allottedCollegeCode = col.code;
            allottedPrefNo = col.prefNo;
            allotmentQuota = `MIN_FEM (${col.type})`;
            break;
          }
        }
      }

      if (gotSeat) {
        allottedCount++;
        quotaBreakdown[allotmentQuota] = (quotaBreakdown[allotmentQuota] || 0) + 1;
        collegeAllotmentCounts[allottedCollege] = (collegeAllotmentCounts[allottedCollege] || 0) + 1;
      } else {
        unallottedCount++;
        status = 'UNALLOTTED';
        course = 'NONE';
        allottedCollege = 'NO MBBS SEAT AVAILABLE';
        allotmentQuota = 'WAITLISTED (Try BDS/AYUSH)';
      }
    }

    results.push({
      sno: c.sno,
      rollNo: c.rollNo,
      neetRank: c.neetRank,
      score: c.finalScore !== undefined ? c.finalScore : c.neetScore,
      name: c.name,
      gender: c.gender,
      category: c.category,
      ews: c.ews || 'NO',
      minority: c.minority || 'NO',
      status: status,
      course: course,
      allottedCollege: allottedCollege,
      allottedCollegeCode: allottedCollegeCode,
      allottedPrefNo: allottedPrefNo,
      allotmentQuota: allotmentQuota
    });
  }

  console.log('\n--- Simulation Summary ---');
  console.log(`Total Candidates Evaluated: ${results.length}`);
  console.log(`Exited to All India Quota (AIQ): ${aiqCount}`);
  console.log(`State MBBS Seats Allotted: ${allottedCount}`);
  console.log(`Unallotted / Waitlisted: ${unallottedCount}`);

  // Check remaining seats in colleges
  let remainingSeatsTotal = 0;
  orderedColleges.forEach(c => {
    let r = 0;
    for (let k of Object.keys(c.seats)) {
      if (k !== 'totalConvenor') r += c.seats[k];
    }
    remainingSeatsTotal += r;
  });
  console.log(`Remaining Unfilled Seats Across All Colleges: ${remainingSeatsTotal}`);

  // 5. Generate CSV Data
  const csvHeaders = ['S.No', 'NEET Rank', 'Score', 'Roll No', 'Name', 'Gender', 'Category', 'EWS', 'Minority', 'Status', 'Allotted Course', 'Allotted College', 'Allotment Quota'];
  const csvRows = [csvHeaders.join(',')];

  results.forEach(r => {
    const cleanName = `"${r.name.replace(/"/g, '""')}"`;
    const cleanCollege = `"${r.allottedCollege.replace(/"/g, '""')}"`;
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
      `"${r.allotmentQuota}"`
    ].join(','));
  });

  const csvContent = csvRows.join('\n');

  // 6. Write Output Files
  const outJsonPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.json');
  const outCsvPath = path.join(__dirname, '..', 'docs', 'AY-2026-27-FINAL-MOCK-ALLOTMENT.csv');
  const fixedCsvPath = path.join(__dirname, '..', 'docs', 'Fixed_Global_Mock_Allotment.csv');
  const globalCsvPath = path.join(__dirname, '..', 'docs', 'Global_Mock_Counselling_Allotment.csv');

  fs.writeFileSync(outJsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved JSON (${(fs.statSync(outJsonPath).size / (1024*1024)).toFixed(2)} MB) to: ${outJsonPath}`);

  fs.writeFileSync(outCsvPath, csvContent, 'utf8');
  console.log(`Saved CSV (${(fs.statSync(outCsvPath).size / (1024*1024)).toFixed(2)} MB) to: ${outCsvPath}`);

  fs.writeFileSync(fixedCsvPath, csvContent, 'utf8');
  console.log(`Updated Fixed_Global_Mock_Allotment.csv to: ${fixedCsvPath}`);

  fs.writeFileSync(globalCsvPath, csvContent, 'utf8');
  console.log(`Updated Global_Mock_Counselling_Allotment.csv to: ${globalCsvPath}`);

  console.log('\n--- Top 5 Allotments ---');
  console.log(results.slice(0, 5).map(r => `S.No ${r.sno} | AIR ${r.neetRank} | ${r.name} | ${r.category} | ${r.status} | ${r.allottedCollege} (${r.allotmentQuota})`));

  console.log('\n--- Sample Borderline Allotments (Around S.No 6000-6050) ---');
  results.filter(r => r.sno >= 6000 && r.sno <= 6020).forEach(r => {
    console.log(`S.No ${r.sno} | AIR ${r.neetRank} | ${r.name} | ${r.category} | ${r.status} | ${r.allottedCollege} (${r.allotmentQuota})`);
  });

  return results;
}

if (require.main === module) {
  runFinalMockCounselling();
}

module.exports = { runFinalMockCounselling };
