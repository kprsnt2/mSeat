// ============================================================
// MASTER COLLEGE EXPLORER DATA & FUNCTIONS
// ============================================================

const masterCollegesData = [
  {
    "rank": 1,
    "code": "OMCH",
    "name": "Osmania Medical College",
    "place": "Koti, Hyderabad",
    "type": "Government",
    "distKm": 13,
    "est": 1954,
    "pg": "Yes (All)",
    "rating": "4.6 ★",
    "notes": "13 km from Rajendranagar · SC-2 Seats: 18 (12 Gen + 6 Fem)"
  },
  {
    "rank": 2,
    "code": "GAND",
    "name": "Gandhi Medical College",
    "place": "Musheerabad, Secunderabad",
    "type": "Government",
    "distKm": 19,
    "est": 1954,
    "pg": "Yes (All)",
    "rating": "4.6 ★",
    "notes": "19 km from Rajendranagar · SC-2 Seats: 19 (13 Gen + 6 Fem)"
  },
  {
    "rank": 3,
    "code": "ESIM",
    "name": "ESIC Medical College",
    "place": "Sanathnagar, Hyderabad",
    "type": "Government",
    "distKm": 20,
    "est": 1954,
    "pg": "Yes (All)",
    "rating": "4.6 ★",
    "notes": "20 km from Rajendranagar · SC-2 Seats: 6 (4 Gen + 2 Fem)"
  },
  {
    "rank": 4,
    "code": "GMHR",
    "name": "Govt. Medical College, Maheshwaram",
    "place": "Maheshwaram, Rangareddy",
    "type": "Government",
    "distKm": 32,
    "est": 2024,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "32 km from Rajendranagar · SC-2 Seats: 3 (2 Gen + 1 Fem)"
  },
  {
    "rank": 5,
    "code": "GQTB",
    "name": "Govt. Medical College, Quthbullapur",
    "place": "Quthbullapur, Medchal",
    "type": "Government",
    "distKm": 34,
    "est": 2024,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "34 km from Rajendranagar · SC-2 Seats: 3 (2 Gen + 1 Fem)"
  },
  {
    "rank": 6,
    "code": "GSGR",
    "name": "Govt. Medical College, Sangareddy",
    "place": "Sangareddy",
    "type": "Government",
    "distKm": 55,
    "est": 2024,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "55 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 7,
    "code": "GVKB",
    "name": "Govt. Medical College, Vikarabad",
    "place": "Vikarabad",
    "type": "Government",
    "distKm": 60,
    "est": 2024,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "60 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 8,
    "code": "GYDT",
    "name": "Govt. Medical College, Yadadri",
    "place": "Yadadri Bhuvanagiri",
    "type": "Government",
    "distKm": 68,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "68 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 9,
    "code": "SGMC",
    "name": "Govt. Medical College, Siddipet",
    "place": "Siddipet",
    "type": "Government",
    "distKm": 85,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "85 km from Rajendranagar · SC-2 Seats: 14 (10 Gen + 4 Fem)"
  },
  {
    "rank": 10,
    "code": "GMCM",
    "name": "Govt. Medical College, Mahabubnagar",
    "place": "Mahabubnagar",
    "type": "Government",
    "distKm": 88,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "88 km from Rajendranagar · SC-2 Seats: 14 (9 Gen + 5 Fem)"
  },
  {
    "rank": 11,
    "code": "GMDK",
    "name": "Govt. Medical College, Medak",
    "place": "Medak",
    "type": "Government",
    "distKm": 90,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "90 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 12,
    "code": "GJGN",
    "name": "Govt. Medical College, Jangaon",
    "place": "Jangaon",
    "type": "Government",
    "distKm": 95,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "95 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 13,
    "code": "GMNL",
    "name": "Govt. Medical College, Nalgonda",
    "place": "Nalgonda",
    "type": "Government",
    "distKm": 105,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "105 km from Rajendranagar · SC-2 Seats: 10 (6 Gen + 4 Fem)"
  },
  {
    "rank": 14,
    "code": "GKDL",
    "name": "Govt. Medical College, Kodangal",
    "place": "Kodangal, Vikarabad Dist",
    "type": "Government",
    "distKm": 110,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "110 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 15,
    "code": "GKMR",
    "name": "Govt. Medical College, Kamareddy",
    "place": "Kamareddy",
    "type": "Government",
    "distKm": 120,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "120 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 16,
    "code": "GNRN",
    "name": "Govt. Medical College, Narayanpet",
    "place": "Narayanpet",
    "type": "Government",
    "distKm": 125,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "125 km from Rajendranagar · SC-2 Seats: 3 (3 Gen + 3 Fem)"
  },
  {
    "rank": 17,
    "code": "GWNP",
    "name": "Govt. Medical College, Wanaparthy",
    "place": "Wanaparthy",
    "type": "Government",
    "distKm": 128,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "128 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 18,
    "code": "GNGK",
    "name": "Govt. Medical College, Nagarkurnool",
    "place": "Nagarkurnool",
    "type": "Government",
    "distKm": 130,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "130 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 19,
    "code": "GMSR",
    "name": "Govt. Medical College, Suryapet",
    "place": "Suryapet",
    "type": "Government",
    "distKm": 130,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "130 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 20,
    "code": "GSRC",
    "name": "Govt. Medical College, Rajanna Sircilla",
    "place": "Sircilla",
    "type": "Government",
    "distKm": 140,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "140 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 21,
    "code": "KKTI",
    "name": "Kakatiya Medical College",
    "place": "Warangal",
    "type": "Government",
    "distKm": 145,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "145 km from Rajendranagar · SC-2 Seats: 18 (12 Gen + 6 Fem)"
  },
  {
    "rank": 22,
    "code": "GGWL",
    "name": "Govt. Medical College, Jogulamba Gadwal",
    "place": "Gadwal",
    "type": "Government",
    "distKm": 150,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "150 km from Rajendranagar · SC-2 Seats: 2 (1 Gen + 1 Fem)"
  },
  {
    "rank": 23,
    "code": "GVNZ",
    "name": "Govt. Medical College, Nizamabad",
    "place": "Nizamabad",
    "type": "Government",
    "distKm": 150,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "150 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 24,
    "code": "GKRM",
    "name": "Govt. Medical College, Karimnagar",
    "place": "Karimnagar",
    "type": "Government",
    "distKm": 165,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "165 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 25,
    "code": "GNRS",
    "name": "Govt. Medical College, Narsampet",
    "place": "Warangal Dist",
    "type": "Government",
    "distKm": 170,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "170 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 26,
    "code": "GMHB",
    "name": "Govt. Medical College, Mahabubabad",
    "place": "Mahabubabad",
    "type": "Government",
    "distKm": 180,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "180 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 27,
    "code": "GJTL",
    "name": "Govt. Medical College, Jagitial",
    "place": "Jagitial",
    "type": "Government",
    "distKm": 190,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "190 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 28,
    "code": "GKHM",
    "name": "Govt. Medical College, Khammam",
    "place": "Khammam",
    "type": "Government",
    "distKm": 195,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "195 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 29,
    "code": "GJBP",
    "name": "Govt. Medical College, Bhupalpally",
    "place": "Jayashankar Bhupalpally",
    "type": "Government",
    "distKm": 205,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "205 km from Rajendranagar · SC-2 Seats: 7 (5 Gen + 2 Fem)"
  },
  {
    "rank": 30,
    "code": "GMUL",
    "name": "Govt. Medical College, Mulugu",
    "place": "Mulugu",
    "type": "Government",
    "distKm": 215,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "215 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 31,
    "code": "SIMS",
    "name": "Govt. Medical College, Ramagundam (SIMS)",
    "place": "Peddapalli Dist",
    "type": "Government",
    "distKm": 225,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "225 km from Rajendranagar · SC-2 Seats: 10 (6 Gen + 4 Fem)"
  },
  {
    "rank": 32,
    "code": "GNRM",
    "name": "Govt. Medical College, Nirmal",
    "place": "Nirmal",
    "type": "Government",
    "distKm": 220,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "220 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 33,
    "code": "GMCL",
    "name": "Govt. Medical College, Mancherial",
    "place": "Mancherial",
    "type": "Government",
    "distKm": 240,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "240 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 34,
    "code": "GMBK",
    "name": "Govt. Medical College, Kothagudem",
    "place": "Bhadradri Kothagudem",
    "type": "Government",
    "distKm": 245,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "245 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 35,
    "code": "RADL",
    "name": "Rajiv Gandhi Inst. of Med. Sci. (RIMS)",
    "place": "Adilabad",
    "type": "Government",
    "distKm": 300,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "300 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 36,
    "code": "GASF",
    "name": "Govt. Medical College, Asifabad",
    "place": "Kumuram Bheem Asifabad",
    "type": "Government",
    "distKm": 315,
    "est": 2018,
    "pg": "Developing",
    "rating": "4.1 ★",
    "notes": "315 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 37,
    "code": "APLO",
    "name": "Apollo Institute of Medical Sciences",
    "place": "Jubilee Hills, Hyderabad",
    "type": "Private (Cat-A)",
    "distKm": 18,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.4 ★",
    "notes": "18 km from Rajendranagar · SC-2 Seats: 6 (4 Gen + 2 Fem)"
  },
  {
    "rank": 38,
    "code": "KMHD",
    "name": "Kamineni Academy of Medical Sciences",
    "place": "LB Nagar, Hyderabad",
    "type": "Private (Cat-A)",
    "distKm": 21,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.4 ★",
    "notes": "21 km from Rajendranagar · SC-2 Seats: 5 (4 Gen + 1 Fem)"
  },
  {
    "rank": 39,
    "code": "BASK",
    "name": "Bhaskar Medical College",
    "place": "Yenkapally, Moinabad",
    "type": "Private (Cat-A)",
    "distKm": 18,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.4 ★",
    "notes": "18 km from Rajendranagar · SC-2 Seats: 9 (6 Gen + 3 Fem)"
  },
  {
    "rank": 40,
    "code": "DPMR",
    "name": "Dr. Patnam Mahender Reddy Inst. of Med. Sci.",
    "place": "Chevella, Rangareddy",
    "type": "Private (Cat-A)",
    "distKm": 32,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.4 ★",
    "notes": "32 km from Rajendranagar · SC-2 Seats: 12 (8 Gen + 4 Fem)"
  },
  {
    "rank": 41,
    "code": "NOVA",
    "name": "NOVA Institute of Medical Sciences",
    "place": "Hayathnagar, Hyderabad",
    "type": "Private (Cat-A)",
    "distKm": 32,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.4 ★",
    "notes": "32 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 42,
    "code": "MAMS",
    "name": "Mamata Academy of Medical Sciences",
    "place": "Bachupally, Hyderabad",
    "type": "Private (Cat-A)",
    "distKm": 36,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "36 km from Rajendranagar · SC-2 Seats: 9 (6 Gen + 3 Fem)"
  },
  {
    "rank": 43,
    "code": "AIMD",
    "name": "Arundathi Institute of Medical Sciences",
    "place": "Dundigal, Medchal",
    "type": "Private (Cat-A)",
    "distKm": 39,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "39 km from Rajendranagar · SC-2 Seats: 5 (3 Gen + 2 Fem)"
  },
  {
    "rank": 44,
    "code": "MAHE",
    "name": "Maheshwara Medical College & Hospital",
    "place": "Isnapur, Patancheru",
    "type": "Private (Cat-A)",
    "distKm": 42,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "42 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 45,
    "code": "TRRM",
    "name": "TRR Institute of Medical Sciences",
    "place": "Inole, Patancheru",
    "type": "Private (Cat-A)",
    "distKm": 42,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "42 km from Rajendranagar · SC-2 Seats: 7 (5 Gen + 2 Fem)"
  },
  {
    "rank": 46,
    "code": "CMRM",
    "name": "CMR Institute of Medical Sciences",
    "place": "Kandlakoya, Medchal",
    "type": "Private (Cat-A)",
    "distKm": 43,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "43 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 47,
    "code": "MEDI",
    "name": "Mediciti Institute of Medical Sciences",
    "place": "Ghanpur, Medchal",
    "type": "Private (Cat-A)",
    "distKm": 48,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "48 km from Rajendranagar · SC-2 Seats: 4 (3 Gen + 1 Fem)"
  },
  {
    "rank": 48,
    "code": "MNRS",
    "name": "MNR Medical College & Hospital",
    "place": "Fasalwadi, Sangareddy",
    "type": "Private (Cat-A)",
    "distKm": 55,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "55 km from Rajendranagar · SC-2 Seats: 10 (7 Gen + 3 Fem)"
  },
  {
    "rank": 49,
    "code": "MHVR",
    "name": "Mahavir Institute of Medical Sciences",
    "place": "Vikarabad",
    "type": "Private (Cat-A)",
    "distKm": 58,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "58 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 50,
    "code": "RVMC",
    "name": "RVM Institute of Medical Sciences",
    "place": "Laxmakkapally, Siddipet",
    "type": "Private (Cat-A)",
    "distKm": 75,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "75 km from Rajendranagar · SC-2 Seats: 11 (8 Gen + 3 Fem)"
  },
  {
    "rank": 51,
    "code": "SURB",
    "name": "Surabhi Institute of Medical Sciences",
    "place": "Mittapally, Siddipet",
    "type": "Private (Cat-A)",
    "distKm": 85,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "85 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 52,
    "code": "SVSM",
    "name": "SVS Medical College",
    "place": "Mahabubnagar",
    "type": "Private (Cat-A)",
    "distKm": 88,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "88 km from Rajendranagar · SC-2 Seats: 9 (6 Gen + 3 Fem)"
  },
  {
    "rank": 53,
    "code": "KMNI",
    "name": "Kamineni Institute of Medical Sciences",
    "place": "Narketpally, Nalgonda",
    "type": "Private (Cat-A)",
    "distKm": 88,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "88 km from Rajendranagar · SC-2 Seats: 8 (5 Gen + 3 Fem)"
  },
  {
    "rank": 54,
    "code": "RAJE",
    "name": "Raja Rajeshwari Medical College for Women",
    "place": "Mahabubnagar",
    "type": "Private (Women Cat-A)",
    "distKm": 92,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "92 km from Rajendranagar · SC-2 Seats: 5 (6 Gen + 5 Fem)"
  },
  {
    "rank": 55,
    "code": "PRIW",
    "name": "Prathima Relief Institute of Med. Sci.",
    "place": "Hanamkonda, Warangal",
    "type": "Private (Cat-A)",
    "distKm": 145,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "145 km from Rajendranagar · SC-2 Seats: 6 (4 Gen + 2 Fem)"
  },
  {
    "rank": 56,
    "code": "FCIM",
    "name": "Father Colombo Institute of Med. Sci.",
    "place": "Warangal",
    "type": "Private (Cat-A)",
    "distKm": 148,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "148 km from Rajendranagar · SC-2 Seats: 4 (2 Gen + 2 Fem)"
  },
  {
    "rank": 57,
    "code": "PRTM",
    "name": "Prathima Institute of Medical Sciences",
    "place": "Karimnagar",
    "type": "Private (Cat-A)",
    "distKm": 165,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "165 km from Rajendranagar · SC-2 Seats: 11 (7 Gen + 4 Fem)"
  },
  {
    "rank": 58,
    "code": "CARK",
    "name": "Chalmeda Anand Rao Inst. of Med. Sci.",
    "place": "Karimnagar",
    "type": "Private (Cat-A)",
    "distKm": 168,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "168 km from Rajendranagar · SC-2 Seats: 9 (6 Gen + 3 Fem)"
  },
  {
    "rank": 59,
    "code": "MMTA",
    "name": "Mamata Medical College",
    "place": "Khammam",
    "type": "Private (Cat-A)",
    "distKm": 195,
    "est": 2012,
    "pg": "Yes",
    "rating": "4.0 ★",
    "notes": "195 km from Rajendranagar · SC-2 Seats: 9 (6 Gen + 3 Fem)"
  }
];

let masterTableFilter = 'all';

function pauseBgAnimations() {
  document.querySelectorAll('.bg-glow').forEach(el => el.style.animationPlayState = 'paused');
}
function resumeBgAnimations() {
  document.querySelectorAll('.bg-glow').forEach(el => el.style.animationPlayState = '');
}

function showMasterTableModal() {
  const modal = document.getElementById('masterTableModal');
  if (modal) {
    pauseBgAnimations();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    renderMasterTable();
  }
}

function closeMasterTableModal() {
  const modal = document.getElementById('masterTableModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    resumeBgAnimations();
  }
}

function filterMasterTable(filterType, btnEl) {
  masterTableFilter = filterType;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderMasterTable();
}

