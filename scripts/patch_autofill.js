const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// The old estimateCategoryRank assumed snoToCatRanks2026[sRank] WAS the ranks object.
// Now it's snoToCatRanks2026[sRank].ranks. Let's fix that.
const oldEst = `  if (snoToCatRanks2026[sRank]) {
    const ranks = snoToCatRanks2026[sRank];`;
const newEst = `  if (snoToCatRanks2026[sRank] && snoToCatRanks2026[sRank].ranks) {
    const ranks = snoToCatRanks2026[sRank].ranks;`;

appJs = appJs.replace(oldEst, newEst);

// Now we need to update the injected data variable in app.js
const snoMap = fs.readFileSync('sno_to_cat_ranks_2026.json', 'utf8');

// We have to replace the old json. It was injected as: const snoToCatRanks2026 = {...};
// Since it's large, we can just replace the whole declaration.
appJs = appJs.replace(/const snoToCatRanks2026 = \{.*?\};\n\n/s, `const snoToCatRanks2026 = ${snoMap};\n\n`);

// Now add the autofill listener
const autofillLogic = `
// AUTOFILL LOGIC based on S.No
document.addEventListener('DOMContentLoaded', () => {
  const snoInput = document.getElementById('stateSno');
  if (snoInput) {
    snoInput.addEventListener('input', (e) => {
      const sno = parseInt(e.target.value);
      if (sno && snoToCatRanks2026[sno]) {
        const data = snoToCatRanks2026[sno];
        
        const airInput = document.getElementById('neetAIR');
        const scoreInput = document.getElementById('neetScore');
        const catSelect = document.getElementById('category');
        const genderSelect = document.getElementById('gender');
        
        if (airInput) { airInput.value = data.air; airInput.style.borderColor = '#10b981'; }
        if (scoreInput) { scoreInput.value = data.score; scoreInput.style.borderColor = '#10b981'; }
        
        if (catSelect) {
          // data.cat is like "OC", "BCA", "SC2"
          let mappedCat = data.cat;
          if (mappedCat.length === 3 && (mappedCat.startsWith('BC') || mappedCat.startsWith('SC'))) {
             mappedCat = mappedCat.substring(0,2) + '_' + mappedCat.substring(2);
          }
          if (data.ews && mappedCat === 'OC') {
             mappedCat = 'EWS';
          }
          catSelect.value = mappedCat;
          catSelect.style.borderColor = '#10b981';
        }
        
        if (genderSelect) {
          genderSelect.value = data.gender;
          genderSelect.style.borderColor = '#10b981';
        }
      }
    });
  }
});
`;

appJs += autofillLogic;

fs.writeFileSync('app.js', appJs);
console.log("Patched app.js with autofill logic!");
