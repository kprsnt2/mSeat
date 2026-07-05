// ============================================================
// TELANGANA MBBS MOCK COUNSELLING 2026 — Application Logic
// ============================================================

// --- NEET Score to All India Rank Interpolation Data (Based on NEET 2025) ---
const scoreRankData = [
  { score: 720, rank: 1 },
  { score: 686, rank: 1 },
  { score: 680, rank: 80 },
  { score: 670, rank: 350 },
  { score: 662, rank: 33 },
  { score: 660, rank: 700 },
  { score: 650, rank: 2500 },
  { score: 640, rank: 5500 },
  { score: 630, rank: 9000 },
  { score: 625, rank: 158 },
  { score: 620, rank: 15000 },
  { score: 610, rank: 22000 },
  { score: 607, rank: 1022 },
  { score: 600, rank: 1386 },
  { score: 590, rank: 40000 },
  { score: 582, rank: 3200 },
  { score: 580, rank: 50000 },
  { score: 570, rank: 62000 },
  { score: 563, rank: 7497 },
  { score: 560, rank: 75000 },
  { score: 550, rank: 90000 },
  { score: 543, rank: 15000 },
  { score: 540, rank: 105000 },
  { score: 530, rank: 118000 },
  { score: 520, rank: 31450 },
  { score: 510, rank: 38000 },
  { score: 500, rank: 45000 },
  { score: 490, rank: 52000 },
  { score: 480, rank: 60000 },
  { score: 470, rank: 70000 },
  { score: 460, rank: 82000 },
  { score: 450, rank: 95000 },
  { score: 440, rank: 108000 },
  { score: 430, rank: 122000 },
  { score: 420, rank: 138000 },
  { score: 410, rank: 158000 },
  { score: 400, rank: 180000 },
  { score: 390, rank: 205000 },
  { score: 380, rank: 232000 },
  { score: 370, rank: 262000 },
  { score: 360, rank: 295000 },
  { score: 350, rank: 335000 },
  { score: 340, rank: 375000 },
  { score: 330, rank: 415000 },
  { score: 320, rank: 460000 },
  { score: 310, rank: 505000 },
  { score: 300, rank: 550000 },
  { score: 250, rank: 750000 },
  { score: 200, rank: 930000 },
  { score: 144, rank: 1236000 }
];

// --- Category Multipliers for computing closing ranks from OC base ---
// Based on actual Gandhi MC & Osmania MC 2024-25 data
function getCategoryMultipliers(ocRank) {
  if (ocRank <= 25000) {
    return { OC: 1, EWS: 3.1, BC_A: 3.85, BC_B: 1.93, BC_C: 2.36, BC_D: 1.74, BC_E: 2.61, SC: 6.83, ST: 8.75 };
  } else if (ocRank <= 50000) {
    return { OC: 1, EWS: 2.5, BC_A: 3.2, BC_B: 1.6, BC_C: 1.85, BC_D: 1.5, BC_E: 2.0, SC: 4.8, ST: 5.8 };
  } else if (ocRank <= 80000) {
    return { OC: 1, EWS: 1.8, BC_A: 2.4, BC_B: 1.4, BC_C: 1.55, BC_D: 1.32, BC_E: 1.65, SC: 3.2, ST: 3.8 };
  } else {
    return { OC: 1, EWS: 1.45, BC_A: 1.85, BC_B: 1.28, BC_C: 1.38, BC_D: 1.22, BC_E: 1.45, SC: 2.3, ST: 2.8 };
  }
}

