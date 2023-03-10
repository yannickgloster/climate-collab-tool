import { Region, SSP, Model, QuestionTopic } from "@prisma/client";
import { Trans, t, plural } from "@lingui/macro";
import { ReactElement } from "react";

// TODO: Add type checking for <Trans>
type RegionDetails = {
  [key in Region]: {
    name: any;
    description: any;
    emissionUnits: number;
  };
};

export const RegionDetails: RegionDetails = {
  [Region.EU]: {
    name: <Trans>European Union</Trans>,
    description: (
      <Trans>
        The European Union (EU) is a political and economic union of 27 member
        states that are located primarily in Europe.
      </Trans>
    ),
    emissionUnits: 12,
  },
  [Region.US]: {
    name: <Trans>United States of America</Trans>,
    description: (
      <Trans>
        A country primarily located in North America consisting of 50 states.
      </Trans>
    ),
    emissionUnits: 22,
  },
  [Region.China]: {
    name: <Trans>China</Trans>,
    description: (
      <Trans>
        A country in East Asia with a population exceeding 1.4 billion, the most
        in the world.
      </Trans>
    ),
    emissionUnits: 47,
  },
  [Region.SA]: {
    name: <Trans>South American Amazonian Countries</Trans>,
    description: (
      <Trans>
        The following group of countries: Brazil, Columbia, Bolivia, Peru,
        Ecuador, Venezuela, Suriname, and Guyana.
      </Trans>
    ),
    emissionUnits: 5,
  },
  [Region.India]: {
    name: <Trans>India</Trans>,
    description: (
      <Trans>
        A country in South Asia where it is the seventh-largest country by area,
        the second-most populous country, and the most populous democracy in the
        world.
      </Trans>
    ),
    emissionUnits: 13,
  },
  [Region.Island]: {
    name: <Trans>Alliance of Small Island States</Trans>,
    description: (
      <Trans>
        Alliance of Small Island States (AOSIS) is an intergovernmental
        organization of 39 low-lying coastal and small island countries.
      </Trans>
    ),
    emissionUnits: 1,
  },
};

type SSPDetails = {
  [key in SSP]: {
    name: any;
    oneLine: any;
    shortDescription: any;
    description: any;
    scientificName: any;
    scientificDescription: any;
    emission: number;
    atlasLink?: string;
  };
};

