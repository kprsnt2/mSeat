// ============================================================
// TELANGANA MBBS MOCK COUNSELLING 2026 — Application Logic
// ============================================================

// --- NEET Score to All India Rank Interpolation Data (Based on NEET 2025) ---
const scoreRankData = [
  {
    "score": 705,
    "rank": 13,
    "stateSno": 1
  },
  {
    "score": 701,
    "rank": 19,
    "stateSno": 2
  },
  {
    "score": 700,
    "rank": 32,
    "stateSno": 4
  },
  {
    "score": 693,
    "rank": 83,
    "stateSno": 6
  },
  {
    "score": 691,
    "rank": 91,
    "stateSno": 7
  },
  {
    "score": 690,
    "rank": 123,
    "stateSno": 8
  },
  {
    "score": 686,
    "rank": 157,
    "stateSno": 10
  },
  {
    "score": 685,
    "rank": 199,
    "stateSno": 11
  },
  {
    "score": 682,
    "rank": 227,
    "stateSno": 13
  },
  {
    "score": 680,
    "rank": 273,
    "stateSno": 16
  },
  {
    "score": 675,
    "rank": 400,
    "stateSno": 18
  },
  {
    "score": 670,
    "rank": 514,
    "stateSno": 20
  },
  {
    "score": 667,
    "rank": 609,
    "stateSno": 22
  },
  {
    "score": 666,
    "rank": 646,
    "stateSno": 25
  },
  {
    "score": 665,
    "rank": 699,
    "stateSno": 29
  },
  {
    "score": 661,
    "rank": 822,
    "stateSno": 31
  },
  {
    "score": 660,
    "rank": 884,
    "stateSno": 34
  },
  {
    "score": 659,
    "rank": 941,
    "stateSno": 36
  },
  {
    "score": 658,
    "rank": 964,
    "stateSno": 39
  },
  {
    "score": 657,
    "rank": 1008,
    "stateSno": 41
  },
  {
    "score": 656,
    "rank": 1061,
    "stateSno": 43
  },
  {
    "score": 655,
    "rank": 1153,
    "stateSno": 47
  },
  {
    "score": 653,
    "rank": 1256,
    "stateSno": 50
  },
  {
    "score": 652,
    "rank": 1308,
    "stateSno": 53
  },
  {
    "score": 651,
    "rank": 1343,
    "stateSno": 56
  },
  {
    "score": 650,
    "rank": 1491,
    "stateSno": 58
  },
  {
    "score": 649,
    "rank": 1521,
    "stateSno": 60
  },
  {
    "score": 648,
    "rank": 1572,
    "stateSno": 62
  },
  {
    "score": 647,
    "rank": 1668,
    "stateSno": 65
  },
  {
    "score": 646,
    "rank": 1728,
    "stateSno": 67
  },
  {
    "score": 645,
    "rank": 1850,
    "stateSno": 69
  },
  {
    "score": 643,
    "rank": 1975,
    "stateSno": 71
  },
  {
    "score": 642,
    "rank": 2079,
    "stateSno": 72
  },
  {
    "score": 641,
    "rank": 2117,
    "stateSno": 74
  },
  {
    "score": 640,
    "rank": 2280,
    "stateSno": 78
  },
  {
    "score": 639,
    "rank": 2399,
    "stateSno": 81
  },
  {
    "score": 638,
    "rank": 2460,
    "stateSno": 83
  },
  {
    "score": 637,
    "rank": 2567,
    "stateSno": 86
  },
  {
    "score": 636,
    "rank": 2717,
    "stateSno": 90
  },
  {
    "score": 635,
    "rank": 2842,
    "stateSno": 93
  },
  {
    "score": 634,
    "rank": 2962,
    "stateSno": 97
  },
  {
    "score": 633,
    "rank": 3091,
    "stateSno": 102
  },
  {
    "score": 632,
    "rank": 3265,
    "stateSno": 106
  },
  {
    "score": 631,
    "rank": 3371,
    "stateSno": 107
  },
  {
    "score": 630,
    "rank": 3474,
    "stateSno": 110
  },
  {
    "score": 629,
    "rank": 3624,
    "stateSno": 114
  },
  {
    "score": 628,
    "rank": 3775,
    "stateSno": 118
  },
  {
    "score": 627,
    "rank": 3852,
    "stateSno": 120
  },
  {
    "score": 625,
    "rank": 4200,
    "stateSno": 124
  },
  {
    "score": 624,
    "rank": 4392,
    "stateSno": 130
  },
  {
    "score": 623,
    "rank": 4545,
    "stateSno": 134
  },
  {
    "score": 622,
    "rank": 4700,
    "stateSno": 136
  },
  {
    "score": 621,
    "rank": 4869,
    "stateSno": 139
  },
  {
    "score": 620,
    "rank": 5076,
    "stateSno": 146
  },
  {
    "score": 619,
    "rank": 5285,
    "stateSno": 151
  },
  {
    "score": 618,
    "rank": 5451,
    "stateSno": 153
  },
  {
    "score": 617,
    "rank": 5714,
    "stateSno": 155
  },
  {
    "score": 616,
    "rank": 5857,
    "stateSno": 157
  },
  {
    "score": 615,
    "rank": 6070,
    "stateSno": 160
  },
  {
    "score": 614,
    "rank": 6252,
    "stateSno": 164
  },
  {
    "score": 613,
    "rank": 6411,
    "stateSno": 165
  },
  {
    "score": 612,
    "rank": 6756,
    "stateSno": 167
  },
  {
    "score": 611,
    "rank": 7061,
    "stateSno": 169
  },
  {
    "score": 610,
    "rank": 7241,
    "stateSno": 174
  },
  {
    "score": 609,
    "rank": 7540,
    "stateSno": 179
  },
  {
    "score": 608,
    "rank": 7640,
    "stateSno": 180
  },
  {
    "score": 607,
    "rank": 7959,
    "stateSno": 183
  },
  {
    "score": 606,
    "rank": 8247,
    "stateSno": 187
  },
  {
    "score": 605,
    "rank": 8580,
    "stateSno": 191
  },
  {
    "score": 604,
    "rank": 8773,
    "stateSno": 194
  },
  {
    "score": 603,
    "rank": 9149,
    "stateSno": 197
  },
  {
    "score": 602,
    "rank": 9365,
    "stateSno": 200
  },
  {
    "score": 601,
    "rank": 9661,
    "stateSno": 204
  },
  {
    "score": 600,
    "rank": 9906,
    "stateSno": 208
  },
  {
    "score": 599,
    "rank": 10270,
    "stateSno": 209
  },
  {
    "score": 598,
    "rank": 10668,
    "stateSno": 213
  },
  {
    "score": 597,
    "rank": 10920,
    "stateSno": 218
  },
  {
    "score": 596,
    "rank": 11361,
    "stateSno": 222
  },
  {
    "score": 595,
    "rank": 11612,
    "stateSno": 229
  },
  {
    "score": 594,
    "rank": 11980,
    "stateSno": 237
  },
  {
    "score": 593,
    "rank": 12372,
    "stateSno": 243
  },
  {
    "score": 592,
    "rank": 12907,
    "stateSno": 249
  },
  {
    "score": 590,
    "rank": 13674,
    "stateSno": 252
  },
  {
    "score": 589,
    "rank": 14010,
    "stateSno": 255
  },
  {
    "score": 588,
    "rank": 14507,
    "stateSno": 257
  },
  {
    "score": 587,
    "rank": 14743,
    "stateSno": 259
  },
  {
    "score": 586,
    "rank": 15127,
    "stateSno": 261
  },
  {
    "score": 585,
    "rank": 15585,
    "stateSno": 265
  },
  {
    "score": 584,
    "rank": 16157,
    "stateSno": 270
  },
  {
    "score": 583,
    "rank": 16513,
    "stateSno": 275
  },
  {
    "score": 582,
    "rank": 16942,
    "stateSno": 280
  },
  {
    "score": 581,
    "rank": 17438,
    "stateSno": 285
  },
  {
    "score": 580,
    "rank": 18004,
    "stateSno": 291
  },
  {
    "score": 579,
    "rank": 18577,
    "stateSno": 296
  },
  {
    "score": 578,
    "rank": 19026,
    "stateSno": 301
  },
  {
    "score": 577,
    "rank": 19537,
    "stateSno": 305
  },
  {
    "score": 576,
    "rank": 19837,
    "stateSno": 308
  },
  {
    "score": 575,
    "rank": 20515,
    "stateSno": 312
  },
  {
    "score": 574,
    "rank": 21085,
    "stateSno": 319
  },
  {
    "score": 573,
    "rank": 21679,
    "stateSno": 325
  },
  {
    "score": 572,
    "rank": 22191,
    "stateSno": 330
  },
  {
    "score": 571,
    "rank": 22705,
    "stateSno": 335
  },
  {
    "score": 570,
    "rank": 23305,
    "stateSno": 339
  },
  {
    "score": 569,
    "rank": 24134,
    "stateSno": 343
  },
  {
    "score": 568,
    "rank": 24593,
    "stateSno": 348
  },
  {
    "score": 567,
    "rank": 24994,
    "stateSno": 353
  },
  {
    "score": 566,
    "rank": 25707,
    "stateSno": 357
  },
  {
    "score": 565,
    "rank": 26396,
    "stateSno": 366
  },
  {
    "score": 564,
    "rank": 27090,
    "stateSno": 377
  },
  {
    "score": 563,
    "rank": 27718,
    "stateSno": 387
  },
  {
    "score": 562,
    "rank": 28373,
    "stateSno": 396
  },
  {
    "score": 561,
    "rank": 29094,
    "stateSno": 405
  },
  {
    "score": 560,
    "rank": 29835,
    "stateSno": 414
  },
  {
    "score": 559,
    "rank": 30498,
    "stateSno": 422
  },
  {
    "score": 558,
    "rank": 31383,
    "stateSno": 426
  },
  {
    "score": 557,
    "rank": 31915,
    "stateSno": 430
  },
  {
    "score": 556,
    "rank": 32673,
    "stateSno": 438
  },
  {
    "score": 555,
    "rank": 33360,
    "stateSno": 447
  },
  {
    "score": 554,
    "rank": 34211,
    "stateSno": 456
  },
  {
    "score": 553,
    "rank": 34899,
    "stateSno": 463
  },
  {
    "score": 552,
    "rank": 35673,
    "stateSno": 469
  },
  {
    "score": 551,
    "rank": 36420,
    "stateSno": 478
  },
  {
    "score": 550,
    "rank": 37238,
    "stateSno": 488
  },
  {
    "score": 549,
    "rank": 38084,
    "stateSno": 496
  },
  {
    "score": 548,
    "rank": 38835,
    "stateSno": 504
  },
  {
    "score": 547,
    "rank": 39550,
    "stateSno": 509
  },
  {
    "score": 546,
    "rank": 40535,
    "stateSno": 514
  },
  {
    "score": 545,
    "rank": 41191,
    "stateSno": 522
  },
  {
    "score": 544,
    "rank": 42055,
    "stateSno": 531
  },
  {
    "score": 543,
    "rank": 43046,
    "stateSno": 541
  },
  {
    "score": 542,
    "rank": 43811,
    "stateSno": 554
  },
  {
    "score": 541,
    "rank": 44702,
    "stateSno": 567
  },
  {
    "score": 540,
    "rank": 45686,
    "stateSno": 579
  },
  {
    "score": 539,
    "rank": 46745,
    "stateSno": 588
  },
  {
    "score": 538,
    "rank": 47573,
    "stateSno": 598
  },
  {
    "score": 537,
    "rank": 48467,
    "stateSno": 611
  },
  {
    "score": 536,
    "rank": 49480,
    "stateSno": 624
  },
  {
    "score": 535,
    "rank": 50415,
    "stateSno": 639
  },
  {
    "score": 534,
    "rank": 51263,
    "stateSno": 648
  },
  {
    "score": 533,
    "rank": 52216,
    "stateSno": 658
  },
  {
    "score": 532,
    "rank": 53395,
    "stateSno": 669
  },
  {
    "score": 531,
    "rank": 54266,
    "stateSno": 677
  },
  {
    "score": 530,
    "rank": 55263,
    "stateSno": 688
  },
  {
    "score": 529,
    "rank": 56377,
    "stateSno": 706
  },
  {
    "score": 528,
    "rank": 57244,
    "stateSno": 724
  },
  {
    "score": 527,
    "rank": 58311,
    "stateSno": 737
  },
  {
    "score": 526,
    "rank": 59339,
    "stateSno": 752
  },
  {
    "score": 525,
    "rank": 60430,
    "stateSno": 768
  },
  {
    "score": 524,
    "rank": 61482,
    "stateSno": 780
  },
  {
    "score": 523,
    "rank": 62343,
    "stateSno": 794
  },
  {
    "score": 522,
    "rank": 63477,
    "stateSno": 809
  },
  {
    "score": 521,
    "rank": 64752,
    "stateSno": 827
  },
  {
    "score": 520,
    "rank": 65890,
    "stateSno": 847
  },
  {
    "score": 519,
    "rank": 66961,
    "stateSno": 862
  },
  {
    "score": 518,
    "rank": 67994,
    "stateSno": 873
  },
  {
    "score": 517,
    "rank": 69233,
    "stateSno": 886
  },
  {
    "score": 516,
    "rank": 70404,
    "stateSno": 907
  },
  {
    "score": 515,
    "rank": 71552,
    "stateSno": 929
  },
  {
    "score": 514,
    "rank": 72619,
    "stateSno": 948
  },
  {
    "score": 513,
    "rank": 73800,
    "stateSno": 966
  },
  {
    "score": 512,
    "rank": 75040,
    "stateSno": 986
  },
  {
    "score": 511,
    "rank": 76244,
    "stateSno": 1006
  },
  {
    "score": 510,
    "rank": 77456,
    "stateSno": 1026
  },
  {
    "score": 509,
    "rank": 78607,
    "stateSno": 1046
  },
  {
    "score": 508,
    "rank": 79878,
    "stateSno": 1067
  },
  {
    "score": 507,
    "rank": 81070,
    "stateSno": 1090
  },
  {
    "score": 506,
    "rank": 82244,
    "stateSno": 1112
  },
  {
    "score": 505,
    "rank": 83611,
    "stateSno": 1137
  },
  {
    "score": 504,
    "rank": 84859,
    "stateSno": 1165
  },
  {
    "score": 503,
    "rank": 86181,
    "stateSno": 1192
  },
  {
    "score": 502,
    "rank": 87316,
    "stateSno": 1215
  },
  {
    "score": 501,
    "rank": 88600,
    "stateSno": 1242
  },
  {
    "score": 500,
    "rank": 89954,
    "stateSno": 1275
  },
  {
    "score": 499,
    "rank": 91409,
    "stateSno": 1306
  },
  {
    "score": 498,
    "rank": 92487,
    "stateSno": 1330
  },
  {
    "score": 497,
    "rank": 93952,
    "stateSno": 1357
  },
  {
    "score": 496,
    "rank": 95269,
    "stateSno": 1386
  },
  {
    "score": 495,
    "rank": 96704,
    "stateSno": 1415
  },
  {
    "score": 494,
    "rank": 98031,
    "stateSno": 1448
  },
  {
    "score": 493,
    "rank": 99235,
    "stateSno": 1479
  },
  {
    "score": 492,
    "rank": 100549,
    "stateSno": 1507
  },
  {
    "score": 491,
    "rank": 102129,
    "stateSno": 1535
  },
  {
    "score": 490,
    "rank": 103481,
    "stateSno": 1566
  },
  {
    "score": 489,
    "rank": 104969,
    "stateSno": 1599
  },
  {
    "score": 488,
    "rank": 106228,
    "stateSno": 1633
  },
  {
    "score": 487,
    "rank": 107606,
    "stateSno": 1670
  },
  {
    "score": 486,
    "rank": 109078,
    "stateSno": 1703
  },
  {
    "score": 485,
    "rank": 110559,
    "stateSno": 1738
  },
  {
    "score": 484,
    "rank": 111981,
    "stateSno": 1773
  },
  {
    "score": 483,
    "rank": 113407,
    "stateSno": 1803
  },
  {
    "score": 482,
    "rank": 114980,
    "stateSno": 1836
  },
  {
    "score": 481,
    "rank": 116302,
    "stateSno": 1868
  },
  {
    "score": 480,
    "rank": 117906,
    "stateSno": 1904
  },
  {
    "score": 479,
    "rank": 119428,
    "stateSno": 1940
  },
  {
    "score": 478,
    "rank": 120837,
    "stateSno": 1974
  },
  {
    "score": 477,
    "rank": 122213,
    "stateSno": 2013
  },
  {
    "score": 476,
    "rank": 123832,
    "stateSno": 2050
  },
  {
    "score": 475,
    "rank": 125465,
    "stateSno": 2093
  },
  {
    "score": 474,
    "rank": 126973,
    "stateSno": 2140
  },
  {
    "score": 473,
    "rank": 128573,
    "stateSno": 2187
  },
  {
    "score": 472,
    "rank": 129970,
    "stateSno": 2238
  },
  {
    "score": 471,
    "rank": 131643,
    "stateSno": 2285
  },
  {
    "score": 470,
    "rank": 133241,
    "stateSno": 2334
  },
  {
    "score": 469,
    "rank": 134814,
    "stateSno": 2386
  },
  {
    "score": 468,
    "rank": 136251,
    "stateSno": 2434
  },
  {
    "score": 467,
    "rank": 137895,
    "stateSno": 2482
  },
  {
    "score": 466,
    "rank": 139465,
    "stateSno": 2540
  },
  {
    "score": 465,
    "rank": 141148,
    "stateSno": 2596
  },
  {
    "score": 464,
    "rank": 142931,
    "stateSno": 2653
  },
  {
    "score": 463,
    "rank": 144530,
    "stateSno": 2709
  },
  {
    "score": 462,
    "rank": 146226,
    "stateSno": 2763
  },
  {
    "score": 461,
    "rank": 147947,
    "stateSno": 2826
  },
  {
    "score": 460,
    "rank": 149716,
    "stateSno": 2892
  },
  {
    "score": 459,
    "rank": 151427,
    "stateSno": 2951
  },
  {
    "score": 458,
    "rank": 153185,
    "stateSno": 3008
  },
  {
    "score": 457,
    "rank": 154772,
    "stateSno": 3068
  },
  {
    "score": 456,
    "rank": 156445,
    "stateSno": 3130
  },
  {
    "score": 455,
    "rank": 158240,
    "stateSno": 3194
  },
  {
    "score": 454,
    "rank": 160203,
    "stateSno": 3260
  },
  {
    "score": 453,
    "rank": 161870,
    "stateSno": 3327
  },
  {
    "score": 452,
    "rank": 163633,
    "stateSno": 3390
  },
  {
    "score": 451,
    "rank": 165360,
    "stateSno": 3451
  },
  {
    "score": 450,
    "rank": 167320,
    "stateSno": 3518
  },
  {
    "score": 449,
    "rank": 169105,
    "stateSno": 3585
  },
  {
    "score": 448,
    "rank": 170774,
    "stateSno": 3651
  },
  {
    "score": 447,
    "rank": 172635,
    "stateSno": 3727
  },
  {
    "score": 446,
    "rank": 174539,
    "stateSno": 3794
  },
  {
    "score": 445,
    "rank": 176487,
    "stateSno": 3857
  },
  {
    "score": 444,
    "rank": 178368,
    "stateSno": 3929
  },
  {
    "score": 443,
    "rank": 180194,
    "stateSno": 4005
  },
  {
    "score": 442,
    "rank": 181964,
    "stateSno": 4085
  },
  {
    "score": 441,
    "rank": 183753,
    "stateSno": 4164
  },
  {
    "score": 440,
    "rank": 185868,
    "stateSno": 4241
  },
  {
    "score": 439,
    "rank": 187951,
    "stateSno": 4320
  },
  {
    "score": 438,
    "rank": 189645,
    "stateSno": 4391
  },
  {
    "score": 437,
    "rank": 191636,
    "stateSno": 4463
  },
  {
    "score": 436,
    "rank": 193756,
    "stateSno": 4542
  },
  {
    "score": 435,
    "rank": 195607,
    "stateSno": 4626
  },
  {
    "score": 434,
    "rank": 197649,
    "stateSno": 4711
  },
  {
    "score": 433,
    "rank": 199705,
    "stateSno": 4790
  },
  {
    "score": 432,
    "rank": 201688,
    "stateSno": 4867
  },
  {
    "score": 431,
    "rank": 203558,
    "stateSno": 4951
  },
  {
    "score": 430,
    "rank": 205704,
    "stateSno": 5037
  },
  {
    "score": 429,
    "rank": 207842,
    "stateSno": 5110
  },
  {
    "score": 428,
    "rank": 209882,
    "stateSno": 5184
  },
  {
    "score": 427,
    "rank": 211730,
    "stateSno": 5269
  },
  {
    "score": 426,
    "rank": 213844,
    "stateSno": 5367
  },
  {
    "score": 425,
    "rank": 216065,
    "stateSno": 5479
  },
  {
    "score": 424,
    "rank": 218240,
    "stateSno": 5589
  },
  {
    "score": 423,
    "rank": 220274,
    "stateSno": 5699
  },
  {
    "score": 422,
    "rank": 222326,
    "stateSno": 5798
  },
  {
    "score": 421,
    "rank": 224438,
    "stateSno": 5893
  },
  {
    "score": 420,
    "rank": 226763,
    "stateSno": 5997
  },
  {
    "score": 419,
    "rank": 228840,
    "stateSno": 6091
  },
  {
    "score": 418,
    "rank": 231105,
    "stateSno": 6180
  },
  {
    "score": 417,
    "rank": 233224,
    "stateSno": 6276
  },
  {
    "score": 416,
    "rank": 235425,
    "stateSno": 6382
  },
  {
    "score": 415,
    "rank": 237659,
    "stateSno": 6489
  },
  {
    "score": 414,
    "rank": 240102,
    "stateSno": 6591
  },
  {
    "score": 413,
    "rank": 242251,
    "stateSno": 6701
  },
  {
    "score": 412,
    "rank": 244411,
    "stateSno": 6806
  },
  {
    "score": 411,
    "rank": 246814,
    "stateSno": 6907
  },
  {
    "score": 410,
    "rank": 249148,
    "stateSno": 7025
  },
  {
    "score": 409,
    "rank": 251528,
    "stateSno": 7147
  },
  {
    "score": 408,
    "rank": 253823,
    "stateSno": 7255
  },
  {
    "score": 407,
    "rank": 256043,
    "stateSno": 7362
  },
  {
    "score": 406,
    "rank": 258499,
    "stateSno": 7480
  },
  {
    "score": 405,
    "rank": 260923,
    "stateSno": 7601
  },
  {
    "score": 404,
    "rank": 263401,
    "stateSno": 7718
  },
  {
    "score": 403,
    "rank": 265780,
    "stateSno": 7832
  },
  {
    "score": 402,
    "rank": 268148,
    "stateSno": 7951
  },
  {
    "score": 401,
    "rank": 270421,
    "stateSno": 8061
  },
  {
    "score": 400,
    "rank": 273128,
    "stateSno": 8164
  },
  {
    "score": 399,
    "rank": 275705,
    "stateSno": 8280
  },
  {
    "score": 398,
    "rank": 277997,
    "stateSno": 8389
  },
  {
    "score": 397,
    "rank": 280351,
    "stateSno": 8491
  },
  {
    "score": 396,
    "rank": 282960,
    "stateSno": 8608
  },
  {
    "score": 395,
    "rank": 285634,
    "stateSno": 8728
  },
  {
    "score": 394,
    "rank": 288320,
    "stateSno": 8841
  },
  {
    "score": 393,
    "rank": 290750,
    "stateSno": 8960
  },
  {
    "score": 392,
    "rank": 293294,
    "stateSno": 9084
  },
  {
    "score": 391,
    "rank": 295670,
    "stateSno": 9209
  },
  {
    "score": 390,
    "rank": 298434,
    "stateSno": 9332
  },
  {
    "score": 389,
    "rank": 301225,
    "stateSno": 9450
  },
  {
    "score": 388,
    "rank": 303752,
    "stateSno": 9569
  },
  {
    "score": 387,
    "rank": 306227,
    "stateSno": 9687
  },
  {
    "score": 386,
    "rank": 308835,
    "stateSno": 9820
  },
  {
    "score": 385,
    "rank": 311575,
    "stateSno": 9957
  },
  {
    "score": 384,
    "rank": 314136,
    "stateSno": 10077
  },
  {
    "score": 383,
    "rank": 316784,
    "stateSno": 10195
  },
  {
    "score": 382,
    "rank": 319517,
    "stateSno": 10320
  },
  {
    "score": 381,
    "rank": 322152,
    "stateSno": 10445
  },
  {
    "score": 380,
    "rank": 325029,
    "stateSno": 10574
  },
  {
    "score": 379,
    "rank": 327953,
    "stateSno": 10710
  },
  {
    "score": 378,
    "rank": 330792,
    "stateSno": 10843
  },
  {
    "score": 377,
    "rank": 333490,
    "stateSno": 10971
  },
  {
    "score": 376,
    "rank": 336173,
    "stateSno": 11089
  },
  {
    "score": 375,
    "rank": 339127,
    "stateSno": 11211
  },
  {
    "score": 374,
    "rank": 342042,
    "stateSno": 11343
  },
  {
    "score": 373,
    "rank": 344977,
    "stateSno": 11471
  },
  {
    "score": 372,
    "rank": 347765,
    "stateSno": 11594
  },
  {
    "score": 371,
    "rank": 350552,
    "stateSno": 11717
  },
  {
    "score": 370,
    "rank": 353587,
    "stateSno": 11852
  },
  {
    "score": 369,
    "rank": 356700,
    "stateSno": 11993
  },
  {
    "score": 368,
    "rank": 359647,
    "stateSno": 12116
  },
  {
    "score": 367,
    "rank": 362544,
    "stateSno": 12240
  },
  {
    "score": 366,
    "rank": 365455,
    "stateSno": 12381
  },
  {
    "score": 365,
    "rank": 368690,
    "stateSno": 12526
  },
  {
    "score": 364,
    "rank": 371884,
    "stateSno": 12663
  },
  {
    "score": 363,
    "rank": 374679,
    "stateSno": 12792
  },
  {
    "score": 362,
    "rank": 377575,
    "stateSno": 12913
  },
  {
    "score": 361,
    "rank": 380673,
    "stateSno": 13043
  },
  {
    "score": 360,
    "rank": 383909,
    "stateSno": 13172
  },
  {
    "score": 359,
    "rank": 387120,
    "stateSno": 13292
  },
  {
    "score": 358,
    "rank": 390058,
    "stateSno": 13409
  },
  {
    "score": 357,
    "rank": 393015,
    "stateSno": 13543
  },
  {
    "score": 356,
    "rank": 395926,
    "stateSno": 13682
  },
  {
    "score": 355,
    "rank": 399435,
    "stateSno": 13822
  },
  {
    "score": 354,
    "rank": 402715,
    "stateSno": 13971
  },
  {
    "score": 353,
    "rank": 405851,
    "stateSno": 14107
  },
  {
    "score": 352,
    "rank": 408972,
    "stateSno": 14232
  },
  {
    "score": 351,
    "rank": 412150,
    "stateSno": 14355
  },
  {
    "score": 350,
    "rank": 415561,
    "stateSno": 14494
  },
  {
    "score": 349,
    "rank": 418919,
    "stateSno": 14643
  },
  {
    "score": 348,
    "rank": 422154,
    "stateSno": 14782
  },
  {
    "score": 347,
    "rank": 425343,
    "stateSno": 14914
  },
  {
    "score": 346,
    "rank": 428520,
    "stateSno": 15045
  },
  {
    "score": 345,
    "rank": 431982,
    "stateSno": 15187
  },
  {
    "score": 344,
    "rank": 435616,
    "stateSno": 15321
  },
  {
    "score": 343,
    "rank": 438698,
    "stateSno": 15439
  },
  {
    "score": 342,
    "rank": 442011,
    "stateSno": 15570
  },
  {
    "score": 341,
    "rank": 445316,
    "stateSno": 15704
  },
  {
    "score": 340,
    "rank": 448831,
    "stateSno": 15845
  },
  {
    "score": 339,
    "rank": 452583,
    "stateSno": 15983
  },
  {
    "score": 338,
    "rank": 455765,
    "stateSno": 16106
  },
  {
    "score": 337,
    "rank": 459143,
    "stateSno": 16233
  },
  {
    "score": 336,
    "rank": 462571,
    "stateSno": 16366
  },
  {
    "score": 335,
    "rank": 466202,
    "stateSno": 16503
  },
  {
    "score": 334,
    "rank": 469974,
    "stateSno": 16640
  },
  {
    "score": 333,
    "rank": 473133,
    "stateSno": 16767
  },
  {
    "score": 332,
    "rank": 476582,
    "stateSno": 16894
  },
  {
    "score": 331,
    "rank": 479875,
    "stateSno": 17020
  },
  {
    "score": 330,
    "rank": 483725,
    "stateSno": 17163
  },
  {
    "score": 329,
    "rank": 487511,
    "stateSno": 17315
  },
  {
    "score": 328,
    "rank": 490901,
    "stateSno": 17461
  },
  {
    "score": 327,
    "rank": 494457,
    "stateSno": 17605
  },
  {
    "score": 326,
    "rank": 497988,
    "stateSno": 17749
  },
  {
    "score": 325,
    "rank": 501721,
    "stateSno": 17896
  },
  {
    "score": 324,
    "rank": 505485,
    "stateSno": 18033
  },
  {
    "score": 323,
    "rank": 509001,
    "stateSno": 18163
  },
  {
    "score": 322,
    "rank": 512561,
    "stateSno": 18298
  },
  {
    "score": 321,
    "rank": 516166,
    "stateSno": 18434
  },
  {
    "score": 320,
    "rank": 520094,
    "stateSno": 18580
  },
  {
    "score": 319,
    "rank": 523933,
    "stateSno": 18734
  },
  {
    "score": 318,
    "rank": 527537,
    "stateSno": 18882
  },
  {
    "score": 317,
    "rank": 531150,
    "stateSno": 19021
  },
  {
    "score": 316,
    "rank": 534796,
    "stateSno": 19153
  },
  {
    "score": 315,
    "rank": 538710,
    "stateSno": 19303
  },
  {
    "score": 314,
    "rank": 542564,
    "stateSno": 19455
  },
  {
    "score": 313,
    "rank": 546324,
    "stateSno": 19590
  },
  {
    "score": 312,
    "rank": 549998,
    "stateSno": 19710
  },
  {
    "score": 311,
    "rank": 553526,
    "stateSno": 19835
  },
  {
    "score": 310,
    "rank": 557614,
    "stateSno": 19988
  },
  {
    "score": 309,
    "rank": 561565,
    "stateSno": 20148
  },
  {
    "score": 308,
    "rank": 565113,
    "stateSno": 20296
  },
  {
    "score": 307,
    "rank": 568871,
    "stateSno": 20439
  },
  {
    "score": 306,
    "rank": 572615,
    "stateSno": 20574
  },
  {
    "score": 305,
    "rank": 576705,
    "stateSno": 20724
  },
  {
    "score": 304,
    "rank": 580839,
    "stateSno": 20886
  },
  {
    "score": 303,
    "rank": 584663,
    "stateSno": 21032
  },
  {
    "score": 302,
    "rank": 588420,
    "stateSno": 21159
  },
  {
    "score": 301,
    "rank": 592316,
    "stateSno": 21284
  },
  {
    "score": 300,
    "rank": 596537,
    "stateSno": 21420
  },
  {
    "score": 299,
    "rank": 600728,
    "stateSno": 21563
  },
  {
    "score": 298,
    "rank": 604683,
    "stateSno": 21709
  },
  {
    "score": 297,
    "rank": 608459,
    "stateSno": 21853
  },
  {
    "score": 296,
    "rank": 612151,
    "stateSno": 21989
  },
  {
    "score": 295,
    "rank": 616574,
    "stateSno": 22136
  },
  {
    "score": 294,
    "rank": 620883,
    "stateSno": 22288
  },
  {
    "score": 293,
    "rank": 624670,
    "stateSno": 22420
  },
  {
    "score": 292,
    "rank": 628560,
    "stateSno": 22549
  },
  {
    "score": 291,
    "rank": 632560,
    "stateSno": 22688
  },
  {
    "score": 290,
    "rank": 636980,
    "stateSno": 22853
  },
  {
    "score": 289,
    "rank": 641381,
    "stateSno": 23018
  },
  {
    "score": 288,
    "rank": 645271,
    "stateSno": 23163
  },
  {
    "score": 287,
    "rank": 649108,
    "stateSno": 23307
  },
  {
    "score": 286,
    "rank": 653246,
    "stateSno": 23444
  },
  {
    "score": 285,
    "rank": 657634,
    "stateSno": 23577
  },
  {
    "score": 284,
    "rank": 662012,
    "stateSno": 23708
  },
  {
    "score": 283,
    "rank": 666004,
    "stateSno": 23839
  },
  {
    "score": 282,
    "rank": 670034,
    "stateSno": 23976
  },
  {
    "score": 281,
    "rank": 674141,
    "stateSno": 24121
  },
  {
    "score": 280,
    "rank": 678576,
    "stateSno": 24277
  },
  {
    "score": 279,
    "rank": 683020,
    "stateSno": 24429
  },
  {
    "score": 278,
    "rank": 686969,
    "stateSno": 24560
  },
  {
    "score": 277,
    "rank": 690988,
    "stateSno": 24680
  },
  {
    "score": 276,
    "rank": 695241,
    "stateSno": 24814
  },
  {
    "score": 275,
    "rank": 699934,
    "stateSno": 24958
  },
  {
    "score": 274,
    "rank": 704602,
    "stateSno": 25107
  },
  {
    "score": 273,
    "rank": 708777,
    "stateSno": 25254
  },
  {
    "score": 272,
    "rank": 712885,
    "stateSno": 25396
  },
  {
    "score": 271,
    "rank": 717085,
    "stateSno": 25546
  },
  {
    "score": 270,
    "rank": 721803,
    "stateSno": 25704
  },
  {
    "score": 269,
    "rank": 726511,
    "stateSno": 25851
  },
  {
    "score": 268,
    "rank": 730532,
    "stateSno": 25969
  },
  {
    "score": 267,
    "rank": 734582,
    "stateSno": 26086
  },
  {
    "score": 266,
    "rank": 738901,
    "stateSno": 26215
  },
  {
    "score": 265,
    "rank": 743742,
    "stateSno": 26374
  },
  {
    "score": 264,
    "rank": 748501,
    "stateSno": 26544
  },
  {
    "score": 263,
    "rank": 752763,
    "stateSno": 26690
  },
  {
    "score": 262,
    "rank": 757015,
    "stateSno": 26836
  },
  {
    "score": 261,
    "rank": 761418,
    "stateSno": 26982
  },
  {
    "score": 260,
    "rank": 766301,
    "stateSno": 27139
  },
  {
    "score": 259,
    "rank": 771154,
    "stateSno": 27302
  },
  {
    "score": 258,
    "rank": 775395,
    "stateSno": 27447
  },
  {
    "score": 257,
    "rank": 779754,
    "stateSno": 27578
  },
  {
    "score": 256,
    "rank": 784180,
    "stateSno": 27716
  },
  {
    "score": 255,
    "rank": 789111,
    "stateSno": 27879
  },
  {
    "score": 254,
    "rank": 794037,
    "stateSno": 28029
  },
  {
    "score": 253,
    "rank": 798559,
    "stateSno": 28157
  },
  {
    "score": 252,
    "rank": 802814,
    "stateSno": 28287
  },
  {
    "score": 251,
    "rank": 807091,
    "stateSno": 28411
  },
  {
    "score": 250,
    "rank": 812146,
    "stateSno": 28553
  },
  {
    "score": 249,
    "rank": 817097,
    "stateSno": 28705
  },
  {
    "score": 248,
    "rank": 821465,
    "stateSno": 28851
  },
  {
    "score": 247,
    "rank": 825946,
    "stateSno": 28990
  },
  {
    "score": 246,
    "rank": 830455,
    "stateSno": 29124
  },
  {
    "score": 245,
    "rank": 835591,
    "stateSno": 29276
  },
  {
    "score": 244,
    "rank": 840692,
    "stateSno": 29426
  },
  {
    "score": 243,
    "rank": 845049,
    "stateSno": 29565
  },
  {
    "score": 242,
    "rank": 849658,
    "stateSno": 29712
  },
  {
    "score": 241,
    "rank": 854244,
    "stateSno": 29869
  },
  {
    "score": 240,
    "rank": 859397,
    "stateSno": 30035
  },
  {
    "score": 239,
    "rank": 864330,
    "stateSno": 30198
  },
  {
    "score": 238,
    "rank": 869075,
    "stateSno": 30343
  },
  {
    "score": 237,
    "rank": 873569,
    "stateSno": 30482
  },
  {
    "score": 236,
    "rank": 878296,
    "stateSno": 30628
  },
  {
    "score": 235,
    "rank": 883402,
    "stateSno": 30784
  },
  {
    "score": 234,
    "rank": 888574,
    "stateSno": 30939
  },
  {
    "score": 233,
    "rank": 893193,
    "stateSno": 31076
  },
  {
    "score": 232,
    "rank": 897796,
    "stateSno": 31211
  },
  {
    "score": 231,
    "rank": 902494,
    "stateSno": 31348
  },
  {
    "score": 230,
    "rank": 907929,
    "stateSno": 31499
  },
  {
    "score": 229,
    "rank": 913327,
    "stateSno": 31665
  },
  {
    "score": 228,
    "rank": 918043,
    "stateSno": 31812
  },
  {
    "score": 227,
    "rank": 922804,
    "stateSno": 31949
  },
  {
    "score": 226,
    "rank": 927545,
    "stateSno": 32090
  },
  {
    "score": 225,
    "rank": 932916,
    "stateSno": 32237
  },
  {
    "score": 224,
    "rank": 938405,
    "stateSno": 32386
  },
  {
    "score": 223,
    "rank": 943215,
    "stateSno": 32530
  },
  {
    "score": 222,
    "rank": 947957,
    "stateSno": 32673
  },
  {
    "score": 221,
    "rank": 952838,
    "stateSno": 32819
  },
  {
    "score": 220,
    "rank": 958379,
    "stateSno": 32980
  },
  {
    "score": 219,
    "rank": 963876,
    "stateSno": 33139
  },
  {
    "score": 218,
    "rank": 968738,
    "stateSno": 33284
  },
  {
    "score": 217,
    "rank": 973506,
    "stateSno": 33427
  },
  {
    "score": 216,
    "rank": 978344,
    "stateSno": 33575
  },
  {
    "score": 215,
    "rank": 983906,
    "stateSno": 33748
  },
  {
    "score": 214,
    "rank": 989528,
    "stateSno": 33923
  },
  {
    "score": 213,
    "rank": 994546,
    "stateSno": 34078
  },
  {
    "score": 212,
    "rank": 999338,
    "stateSno": 34208
  },
  {
    "score": 211,
    "rank": 1004333,
    "stateSno": 34311
  },
  {
    "score": 210,
    "rank": 1009901,
    "stateSno": 34423
  },
  {
    "score": 209,
    "rank": 1015629,
    "stateSno": 34543
  },
  {
    "score": 208,
    "rank": 1020728,
    "stateSno": 34663
  },
  {
    "score": 207,
    "rank": 1025621,
    "stateSno": 34780
  },
  {
    "score": 206,
    "rank": 1030705,
    "stateSno": 34882
  },
  {
    "score": 205,
    "rank": 1036556,
    "stateSno": 34988
  },
  {
    "score": 204,
    "rank": 1042210,
    "stateSno": 35090
  },
  {
    "score": 203,
    "rank": 1047383,
    "stateSno": 35186
  },
  {
    "score": 202,
    "rank": 1052467,
    "stateSno": 35288
  },
  {
    "score": 201,
    "rank": 1057632,
    "stateSno": 35386
  },
  {
    "score": 200,
    "rank": 1063618,
    "stateSno": 35509
  },
  {
    "score": 199,
    "rank": 1069481,
    "stateSno": 35625
  },
  {
    "score": 198,
    "rank": 1074619,
    "stateSno": 35719
  },
  {
    "score": 197,
    "rank": 1079827,
    "stateSno": 35817
  },
  {
    "score": 196,
    "rank": 1085007,
    "stateSno": 35914
  },
  {
    "score": 195,
    "rank": 1091077,
    "stateSno": 36030
  },
  {
    "score": 194,
    "rank": 1097103,
    "stateSno": 36153
  },
  {
    "score": 193,
    "rank": 1102291,
    "stateSno": 36265
  },
  {
    "score": 192,
    "rank": 1107346,
    "stateSno": 36360
  },
  {
    "score": 191,
    "rank": 1112577,
    "stateSno": 36446
  },
  {
    "score": 190,
    "rank": 1118587,
    "stateSno": 36551
  },
  {
    "score": 189,
    "rank": 1124806,
    "stateSno": 36666
  },
  {
    "score": 188,
    "rank": 1130119,
    "stateSno": 36778
  },
  {
    "score": 187,
    "rank": 1135329,
    "stateSno": 36885
  },
  {
    "score": 186,
    "rank": 1140694,
    "stateSno": 36993
  },
  {
    "score": 185,
    "rank": 1146848,
    "stateSno": 37110
  },
  {
    "score": 184,
    "rank": 1152976,
    "stateSno": 37227
  },
  {
    "score": 183,
    "rank": 1158288,
    "stateSno": 37332
  },
  {
    "score": 182,
    "rank": 1163556,
    "stateSno": 37429
  },
  {
    "score": 181,
    "rank": 1168806,
    "stateSno": 37523
  },
  {
    "score": 180,
    "rank": 1174981,
    "stateSno": 37634
  },
  {
    "score": 179,
    "rank": 1181238,
    "stateSno": 37757
  },
  {
    "score": 178,
    "rank": 1186884,
    "stateSno": 37865
  },
  {
    "score": 177,
    "rank": 1192143,
    "stateSno": 37968
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
    "name": "Gandhi Medical College",
    "place": "Secunderabad",
    "intake": 250,
    "fee": 29000,
    "type": "govt",
    "ocClosing": 14005,
    "knownRanks": {
      "OC": 14005,
      "EWS": 36264,
      "BC_A": 50912,
      "BC_B": 19245,
      "BC_C": 57245,
      "BC_D": 19227,
      "BC_E": 20161,
      "SC_1": 209523,
      "SC_2": 85048,
      "SC_3": 75332,
      "SC": 85048,
      "ST": 105661
    }
  },
  {
    "id": 2,
    "sno": 2,
    "name": "Osmania Medical College",
    "place": "Hyderabad",
    "intake": 250,
    "fee": 12000,
    "type": "govt",
    "ocClosing": 20152,
    "knownRanks": {
      "OC": 20152,
      "EWS": 42253,
      "BC_A": 111800,
      "BC_B": 40693,
      "BC_C": 120451,
      "BC_D": 40135,
      "BC_E": 32962,
      "SC_1": 262081,
      "SC_2": 113527,
      "SC_3": 102989,
      "SC": 113527,
      "ST": 100282
    }
  },
  {
    "id": 3,
    "sno": 3,
    "name": "ESIC Medical College",
    "place": "Hyderabad",
    "intake": 150,
    "fee": 100000,
    "type": "govt",
    "ocClosing": 23086,
    "knownRanks": {
      "OC": 23086,
      "EWS": 56751,
      "BC_A": 115946,
      "BC_B": 48278,
      "BC_C": 97775,
      "BC_D": 44886,
      "BC_E": 34480,
      "SC_1": 265855,
      "SC_2": 124447,
      "SC_3": 105737,
      "SC": 124447,
      "ST": 130993
    }
  },
  {
    "id": 4,
    "sno": 4,
    "name": "Kakatiya Medical College",
    "place": "Warangal",
    "intake": 250,
    "fee": 52000,
    "type": "govt",
    "ocClosing": 34949,
    "knownRanks": {
      "OC": 34949,
      "EWS": 76976,
      "BC_A": 146715,
      "BC_B": 80734,
      "BC_C": 122894,
      "BC_D": 61615,
      "BC_E": 63472,
      "SC_1": 314933,
      "SC_2": 134111,
      "SC_3": 117924,
      "SC": 134111,
      "ST": 129155
    }
  },
  {
    "id": 5,
    "sno": 5,
    "name": "Govt Medical College, Nizamabad",
    "place": "Nizamabad",
    "intake": 150,
    "seatsIncreased": 30,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 73425,
    "knownRanks": {
      "OC": 73425,
      "EWS": 105147,
      "BC_A": 209017,
      "BC_B": 92522,
      "BC_C": 123682,
      "BC_D": 81914,
      "BC_E": 102680,
      "SC_1": 358097,
      "SC_2": 170469,
      "SC_3": 146853,
      "SC": 170469,
      "ST": 151232
    }
  },
  {
    "id": 6,
    "sno": 6,
    "name": "Govt Medical College, Mahabubnagar",
    "place": "Mahabubnagar",
    "intake": 200,
    "seatsIncreased": 25,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 83549,
    "knownRanks": {
      "OC": 83549,
      "EWS": 101635,
      "BC_A": 196557,
      "BC_B": 98064,
      "BC_C": 146027,
      "BC_D": 94074,
      "BC_E": 95005,
      "SC_1": 334264,
      "SC_2": 177594,
      "SC_3": 158643,
      "SC": 177594,
      "ST": 158490
    }
  },
  {
    "id": 7,
    "sno": 7,
    "name": "RIMS Adilabad",
    "place": "Adilabad",
    "intake": 150,
    "seatsIncreased": 30,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 106173,
    "knownRanks": {
      "OC": 106173,
      "EWS": 131890,
      "BC_A": 229928,
      "BC_B": 118705,
      "BC_C": 215587,
      "BC_D": 109140,
      "BC_E": 140581,
      "SC_1": 462807,
      "SC_2": 213110,
      "SC_3": 189094,
      "SC": 213110,
      "ST": 180152
    }
  },
  {
    "id": 8,
    "sno": 8,
    "name": "Govt Medical College, Siddipet",
    "place": "Siddipet",
    "intake": 200,
    "seatsIncreased": 25,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 81926,
    "knownRanks": {
      "OC": 81926,
      "EWS": 104929,
      "BC_A": 199947,
      "BC_B": 98319,
      "BC_C": 175147,
      "BC_D": 91092,
      "BC_E": 91084,
      "SC_1": 361082,
      "SC_2": 180957,
      "SC_3": 166244,
      "SC": 180957,
      "ST": 160346
    }
  },
  {
    "id": 9,
    "sno": 9,
    "name": "Govt Medical College, Suryapet",
    "place": "Suryapet",
    "intake": 150,
    "fee": 29000,
    "type": "govt",
    "ocClosing": 90137,
    "knownRanks": {
      "OC": 90137,
      "EWS": 103278,
      "BC_A": 215684,
      "BC_B": 106216,
      "BC_C": 128503,
      "BC_D": 98195,
      "BC_E": 123042,
      "SC_1": 348982,
      "SC_2": 186920,
      "SC_3": 185071,
      "SC": 186920,
      "ST": 163013
    }
  },
  {
    "id": 10,
    "sno": 10,
    "name": "Govt Medical College, Nalgonda",
    "place": "Nalgonda",
    "intake": 150,
    "fee": 12000,
    "type": "govt",
    "ocClosing": 102054,
    "knownRanks": {
      "OC": 102054,
      "EWS": 115113,
      "BC_A": 219104,
      "BC_B": 116395,
      "BC_C": 158152,
      "BC_D": 108950,
      "BC_E": 122899,
      "SC_1": 402550,
      "SC_2": 198185,
      "SC_3": 186996,
      "SC": 198185,
      "ST": 170403
    }
  },
  {
    "id": 11,
    "sno": 11,
    "name": "Govt Medical College, Sangareddy",
    "place": "Sangareddy",
    "intake": 150,
    "fee": 84000,
    "type": "govt",
    "ocClosing": 96482,
    "knownRanks": {
      "OC": 96482,
      "EWS": 110487,
      "BC_A": 223707,
      "BC_B": 114018,
      "BC_C": 186976,
      "BC_D": 104322,
      "BC_E": 101474,
      "SC_1": 290793,
      "SC_2": 199823,
      "SC_3": 172247,
      "SC": 199823,
      "ST": 175703
    }
  },
  {
    "id": 12,
    "sno": 12,
    "name": "Govt Medical College, Nagarkurnool",
    "place": "Nagarkurnool",
    "intake": 150,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 117592,
    "knownRanks": {
      "OC": 117592,
      "EWS": 126422,
      "BC_A": 231569,
      "BC_B": 129577,
      "BC_C": 207140,
      "BC_D": 123923,
      "BC_E": 128839,
      "SC_1": 275080,
      "SC_2": 207936,
      "SC_3": 205790,
      "SC": 207936,
      "ST": 178341
    }
  },
  {
    "id": 13,
    "sno": 13,
    "name": "Govt Medical College, Karimnagar",
    "place": "Karimnagar",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 116427,
    "knownRanks": {
      "OC": 116427,
      "EWS": 132176,
      "BC_A": 260580,
      "BC_B": 144958,
      "BC_C": 221663,
      "BC_D": 132906,
      "BC_E": 137427,
      "SC_1": 521020,
      "SC_2": 225030,
      "SC_3": 196649,
      "SC": 225030,
      "ST": 191684
    }
  },
  {
    "id": 14,
    "sno": 14,
    "name": "Govt Medical College, Wanaparthy",
    "place": "Wanaparthy",
    "intake": 100,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 135790,
    "knownRanks": {
      "OC": 135790,
      "EWS": 142420,
      "BC_A": 241368,
      "BC_B": 145935,
      "BC_C": 235043,
      "BC_D": 139413,
      "BC_E": 139288,
      "SC_1": 367015,
      "SC_2": 225652,
      "SC_3": 215645,
      "SC": 225652,
      "ST": 199963
    }
  },
  {
    "id": 15,
    "sno": 15,
    "name": "Govt Medical College, Quthbullapur",
    "place": "Quthbullapur",
    "intake": 50,
    "fee": 76000,
    "type": "govt",
    "ocClosing": 100000,
    "knownRanks": {}
  },
  {
    "id": 16,
    "sno": 16,
    "name": "Govt Medical College, Khammam",
    "place": "Khammam",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 84460,
    "knownRanks": {
      "OC": 84460,
      "EWS": 110199,
      "BC_A": 224244,
      "BC_B": 118022,
      "BC_C": 216174,
      "BC_D": 106760,
      "BC_E": 110719,
      "SC_1": 355539,
      "SC_2": 203607,
      "SC_3": 191184,
      "SC": 203607,
      "ST": 192570
    }
  },
  {
    "id": 17,
    "sno": 17,
    "name": "Govt Medical College, Ramagundam",
    "place": "Ramagundam",
    "intake": 150,
    "fee": 84000,
    "type": "govt",
    "ocClosing": 125432,
    "knownRanks": {
      "OC": 125432,
      "EWS": 9999999,
      "BC_A": 251449,
      "BC_B": 141284,
      "BC_C": 178827,
      "BC_D": 129383,
      "BC_E": 143692,
      "SC_1": 414268,
      "SC_2": 215542,
      "SC_3": 194964,
      "SC": 215542,
      "ST": 194983
    }
  },
  {
    "id": 18,
    "sno": 18,
    "name": "Govt Medical College, Maheshwaram",
    "place": "Maheshwaram",
    "intake": 50,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 124736,
    "knownRanks": {
      "OC": 124736,
      "EWS": 139537,
      "BC_A": 243684,
      "BC_B": 151012,
      "BC_C": 9999999,
      "BC_D": 144216,
      "BC_E": 137464,
      "SC_1": 530230,
      "SC_2": 233671,
      "SC_3": 239054,
      "SC": 233671,
      "ST": 213506
    }
  },
  {
    "id": 19,
    "sno": 19,
    "name": "Govt Medical College, Mahabubabad",
    "place": "Mahabubabad",
    "intake": 150,
    "fee": 84000,
    "type": "govt",
    "ocClosing": 100000,
    "knownRanks": {}
  },
  {
    "id": 20,
    "sno": 20,
    "name": "Govt Medical College, Bhadradri Kothagudem",
    "place": "Bhadradri Kothagudem",
    "intake": 150,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 166387,
    "knownRanks": {
      "OC": 166387,
      "EWS": 175099,
      "BC_A": 279630,
      "BC_B": 179079,
      "BC_C": 278018,
      "BC_D": 182795,
      "BC_E": 194048,
      "SC_1": 415152,
      "SC_2": 243774,
      "SC_3": 241230,
      "SC": 243774,
      "ST": 213617
    }
  },
  {
    "id": 21,
    "sno": 21,
    "name": "Govt Medical College, Kamareddy",
    "place": "Kamareddy",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 150883,
    "knownRanks": {
      "OC": 150883,
      "EWS": 152922,
      "BC_A": 291296,
      "BC_B": 154272,
      "BC_C": 223631,
      "BC_D": 155435,
      "BC_E": 157918,
      "SC_1": 435175,
      "SC_2": 249402,
      "SC_3": 237171,
      "SC": 249402,
      "ST": 201921
    }
  },
  {
    "id": 22,
    "sno": 22,
    "name": "Govt Medical College, Jagtial",
    "place": "Jagtial",
    "intake": 150,
    "fee": 84000,
    "type": "govt",
    "ocClosing": 162835,
    "knownRanks": {
      "OC": 162835,
      "EWS": 9999999,
      "BC_A": 295137,
      "BC_B": 168538,
      "BC_C": 260224,
      "BC_D": 168795,
      "BC_E": 168668,
      "SC_1": 470420,
      "SC_2": 246469,
      "SC_3": 225109,
      "SC": 246469,
      "ST": 220063
    }
  },
  {
    "id": 23,
    "sno": 23,
    "name": "Govt Medical College, Vikarabad",
    "place": "Vikarabad",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 162718,
    "knownRanks": {
      "OC": 162718,
      "EWS": 170265,
      "BC_A": 286256,
      "BC_B": 173885,
      "BC_C": 269946,
      "BC_D": 166831,
      "BC_E": 9999999,
      "SC_1": 679062,
      "SC_2": 235342,
      "SC_3": 245382,
      "SC": 235342,
      "ST": 223347
    }
  },
  {
    "id": 24,
    "sno": 24,
    "name": "Govt Medical College, Jangaon",
    "place": "Jangaon",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 159247,
    "knownRanks": {
      "OC": 159247,
      "EWS": 9999999,
      "BC_A": 288068,
      "BC_B": 171031,
      "BC_C": 239168,
      "BC_D": 168562,
      "BC_E": 161702,
      "SC_1": 341306,
      "SC_2": 241363,
      "SC_3": 241968,
      "SC": 241363,
      "ST": 211822
    }
  },
  {
    "id": 25,
    "sno": 25,
    "name": "Govt Medical College, Mancherial",
    "place": "Mancherial",
    "intake": 100,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 173500,
    "knownRanks": {
      "OC": 173500,
      "EWS": 9999999,
      "BC_A": 301809,
      "BC_B": 177835,
      "BC_C": 245324,
      "BC_D": 175748,
      "BC_E": 179779,
      "SC_1": 689753,
      "SC_2": 254010,
      "SC_3": 247413,
      "SC": 254010,
      "ST": 225951
    }
  },
  {
    "id": 26,
    "sno": 26,
    "name": "Govt Medical College, Rajanna Sircilla",
    "place": "Rajanna Sircilla",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 100000,
    "knownRanks": {}
  },
  {
    "id": 27,
    "sno": 27,
    "name": "Govt Medical College, Yadadri Bhuvanagiri",
    "place": "Yadadri Bhuvanagiri",
    "intake": 50,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 153806,
    "knownRanks": {
      "OC": 153806,
      "EWS": 9999999,
      "BC_A": 261138,
      "BC_B": 173900,
      "BC_C": 207516,
      "BC_D": 165531,
      "BC_E": 165764,
      "SC_1": 610326,
      "SC_2": 239294,
      "SC_3": 225595,
      "SC": 239294,
      "ST": 209482
    }
  },
  {
    "id": 28,
    "sno": 28,
    "name": "Govt Medical College, Nirmal",
    "place": "Nirmal",
    "intake": 100,
    "fee": 59200,
    "type": "govt",
    "ocClosing": 151620,
    "knownRanks": {
      "OC": 151620,
      "EWS": 153633,
      "BC_A": 281458,
      "BC_B": 152892,
      "BC_C": 288322,
      "BC_D": 158335,
      "BC_E": 157332,
      "SC_1": 9999999,
      "SC_2": 241435,
      "SC_3": 209582,
      "SC": 241435,
      "ST": 221195
    }
  },
  {
    "id": 29,
    "sno": 29,
    "name": "Govt Medical College, Jayashankar Bhupalpally",
    "place": "Jayashankar Bhupalpally",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 175820,
    "knownRanks": {
      "OC": 175820,
      "EWS": 176209,
      "BC_A": 304639,
      "BC_B": 187184,
      "BC_C": 249966,
      "BC_D": 180499,
      "BC_E": 187493,
      "SC_1": 1133330,
      "SC_2": 264391,
      "SC_3": 252087,
      "SC": 264391,
      "ST": 232010
    }
  },
  {
    "id": 30,
    "sno": 30,
    "name": "Govt Medical College, Medak",
    "place": "Medak",
    "intake": 50,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 174257,
    "knownRanks": {
      "OC": 174257,
      "EWS": 9999999,
      "BC_A": 302002,
      "BC_B": 185863,
      "BC_C": 284402,
      "BC_D": 180565,
      "BC_E": 190563,
      "SC_1": 558971,
      "SC_2": 255779,
      "SC_3": 254036,
      "SC": 255779,
      "ST": 225356
    }
  },
  {
    "id": 31,
    "sno": 31,
    "name": "Govt Medical College, K.B. Asifabad",
    "place": "Kumuram Bheem Asifabad",
    "intake": 100,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 165625,
    "knownRanks": {
      "OC": 165625,
      "EWS": 175787,
      "BC_A": 297425,
      "BC_B": 178265,
      "BC_C": 269686,
      "BC_D": 167267,
      "BC_E": 174982,
      "SC_1": 629196,
      "SC_2": 252420,
      "SC_3": 249786,
      "SC": 252420,
      "ST": 223207
    }
  },
  {
    "id": 32,
    "sno": 32,
    "name": "Govt Medical College, Narsampet",
    "place": "Narsampet",
    "intake": 50,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 179024,
    "knownRanks": {
      "OC": 179024,
      "EWS": 9999999,
      "BC_A": 313763,
      "BC_B": 197973,
      "BC_C": 331759,
      "BC_D": 183083,
      "BC_E": 195247,
      "SC_1": 1214907,
      "SC_2": 266602,
      "SC_3": 255783,
      "SC": 266602,
      "ST": 237596
    }
  },
  {
    "id": 33,
    "sno": 33,
    "name": "Govt Medical College, Mulugu",
    "place": "Mulugu",
    "intake": 50,
    "fee": 64000,
    "type": "govt",
    "ocClosing": 176459,
    "knownRanks": {
      "OC": 176459,
      "EWS": 9999999,
      "BC_A": 297177,
      "BC_B": 185831,
      "BC_C": 9999999,
      "BC_D": 9999999,
      "BC_E": 190215,
      "SC_1": 9999999,
      "SC_2": 255860,
      "SC_3": 243329,
      "SC": 255860,
      "ST": 233427
    }
  },
  {
    "id": 34,
    "sno": 34,
    "name": "Govt Medical College, Narayanpet",
    "place": "Narayanpet",
    "intake": 50,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 179216,
    "knownRanks": {
      "OC": 179216,
      "EWS": 9999999,
      "BC_A": 305901,
      "BC_B": 197028,
      "BC_C": 261867,
      "BC_D": 181391,
      "BC_E": 192188,
      "SC_1": 9999999,
      "SC_2": 260591,
      "SC_3": 255909,
      "SC": 260591,
      "ST": 241631
    }
  },
  {
    "id": 35,
    "sno": 35,
    "name": "Govt Medical College, Jogulamba",
    "place": "Jogulamba",
    "intake": 50,
    "fee": 41000,
    "type": "govt",
    "ocClosing": 169388,
    "knownRanks": {
      "OC": 169388,
      "EWS": 9999999,
      "BC_A": 303927,
      "BC_B": 193434,
      "BC_C": 9999999,
      "BC_D": 181182,
      "BC_E": 182218,
      "SC_1": 9999999,
      "SC_2": 249992,
      "SC_3": 244177,
      "SC": 249992,
      "ST": 236988
    }
  },
  {
    "id": 36,
    "sno": 36,
    "name": "Govt Medical College, Kodangal",
    "place": "Kodangal",
    "intake": 50,
    "fee": 76000,
    "type": "govt",
    "ocClosing": 169071,
    "knownRanks": {
      "OC": 169071,
      "EWS": 9999999,
      "BC_A": 296807,
      "BC_B": 190367,
      "BC_C": 9999999,
      "BC_D": 181316,
      "BC_E": 184762,
      "SC_1": 9999999,
      "SC_2": 243784,
      "SC_3": 255936,
      "SC": 243784,
      "ST": 238897
    }
  }
];

