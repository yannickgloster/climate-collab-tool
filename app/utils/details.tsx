import { Region, SSP, Model } from "@prisma/client";
type RegionDetails = {
  [key in Region]: {
    name: string;
    description: string;
    emissionUnits: number;
  };
};

export const RegionDetails: RegionDetails = {
  [Region.EU]: {
    name: "European Union",
    description:
      "The European Union (EU) is a political and economic union of 27 member states that are located primarily in Europe.",
    emissionUnits: 12,
  },
  [Region.US]: {
    name: "United States of America",
    description:
      "A country primarily located in North America consisting of 50 states.",
    emissionUnits: 22,
  },
  [Region.China]: {
    name: "China",
    description:
      "A country in East Asia with a population exceeding 1.4 billion, the most in the world.",
    emissionUnits: 47,
  },
  [Region.SA]: {
    name: "South American Amazonian Countries",
    description:
      "The following group of countries: Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana.",
    emissionUnits: 5,
  },
  [Region.India]: {
    name: "India",
    description:
      "A country in South Asia where it is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world.",
    emissionUnits: 13,
  },
  [Region.Island]: {
    name: "Alliance of Small Island States",
    description:
      "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
    emissionUnits: 1,
  },
};

type SSPDetails = {
  [key in SSP]: {
    name: string;
    description: string;
    emission: number;
    atlasLink?: string;
  };
};

// Descriptions from: https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const SSPDetails: SSPDetails = {
  [SSP.SSP119]: {
    name: "SSP 1-1.9",
    description:
      "SSP1-1.9 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP1-1.9 is based on SSP1 with low climate change mitigation and adaptation challenges and RCP1.9, a future pathway with a radiative forcing of 1.9 W/m2 in the year 2100. The SSP1-1.9 scenario fills a gap at the very low end of the range of plausible future forcing pathways. SSP1-1.9 forcing will be substantially below SSP1-2.6 in 2100. There is policy interest in low-forcing scenarios that would inform a possible goal of limiting global mean warming to 1.5°C above pre-industrial levels based on the Paris COP21 agreement.",
    emission: 10,
  },
  [SSP.SSP126]: {
    name: "SSP 1-2.6",
    description:
      "SSP1-2.6 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP1-2.6 is based on SSP1 with low climate change mitigation and adaptation challenges and RCP2.6, a future pathway with a radiative forcing of 2.6 W/m2 in the year 2100. The SSP1-2.6 scenario represents the low end of plausible future forcing pathways. SSP1-2.6 depicts a 'best case' future from a sustainability perspective.",
    emission: 30,
    atlasLink: "https://interactive-atlas.ipcc.ch/permalink/kb5pXfjf",
  },
  [SSP.SSP245]: {
    name: "SSP 2-4.5",
    description:
      "SSP2-4.5 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP2-4.5 is based on SSP2 with intermediate climate change mitigation and adaptation challenges and RCP4.5, a future pathway with a radiative forcing of 4.5 W/m2 in the year 2100. The ssp245 scenario represents the medium part of plausible future forcing pathways. SSP2-4.5 is comparable to the CMIP5 experiment RCP4.5.",
    emission: 45,
    atlasLink: "https://interactive-atlas.ipcc.ch/permalink/DknmXOcr",
  },
  [SSP.SSP370]: {
    name: "SSP 3-7.0",
    description:
      "SSP3-7.0 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP3-7.0 is based on SSP3 in which climate change mitigation and adaptation challenges are high and RCP7.0, a future pathway with a radiative forcing of 7.0 W/m2 in the year 2100. The SSP3-7.0 scenario represents the medium to high end of plausible future forcing pathways. SSP3-7.0 fills a gap in the CMIP5 forcing pathways that is particularly important because it represents a forcing level common to several (unmitigated) SSP baseline pathways.",
    emission: 60,
    atlasLink: "https://interactive-atlas.ipcc.ch/permalink/l9ZvwmMd",
  },
  [SSP.SSP434]: {
    name: "SSP 4-3.4",
    description:
      "SSP4-3.4 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP4-3.4 is based on SSP4 in which climate change adaptation challenges dominate and RCP3.4, a future pathway with a radiative forcing of 3.4 W/m2 in the year 2100. The SSP4-3.4 scenario fills a gap at the low end of the range of plausible future forcing pathways. SSP4-3.4 is of interest to mitigation policy since mitigation costs differ substantially between forcing levels of 4.5 W/m2 and 2.6 W/m2.",
    emission: 5,
  },
  [SSP.SSP460]: {
    name: "SSP 4-6.0",
    description:
      "SSP4-6.0 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP4-6.0 is based on SSP4 in which climate change adaptation challenges dominate and RCP6.0, a future pathway with a radiative forcing of 6.0 W/m2 in the year 2100. The SSP4-6.0 scenario fills in the range of medium plausible future forcing pathways. SSP4-6.0 defines the low end of the forcing range for unmitigated SSP baseline scenarios.",
    emission: 50,
  },
  [SSP.SSP534OS]: {
    name: "SSP 5-3.4OS",
    description:
      "SSP5-3.4OS is a scenario experiment with simulations beginning in the mid-21st century running from 2040 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP5-3.4OS is based on SSP5 in which climate change mitigation challenges dominate and RCP3.4-over, a future pathway with a peak and decline in forcing towards an eventual radiative forcing of 3.4 W/m2 in the year 2100. The SSP5-3.4OS scenario branches from SSP5-8.5 in the year 2040 whereupon it applies substantially negative net emissions. SSP5-3.4OS explores the climate science and policy implications of a peak and decline in forcing during the 21st century. SSP5-3.4OS fills a gap in existing climate simulations by investigating the implications of a substantial overshoot in radiative forcing relative to a longer-term target.",
    emission: 55,
  },
  [SSP.SSP585]: {
    name: "SSP 5-8.5",
    description:
      "SSP5-8.5 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP5-8.5 is based on SSP5 in which climate change mitigation challenges dominate and RCP8.5, a future pathway with a radiative forcing of 8.5 W/m2 in the year 2100. The ssp585 scenario represents the high end of plausible future forcing pathways.  SSP5-8.5 is comparable to the CMIP5 experiment RCP8.5.",
    atlasLink: "https://interactive-atlas.ipcc.ch/permalink/TKJP21BH",
    emission: 100,
  },
};

