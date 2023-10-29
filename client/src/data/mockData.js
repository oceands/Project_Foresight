import { tokens } from "../theme";


export const mockDataCamera = [


  {
    id:1,
    name: "CAM-1",
    type: "CCTV",
    IP: "128.256.168.1",
    MAC: "000000",
    Owner: "Office Room",
    description: "Office Room",
    Status: "Active",
    action: null,
  },
  
]

export const mockDataDispatch = [


  {
    id:1,
    name: "Police",
    type: "Authorities",
    number: "911",
    location: "000000",
    description: "Office Room",
    autoDispatch: "Active",
    action: null,
  },
  
]
export const mockDataNotification = [
  {
    id: 1,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Hallway Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 2,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Room 101 Camera",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 3,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Canteen Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 4,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Stairwell Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 5,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Elevator Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 6,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Parking Garage Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 7,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Perimeter Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 8,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Loading Dock Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 9,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Server Room Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
  {
    id: 10,
    date: new Date().toISOString(),
    type: Math.random() > 0.5 ? "Verified" : "Pending",
    module: Math.random() > 0.5 ? "Fire Detection" : "Weapon Detection",
    camera: "Storage Room Camera 1",
    status: Math.random() > 0.5 ? "Active" : "Reviewed",
  },
];



export const mockDataIncidents = [
  {
    id: 1,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Fire Detection",
    camera: "Hallway Camera 1",
    status: "Active",
  },
  {
    id: 2,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Weapon Detection",
    camera: "Room 101 Camera",
    status: "Reviewed",
  },
  {
    id: 3,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Fire Detection",
    camera: "Canteen Camera 1",
    status: "Active",
  },
  {
    id: 4,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Weapon Detection",
    camera: "Stairwell Camera 1",
    status: "Reviewed",
  },
  {
    id: 5,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Fire Detection",
    camera: "Elevator Camera 1",
    status: "Active",
  },
  {
    id: 6,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Weapon Detection",
    camera: "Parking Garage Camera 1",
    status: "Reviewed",
  },
  {
    id: 7,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Fire Detection",
    camera: "Perimeter Camera 1",
    status: "Active",
  },
  {
    id: 8,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Weapon Detection",
    camera: "Loading Dock Camera 1",
    status: "Reviewed",
  },
  {
    id: 9,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Fire Detection",
    camera: "Server Room Camera 1",
    status: "Active",
  },
  {
    id: 10,
    date: new Date().toISOString(),
    type: "Verified",
    module: "Weapon Detection",
    camera: "Storage Room Camera 1",
    status: "Reviewed",
  },
];

export const mockUserManagement = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    joiningDate: "2022-01-15",
    roleAccess: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    joiningDate: "2022-02-20",
    roleAccess: "User",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robertjohnson@example.com",
    joiningDate: "2022-03-10",
    roleAccess: "User",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emilywilson@example.com",
    joiningDate: "2022-04-05",
    roleAccess: "Admin",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    joiningDate: "2022-05-12",
    roleAccess: "User",
  },
  {
    id: 6,
    name: "Olivia Davis",
    email: "oliviadavis@example.com",
    joiningDate: "2022-06-28",
    roleAccess: "User",
  },
  {
    id: 7,
    name: "William White",
    email: "williamwhite@example.com",
    joiningDate: "2022-07-15",
    roleAccess: "Admin",
  },
  {
    id: 8,
    name: "Sophia Lee",
    email: "sophialee@example.com",
    joiningDate: "2022-08-03",
    roleAccess: "User",
  },
  {
    id: 9,
    name: "James Taylor",
    email: "jamestaylor@example.com",
    joiningDate: "2022-09-21",
    roleAccess: "User",
  },
  {
    id: 10,
    name: "Lily Johnson",
    email: "lilyjohnson@example.com",
    joiningDate: "2022-10-17",
    roleAccess: "Admin",
  },
];