// --- Private Colleges Data (User's preference order, Cat-A fees shown) ---
const pvtColleges = [
  {
    "id": 101,
    "sno": 37,
    "name": "Apollo Institute of Medical Sciences",
    "place": "Hyderabad",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 168396,
    "knownRanks": {
      "OC": 168396,
      "EWS": 9999999,
      "BC_A": 306190,
      "BC_B": 195913,
      "BC_C": 9999999,
      "BC_D": 175901,
      "BC_E": 190467,
      "SC_1": 9999999,
      "SC_2": 264377,
      "SC_3": 239522,
      "SC": 264377,
      "ST": 237016
    }
  },
  {
    "id": 102,
    "sno": 38,
    "name": "Kamineni Academy of Medical Sciences",
    "place": "LB Nagar, Hyderabad",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 41663,
    "knownRanks": {
      "OC": 41663,
      "EWS": 79967,
      "BC_A": 150881,
      "BC_B": 58025,
      "BC_C": 129773,
      "BC_D": 67293,
      "BC_E": 93606,
      "SC_1": 333834,
      "SC_2": 186685,
      "SC_3": 164427,
      "SC": 186685,
      "ST": 196923
    }
  },
  {
    "id": 103,
    "sno": 39,
    "name": "Mamata Academy of Medical Sciences",
    "place": "Bachupally, Hyderabad",
    "intake": 200,
    "seatsIncreased": 50,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 78320,
    "knownRanks": {
      "OC": 78320,
      "EWS": 923065,
      "BC_A": 266133,
      "BC_B": 138981,
      "BC_C": 225276,
      "BC_D": 116784,
      "BC_E": 141053,
      "SC_1": 396599,
      "SC_2": 290310,
      "SC_3": 206612,
      "SC": 290310,
      "ST": 244668
    }
  },
  {
    "id": 104,
    "sno": 40,
    "name": "S.V.S. Medical College",
    "place": "Mahabubnagar",
    "intake": 200,
    "seatsIncreased": 50,
    "feeA": 60000,
    "feeB": 1250000,
    "feeC": 2500000,
    "type": "pvt",
    "ocClosing": 180000,
    "knownRanks": {}
  },
  {
    "id": 105,
    "sno": 41,
    "name": "Kamineni Institute of Medical Sciences",
    "place": "Narketpally",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 117606,
    "knownRanks": {
      "OC": 117606,
      "EWS": 136936,
      "BC_A": 266601,
      "BC_B": 130949,
      "BC_C": 231994,
      "BC_D": 127687,
      "BC_E": 137273,
      "SC_1": 247352,
      "SC_2": 266874,
      "SC_3": 247383,
      "SC": 266874,
      "ST": 244451
    }
  },
  {
    "id": 106,
    "sno": 42,
    "name": "Mamata Medical College",
    "place": "Khammam",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 151015,
    "knownRanks": {
      "OC": 151015,
      "EWS": 168125,
      "BC_A": 299081,
      "BC_B": 170762,
      "BC_C": 286140,
      "BC_D": 168648,
      "BC_E": 198388,
      "SC_1": 256253,
      "SC_2": 275433,
      "SC_3": 259216,
      "SC": 275433,
      "ST": 243369
    }
  },
  {
    "id": 107,
    "sno": 43,
    "name": "Bhaskar Medical College",
    "place": "Moinabad, Rangareddy",
    "intake": 200,
    "seatsIncreased": 50,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 172869,
    "knownRanks": {
      "OC": 172869,
      "EWS": 188743,
      "BC_A": 346666,
      "BC_B": 194557,
      "BC_C": 309683,
      "BC_D": 198271,
      "BC_E": 216978,
      "SC_1": 599181,
      "SC_2": 316864,
      "SC_3": 264992,
      "SC": 316864,
      "ST": 263101
    }
  },
  {
    "id": 108,
    "sno": 44,
    "name": "C Ananda Rao Institute of Medical Sciences",
    "place": "Karimnagar",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 129617,
    "knownRanks": {
      "OC": 129617,
      "EWS": 9999999,
      "BC_A": 283724,
      "BC_B": 155614,
      "BC_C": 199900,
      "BC_D": 165188,
      "BC_E": 159943,
      "SC_1": 373068,
      "SC_2": 284119,
      "SC_3": 252334,
      "SC": 284119,
      "ST": 244208
    }
  },
  {
    "id": 109,
    "sno": 45,
    "name": "Medicity Institute of Medical Sciences",
    "place": "Ghanpur, Medchal",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 171942,
    "knownRanks": {
      "OC": 171942,
      "EWS": 9999999,
      "BC_A": 311150,
      "BC_B": 192680,
      "BC_C": 243447,
      "BC_D": 185809,
      "BC_E": 207448,
      "SC_1": 877415,
      "SC_2": 285991,
      "SC_3": 260022,
      "SC": 285991,
      "ST": 248506
    }
  },
  {
    "id": 110,
    "sno": 46,
    "name": "Prathima Institute of Medical Sciences",
    "place": "Karimnagar",
    "intake": 250,
    "feeA": 60000,
    "feeB": 1500000,
    "feeC": 2250000,
    "type": "pvt",
    "ocClosing": 168676,
    "knownRanks": {
      "OC": 168676,
      "EWS": 9999999,
      "BC_A": 319621,
      "BC_B": 193682,
      "BC_C": 295631,
      "BC_D": 183416,
      "BC_E": 199090,
      "SC_1": 946202,
      "SC_2": 291198,
      "SC_3": 262633,
      "SC": 291198,
      "ST": 249770
    }
  },
  {
    "id": 111,
    "sno": 47,
    "name": "RVM Medical College",
    "place": "Mulugu, Medak",
    "intake": 250,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 183329,
    "knownRanks": {
      "OC": 183329,
      "EWS": 9999999,
      "BC_A": 327126,
      "BC_B": 202138,
      "BC_C": 301430,
      "BC_D": 187759,
      "BC_E": 212232,
      "SC_1": 285832,
      "SC_2": 288916,
      "SC_3": 262333,
      "SC": 288916,
      "ST": 248444
    }
  },
  {
    "id": 112,
    "sno": 48,
    "name": "MNR Medical College & Hospital",
    "place": "Sangareddy",
    "intake": 250,
    "seatsIncreased": 100,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 210708,
    "knownRanks": {
      "OC": 210708,
      "EWS": 9999999,
      "BC_A": 402542,
      "BC_B": 250853,
      "BC_C": 368883,
      "BC_D": 230791,
      "BC_E": 247360,
      "SC_1": 355491,
      "SC_2": 366648,
      "SC_3": 329221,
      "SC": 366648,
      "ST": 312884
    }
  },
  {
    "id": 113,
    "sno": 49,
    "name": "Dr Patnam Mahender Reddy IMS",
    "place": "Chevella, Rangareddy",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 188838,
    "knownRanks": {
      "OC": 188838,
      "EWS": 9999999,
      "BC_A": 331891,
      "BC_B": 207498,
      "BC_C": 310690,
      "BC_D": 194295,
      "BC_E": 212786,
      "SC_1": 398369,
      "SC_2": 303084,
      "SC_3": 269489,
      "SC": 303084,
      "ST": 254193
    }
  },
  {
    "id": 114,
    "sno": 50,
    "name": "CMR Institute of Medical Sciences",
    "place": "Kandlakoya, Medchal",
    "intake": 250,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 187070,
    "knownRanks": {
      "OC": 187070,
      "EWS": 9999999,
      "BC_A": 328014,
      "BC_B": 206597,
      "BC_C": 290427,
      "BC_D": 196533,
      "BC_E": 208155,
      "SC_1": 9999999,
      "SC_2": 307197,
      "SC_3": 269155,
      "SC": 307197,
      "ST": 257962
    }
  },
  {
    "id": 115,
    "sno": 51,
    "name": "Prathima Relief Institute of Medical Sciences",
    "place": "Warangal",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 185102,
    "knownRanks": {
      "OC": 185102,
      "EWS": 9999999,
      "BC_A": 319936,
      "BC_B": 204053,
      "BC_C": 299302,
      "BC_D": 189363,
      "BC_E": 207468,
      "SC_1": 299827,
      "SC_2": 300927,
      "SC_3": 260190,
      "SC": 300927,
      "ST": 259976
    }
  },
  {
    "id": 116,
    "sno": 52,
    "name": "Maheshwara Medical College",
    "place": "Patancheru, Medak",
    "intake": 250,
    "seatsIncreased": 100,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 234264,
    "knownRanks": {
      "OC": 234264,
      "EWS": 9999999,
      "BC_A": 406505,
      "BC_B": 262599,
      "BC_C": 403037,
      "BC_D": 251738,
      "BC_E": 264503,
      "SC_1": 358720,
      "SC_2": 367493,
      "SC_3": 336941,
      "SC": 367493,
      "ST": 323577
    }
  },
  {
    "id": 117,
    "sno": 53,
    "name": "Arundathi Institute of Medical Sciences",
    "place": "Dundigal",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 180000,
    "knownRanks": {}
  },
  {
    "id": 118,
    "sno": 54,
    "name": "Mahavir Institute of Medical Sciences",
    "place": "Vikarabad",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 165397,
    "knownRanks": {
      "OC": 165397,
      "EWS": 9999999,
      "BC_A": 326427,
      "BC_B": 210236,
      "BC_C": 9999999,
      "BC_D": 190257,
      "BC_E": 194923,
      "SC_1": 273395,
      "SC_2": 301251,
      "SC_3": 271359,
      "SC": 301251,
      "ST": 262460
    }
  },
  {
    "id": 119,
    "sno": 55,
    "name": "Surabhi Institute of Medical Sciences",
    "place": "Siddipet",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 193520,
    "knownRanks": {
      "OC": 193520,
      "EWS": 9999999,
      "BC_A": 334447,
      "BC_B": 213910,
      "BC_C": 315432,
      "BC_D": 201904,
      "BC_E": 210328,
      "SC_1": 309115,
      "SC_2": 308667,
      "SC_3": 273052,
      "SC": 308667,
      "ST": 264435
    }
  },
  {
    "id": 120,
    "sno": 56,
    "name": "TRR Institute of Medical Sciences",
    "place": "Patancheru",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 204109,
    "knownRanks": {
      "OC": 204109,
      "EWS": 9999999,
      "BC_A": 343458,
      "BC_B": 218356,
      "BC_C": 331581,
      "BC_D": 210998,
      "BC_E": 221476,
      "SC_1": 310798,
      "SC_2": 312689,
      "SC_3": 277157,
      "SC": 312689,
      "ST": 269990
    }
  },
  {
    "id": 121,
    "sno": 57,
    "name": "Nova Institute of Medical Sciences",
    "place": "Hayathnagar",
    "intake": 250,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": 204597,
    "knownRanks": {
      "OC": 204597,
      "EWS": 9999999,
      "BC_A": 341068,
      "BC_B": 220237,
      "BC_C": 337022,
      "BC_D": 213372,
      "BC_E": 221643,
      "SC_1": 311079,
      "SC_2": 312829,
      "SC_3": 277401,
      "SC": 312829,
      "ST": 270745
    }
  },
  {
    "id": 122,
    "sno": 58,
    "name": "Father Colombo Institute of Medical Sciences",
    "place": "Warangal",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2310000,
    "type": "pvt",
    "ocClosing": 203828,
    "knownRanks": {
      "OC": 203828,
      "EWS": 9999999,
      "BC_A": 332743,
      "BC_B": 213999,
      "BC_C": 326763,
      "BC_D": 207500,
      "BC_E": 212105,
      "SC_1": 299456,
      "SC_2": 305883,
      "SC_3": 273717,
      "SC": 305883,
      "ST": 266809
    }
  },
  {
    "id": 123,
    "sno": 59,
    "name": "Deccan College of Medical Sciences (Minority)",
    "place": "Hyderabad",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1250000,
    "feeC": 2500000,
    "type": "pvt",
    "ocClosing": 128932,
    "knownRanks": {
      "OC": 128932,
      "EWS": 9999999,
      "BC_A": 9999999,
      "BC_B": 9999999,
      "BC_C": 9999999,
      "BC_D": 9999999,
      "BC_E": 127812,
      "SC_1": 9999999,
      "SC_2": 9999999,
      "SC_3": 9999999,
      "SC": 9999999,
      "ST": 9999999
    }
  },
  {
    "id": 124,
    "sno": 60,
    "name": "Shadan Institute of Medical Sciences (Minority)",
    "place": "Hyderabad",
    "intake": 250,
    "seatsIncreased": 100,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 222910,
    "knownRanks": {
      "OC": 222910,
      "EWS": 9999999,
      "BC_A": 9999999,
      "BC_B": 212032,
      "BC_C": 9999999,
      "BC_D": 9999999,
      "BC_E": 222159,
      "SC_1": 9999999,
      "SC_2": 9999999,
      "SC_3": 9999999,
      "SC": 9999999,
      "ST": 9999999
    }
  },
  {
    "id": 125,
    "sno": 61,
    "name": "Ayaan Institute of Medical Sciences (Minority)",
    "place": "Hyderabad",
    "intake": 150,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 180000,
    "knownRanks": {}
  },
  {
    "id": 126,
    "sno": 62,
    "name": "Dr VRK Women's Medical College (Minority)",
    "place": "Hyderabad",
    "intake": 100,
    "feeA": 60000,
    "feeB": 1200000,
    "feeC": 2400000,
    "type": "pvt",
    "ocClosing": 220697,
    "knownRanks": {
      "OC": 220697,
      "EWS": 9999999,
      "BC_A": 9999999,
      "BC_B": 214129,
      "BC_C": 9999999,
      "BC_D": 9999999,
      "BC_E": 221602,
      "SC_1": 9999999,
      "SC_2": 9999999,
      "SC_3": 9999999,
      "SC": 9999999,
      "ST": 9999999
    }
  },
  {
    "id": 127,
    "sno": 63,
    "name": "Raja Rajeshwari Institute of Medical Sciences (Girls)",
    "place": "Telangana",
    "intake": 150,
    "seatsIncreased": 150,
    "isNew": true,
    "feeA": 60000,
    "feeB": 1155000,
    "feeC": 2300000,
    "type": "pvt",
    "ocClosing": null,
    "knownRanks": {
      "OC": null,
      "EWS": null,
      "BC_A": null,
      "BC_B": null,
      "BC_C": null,
      "BC_D": null,
      "BC_E": null,
      "SC_1": null,
      "SC_2": null,
      "SC_3": null,
      "SC": null,
      "ST": null
    }
  },
  {
    "id": 128,
    "sno": 64,
    "name": "Malla Reddy Institute of Medical Sciences",
    "place": "Suraram, Hyderabad",
    "intake": 250,
    "seatsIncreased": 50,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 130500,
    "knownRanks": {
      "OC": 130500,
      "EWS": 141375,
      "BC_A": 282750,
      "BC_B": 163125,
      "BC_C": 304500,
      "BC_D": 174000,
      "BC_E": 184875,
      "SC_1": 326250,
      "SC_2": 331688,
      "SC_3": 293625,
      "SC": 331688,
      "ST": 261000
    }
  },
  {
    "id": 129,
    "sno": 65,
    "name": "Malla Reddy Medical College for Women",
    "place": "Suraram, Hyderabad",
    "intake": 250,
    "seatsIncreased": 50,
    "feeA": 60000,
    "feeB": 1300000,
    "feeC": 2600000,
    "type": "pvt",
    "ocClosing": 130500,
    "knownRanks": {
      "OC": 130500,
      "EWS": 141375,
      "BC_A": 282750,
      "BC_B": 163125,
      "BC_C": 304500,
      "BC_D": 174000,
      "BC_E": 184875,
      "SC_1": 326250,
      "SC_2": 331688,
      "SC_3": 293625,
      "SC": 331688,
      "ST": 261000
    }
  },
  {
    "id": 130,
    "sno": 66,
    "name": "Neelima Institute of Medical Sciences",
    "place": "Medchal",
    "intake": 200,
    "feeA": 60000,
    "feeB": 1500000,
    "feeC": 2250000,
    "type": "pvt",
    "ocClosing": 140000,
    "knownRanks": {
      "OC": 140000,
      "EWS": 150000,
      "BC_A": 290000,
      "BC_B": 180000,
      "BC_C": 300000,
      "BC_D": 185000,
      "BC_E": 195000,
      "SC_1": 310000,
      "SC_2": 312000,
      "SC_3": 275000,
      "SC": 312000,
      "ST": 250000
    }
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
  if (score >= 720) return 1;
  if (score <= 144) return 1236000;

  const data = scoreRankData; // sorted descending by score

  for (let i = 0; i < data.length - 1; i++) {
    if (score <= data[i].score && score >= data[i + 1].score) {
      const scoreDiff = data[i].score - data[i + 1].score;
      if (scoreDiff === 0) return data[i].rank;
      const rankDiff = data[i + 1].rank - data[i].rank;
      const ratio = (data[i].score - score) / scoreDiff;
      return Math.round(data[i].rank + ratio * rankDiff);
    }
  }
  return data[data.length - 1].rank;
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
  return Math.max(1, Math.round(air * 0.035));
}


function estimateCategoryRank(air, category, stateRank) {
  // Calculate state-level category rank based on state merit list proportions
  const sRank = stateRank || estimateStateRank(air);
  const stateCatRatios = {
    OC: 0.35, EWS: 0.10, BC_A: 0.07, BC_B: 0.18,
    BC_C: 0.01, BC_D: 0.16, BC_E: 0.04, SC_1: 0.117, SC_2: 0.117, SC_3: 0.117, SC: 0.117, ST: 0.08
  };
  return Math.max(1, Math.round(sRank * (stateCatRatios[category] || 0.117)));
}

function getClosingRank(college, category) {
  if (college.knownRanks && college.knownRanks[category] !== undefined && college.knownRanks[category] !== null) {
    return college.knownRanks[category];
  }
  if (college.knownRanks && college.knownRanks['SC'] !== undefined && college.knownRanks['SC'] !== null && category.startsWith('SC')) {
    return college.knownRanks['SC'];
  }
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

// ============================================================
// UI FUNCTIONS
// ============================================================

let sortStrategy = 'categorized';

function buildPreferences(mode = 'categorized') {
  sortStrategy = mode;
  const gList = govtColleges.map(c => ({ ...c, type: 'govt' }));
  const pList = pvtColleges.map(c => ({ ...c, type: 'pvt' }));
  
  if (mode === 'mixed') {
    // Combined ranking sorted strictly by closing rank / cutoff score
    const combined = [...gList, ...pList];
    combined.sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999));
    return combined;
  }

  // Categorized (Default):
  // 1. Top Govt Colleges (sorted by closing rank)
  // 2. Top Non-Minority Private Colleges (sorted by closing rank)
  // 3. Minority Private Colleges at the very end
  const gSorted = [...gList].sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999));
  const pNonMinority = pList.filter(c => !c.name.includes('(Minority)')).sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999));
  const pMinority = pList.filter(c => c.name.includes('(Minority)')).sort((a, b) => (a.ocClosing || 999999) - (b.ocClosing || 999999));

  return [...gSorted, ...pNonMinority, ...pMinority];
}