// --- Government Colleges Data (User's preference order) ---
const govtColleges = [
  { id: 1, name: "Gandhi Medical College", place: "Secunderabad", intake: 250, fee: 29000, ocClosing: 11299,
    knownRanks: { OC: 11299, EWS: 35065, BC_A: 43324, BC_B: 21775, BC_C: 26662, BC_D: 19633, BC_E: 29495, SC: 77168, ST: 98866 } },
  { id: 2, name: "Osmania Medical College", place: "Hyderabad", intake: 250, fee: 12000, ocClosing: 20237,
    knownRanks: { OC: 20237, EWS: 62000, BC_A: 80025, BC_B: 29353, BC_C: 32168, BC_D: 31960, BC_E: 31737, SC: 104515, ST: 111846 } },
  { id: 3, name: "ESIC Medical College", place: "Hyderabad", intake: 150, fee: 100000, ocClosing: 28000 },
  { id: 4, name: "Kakatiya Medical College", place: "Warangal", intake: 250, fee: 52000, ocClosing: 35000 },
  { id: 5, name: "Govt Medical College, Siddipet", place: "Siddipet", intake: 150, fee: 41000, ocClosing: 52000 },
  { id: 6, name: "Govt Medical College, Mahabubnagar", place: "Mahabubnagar", intake: 175, fee: 41000, ocClosing: 55000 },
  { id: 7, name: "Govt Medical College, Sangareddy", place: "Sangareddy", intake: 150, fee: 84000, ocClosing: 48000 },
  { id: 8, name: "Govt Medical College, Rajanna Sircilla", place: "Rajanna Sircilla", intake: 100, fee: 41000, ocClosing: 72000 },
  { id: 9, name: "Govt Medical College, Karimnagar", place: "Karimnagar", intake: 100, fee: 41000, ocClosing: 58000 },
  { id: 10, name: "Govt Medical College, Vikarabad", place: "Vikarabad", intake: 100, fee: 41000, ocClosing: 68000 },
  { id: 11, name: "Govt Medical College, Jangaon", place: "Jangaon", intake: 100, fee: 41000, ocClosing: 75000 },
  { id: 12, name: "Govt Medical College, Medak", place: "Medak", intake: 50, fee: 41000, ocClosing: 78000 },
  { id: 13, name: "Govt Medical College, Maheshwaram", place: "Maheshwaram", intake: 50, fee: 41000, ocClosing: 62000 },
  { id: 14, name: "Govt Medical College, Nalgonda", place: "Nalgonda", intake: 150, fee: 12000, ocClosing: 45000 },
  { id: 15, name: "Govt Medical College, Jagtial", place: "Jagtial", intake: 150, fee: 84000, ocClosing: 80000 },
  { id: 16, name: "Govt Medical College, Mahabubabad", place: "Mahabubabad", intake: 150, fee: 84000, ocClosing: 85000 },
  { id: 17, name: "Govt Medical College, Bhadradri Kothagudem", place: "Bhadradri Kothagudem", intake: 150, fee: 41000, ocClosing: 82000 },
  { id: 18, name: "Govt Medical College, Nagarkurnool", place: "Nagarkurnool", intake: 150, fee: 41000, ocClosing: 88000 },
  { id: 19, name: "RIMS Adilabad", place: "Adilabad", intake: 120, fee: 41000, ocClosing: 60000 },
  { id: 20, name: "Govt Medical College, Nizamabad", place: "Nizamabad", intake: 175, fee: 64000, ocClosing: 50000 },
  { id: 21, name: "Govt Medical College, Ramagundam", place: "Ramagundam", intake: 150, fee: 84000, ocClosing: 78000 },
  { id: 22, name: "Govt Medical College, Nirmal", place: "Nirmal", intake: 100, fee: 59200, ocClosing: 90000 },
  { id: 23, name: "Govt Medical College, Khammam", place: "Khammam", intake: 100, fee: 41000, ocClosing: 65000 },
  { id: 24, name: "Govt Medical College, Jayashankar Bhupalpally", place: "Jayashankar Bhupalpally", intake: 100, fee: 41000, ocClosing: 92000 },
  { id: 25, name: "Govt Medical College, Kamareddy", place: "Kamareddy", intake: 100, fee: 41000, ocClosing: 88000 },
  { id: 26, name: "Govt Medical College, K.B. Asifabad", place: "Kumuram Bheem Asifabad", intake: 100, fee: 41000, ocClosing: 98000 },
  { id: 27, name: "Govt Medical College, Narsampet", place: "Narsampet", intake: 50, fee: 64000, ocClosing: 95000 },
  { id: 28, name: "Govt Medical College, Jogulamba", place: "Jogulamba", intake: 50, fee: 41000, ocClosing: 100000 },
  { id: 29, name: "Govt Medical College, Mulugu", place: "Mulugu", intake: 50, fee: 64000, ocClosing: 102000 },
  { id: 30, name: "Govt Medical College, Narayanpet", place: "Narayanpet", intake: 50, fee: 41000, ocClosing: 105000 },
  { id: 31, name: "Govt Medical College, Yadadri Bhuvanagiri", place: "Yadadri Bhuvanagiri", intake: 50, fee: 64000, ocClosing: 72000 },
  { id: 32, name: "Govt Medical College, Quthbullapur", place: "Quthbullapur", intake: 50, fee: 76000, ocClosing: 55000 },
  { id: 33, name: "Govt Medical College, Kodangal", place: "Kodangal", intake: 50, fee: 76000, ocClosing: 108000 },
  { id: 34, name: "Govt Medical College, Suryapet", place: "Suryapet", intake: 150, fee: 29000, ocClosing: 48000 },
  { id: 35, name: "Govt Medical College, Mancherial", place: "Mancherial", intake: 100, fee: 64000, ocClosing: 85000 },
  { id: 36, name: "Govt Medical College, Wanaparthy", place: "Wanaparthy", intake: 100, fee: 64000, ocClosing: 90000 }
];

