const fs = require('fs');

const govtColleges = JSON.parse(fs.readFileSync('merged_govt_2026.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('merged_pvt_2026.json', 'utf8'));

let appContent = fs.readFileSync('app.js', 'utf8');

const govtStr = `const govtColleges = ${JSON.stringify(govtColleges, null, 2)};`;
const pvtStr = `const pvtColleges = ${JSON.stringify(pvtColleges, null, 2)};`;

appContent = appContent.replace(/const govtColleges = \[[\s\S]*?\n\];/, govtStr);
appContent = appContent.replace(/const pvtColleges = \[[\s\S]*?\n\];/, pvtStr);

fs.writeFileSync('app.js', appContent, 'utf8');
console.log("Updated app.js with 2026 seat additions successfully!");