function changeSortMode(mode) {
  preferences = buildPreferences(mode);
  toggleCollegeList(true);
  renderCollegeList();
  showToast(mode === 'mixed' ? 'Sorted by Combined Cutoff Rank (Mixed)' : 'Sorted by Categorized (Govt ➔ Pvt ➔ Minority)', 'info');
}

let isCollegeListVisible = false;

function toggleCollegeList(forceShow = false) {
  const container = document.getElementById('collegeList');
  const btn = document.getElementById('toggleCollegeListBtn');
  if (!container || !btn) return;

  if (forceShow) {
    isCollegeListVisible = true;
  } else {
    isCollegeListVisible = !isCollegeListVisible;
  }

  if (isCollegeListVisible) {
    container.style.display = 'flex';
    btn.innerHTML = '🙈 Hide College List';
    btn.style.borderColor = '#fbbf24';
    btn.style.color = '#fbbf24';
  } else {
    container.style.display = 'none';
    btn.innerHTML = '👁️ Show / Reorder College List';
    btn.style.borderColor = 'var(--accent-teal)';
    btn.style.color = 'var(--accent-teal)';
  }
}

function getSummaryText() {
  const { name, score, category, customAIR, customStateRank } = studentProfile;
  const air = customAIR || estimatedAIR;
  const stateRank = customStateRank || estimateStateRank(air);
  const catRank = estimateCategoryRank(air, category, stateRank);

  let govtEligible = 0, pvtEligible = 0;
  govtColleges.forEach(c => { if (isEligible(air, c, category)) govtEligible++; });
  pvtColleges.forEach(c => { if (isEligible(air, c, category)) pvtEligible++; });

  const catLabel = reservationData[category]?.label || category;

  return `⚕️ *MSeat — Telangana MBBS Mock Counselling 2026*\n\n` +
    `👤 *Candidate:* ${name || 'Student'}\n` +
    `🎯 *NEET Score:* ${score || '469'} / 720\n` +
    `🏆 *All India Rank (AIR):* ${air ? air.toLocaleString('en-IN') : '1,34,093'}\n` +
    `📍 *Telangana State S.No:* ${stateRank ? stateRank.toLocaleString('en-IN') : '2,363'}\n` +
    `🏷️ *Category Rank (${catLabel}):* #${catRank ? catRank.toLocaleString('en-IN') : '276'}\n\n` +
    `📊 *Seat Eligibility Overview:*\n` +
    `• Government Colleges Eligible: ${govtEligible} / ${govtColleges.length}\n` +
    `• Private Cat-A Colleges Eligible: ${pvtEligible} / ${pvtColleges.length}\n` +
    `• Total Eligible Options: ${govtEligible + pvtEligible}\n\n` +
    `💡 *Web Options Strategy:* List all 36 Govt Colleges first, followed by top Private Cat-A colleges (Bhaskar, Mamata, MNR, Medicity, Prathima).\n\n` +
    `🔗 Check your allotment simulation: https://kprsnt2.github.io/mSeat/`;
}