export const mockDataReports = [
  {
    id: 100012,
    title: "Attempted Burglary",
    IncidentID: 100190,
    createdBy: "Adnan M",
    DateCreated: "10-12-2000",
    Status: "In-progress",
  },
  {
    id: 100013,
    title: "False Positive Fire",
    IncidentID: 100191,
    createdBy: "Simran P",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100014,
    title: "Attempted Burglary",
    IncidentID: 100192,
    createdBy: "Ocean D",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100015,
    title: "Stage 4 Fire Incident",
    IncidentID: 100193,
    createdBy: "Saim A",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100016,
    title: "Physical Assault",
    IncidentID: 100194,
    createdBy: "Saim A",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100017,
    title: "Stage 2 Fire Incident",
    IncidentID: 100195,
    createdBy: "Uzair N",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100018,
    title: "False Alarm",
    IncidentID: 100196,
    createdBy: "Saim A",
    DateCreated: "10-12-2000",
    Status: "In-progress",
  },
  {
    id: 100019,
    title: "Knife Detection",
    IncidentID: 100197,
    createdBy: "Ocean D",
    DateCreated: "10-12-2000",
    Status: "Complete",
  },
  {
    id: 100020,
    title: "Stage 1 Fire Alarm",
    IncidentID: 100198,
    createdBy: "Simran P",
    DateCreated: "10-12-2000",
    Status: "In-progress",
  },
  {
    id: 100021,
    title: "Attempted Robbery",
    IncidentID: 100199,
    createdBy: "Adnan M",
    DateCreated: "10-12-2000",
    Status: "In-progress",
  },
];

export const mockDataContacts = [
  {
    id: 1,
    city: "Dubai, United Arab Emirates",
    email: "oceands@hotmail.com",
    phone: "+971 50 3605417",
  },
  {
    id: 2,
    city: "Sharjah, United Arab Emirates",
    email: "simranpatt@hotmail.com",
    phone: "+971 54 5762036",
  },
];


export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022"
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021"
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022"
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022"
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021"
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022"
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022"
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021"
  }
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95"
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45"
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95"
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95"
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55"
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95"
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20"
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45"
  }
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)"
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)"
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)"
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)"
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)"
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)"
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)"
  }
];

//This data shows when we pull numbers from our DB and display.
export const mockPieData = [
  {
    id: "fire_related",
    label: "Fire Related",
    value: 100,
    color: tokens.blueAccents[500],  // Corrected color
  },
  {
    id: "weapon_related",
    label: "Weapon Related",
    value: 100,
    color: tokens.orangeAccents[500],   // Corrected color
  },
  {
    id: "others",
    label: "Others",
    value: 100,
    color: tokens.blackAccents[500],   // Corrected color
  },
];



