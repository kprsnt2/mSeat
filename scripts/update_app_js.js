const fs = require('fs');

const govtColleges = JSON.parse(fs.readFileSync('merged_govt.json', 'utf8'));
const pvtColleges = JSON.parse(fs.readFileSync('merged_pvt.json', 'utf8'));

let appContent = fs.readFileSync('app.js', 'utf8');

// Replace govtColleges array definition in app.js
const govtStr = `const govtColleges = ${JSON.stringify(govtColleges, null, 2)};`;
const pvtStr = `const pvtColleges = ${JSON.stringify(pvtColleges, null, 2)};`;

// Update reservationData object in app.js
const reservationStr = `const reservationData = {
  OC: { label: "Open Category (General)", percent: "~36% (Unreserved)", color: "#60a5fa" },
  EWS: { label: "Economically Weaker Section", percent: "10%", color: "#a78bfa" },
  BC_A: { label: "Backward Class - A", percent: "7%", color: "#34d399" },
  BC_B: { label: "Backward Class - B", percent: "10%", color: "#fbbf24" },
  BC_C: { label: "Backward Class - C", percent: "1%", color: "#f87171" },
  BC_D: { label: "Backward Class - D", percent: "7%", color: "#fb923c" },
  BC_E: { label: "Backward Class - E", percent: "4%", color: "#2dd4bf" },
  SC_1: { label: "Scheduled Caste Group 1", percent: "15%", color: "#c084fc" },
  SC_2: { label: "Scheduled Caste Group 2", percent: "15%", color: "#c084fc" },
  SC_3: { label: "Scheduled Caste Group 3", percent: "15%", color: "#c084fc" },
  SC: { label: "Scheduled Caste", percent: "15%", color: "#c084fc" },
  ST: { label: "Scheduled Tribe", percent: "10%", color: "#f472b6" }
};`;

const qualifyingStr = `const qualifyingCutoffs = {
  OC: 144, EWS: 144, BC_A: 113, BC_B: 113, BC_C: 113, BC_D: 113, BC_E: 113, SC_1: 113, SC_2: 113, SC_3: 113, SC: 113, ST: 113
};`;

// Replace in appContent using regex
appContent = appContent.replace(/const govtColleges = \[[\s\S]*?\n\];/, govtStr);
appContent = appContent.replace(/const pvtColleges = \[[\s\S]*?\n\];/, pvtStr);
appContent = appContent.replace(/const reservationData = \{[\s\S]*?\n\};/, reservationStr);
appContent = appContent.replace(/const qualifyingCutoffs = \{[\s\S]*?\n\};/, qualifyingStr);

fs.writeFileSync('app.js', appContent, 'utf8');
console.log("Updated app.js with official Round 3 cutoffs successfully!");