function shareWhatsApp() {
  const text = getSummaryText();
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

function copyOptionsSummary() {
  const text = getSummaryText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Web Options Summary copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy summary', 'error');
    });
  } else {
    showToast('Clipboard copy not supported in browser', 'error');
  }
}

function init() {
  // Build default preference list (Govt first -> Pvt -> Minority last)
  preferences = buildPreferences('categorized');

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
    if (searchQuery.length > 0) toggleCollegeList(true);
    renderCollegeList();
  });

  // Score & Rank inputs sync
  const airInput = document.getElementById('neetAIR');
  const snoInput = document.getElementById('stateSno');
  const scoreInput = document.getElementById('neetScore');
  const scoreSlider = document.getElementById('scoreSlider');

  if (airInput) {
    airInput.addEventListener('input', function () {
      const air = parseInt(this.value);
      if (!isNaN(air) && air > 0) {
        const estScore = estimateScoreFromAIR(air);
        const estSno = estimateStateRank(air);
        if (scoreInput) scoreInput.value = estScore;
        if (scoreSlider) scoreSlider.value = estScore;
        if (snoInput && !snoInput.value) snoInput.placeholder = `Est: ${estSno}`;
        updateScorePreview(estScore, air, estSno);
      }
    });
  }

  if (snoInput) {
    snoInput.addEventListener('input', function () {
      const sno = parseInt(this.value);
      if (!isNaN(sno) && sno > 0) {
        const estAir = estimateAIRFromSno(sno);
        const estScore = estimateScoreFromAIR(estAir);
        if (airInput && !airInput.value) airInput.placeholder = `Est: ${estAir.toLocaleString()}`;
        if (scoreInput) scoreInput.value = estScore;
        if (scoreSlider) scoreSlider.value = estScore;
        updateScorePreview(estScore, estAir, sno);
      }
    });
  }

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

  // Animate elements on load
  animateOnScroll();
}