// Descriptions from: https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const SSPDetails: SSPDetails = {
  [SSP.SSP119]: {
    name: <Trans>Scenario 1</Trans>,
    oneLine: <Trans>Taking the Green Road</Trans>,
    shortDescription: (
      <Trans>
        Taking the Green Road. A sustainable society leads to very strongly
        declining emissions with ~1.5 °C average temperature increase.
      </Trans>
    ),
    description: (
      <Trans>
        The world shifts gradually, but pervasively, toward a more sustainable
        path, emphasizing more inclusive development that respects perceived
        environmental boundaries. Management of the global commons slowly
        improves, educational and health investments accelerate the demographic
        transition, and the emphasis on economic growth shifts toward a broader
        emphasis on human well-being. Driven by an increasing commitment to
        achieving development goals, inequality is reduced both across and
        within countries. Consumption is oriented toward low material growth and
        lower resource and energy intensity.
      </Trans>
    ),
    scientificName: <Trans>SSP 1-1.9</Trans>,
    scientificDescription: (
      <Trans>
        SSP1-1.9 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP1-1.9 is based on SSP1 with low climate change mitigation and
        adaptation challenges and RCP1.9, a future pathway with a radiative
        forcing of 1.9 W/m2 in the year 2100. The SSP1-1.9 scenario fills a gap
        at the very low end of the range of plausible future forcing pathways.
        SSP1-1.9 forcing will be substantially below SSP1-2.6 in 2100. There is
        policy interest in low-forcing scenarios that would inform a possible
        goal of limiting global mean warming to 1.5°C above pre-industrial
        levels based on the Paris COP21 agreement.
      </Trans>
    ),
    emission: 10,
  },
  [SSP.SSP126]: {
    name: <Trans>Scenario 2</Trans>,
    oneLine: <Trans>Taking the Green Road</Trans>,
    shortDescription: (
      <Trans>
        Taking the Green Road. Our best-case scenario. A sustainable society
        leads to strongly declining emissions with ~2.0 °C average temperature
        increase.
      </Trans>
    ),
    description: (
      <Trans>
        The world follows a path in which social, economic, and technological
        trends do not shift markedly from historical patterns. Development and
        income growth proceeds unevenly, with some countries making relatively
        good progress while others fall short of expectations. Global and
        national institutions work toward but make slow progress in achieving
        sustainable development goals. Environmental systems experience
        degradation, although there are some improvements and overall the
        intensity of resource and energy use declines. Global population growth
        is moderate and levels off in the second half of the century.
      </Trans>
    ),
    scientificName: <Trans>SSP 1-2.6</Trans>,
    scientificDescription: (
      <Trans>
        SSP1-2.6 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP1-2.6 is based on SSP1 with low climate change mitigation and
        adaptation challenges and RCP2.6, a future pathway with a radiative
        forcing of 2.6 W/m2 in the year 2100. The SSP1-2.6 scenario represents
        the low end of plausible future forcing pathways. SSP1-2.6 depicts a
        'best case' future from a sustainability perspective.
      </Trans>
    ),
    emission: 30,
    atlasLink: `https://interactive-atlas.ipcc.ch/permalink/kb5pXfjf`,
  },
  [SSP.SSP245]: {
    name: <Trans>Scenario 3</Trans>,
    oneLine: <Trans>Middle of the road</Trans>,
    shortDescription: (
      <Trans>
        Middle of the road. Society follows a path with very change from history
        which leads to slowly declining emissions with ~2.4 °C average
        temperature increase.
      </Trans>
    ),
    description: (
      <Trans>
        The world follows a path in which social, economic, and technological
        trends do not shift markedly from historical patterns. Development and
        income growth proceeds unevenly, with some countries making relatively
        good progress while others fall short of expectations. Global and
        national institutions work toward but make slow progress in achieving
        sustainable development goals. Environmental systems experience
        degradation, although there are some improvements and overall the
        intensity of resource and energy use declines. Global population growth
        is moderate and levels off in the second half of the century.
      </Trans>
    ),
    scientificName: <Trans>SSP 2-4.5</Trans>,
    scientificDescription: (
      <Trans>
        SSP2-4.5 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP2-4.5 is based on SSP2 with intermediate climate change mitigation
        and adaptation challenges and RCP4.5, a future pathway with a radiative
        forcing of 4.5 W/m2 in the year 2100. The ssp245 scenario represents the
        medium part of plausible future forcing pathways. SSP2-4.5 is comparable
        to the CMIP5 experiment RCP4.5.
      </Trans>
    ),
    emission: 45,
    atlasLink: `https://interactive-atlas.ipcc.ch/permalink/DknmXOcr`,
  },
  [SSP.SSP370]: {
    name: <Trans>Scenario 4</Trans>,
    oneLine: <Trans>Regional Rivalry - A Rocky Road</Trans>,
    shortDescription: (
      <Trans>
        Regional Rivalry - A Rocky Road. Society focus more on domestic and
        regional issues which causes high emissions with ~2.8 °C average
        temperature increase.
      </Trans>
    ),
    description: (
      <Trans>
        A resurgent nationalism, concerns about competitiveness and security,
        and regional conflicts push countries to increasingly focus on domestic
        or, at most, regional issues. Policies shift over time to become
        increasingly oriented toward national and regional security issues.
        Countries focus on achieving energy and food security goals within their
        own regions at the expense of broader-based development. Investments in
        education and technological development decline. Economic development is
        slow, consumption is material-intensive, and inequalities persist or
        worsen over time. Population growth is low in industrialized and high in
        developing countries. A low international priority for addressing
        environmental concerns leads to strong environmental degradation in some
        regions.
      </Trans>
    ),
    scientificName: <Trans>SSP 3-7.0</Trans>,
    scientificDescription: (
      <Trans>
        SSP3-7.0 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP3-7.0 is based on SSP3 in which climate change mitigation and
        adaptation challenges are high and RCP7.0, a future pathway with a
        radiative forcing of 7.0 W/m2 in the year 2100. The SSP3-7.0 scenario
        represents the medium to high end of plausible future forcing pathways.
        SSP3-7.0 fills a gap in the CMIP5 forcing pathways that is particularly
        important because it represents a forcing level common to several
        (unmitigated) SSP baseline pathways.
      </Trans>
    ),
    emission: 60,
    atlasLink: `https://interactive-atlas.ipcc.ch/permalink/l9ZvwmMd`,
  },
  [SSP.SSP434]: {
    name: <Trans>Scenario 5</Trans>,
    oneLine: <Trans>Inequality - A Road Divided</Trans>,
    shortDescription: (
      <Trans>
        Inequality - A Road Divided. Society becomes increasingly more inequal
        however the energy sector diversifies which causes ~2.6 °C average
        temperature increase.
      </Trans>
    ),
    description: (
      <Trans>
        Highly unequal investments in human capital, combined with increasing
        disparities in economic opportunity and political power, lead to
        increasing inequalities and stratification both across and within
        countries. Over time, a gap widens between an internationally-connected
        society that contributes to knowledge- and capital-intensive sectors of
        the global economy, and a fragmented collection of lower-income, poorly
        educated societies that work in a labour intensive, low-tech economy.
        Social cohesion degrades and conflict and unrest become increasingly
        common. Technology development is high in the high-tech economy and
        sectors. The globally connected energy sector diversifies, with
        investments in both carbon-intensive fuels like coal and unconventional
        oil, but also low-carbon energy sources.
      </Trans>
    ),
    scientificName: <Trans>SSP 4-3.4</Trans>,
    scientificDescription: (
      <Trans>
        SSP4-3.4 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP4-3.4 is based on SSP4 in which climate change adaptation challenges
        dominate and RCP3.4, a future pathway with a radiative forcing of 3.4
        W/m2 in the year 2100. The SSP4-3.4 scenario fills a gap at the low end
        of the range of plausible future forcing pathways. SSP4-3.4 is of
        interest to mitigation policy since mitigation costs differ
        substantially between forcing levels of 4.5 W/m2 and 2.6 W/m2.
      </Trans>
    ),
    emission: 5,
  },
  [SSP.SSP460]: {
    name: <Trans>Scenario 6</Trans>,
    oneLine: <Trans>Inequality - A Road Divided</Trans>,
    shortDescription: (
      <Trans>
        Inequality - A Road Divided. Society becomes increasingly more inequal
        however the energy sector diversifies which causing stabilising
        emissioons and ~2.8 °C average temperature increase.
      </Trans>
    ),
    description: (
      <Trans>
        Highly unequal investments in human capital, combined with increasing
        disparities in economic opportunity and political power, lead to
        increasing inequalities and stratification both across and within
        countries. Over time, a gap widens between an internationally-connected
        society that contributes to knowledge- and capital-intensive sectors of
        the global economy, and a fragmented collection of lower-income, poorly
        educated societies that work in a labour intensive, low-tech economy.
        Social cohesion degrades and conflict and unrest become increasingly
        common. Technology development is high in the high-tech economy and
        sectors. The globally connected energy sector diversifies, with
        investments in both carbon-intensive fuels like coal and unconventional
        oil, but also low-carbon energy sources.
      </Trans>
    ),
    scientificName: <Trans>SSP 4-6.0</Trans>,
    scientificDescription: (
      <Trans>
        SSP4-6.0 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP4-6.0 is based on SSP4 in which climate change adaptation challenges
        dominate and RCP6.0, a future pathway with a radiative forcing of 6.0
        W/m2 in the year 2100. The SSP4-6.0 scenario fills in the range of
        medium plausible future forcing pathways. SSP4-6.0 defines the low end
        of the forcing range for unmitigated SSP baseline scenarios.
      </Trans>
    ),
    emission: 50,
  },
  [SSP.SSP534OS]: {
    name: <Trans>Scenario 7</Trans>,
    oneLine: <Trans>Fossil fuelled development - Taking the Highway</Trans>,
    shortDescription: (
      <Trans>
        Fossil fuelled development - Taking the Highway. The world places faith
        in competitive markets that succeed in tackling the climate change
        crisis which cause only a ~2.4 °C increase in average temperature.
      </Trans>
    ),
    description: (
      <Trans>
        This world places increasing faith in competitive markets, innovation
        and participatory societies to produce rapid technological progress and
        development of human capital as the path to sustainable development.
        Global markets are increasingly integrated. There are also strong
        investments in health, education, and institutions to enhance human and
        social capital. At the same time, the push for economic and social
        development is coupled with the exploitation of abundant fossil fuel
        resources and the adoption of resource and energy intensive lifestyles
        around the world. All these factors lead to rapid growth of the global
        economy, while global population peaks and declines in the 21st century.
        Local environmental problems like air pollution are successfully
        managed. There is faith in the ability to effectively manage social and
        ecological systems, including by geo-engineering if necessary.
      </Trans>
    ),
    scientificName: <Trans>SSP 5-3.4OS</Trans>,
    scientificDescription: (
      <Trans>
        SSP5-3.4OS is a scenario experiment with simulations beginning in the
        mid-21st century running from 2040 to 2100, it is performed with a
        coupled atmosphere-ocean general circulation model (AOGCM). The forcing
        for the CMIP6 SSP experiments is derived from shared socioeconomic
        pathways (SSPs), a set of emission scenarios driven by different
        socioeconomic assumptions, paired with representative concentration
        pathways (RCPs), global forcing pathways which lead to specific end of
        century radiative forcing targets. SSP5-3.4OS is based on SSP5 in which
        climate change mitigation challenges dominate and RCP3.4-over, a future
        pathway with a peak and decline in forcing towards an eventual radiative
        forcing of 3.4 W/m2 in the year 2100. The SSP5-3.4OS scenario branches
        from SSP5-8.5 in the year 2040 whereupon it applies substantially
        negative net emissions. SSP5-3.4OS explores the climate science and
        policy implications of a peak and decline in forcing during the 21st
        century. SSP5-3.4OS fills a gap in existing climate simulations by
        investigating the implications of a substantial overshoot in radiative
        forcing relative to a longer-term target.
      </Trans>
    ),
    emission: 55,
  },
  [SSP.SSP585]: {
    name: <Trans>Scenario 8</Trans>,
    oneLine: <Trans>Fossil fuelled development - Taking the Highway</Trans>,
    shortDescription: (
      <Trans>
        Fossil fuelled development - Taking the Highway. The world places faith
        in competitive markets that have yet to succeed in tackling the climate
        change crisis which causes a ~4.3 °C increase in average temperature.
      </Trans>
    ),
    description: (
      <Trans>
        This world places increasing faith in competitive markets, innovation
        and participatory societies to produce rapid technological progress and
        development of human capital as the path to sustainable development.
        Global markets are increasingly integrated. There are also strong
        investments in health, education, and institutions to enhance human and
        social capital. At the same time, the push for economic and social
        development is coupled with the exploitation of abundant fossil fuel
        resources and the adoption of resource and energy intensive lifestyles
        around the world. All these factors lead to rapid growth of the global
        economy, while global population peaks and declines in the 21st century.
        Local environmental problems like air pollution are successfully
        managed. There is faith in the ability to effectively manage social and
        ecological systems, including by geo-engineering if necessary.
      </Trans>
    ),
    scientificName: <Trans>SSP 5-8.5</Trans>,
    scientificDescription: (
      <Trans>
        SSP5-8.5 is a scenario experiment extending into the near future from
        2015 to 2100, it is performed with a coupled atmosphere-ocean general
        circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is
        derived from shared socioeconomic pathways (SSPs), a set of emission
        scenarios driven by different socioeconomic assumptions, paired with
        representative concentration pathways (RCPs), global forcing pathways
        which lead to specific end of century radiative forcing targets.
        SSP5-8.5 is based on SSP5 in which climate change mitigation challenges
        dominate and RCP8.5, a future pathway with a radiative forcing of 8.5
        W/m2 in the year 2100. The ssp585 scenario represents the high end of
        plausible future forcing pathways. SSP5-8.5 is comparable to the CMIP5
        experiment RCP8.5.
      </Trans>
    ),
    atlasLink: `https://interactive-atlas.ipcc.ch/permalink/TKJP21BH`,
    emission: 100,
  },
};