// --- Private Colleges Data (User's preference order, Cat-A fees shown) ---
const pvtColleges = [
  { id: 101, name: "Bhaskar Medical College", place: "Moinabad, Rangareddy", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 120000 },
  { id: 102, name: "Apollo Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000, ocClosing: 95000 },
  { id: 103, name: "Maheshwara Medical College", place: "Patancheru, Medak", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 130000 },
  { id: 104, name: "TRR Institute of Medical Sciences", place: "Inole, Patancheru", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 135000 },
  { id: 105, name: "MNR Medical College", place: "Sangareddy", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000, ocClosing: 110000 },
  { id: 106, name: "Neelima Institute of Medical Sciences", place: "Medchal", intake: 200, feeA: 60000, feeB: 1500000, feeC: 2250000, ocClosing: 140000 },
  { id: 107, name: "Arundathi Institute of Medical Sciences", place: "Dundigal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 145000 },
  { id: 108, name: "CMR Institute of Medical Sciences", place: "Kandalkoya, Medchal", intake: 250, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 125000 },
  { id: 109, name: "Dr Patnam Mahender Reddy IMS", place: "Chevella", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 148000 },
  { id: 110, name: "Medicity Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 132000 },
  { id: 111, name: "Nova Institute of Medical Sciences", place: "Hayathnagar", intake: 250, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 128000 },
  { id: 112, name: "Deccan College of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1250000, feeC: 2500000, ocClosing: 100000 },
  { id: 113, name: "Ayaan Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 138000 },
  { id: 114, name: "Dr VRK Women's Medical College", place: "Hyderabad", intake: 100, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 142000 },
  { id: 115, name: "Shadan Institute of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2400000, ocClosing: 115000 },
  { id: 116, name: "Mamata Academy of Medical Sciences", place: "Bachupally", intake: 150, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 135000 },
  { id: 117, name: "C Ananda Rao IMS", place: "Karimnagar", intake: 200, feeA: 60000, feeB: 1300000, feeC: 2600000, ocClosing: 130000 },
  { id: 118, name: "Prathima Institute of Medical Sciences", place: "Karimnagar", intake: 250, feeA: 60000, feeB: 1500000, feeC: 2250000, ocClosing: 108000 },
  { id: 119, name: "Kamineni Institute of Medical Sciences", place: "Narketpally", intake: 200, feeA: 60000, feeB: 1300000, feeC: 2600000, ocClosing: 105000 },
  { id: 120, name: "Mamata Medical College", place: "Khammam", intake: 200, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 125000 },
  { id: 121, name: "S.V.S. Medical College", place: "Mahabubnagar", intake: 150, feeA: 60000, feeB: 1250000, feeC: 2500000, ocClosing: 135000 },
  { id: 122, name: "Surabhi Institute of Medical Sciences", place: "Siddipet", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 140000 },
  { id: 123, name: "Kamineni Academy of Medical Sciences", place: "Hyderabad", intake: 150, feeA: 60000, feeB: 1300000, feeC: 2600000, ocClosing: 98000 },
  { id: 124, name: "Mahavir Institute of Medical Sciences", place: "Vikarabad", intake: 200, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 145000 },
  { id: 125, name: "Father Colombo IMS", place: "Warangal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2310000, ocClosing: 138000 },
  { id: 126, name: "Pratima Relief IMS", place: "Warangal", intake: 150, feeA: 60000, feeB: 1155000, feeC: 2300000, ocClosing: 142000 },
  { id: 127, name: "RVM Medical College", place: "Mulugu", intake: 250, feeA: 60000, feeB: 1200000, feeC: 2400000, ocClosing: 148000 }
];

// --- Reservation Percentages ---
const reservationData = {
  OC: { label: "Open Category (General)", percent: "~36% (Unreserved)", color: "#60a5fa" },
  EWS: { label: "Economically Weaker Section", percent: "10%", color: "#a78bfa" },
  BC_A: { label: "Backward Class - A", percent: "7%", color: "#34d399" },
  BC_B: { label: "Backward Class - B", percent: "10%", color: "#fbbf24" },
  BC_C: { label: "Backward Class - C", percent: "1%", color: "#f87171" },
  BC_D: { label: "Backward Class - D", percent: "7%", color: "#fb923c" },
  BC_E: { label: "Backward Class - E", percent: "4%", color: "#2dd4bf" },
  SC: { label: "Scheduled Caste", percent: "15%", color: "#c084fc" },
  ST: { label: "Scheduled Tribe", percent: "10%", color: "#f472b6" }
};

// --- NEET 2025 Qualifying Cutoffs ---
const qualifyingCutoffs = {
  OC: 144, EWS: 144, BC_A: 113, BC_B: 113, BC_C: 113, BC_D: 113, BC_E: 113, SC: 113, ST: 113
};

// ============================================================
// CORE LOGIC
// ============================================================

function estimateRank(score) {
  if (score >= 720) return 1;
  if (score <= 144) return 1236000;

  // Sort descending by score
  const data = [...scoreRankData].sort((a, b) => b.score - a.score);

  for (let i = 0; i < data.length - 1; i++) {
    if (score <= data[i].score && score >= data[i + 1].score) {
      const scoreDiff = data[i].score - data[i + 1].score;
      const rankDiff = data[i + 1].rank - data[i].rank;
      const ratio = (data[i].score - score) / scoreDiff;
      return Math.round(data[i].rank + ratio * rankDiff);
    }
  }
  return Math.round(1236000 * (720 - score) / (720 - 144));
}

function estimateStateRank(air) {
  // Telangana candidates ~4-5% of total NEET candidates
  return Math.max(1, Math.round(air * 0.045));
}

function estimateCategoryRank(air, category) {
  // Approximate category rank based on category population ratios
  const catRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.10,
    BC_C: 0.01, BC_D: 0.07, BC_E: 0.04, SC: 0.15, ST: 0.10
  };
  return Math.max(1, Math.round(air * (catRatios[category] || 0.35)));
}

function getClosingRank(college, category) {
  // Use known ranks if available (Gandhi MC, Osmania MC)
  if (college.knownRanks && college.knownRanks[category] !== undefined) {
    return college.knownRanks[category];
  }
  // Compute from OC closing rank using category multipliers
  const multipliers = getCategoryMultipliers(college.ocClosing);
  const multiplier = multipliers[category] || 1;
  return Math.round(college.ocClosing * multiplier);
}

function isEligible(rank, college, category) {
  const closing = getClosingRank(college, category);
  return rank <= closing;
}

function runAllocation(rank, category, preferences) {
  for (let i = 0; i < preferences.length; i++) {
    const college = preferences[i];
    if (isEligible(rank, college, category)) {
      return { allocated: true, college: college, preferenceNo: i + 1, closingRank: getClosingRank(college, category) };
    }
  }
  return { allocated: false, college: null, preferenceNo: -1 };
}

function scoreToPercentile(score) {
  // NEET 2025: ~22.09 lakh appeared, rank-based percentile
  const rank = estimateRank(score);
  const total = 2209000;
  return Math.max(0, Math.min(100, ((total - rank) / total * 100))).toFixed(2);
}

function formatRank(rank) {
  if (rank >= 100000) return (rank / 100000).toFixed(1) + 'L';
  if (rank >= 1000) return (rank / 1000).toFixed(1) + 'K';
  return rank.toString();
}

function formatFee(fee) {
  if (fee >= 100000) return '₹' + (fee / 100000).toFixed(1) + 'L';
  if (fee >= 1000) return '₹' + (fee / 1000).toFixed(0) + 'K';
  return '₹' + fee;
}

function formatFeeExact(fee) {
  return '₹' + fee.toLocaleString('en-IN');
}

// ============================================================
// APPLICATION STATE
// ============================================================

let currentStep = 1;
let studentProfile = {};
let estimatedAIR = 0;
let preferences = [];
let collegeFilter = 'all';
let searchQuery = '';
let difficultyOffset = 35; // Default: Very Tough (2026 PChem tough, Bio easy)

// ============================================================
// UI FUNCTIONS
// ============================================================

function init() {
  // Build the initial preference list combining govt and private
  preferences = [
    ...govtColleges.map(c => ({ ...c, type: 'govt' })),
    ...pvtColleges.map(c => ({ ...c, type: 'pvt' }))
  ];

  // Bind form submission
  const form = document.getElementById('profileForm');
  if (form) form.addEventListener('submit', handleProfileSubmit);

  // Bind filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.addEventListener('click', function () {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    collegeFilter = this.dataset.filter;
    renderCollegeList();
  }));

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', function () {
    searchQuery = this.value.toLowerCase();
    renderCollegeList();
  });

  // Score slider sync
  const scoreSlider = document.getElementById('scoreSlider');
  const scoreInput = document.getElementById('neetScore');
  if (scoreSlider && scoreInput) {
    scoreSlider.addEventListener('input', function () {
      scoreInput.value = this.value;
      updateScorePreview(this.value);
    });
    scoreInput.addEventListener('input', function () {
      scoreSlider.value = this.value;
      updateScorePreview(this.value);
    });
  }

  // Difficulty slider
  const diffSlider = document.getElementById('difficultySlider');
  if (diffSlider) {
    diffSlider.addEventListener('input', function () {
      difficultyOffset = parseInt(this.value);
      updateDifficultyLabel(difficultyOffset);
      // Re-render score preview with new difficulty
      const currentScore = document.getElementById('neetScore').value;
      if (currentScore) updateScorePreview(currentScore);
    });
  }

  // Animate elements on load
  animateOnScroll();
}

function updateDifficultyLabel(offset) {
  const el = document.getElementById('difficultyValue');
  if (!el) return;
  let label, badgeClass;
  if (offset <= 5) { label = 'Normal'; badgeClass = 'diff-normal'; }
  else if (offset <= 15) { label = 'Slightly Tough'; badgeClass = 'diff-slight'; }
  else if (offset <= 30) { label = 'Tough'; badgeClass = 'diff-tough'; }
  else { label = 'Very Tough'; badgeClass = 'diff-very-tough'; }
  
  el.innerHTML = `
    <span class="diff-badge ${badgeClass}">${label}</span>
    <span class="diff-detail">Your score treated as <strong>+${offset} marks</strong> higher for rank estimation</span>
  `;
}

function getAdjustedScore(score) {
  // In a tough exam, everyone scores lower, so your score is effectively worth more
  return Math.min(720, score + difficultyOffset);
}

function updateScorePreview(score) {
  const preview = document.getElementById('scorePreview');
  if (!preview) return;
  score = parseInt(score);
  if (isNaN(score) || score < 1 || score > 720) {
    preview.innerHTML = '';
    return;
  }
  const adjustedScore = getAdjustedScore(score);
  const rankNormal = estimateRank(score);
  const rankAdjusted = estimateRank(adjustedScore);
  const percentile = scoreToPercentile(adjustedScore);
  
  const improvement = rankNormal - rankAdjusted;
  const showDiff = difficultyOffset > 0;
  
  preview.innerHTML = `
    <div class="score-preview-content">
      ${showDiff ? `<span class="preview-adjusted">Adjusted: <strong>${adjustedScore}</strong> effective</span>` : ''}
      <span class="preview-rank">Est. Rank: <strong>${rankAdjusted.toLocaleString('en-IN')}</strong></span>
      <span class="preview-percentile">Percentile: <strong>${percentile}%</strong></span>
      ${showDiff && improvement > 0 ? `<span class="preview-boost">↑ ${improvement.toLocaleString('en-IN')} ranks better</span>` : ''}
    </div>
  `;
}

function handleProfileSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim() || 'Student';
  const score = parseInt(document.getElementById('neetScore').value);
  const category = document.getElementById('categorySelect').value;
  const gender = document.getElementById('genderSelect').value;
  const localStatus = document.getElementById('localSelect').value;
  const pwd = document.getElementById('pwdCheckbox').checked;

  // Validation
  if (isNaN(score) || score < 1 || score > 720) { showToast('Please enter a valid NEET score (1-720)', 'error'); return; }

  const cutoff = qualifyingCutoffs[category] || 144;
  if (score < cutoff) {
    showToast(`Score ${score} is below qualifying cutoff (${cutoff}) for ${reservationData[category].label}`, 'error');
    return;
  }

  const adjustedScore = getAdjustedScore(score);
  studentProfile = { name, score, adjustedScore, category, gender, localStatus, pwd, difficultyOffset };
  estimatedAIR = estimateRank(adjustedScore);

  renderRankResults();
  goToStep(2);
}