type ModelDetails = {
  [key in Model]: {
    name: string;
    modelingCenter: string;
    description: string;
  };
};

// From https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const ModelDetails: ModelDetails = {
  [Model.CNRM_CM6_1]: {
    name: "CNRM-CM6-1",
    modelingCenter:
      "CNRM-CERFACS (National Center for Meteorological Research, Météo-France and CNRS laboratory, Climate Modeling and Global change)",
    description:
      "The model includes the components: aerosol: prescribed monthly fields computed by TACTIC_v2 scheme, atmos: Arpege 6.3 (T127; Gaussian Reduced with 24572 grid points in total distributed over 128 latitude circles (with 256 grid points per latitude circle between 30degN and 30degS reducing to 20 grid points per latitude circle at 88.9degN and 88.9degS); 91 levels; top-level 78.4 km), atmosChem: OZL_v2, land: Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar primarily 1deg; 362 x 294 longitude/latitude; 75 levels; top grid cell 0-1 m), seaIce: Gelato 6.1. The model was run in native nominal resolutions: aerosol: 250 km, atmos: 250 km, atmosChem: 250 km, land: 250 km, ocean: 100 km, seaIce: 100 km.",
  },
  [Model.CNRM_ESM2_1]: {
    name: "CNRM-ESM2-1",
    modelingCenter:
      "CNRM-CERFACS (National Center for Meteorological Research, Météo-France and CNRS laboratory, Climate Modeling and Global change)",
    description:
      "The model includes the components: aerosol: TACTIC_v2, atmos: Arpege 6.3 (T127; Gaussian Reduced with 24572 grid points in total distributed over 128 latitude circles (with 256 grid points per latitude circle between 30degN and 30degS reducing to 20 grid points per latitude circle at 88.9degN and 88.9degS); 91 levels; top-level 78.4 km), atmosChem: REPROBUS-C_v2, land: Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar primarily 1deg; 362 x 294 longitude/latitude; 75 levels; top grid cell 0-1 m), ocnBgchem: Pisces 2.s, seaIce: Gelato 6.1. The model was run in native nominal resolutions: aerosol: 250 km, atmos: 250 km, atmosChem: 250 km, land: 250 km, ocean: 100 km, ocnBgchem: 100 km, seaIce: 100 km.",
  },
};

export const DescriptiveTooltips = {
  [Region.SA]:
    "Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana",
  [Region.Island]:
    "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
  IPCC: "The Intergovernmental Panel on Climate Change (IPCC) is an intergovernmental body of the United Nations who's job is to advance scientific knowledge about climate change caused by human activities.",
};
