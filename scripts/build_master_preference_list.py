import json

master_list = [
    # TIER 1: TOP APEX GOVERNMENT COLLEGES
    {"rank": 1, "name": "Gandhi Medical College", "place": "Secunderabad", "type": "Government", "est": 1954, "pg": "Yes (All Specializations)", "rating": "4.6 ★", "category": "Tier 1 Top Apex Govt", "notes": "Top Choice in TS, 1200+ Bed Hospital, Excellent Clinical Exposure"},
    {"rank": 2, "name": "Osmania Medical College", "place": "Hyderabad", "type": "Government", "est": 1846, "pg": "Yes (All Specializations)", "rating": "4.6 ★", "category": "Tier 1 Top Apex Govt", "notes": "Oldest Premier Medical Institution, Massive Patient Inflow"},
    {"rank": 3, "name": "ESIC Medical College & Hospital", "place": "Sanath Nagar, Hyderabad", "type": "Government (Central)", "est": 2016, "pg": "Yes (Super Speciality)", "rating": "4.5 ★", "category": "Tier 1 Top Apex Govt", "notes": "State-of-the-Art Central Govt Infrastructure & Stipend"},
    {"rank": 4, "name": "Kakatiya Medical College", "place": "Warangal", "type": "Government", "est": 1959, "pg": "Yes (All Specializations)", "rating": "4.4 ★", "category": "Tier 1 Top Apex Govt", "notes": "Top Govt College in North Telangana, MGM Hospital Attachment"},

    # TIER 2: TOP PRIVATE HYDERABAD / RangaReddy & ESTABLISHED GOVT (With PG)
    {"rank": 5, "name": "Apollo Institute of Medical Sciences & Research", "place": "Jubilee Hills, Hyderabad", "type": "Private (Cat-A)", "est": 2012, "pg": "Yes", "rating": "4.4 ★", "category": "Tier 2 Top Private", "notes": "Top Private Medical College, Premier Campus & Clinical Training"},
    {"rank": 6, "name": "Kamineni Academy of Medical Sciences & Research", "place": "LB Nagar, Hyderabad", "type": "Private (Cat-A)", "est": 2012, "pg": "Yes", "rating": "4.3 ★", "category": "Tier 2 Top Private", "notes": "Prime Metro Location, Excellent Patient Flow & PG Results"},
    {"rank": 7, "name": "Mamata Academy of Medical Sciences", "place": "Bachupally, Hyderabad", "type": "Private (Cat-A)", "est": 2019, "pg": "Yes", "rating": "4.3 ★", "category": "Tier 2 Top Private", "notes": "High Demand Metro Private College, Modern Infrastructure"},
    {"rank": 8, "name": "Government Medical College", "place": "Nizamabad", "type": "Government", "est": 2013, "pg": "Yes", "rating": "4.3 ★", "category": "Tier 2 Established Govt", "notes": "Best Among 2013 Batch GMCs, Full PG Departments & Hospital"},
    {"rank": 9, "name": "Government Medical College", "place": "Siddipet", "type": "Government", "est": 2018, "pg": "Yes", "rating": "4.2 ★", "category": "Tier 2 Established Govt", "notes": "Excellent Campus & Infrastructure, Fast Growing Medical Hub"},
    {"rank": 10, "name": "Government Medical College", "place": "Mahabubnagar", "type": "Government", "est": 2016, "pg": "Yes", "rating": "4.2 ★", "category": "Tier 2 Established Govt", "notes": "Established Govt College, Good Clinical Exposure & Hospital"},
    {"rank": 11, "name": "Government Medical College", "place": "Suryapet", "type": "Government", "est": 2019, "pg": "Yes", "rating": "4.1 ★", "category": "Tier 2 Established Govt", "notes": "Good Multi-Speciality Govt Hospital & PG Courses"},
    {"rank": 12, "name": "Government Medical College", "place": "Nalgonda", "type": "Government", "est": 2019, "pg": "Yes", "rating": "4.1 ★", "category": "Tier 2 Established Govt", "notes": "Well Established Campus, Good Connectivity to Hyderabad"},
    {"rank": 13, "name": "RIMS (Rajiv Gandhi Institute of Medical Sciences)", "place": "Adilabad", "type": "Government", "est": 2008, "pg": "Yes", "rating": "4.1 ★", "category": "Tier 2 Established Govt", "notes": "Established Govt Institute, Full PG Facilities"},
    {"rank": 14, "name": "Kamineni Institute of Medical Sciences", "place": "Narketpally, Nalgonda", "type": "Private (Cat-A)", "est": 1999, "pg": "Yes", "rating": "4.2 ★", "category": "Tier 2 Established Private", "notes": "Legacy Private College, 1000+ Bed Super Speciality Hospital"},
    {"rank": 15, "name": "Mamata Medical College", "place": "Khammam", "type": "Private (Cat-A)", "est": 1998, "pg": "Yes", "rating": "4.3 ★", "category": "Tier 2 Established Private", "notes": "Established 25+ Years, Excellent Clinical & PG Record"},
    {"rank": 16, "name": "S.V.S. Medical College", "place": "Mahabubnagar", "type": "Private (Cat-A)", "est": 1999, "pg": "Yes", "rating": "4.2 ★", "category": "Tier 2 Established Private", "notes": "Top Tier Legacy Private Institution, Huge Patient Outflow"},
    {"rank": 17, "name": "Bhaskar Medical College", "place": "Yenkapally, Moinabad", "type": "Private (Cat-A)", "est": 2005, "pg": "Yes", "rating": "4.0 ★", "category": "Tier 2 Established Private", "notes": "Close to Hyderabad City, Strong Academics & Patient Load"},
    {"rank": 18, "name": "C. Ananda Rao Institute of Medical Sciences", "place": "Karimnagar", "type": "Private (Cat-A)", "est": 2002, "pg": "Yes", "rating": "4.1 ★", "category": "Tier 2 Established Private", "notes": "Established North TS Private College, Good Clinical Exposure"},
    {"rank": 19, "name": "Prathima Institute of Medical Sciences", "place": "Nagunur, Karimnagar", "type": "Private (Cat-A)", "est": 2001, "pg": "Yes", "rating": "4.2 ★", "category": "Tier 2 Established Private", "notes": "Major Tertiary Care Private Hospital & PG Center"},
    {"rank": 20, "name": "Medicity Institute of Medical Sciences", "place": "Ghanpur, Medchal", "type": "Private (Cat-A)", "est": 2002, "pg": "Yes", "rating": "4.1 ★", "category": "Tier 2 Established Private", "notes": "Medchal District, Peaceful Campus with 750+ Bed Hospital"},

    # TIER 3: MID-TIER ESTABLISHED GOVT & POPULAR PRIVATE COLLEGES
    {"rank": 21, "name": "Malla Reddy Institute of Medical Sciences", "place": "Suraram, Hyderabad", "type": "Private (Cat-A)", "est": 2012, "pg": "Yes", "rating": "4.0 ★", "category": "Mid-Tier Private", "notes": "Large Metro Campus, High Patient Inflow"},
    {"rank": 22, "name": "Malla Reddy Medical College for Women", "place": "Suraram, Hyderabad", "type": "Private (Cat-A Women)", "est": 2013, "pg": "Yes", "rating": "4.1 ★", "category": "Mid-Tier Private Women", "notes": "Women's Medical College, Excellent Security & Academics"},
    {"rank": 23, "name": "Government Medical College", "place": "Ramagundam", "type": "Government", "est": 2022, "pg": "Yes", "rating": "4.0 ★", "category": "Mid-Tier Govt", "notes": "Newer GMC with PG Seats Started"},
    {"rank": 24, "name": "Government Medical College", "place": "Sangareddy", "type": "Government", "est": 2022, "pg": "No", "rating": "4.0 ★", "category": "Mid-Tier Govt", "notes": "Proximity to Hyderabad, Developing Hospital Facilities"},
    {"rank": 25, "name": "Government Medical College", "place": "Karimnagar", "type": "Government", "est": 2023, "pg": "No", "rating": "4.0 ★", "category": "Mid-Tier Govt", "notes": "District Headquarter Location, Good Govt Hospital Base"},
    {"rank": 26, "name": "Government Medical College", "place": "Khammam", "type": "Government", "est": 2023, "pg": "No", "rating": "4.0 ★", "category": "Mid-Tier Govt", "notes": "Good District Hospital Attachment"},
    {"rank": 27, "name": "Government Medical College", "place": "Wanaparthy", "type": "Government", "est": 2022, "pg": "No", "rating": "3.9 ★", "category": "Mid-Tier Govt", "notes": "Functional District Hospital"},
    {"rank": 28, "name": "Government Medical College", "place": "Nagarkurnool", "type": "Government", "est": 2022, "pg": "No", "rating": "3.9 ★", "category": "Mid-Tier Govt", "notes": "Functional Campus"},
    {"rank": 29, "name": "MNR Medical College & Hospital", "place": "Fasalwadi, Sangareddy", "type": "Private (Cat-A)", "est": 2002, "pg": "Yes", "rating": "3.9 ★", "category": "Mid-Tier Private", "notes": "Established Private College, Full PG Courses"},
    {"rank": 30, "name": "Dr. Patnam Mahender Reddy Institute of Medical Sciences", "place": "Chevella, Rangareddy", "type": "Private (Cat-A)", "est": 2019, "pg": "No", "rating": "3.9 ★", "category": "Mid-Tier Private", "notes": "Near Chevella, Good Infrastructure"},
    {"rank": 31, "name": "CMR Institute of Medical Sciences", "place": "Kandlakoya, Medchal", "type": "Private (Cat-A)", "est": 2023, "pg": "No", "rating": "4.1 ★", "category": "Mid-Tier Private", "notes": "Modern Campus, Fast Growing Patient Load"},
    {"rank": 32, "name": "Arundathi Institute of Medical Sciences", "place": "Dundigal, Hyderabad", "type": "Private (Cat-A)", "est": 2023, "pg": "No", "rating": "4.0 ★", "category": "Mid-Tier Private", "notes": "New Campus near Dundigal, Good Infrastructure"},
    {"rank": 33, "name": "RVM Medical College", "place": "Laxmakkapally, Mulugu/Medak", "type": "Private (Cat-A)", "est": 2016, "pg": "Yes", "rating": "3.9 ★", "category": "Mid-Tier Private", "notes": "Good Hospital Attachment & PG Courses"},
    {"rank": 34, "name": "Prathima Relief Institute of Medical Sciences", "place": "Warangal", "type": "Private (Cat-A)", "est": 2024, "pg": "No", "rating": "3.9 ★", "category": "Mid-Tier Private", "notes": "New Unit of Prathima Group in Warangal"},

    # TIER 4: NEWER GOVT COLLEGES (2022-2023)
    {"rank": 35, "name": "Government Medical College", "place": "Vikarabad", "type": "Government", "est": 2023, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Functional District Hospital"},
    {"rank": 36, "name": "Government Medical College", "place": "Jangaon", "type": "Government", "est": 2023, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Developing Campus"},
    {"rank": 37, "name": "Government Medical College", "place": "Bhadradri Kothagudem", "type": "Government", "est": 2022, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Functional Hospital"},
    {"rank": 38, "name": "Government Medical College", "place": "Jagtial", "type": "Government", "est": 2022, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Functional Hospital"},
    {"rank": 39, "name": "Government Medical College", "place": "Mancherial", "type": "Government", "est": 2022, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Functional Hospital"},
    {"rank": 40, "name": "Government Medical College", "place": "Mahabubabad", "type": "Government", "est": 2022, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Functional Hospital"},
    {"rank": 41, "name": "Government Medical College", "place": "Rajanna Sircilla", "type": "Government", "est": 2023, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Developing Campus"},
    {"rank": 42, "name": "Government Medical College", "place": "Nirmal", "type": "Government", "est": 2023, "pg": "No", "rating": "3.8 ★", "category": "Newer Govt", "notes": "Developing Campus"},
    {"rank": 43, "name": "Government Medical College", "place": "Jayashankar Bhupalpally", "type": "Government", "est": 2023, "pg": "No", "rating": "3.7 ★", "category": "Newer Govt", "notes": "Remote District GMC"},
    {"rank": 44, "name": "Government Medical College", "place": "Kamareddy", "type": "Government", "est": 2023, "pg": "No", "rating": "3.7 ★", "category": "Newer Govt", "notes": "Developing Campus"},
    {"rank": 45, "name": "Government Medical College", "place": "Kumuram Bheem Asifabad", "type": "Government", "est": 2023, "pg": "No", "rating": "3.7 ★", "category": "Newer Govt", "notes": "Remote Tribal District GMC"},
    {"rank": 46, "name": "Government Medical College", "place": "Quthbullapur", "type": "Government", "est": 2024, "pg": "No", "rating": "3.8 ★", "category": "New 2024 Govt", "notes": "Urban Location (Medchal Dist), New Infrastructure"},

    # TIER 5: MINORITY PRIVATE MEDICAL COLLEGES
    {"rank": 47, "name": "Deccan College of Medical Sciences", "place": "Kanchanbagh, Hyderabad", "type": "Private (Minority)", "est": 1984, "pg": "Yes", "rating": "4.4 ★", "category": "Minority Top", "notes": "Legacy Muslim Minority College, Owaisi Hospital Attachment"},
    {"rank": 48, "name": "Shadan Institute of Medical Sciences", "place": "Himayathsagar, Hyderabad", "type": "Private (Minority)", "est": 2005, "pg": "Yes", "rating": "4.2 ★", "category": "Minority Established", "notes": "Established Minority Institution, Full PG Departments"},
    {"rank": 49, "name": "Ayaan Institute of Medical Sciences", "place": "Kanakamamidi, Moinabad", "type": "Private (Minority)", "est": 2018, "pg": "No", "rating": "3.8 ★", "category": "Minority", "notes": "Private Muslim Minority College"},
    {"rank": 50, "name": "Dr VRK Women's Medical College", "place": "Aziznagar, Moinabad", "type": "Private (Minority Women)", "est": 2010, "pg": "No", "rating": "3.8 ★", "category": "Minority Women", "notes": "Women's Muslim Minority College"},

    # TIER 6: NEW 2024 PRIVATE COLLEGES
    {"rank": 51, "name": "Father Colombo Institute of Medical Sciences", "place": "Warangal", "type": "Private (Cat-A)", "est": 2023, "pg": "No", "rating": "3.8 ★", "category": "New Private", "notes": "Christian Minority / Open Private College in Warangal"},
    {"rank": 52, "name": "Nova Institute of Medical Sciences", "place": "Jafferguda, Hayathnagar", "type": "Private (Cat-A)", "est": 2024, "pg": "No", "rating": "3.7 ★", "category": "New Private", "notes": "Newly Opened Private College"},

    # TIER 7: NOT RECOMMENDED / LAST OPTION GOVT COLLEGES (2024 New Batch)
    {"rank": 53, "name": "Government Medical College", "place": "Medak", "type": "Government", "est": 2024, "pg": "No", "rating": "3.6 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Hospital Under Construction"},
    {"rank": 54, "name": "Government Medical College", "place": "Maheshwaram", "type": "Government", "est": 2024, "pg": "No", "rating": "3.6 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Developing Facilities"},
    {"rank": 55, "name": "Government Medical College", "place": "Yadadri Bhuvanagiri", "type": "Government", "est": 2024, "pg": "No", "rating": "3.6 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Temporary Campus"},
    {"rank": 56, "name": "Government Medical College", "place": "Kodangal", "type": "Government", "est": 2024, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Remote Location"},
    {"rank": 57, "name": "Government Medical College", "place": "Narsampet", "type": "Government", "est": 2024, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Temporary Facilities"},
    {"rank": 58, "name": "Government Medical College", "place": "Jogulamba Gadwal", "type": "Government", "est": 2024, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Remote Border District"},
    {"rank": 59, "name": "Government Medical College", "place": "Mulugu", "type": "Government", "est": 2024, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Tribal Region"},
    {"rank": 60, "name": "Government Medical College", "place": "Narayanpet", "type": "Government", "est": 2024, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Govt", "notes": "Newly Started 2024, Border District"},

    # TIER 8: NOT RECOMMENDED PRIVATE COLLEGES (Infrastructure / Inspection Issues)
    {"rank": 61, "name": "Maheshwara Medical College", "place": "Chitkul, Patancheru, Medak", "type": "Private (Cat-A)", "est": 2016, "pg": "No", "rating": "3.2 ★", "category": "Not Recommended Private", "notes": "Frequent NMC Audits / Inspection Concerns"},
    {"rank": 62, "name": "Mahavir Institute of Medical Sciences", "place": "Vikarabad", "type": "Private (Cat-A)", "est": 2016, "pg": "No", "rating": "3.3 ★", "category": "Not Recommended Private", "notes": "Low Patient Flow, Remote Location"},
    {"rank": 63, "name": "Surabhi Institute of Medical Sciences", "place": "Mittalapally, Siddipet", "type": "Private (Cat-A)", "est": 2019, "pg": "No", "rating": "3.3 ★", "category": "Not Recommended Private", "notes": "Low Clinical Load & Outlying Location"},
    {"rank": 64, "name": "TRR Institute of Medical Sciences", "place": "Inole, Patancheru", "type": "Private (Cat-A)", "est": 2020, "pg": "No", "rating": "3.2 ★", "category": "Not Recommended Private", "notes": "Low Patient Attendance"},
    {"rank": 65, "name": "Neelima Institute of Medical Sciences", "place": "Kandlakoya, Medchal", "type": "Private (Cat-A)", "est": 2023, "pg": "No", "rating": "3.5 ★", "category": "Not Recommended Private", "notes": "Newer Private Campus, Developing Patient Load"},
    {"rank": 66, "name": "Raja Rajeshwari Institute of Medical Sciences", "place": "Patancheru", "type": "Private (Cat-A Girls)", "est": 2024, "pg": "No", "rating": "3.4 ★", "category": "Not Recommended Private", "notes": "Newly Permitted Girls Medical College"}
]

print(f"Total Colleges Formatted: {len(master_list)}")
with open('master_mixed_preference_list.json', 'w') as f:
    json.dump(master_list, f, indent=2)