function renderRankResults() {
  const { name, score, adjustedScore, category, gender } = studentProfile;
  const air = estimatedAIR;
  const stateRank = estimateStateRank(air);
  const catRank = estimateCategoryRank(air, category);
  const percentile = scoreToPercentile(adjustedScore);

  // Update student info header
  document.getElementById('resultStudentName').textContent = name;
  document.getElementById('resultScore').textContent = score + ' / 720';
  document.getElementById('resultCategory').textContent = reservationData[category].label;
  document.getElementById('resultGender').textContent = gender === 'female' ? '♀ Female' : '♂ Male';

  // Update rank cards
  document.getElementById('airValue').textContent = air.toLocaleString('en-IN');
  document.getElementById('stateRankValue').textContent = stateRank.toLocaleString('en-IN');
  document.getElementById('catRankValue').textContent = catRank.toLocaleString('en-IN');
  document.getElementById('percentileValue').textContent = percentile + '%';

  // Count eligible colleges
  let govtEligible = 0, pvtEligible = 0;
  govtColleges.forEach(c => { if (isEligible(air, c, category)) govtEligible++; });
  pvtColleges.forEach(c => { if (isEligible(air, c, category)) pvtEligible++; });

  document.getElementById('govtEligibleCount').textContent = govtEligible;
  document.getElementById('pvtEligibleCount').textContent = pvtEligible;
  document.getElementById('totalEligibleCount').textContent = govtEligible + pvtEligible;

  // Render eligibility chart
  renderEligibilityBar(govtEligible, pvtEligible);
}

