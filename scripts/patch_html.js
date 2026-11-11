const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /\<span class="alloc-label"\>AIR:\<\/span\>/g,
  '<span class="alloc-label">Rank:</span>'
);

html = html.replace(
  /Estimated AIR: \<strong id="notAllocatedRank"\>—\<\/strong\>/g,
  'Estimated Cat Rank: <strong id="notAllocatedRank">—</strong>'
);

fs.writeFileSync('index.html', html);

let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace(
  /document\.getElementById\('notAllocatedRank'\)\.textContent = air\.toLocaleString\('en-IN'\);/g,
  "document.getElementById('notAllocatedRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN');"
);
fs.writeFileSync('app.js', appJs);

console.log("Patched HTML and JS!");
