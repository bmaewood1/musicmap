const cities = [
    {
        displayName: 'New York',
        id: 7644
    },
    {
        displayName: 'Los Angeles',
        id: 17835
    },
    {
        displayName: 'Chicago',
        id: 9426
    },
    {
        displayName: 'Houston',
        id: 15073
    },
    {
        displayName: 'Phoenix',
        id: 23068
    },
    {
        displayName: 'Philadelphia',
        id: 5202
    },
    {
        displayName: 'San Antonio',
        id: 7554
    },
    {
        displayName: 'San Diego',
        id: 11086
    },
    {
        displayName: 'Dallas',
        id: 35129
    },
    {
        displayName: 'San Jose',
        id: 26330
    },
    {
        displayName: 'Austin',
        id: 9179
    },
    {
        displayName: 'Fort Worth',
        id: 35129
    },
    {
        displayName: 'Columbus',
        id: 9480
    },
    {
        displayName: 'San Francisco',
        id: 26330
    },
    {
        displayName: 'Charlotte',
        id: 13579
    },
    {
        displayName: 'Indianapolis',
        id: 25521
    },
    {
        displayName: 'Seattle',
        id: 2846
    },
    {
        displayName: 'Denver',
        id: 6404
    },
    {
        displayName: 'Washington',
        id: 1409
    },
    {
        displayName: 'Boston',
        id: 18842
    },
    {
        displayName: 'El Paso',
        id: 19517
    },
    {
        displayName: 'Detroit',
        id: 18073
    },
    {
        displayName: 'Nashville',
        id: 11104
    },
    {
        displayName: 'Portland',
        id: 12283
    },
    {
        displayName: 'Memphis',
        id: 22600
    },
    {
        displayName: 'Oklahoma City',
        id: 5627
    },
    {
        displayName: 'Las Vegas',
        id: 8396
    },
    {
        displayName: 'Louisville',
        id: 11887
    },
    {
        displayName: 'Baltimore',
        id: 4125
    },
    {
        displayName: 'Milwaukee',
        id: 15405
    },
    {
        displayName: 'Albuquerque',
        id: 21024
    },
    {
        displayName: 'Tucson',
        id: 10046
    },
    {
        displayName: 'Fresno',
        id: 23682
    },
    {
        displayName: 'Sacramento',
        id: 14039
    },
    {
        displayName: 'Atlanta',
        id: 4120
    },
    {
        displayName: 'Kansas City',
        id: 5961
    },
    {
        displayName: 'Colorado Springs',
        id: 10927
    },
    {
        displayName: 'Miami',
        id: 9776
    },
    {
        displayName: 'Raleigh',
        id: 17913
    },
    {
        displayName: 'Omaha',
        id: 20324
    },
    {
        displayName: 'Virginia Beach',
        id: 57926
    },
    {
        displayName: 'Oakland',
        id: 26330
    },
    {
        displayName: 'Minneapolis',
        id: 35130
    },
    {
        displayName: 'Tulsa',
        id: 1826
    },
    {
        displayName: 'Arlington',
        id: 35129
    },
    {
        displayName: 'Tampa',
        id: 24276
    },
    {
        displayName: 'New Orleans',
        id: 11772
    },
    {
        displayName: 'Wichita',
        id: 16021
    },
    {
        displayName: 'Cleveland',
        id: 14700
    },
    {
        displayName: 'Bakersfield',
        id: 20919
    },
    {
        displayName: 'Anaheim',
        id: 17835
    },
    {
        displayName: 'Honolulu',
        id: 14752
    },
    {
        displayName: 'Corpus Christi',
        id: 6498
    },
    {
        displayName: 'Lexington',
        id: 24580
    },
    {
        displayName: 'Stockton',
        id: 5973
    },
    {
        displayName: 'Henderson',
        id: 9775
    },
    {
        displayName: 'Saint Paul',
        id: 35130
    },
    {
        displayName: 'St. Louis',
        id: 6853
    },
    {
        displayName: 'Cincinnati',
        id: 22040
    },
    {
        displayName: 'Pittsburgh',
        id: 22443
    },
    {
        displayName: 'Greensboro',
        id: 21752
    },
    {
        displayName: 'Anchorage',
        id: 14689
    },
    {
        displayName: 'Plano',
        id: 16844
    },
    {
        displayName: 'Lincoln',
        id: 5244
    },
    {
        displayName: 'Orlando',
        id: 3733
    },
    {
        displayName: 'Irvine',
        id: 17835
    },
    {
        displayName: 'Newark',
        id: 4306
    },
    {
        displayName: 'Toledo',
        id: 5649
    },
    {
        displayName: 'Durham',
        id: 16391
    },
    {
        displayName: 'Fort Wayne',
        id: 8935
    },
    {
        displayName: 'St. Petersburg',
        id: 20410
    },
    {
        displayName: 'Laredo',
        id: 5228
    },
    {
        displayName: 'Chandler',
        id: 153
    },
    {
        displayName: 'Buffalo',
        id: 22996
    },
    {
        displayName: 'Lubbock',
        id: 5912
    },
    {
        displayName: 'Scottsdale',
        id: 22628
    },
    {
        displayName: 'Reno',
        id: 13455
    },
    {
        displayName: 'Norfolk',
        id: 19653
    },
    {
        displayName: 'Chesapeake',
        id: 18572
    },
    {
        displayName: 'Boise',
        id: 24581
    },
    {
        displayName: 'Richmond',
        id: 22043
    },
    {
        displayName: 'Baton Rouge',
        id: 7563
    },
    {
        displayName: 'Spokane',
        id: 8230
    },
    {
        displayName: 'Des Moines',
        id: 12444
    },
    {
        displayName: 'Tacoma',
        id: 16511
    },
    {
        displayName: 'San Bernardino',
        id: 17835
    },
    {
        displayName: 'Modesto',
        id: 17381
    },
    {
        displayName: 'Fontana',
        id: 17835
    },
    {
        displayName: 'Santa Clarita',
        id: 17835
    },
    {
        displayName: 'Birmingham',
        id: 8474
    },
    {
        displayName: 'Oxnard',
        id: 17835
    },
    {
        displayName: 'Fayetteville',
        id: 23876
    },
    {
        displayName: 'Rochester',
        id: 20317
    },
    {
        displayName: 'Huntington Beach',
        id: 17835
    },
    {
        displayName: 'Salt Lake City',
        id: 13560
    },
    {
        displayName: 'Grand Rapids',
        id: 5035
    },
    {
        displayName: 'Amarillo',
        id: 1290
    },
    {
        displayName: 'Yonkers',
        id: 4008
    },
    {
        displayName: 'Montgomery',
        id: 15744
    },
    {
        displayName: 'Akron',
        id: 2374
    },
    {
        displayName: 'Little Rock',
        id: 17060
    },
    {
        displayName: 'Huntsville',
        id: 9479
    },
    {
        displayName: 'Augusta',
        id: 17843
    },
    {
        displayName: 'Tallahassee',
        id: 1159
    },
    {
        displayName: 'Mobile',
        id: 8910
    },
    {
        displayName: 'Worcester',
        id: 18358
    },
    {
        displayName: 'Knoxville',
        id: 8503
    },
    {
        displayName: 'Cambridge',
        id: 18842
    },
    {
        displayName: 'Fort Lauderdale',
        id: 19511
    },
    {
        displayName: 'Sioux Falls',
        id: 24586
    },
    {
        displayName: 'Ontario',
        id: 17835
    },
    {
        displayName: 'Chattanooga',
        id: 7178
    },
    {
        displayName: 'Providence',
        id: 5274
    },
    {
        displayName: 'Santa Rosa',
        id: 5308
    },
    {
        displayName: 'Helena',
        id: 35456
    },
    {
        displayName: 'Jackson Hole',
        id: 57504
    },
    {
        displayName: 'Eugene',
        id: 10501
    }
]
























































































































































































































































































































































































































































































































































































































































































































































































































































