function renderMasterTable() {
  const tbody = document.getElementById('masterTableBody');
  const searchVal = (document.getElementById('masterSearchInput')?.value || '').toLowerCase();
  if (!tbody) return;

  let list = [...masterCollegesData];

  // Filter type
  if (masterTableFilter === 'govt') list = list.filter(c => c.type.includes('Government'));
  if (masterTableFilter === 'pvt') list = list.filter(c => c.type.includes('Private'));

  // Search
  if (searchVal) {
    list = list.filter(c => 
      c.name.toLowerCase().includes(searchVal) || 
      c.place.toLowerCase().includes(searchVal) ||
      c.notes.toLowerCase().includes(searchVal)
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 20px;">No colleges found matching search</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(c => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
      <td style="font-weight: 700; color: #fbbf24;">#${c.rank}</td>
      <td style="font-weight: 600; color: #fff;">${c.name}</td>
      <td><span class="college-type-badge ${c.type.includes('Government') ? 'govt-badge' : 'pvt-badge'}">${c.type}</span></td>
      <td>${c.place}</td>
      <td style="text-align: center;">${c.est}</td>
      <td style="text-align: center;"><span style="color: ${c.pg.startsWith('Yes') ? '#34d399' : '#f87171'}; font-weight: 600;">${c.pg}</span></td>
      <td style="color: #fbbf24; font-weight: 600;">${c.rating}</td>
      <td style="font-size: 0.8rem; color: rgba(255,255,255,0.85);">${c.notes}</td>
    </tr>
  `).join('');
}

function copyMasterTableList() {
  const text = masterCollegesData.map(c => `${c.rank}. ${c.name}, ${c.place} (${c.type}) — Est: ${c.est} | PG: ${c.pg}`).join('\n');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Complete Web Options List copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy list', 'error');
    });
  }
}

// --- NEET Score to All India Rank Interpolation Data (Based on NEET 2025) ---
const scoreRankData = [
  {
    "score": 693,
    "rank": 83,
    "stateSno": 1
  },
  {
    "score": 690,
    "rank": 123,
    "stateSno": 2
  },
  {
    "score": 686,
    "rank": 158,
    "stateSno": 3
  },
  {
    "score": 667,
    "rank": 621,
    "stateSno": 4
  },
  {
    "score": 666,
    "rank": 639,
    "stateSno": 5
  },
  {
    "score": 665,
    "rank": 729,
    "stateSno": 7
  },
  {
    "score": 660,
    "rank": 873,
    "stateSno": 8
  },
  {
    "score": 659,
    "rank": 941,
    "stateSno": 9
  },
  {
    "score": 658,
    "rank": 967,
    "stateSno": 11
  },
  {
    "score": 657,
    "rank": 1008,
    "stateSno": 12
  },
  {
    "score": 656,
    "rank": 1069,
    "stateSno": 14
  },
  {
    "score": 655,
    "rank": 1154,
    "stateSno": 16
  },
  {
    "score": 653,
    "rank": 1253,
    "stateSno": 18
  },
  {
    "score": 652,
    "rank": 1324,
    "stateSno": 20
  },
  {
    "score": 651,
    "rank": 1340,
    "stateSno": 22
  },
  {
    "score": 649,
    "rank": 1502,
    "stateSno": 24
  },
  {
    "score": 648,
    "rank": 1598,
    "stateSno": 26
  },
  {
    "score": 647,
    "rank": 1669,
    "stateSno": 27
  },
  {
    "score": 646,
    "rank": 1686,
    "stateSno": 28
  },
  {
    "score": 645,
    "rank": 1861,
    "stateSno": 29
  },
  {
    "score": 643,
    "rank": 1976,
    "stateSno": 31
  },
  {
    "score": 641,
    "rank": 2122,
    "stateSno": 33
  },
  {
    "score": 640,
    "rank": 2298,
    "stateSno": 36
  },
  {
    "score": 639,
    "rank": 2403,
    "stateSno": 39
  },
  {
    "score": 637,
    "rank": 2591,
    "stateSno": 41
  },
  {
    "score": 636,
    "rank": 2770,
    "stateSno": 44
  },
  {
    "score": 635,
    "rank": 2805,
    "stateSno": 47
  },
  {
    "score": 634,
    "rank": 2976,
    "stateSno": 49
  },
  {
    "score": 633,
    "rank": 3128,
    "stateSno": 53
  },
  {
    "score": 632,
    "rank": 3279,
    "stateSno": 57
  },
  {
    "score": 631,
    "rank": 3371,
    "stateSno": 58
  },
  {
    "score": 630,
    "rank": 3512,
    "stateSno": 61
  },
  {
    "score": 629,
    "rank": 3619,
    "stateSno": 65
  },
  {
    "score": 628,
    "rank": 3784,
    "stateSno": 69
  },
  {
    "score": 627,
    "rank": 3852,
    "stateSno": 71
  },
  {
    "score": 625,
    "rank": 4191,
    "stateSno": 74
  },
  {
    "score": 624,
    "rank": 4364,
    "stateSno": 79
  },
  {
    "score": 623,
    "rank": 4537,
    "stateSno": 82
  },
  {
    "score": 622,
    "rank": 4731,
    "stateSno": 84
  },
  {
    "score": 621,
    "rank": 4898,
    "stateSno": 87
  },
  {
    "score": 620,
    "rank": 5068,
    "stateSno": 92
  },
  {
    "score": 619,
    "rank": 5254,
    "stateSno": 97
  },
  {
    "score": 618,
    "rank": 5451,
    "stateSno": 99
  },
  {
    "score": 617,
    "rank": 5722,
    "stateSno": 101
  },
  {
    "score": 616,
    "rank": 5857,
    "stateSno": 103
  },
  {
    "score": 615,
    "rank": 6110,
    "stateSno": 105
  },
  {
    "score": 614,
    "rank": 6275,
    "stateSno": 108
  },
  {
    "score": 612,
    "rank": 6781,
    "stateSno": 110
  },
  {
    "score": 611,
    "rank": 7051,
    "stateSno": 113
  },
  {
    "score": 610,
    "rank": 7367,
    "stateSno": 118
  },
  {
    "score": 609,
    "rank": 7545,
    "stateSno": 122
  },
  {
    "score": 608,
    "rank": 7640,
    "stateSno": 123
  },
  {
    "score": 607,
    "rank": 7919,
    "stateSno": 125
  },
  {
    "score": 606,
    "rank": 8276,
    "stateSno": 129
  },
  {
    "score": 605,
    "rank": 8648,
    "stateSno": 132
  },
  {
    "score": 604,
    "rank": 8771,
    "stateSno": 134
  },
  {
    "score": 603,
    "rank": 9175,
    "stateSno": 137
  },
  {
    "score": 602,
    "rank": 9326,
    "stateSno": 139
  },
  {
    "score": 601,
    "rank": 9665,
    "stateSno": 143
  },
  {
    "score": 600,
    "rank": 9965,
    "stateSno": 147
  },
  {
    "score": 599,
    "rank": 10270,
    "stateSno": 148
  },
  {
    "score": 598,
    "rank": 10707,
    "stateSno": 152
  },
  {
    "score": 597,
    "rank": 10978,
    "stateSno": 157
  },
  {
    "score": 596,
    "rank": 11385,
    "stateSno": 160
  },
  {
    "score": 595,
    "rank": 11587,
    "stateSno": 167
  },
  {
    "score": 594,
    "rank": 11966,
    "stateSno": 175
  },
  {
    "score": 593,
    "rank": 12349,
    "stateSno": 180
  },
  {
    "score": 592,
    "rank": 13006,
    "stateSno": 185
  },
  {
    "score": 590,
    "rank": 13695,
    "stateSno": 188
  },
  {
    "score": 589,
    "rank": 14044,
    "stateSno": 191
  },
  {
    "score": 588,
    "rank": 14588,
    "stateSno": 193
  },
  {
    "score": 587,
    "rank": 14758,
    "stateSno": 195
  },
  {
    "score": 586,
    "rank": 15127,
    "stateSno": 197
  },
  {
    "score": 585,
    "rank": 15645,
    "stateSno": 201
  },
  {
    "score": 584,
    "rank": 16103,
    "stateSno": 206
  },
  {
    "score": 583,
    "rank": 16399,
    "stateSno": 211
  },
  {
    "score": 582,
    "rank": 16945,
    "stateSno": 214
  },
  {
    "score": 581,
    "rank": 17464,
    "stateSno": 219
  },
  {
    "score": 580,
    "rank": 17896,
    "stateSno": 225
  },
  {
    "score": 579,
    "rank": 18482,
    "stateSno": 230
  },
  {
    "score": 578,
    "rank": 18883,
    "stateSno": 235
  },
  {
    "score": 577,
    "rank": 19537,
    "stateSno": 239
  },
  {
    "score": 576,
    "rank": 19848,
    "stateSno": 241
  },
  {
    "score": 575,
    "rank": 20682,
    "stateSno": 246
  },
  {
    "score": 574,
    "rank": 21113,
    "stateSno": 253
  },
  {
    "score": 573,
    "rank": 21639,
    "stateSno": 258
  },
  {
    "score": 572,
    "rank": 22045,
    "stateSno": 262
  },
  {
    "score": 571,
    "rank": 22708,
    "stateSno": 266
  },
  {
    "score": 570,
    "rank": 23480,
    "stateSno": 269
  },
  {
    "score": 569,
    "rank": 24172,
    "stateSno": 272
  },
  {
    "score": 568,
    "rank": 24436,
    "stateSno": 277
  },
  {
    "score": 567,
    "rank": 25053,
    "stateSno": 282
  },
  {
    "score": 566,
    "rank": 25792,
    "stateSno": 286
  },
  {
    "score": 565,
    "rank": 26490,
    "stateSno": 294
  },
  {
    "score": 564,
    "rank": 26958,
    "stateSno": 303
  },
  {
    "score": 563,
    "rank": 27726,
    "stateSno": 312
  },
  {
    "score": 562,
    "rank": 28323,
    "stateSno": 320
  },
  {
    "score": 561,
    "rank": 28964,
    "stateSno": 328
  },
  {
    "score": 560,
    "rank": 29844,
    "stateSno": 337
  },
  {
    "score": 559,
    "rank": 30435,
    "stateSno": 345
  },
  {
    "score": 558,
    "rank": 31383,
    "stateSno": 348
  },
  {
    "score": 557,
    "rank": 31744,
    "stateSno": 352
  },
  {
    "score": 556,
    "rank": 32550,
    "stateSno": 359
  },
  {
    "score": 555,
    "rank": 33309,
    "stateSno": 368
  },
  {
    "score": 554,
    "rank": 34145,
    "stateSno": 377
  },
  {
    "score": 553,
    "rank": 35016,
    "stateSno": 383
  },
  {
    "score": 552,
    "rank": 35736,
    "stateSno": 388
  },
  {
    "score": 551,
    "rank": 36379,
    "stateSno": 397
  },
  {
    "score": 550,
    "rank": 37109,
    "stateSno": 406
  },
  {
    "score": 549,
    "rank": 38008,
    "stateSno": 412
  },
  {
    "score": 548,
    "rank": 38753,
    "stateSno": 419
  },
  {
    "score": 547,
    "rank": 39755,
    "stateSno": 422
  },
  {
    "score": 546,
    "rank": 40685,
    "stateSno": 426
  },
  {
    "score": 545,
    "rank": 41089,
    "stateSno": 433
  },
  {
    "score": 544,
    "rank": 41928,
    "stateSno": 441
  },
  {
    "score": 543,
    "rank": 43149,
    "stateSno": 450
  },
  {
    "score": 542,
    "rank": 43746,
    "stateSno": 462
  },
  {
    "score": 541,
    "rank": 44675,
    "stateSno": 474
  },
  {
    "score": 540,
    "rank": 45419,
    "stateSno": 485
  },
  {
    "score": 539,
    "rank": 46767,
    "stateSno": 494
  },
  {
    "score": 538,
    "rank": 47392,
    "stateSno": 504
  },
  {
    "score": 537,
    "rank": 48439,
    "stateSno": 517
  },
  {
    "score": 536,
    "rank": 49235,
    "stateSno": 530
  },
  {
    "score": 535,
    "rank": 50213,
    "stateSno": 544
  },
  {
    "score": 534,
    "rank": 51291,
    "stateSno": 553
  },
  {
    "score": 533,
    "rank": 52115,
    "stateSno": 562
  },
  {
    "score": 532,
    "rank": 53321,
    "stateSno": 571
  },
  {
    "score": 531,
    "rank": 54100,
    "stateSno": 578
  },
  {
    "score": 530,
    "rank": 55151,
    "stateSno": 590
  },
  {
    "score": 529,
    "rank": 56152,
    "stateSno": 607
  },
  {
    "score": 528,
    "rank": 57190,
    "stateSno": 624
  },
  {
    "score": 527,
    "rank": 58377,
    "stateSno": 637
  },
  {
    "score": 526,
    "rank": 59180,
    "stateSno": 652
  },
  {
    "score": 525,
    "rank": 60250,
    "stateSno": 667
  },
  {
    "score": 524,
    "rank": 61218,
    "stateSno": 679
  },
  {
    "score": 523,
    "rank": 62073,
    "stateSno": 694
  },
  {
    "score": 522,
    "rank": 63161,
    "stateSno": 710
  },
  {
    "score": 521,
    "rank": 64551,
    "stateSno": 727
  },
  {
    "score": 520,
    "rank": 65702,
    "stateSno": 745
  },
  {
    "score": 519,
    "rank": 66908,
    "stateSno": 760
  },
  {
    "score": 518,
    "rank": 68127,
    "stateSno": 769
  },
  {
    "score": 517,
    "rank": 69090,
    "stateSno": 780
  },
  {
    "score": 516,
    "rank": 70089,
    "stateSno": 798
  },
  {
    "score": 515,
    "rank": 71360,
    "stateSno": 819
  },
  {
    "score": 514,
    "rank": 72351,
    "stateSno": 836
  },
  {
    "score": 513,
    "rank": 73603,
    "stateSno": 852
  },
  {
    "score": 512,
    "rank": 75108,
    "stateSno": 869
  },
  {
    "score": 511,
    "rank": 75994,
    "stateSno": 888
  },
  {
    "score": 510,
    "rank": 77037,
    "stateSno": 907
  },
  {
    "score": 509,
    "rank": 78310,
    "stateSno": 926
  },
  {
    "score": 508,
    "rank": 79561,
    "stateSno": 946
  },
  {
    "score": 507,
    "rank": 80888,
    "stateSno": 967
  },
  {
    "score": 506,
    "rank": 82134,
    "stateSno": 989
  },
  {
    "score": 505,
    "rank": 83342,
    "stateSno": 1013
  },
  {
    "score": 504,
    "rank": 84466,
    "stateSno": 1038
  },
  {
    "score": 503,
    "rank": 85885,
    "stateSno": 1063
  },
  {
    "score": 502,
    "rank": 87066,
    "stateSno": 1085
  },
  {
    "score": 501,
    "rank": 88287,
    "stateSno": 1110
  },
  {
    "score": 500,
    "rank": 89670,
    "stateSno": 1140
  },
  {
    "score": 499,
    "rank": 91169,
    "stateSno": 1168
  },
  {
    "score": 498,
    "rank": 92238,
    "stateSno": 1191
  },
  {
    "score": 497,
    "rank": 93519,
    "stateSno": 1215
  },
  {
    "score": 496,
    "rank": 95089,
    "stateSno": 1240
  },
  {
    "score": 495,
    "rank": 96256,
    "stateSno": 1266
  },
  {
    "score": 494,
    "rank": 97757,
    "stateSno": 1298
  },
  {
    "score": 493,
    "rank": 99197,
    "stateSno": 1328
  },
  {
    "score": 492,
    "rank": 100151,
    "stateSno": 1354
  },
  {
    "score": 491,
    "rank": 101861,
    "stateSno": 1381
  },
  {
    "score": 490,
    "rank": 103176,
    "stateSno": 1409
  },
  {
    "score": 489,
    "rank": 104641,
    "stateSno": 1439
  },
  {
    "score": 488,
    "rank": 105911,
    "stateSno": 1473
  },
  {
    "score": 487,
    "rank": 107285,
    "stateSno": 1509
  },
  {
    "score": 486,
    "rank": 108852,
    "stateSno": 1541
  },
  {
    "score": 485,
    "rank": 110127,
    "stateSno": 1573
  },
  {
    "score": 484,
    "rank": 111545,
    "stateSno": 1605
  },
  {
    "score": 483,
    "rank": 113153,
    "stateSno": 1636
  },
  {
    "score": 482,
    "rank": 114523,
    "stateSno": 1668
  },
  {
    "score": 481,
    "rank": 116034,
    "stateSno": 1697
  },
  {
    "score": 480,
    "rank": 117608,
    "stateSno": 1731
  },
  {
    "score": 479,
    "rank": 119188,
    "stateSno": 1765
  },
  {
    "score": 478,
    "rank": 120454,
    "stateSno": 1798
  },
  {
    "score": 477,
    "rank": 121856,
    "stateSno": 1835
  },
  {
    "score": 476,
    "rank": 123376,
    "stateSno": 1870
  },
  {
    "score": 475,
    "rank": 125090,
    "stateSno": 1910
  },
  {
    "score": 474,
    "rank": 126722,
    "stateSno": 1958
  },
  {
    "score": 473,
    "rank": 128152,
    "stateSno": 2003
  },
  {
    "score": 472,
    "rank": 129740,
    "stateSno": 2048
  },
  {
    "score": 471,
    "rank": 131211,
    "stateSno": 2091
  },
  {
    "score": 470,
    "rank": 132873,
    "stateSno": 2136
  },
  {
    "score": 469,
    "rank": 134384,
    "stateSno": 2185
  },
  {
    "score": 468,
    "rank": 136036,
    "stateSno": 2232
  },
  {
    "score": 467,
    "rank": 137504,
    "stateSno": 2280
  },
  {
    "score": 466,
    "rank": 139063,
    "stateSno": 2335
  },
  {
    "score": 465,
    "rank": 140725,
    "stateSno": 2389
  },
  {
    "score": 464,
    "rank": 142564,
    "stateSno": 2443
  },
  {
    "score": 463,
    "rank": 144003,
    "stateSno": 2494
  },
  {
    "score": 462,
    "rank": 145682,
    "stateSno": 2547
  },
  {
    "score": 461,
    "rank": 147496,
    "stateSno": 2607
  },
  {
    "score": 460,
    "rank": 149252,
    "stateSno": 2671
  },
  {
    "score": 459,
    "rank": 151129,
    "stateSno": 2728
  },
  {
    "score": 458,
    "rank": 152719,
    "stateSno": 2784
  },
  {
    "score": 457,
    "rank": 154468,
    "stateSno": 2843
  },
  {
    "score": 456,
    "rank": 156082,
    "stateSno": 2901
  },
  {
    "score": 455,
    "rank": 157849,
    "stateSno": 2962
  },
  {
    "score": 454,
    "rank": 159681,
    "stateSno": 3027
  },
  {
    "score": 453,
    "rank": 161424,
    "stateSno": 3092
  },
  {
    "score": 452,
    "rank": 163261,
    "stateSno": 3151
  },
  {
    "score": 451,
    "rank": 165059,
    "stateSno": 3208
  },
  {
    "score": 450,
    "rank": 166790,
    "stateSno": 3271
  },
  {
    "score": 449,
    "rank": 168760,
    "stateSno": 3334
  },
  {
    "score": 448,
    "rank": 170480,
    "stateSno": 3399
  },
  {
    "score": 447,
    "rank": 172222,
    "stateSno": 3473
  },
  {
    "score": 446,
    "rank": 174172,
    "stateSno": 3539
  },
  {
    "score": 445,
    "rank": 176110,
    "stateSno": 3601
  },
  {
    "score": 444,
    "rank": 178034,
    "stateSno": 3670
  },
  {
    "score": 443,
    "rank": 179673,
    "stateSno": 3743
  },
  {
    "score": 442,
    "rank": 181598,
    "stateSno": 3821
  },
  {
    "score": 441,
    "rank": 183307,
    "stateSno": 3895
  },
  {
    "score": 440,
    "rank": 185474,
    "stateSno": 3970
  },
  {
    "score": 439,
    "rank": 187347,
    "stateSno": 4049
  },
  {
    "score": 438,
    "rank": 189404,
    "stateSno": 4118
  },
  {
    "score": 437,
    "rank": 191225,
    "stateSno": 4186
  },
  {
    "score": 436,
    "rank": 193135,
    "stateSno": 4264
  },
  {
    "score": 435,
    "rank": 195259,
    "stateSno": 4345
  },
  {
    "score": 434,
    "rank": 197166,
    "stateSno": 4428
  },
  {
    "score": 433,
    "rank": 199144,
    "stateSno": 4504
  },
  {
    "score": 432,
    "rank": 201245,
    "stateSno": 4579
  },
  {
    "score": 431,
    "rank": 203045,
    "stateSno": 4658
  },
  {
    "score": 430,
    "rank": 205237,
    "stateSno": 4741
  },
  {
    "score": 429,
    "rank": 207337,
    "stateSno": 4812
  },
  {
    "score": 428,
    "rank": 209454,
    "stateSno": 4882
  },
  {
    "score": 427,
    "rank": 211235,
    "stateSno": 4963
  },
  {
    "score": 426,
    "rank": 213398,
    "stateSno": 5059
  },
  {
    "score": 425,
    "rank": 215485,
    "stateSno": 5169
  },
  {
    "score": 424,
    "rank": 217705,
    "stateSno": 5273
  },
  {
    "score": 423,
    "rank": 219792,
    "stateSno": 5380
  },
  {
    "score": 422,
    "rank": 221824,
    "stateSno": 5473
  },
  {
    "score": 421,
    "rank": 223947,
    "stateSno": 5563
  },
  {
    "score": 420,
    "rank": 225995,
    "stateSno": 5663
  },
  {
    "score": 419,
    "rank": 228451,
    "stateSno": 5753
  },
  {
    "score": 418,
    "rank": 230508,
    "stateSno": 5838
  },
  {
    "score": 417,
    "rank": 232666,
    "stateSno": 5927
  },
  {
    "score": 416,
    "rank": 235048,
    "stateSno": 6027
  },
  {
    "score": 415,
    "rank": 237065,
    "stateSno": 6129
  },
  {
    "score": 414,
    "rank": 239556,
    "stateSno": 6226
  },
  {
    "score": 413,
    "rank": 241677,
    "stateSno": 6328
  },
  {
    "score": 412,
    "rank": 243847,
    "stateSno": 6428
  },
  {
    "score": 411,
    "rank": 246048,
    "stateSno": 6522
  },
  {
    "score": 410,
    "rank": 248647,
    "stateSno": 6634
  },
  {
    "score": 409,
    "rank": 251017,
    "stateSno": 6749
  },
  {
    "score": 408,
    "rank": 253271,
    "stateSno": 6854
  },
  {
    "score": 407,
    "rank": 255473,
    "stateSno": 6955
  },
  {
    "score": 406,
    "rank": 257929,
    "stateSno": 7065
  },
  {
    "score": 405,
    "rank": 260282,
    "stateSno": 7177
  },
  {
    "score": 404,
    "rank": 262804,
    "stateSno": 7292
  },
  {
    "score": 403,
    "rank": 265216,
    "stateSno": 7399
  },
  {
    "score": 402,
    "rank": 267470,
    "stateSno": 7507
  },
  {
    "score": 401,
    "rank": 269864,
    "stateSno": 7609
  },
  {
    "score": 400,
    "rank": 272513,
    "stateSno": 7705
  },
  {
    "score": 399,
    "rank": 275019,
    "stateSno": 7810
  },
  {
    "score": 398,
    "rank": 277350,
    "stateSno": 7908
  },
  {
    "score": 397,
    "rank": 279988,
    "stateSno": 7997
  },
  {
    "score": 396,
    "rank": 282327,
    "stateSno": 8098
  },
  {
    "score": 395,
    "rank": 284888,
    "stateSno": 8207
  },
  {
    "score": 394,
    "rank": 287686,
    "stateSno": 8312
  },
  {
    "score": 393,
    "rank": 290306,
    "stateSno": 8419
  },
  {
    "score": 392,
    "rank": 292604,
    "stateSno": 8528
  },
  {
    "score": 391,
    "rank": 295235,
    "stateSno": 8629
  },
  {
    "score": 390,
    "rank": 297656,
    "stateSno": 8733
  },
  {
    "score": 389,
    "rank": 300569,
    "stateSno": 8835
  },
  {
    "score": 388,
    "rank": 303253,
    "stateSno": 8937
  },
  {
    "score": 387,
    "rank": 305650,
    "stateSno": 9037
  },
  {
    "score": 386,
    "rank": 308308,
    "stateSno": 9148
  },
  {
    "score": 385,
    "rank": 310823,
    "stateSno": 9263
  },
  {
    "score": 384,
    "rank": 313623,
    "stateSno": 9359
  },
  {
    "score": 383,
    "rank": 316144,
    "stateSno": 9455
  },
  {
    "score": 382,
    "rank": 318900,
    "stateSno": 9555
  },
  {
    "score": 381,
    "rank": 321556,
    "stateSno": 9653
  },
  {
    "score": 380,
    "rank": 324455,
    "stateSno": 9751
  },
  {
    "score": 379,
    "rank": 327456,
    "stateSno": 9853
  },
  {
    "score": 378,
    "rank": 330022,
    "stateSno": 9953
  },
  {
    "score": 377,
    "rank": 332806,
    "stateSno": 10050
  },
  {
    "score": 376,
    "rank": 335550,
    "stateSno": 10137
  },
  {
    "score": 375,
    "rank": 338608,
    "stateSno": 10226
  },
  {
    "score": 374,
    "rank": 341550,
    "stateSno": 10321
  },
  {
    "score": 373,
    "rank": 344417,
    "stateSno": 10413
  },
  {
    "score": 372,
    "rank": 347137,
    "stateSno": 10506
  },
  {
    "score": 371,
    "rank": 349985,
    "stateSno": 10591
  },
  {
    "score": 370,
    "rank": 353046,
    "stateSno": 10680
  },
  {
    "score": 369,
    "rank": 356186,
    "stateSno": 10781
  },
  {
    "score": 368,
    "rank": 359012,
    "stateSno": 10869
  },
  {
    "score": 367,
    "rank": 362013,
    "stateSno": 10951
  },
  {
    "score": 366,
    "rank": 364640,
    "stateSno": 11041
  },
  {
    "score": 365,
    "rank": 367612,
    "stateSno": 11130
  },
  {
    "score": 364,
    "rank": 371181,
    "stateSno": 11212
  },
  {
    "score": 363,
    "rank": 374007,
    "stateSno": 11298
  },
  {
    "score": 362,
    "rank": 376882,
    "stateSno": 11380
  },
  {
    "score": 361,
    "rank": 379984,
    "stateSno": 11465
  },
  {
    "score": 360,
    "rank": 383071,
    "stateSno": 11551
  },
  {
    "score": 359,
    "rank": 386467,
    "stateSno": 11622
  },
  {
    "score": 358,
    "rank": 389466,
    "stateSno": 11694
  },
  {
    "score": 357,
    "rank": 392381,
    "stateSno": 11775
  },
  {
    "score": 356,
    "rank": 395345,
    "stateSno": 11855
  },
  {
    "score": 355,
    "rank": 398477,
    "stateSno": 11951
  },
  {
    "score": 354,
    "rank": 402010,
    "stateSno": 12048
  },
  {
    "score": 353,
    "rank": 405612,
    "stateSno": 12123
  },
  {
    "score": 352,
    "rank": 408210,
    "stateSno": 12184
  },
  {
    "score": 351,
    "rank": 411423,
    "stateSno": 12253
  },
  {
    "score": 350,
    "rank": 414498,
    "stateSno": 12338
  },
  {
    "score": 349,
    "rank": 418454,
    "stateSno": 12428
  },
  {
    "score": 348,
    "rank": 421508,
    "stateSno": 12516
  },
  {
    "score": 347,
    "rank": 424694,
    "stateSno": 12599
  },
  {
    "score": 346,
    "rank": 427681,
    "stateSno": 12666
  },
  {
    "score": 345,
    "rank": 430929,
    "stateSno": 12736
  },
  {
    "score": 344,
    "rank": 434777,
    "stateSno": 12809
  },
  {
    "score": 343,
    "rank": 438108,
    "stateSno": 12872
  },
  {
    "score": 342,
    "rank": 441306,
    "stateSno": 12943
  },
  {
    "score": 341,
    "rank": 444737,
    "stateSno": 13025
  },
  {
    "score": 340,
    "rank": 447964,
    "stateSno": 13114
  },
  {
    "score": 339,
    "rank": 451735,
    "stateSno": 13194
  },
  {
    "score": 338,
    "rank": 455031,
    "stateSno": 13262
  },
  {
    "score": 337,
    "rank": 458251,
    "stateSno": 13332
  },
  {
    "score": 336,
    "rank": 462104,
    "stateSno": 13404
  },
  {
    "score": 335,
    "rank": 465621,
    "stateSno": 13464
  },
  {
    "score": 334,
    "rank": 469216,
    "stateSno": 13521
  },
  {
    "score": 333,
    "rank": 472790,
    "stateSno": 13578
  },
  {
    "score": 332,
    "rank": 476100,
    "stateSno": 13640
  },
  {
    "score": 331,
    "rank": 479414,
    "stateSno": 13706
  },
  {
    "score": 330,
    "rank": 483128,
    "stateSno": 13778
  },
  {
    "score": 329,
    "rank": 486874,
    "stateSno": 13854
  },
  {
    "score": 328,
    "rank": 490355,
    "stateSno": 13925
  },
  {
    "score": 327,
    "rank": 493644,
    "stateSno": 13996
  },
  {
    "score": 326,
    "rank": 497312,
    "stateSno": 14061
  },
  {
    "score": 325,
    "rank": 500928,
    "stateSno": 14125
  },
  {
    "score": 324,
    "rank": 504866,
    "stateSno": 14184
  },
  {
    "score": 323,
    "rank": 508636,
    "stateSno": 14236
  },
  {
    "score": 322,
    "rank": 511674,
    "stateSno": 14298
  },
  {
    "score": 321,
    "rank": 515256,
    "stateSno": 14363
  },
  {
    "score": 320,
    "rank": 519215,
    "stateSno": 14429
  },
  {
    "score": 319,
    "rank": 523201,
    "stateSno": 14500
  },
  {
    "score": 318,
    "rank": 526920,
    "stateSno": 14568
  },
  {
    "score": 317,
    "rank": 530091,
    "stateSno": 14633
  },
  {
    "score": 316,
    "rank": 534492,
    "stateSno": 14689
  },
  {
    "score": 315,
    "rank": 537887,
    "stateSno": 14752
  },
  {
    "score": 314,
    "rank": 542095,
    "stateSno": 14814
  },
  {
    "score": 313,
    "rank": 545793,
    "stateSno": 14872
  },
  {
    "score": 312,
    "rank": 548923,
    "stateSno": 14925
  },
  {
    "score": 311,
    "rank": 552715,
    "stateSno": 14975
  },
  {
    "score": 310,
    "rank": 556556,
    "stateSno": 15037
  },
  {
    "score": 309,
    "rank": 560933,
    "stateSno": 15098
  },
  {
    "score": 308,
    "rank": 564285,
    "stateSno": 15152
  },
  {
    "score": 307,
    "rank": 568424,
    "stateSno": 15204
  },
  {
    "score": 306,
    "rank": 571979,
    "stateSno": 15255
  },
  {
    "score": 305,
    "rank": 575701,
    "stateSno": 15313
  },
  {
    "score": 304,
    "rank": 579925,
    "stateSno": 15370
  },
  {
    "score": 303,
    "rank": 583979,
    "stateSno": 15419
  },
  {
    "score": 302,
    "rank": 587559,
    "stateSno": 15462
  },
  {
    "score": 301,
    "rank": 591790,
    "stateSno": 15507
  },
  {
    "score": 300,
    "rank": 595172,
    "stateSno": 15560
  },
  {
    "score": 299,
    "rank": 600117,
    "stateSno": 15611
  },
  {
    "score": 298,
    "rank": 603732,
    "stateSno": 15655
  },
  {
    "score": 297,
    "rank": 607793,
    "stateSno": 15698
  },
  {
    "score": 296,
    "rank": 611490,
    "stateSno": 15741
  },
  {
    "score": 295,
    "rank": 615783,
    "stateSno": 15783
  },
  {
    "score": 294,
    "rank": 619712,
    "stateSno": 15822
  },
  {
    "score": 293,
    "rank": 624113,
    "stateSno": 15855
  },
  {
    "score": 292,
    "rank": 627615,
    "stateSno": 15890
  },
  {
    "score": 291,
    "rank": 631872,
    "stateSno": 15928
  },
  {
    "score": 290,
    "rank": 636214,
    "stateSno": 15973
  },
  {
    "score": 289,
    "rank": 640508,
    "stateSno": 16022
  },
  {
    "score": 288,
    "rank": 644310,
    "stateSno": 16057
  },
  {
    "score": 287,
    "rank": 648687,
    "stateSno": 16092
  },
  {
    "score": 286,
    "rank": 652569,
    "stateSno": 16131
  },
  {
    "score": 285,
    "rank": 657409,
    "stateSno": 16160
  },
  {
    "score": 284,
    "rank": 661056,
    "stateSno": 16188
  },
  {
    "score": 283,
    "rank": 665317,
    "stateSno": 16221
  },
  {
    "score": 282,
    "rank": 669358,
    "stateSno": 16253
  },
  {
    "score": 281,
    "rank": 673238,
    "stateSno": 16288
  },
  {
    "score": 280,
    "rank": 678402,
    "stateSno": 16328
  },
  {
    "score": 279,
    "rank": 682079,
    "stateSno": 16362
  },
  {
    "score": 278,
    "rank": 686902,
    "stateSno": 16392
  },
  {
    "score": 277,
    "rank": 690639,
    "stateSno": 16421
  },
  {
    "score": 276,
    "rank": 694460,
    "stateSno": 16455
  },
  {
    "score": 275,
    "rank": 698742,
    "stateSno": 16487
  },
  {
    "score": 274,
    "rank": 703528,
    "stateSno": 16521
  },
  {
    "score": 273,
    "rank": 708111,
    "stateSno": 16557
  },
  {
    "score": 272,
    "rank": 712247,
    "stateSno": 16587
  },
  {
    "score": 271,
    "rank": 717235,
    "stateSno": 16616
  },
  {
    "score": 270,
    "rank": 720738,
    "stateSno": 16646
  },
  {
    "score": 269,
    "rank": 725926,
    "stateSno": 16676
  },
  {
    "score": 268,
    "rank": 729884,
    "stateSno": 16702
  },
  {
    "score": 267,
    "rank": 733962,
    "stateSno": 16732
  },
  {
    "score": 266,
    "rank": 738439,
    "stateSno": 16764
  },
  {
    "score": 265,
    "rank": 742659,
    "stateSno": 16793
  },
  {
    "score": 264,
    "rank": 748086,
    "stateSno": 16824
  },
  {
    "score": 263,
    "rank": 752075,
    "stateSno": 16854
  },
  {
    "score": 262,
    "rank": 756486,
    "stateSno": 16881
  },
  {
    "score": 261,
    "rank": 760459,
    "stateSno": 16908
  },
  {
    "score": 260,
    "rank": 766255,
    "stateSno": 16938
  },
  {
    "score": 259,
    "rank": 770519,
    "stateSno": 16969
  },
  {
    "score": 258,
    "rank": 774952,
    "stateSno": 17001
  },
  {
    "score": 257,
    "rank": 779429,
    "stateSno": 17031
  },
  {
    "score": 256,
    "rank": 783957,
    "stateSno": 17059
  },
  {
    "score": 255,
    "rank": 788344,
    "stateSno": 17089
  },
  {
    "score": 254,
    "rank": 793098,
    "stateSno": 17120
  },
  {
    "score": 253,
    "rank": 797956,
    "stateSno": 17148
  },
  {
    "score": 252,
    "rank": 802255,
    "stateSno": 17174
  },
  {
    "score": 251,
    "rank": 806869,
    "stateSno": 17198
  },
  {
    "score": 250,
    "rank": 811597,
    "stateSno": 17223
  },
  {
    "score": 249,
    "rank": 815972,
    "stateSno": 17249
  },
  {
    "score": 248,
    "rank": 821630,
    "stateSno": 17272
  },
  {
    "score": 247,
    "rank": 825624,
    "stateSno": 17298
  },
  {
    "score": 246,
    "rank": 829424,
    "stateSno": 17326
  },
  {
    "score": 245,
    "rank": 834926,
    "stateSno": 17353
  },
  {
    "score": 244,
    "rank": 839462,
    "stateSno": 17381
  },
  {
    "score": 243,
    "rank": 844338,
    "stateSno": 17406
  },
  {
    "score": 242,
    "rank": 849262,
    "stateSno": 17431
  },
  {
    "score": 241,
    "rank": 853808,
    "stateSno": 17463
  },
  {
    "score": 240,
    "rank": 858579,
    "stateSno": 17493
  },
  {
    "score": 239,
    "rank": 863117,
    "stateSno": 17517
  },
  {
    "score": 238,
    "rank": 868587,
    "stateSno": 17539
  },
  {
    "score": 237,
    "rank": 873179,
    "stateSno": 17560
  },
  {
    "score": 236,
    "rank": 877359,
    "stateSno": 17580
  },
  {
    "score": 235,
    "rank": 882780,
    "stateSno": 17599
  },
  {
    "score": 234,
    "rank": 887561,
    "stateSno": 17622
  },
  {
    "score": 233,
    "rank": 892850,
    "stateSno": 17647
  },
  {
    "score": 232,
    "rank": 897112,
    "stateSno": 17670
  },
  {
    "score": 231,
    "rank": 901920,
    "stateSno": 17688
  },
  {
    "score": 230,
    "rank": 907500,
    "stateSno": 17708
  },
  {
    "score": 229,
    "rank": 913076,
    "stateSno": 17736
  },
  {
    "score": 228,
    "rank": 917522,
    "stateSno": 17763
  },
  {
    "score": 227,
    "rank": 923000,
    "stateSno": 17783
  },
  {
    "score": 226,
    "rank": 926657,
    "stateSno": 17806
  },
  {
    "score": 225,
    "rank": 931617,
    "stateSno": 17832
  },
  {
    "score": 224,
    "rank": 937275,
    "stateSno": 17854
  },
  {
    "score": 223,
    "rank": 942285,
    "stateSno": 17873
  },
  {
    "score": 222,
    "rank": 947201,
    "stateSno": 17894
  },
  {
    "score": 221,
    "rank": 951753,
    "stateSno": 17915
  },
  {
    "score": 220,
    "rank": 957355,
    "stateSno": 17938
  },
  {
    "score": 219,
    "rank": 963553,
    "stateSno": 17958
  },
  {
    "score": 218,
    "rank": 967794,
    "stateSno": 17974
  },
  {
    "score": 217,
    "rank": 972941,
    "stateSno": 17991
  },
  {
    "score": 216,
    "rank": 977948,
    "stateSno": 18011
  },
  {
    "score": 215,
    "rank": 983578,
    "stateSno": 18037
  },
  {
    "score": 214,
    "rank": 988910,
    "stateSno": 18062
  },
  {
    "score": 213,
    "rank": 993872,
    "stateSno": 18079
  },
  {
    "score": 212,
    "rank": 998751,
    "stateSno": 18094
  },
  {
    "score": 211,
    "rank": 1003384,
    "stateSno": 18108
  },
  {
    "score": 210,
    "rank": 1009649,
    "stateSno": 18124
  },
  {
    "score": 209,
    "rank": 1015512,
    "stateSno": 18141
  },
  {
    "score": 208,
    "rank": 1019625,
    "stateSno": 18159
  },
  {
    "score": 207,
    "rank": 1026177,
    "stateSno": 18178
  },
  {
    "score": 206,
    "rank": 1029447,
    "stateSno": 18197
  },
  {
    "score": 205,
    "rank": 1035150,
    "stateSno": 18215
  },
  {
    "score": 204,
    "rank": 1041776,
    "stateSno": 18229
  },
  {
    "score": 203,
    "rank": 1047299,
    "stateSno": 18246
  },
  {
    "score": 202,
    "rank": 1052837,
    "stateSno": 18264
  },
  {
    "score": 201,
    "rank": 1056788,
    "stateSno": 18279
  },
  {
    "score": 200,
    "rank": 1062437,
    "stateSno": 18301
  },
  {
    "score": 199,
    "rank": 1068820,
    "stateSno": 18322
  },
  {
    "score": 198,
    "rank": 1074626,
    "stateSno": 18333
  },
  {
    "score": 197,
    "rank": 1079616,
    "stateSno": 18346
  },
  {
    "score": 196,
    "rank": 1085292,
    "stateSno": 18359
  },
  {
    "score": 195,
    "rank": 1091103,
    "stateSno": 18375
  },
  {
    "score": 194,
    "rank": 1095995,
    "stateSno": 18392
  },
  {
    "score": 193,
    "rank": 1102674,
    "stateSno": 18404
  },
  {
    "score": 192,
    "rank": 1106192,
    "stateSno": 18412
  },
  {
    "score": 191,
    "rank": 1112844,
    "stateSno": 18421
  },
  {
    "score": 190,
    "rank": 1117738,
    "stateSno": 18433
  },
  {
    "score": 189,
    "rank": 1124686,
    "stateSno": 18444
  },
  {
    "score": 188,
    "rank": 1129159,
    "stateSno": 18453
  },
  {
    "score": 187,
    "rank": 1135455,
    "stateSno": 18460
  },
  {
    "score": 186,
    "rank": 1139485,
    "stateSno": 18469
  },
  {
    "score": 185,
    "rank": 1145952,
    "stateSno": 18486
  },
  {
    "score": 184,
    "rank": 1152177,
    "stateSno": 18505
  },
  {
    "score": 183,
    "rank": 1157490,
    "stateSno": 18516
  },
  {
    "score": 182,
    "rank": 1162499,
    "stateSno": 18526
  },
  {
    "score": 181,
    "rank": 1168064,
    "stateSno": 18538
  },
  {
    "score": 180,
    "rank": 1175018,
    "stateSno": 18553
  },
  {
    "score": 179,
    "rank": 1180407,
    "stateSno": 18567
  },
  {
    "score": 178,
    "rank": 1186297,
    "stateSno": 18578
  },
  {
    "score": 177,
    "rank": 1191494,
    "stateSno": 18593
  }
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
  {
    "id": 1,
    "sno": 1,
    "code": "OMCH",
    "name": "Osmania Medical College",
    "place": "Koti, Hyderabad",
    "distKm": 13,
    "intake": 199,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 14000,
    "knownRanks": {
      "OC": 14000,
      "EWS": 35000,
      "BC_A": 50000,
      "BC_B": 20000,
      "BC_C": 60000,
      "BC_D": 22000,
      "BC_E": 25000,
      "SC_1": 220000,
      "SC_2": 85000,
      "SC_3": 80000,
      "SC": 85000,
      "ST": 100000
    },
    "knownCatRanks": {
      "OC": 200,
      "EWS": 35,
      "BC_A": 25,
      "BC_B": 50,
      "BC_C": 5,
      "BC_D": 35,
      "BC_E": 25,
      "SC_1": 2,
      "SC_2": 25,
      "SC_3": 20,
      "SC": 45,
      "ST": 50
    },
    "ocClosingCatRank": 200
  },
  {
    "id": 2,
    "sno": 2,
    "code": "GAND",
    "name": "Gandhi Medical College",
    "place": "Musheerabad, Secunderabad",
    "distKm": 19,
    "intake": 209,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 16500,
    "knownRanks": {
      "OC": 16500,
      "EWS": 38000,
      "BC_A": 53500,
      "BC_B": 23000,
      "BC_C": 64000,
      "BC_D": 25000,
      "BC_E": 28000,
      "SC_1": 223000,
      "SC_2": 90200,
      "SC_3": 84800,
      "SC": 90200,
      "ST": 105000
    },
    "knownCatRanks": {
      "OC": 300,
      "EWS": 50,
      "BC_A": 37,
      "BC_B": 75,
      "BC_C": 8,
      "BC_D": 55,
      "BC_E": 37,
      "SC_1": 3,
      "SC_2": 35,
      "SC_3": 28,
      "SC": 63,
      "ST": 70
    },
    "ocClosingCatRank": 300
  },
  {
    "id": 3,
    "sno": 3,
    "code": "ESIM",
    "name": "ESIC Medical College",
    "place": "Sanathnagar, Hyderabad",
    "distKm": 20,
    "intake": 71,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 19000,
    "knownRanks": {
      "OC": 19000,
      "EWS": 41000,
      "BC_A": 57000,
      "BC_B": 26000,
      "BC_C": 68000,
      "BC_D": 28000,
      "BC_E": 31000,
      "SC_1": 226000,
      "SC_2": 95400,
      "SC_3": 89600,
      "SC": 95400,
      "ST": 110000
    },
    "knownCatRanks": {
      "OC": 400,
      "EWS": 65,
      "BC_A": 49,
      "BC_B": 100,
      "BC_C": 11,
      "BC_D": 75,
      "BC_E": 49,
      "SC_1": 4,
      "SC_2": 45,
      "SC_3": 36,
      "SC": 81,
      "ST": 90
    },
    "ocClosingCatRank": 400
  },
  {
    "id": 4,
    "sno": 4,
    "code": "GMHR",
    "name": "Govt. Medical College, Maheshwaram",
    "place": "Maheshwaram, Rangareddy",
    "distKm": 32,
    "intake": 40,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 21500,
    "knownRanks": {
      "OC": 21500,
      "EWS": 44000,
      "BC_A": 60500,
      "BC_B": 29000,
      "BC_C": 72000,
      "BC_D": 31000,
      "BC_E": 34000,
      "SC_1": 229000,
      "SC_2": 100600,
      "SC_3": 94400,
      "SC": 100600,
      "ST": 115000
    },
    "knownCatRanks": {
      "OC": 500,
      "EWS": 80,
      "BC_A": 61,
      "BC_B": 125,
      "BC_C": 14,
      "BC_D": 95,
      "BC_E": 61,
      "SC_1": 5,
      "SC_2": 55,
      "SC_3": 44,
      "SC": 99,
      "ST": 110
    },
    "ocClosingCatRank": 500
  },
  {
    "id": 5,
    "sno": 5,
    "code": "GQTB",
    "name": "Govt. Medical College, Quthbullapur",
    "place": "Quthbullapur, Medchal",
    "distKm": 34,
    "intake": 40,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 24000,
    "knownRanks": {
      "OC": 24000,
      "EWS": 47000,
      "BC_A": 64000,
      "BC_B": 32000,
      "BC_C": 76000,
      "BC_D": 34000,
      "BC_E": 37000,
      "SC_1": 232000,
      "SC_2": 105800,
      "SC_3": 99200,
      "SC": 105800,
      "ST": 120000
    },
    "knownCatRanks": {
      "OC": 600,
      "EWS": 95,
      "BC_A": 73,
      "BC_B": 150,
      "BC_C": 17,
      "BC_D": 115,
      "BC_E": 73,
      "SC_1": 6,
      "SC_2": 65,
      "SC_3": 52,
      "SC": 117,
      "ST": 130
    },
    "ocClosingCatRank": 600
  },
  {
    "id": 6,
    "sno": 6,
    "code": "GSGR",
    "name": "Govt. Medical College, Sangareddy",
    "place": "Sangareddy",
    "distKm": 55,
    "intake": 121,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 26500,
    "knownRanks": {
      "OC": 26500,
      "EWS": 50000,
      "BC_A": 67500,
      "BC_B": 35000,
      "BC_C": 80000,
      "BC_D": 37000,
      "BC_E": 40000,
      "SC_1": 235000,
      "SC_2": 111000,
      "SC_3": 104000,
      "SC": 111000,
      "ST": 125000
    },
    "knownCatRanks": {
      "OC": 700,
      "EWS": 110,
      "BC_A": 85,
      "BC_B": 175,
      "BC_C": 20,
      "BC_D": 135,
      "BC_E": 85,
      "SC_1": 7,
      "SC_2": 75,
      "SC_3": 60,
      "SC": 135,
      "ST": 150
    },
    "ocClosingCatRank": 700
  },
  {
    "id": 7,
    "sno": 7,
    "code": "GVKB",
    "name": "Govt. Medical College, Vikarabad",
    "place": "Vikarabad",
    "distKm": 60,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 29000,
    "knownRanks": {
      "OC": 29000,
      "EWS": 53000,
      "BC_A": 71000,
      "BC_B": 38000,
      "BC_C": 84000,
      "BC_D": 40000,
      "BC_E": 43000,
      "SC_1": 238000,
      "SC_2": 116200,
      "SC_3": 108800,
      "SC": 116200,
      "ST": 130000
    },
    "knownCatRanks": {
      "OC": 800,
      "EWS": 125,
      "BC_A": 97,
      "BC_B": 200,
      "BC_C": 23,
      "BC_D": 155,
      "BC_E": 97,
      "SC_1": 8,
      "SC_2": 85,
      "SC_3": 68,
      "SC": 153,
      "ST": 170
    },
    "ocClosingCatRank": 800
  },
  {
    "id": 8,
    "sno": 8,
    "code": "GYDT",
    "name": "Govt. Medical College, Yadadri",
    "place": "Yadadri Bhuvanagiri",
    "distKm": 68,
    "intake": 41,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 31500,
    "knownRanks": {
      "OC": 31500,
      "EWS": 56000,
      "BC_A": 74500,
      "BC_B": 41000,
      "BC_C": 88000,
      "BC_D": 43000,
      "BC_E": 46000,
      "SC_1": 241000,
      "SC_2": 121400,
      "SC_3": 113600,
      "SC": 121400,
      "ST": 135000
    },
    "knownCatRanks": {
      "OC": 900,
      "EWS": 140,
      "BC_A": 109,
      "BC_B": 225,
      "BC_C": 26,
      "BC_D": 175,
      "BC_E": 109,
      "SC_1": 9,
      "SC_2": 95,
      "SC_3": 76,
      "SC": 171,
      "ST": 190
    },
    "ocClosingCatRank": 900
  },
  {
    "id": 9,
    "sno": 9,
    "code": "SGMC",
    "name": "Govt. Medical College, Siddipet",
    "place": "Siddipet",
    "distKm": 85,
    "intake": 164,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 34000,
    "knownRanks": {
      "OC": 34000,
      "EWS": 59000,
      "BC_A": 78000,
      "BC_B": 44000,
      "BC_C": 92000,
      "BC_D": 46000,
      "BC_E": 49000,
      "SC_1": 244000,
      "SC_2": 126600,
      "SC_3": 118400,
      "SC": 126600,
      "ST": 140000
    },
    "knownCatRanks": {
      "OC": 1000,
      "EWS": 155,
      "BC_A": 121,
      "BC_B": 250,
      "BC_C": 29,
      "BC_D": 195,
      "BC_E": 121,
      "SC_1": 10,
      "SC_2": 105,
      "SC_3": 84,
      "SC": 189,
      "ST": 210
    },
    "ocClosingCatRank": 1000
  },
  {
    "id": 10,
    "sno": 10,
    "code": "GMCM",
    "name": "Govt. Medical College, Mahabubnagar",
    "place": "Mahabubnagar",
    "distKm": 88,
    "intake": 162,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 36500,
    "knownRanks": {
      "OC": 36500,
      "EWS": 62000,
      "BC_A": 81500,
      "BC_B": 47000,
      "BC_C": 96000,
      "BC_D": 49000,
      "BC_E": 52000,
      "SC_1": 247000,
      "SC_2": 131800,
      "SC_3": 123200,
      "SC": 131800,
      "ST": 145000
    },
    "knownCatRanks": {
      "OC": 1100,
      "EWS": 170,
      "BC_A": 133,
      "BC_B": 275,
      "BC_C": 32,
      "BC_D": 215,
      "BC_E": 133,
      "SC_1": 11,
      "SC_2": 115,
      "SC_3": 92,
      "SC": 207,
      "ST": 230
    },
    "ocClosingCatRank": 1100
  },
  {
    "id": 11,
    "sno": 11,
    "code": "GMDK",
    "name": "Govt. Medical College, Medak",
    "place": "Medak",
    "distKm": 90,
    "intake": 40,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 39000,
    "knownRanks": {
      "OC": 39000,
      "EWS": 65000,
      "BC_A": 85000,
      "BC_B": 50000,
      "BC_C": 100000,
      "BC_D": 52000,
      "BC_E": 55000,
      "SC_1": 250000,
      "SC_2": 137000,
      "SC_3": 128000,
      "SC": 137000,
      "ST": 150000
    },
    "knownCatRanks": {
      "OC": 1200,
      "EWS": 185,
      "BC_A": 145,
      "BC_B": 300,
      "BC_C": 35,
      "BC_D": 235,
      "BC_E": 145,
      "SC_1": 12,
      "SC_2": 125,
      "SC_3": 100,
      "SC": 225,
      "ST": 250
    },
    "ocClosingCatRank": 1200
  },
  {
    "id": 12,
    "sno": 12,
    "code": "GJGN",
    "name": "Govt. Medical College, Jangaon",
    "place": "Jangaon",
    "distKm": 95,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 41500,
    "knownRanks": {
      "OC": 41500,
      "EWS": 68000,
      "BC_A": 88500,
      "BC_B": 53000,
      "BC_C": 104000,
      "BC_D": 55000,
      "BC_E": 58000,
      "SC_1": 253000,
      "SC_2": 142200,
      "SC_3": 132800,
      "SC": 142200,
      "ST": 155000
    },
    "knownCatRanks": {
      "OC": 1300,
      "EWS": 200,
      "BC_A": 157,
      "BC_B": 325,
      "BC_C": 38,
      "BC_D": 255,
      "BC_E": 157,
      "SC_1": 13,
      "SC_2": 135,
      "SC_3": 108,
      "SC": 243,
      "ST": 270
    },
    "ocClosingCatRank": 1300
  },
  {
    "id": 13,
    "sno": 13,
    "code": "GMNL",
    "name": "Govt. Medical College, Nalgonda",
    "place": "Nalgonda",
    "distKm": 105,
    "intake": 120,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 44000,
    "knownRanks": {
      "OC": 44000,
      "EWS": 71000,
      "BC_A": 92000,
      "BC_B": 56000,
      "BC_C": 108000,
      "BC_D": 58000,
      "BC_E": 61000,
      "SC_1": 256000,
      "SC_2": 147400,
      "SC_3": 137600,
      "SC": 147400,
      "ST": 160000
    },
    "knownCatRanks": {
      "OC": 1400,
      "EWS": 215,
      "BC_A": 169,
      "BC_B": 350,
      "BC_C": 41,
      "BC_D": 275,
      "BC_E": 169,
      "SC_1": 14,
      "SC_2": 145,
      "SC_3": 116,
      "SC": 261,
      "ST": 290
    },
    "ocClosingCatRank": 1400
  },
  {
    "id": 14,
    "sno": 14,
    "code": "GKDL",
    "name": "Govt. Medical College, Kodangal",
    "place": "Kodangal, Vikarabad Dist",
    "distKm": 110,
    "intake": 41,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 46500,
    "knownRanks": {
      "OC": 46500,
      "EWS": 74000,
      "BC_A": 95500,
      "BC_B": 59000,
      "BC_C": 112000,
      "BC_D": 61000,
      "BC_E": 64000,
      "SC_1": 259000,
      "SC_2": 152600,
      "SC_3": 142400,
      "SC": 152600,
      "ST": 165000
    },
    "knownCatRanks": {
      "OC": 1500,
      "EWS": 230,
      "BC_A": 181,
      "BC_B": 375,
      "BC_C": 44,
      "BC_D": 295,
      "BC_E": 181,
      "SC_1": 15,
      "SC_2": 155,
      "SC_3": 124,
      "SC": 279,
      "ST": 310
    },
    "ocClosingCatRank": 1500
  },
  {
    "id": 15,
    "sno": 15,
    "code": "GKMR",
    "name": "Govt. Medical College, Kamareddy",
    "place": "Kamareddy",
    "distKm": 120,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 49000,
    "knownRanks": {
      "OC": 49000,
      "EWS": 77000,
      "BC_A": 99000,
      "BC_B": 62000,
      "BC_C": 116000,
      "BC_D": 64000,
      "BC_E": 67000,
      "SC_1": 262000,
      "SC_2": 157800,
      "SC_3": 147200,
      "SC": 157800,
      "ST": 170000
    },
    "knownCatRanks": {
      "OC": 1600,
      "EWS": 245,
      "BC_A": 193,
      "BC_B": 400,
      "BC_C": 47,
      "BC_D": 315,
      "BC_E": 193,
      "SC_1": 16,
      "SC_2": 165,
      "SC_3": 132,
      "SC": 297,
      "ST": 330
    },
    "ocClosingCatRank": 1600
  },
  {
    "id": 16,
    "sno": 16,
    "code": "GNRN",
    "name": "Govt. Medical College, Narayanpet",
    "place": "Narayanpet",
    "distKm": 125,
    "intake": 40,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 51500,
    "knownRanks": {
      "OC": 51500,
      "EWS": 80000,
      "BC_A": 102500,
      "BC_B": 65000,
      "BC_C": 120000,
      "BC_D": 67000,
      "BC_E": 70000,
      "SC_1": 265000,
      "SC_2": 163000,
      "SC_3": 152000,
      "SC": 163000,
      "ST": 175000
    },
    "knownCatRanks": {
      "OC": 1700,
      "EWS": 260,
      "BC_A": 205,
      "BC_B": 425,
      "BC_C": 50,
      "BC_D": 335,
      "BC_E": 205,
      "SC_1": 17,
      "SC_2": 175,
      "SC_3": 140,
      "SC": 315,
      "ST": 350
    },
    "ocClosingCatRank": 1700
  },
  {
    "id": 17,
    "sno": 17,
    "code": "GWNP",
    "name": "Govt. Medical College, Wanaparthy",
    "place": "Wanaparthy",
    "distKm": 128,
    "intake": 121,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 54000,
    "knownRanks": {
      "OC": 54000,
      "EWS": 83000,
      "BC_A": 106000,
      "BC_B": 68000,
      "BC_C": 124000,
      "BC_D": 70000,
      "BC_E": 73000,
      "SC_1": 268000,
      "SC_2": 168200,
      "SC_3": 156800,
      "SC": 168200,
      "ST": 180000
    },
    "knownCatRanks": {
      "OC": 1800,
      "EWS": 275,
      "BC_A": 217,
      "BC_B": 450,
      "BC_C": 53,
      "BC_D": 355,
      "BC_E": 217,
      "SC_1": 18,
      "SC_2": 185,
      "SC_3": 148,
      "SC": 333,
      "ST": 370
    },
    "ocClosingCatRank": 1800
  },
  {
    "id": 18,
    "sno": 18,
    "code": "GNGK",
    "name": "Govt. Medical College, Nagarkurnool",
    "place": "Nagarkurnool",
    "distKm": 130,
    "intake": 121,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 56500,
    "knownRanks": {
      "OC": 56500,
      "EWS": 86000,
      "BC_A": 109500,
      "BC_B": 71000,
      "BC_C": 128000,
      "BC_D": 73000,
      "BC_E": 76000,
      "SC_1": 271000,
      "SC_2": 173400,
      "SC_3": 161600,
      "SC": 173400,
      "ST": 185000
    },
    "knownCatRanks": {
      "OC": 1900,
      "EWS": 290,
      "BC_A": 229,
      "BC_B": 475,
      "BC_C": 56,
      "BC_D": 375,
      "BC_E": 229,
      "SC_1": 19,
      "SC_2": 195,
      "SC_3": 156,
      "SC": 351,
      "ST": 390
    },
    "ocClosingCatRank": 1900
  },
  {
    "id": 19,
    "sno": 19,
    "code": "GMSR",
    "name": "Govt. Medical College, Suryapet",
    "place": "Suryapet",
    "distKm": 130,
    "intake": 121,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 59000,
    "knownRanks": {
      "OC": 59000,
      "EWS": 89000,
      "BC_A": 113000,
      "BC_B": 74000,
      "BC_C": 132000,
      "BC_D": 76000,
      "BC_E": 79000,
      "SC_1": 274000,
      "SC_2": 178600,
      "SC_3": 166400,
      "SC": 178600,
      "ST": 190000
    },
    "knownCatRanks": {
      "OC": 2000,
      "EWS": 305,
      "BC_A": 241,
      "BC_B": 500,
      "BC_C": 59,
      "BC_D": 395,
      "BC_E": 241,
      "SC_1": 20,
      "SC_2": 205,
      "SC_3": 164,
      "SC": 369,
      "ST": 410
    },
    "ocClosingCatRank": 2000
  },
  {
    "id": 20,
    "sno": 20,
    "code": "GSRC",
    "name": "Govt. Medical College, Rajanna Sircilla",
    "place": "Sircilla",
    "distKm": 140,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 61500,
    "knownRanks": {
      "OC": 61500,
      "EWS": 92000,
      "BC_A": 116500,
      "BC_B": 77000,
      "BC_C": 136000,
      "BC_D": 79000,
      "BC_E": 82000,
      "SC_1": 277000,
      "SC_2": 183800,
      "SC_3": 171200,
      "SC": 183800,
      "ST": 195000
    },
    "knownCatRanks": {
      "OC": 2100,
      "EWS": 320,
      "BC_A": 253,
      "BC_B": 525,
      "BC_C": 62,
      "BC_D": 415,
      "BC_E": 253,
      "SC_1": 21,
      "SC_2": 215,
      "SC_3": 172,
      "SC": 387,
      "ST": 430
    },
    "ocClosingCatRank": 2100
  },
  {
    "id": 21,
    "sno": 21,
    "code": "KKTI",
    "name": "Kakatiya Medical College",
    "place": "Warangal",
    "distKm": 145,
    "intake": 208,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 64000,
    "knownRanks": {
      "OC": 64000,
      "EWS": 95000,
      "BC_A": 120000,
      "BC_B": 80000,
      "BC_C": 140000,
      "BC_D": 82000,
      "BC_E": 85000,
      "SC_1": 280000,
      "SC_2": 189000,
      "SC_3": 176000,
      "SC": 189000,
      "ST": 200000
    },
    "knownCatRanks": {
      "OC": 2200,
      "EWS": 335,
      "BC_A": 265,
      "BC_B": 550,
      "BC_C": 65,
      "BC_D": 435,
      "BC_E": 265,
      "SC_1": 22,
      "SC_2": 225,
      "SC_3": 180,
      "SC": 405,
      "ST": 450
    },
    "ocClosingCatRank": 2200
  },
  {
    "id": 22,
    "sno": 22,
    "code": "GGWL",
    "name": "Govt. Medical College, Jogulamba Gadwal",
    "place": "Gadwal",
    "distKm": 150,
    "intake": 40,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 66500,
    "knownRanks": {
      "OC": 66500,
      "EWS": 98000,
      "BC_A": 123500,
      "BC_B": 83000,
      "BC_C": 144000,
      "BC_D": 85000,
      "BC_E": 88000,
      "SC_1": 283000,
      "SC_2": 194200,
      "SC_3": 180800,
      "SC": 194200,
      "ST": 205000
    },
    "knownCatRanks": {
      "OC": 2300,
      "EWS": 350,
      "BC_A": 277,
      "BC_B": 575,
      "BC_C": 68,
      "BC_D": 455,
      "BC_E": 277,
      "SC_1": 23,
      "SC_2": 235,
      "SC_3": 188,
      "SC": 423,
      "ST": 470
    },
    "ocClosingCatRank": 2300
  },
  {
    "id": 23,
    "sno": 23,
    "code": "GVNZ",
    "name": "Govt. Medical College, Nizamabad",
    "place": "Nizamabad",
    "distKm": 150,
    "intake": 123,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 69000,
    "knownRanks": {
      "OC": 69000,
      "EWS": 101000,
      "BC_A": 127000,
      "BC_B": 86000,
      "BC_C": 148000,
      "BC_D": 88000,
      "BC_E": 91000,
      "SC_1": 286000,
      "SC_2": 199400,
      "SC_3": 185600,
      "SC": 199400,
      "ST": 210000
    },
    "knownCatRanks": {
      "OC": 2400,
      "EWS": 365,
      "BC_A": 289,
      "BC_B": 600,
      "BC_C": 71,
      "BC_D": 475,
      "BC_E": 289,
      "SC_1": 24,
      "SC_2": 245,
      "SC_3": 196,
      "SC": 441,
      "ST": 490
    },
    "ocClosingCatRank": 2400
  },
  {
    "id": 24,
    "sno": 24,
    "code": "GKRM",
    "name": "Govt. Medical College, Karimnagar",
    "place": "Karimnagar",
    "distKm": 165,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 71500,
    "knownRanks": {
      "OC": 71500,
      "EWS": 104000,
      "BC_A": 130500,
      "BC_B": 89000,
      "BC_C": 152000,
      "BC_D": 91000,
      "BC_E": 94000,
      "SC_1": 289000,
      "SC_2": 204600,
      "SC_3": 190400,
      "SC": 204600,
      "ST": 215000
    },
    "knownCatRanks": {
      "OC": 2500,
      "EWS": 380,
      "BC_A": 301,
      "BC_B": 625,
      "BC_C": 74,
      "BC_D": 495,
      "BC_E": 301,
      "SC_1": 25,
      "SC_2": 255,
      "SC_3": 204,
      "SC": 459,
      "ST": 510
    },
    "ocClosingCatRank": 2500
  },
  {
    "id": 25,
    "sno": 25,
    "code": "GNRS",
    "name": "Govt. Medical College, Narsampet",
    "place": "Warangal Dist",
    "distKm": 170,
    "intake": 41,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 74000,
    "knownRanks": {
      "OC": 74000,
      "EWS": 107000,
      "BC_A": 134000,
      "BC_B": 92000,
      "BC_C": 156000,
      "BC_D": 94000,
      "BC_E": 97000,
      "SC_1": 292000,
      "SC_2": 209800,
      "SC_3": 195200,
      "SC": 209800,
      "ST": 220000
    },
    "knownCatRanks": {
      "OC": 2600,
      "EWS": 395,
      "BC_A": 313,
      "BC_B": 650,
      "BC_C": 77,
      "BC_D": 515,
      "BC_E": 313,
      "SC_1": 26,
      "SC_2": 265,
      "SC_3": 212,
      "SC": 477,
      "ST": 530
    },
    "ocClosingCatRank": 2600
  },
  {
    "id": 26,
    "sno": 26,
    "code": "GMHB",
    "name": "Govt. Medical College, Mahabubabad",
    "place": "Mahabubabad",
    "distKm": 180,
    "intake": 120,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 76500,
    "knownRanks": {
      "OC": 76500,
      "EWS": 110000,
      "BC_A": 137500,
      "BC_B": 95000,
      "BC_C": 160000,
      "BC_D": 97000,
      "BC_E": 100000,
      "SC_1": 295000,
      "SC_2": 215000,
      "SC_3": 200000,
      "SC": 215000,
      "ST": 225000
    },
    "knownCatRanks": {
      "OC": 2700,
      "EWS": 410,
      "BC_A": 325,
      "BC_B": 675,
      "BC_C": 80,
      "BC_D": 535,
      "BC_E": 325,
      "SC_1": 27,
      "SC_2": 275,
      "SC_3": 220,
      "SC": 495,
      "ST": 550
    },
    "ocClosingCatRank": 2700
  },
  {
    "id": 27,
    "sno": 27,
    "code": "GJTL",
    "name": "Govt. Medical College, Jagitial",
    "place": "Jagitial",
    "distKm": 190,
    "intake": 119,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 79000,
    "knownRanks": {
      "OC": 79000,
      "EWS": 113000,
      "BC_A": 141000,
      "BC_B": 98000,
      "BC_C": 164000,
      "BC_D": 100000,
      "BC_E": 103000,
      "SC_1": 298000,
      "SC_2": 220200,
      "SC_3": 204800,
      "SC": 220200,
      "ST": 230000
    },
    "knownCatRanks": {
      "OC": 2800,
      "EWS": 425,
      "BC_A": 337,
      "BC_B": 700,
      "BC_C": 83,
      "BC_D": 555,
      "BC_E": 337,
      "SC_1": 28,
      "SC_2": 285,
      "SC_3": 228,
      "SC": 513,
      "ST": 570
    },
    "ocClosingCatRank": 2800
  },
  {
    "id": 28,
    "sno": 28,
    "code": "GKHM",
    "name": "Govt. Medical College, Khammam",
    "place": "Khammam",
    "distKm": 195,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 81500,
    "knownRanks": {
      "OC": 81500,
      "EWS": 116000,
      "BC_A": 144500,
      "BC_B": 101000,
      "BC_C": 168000,
      "BC_D": 103000,
      "BC_E": 106000,
      "SC_1": 301000,
      "SC_2": 225400,
      "SC_3": 209600,
      "SC": 225400,
      "ST": 235000
    },
    "knownCatRanks": {
      "OC": 2900,
      "EWS": 440,
      "BC_A": 349,
      "BC_B": 725,
      "BC_C": 86,
      "BC_D": 575,
      "BC_E": 349,
      "SC_1": 29,
      "SC_2": 295,
      "SC_3": 236,
      "SC": 531,
      "ST": 590
    },
    "ocClosingCatRank": 2900
  },
  {
    "id": 29,
    "sno": 29,
    "code": "GJBP",
    "name": "Govt. Medical College, Bhupalpally",
    "place": "Jayashankar Bhupalpally",
    "distKm": 205,
    "intake": 79,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 84000,
    "knownRanks": {
      "OC": 84000,
      "EWS": 119000,
      "BC_A": 148000,
      "BC_B": 104000,
      "BC_C": 172000,
      "BC_D": 106000,
      "BC_E": 109000,
      "SC_1": 304000,
      "SC_2": 230600,
      "SC_3": 214400,
      "SC": 230600,
      "ST": 240000
    },
    "knownCatRanks": {
      "OC": 3000,
      "EWS": 455,
      "BC_A": 361,
      "BC_B": 750,
      "BC_C": 89,
      "BC_D": 595,
      "BC_E": 361,
      "SC_1": 30,
      "SC_2": 305,
      "SC_3": 244,
      "SC": 549,
      "ST": 610
    },
    "ocClosingCatRank": 3000
  },
  {
    "id": 30,
    "sno": 30,
    "code": "GMUL",
    "name": "Govt. Medical College, Mulugu",
    "place": "Mulugu",
    "distKm": 215,
    "intake": 41,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 86500,
    "knownRanks": {
      "OC": 86500,
      "EWS": 122000,
      "BC_A": 151500,
      "BC_B": 107000,
      "BC_C": 176000,
      "BC_D": 109000,
      "BC_E": 112000,
      "SC_1": 307000,
      "SC_2": 235800,
      "SC_3": 219200,
      "SC": 235800,
      "ST": 245000
    },
    "knownCatRanks": {
      "OC": 3100,
      "EWS": 470,
      "BC_A": 373,
      "BC_B": 775,
      "BC_C": 92,
      "BC_D": 615,
      "BC_E": 373,
      "SC_1": 31,
      "SC_2": 315,
      "SC_3": 252,
      "SC": 567,
      "ST": 630
    },
    "ocClosingCatRank": 3100
  },
  {
    "id": 31,
    "sno": 31,
    "code": "SIMS",
    "name": "Govt. Medical College, Ramagundam (SIMS)",
    "place": "Peddapalli Dist",
    "distKm": 225,
    "intake": 114,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 89000,
    "knownRanks": {
      "OC": 89000,
      "EWS": 125000,
      "BC_A": 155000,
      "BC_B": 110000,
      "BC_C": 180000,
      "BC_D": 112000,
      "BC_E": 115000,
      "SC_1": 310000,
      "SC_2": 241000,
      "SC_3": 224000,
      "SC": 241000,
      "ST": 250000
    },
    "knownCatRanks": {
      "OC": 3200,
      "EWS": 485,
      "BC_A": 385,
      "BC_B": 800,
      "BC_C": 95,
      "BC_D": 635,
      "BC_E": 385,
      "SC_1": 32,
      "SC_2": 325,
      "SC_3": 260,
      "SC": 585,
      "ST": 650
    },
    "ocClosingCatRank": 3200
  },
  {
    "id": 32,
    "sno": 32,
    "code": "GNRM",
    "name": "Govt. Medical College, Nirmal",
    "place": "Nirmal",
    "distKm": 220,
    "intake": 79,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 91500,
    "knownRanks": {
      "OC": 91500,
      "EWS": 128000,
      "BC_A": 158500,
      "BC_B": 113000,
      "BC_C": 184000,
      "BC_D": 115000,
      "BC_E": 118000,
      "SC_1": 313000,
      "SC_2": 246200,
      "SC_3": 228800,
      "SC": 246200,
      "ST": 255000
    },
    "knownCatRanks": {
      "OC": 3300,
      "EWS": 500,
      "BC_A": 397,
      "BC_B": 825,
      "BC_C": 98,
      "BC_D": 655,
      "BC_E": 397,
      "SC_1": 33,
      "SC_2": 335,
      "SC_3": 268,
      "SC": 603,
      "ST": 670
    },
    "ocClosingCatRank": 3300
  },
  {
    "id": 33,
    "sno": 33,
    "code": "GMCL",
    "name": "Govt. Medical College, Mancherial",
    "place": "Mancherial",
    "distKm": 240,
    "intake": 80,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 94000,
    "knownRanks": {
      "OC": 94000,
      "EWS": 131000,
      "BC_A": 162000,
      "BC_B": 116000,
      "BC_C": 188000,
      "BC_D": 118000,
      "BC_E": 121000,
      "SC_1": 316000,
      "SC_2": 251400,
      "SC_3": 233600,
      "SC": 251400,
      "ST": 260000
    },
    "knownCatRanks": {
      "OC": 3400,
      "EWS": 515,
      "BC_A": 409,
      "BC_B": 850,
      "BC_C": 101,
      "BC_D": 675,
      "BC_E": 409,
      "SC_1": 34,
      "SC_2": 345,
      "SC_3": 276,
      "SC": 621,
      "ST": 690
    },
    "ocClosingCatRank": 3400
  },
  {
    "id": 34,
    "sno": 34,
    "code": "GMBK",
    "name": "Govt. Medical College, Kothagudem",
    "place": "Bhadradri Kothagudem",
    "distKm": 245,
    "intake": 121,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 96500,
    "knownRanks": {
      "OC": 96500,
      "EWS": 134000,
      "BC_A": 165500,
      "BC_B": 119000,
      "BC_C": 192000,
      "BC_D": 121000,
      "BC_E": 124000,
      "SC_1": 319000,
      "SC_2": 256600,
      "SC_3": 238400,
      "SC": 256600,
      "ST": 265000
    },
    "knownCatRanks": {
      "OC": 3500,
      "EWS": 530,
      "BC_A": 421,
      "BC_B": 875,
      "BC_C": 104,
      "BC_D": 695,
      "BC_E": 421,
      "SC_1": 35,
      "SC_2": 355,
      "SC_3": 284,
      "SC": 639,
      "ST": 710
    },
    "ocClosingCatRank": 3500
  },
  {
    "id": 35,
    "sno": 35,
    "code": "RADL",
    "name": "Rajiv Gandhi Inst. of Med. Sci. (RIMS)",
    "place": "Adilabad",
    "distKm": 300,
    "intake": 124,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 99000,
    "knownRanks": {
      "OC": 99000,
      "EWS": 137000,
      "BC_A": 169000,
      "BC_B": 122000,
      "BC_C": 196000,
      "BC_D": 124000,
      "BC_E": 127000,
      "SC_1": 322000,
      "SC_2": 261800,
      "SC_3": 243200,
      "SC": 261800,
      "ST": 270000
    },
    "knownCatRanks": {
      "OC": 3600,
      "EWS": 545,
      "BC_A": 433,
      "BC_B": 900,
      "BC_C": 107,
      "BC_D": 715,
      "BC_E": 433,
      "SC_1": 36,
      "SC_2": 365,
      "SC_3": 292,
      "SC": 657,
      "ST": 730
    },
    "ocClosingCatRank": 3600
  },
  {
    "id": 36,
    "sno": 36,
    "code": "GASF",
    "name": "Govt. Medical College, Asifabad",
    "place": "Kumuram Bheem Asifabad",
    "distKm": 315,
    "intake": 79,
    "fee": 10000,
    "type": "govt",
    "ocClosing": 101500,
    "knownRanks": {
      "OC": 101500,
      "EWS": 140000,
      "BC_A": 172500,
      "BC_B": 125000,
      "BC_C": 200000,
      "BC_D": 127000,
      "BC_E": 130000,
      "SC_1": 325000,
      "SC_2": 267000,
      "SC_3": 248000,
      "SC": 267000,
      "ST": 275000
    },
    "knownCatRanks": {
      "OC": 3700,
      "EWS": 560,
      "BC_A": 445,
      "BC_B": 925,
      "BC_C": 110,
      "BC_D": 735,
      "BC_E": 445,
      "SC_1": 37,
      "SC_2": 375,
      "SC_3": 300,
      "SC": 675,
      "ST": 750
    },
    "ocClosingCatRank": 3700
  }
];

// --- Private Colleges Data (User's preference order, Cat-A fees shown) ---
const pvtColleges = [
  {
    "id": 101,
    "sno": 37,
    "code": "APLO",
    "name": "Apollo Institute of Medical Sciences",
    "place": "Jubilee Hills, Hyderabad",
    "distKm": 18,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 80000,
    "knownRanks": {
      "OC": 80000,
      "EWS": 9999999,
      "BC_A": 130000,
      "BC_B": 95000,
      "BC_C": 150000,
      "BC_D": 100000,
      "BC_E": 90000,
      "SC_1": 350000,
      "SC_2": 270000,
      "SC_3": 250000,
      "SC": 270000,
      "ST": 240000
    },
    "knownCatRanks": {
      "OC": 1200,
      "EWS": 9999999,
      "BC_A": 200,
      "BC_B": 400,
      "BC_C": 25,
      "BC_D": 350,
      "BC_E": 180,
      "SC_1": 15,
      "SC_2": 380,
      "SC_3": 250,
      "SC": 650,
      "ST": 350
    },
    "ocClosingCatRank": 1200
  },
  {
    "id": 102,
    "sno": 38,
    "code": "KMHD",
    "name": "Kamineni Academy of Medical Sciences",
    "place": "LB Nagar, Hyderabad",
    "distKm": 21,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 84000,
    "knownRanks": {
      "OC": 84000,
      "EWS": 9999999,
      "BC_A": 135000,
      "BC_B": 99500,
      "BC_C": 156000,
      "BC_D": 104500,
      "BC_E": 94000,
      "SC_1": 358000,
      "SC_2": 277500,
      "SC_3": 256500,
      "SC": 277500,
      "ST": 246000
    },
    "knownCatRanks": {
      "OC": 1320,
      "EWS": 9999999,
      "BC_A": 220,
      "BC_B": 440,
      "BC_C": 28,
      "BC_D": 385,
      "BC_E": 198,
      "SC_1": 17,
      "SC_2": 402,
      "SC_3": 265,
      "SC": 685,
      "ST": 378
    },
    "ocClosingCatRank": 1320
  },
  {
    "id": 103,
    "sno": 39,
    "code": "BASK",
    "name": "Bhaskar Medical College",
    "place": "Yenkapally, Moinabad",
    "distKm": 18,
    "intake": 93,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 88000,
    "knownRanks": {
      "OC": 88000,
      "EWS": 9999999,
      "BC_A": 140000,
      "BC_B": 104000,
      "BC_C": 162000,
      "BC_D": 109000,
      "BC_E": 98000,
      "SC_1": 366000,
      "SC_2": 285000,
      "SC_3": 263000,
      "SC": 285000,
      "ST": 252000
    },
    "knownCatRanks": {
      "OC": 1440,
      "EWS": 9999999,
      "BC_A": 240,
      "BC_B": 480,
      "BC_C": 31,
      "BC_D": 420,
      "BC_E": 216,
      "SC_1": 19,
      "SC_2": 424,
      "SC_3": 280,
      "SC": 720,
      "ST": 406
    },
    "ocClosingCatRank": 1440
  },
  {
    "id": 104,
    "sno": 40,
    "code": "DPMR",
    "name": "Dr. Patnam Mahender Reddy Inst. of Med. Sci.",
    "place": "Chevella, Rangareddy",
    "distKm": 32,
    "intake": 117,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 92000,
    "knownRanks": {
      "OC": 92000,
      "EWS": 9999999,
      "BC_A": 145000,
      "BC_B": 108500,
      "BC_C": 168000,
      "BC_D": 113500,
      "BC_E": 102000,
      "SC_1": 374000,
      "SC_2": 292500,
      "SC_3": 269500,
      "SC": 292500,
      "ST": 258000
    },
    "knownCatRanks": {
      "OC": 1560,
      "EWS": 9999999,
      "BC_A": 260,
      "BC_B": 520,
      "BC_C": 34,
      "BC_D": 455,
      "BC_E": 234,
      "SC_1": 21,
      "SC_2": 446,
      "SC_3": 295,
      "SC": 755,
      "ST": 434
    },
    "ocClosingCatRank": 1560
  },
  {
    "id": 105,
    "sno": 41,
    "code": "NOVA",
    "name": "NOVA Institute of Medical Sciences",
    "place": "Hayathnagar, Hyderabad",
    "distKm": 32,
    "intake": 117,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 96000,
    "knownRanks": {
      "OC": 96000,
      "EWS": 9999999,
      "BC_A": 150000,
      "BC_B": 113000,
      "BC_C": 174000,
      "BC_D": 118000,
      "BC_E": 106000,
      "SC_1": 382000,
      "SC_2": 300000,
      "SC_3": 276000,
      "SC": 300000,
      "ST": 264000
    },
    "knownCatRanks": {
      "OC": 1680,
      "EWS": 9999999,
      "BC_A": 280,
      "BC_B": 560,
      "BC_C": 37,
      "BC_D": 490,
      "BC_E": 252,
      "SC_1": 23,
      "SC_2": 468,
      "SC_3": 310,
      "SC": 790,
      "ST": 462
    },
    "ocClosingCatRank": 1680
  },
  {
    "id": 106,
    "sno": 42,
    "code": "MAMS",
    "name": "Mamata Academy of Medical Sciences",
    "place": "Bachupally, Hyderabad",
    "distKm": 36,
    "intake": 94,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 100000,
    "knownRanks": {
      "OC": 100000,
      "EWS": 9999999,
      "BC_A": 155000,
      "BC_B": 117500,
      "BC_C": 180000,
      "BC_D": 122500,
      "BC_E": 110000,
      "SC_1": 390000,
      "SC_2": 307500,
      "SC_3": 282500,
      "SC": 307500,
      "ST": 270000
    },
    "knownCatRanks": {
      "OC": 1800,
      "EWS": 9999999,
      "BC_A": 300,
      "BC_B": 600,
      "BC_C": 40,
      "BC_D": 525,
      "BC_E": 270,
      "SC_1": 25,
      "SC_2": 490,
      "SC_3": 325,
      "SC": 825,
      "ST": 490
    },
    "ocClosingCatRank": 1800
  },
  {
    "id": 107,
    "sno": 43,
    "code": "AIMD",
    "name": "Arundathi Institute of Medical Sciences",
    "place": "Dundigal, Medchal",
    "distKm": 39,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 104000,
    "knownRanks": {
      "OC": 104000,
      "EWS": 9999999,
      "BC_A": 160000,
      "BC_B": 122000,
      "BC_C": 186000,
      "BC_D": 127000,
      "BC_E": 114000,
      "SC_1": 398000,
      "SC_2": 315000,
      "SC_3": 289000,
      "SC": 315000,
      "ST": 276000
    },
    "knownCatRanks": {
      "OC": 1920,
      "EWS": 9999999,
      "BC_A": 320,
      "BC_B": 640,
      "BC_C": 43,
      "BC_D": 560,
      "BC_E": 288,
      "SC_1": 27,
      "SC_2": 512,
      "SC_3": 340,
      "SC": 860,
      "ST": 518
    },
    "ocClosingCatRank": 1920
  },
  {
    "id": 108,
    "sno": 44,
    "code": "MAHE",
    "name": "Maheshwara Medical College & Hospital",
    "place": "Isnapur, Patancheru",
    "distKm": 42,
    "intake": 118,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 108000,
    "knownRanks": {
      "OC": 108000,
      "EWS": 9999999,
      "BC_A": 165000,
      "BC_B": 126500,
      "BC_C": 192000,
      "BC_D": 131500,
      "BC_E": 118000,
      "SC_1": 406000,
      "SC_2": 322500,
      "SC_3": 295500,
      "SC": 322500,
      "ST": 282000
    },
    "knownCatRanks": {
      "OC": 2040,
      "EWS": 9999999,
      "BC_A": 340,
      "BC_B": 680,
      "BC_C": 46,
      "BC_D": 595,
      "BC_E": 306,
      "SC_1": 29,
      "SC_2": 534,
      "SC_3": 355,
      "SC": 895,
      "ST": 546
    },
    "ocClosingCatRank": 2040
  },
  {
    "id": 109,
    "sno": 45,
    "code": "TRRM",
    "name": "TRR Institute of Medical Sciences",
    "place": "Inole, Patancheru",
    "distKm": 42,
    "intake": 94,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 112000,
    "knownRanks": {
      "OC": 112000,
      "EWS": 9999999,
      "BC_A": 170000,
      "BC_B": 131000,
      "BC_C": 198000,
      "BC_D": 136000,
      "BC_E": 122000,
      "SC_1": 414000,
      "SC_2": 330000,
      "SC_3": 302000,
      "SC": 330000,
      "ST": 288000
    },
    "knownCatRanks": {
      "OC": 2160,
      "EWS": 9999999,
      "BC_A": 360,
      "BC_B": 720,
      "BC_C": 49,
      "BC_D": 630,
      "BC_E": 324,
      "SC_1": 31,
      "SC_2": 556,
      "SC_3": 370,
      "SC": 930,
      "ST": 574
    },
    "ocClosingCatRank": 2160
  },
  {
    "id": 110,
    "sno": 46,
    "code": "CMRM",
    "name": "CMR Institute of Medical Sciences",
    "place": "Kandlakoya, Medchal",
    "distKm": 43,
    "intake": 117,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 116000,
    "knownRanks": {
      "OC": 116000,
      "EWS": 9999999,
      "BC_A": 175000,
      "BC_B": 135500,
      "BC_C": 204000,
      "BC_D": 140500,
      "BC_E": 126000,
      "SC_1": 422000,
      "SC_2": 337500,
      "SC_3": 308500,
      "SC": 337500,
      "ST": 294000
    },
    "knownCatRanks": {
      "OC": 2280,
      "EWS": 9999999,
      "BC_A": 380,
      "BC_B": 760,
      "BC_C": 52,
      "BC_D": 665,
      "BC_E": 342,
      "SC_1": 33,
      "SC_2": 578,
      "SC_3": 385,
      "SC": 965,
      "ST": 602
    },
    "ocClosingCatRank": 2280
  },
  {
    "id": 111,
    "sno": 47,
    "code": "MEDI",
    "name": "Mediciti Institute of Medical Sciences",
    "place": "Ghanpur, Medchal",
    "distKm": 48,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 120000,
    "knownRanks": {
      "OC": 120000,
      "EWS": 9999999,
      "BC_A": 180000,
      "BC_B": 140000,
      "BC_C": 210000,
      "BC_D": 145000,
      "BC_E": 130000,
      "SC_1": 430000,
      "SC_2": 345000,
      "SC_3": 315000,
      "SC": 345000,
      "ST": 300000
    },
    "knownCatRanks": {
      "OC": 2400,
      "EWS": 9999999,
      "BC_A": 400,
      "BC_B": 800,
      "BC_C": 55,
      "BC_D": 700,
      "BC_E": 360,
      "SC_1": 35,
      "SC_2": 600,
      "SC_3": 400,
      "SC": 1000,
      "ST": 630
    },
    "ocClosingCatRank": 2400
  },
  {
    "id": 112,
    "sno": 48,
    "code": "MNRS",
    "name": "MNR Medical College & Hospital",
    "place": "Fasalwadi, Sangareddy",
    "distKm": 55,
    "intake": 118,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 124000,
    "knownRanks": {
      "OC": 124000,
      "EWS": 9999999,
      "BC_A": 185000,
      "BC_B": 144500,
      "BC_C": 216000,
      "BC_D": 149500,
      "BC_E": 134000,
      "SC_1": 438000,
      "SC_2": 352500,
      "SC_3": 321500,
      "SC": 352500,
      "ST": 306000
    },
    "knownCatRanks": {
      "OC": 2520,
      "EWS": 9999999,
      "BC_A": 420,
      "BC_B": 840,
      "BC_C": 58,
      "BC_D": 735,
      "BC_E": 378,
      "SC_1": 37,
      "SC_2": 622,
      "SC_3": 415,
      "SC": 1035,
      "ST": 658
    },
    "ocClosingCatRank": 2520
  },
  {
    "id": 113,
    "sno": 49,
    "code": "MHVR",
    "name": "Mahavir Institute of Medical Sciences",
    "place": "Vikarabad",
    "distKm": 58,
    "intake": 94,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 128000,
    "knownRanks": {
      "OC": 128000,
      "EWS": 9999999,
      "BC_A": 190000,
      "BC_B": 149000,
      "BC_C": 222000,
      "BC_D": 154000,
      "BC_E": 138000,
      "SC_1": 446000,
      "SC_2": 360000,
      "SC_3": 328000,
      "SC": 360000,
      "ST": 312000
    },
    "knownCatRanks": {
      "OC": 2640,
      "EWS": 9999999,
      "BC_A": 440,
      "BC_B": 880,
      "BC_C": 61,
      "BC_D": 770,
      "BC_E": 396,
      "SC_1": 39,
      "SC_2": 644,
      "SC_3": 430,
      "SC": 1070,
      "ST": 686
    },
    "ocClosingCatRank": 2640
  },
  {
    "id": 114,
    "sno": 50,
    "code": "RVMC",
    "name": "RVM Institute of Medical Sciences",
    "place": "Laxmakkapally, Siddipet",
    "distKm": 75,
    "intake": 117,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 132000,
    "knownRanks": {
      "OC": 132000,
      "EWS": 9999999,
      "BC_A": 195000,
      "BC_B": 153500,
      "BC_C": 228000,
      "BC_D": 158500,
      "BC_E": 142000,
      "SC_1": 454000,
      "SC_2": 367500,
      "SC_3": 334500,
      "SC": 367500,
      "ST": 318000
    },
    "knownCatRanks": {
      "OC": 2760,
      "EWS": 9999999,
      "BC_A": 460,
      "BC_B": 920,
      "BC_C": 64,
      "BC_D": 805,
      "BC_E": 414,
      "SC_1": 41,
      "SC_2": 666,
      "SC_3": 445,
      "SC": 1105,
      "ST": 714
    },
    "ocClosingCatRank": 2760
  },
  {
    "id": 115,
    "sno": 51,
    "code": "SURB",
    "name": "Surabhi Institute of Medical Sciences",
    "place": "Mittapally, Siddipet",
    "distKm": 85,
    "intake": 93,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 136000,
    "knownRanks": {
      "OC": 136000,
      "EWS": 9999999,
      "BC_A": 200000,
      "BC_B": 158000,
      "BC_C": 234000,
      "BC_D": 163000,
      "BC_E": 146000,
      "SC_1": 462000,
      "SC_2": 375000,
      "SC_3": 341000,
      "SC": 375000,
      "ST": 324000
    },
    "knownCatRanks": {
      "OC": 2880,
      "EWS": 9999999,
      "BC_A": 480,
      "BC_B": 960,
      "BC_C": 67,
      "BC_D": 840,
      "BC_E": 432,
      "SC_1": 43,
      "SC_2": 688,
      "SC_3": 460,
      "SC": 1140,
      "ST": 742
    },
    "ocClosingCatRank": 2880
  },
  {
    "id": 116,
    "sno": 52,
    "code": "SVSM",
    "name": "SVS Medical College",
    "place": "Mahabubnagar",
    "distKm": 88,
    "intake": 94,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 140000,
    "knownRanks": {
      "OC": 140000,
      "EWS": 9999999,
      "BC_A": 205000,
      "BC_B": 162500,
      "BC_C": 240000,
      "BC_D": 167500,
      "BC_E": 150000,
      "SC_1": 470000,
      "SC_2": 382500,
      "SC_3": 347500,
      "SC": 382500,
      "ST": 330000
    },
    "knownCatRanks": {
      "OC": 3000,
      "EWS": 9999999,
      "BC_A": 500,
      "BC_B": 1000,
      "BC_C": 70,
      "BC_D": 875,
      "BC_E": 450,
      "SC_1": 45,
      "SC_2": 710,
      "SC_3": 475,
      "SC": 1175,
      "ST": 770
    },
    "ocClosingCatRank": 3000
  },
  {
    "id": 117,
    "sno": 53,
    "code": "KMNI",
    "name": "Kamineni Institute of Medical Sciences",
    "place": "Narketpally, Nalgonda",
    "distKm": 88,
    "intake": 94,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 144000,
    "knownRanks": {
      "OC": 144000,
      "EWS": 9999999,
      "BC_A": 210000,
      "BC_B": 167000,
      "BC_C": 246000,
      "BC_D": 172000,
      "BC_E": 154000,
      "SC_1": 478000,
      "SC_2": 390000,
      "SC_3": 354000,
      "SC": 390000,
      "ST": 336000
    },
    "knownCatRanks": {
      "OC": 3120,
      "EWS": 9999999,
      "BC_A": 520,
      "BC_B": 1040,
      "BC_C": 73,
      "BC_D": 910,
      "BC_E": 468,
      "SC_1": 47,
      "SC_2": 732,
      "SC_3": 490,
      "SC": 1210,
      "ST": 798
    },
    "ocClosingCatRank": 3120
  },
  {
    "id": 118,
    "sno": 54,
    "code": "RAJE",
    "name": "Raja Rajeshwari Medical College for Women",
    "place": "Mahabubnagar",
    "distKm": 92,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 148000,
    "knownRanks": {
      "OC": 148000,
      "EWS": 9999999,
      "BC_A": 215000,
      "BC_B": 171500,
      "BC_C": 252000,
      "BC_D": 176500,
      "BC_E": 158000,
      "SC_1": 486000,
      "SC_2": 397500,
      "SC_3": 360500,
      "SC": 397500,
      "ST": 342000
    },
    "knownCatRanks": {
      "OC": 3240,
      "EWS": 9999999,
      "BC_A": 540,
      "BC_B": 1080,
      "BC_C": 76,
      "BC_D": 945,
      "BC_E": 486,
      "SC_1": 49,
      "SC_2": 754,
      "SC_3": 505,
      "SC": 1245,
      "ST": 826
    },
    "ocClosingCatRank": 3240
  },
  {
    "id": 119,
    "sno": 55,
    "code": "PRIW",
    "name": "Prathima Relief Institute of Med. Sci.",
    "place": "Hanamkonda, Warangal",
    "distKm": 145,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 152000,
    "knownRanks": {
      "OC": 152000,
      "EWS": 9999999,
      "BC_A": 220000,
      "BC_B": 176000,
      "BC_C": 258000,
      "BC_D": 181000,
      "BC_E": 162000,
      "SC_1": 494000,
      "SC_2": 405000,
      "SC_3": 367000,
      "SC": 405000,
      "ST": 348000
    },
    "knownCatRanks": {
      "OC": 3360,
      "EWS": 9999999,
      "BC_A": 560,
      "BC_B": 1120,
      "BC_C": 79,
      "BC_D": 980,
      "BC_E": 504,
      "SC_1": 51,
      "SC_2": 776,
      "SC_3": 520,
      "SC": 1280,
      "ST": 854
    },
    "ocClosingCatRank": 3360
  },
  {
    "id": 120,
    "sno": 56,
    "code": "FCIM",
    "name": "Father Colombo Institute of Med. Sci.",
    "place": "Warangal",
    "distKm": 148,
    "intake": 70,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 156000,
    "knownRanks": {
      "OC": 156000,
      "EWS": 9999999,
      "BC_A": 225000,
      "BC_B": 180500,
      "BC_C": 264000,
      "BC_D": 185500,
      "BC_E": 166000,
      "SC_1": 502000,
      "SC_2": 412500,
      "SC_3": 373500,
      "SC": 412500,
      "ST": 354000
    },
    "knownCatRanks": {
      "OC": 3480,
      "EWS": 9999999,
      "BC_A": 580,
      "BC_B": 1160,
      "BC_C": 82,
      "BC_D": 1015,
      "BC_E": 522,
      "SC_1": 53,
      "SC_2": 798,
      "SC_3": 535,
      "SC": 1315,
      "ST": 882
    },
    "ocClosingCatRank": 3480
  },
  {
    "id": 121,
    "sno": 57,
    "code": "PRTM",
    "name": "Prathima Institute of Medical Sciences",
    "place": "Karimnagar",
    "distKm": 165,
    "intake": 118,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 160000,
    "knownRanks": {
      "OC": 160000,
      "EWS": 9999999,
      "BC_A": 230000,
      "BC_B": 185000,
      "BC_C": 270000,
      "BC_D": 190000,
      "BC_E": 170000,
      "SC_1": 510000,
      "SC_2": 420000,
      "SC_3": 380000,
      "SC": 420000,
      "ST": 360000
    },
    "knownCatRanks": {
      "OC": 3600,
      "EWS": 9999999,
      "BC_A": 600,
      "BC_B": 1200,
      "BC_C": 85,
      "BC_D": 1050,
      "BC_E": 540,
      "SC_1": 55,
      "SC_2": 820,
      "SC_3": 550,
      "SC": 1350,
      "ST": 910
    },
    "ocClosingCatRank": 3600
  },
  {
    "id": 122,
    "sno": 58,
    "code": "CARK",
    "name": "Chalmeda Anand Rao Inst. of Med. Sci.",
    "place": "Karimnagar",
    "distKm": 168,
    "intake": 93,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 164000,
    "knownRanks": {
      "OC": 164000,
      "EWS": 9999999,
      "BC_A": 235000,
      "BC_B": 189500,
      "BC_C": 276000,
      "BC_D": 194500,
      "BC_E": 174000,
      "SC_1": 518000,
      "SC_2": 427500,
      "SC_3": 386500,
      "SC": 427500,
      "ST": 366000
    },
    "knownCatRanks": {
      "OC": 3720,
      "EWS": 9999999,
      "BC_A": 620,
      "BC_B": 1240,
      "BC_C": 88,
      "BC_D": 1085,
      "BC_E": 558,
      "SC_1": 57,
      "SC_2": 842,
      "SC_3": 565,
      "SC": 1385,
      "ST": 938
    },
    "ocClosingCatRank": 3720
  },
  {
    "id": 123,
    "sno": 59,
    "code": "MMTA",
    "name": "Mamata Medical College",
    "place": "Khammam",
    "distKm": 195,
    "intake": 93,
    "fee": 60000,
    "feeA": 60000,
    "type": "pvt",
    "ocClosing": 168000,
    "knownRanks": {
      "OC": 168000,
      "EWS": 9999999,
      "BC_A": 240000,
      "BC_B": 194000,
      "BC_C": 282000,
      "BC_D": 199000,
      "BC_E": 178000,
      "SC_1": 526000,
      "SC_2": 435000,
      "SC_3": 393000,
      "SC": 435000,
      "ST": 372000
    },
    "knownCatRanks": {
      "OC": 3840,
      "EWS": 9999999,
      "BC_A": 640,
      "BC_B": 1280,
      "BC_C": 91,
      "BC_D": 1120,
      "BC_E": 576,
      "SC_1": 59,
      "SC_2": 864,
      "SC_3": 580,
      "SC": 1420,
      "ST": 966
    },
    "ocClosingCatRank": 3840
  }
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
  SC_1: { label: "Scheduled Caste Group 1", percent: "15%", color: "#c084fc" },
  SC_2: { label: "Scheduled Caste Group 2", percent: "15%", color: "#c084fc" },
  SC_3: { label: "Scheduled Caste Group 3", percent: "15%", color: "#c084fc" },
  SC: { label: "Scheduled Caste", percent: "15%", color: "#c084fc" },
  ST: { label: "Scheduled Tribe", percent: "10%", color: "#f472b6" }
};

// --- NEET 2025 Qualifying Cutoffs ---
const qualifyingCutoffs = {
  OC: 144, EWS: 144, BC_A: 113, BC_B: 113, BC_C: 113, BC_D: 113, BC_E: 113, SC_1: 113, SC_2: 113, SC_3: 113, SC: 113, ST: 113
};

// ============================================================
// CORE LOGIC
// ============================================================

function estimateRank(score) {
  const data = scoreRankData;
  score = Math.max(100, Math.min(720, score));
  for (let i = 0; i < data.length - 1; i++) {
    if (score <= data[i].score && score >= data[i + 1].score) {
      const sDiff = data[i].score - data[i + 1].score;
      if (sDiff === 0) return data[i].rank;
      const rDiff = data[i + 1].rank - data[i].rank;
      const ratio = (data[i].score - score) / sDiff;
      return Math.round(data[i].rank + ratio * rDiff);
    }
  }
  return 1500000;
}

function estimateStateRank(air) {
  const data = scoreRankData;
  for (let i = 0; i < data.length - 1; i++) {
    if (air >= data[i].rank && air <= data[i + 1].rank) {
      const rDiff = data[i + 1].rank - data[i].rank;
      if (rDiff === 0) return data[i].stateSno;
      const sDiff = data[i + 1].stateSno - data[i].stateSno;
      const ratio = (air - data[i].rank) / rDiff;
      return Math.round(data[i].stateSno + ratio * sDiff);
    }
  }
  return Math.round(air / 32.5);
}

function estimateAIRFromSno(sno) {
  if (typeof snoToCatRanks2026 !== 'undefined' && snoToCatRanks2026[sno]) {
    return snoToCatRanks2026[sno].air;
  }
  const data = scoreRankData;
  for (let i = 0; i < data.length - 1; i++) {
    if (sno >= data[i].stateSno && sno <= data[i + 1].stateSno) {
      const sDiff = data[i + 1].stateSno - data[i].stateSno;
      if (sDiff === 0) return data[i].rank;
      const rDiff = data[i + 1].rank - data[i].rank;
      const ratio = (sno - data[i].stateSno) / sDiff;
      return Math.round(data[i].rank + ratio * rDiff);
    }
  }
  return Math.round(sno * 32.5);
}

function estimateScoreFromAIR(air) {
  const data = scoreRankData;
  for (let i = 0; i < data.length - 1; i++) {
    if (air >= data[i].rank && air <= data[i + 1].rank) {
      const rDiff = data[i + 1].rank - data[i].rank;
      if (rDiff === 0) return data[i].score;
      const scDiff = data[i].score - data[i + 1].score;
      const ratio = (air - data[i].rank) / rDiff;
      return Math.round(data[i].score - ratio * scDiff);
    }
  }
  return 150;
}

function updateScorePreview(score, customAIR, customSno) {
  const preview = document.getElementById('scorePreview');
  if (!preview) return;
  score = parseInt(score);
  
  const rank = customAIR || (isNaN(score) ? null : estimateRank(score));
  const sno = customSno || (rank ? estimateStateRank(rank) : null);
  const percentile = rank ? Math.max(0, Math.min(100, ((2209000 - rank) / 2209000 * 100))).toFixed(2) : null;
  
  if (!rank) {
    preview.innerHTML = '';
    return;
  }

  preview.innerHTML = `
    <div class="score-preview-content">
      <span class="preview-rank">AIR: <strong>${rank.toLocaleString('en-IN')}</strong></span>
      <span class="preview-rank">State S.No: <strong>${sno.toLocaleString('en-IN')}</strong></span>
      <span class="preview-percentile">Percentile: <strong>${percentile}%</strong></span>
    </div>
  `;
}

function handleProfileSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nameInput = document.getElementById('studentName');
  const name = nameInput?.value?.trim() || '';
  const airInputVal = parseInt(document.getElementById('neetAIR')?.value);
  const snoInputVal = parseInt(document.getElementById('stateSno')?.value);
  const scoreInputVal = parseInt(document.getElementById('neetScore')?.value);
  const category = document.getElementById('categorySelect')?.value || 'SC_2';
  const gender = document.getElementById('genderSelect')?.value || 'female';
  const localStatus = document.getElementById('localSelect')?.value || 'local';
  const pwd = document.getElementById('pwdCheckbox')?.checked || false;

  let air = null;
  let score = null;
  let stateRank = null;

  if (!isNaN(airInputVal) && airInputVal > 0) {
    air = airInputVal;
    score = !isNaN(scoreInputVal) ? scoreInputVal : estimateScoreFromAIR(air);
    stateRank = !isNaN(snoInputVal) ? snoInputVal : estimateStateRank(air);
  } else if (!isNaN(snoInputVal) && snoInputVal > 0) {
    stateRank = snoInputVal;
    air = estimateAIRFromSno(stateRank);
    score = !isNaN(scoreInputVal) ? scoreInputVal : estimateScoreFromAIR(air);
  } else if (!isNaN(scoreInputVal) && scoreInputVal > 0) {
    score = scoreInputVal;
    air = estimateRank(score);
    stateRank = estimateStateRank(air);
  } else {
    air = 289635;
    score = 393;
    stateRank = 8367;
  }

  const cutoff = qualifyingCutoffs[category] || 113;
  if (score < cutoff) {
    showToast(`Score ${score} is below qualifying cutoff (${cutoff}) for ${reservationData[category]?.label || category}`, 'error');
    return;
  }

  studentProfile = { name, score, category, gender, localStatus, pwd, customAIR: air, customStateRank: stateRank };
  estimatedAIR = air;

  renderRankResults();
  goToStep(2);
}

function renderRankResults() {
  const { name, score, category, gender, customAIR, customStateRank } = studentProfile;
  const air = customAIR || estimatedAIR || 289635;
  const stateRank = customStateRank || estimateStateRank(air) || 8367;
  const catRank = estimateCategoryRank(air, category, stateRank);
  const percentile = Math.max(0, Math.min(100, ((2209000 - air) / 2209000 * 100))).toFixed(2);

  // Update student info header
  const nameEl = document.getElementById('resultStudentName');
  if (nameEl) {
    if (name && name.trim().length > 0) {
      nameEl.textContent = name;
      nameEl.style.display = 'block';
    } else {
      nameEl.textContent = 'NEET 2026 Candidate Assessment';
    }
  }
  document.getElementById('resultScore').textContent = score + ' / 720';
  document.getElementById('resultCategory').textContent = reservationData[category]?.label || category;
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
    toggleCollegeList(true);
    renderCollegeList();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCollegeList() {
  const container = document.getElementById('collegeList');
  if (!container) return;

  const category = studentProfile.category || 'SC_2';
  const air = estimatedAIR || 134093;

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
    const eligible = isEligible(air, college, category);
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
              <span class="rank-label">Your Cat Rank</span>
              <span class="rank-value ${eligible ? 'rank-safe' : 'rank-danger'}">${estimateCategoryRank(air, category).toLocaleString('en-IN')}</span>
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

  lastAllocatedResult = result;

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
    document.getElementById('allocCategory').textContent = reservationData[category]?.label || category;
    
    // Show student name only if provided
    const nameEl = document.getElementById('allocStudentName');
    const nameContainer = nameEl ? nameEl.closest('.alloc-student-info') : null;
    if (nameEl) {
      if (name && name.trim().length > 0) {
        nameEl.textContent = name;
        if (nameContainer) nameContainer.style.display = 'inline-flex';
      } else {
        if (nameContainer) nameContainer.style.display = 'none';
      }
    }
    document.getElementById('allocStudentScore').textContent = score + ' / 720';
    document.getElementById('allocStudentRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN') + ' (Cat Rank)';

    // Calculate margin
    const margin = result.closingRank - estimateCategoryRank(air, category);
    document.getElementById('allocMargin').textContent = margin.toLocaleString('en-IN') + ' ranks';
    document.getElementById('allocMargin').className = margin > 50 ? 'margin-safe' : margin > 10 ? 'margin-moderate' : 'margin-tight';

    allocatedEl.style.display = 'block';
    notAllocatedEl.style.display = 'none';

    // Render alternative options (next 5 eligible colleges after allocated one)
    renderAlternatives(result.preferenceNo, air, category);

  } else {
    allocatedEl.style.display = 'none';
    notAllocatedEl.style.display = 'block';
    document.getElementById('notAllocatedScore').textContent = score;
    document.getElementById('notAllocatedRank').textContent = estimateCategoryRank(air, category).toLocaleString('en-IN');
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
// --- Quota Info Modal ---
function showQuotaInfo() {
  const modal = document.getElementById('quotaModal');
  if (modal) {
    pauseBgAnimations();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuotaInfo() {
  const modal = document.getElementById('quotaModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    resumeBgAnimations();
  }
}

// --- Toggle Name Field ---
function toggleNameField() {
  const nameInput = document.getElementById('studentName');
  const toggleText = document.querySelector('.toggle-text');
  if (nameInput) {
    if (nameInput.classList.contains('name-input-hidden')) {
      nameInput.classList.remove('name-input-hidden');
      nameInput.focus();
      if (toggleText) toggleText.textContent = '- Remove Name';
    } else {
      nameInput.classList.add('name-input-hidden');
      nameInput.value = '';
      if (toggleText) toggleText.textContent = '+ Add Candidate Name (optional)';
    }
  }
}

// --- Toggle Advanced Options Panel ---
function toggleAdvancedOptions() {
  const panel = document.getElementById('advancedOptionsPanel');
  const btn = document.getElementById('advancedToggleBtn');
  if (!panel) return;
  const isHidden = panel.style.display === 'none' || panel.classList.contains('hidden');
  if (isHidden) {
    panel.style.display = 'block';
    panel.classList.remove('hidden');
    if (btn) btn.innerHTML = '<span>⚙️ Hide Advanced Options</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  } else {
    panel.style.display = 'none';
    panel.classList.add('hidden');
    if (btn) btn.innerHTML = '<span>⚙️ Custom Category, Gender & Quota Options (Optional)</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
  }
}

// --- Toggle Advanced Options Panel ---
function toggleAdvancedOptions() {
  const panel = document.getElementById('advancedOptionsPanel');
  const btn = document.getElementById('advancedToggleBtn');
  if (!panel) return;
  const isHidden = panel.style.display === 'none' || panel.classList.contains('hidden');
  if (isHidden) {
    panel.style.display = 'block';
    panel.classList.remove('hidden');
    if (btn) btn.innerHTML = '<span>⚙️ Hide Advanced Options</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  } else {
    panel.style.display = 'none';
    panel.classList.add('hidden');
    if (btn) btn.innerHTML = '<span>⚙️ Custom Category, Gender & Quota Options (Optional)</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
  }
}

// ==========================================================================
// AI CHATBOT CONTROLLER (gpt-5.4-mini + MCP Prediction Engine)
// ==========================================================================
const chatHistory = [];

function initAIChatbot() {
  const fab = document.getElementById('ai-chat-fab');
  const drawer = document.getElementById('ai-chat-drawer');
  const closeBtn = document.getElementById('ai-chat-close');
  const sendBtn = document.getElementById('ai-chat-send');
  const inputEl = document.getElementById('ai-chat-input');

  if (!fab || !drawer) return;

  fab.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
    if (!drawer.classList.contains('hidden') && inputEl) {
      inputEl.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  }

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', handleChatSubmit);
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChatSubmit();
      }
    });
  }
}

async function handleChatSubmit() {
  const inputEl = document.getElementById('ai-chat-input');
  if (!inputEl) return;

  const query = inputEl.value.trim();
  if (!query) return;

  inputEl.value = '';
  appendChatMessage(query, 'user');

  // Show bot typing placeholder
  const botMsgId = appendChatMessage('⏳ Thinking and running predictions...', 'bot');

  // Gather current profile and form values
  const categoryEl = document.getElementById('categorySelect');
  const scoreEl = document.getElementById('neetScore');
  const rankEl = document.getElementById('neetAIR');
  const snoEl = document.getElementById('stateSno');
  const genderEl = document.getElementById('genderSelect');

  const payload = {
    message: query,
    history: chatHistory,
    category: (studentProfile && studentProfile.category) || (categoryEl ? categoryEl.value : 'SC_2'),
    neetScore: (studentProfile && studentProfile.score) || (scoreEl ? scoreEl.value : '393'),
    neetRank: (studentProfile && studentProfile.customAIR) || (rankEl ? rankEl.value : '289635'),
    stateSno: (studentProfile && studentProfile.customStateRank) || (snoEl ? snoEl.value : '8367'),
    gender: (studentProfile && studentProfile.gender) || (genderEl ? genderEl.value : 'female')
  };

  try {
    const apiEndpoint = window.location.origin.startsWith('http://localhost:3000') || window.location.origin.startsWith('http://127.0.0.1:3000')
      ? '/api/chat'
      : 'http://localhost:3000/api/chat';

    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      updateChatMessage(botMsgId, parseMarkdownToHtml(data.message));
      chatHistory.push({ role: 'user', content: query });
      chatHistory.push({ role: 'assistant', content: data.message });
    } else {
      const fallbackText = getLocalPredictionFallback(query, payload);
      updateChatMessage(botMsgId, fallbackText);
      chatHistory.push({ role: 'user', content: query });
      chatHistory.push({ role: 'assistant', content: fallbackText });
    }
  } catch (err) {
    const fallbackText = getLocalPredictionFallback(query, payload);
    updateChatMessage(botMsgId, fallbackText);
    chatHistory.push({ role: 'user', content: query });
    chatHistory.push({ role: 'assistant', content: fallbackText });
  }
}

function sendQuickPrompt(promptText) {
  const drawer = document.getElementById('ai-chat-drawer');
  if (drawer && drawer.classList.contains('hidden')) {
    drawer.classList.remove('hidden');
  }
  const inputEl = document.getElementById('ai-chat-input');
  if (inputEl) {
    inputEl.value = promptText;
    handleChatSubmit();
  }
}

function appendChatMessage(text, sender) {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return null;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}-msg`;
  const msgId = 'msg-' + Date.now();
  msgDiv.id = msgId;

  const avatar = sender === 'bot' ? '🤖' : '👤';
  msgDiv.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-content">${text}</div>
  `;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  return msgId;
}

function updateChatMessage(msgId, htmlContent) {
  const msgDiv = document.getElementById(msgId);
  if (msgDiv) {
    const contentEl = msgDiv.querySelector('.msg-content');
    if (contentEl) {
      contentEl.innerHTML = htmlContent;
    }
    const container = document.getElementById('ai-chat-messages');
    if (container) container.scrollTop = container.scrollHeight;
  }
}

function getLocalPredictionFallback(query, payload) {
  return processDynamicQuery(query, payload);
}

function processDynamicQuery(query, payload) {
  const q = (query || '').trim();
  const qLower = q.toLowerCase();

  // Helper to extract score from query
  const scoreMatch = qLower.match(/(\d{3})\s*(marks|score|pts)?/);
  const rankMatch = qLower.match(/(air|rank)\s*[:=]?\s*(\d{4,6})/i) || qLower.match(/(\d{4,6})\s*(air|rank)/i);

  // Helper to extract category from query
  let extractedCat = null;
  if (/\b(sc[-_]?2|sc2)\b/i.test(qLower)) extractedCat = 'SC_2';
  else if (/\b(sc[-_]?1|sc1)\b/i.test(qLower)) extractedCat = 'SC_1';
  else if (/\b(sc[-_]?3|sc3)\b/i.test(qLower)) extractedCat = 'SC_3';
  else if (/\b(sc)\b/i.test(qLower)) extractedCat = 'SC';
  else if (/\b(st)\b/i.test(qLower)) extractedCat = 'ST';
  else if (/\b(bc[-_]?a|bca)\b/i.test(qLower)) extractedCat = 'BC_A';
  else if (/\b(bc[-_]?b|bcb)\b/i.test(qLower)) extractedCat = 'BC_B';
  else if (/\b(bc[-_]?c|bcc)\b/i.test(qLower)) extractedCat = 'BC_C';
  else if (/\b(bc[-_]?d|bcd)\b/i.test(qLower)) extractedCat = 'BC_D';
  else if (/\b(bc[-_]?e|bce)\b/i.test(qLower)) extractedCat = 'BC_E';
  else if (/\b(ews)\b/i.test(qLower)) extractedCat = 'EWS';
  else if (/\b(oc|open|general)\b/i.test(qLower)) extractedCat = 'OC';

  const gList = typeof govtColleges !== 'undefined' ? govtColleges : [];
  const pList = typeof pvtColleges !== 'undefined' ? pvtColleges : [];
  const allColleges = [
    ...gList.map(c => ({ ...c, typeLabel: 'Government' })),
    ...pList.map(c => ({ ...c, typeLabel: 'Private (Cat-A)' }))
  ];

  // 1. GREETING / HELP
  if (/^(hi|hello|hey|help|who are you|good morning|good evening)/i.test(qLower) && !scoreMatch && !rankMatch) {
    return `
      <h3>👋 Welcome to mSeat AI Admission Counselor!</h3>
      <p>I am your specialized assistant for <strong>Telangana KNRUHS MBBS Admissions 2026</strong>. How can I help you today?</p>
      <p><strong>Popular topics you can ask me:</strong></p>
      <ul>
        <li>🎯 <em>"Will I get a seat for 420 marks in BC-B?"</em></li>
        <li>🏛️ <em>"Tell me about Osmania / Gandhi / Mamata Medical College"</em></li>
        <li>💰 <em>"What is the annual fee structure for Govt & Private colleges?"</em></li>
        <li>📜 <em>"What documents are required for certificate verification?"</em></li>
        <li>⚖️ <em>"Mamata Bachupally vs CMR Medchal comparison"</em></li>
        <li>📊 <em>"How many MBBS seats are available in 2026?"</em></li>
      </ul>
    `;
  }

  // 2. SPECIFIC COLLEGE LOOKUP (e.g. Gandhi, Osmania, ESIC, Mamata, Apollo, etc.)
  const matchedCollege = allColleges.find(c => {
    const code = (c.code || '').toLowerCase();
    const namePart = (c.name || '').toLowerCase();
    return (code && qLower.includes(code)) || 
           (namePart.includes('gandhi') && qLower.includes('gandhi')) ||
           (namePart.includes('osmania') && qLower.includes('osmania')) ||
           (namePart.includes('esic') && qLower.includes('esic')) ||
           (namePart.includes('apollo') && qLower.includes('apollo')) ||
           (namePart.includes('kamineni') && qLower.includes('kamineni')) ||
           (namePart.includes('bhaskar') && qLower.includes('bhaskar')) ||
           (namePart.includes('patnam') && qLower.includes('patnam')) ||
           (namePart.includes('arundathi') && qLower.includes('arundathi')) ||
           (namePart.includes('maheshwara') && qLower.includes('maheshwara')) ||
           (namePart.includes('mediciti') && qLower.includes('mediciti')) ||
           (namePart.includes('chalmeda') && qLower.includes('chalmeda')) ||
           (namePart.includes('mamata') && qLower.includes('mamata'));
  });

  if (matchedCollege && !qLower.includes(' vs ') && !qLower.includes('versus') && !qLower.includes('compare') && !scoreMatch) {
    const isGovt = matchedCollege.type === 'govt';
    const feeStr = isGovt ? '₹10,000 - ₹29,000 / year' : '₹60,000 / year (Cat-A Convenor)';
    return `
      <h3>🏛️ ${matchedCollege.name}</h3>
      <div style="margin: 10px 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
        <p><strong>Code:</strong> <code>${matchedCollege.code}</code> · <strong>Type:</strong> ${matchedCollege.typeLabel}</p>
        <p><strong>Location:</strong> ${matchedCollege.place} (${matchedCollege.distKm || '—'} km from Rajendranagar)</p>
        <p><strong>Annual Tuition Fee:</strong> ${feeStr}</p>
        <p><strong>Intake:</strong> ${matchedCollege.intake || 100} seats</p>
      </div>
      <p>💡 <em>Tip: You can ask "What are my chances in ${matchedCollege.name} with [your score] marks?"</em></p>
    `;
  }

  // 3. COLLEGE COMPARISON (e.g. Mamata vs CMR, Apollo vs Kamineni)
  if (qLower.includes(' vs ') || qLower.includes('versus') || qLower.includes('compare')) {
    const matches = allColleges.filter(c => qLower.includes(c.name.toLowerCase().split(' ')[0]) || (c.code && qLower.includes(c.code.toLowerCase())));
    if (matches.length >= 2) {
      const c1 = matches[0];
      const c2 = matches[1];
      return `
        <h3>⚖️ College Comparison: ${c1.name} vs ${c2.name}</h3>
        <table>
          <thead>
            <tr><th>Metric</th><th>${c1.name}</th><th>${c2.name}</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>College Code</strong></td><td><code>${c1.code}</code></td><td><code>${c2.code}</code></td></tr>
            <tr><td><strong>Type</strong></td><td>${c1.typeLabel}</td><td>${c2.typeLabel}</td></tr>
            <tr><td><strong>Location</strong></td><td>${c1.place}</td><td>${c2.place}</td></tr>
            <tr><td><strong>Distance (from Rajendranagar)</strong></td><td>${c1.distKm || '—'} km</td><td>${c2.distKm || '—'} km</td></tr>
            <tr><td><strong>Fee (Cat-A)</strong></td><td>${c1.type === 'govt' ? '₹10,000/yr' : '₹60,000/yr'}</td><td>${c2.type === 'govt' ? '₹10,000/yr' : '₹60,000/yr'}</td></tr>
          </tbody>
        </table>
      `;
    }
  }

  // 4. FEE STRUCTURE QUERY
  if (/\b(fee|fees|tuition|cost|charges|hostel fee|expensive)\b/i.test(qLower) && !scoreMatch) {
    return `
      <h3>💰 Telangana MBBS Fee Structure (AY 2026-27)</h3>
      <table>
        <thead>
          <tr><th>College Type</th><th>Quota</th><th>Tuition Fee / Year</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Government Medical Colleges (GMC)</strong></td><td>Convenor Quota (85% State)</td><td><strong>₹10,000 – ₹29,000</strong></td></tr>
          <tr><td><strong>ESIC Medical College (Sanathnagar)</strong></td><td>State Quota / IP Quota</td><td><strong>₹1,00,000</strong> (₹24,000 for IP)</td></tr>
          <tr><td><strong>Private Non-Minority Medical Colleges</strong></td><td>Category-A (Convenor Quota 50%)</td><td><strong>₹60,000</strong></td></tr>
          <tr><td><strong>Private Non-Minority Medical Colleges</strong></td><td>Category-B (Management Quota 35%)</td><td><strong>₹11,55,000 – ₹13,00,000</strong></td></tr>
          <tr><td><strong>Private Non-Minority Medical Colleges</strong></td><td>Category-C (NRI Quota 15%)</td><td><strong>Up to 2x Cat-B Fee</strong></td></tr>
        </tbody>
      </table>
      <p>💡 <em>Note: SC/ST/BC students eligible for Telangana e-PASS Post-Matric Scholarship receive full or partial tuition fee reimbursement for Category-A seats.</em></p>
    `;
  }

  // 5. DOCUMENTS REQUIRED & CERTIFICATE VERIFICATION
  if (/\b(document|documents|certificate|certificates|verification|caste certificate|income certificate|domicile)\b/i.test(qLower)) {
    return `
      <h3>📜 Required Documents for KNRUHS Certificate Verification</h3>
      <ol>
        <li><strong>NEET UG 2026 Score Card / Rank Card</strong></li>
        <li><strong>NEET UG 2026 Admit Card / Hall Ticket</strong></li>
        <li><strong>SSC / 10th Class Marks Memo</strong> (Proof of Date of Birth)</li>
        <li><strong>Intermediate / 10+2 Marks Memo</strong> (Biology, Physics, Chemistry)</li>
        <li><strong>Study Certificates</strong> from Class 6th to Intermediate (to prove Local Status)</li>
        <li><strong>Permanent Caste Certificate</strong> (for SC / ST / BC candidates issued by MeeSeva / Tahsildar)</li>
        <li><strong>EWS Certificate</strong> (for EWS candidates for AY 2026-27)</li>
        <li><strong>Transfer Certificate (TC)</strong> from the last attended institution</li>
        <li><strong>Aadhaar Card</strong> of Candidate & Parents</li>
        <li><strong>Latest Passport Size Photos</strong> (4 to 6 copies)</li>
        <li><strong>Minority / PwD / CAP / NCC / Sports Certificate</strong> (if applicable)</li>
      </ol>
    `;
  }

  // 6. COUNSELLING PROCESS, WEBOOPTIONS, SLIDING & ROUNDS
  if (/\b(round|rounds|counselling|counseling|web option|web options|sliding|mopup|mop-up|stray|free exit)\b/i.test(qLower) && !scoreMatch) {
    return `
      <h3>🔄 KNRUHS MBBS Counselling Process & Sliding Rules</h3>
      <ul>
        <li><strong>Round 1 (Phase 1)</strong>: All eligible merit list candidates fill Web Options. Seats allotted strictly based on state merit rank and category reservation.</li>
        <li><strong>Free Exit Period</strong>: Candidates allotted in Round 1 can either join or exit without penalty before the official free exit deadline.</li>
        <li><strong>Round 2 (Phase 2) / Sliding</strong>: Candidates who joined in Round 1 can exercise higher web options to slide to a better Government or top Private college.</li>
        <li><strong>Mop-Up Round</strong>: Conducted for remaining vacant seats after Round 2 (including seats converted from AIQ unfilled quota).</li>
        <li><strong>Stray Vacancy Round</strong>: Final round for any leftover institutional vacancies strictly per merit list.</li>
      </ul>
      <p>💡 <strong>Best Strategy:</strong> Fill <em>all 36 Government colleges first</em> in order of location preference, followed by <em>all Private Category-A colleges</em>.</p>
    `;
  }

  // 7. RESERVATION & LOCAL QUOTA
  if (/\b(reservation|quota|local|non-local|non local|85%|15%|sub-classification|classification)\b/i.test(qLower) && !scoreMatch) {
    return `
      <h3>📊 Telangana MBBS Reservation & Quota Structure</h3>
      <ul>
        <li><strong>85% State Quota</strong>: Reserved exclusively for Local candidates (Telangana domicile with 4+ consecutive years of study).</li>
        <li><strong>15% Unreserved Quota</strong>: Open to both Local and Non-Local candidates based purely on merit.</li>
        <li><strong>Caste Reservations</strong>:
          <ul>
            <li><strong>SC (15%)</strong>: Sub-classified into SC-1 (1%), SC-2 (9%), SC-3 (5%).</li>
            <li><strong>ST</strong>: 10%</li>
            <li><strong>BC (29%)</strong>: BC-A (7%), BC-B (10%), BC-C (1%), BC-D (7%), BC-E (4%).</li>
            <li><strong>EWS</strong>: 10% in Government colleges with sanctioned EWS seats.</li>
            <li><strong>Women Horizontal Reservation</strong>: 33⅓% seats in all categories reserved for female candidates.</li>
          </ul>
        </li>
      </ul>
    `;
  }

  // 8. TOTAL SEATS & 2026 SEAT MATRIX
  if (/\b(seat matrix|total seats|how many seats|seats count|expansion)\b/i.test(qLower) && !scoreMatch) {
    return `
      <h3>🏥 Official AY 2026-27 Telangana MBBS Seat Matrix</h3>
      <ul>
        <li><strong>Total Convener MBBS Seats:</strong> 6,020 Seats across 63 Medical Colleges</li>
        <li><strong>Government Medical Colleges (36 Colleges):</strong> 3,499 Seats</li>
        <li><strong>Private Non-Minority Medical Colleges (23 Colleges):</strong> 2,154 Seats</li>
        <li><strong>Minority Medical Colleges (4 Colleges):</strong> 367 Seats</li>
        <li><strong>SC-2 Category Quota:</strong> 506 MBBS Seats (318 Govt + 188 Pvt)</li>
      </ul>
    `;
  }

  // 9. ADMISSION CHANCES / PROBABILITY / SCORE EVALUATION
  let evalScore = scoreMatch ? parseInt(scoreMatch[1]) : (payload?.neetScore ? parseInt(payload.neetScore) : null);
  let evalCat = extractedCat || payload?.category || 'SC_2';

  if (evalScore && (scoreMatch || rankMatch || /\b(chance|chances|probability|can i get|allotment|eligible|eligible for|get seat|qualify|cutoff)\b/i.test(qLower))) {
    const estAir = typeof estimateRank === 'function' ? estimateRank(evalScore) : (scoreMatch ? 289635 : payload?.neetRank || 289635);
    const estSno = typeof estimateStateRank === 'function' ? estimateStateRank(estAir) : 8367;

    return `
      <h3>🎯 Admission Chances Evaluation</h3>
      <p><strong>Evaluated Score:</strong> ${evalScore} / 720 · <strong>Category:</strong> ${evalCat} · <strong>Est. AIR:</strong> ~${estAir.toLocaleString()} · <strong>Est. State S.No:</strong> #${estSno.toLocaleString()}</p>
      <p><strong>Predicted Outcome:</strong></p>
      <ul>
        <li>🏛️ <strong>Government Medical Colleges:</strong> ${evalScore >= 450 ? 'Strong chances in newly established & district GMCs' : 'Chances open in Round 3 / Mop-up with AIQ exits'}</li>
        <li>🏥 <strong>Private Cat-A Medical Colleges:</strong> <strong>High Probability / Guaranteed</strong> in top Hyderabad & suburban colleges (Arundathi, Maheshwara, Patnam Mahender, CMR Medchal, Mamata Bachupally).</li>
      </ul>
      <p>💡 <em>Tip: Use the <strong>"🚀 1-Click Auto Predict"</strong> button on Step 1 to run the complete 59-college simulated allotment for this exact score!</em></p>
    `;
  }

  // 10. DEFAULT HELPFUL ADVICE
  return `
    <h3>💬 mSeat AI Admission Counselor</h3>
    <p>You asked: <em>"${q}"</em></p>
    <p>I can help you analyze admission chances, explain KNRUHS counselling rules, compare colleges, or check fees. Try asking:</p>
    <ul>
      <li><em>"What are the fees for private A category seats?"</em></li>
      <li><em>"What documents do I need for certificate verification?"</em></li>
      <li><em>"Chances for [your score] in [your category]?"</em></li>
      <li><em>"Tell me about Osmania / Gandhi Medical College"</em></li>
    </ul>
  `;
}

function parseMarkdownToHtml(markdown) {
  if (!markdown) return '';
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n\n/gim, '<br><br>');
  return html;
}

// --- Initialize on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  init();
  initAIChatbot();
});


// 1-Click Quick Predict & Auto Counselling Logic (Merit List Auto-Load + User Override)
function quickPredict() {
  const snoInput = document.getElementById('stateSno');
  const airInput = document.getElementById('neetAIR');
  const scoreInput = document.getElementById('neetScore');
  const catSelect = document.getElementById('categorySelect');
  const genderSelect = document.getElementById('genderSelect');
  const nameInput = document.getElementById('studentName');

  let sno = parseInt(snoInput?.value);
  let air = parseInt(airInput?.value);
  let score = parseInt(scoreInput?.value);

  // 1. Auto-fetch official Category, Gender, AIR, Score from Final Merit List if S.No is provided
  if (!isNaN(sno) && snoToCatRanks2026[sno]) {
    const data = snoToCatRanks2026[sno];
    air = data.air;
    score = data.score;
    if (airInput) airInput.value = air;
    if (scoreInput) scoreInput.value = score;

    let mappedCat = data.cat;
    if (data.ews && mappedCat === 'OC') mappedCat = 'EWS';

    // If user hasn't manually selected a different category, use the candidate's actual merit category!
    if (catSelect && (!catSelect.value || catSelect.value === '')) {
      catSelect.value = mappedCat;
    }
    if (genderSelect && (!genderSelect.value || genderSelect.value === '')) {
      genderSelect.value = data.gender || 'female';
    }
  } else if (!isNaN(air) && isNaN(sno)) {
    sno = estimateStateRank(air);
    if (snoInput) snoInput.value = sno;
    if (snoToCatRanks2026[sno]) {
      const data = snoToCatRanks2026[sno];
      score = data.score;
      if (scoreInput) scoreInput.value = score;
      let mappedCat = data.cat;
      if (data.ews && mappedCat === 'OC') mappedCat = 'EWS';
      if (catSelect && (!catSelect.value || catSelect.value === '')) {
        catSelect.value = mappedCat;
      }
      if (genderSelect && (!genderSelect.value || genderSelect.value === '')) {
        genderSelect.value = data.gender || 'female';
      }
    }
  } else if (!isNaN(score) && isNaN(air)) {
    air = estimateRank(score);
    sno = estimateStateRank(air);
    if (airInput) airInput.value = air;
    if (snoInput) snoInput.value = sno;
  }

  if (isNaN(score) && isNaN(air) && isNaN(sno)) {
    showToast('Please enter your NEET Score, AIR, or State S.No', 'error');
    return;
  }

  // Final category and gender resolution (Merit list or user selected)
  let resolvedCat = catSelect?.value;
  let resolvedGender = genderSelect?.value;

  if (!resolvedCat || resolvedCat === '') {
    if (!isNaN(sno) && snoToCatRanks2026[sno]) {
      let mappedCat = snoToCatRanks2026[sno].cat;
      if (snoToCatRanks2026[sno].ews && mappedCat === 'OC') mappedCat = 'EWS';
      resolvedCat = mappedCat;
    } else {
      resolvedCat = 'OC';
    }
  }

  if (!resolvedGender || resolvedGender === '') {
    if (!isNaN(sno) && snoToCatRanks2026[sno]) {
      resolvedGender = snoToCatRanks2026[sno].gender || 'female';
    } else {
      resolvedGender = 'female';
    }
  }

  const name = nameInput?.value?.trim() || '';

  studentProfile = {
    name,
    score: score || 386,
    category: resolvedCat,
    gender: resolvedGender,
    localStatus: document.getElementById('localSelect')?.value || 'local',
    pwd: document.getElementById('pwdCheckbox')?.checked || false,
    customAIR: air || 309255,
    customStateRank: sno || 9200
  };
  estimatedAIR = studentProfile.customAIR;

  // Build default Government First -> Private Next preferences
  preferences = buildPreferences('categorized');

  // Render Rank results for Step 2
  renderRankResults();

  // Execute Allocation Result directly for Step 4
  showAllocationResult();
}
