const fs = require('fs');
const path = require('path');
const records = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'all_india_provisional_result.json'), 'utf8'));

const allInsts = [...new Set(records.map(r => r.allottedInstitute))];

// Look for any institute that might be in Andhra Pradesh or Telangana but wasn't caught
const apTgWords = ['andhra', 'pradesh', 'telangana', 'hyderabad', 'amaravati', 'kurnool', 'kadapa', 'chittoor', 'tirupati', 'nellore', 'prakasam', 'ongole', 'guntur', 'krishna', 'machilipatnam', 'vijayawada', 'west godavari', 'eluru', 'east godavari', 'kakinada', 'rajahmundry', 'rajamahendravaram', 'visakhapatnam', 'vizianagaram', 'srikakulam', 'anantapur', 'nandyal', 'bapatla', 'palnadu', 'konaseema', 'eluru', 'ntr', 'anakapalli', 'kakinada', 'alluri', 'sitharama', 'manyam', 'parvathipuram', 'sri sathya sai', 'annamayya', 'tirupati', 'ysr', 'kadapa'];

for (let inst of allInsts) {
  const lower = inst.toLowerCase();
  for (let w of apTgWords) {
    if (lower.includes(w)) {
      console.log(`Matched '${w}': ${inst}`);
      break;
    }
  }
}