type ModelDetails = {
  [key in Model]: {
    scientificName: any;
    modelingCenter: any;
    scientificDescription: any;
  };
};

// From https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const ModelDetails: ModelDetails = {
  [Model.CNRM_CM6_1]: {
    scientificName: <Trans>CNRM-CM6-1</Trans>,
    modelingCenter: (
      <Trans>
        CNRM-CERFACS (National Center for Meteorological Research, Météo-France
        and CNRS laboratory, Climate Modeling and Global change)
      </Trans>
    ),
    scientificDescription: (
      <Trans>
        The model includes the components: aerosol: prescribed monthly fields
        computed by TACTIC_v2 scheme, atmos: Arpege 6.3 (T127; Gaussian Reduced
        with 24572 grid points in total distributed over 128 latitude circles
        (with 256 grid points per latitude circle between 30degN and 30degS
        reducing to 20 grid points per latitude circle at 88.9degN and
        88.9degS); 91 levels; top-level 78.4 km), atmosChem: OZL_v2, land:
        Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar primarily 1deg; 362 x 294
        longitude/latitude; 75 levels; top grid cell 0-1 m), seaIce: Gelato 6.1.
        The model was run in native nominal resolutions: aerosol: 250 km, atmos:
        250 km, atmosChem: 250 km, land: 250 km, ocean: 100 km, seaIce: 100 km.
      </Trans>
    ),
  },
  [Model.CNRM_ESM2_1]: {
    scientificName: <Trans>CNRM-ESM2-1</Trans>,
    modelingCenter: (
      <Trans>
        CNRM-CERFACS (National Center for Meteorological Research, Météo-France
        and CNRS laboratory, Climate Modeling and Global change)
      </Trans>
    ),
    scientificDescription: (
      <Trans>
        The model includes the components: aerosol: TACTIC_v2, atmos: Arpege 6.3
        (T127; Gaussian Reduced with 24572 grid points in total distributed over
        128 latitude circles (with 256 grid points per latitude circle between
        30degN and 30degS reducing to 20 grid points per latitude circle at
        88.9degN and 88.9degS); 91 levels; top-level 78.4 km), atmosChem:
        REPROBUS-C_v2, land: Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar
        primarily 1deg; 362 x 294 longitude/latitude; 75 levels; top grid cell
        0-1 m), ocnBgchem: Pisces 2.s, seaIce: Gelato 6.1. The model was run in
        native nominal resolutions: aerosol: 250 km, atmos: 250 km, atmosChem:
        250 km, land: 250 km, ocean: 100 km, ocnBgchem: 100 km, seaIce: 100 km.
      </Trans>
    ),
  },
};

