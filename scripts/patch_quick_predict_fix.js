const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const newQuickPredictFunc = `function quickPredict() {
  const snoInput = document.getElementById('stateSno').value;
  const airInput = document.getElementById('neetAIR').value;
  
  if (!snoInput && !airInput) {
    alert("Please enter either your State S.No or NEET AIR for quick predict.");
    return;
  }

  if (snoInput && !airInput && typeof snoToCatRanks2026 !== 'undefined' && snoToCatRanks2026[snoInput]) {
    const data = snoToCatRanks2026[snoInput];
    document.getElementById('neetAIR').value = data.air;
    document.getElementById('neetScore').value = data.score;
    let mappedCat = data.cat;
    if (mappedCat.length === 3 && (mappedCat.startsWith('BC') || mappedCat.startsWith('SC'))) {
       mappedCat = mappedCat.substring(0,2) + '_' + mappedCat.substring(2);
    }
    if (data.ews && mappedCat === 'OC') {
       mappedCat = 'EWS';
    }
    document.getElementById('categorySelect').value = mappedCat || document.getElementById('categorySelect').value;
    document.getElementById('genderSelect').value = data.gender || document.getElementById('genderSelect').value;
  }

  const form = document.getElementById('profileForm');
  if(!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Set up globals manually so we don't conflict with handleProfileSubmit timings
  const category = document.getElementById('categorySelect').value;
  const rawAir = parseInt(document.getElementById('neetAIR').value);
  const sno = parseInt(document.getElementById('stateSno').value);
  const score = parseInt(document.getElementById('neetScore').value);
  
  const air = isNaN(rawAir) ? estimateRank(score) : rawAir;
  const stateRank = isNaN(sno) ? estimateStateRank(air) : sno;
  
  studentProfile = {
    name: document.getElementById('studentName')?.value?.trim() || 'Student',
    score: score,
    category: category,
    gender: document.getElementById('genderSelect').value,
    localStatus: 'local',
    pwd: false,
    customAIR: air,
    customStateRank: stateRank
  };
  estimatedAIR = air;
  
  document.getElementById('prefType').value = 'mixed';
  
  const combinedColleges = [...govtColleges, ...pvtColleges].sort((a, b) => getClosingRank(a, category) - getClosingRank(b, category));
  const result = runAllocation(air, category, combinedColleges);
  
  if (result.allocated) {
    document.getElementById('allocSuccess').style.display = 'block';
    document.getElementById('allocFailure').style.display = 'none';
    document.getElementById('allocCollegeName').textContent = result.college.name;
    document.getElementById('allocCollegePlace').textContent = result.college.place;
    document.getElementById('allocCollegeType').textContent = result.college.type === 'govt' ? 'Government Medical College' : 'Private Medical College (Cat-A)';
    document.getElementById('allocClosingRank').textContent = result.closingRank.toLocaleString('en-IN');
    const fee = result.college.fee || (result.college.type === 'govt' ? 29000 : 60000);
    document.getElementById('allocCollegeFee').textContent = '₹' + fee.toLocaleString('en-IN') + ' / year';
    document.getElementById('allocStudentRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN') + ' (Cat Rank)';
    
    const margin = result.closingRank - estimateCategoryRank(air, category);
    document.getElementById('allocMarginVal').textContent = margin.toLocaleString('en-IN');
    document.getElementById('allocMargin').className = margin > 50 ? 'margin-safe' : margin > 10 ? 'margin-moderate' : 'margin-tight';
  } else {
    document.getElementById('allocSuccess').style.display = 'none';
    document.getElementById('allocFailure').style.display = 'block';
    document.getElementById('notAllocatedRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN');
  }
  
  goToStep(4);
}`;

appJs = appJs.replace(/function quickPredict\(\) \{[\s\S]*?\n\}/, newQuickPredictFunc);
fs.writeFileSync('app.js', appJs);
console.log("Fixed quickPredict timing issue!");
