const fs = require('fs');

const appContent = fs.readFileSync('app.js', 'utf8');

const govtMatch = appContent.match(/const govtColleges = (\[[\s\S]*?\n\]);/);
const pvtMatch = appContent.match(/const pvtColleges = (\[[\s\S]*?\n\]);/);

const govt = JSON.parse(govtMatch[1]);
const pvt = JSON.parse(pvtMatch[1]);

console.log("=== ALL 36 GOVERNMENT COLLEGES ===");
govt.forEach((c, i) => {
  console.log(`${i+1}. ${c.name} (${c.place}) | Intake: ${c.intake} | OC Closing: ${c.ocClosing}`);
});

console.log("\n=== ALL 28 PRIVATE COLLEGES ===");
pvt.forEach((c, i) => {
  console.log(`${i+1}. ${c.name} (${c.place}) | Intake: ${c.intake} | OC Closing: ${c.ocClosing}`);
});