//This data shows when we pull numbers from our DB and display.
export const mockLineData = [
  {
    id: "Incidents",
    color: tokens.blueAccents[500],
    data: [
      { x: "Jan", y: Math.floor(Math.random() * 201) },
      { x: "Feb", y: Math.floor(Math.random() * 201) },
      { x: "Mar", y: Math.floor(Math.random() * 201) },
      { x: "Apr", y: Math.floor(Math.random() * 201) },
      { x: "May", y: Math.floor(Math.random() * 201) },
      { x: "Jun", y: Math.floor(Math.random() * 201) },
      { x: "Jul", y: Math.floor(Math.random() * 201) },
      { x: "Aug", y: Math.floor(Math.random() * 201) },
      { x: "Sep", y: Math.floor(Math.random() * 201) },
      { x: "Oct", y: Math.floor(Math.random() * 201) },
      { x: "Nov", y: Math.floor(Math.random() * 201) },
      { x: "Dec", y: Math.floor(Math.random() * 201) },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600
  },
  {
    id: "AGO",
    value: 949905
  },
  {
    id: "ALB",
    value: 329910
  },
  {
    id: "ARE",
    value: 675484
  },
  {
    id: "ARG",
    value: 432239
  },
  {
    id: "ARM",
    value: 288305
  },
  {
    id: "ATA",
    value: 415648
  },
  {
    id: "ATF",
    value: 665159
  },
  {
    id: "AUT",
    value: 798526
  },
  {
    id: "AZE",
    value: 481678
  },
  {
    id: "BDI",
    value: 496457
  },
  {
    id: "BEL",
    value: 252276
  },
  {
    id: "BEN",
    value: 440315
  },
  {
    id: "BFA",
    value: 343752
  },
  {
    id: "BGD",
    value: 920203
  },
  {
    id: "BGR",
    value: 261196
  },
  {
    id: "BHS",
    value: 421551
  },
  {
    id: "BIH",
    value: 974745
  },
  {
    id: "BLR",
    value: 349288
  },
  {
    id: "BLZ",
    value: 305983
  },
  {
    id: "BOL",
    value: 430840
  },
  {
    id: "BRN",
    value: 345666
  },
  {
    id: "BTN",
    value: 649678
  },
  {
    id: "BWA",
    value: 319392
  },
  {
    id: "CAF",
    value: 722549
  },
  {
    id: "CAN",
    value: 332843
  },
  {
    id: "CHE",
    value: 122159
  },
  {
    id: "CHL",
    value: 811736
  },
  {
    id: "CHN",
    value: 593604
  },
  {
    id: "CIV",
    value: 143219
  },
  {
    id: "CMR",
    value: 630627
  },
  {
    id: "COG",
    value: 498556
  },
  {
    id: "COL",
    value: 660527
  },
  {
    id: "CRI",
    value: 60262
  },
  {
    id: "CUB",
    value: 177870
  },
  {
    id: "-99",
    value: 463208
  },
  {
    id: "CYP",
    value: 945909
  },
  {
    id: "CZE",
    value: 500109
  },
  {
    id: "DEU",
    value: 63345
  },
  {
    id: "DJI",
    value: 634523
  },
  {
    id: "DNK",
    value: 731068
  },
  {
    id: "DOM",
    value: 262538
  },
  {
    id: "DZA",
    value: 760695
  },
  {
    id: "ECU",
    value: 301263
  },
  {
    id: "EGY",
    value: 148475
  },
  {
    id: "ERI",
    value: 939504
  },
  {
    id: "ESP",
    value: 706050
  },
  {
    id: "EST",
    value: 977015
  },
  {
    id: "ETH",
    value: 461734
  },
  {
    id: "FIN",
    value: 22800
  },
  {
    id: "FJI",
    value: 18985
  },
  {
    id: "FLK",
    value: 64986
  },
  {
    id: "FRA",
    value: 447457
  },
  {
    id: "GAB",
    value: 669675
  },
  {
    id: "GBR",
    value: 757120
  },
  {
    id: "GEO",
    value: 158702
  },
  {
    id: "GHA",
    value: 893180
  },
  {
    id: "GIN",
    value: 877288
  },
  {
    id: "GMB",
    value: 724530
  },
  {
    id: "GNB",
    value: 387753
  },
  {
    id: "GNQ",
    value: 706118
  },
  {
    id: "GRC",
    value: 377796
  },
  {
    id: "GTM",
    value: 66890
  },
  {
    id: "GUY",
    value: 719300
  },
  {
    id: "HND",
    value: 739590
  },
  {
    id: "HRV",
    value: 929467
  },
  {
    id: "HTI",
    value: 538961
  },
  {
    id: "HUN",
    value: 146095
  },
  {
    id: "IDN",
    value: 490681
  },
  {
    id: "IND",
    value: 549818
  },
  {
    id: "IRL",
    value: 630163
  },
  {
    id: "IRN",
    value: 596921
  },
  {
    id: "IRQ",
    value: 767023
  },
  {
    id: "ISL",
    value: 478682
  },
  {
    id: "ISR",
    value: 963688
  },
  {
    id: "ITA",
    value: 393089
  },
  {
    id: "JAM",
    value: 83173
  },
  {
    id: "JOR",
    value: 52005
  },
  {
    id: "JPN",
    value: 199174
  },
  {
    id: "KAZ",
    value: 181424
  },
  {
    id: "KEN",
    value: 60946
  },
  {
    id: "KGZ",
    value: 432478
  },
  {
    id: "KHM",
    value: 254461
  },
  {
    id: "OSA",
    value: 942447
  },
  {
    id: "KWT",
    value: 414413
  },
  {
    id: "LAO",
    value: 448339
  },
  {
    id: "LBN",
    value: 620090
  },
  {
    id: "LBR",
    value: 435950
  },
  {
    id: "LBY",
    value: 75091
  },
  {
    id: "LKA",
    value: 595124
  },
  {
    id: "LSO",
    value: 483524
  },
  {
    id: "LTU",
    value: 867357
  },
  {
    id: "LUX",
    value: 689172
  },
  {
    id: "LVA",
    value: 742980
  },
  {
    id: "MAR",
    value: 236538
  },
  {
    id: "MDA",
    value: 926836
  },
  {
    id: "MDG",
    value: 840840
  },
  {
    id: "MEX",
    value: 353910
  },
  {
    id: "MKD",
    value: 505842
  },
  {
    id: "MLI",
    value: 286082
  },
  {
    id: "MMR",
    value: 915544
  },
  {
    id: "MNE",
    value: 609500
  },
  {
    id: "MNG",
    value: 410428
  },
  {
    id: "MOZ",
    value: 32868
  },
  {
    id: "MRT",
    value: 375671
  },
  {
    id: "MWI",
    value: 591935
  },
  {
    id: "MYS",
    value: 991644
  },
  {
    id: "NAM",
    value: 701897
  },
  {
    id: "NCL",
    value: 144098
  },
  {
    id: "NER",
    value: 312944
  },
  {
    id: "NGA",
    value: 862877
  },
  {
    id: "NIC",
    value: 90831
  },
  {
    id: "NLD",
    value: 281879
  },
  {
    id: "NOR",
    value: 224537
  },
  {
    id: "NPL",
    value: 322331
  },
  {
    id: "NZL",
    value: 86615
  },
  {
    id: "OMN",
    value: 707881
  },
  {
    id: "PAK",
    value: 158577
  },
  {
    id: "PAN",
    value: 738579
  },
  {
    id: "PER",
    value: 248751
  },
  {
    id: "PHL",
    value: 557292
  },
  {
    id: "PNG",
    value: 516874
  },
  {
    id: "POL",
    value: 682137
  },
  {
    id: "PRI",
    value: 957399
  },
  {
    id: "PRT",
    value: 846430
  },
  {
    id: "PRY",
    value: 720555
  },
  {
    id: "QAT",
    value: 478726
  },
  {
    id: "ROU",
    value: 259318
  },
  {
    id: "RUS",
    value: 268735
  },
  {
    id: "RWA",
    value: 136781
  },
  {
    id: "ESH",
    value: 151957
  },
  {
    id: "SAU",
    value: 111821
  },
  {
    id: "SDN",
    value: 927112
  },
  {
    id: "SDS",
    value: 966473
  },
  {
    id: "SEN",
    value: 158085
  },
  {
    id: "SLB",
    value: 178389
  },
  {
    id: "SLE",
    value: 528433
  },
  {
    id: "SLV",
    value: 353467
  },
  {
    id: "ABV",
    value: 251
  },
  {
    id: "SOM",
    value: 445243
  },
  {
    id: "SRB",
    value: 202402
  },
  {
    id: "SUR",
    value: 972121
  },
  {
    id: "SVK",
    value: 319923
  },
  {
    id: "SVN",
    value: 728766
  },
  {
    id: "SWZ",
    value: 379669
  },
  {
    id: "SYR",
    value: 16221
  },
  {
    id: "TCD",
    value: 101273
  },
  {
    id: "TGO",
    value: 498411
  },
  {
    id: "THA",
    value: 506906
  },
  {
    id: "TJK",
    value: 613093
  },
  {
    id: "TKM",
    value: 327016
  },
  {
    id: "TLS",
    value: 607972
  },
  {
    id: "TTO",
    value: 936365
  },
  {
    id: "TUN",
    value: 898416
  },
  {
    id: "TUR",
    value: 237783
  },
  {
    id: "TWN",
    value: 878213
  },
  {
    id: "TZA",
    value: 442174
  },
  {
    id: "UGA",
    value: 720710
  },
  {
    id: "UKR",
    value: 74172
  },
  {
    id: "URY",
    value: 753177
  },
  {
    id: "USA",
    value: 658725
  },
  {
    id: "UZB",
    value: 550313
  },
  {
    id: "VEN",
    value: 707492
  },
  {
    id: "VNM",
    value: 538907
  },
  {
    id: "VUT",
    value: 650646
  },
  {
    id: "PSE",
    value: 476078
  },
  {
    id: "YEM",
    value: 957751
  },
  {
    id: "ZAF",
    value: 836949
  },
  {
    id: "ZMB",
    value: 714503
  },
  {
    id: "ZWE",
    value: 405217
  },
  {
    id: "KOR",
    value: 171135
  }
];
