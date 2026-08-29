const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<button type="submit" class="btn-primary btn-lg">[\s\S]*?<\/button>/;

const newBtns = `<div style="display: flex; gap: 16px; width: 100%;">
  <button type="button" class="btn-primary btn-lg btn-glow" onclick="quickPredict()" style="flex: 2; background: linear-gradient(135deg, #10b981 0%, #059669 100%); font-size: 1.1rem; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
    🚀 1-Click Auto Predict
  </button>
  <button type="submit" class="btn-outline btn-lg" style="flex: 1; border-color: #0ea5e9; color: #0ea5e9; font-size: 1rem;">
    Advanced Steps
  </button>
</div>`;

if(regex.test(html)) {
  html = html.replace(regex, newBtns);
  fs.writeFileSync('index.html', html);
  console.log("Successfully patched index.html");
} else {
  console.log("Regex did not match!");
}