type QuestionTopicDetails = {
  [key in QuestionTopic]: {
    name: any;
  };
};

export const QuestionTopicDetails: QuestionTopicDetails = {
  [QuestionTopic.EnergyProduction]: {
    name: <Trans id="question.type.energyProduction">Energy Production</Trans>,
  },
  [QuestionTopic.LandUseChange]: {
    name: (
      <Trans id="question.type.landUseChange">
        Changing how we use our Land
      </Trans>
    ),
  },
};

export const DescriptiveTooltips = {
  [Region.SA]: `Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana`,
  [Region.Island]: `Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.`,
  IPCC: `The Intergovernmental Panel on Climate Change (IPCC) is an intergovernmental body of the United Nations who's job is to advance scientific knowledge about climate change caused by human activities.`,
  "protected forest": `A forest with some amount of legal or constitutional protection, or where the habitat and resident species are legally accorded protection from further depletion.`,
  "nitrous oxide": `A type of pollutant which hurts the enviroment.`,
  biofuels:
    "Fuel produced quickly from plants or biowaste. Considere to be a renewable energy source.",
  "plantation forests":
    "Forsts planted to grow large amounts of wood. Also known as tree farms.",
  hydrogen:
    "Hydrogen can be used as a fuel that emits zero emissions. When burned as fuel, water is produced as a result.",
  biogas:
    "A mixture of gases such as methane, carbon dioxide, and others which create a renewable energy soruce.",
};
