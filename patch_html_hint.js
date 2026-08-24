const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The original label in index.html is:
// <label for="stateSno">Telangana State S.No <span class="optional-tag">optional</span></label>
html = html.replace(
  /\<label for="stateSno"\>Telangana State S.No \<span class="optional-tag"\>optional\<\/span\>\<\/label\>/g,
  '<label for="stateSno">Telangana State S.No <span class="label-badge" style="background:#10b981">Auto-Fills Form!</span></label>'
);

fs.writeFileSync('index.html', html);
console.log("Updated HTML label");
