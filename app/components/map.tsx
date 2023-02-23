import { ResponsiveChoropleth } from "@nivo/geo";
import WorldCountries from "../utils/world_countries.json";

export default function Map() {
  return (
    <ResponsiveChoropleth
      data={testData}
      features={WorldCountries["features"]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

const testData = [
  {
    id: "AFG",
    value: 815472,
  },
  {
    id: "AGO",
    value: 470758,
  },
  {
    id: "ALB",
    value: 816210,
  },
  {
    id: "ARE",
    value: 493018,
  },
  {
    id: "ARG",
    value: 990472,
  },
  {
    id: "ARM",
    value: 946860,
  },
  {
    id: "ATA",
    value: 179682,
  },
  {
    id: "ATF",
    value: 213780,
  },
  {
    id: "AUT",
    value: 599686,
  },
  {
    id: "AZE",
    value: 200916,
  },
  {
    id: "BDI",
    value: 665261,
  },
  {
    id: "BEL",
    value: 621819,
  },
  {
    id: "BEN",
    value: 287228,
  },
  {
    id: "BFA",
    value: 591061,
  },
  {
    id: "BGD",
    value: 793054,
  },
  {
    id: "BGR",
    value: 92436,
  },
  {
    id: "BHS",
    value: 37555,
  },
  {
    id: "BIH",
    value: 305744,
  },
  {
    id: "BLR",
    value: 154166,
  },
  {
    id: "BLZ",
    value: 469625,
  },
  {
    id: "BOL",
    value: 710125,
  },
  {
    id: "BRN",
    value: 931851,
  },
  {
    id: "BTN",
    value: 546818,
  },
  {
    id: "BWA",
    value: 40467,
  },
  {
    id: "CAF",
    value: 33442,
  },
  {
    id: "CAN",
    value: 509281,
  },
  {
    id: "CHE",
    value: 572586,
  },
  {
    id: "CHL",
    value: 381208,
  },
  {
    id: "CHN",
    value: 348938,
  },
  {
    id: "CIV",
    value: 459833,
  },
  {
    id: "CMR",
    value: 518454,
  },
  {
    id: "COG",
    value: 681194,
  },
  {
    id: "COL",
    value: 997069,
  },
  {
    id: "CRI",
    value: 267971,
  },
  {
    id: "CUB",
    value: 50942,
  },
  {
    id: "-99",
    value: 981562,
  },
  {
    id: "CYP",
    value: 192110,
  },
  {
    id: "CZE",
    value: 950574,
  },
  {
    id: "DEU",
    value: 79073,
  },
  {
    id: "DJI",
    value: 390697,
  },
  {
    id: "DNK",
    value: 962265,
  },
  {
    id: "DOM",
    value: 232810,
  },
  {
    id: "DZA",
    value: 418066,
  },
  {
    id: "ECU",
    value: 175340,
  },
  {
    id: "EGY",
    value: 87491,
  },
  {
    id: "ERI",
    value: 734782,
  },
  {
    id: "ESP",
    value: 977049,
  },
  {
    id: "EST",
    value: 220264,
  },
  {
    id: "ETH",
    value: 126821,
  },
  {
    id: "FIN",
    value: 197564,
  },
  {
    id: "FJI",
    value: 694707,
  },
  {
    id: "FLK",
    value: 891126,
  },
  {
    id: "FRA",
    value: 234356,
  },
  {
    id: "GAB",
    value: 692004,
  },
  {
    id: "GBR",
    value: 256845,
  },
  {
    id: "GEO",
    value: 442106,
  },
  {
    id: "GHA",
    value: 221448,
  },
  {
    id: "GIN",
    value: 169119,
  },
  {
    id: "GMB",
    value: 656962,
  },
  {
    id: "GNB",
    value: 808051,
  },
  {
    id: "GNQ",
    value: 242957,
  },
  {
    id: "GRC",
    value: 861812,
  },
  {
    id: "GTM",
    value: 103561,
  },
  {
    id: "GUY",
    value: 508870,
  },
  {
    id: "HND",
    value: 945040,
  },
  {
    id: "HRV",
    value: 677438,
  },
  {
    id: "HTI",
    value: 31577,
  },
  {
    id: "HUN",
    value: 577975,
  },
  {
    id: "IDN",
    value: 693789,
  },
  {
    id: "IND",
    value: 300163,
  },
  {
    id: "IRL",
    value: 450097,
  },
  {
    id: "IRN",
    value: 196474,
  },
  {
    id: "IRQ",
    value: 311054,
  },
  {
    id: "ISL",
    value: 973113,
  },
  {
    id: "ISR",
    value: 484038,
  },
  {
    id: "ITA",
    value: 764633,
  },
  {
    id: "JAM",
    value: 856981,
  },
  {
    id: "JOR",
    value: 564131,
  },
  {
    id: "JPN",
    value: 132577,
  },
  {
    id: "KAZ",
    value: 240188,
  },
  {
    id: "KEN",
    value: 541142,
  },
  {
    id: "KGZ",
    value: 364283,
  },
  {
    id: "KHM",
    value: 440114,
  },
  {
    id: "OSA",
    value: 229128,
  },
  {
    id: "KWT",
    value: 371666,
  },
  {
    id: "LAO",
    value: 473492,
  },
  {
    id: "LBN",
    value: 479689,
  },
  {
    id: "LBR",
    value: 931168,
  },
  {
    id: "LBY",
    value: 3662,
  },
  {
    id: "LKA",
    value: 624029,
  },
  {
    id: "LSO",
    value: 664926,
  },
  {
    id: "LTU",
    value: 100111,
  },
  {
    id: "LUX",
    value: 362800,
  },
  {
    id: "LVA",
    value: 746036,
  },
  {
    id: "MAR",
    value: 997787,
  },
  {
    id: "MDA",
    value: 300464,
  },
  {
    id: "MDG",
    value: 231738,
  },
  {
    id: "MEX",
    value: 81598,
  },
  {
    id: "MKD",
    value: 1025,
  },
  {
    id: "MLI",
    value: 759886,
  },
  {
    id: "MMR",
    value: 19254,
  },
  {
    id: "MNE",
    value: 978562,
  },
  {
    id: "MNG",
    value: 762354,
  },
  {
    id: "MOZ",
    value: 486061,
  },
  {
    id: "MRT",
    value: 92034,
  },
  {
    id: "MWI",
    value: 859938,
  },
  {
    id: "MYS",
    value: 305866,
  },
  {
    id: "NAM",
    value: 345850,
  },
  {
    id: "NCL",
    value: 858833,
  },
  {
    id: "NER",
    value: 57570,
  },
  {
    id: "NGA",
    value: 614193,
  },
  {
    id: "NIC",
    value: 711175,
  },
  {
    id: "NLD",
    value: 112235,
  },
  {
    id: "NOR",
    value: 287927,
  },
  {
    id: "NPL",
    value: 247784,
  },
  {
    id: "NZL",
    value: 958766,
  },
  {
    id: "OMN",
    value: 631860,
  },
  {
    id: "PAK",
    value: 762982,
  },
  {
    id: "PAN",
    value: 491505,
  },
  {
    id: "PER",
    value: 520094,
  },
  {
    id: "PHL",
    value: 401994,
  },
  {
    id: "PNG",
    value: 11012,
  },
  {
    id: "POL",
    value: 961522,
  },
  {
    id: "PRI",
    value: 699902,
  },
  {
    id: "PRT",
    value: 775904,
  },
  {
    id: "PRY",
    value: 441972,
  },
  {
    id: "QAT",
    value: 21270,
  },
  {
    id: "ROU",
    value: 961117,
  },
  {
    id: "RUS",
    value: 245480,
  },
  {
    id: "RWA",
    value: 703903,
  },
  {
    id: "ESH",
    value: 508954,
  },
  {
    id: "SAU",
    value: 251320,
  },
  {
    id: "SDN",
    value: 11821,
  },
  {
    id: "SDS",
    value: 517570,
  },
  {
    id: "SEN",
    value: 598114,
  },
  {
    id: "SLB",
    value: 579028,
  },
  {
    id: "SLE",
    value: 248403,
  },
  {
    id: "SLV",
    value: 900641,
  },
  {
    id: "ABV",
    value: 828246,
  },
  {
    id: "SOM",
    value: 579215,
  },
  {
    id: "SRB",
    value: 382341,
  },
  {
    id: "SUR",
    value: 936216,
  },
  {
    id: "SVK",
    value: 796675,
  },
  {
    id: "SVN",
    value: 637350,
  },
  {
    id: "SWZ",
    value: 29259,
  },
  {
    id: "SYR",
    value: 158033,
  },
  {
    id: "TCD",
    value: 698893,
  },
  {
    id: "TGO",
    value: 419463,
  },
  {
    id: "THA",
    value: 605426,
  },
  {
    id: "TJK",
    value: 970035,
  },
  {
    id: "TKM",
    value: 789446,
  },
  {
    id: "TLS",
    value: 374450,
  },
  {
    id: "TTO",
    value: 588184,
  },
  {
    id: "TUN",
    value: 592324,
  },
  {
    id: "TUR",
    value: 671021,
  },
  {
    id: "TWN",
    value: 663898,
  },
  {
    id: "TZA",
    value: 874659,
  },
  {
    id: "UGA",
    value: 208666,
  },
  {
    id: "UKR",
    value: 757177,
  },
  {
    id: "URY",
    value: 941995,
  },
  {
    id: "USA",
    value: 752411,
  },
  {
    id: "UZB",
    value: 56818,
  },
  {
    id: "VEN",
    value: 122191,
  },
  {
    id: "VNM",
    value: 964491,
  },
  {
    id: "VUT",
    value: 924543,
  },
  {
    id: "PSE",
    value: 887684,
  },
  {
    id: "YEM",
    value: 327065,
  },
  {
    id: "ZAF",
    value: 136962,
  },
  {
    id: "ZMB",
    value: 134424,
  },
  {
    id: "ZWE",
    value: 438282,
  },
  {
    id: "KOR",
    value: 657069,
  },
];
