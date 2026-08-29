const fs = require('fs');

const text = fs.readFileSync('cutoff_layout.txt', 'utf8');

// Let's print out all lines of cutoff_layout.txt to see the structure
const lines = text.split('\n');

console.log("Total lines:", lines.length);

for (let i = 0; i < Math.min(100, lines.length); i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