function estimateAIRFromSno(sno) {
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
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim() || 'Student';
  const airInputVal = parseInt(document.getElementById('neetAIR')?.value);
  const snoInputVal = parseInt(document.getElementById('stateSno')?.value);
  const scoreInputVal = parseInt(document.getElementById('neetScore')?.value);
  const category = document.getElementById('categorySelect').value;
  const gender = document.getElementById('genderSelect').value;
  const localStatus = document.getElementById('localSelect').value;
  const pwd = document.getElementById('pwdCheckbox').checked;

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
    showToast('Please enter All India Rank (AIR), State Serial No, or NEET Score', 'error');
    return;
  }

  const cutoff = qualifyingCutoffs[category] || 113;
  if (score < cutoff) {
    showToast(`Score ${score} is below qualifying cutoff (${cutoff}) for ${reservationData[category].label}`, 'error');
    return;
  }

  studentProfile = { name, score, category, gender, localStatus, pwd, customAIR: air, customStateRank: stateRank };
  estimatedAIR = air;

  renderRankResults();
  goToStep(2);
}

function renderRankResults() {
  const { name, score, category, gender, customAIR, customStateRank } = studentProfile;
  const air = customAIR || estimatedAIR;
  const stateRank = customStateRank || estimateStateRank(air);
  const catRank = estimateCategoryRank(air, category, stateRank);
  const percentile = Math.max(0, Math.min(100, ((2209000 - air) / 2209000 * 100))).toFixed(2);

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
