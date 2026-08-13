const fs = require('fs');

const finalGovt = JSON.parse(fs.readFileSync('final_accurate_govt.json', 'utf8'));
const finalPvt = JSON.parse(fs.readFileSync('final_accurate_pvt.json', 'utf8'));

let appContent = fs.readFileSync('app.js', 'utf8');

const govtStr = `const govtColleges = ${JSON.stringify(finalGovt, null, 2)};`;
const pvtStr = `const pvtColleges = ${JSON.stringify(finalPvt, null, 2)};`;

appContent = appContent.replace(/const govtColleges = \[[\s\S]*?\n\];/, govtStr);
appContent = appContent.replace(/const pvtColleges = \[[\s\S]*?\n\];/, pvtStr);

fs.writeFileSync('app.js', appContent, 'utf8');
console.log("Injected 100% accurate S.No-mapped college cutoffs into app.js!");
