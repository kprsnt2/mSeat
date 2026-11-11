const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// In renderCollegeList
appJs = appJs.replace(
  /\<span class="rank-value \$\{eligible \? 'rank-safe' : 'rank-danger'\}">\$\{air\.toLocaleString\('en-IN'\)\}\<\/span>/g,
  '<span class="rank-value ${eligible ? \'rank-safe\' : \'rank-danger\'}">${estimateCategoryRank(air, category).toLocaleString(\'en-IN\')}</span>'
);

// In showAllocationResult
appJs = appJs.replace(
  /document\.getElementById\('allocStudentRank'\)\.textContent = air\.toLocaleString\('en-IN'\);/g,
  "document.getElementById('allocStudentRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN') + ' (Cat Rank)';"
);

// Margin in showAllocationResult
appJs = appJs.replace(
  /const margin = result\.closingRank \- air;/g,
  "const margin = result.closingRank - estimateCategoryRank(air, category);"
);

// Safety margin class in showAllocationResult
appJs = appJs.replace(
  /document\.getElementById\('allocMargin'\)\.className = margin \> 5000 \? 'margin-safe' : margin \> 1000 \? 'margin-moderate' : 'margin-tight';/g,
  "document.getElementById('allocMargin').className = margin > 50 ? 'margin-safe' : margin > 10 ? 'margin-moderate' : 'margin-tight';"
);

// Update rank label in renderCollegeList
appJs = appJs.replace(
  /\<span class="rank-label"\>Your Rank\<\/span\>/g,
  '<span class="rank-label">Your Cat Rank</span>'
);

fs.writeFileSync('app_ui_patched.js', appJs);
console.log("Patched UI successfully.");