function renderEligibilityBar(govtCount, pvtCount) {
  const totalGovt = govtColleges.length;
  const totalPvt = pvtColleges.length;
  const govtBar = document.getElementById('govtEligibilityBar');
  const pvtBar = document.getElementById('pvtEligibilityBar');

  if (govtBar) govtBar.style.width = ((govtCount / totalGovt) * 100) + '%';
  if (pvtBar) pvtBar.style.width = ((pvtCount / totalPvt) * 100) + '%';
}

function goToStep(step) {
  // Hide all steps
  document.querySelectorAll('.step-content').forEach(el => {
    el.classList.remove('active');
    el.style.display = 'none';
  });

  // Show target step
  const targetStep = document.getElementById('step' + step);
  if (targetStep) {
    targetStep.style.display = 'block';
    setTimeout(() => targetStep.classList.add('active'), 50);
  }

  // Update step indicators
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 < step) dot.classList.add('completed');
    if (i + 1 === step) dot.classList.add('active');
  });

  // Update step connectors
  document.querySelectorAll('.step-connector').forEach((conn, i) => {
    conn.classList.toggle('completed', i + 1 < step);
  });

  currentStep = step;

  // Render college list when going to step 3
  if (step === 3) {
    renderCollegeList();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCollegeList() {
  const container = document.getElementById('collegeList');
  if (!container) return;

  const { category } = studentProfile;
  const air = estimatedAIR;

  let filtered = [...preferences];

  // Apply type filter
  if (collegeFilter === 'govt') filtered = filtered.filter(c => c.type === 'govt');
  if (collegeFilter === 'pvt') filtered = filtered.filter(c => c.type === 'pvt');

  // Apply search
  if (searchQuery) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.place.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>No colleges match your search criteria</p></div>';
    return;
  }

  container.innerHTML = filtered.map((college, idx) => {
    const closingRank = getClosingRank(college, category);
    const eligible = air <= closingRank;
    const prefIndex = preferences.indexOf(college);
    const isGovt = college.type === 'govt';
    const fee = isGovt ? college.fee : college.feeA;

    return `
      <div class="college-card ${eligible ? 'eligible' : 'not-eligible'}" data-id="${college.id}">
        <div class="college-rank-badge">#${prefIndex + 1}</div>
        <div class="college-info">
          <div class="college-header">
            <h3 class="college-name">${college.name}</h3>
            <span class="college-type-badge ${isGovt ? 'govt-badge' : 'pvt-badge'}">${isGovt ? 'GOVT' : 'PVT'}</span>
          </div>
          <div class="college-details">
            <span class="college-detail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${college.place}</span>
            <span class="college-detail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> ${college.intake} seats</span>
            <span class="college-detail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> ${formatFeeExact(fee)}/yr</span>
          </div>
          <div class="college-ranks">
            <div class="rank-item">
              <span class="rank-label">Your Rank</span>
              <span class="rank-value ${eligible ? 'rank-safe' : 'rank-danger'}">${air.toLocaleString('en-IN')}</span>
            </div>
            <div class="rank-vs">${eligible ? '≤' : '>'}</div>
            <div class="rank-item">
              <span class="rank-label">Closing (${category.replace('_', '-')})</span>
              <span class="rank-value">${closingRank.toLocaleString('en-IN')}</span>
            </div>
            <div class="eligibility-tag ${eligible ? 'tag-eligible' : 'tag-not-eligible'}">
              ${eligible ? '✓ Eligible' : '✗ Not Eligible'}
            </div>
          </div>
        </div>
        <div class="college-actions">
          <button class="move-btn" onclick="movePreference(${prefIndex}, -1)" title="Move Up" ${prefIndex === 0 ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="move-btn" onclick="movePreference(${prefIndex}, 1)" title="Move Down" ${prefIndex === preferences.length - 1 ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function movePreference(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= preferences.length) return;
  [preferences[index], preferences[newIndex]] = [preferences[newIndex], preferences[index]];
  renderCollegeList();
}

function showAllocationResult() {
  const { category, name, score } = studentProfile;
  const air = estimatedAIR;
  const result = runAllocation(air, category, preferences);

  const container = document.getElementById('allocationResult');
  const notAllocatedEl = document.getElementById('notAllocated');
  const allocatedEl = document.getElementById('allocatedSection');

  if (result.allocated) {
    const college = result.college;
    const isGovt = college.type === 'govt';
    const fee = isGovt ? college.fee : college.feeA;

    document.getElementById('allocCollegeName').textContent = college.name;
    document.getElementById('allocCollegePlace').textContent = college.place;
    document.getElementById('allocCollegeType').textContent = isGovt ? 'Government' : 'Private (Cat-A)';
    document.getElementById('allocCollegeFee').textContent = formatFeeExact(fee) + '/year';
    document.getElementById('allocCollegeIntake').textContent = college.intake + ' seats';
    document.getElementById('allocPrefNo').textContent = '#' + result.preferenceNo;
    document.getElementById('allocClosingRank').textContent = result.closingRank.toLocaleString('en-IN');
    document.getElementById('allocCategory').textContent = reservationData[category].label;
    document.getElementById('allocStudentName').textContent = name;
    document.getElementById('allocStudentScore').textContent = score + ' / 720';
    document.getElementById('allocStudentRank').textContent = air.toLocaleString('en-IN');

    // Calculate margin
    const margin = result.closingRank - air;
    document.getElementById('allocMargin').textContent = margin.toLocaleString('en-IN') + ' ranks';
    document.getElementById('allocMargin').className = margin > 5000 ? 'margin-safe' : margin > 1000 ? 'margin-moderate' : 'margin-tight';

    allocatedEl.style.display = 'block';
    notAllocatedEl.style.display = 'none';

    // Render alternative options (next 5 eligible colleges after allocated one)
    renderAlternatives(result.preferenceNo, air, category);

  } else {
    allocatedEl.style.display = 'none';
    notAllocatedEl.style.display = 'block';
    document.getElementById('notAllocatedScore').textContent = score;
    document.getElementById('notAllocatedRank').textContent = air.toLocaleString('en-IN');
  }

  goToStep(4);
}

function renderAlternatives(allocatedPrefIndex, air, category) {
  const container = document.getElementById('alternativesList');
  if (!container) return;

  let alternatives = [];
  for (let i = allocatedPrefIndex; i < preferences.length && alternatives.length < 5; i++) {
    const college = preferences[i];
    if (isEligible(air, college, category)) {
      const closingRank = getClosingRank(college, category);
      const isGovt = college.type === 'govt';
      const fee = isGovt ? college.fee : college.feeA;
      alternatives.push({ ...college, closingRank, fee, prefNo: i + 1 });
    }
  }

  if (alternatives.length === 0) {
    container.innerHTML = '<p class="no-alternatives">No other eligible colleges in your preference list.</p>';
    return;
  }

  container.innerHTML = alternatives.map(c => `
    <div class="alt-college-card">
      <div class="alt-pref">#${c.prefNo}</div>
      <div class="alt-info">
        <strong>${c.name}</strong>
        <span>${c.place} · ${c.type === 'govt' ? 'Govt' : 'Private'} · ${formatFeeExact(c.fee)}/yr</span>
      </div>
      <div class="alt-rank">Closing: ${c.closingRank.toLocaleString('en-IN')}</div>
    </div>
  `).join('');
}

function resetApp() {
  studentProfile = {};
  estimatedAIR = 0;
  currentStep = 1;
  collegeFilter = 'all';
  searchQuery = '';

  // Reset preferences to original order
  preferences = [
    ...govtColleges.map(c => ({ ...c, type: 'govt' })),
    ...pvtColleges.map(c => ({ ...c, type: 'pvt' }))
  ];

  // Reset form
  const form = document.getElementById('profileForm');
  if (form) form.reset();

  const preview = document.getElementById('scorePreview');
  if (preview) preview.innerHTML = '';

  goToStep(1);
}

// --- Toast Notification ---
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</div>
    <div class="toast-message">${message}</div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Scroll Animations ---
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// --- Quota Info Modal ---
function showQuotaInfo() {
  const modal = document.getElementById('quotaModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuotaInfo() {
  const modal = document.getElementById('quotaModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// --- Toggle Name Field ---
function toggleNameField() {
  const input = document.getElementById('studentName');
  const toggle = document.querySelector('.optional-toggle .toggle-text');
  if (input.classList.contains('name-input-hidden')) {
    input.classList.remove('name-input-hidden');
    input.classList.add('name-input-visible');
    toggle.textContent = '− Hide Name';
    input.focus();
  } else {
    input.classList.add('name-input-hidden');
    input.classList.remove('name-input-visible');
    toggle.textContent = '+ Add Student Name';
    input.value = '';
  }
}

// --- Initialize on DOM ready ---
document.addEventListener('DOMContentLoaded', init);
