const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const originalBtn = `<button type="submit" class="btn-primary btn-lg">
              Calculate Rank & Proceed
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>`;

const newBtns = `<div style="display: flex; gap: 16px; margin-top: 20px;">
              <button type="button" class="btn-primary btn-lg btn-glow" onclick="quickPredict()" style="flex: 2; background: linear-gradient(135deg, #10b981 0%, #059669 100%); font-size: 1.2rem; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
                🚀 1-Click Auto Predict
              </button>
              <button type="submit" class="btn-outline btn-lg" style="flex: 1; border-color: #3b82f6; color: #3b82f6;">
                Advanced (Steps)
              </button>
            </div>`;

html = html.replace(originalBtn, newBtns);
fs.writeFileSync('index.html', html);

let appJs = fs.readFileSync('app.js', 'utf8');

const quickPredictFunc = `
// 1-Click Quick Predict Logic
function quickPredict() {
  const snoInput = document.getElementById('stateSno').value;
  const airInput = document.getElementById('neetAIR').value;
  
  if (!snoInput && !airInput) {
    alert("Please enter either your State S.No or NEET AIR for quick predict.");
    return;
  }

  // Ensure autofill data is loaded if only S.No is provided
  if (snoInput && !airInput && snoToCatRanks2026[snoInput]) {
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

  // Validate form quickly
  const form = document.getElementById('profileForm');
  if(!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Prepare standard combined preferences (Govt + Pvt Cat-A) sorted by category cutoff
  const category = document.getElementById('categorySelect').value;
  const rawAir = parseInt(document.getElementById('neetAIR').value);
  const air = isNaN(rawAir) ? estimateRank(parseInt(document.getElementById('neetScore').value)) : rawAir;
  
  // Actually, wait, let's trigger the normal submission to populate globals, then immediately skip to Step 4
  const event = new Event('submit', { cancelable: true });
  form.dispatchEvent(event);
  
  // Set default preference: Mixed Combined
  document.getElementById('prefType').value = 'mixed';
  
  // Fake the process steps
  setTimeout(() => {
    // Generate the mixed preferences dynamically
    const combinedColleges = [...govtColleges, ...pvtColleges].sort((a, b) => getClosingRank(a, category) - getClosingRank(b, category));
    
    // Run allocation
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
    
    // Go to step 4
    goToStep(4);
  }, 100);
}
`;

if(!appJs.includes('quickPredict()')) {
  appJs += '\n' + quickPredictFunc;
  fs.writeFileSync('app.js', appJs);
}

console.log("Quick Predict Patched!");
