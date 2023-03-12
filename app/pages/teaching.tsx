import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";

import { loadTranslation } from "../utils/translation";
import { GetStaticProps } from "next/types";
import { Trans, t, plural } from "@lingui/macro";
import { Region, SSP } from "@prisma/client";
import {
  DATATYPE,
  steps,
  VisualizeProps,
  VisualizeState,
} from "../components/visualize";
import { SelectChangeEvent } from "@mui/material";
import { props } from "cypress/types/bluebird";
import Loading from "../components/loading";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === "production"
  );

  return {
    props: {
      translation,
    },
  };
};

export default function Teaching() {
  const [selectedSSP, setSelectedSSP] = useState<SSP>(SSP.SSP119);
  const [selectedRegion, setSelectedRegion] = useState<Region>(Region.EU);

  const [selectedData, setSelectedData] = useState<VisualizeProps["data"]>();
  const [selectedDataMenu, setSelectedDataMenu] = useState<DATATYPE>("temp");
  const handleDataMenuChange = (event: SelectChangeEvent) => {
    setSelectedDataMenu(event.target.value as DATATYPE);
  };

  const fetchData = (ssp: SSP, region: Region) => {
    fetch(`/api/data?ssp=${ssp}&region=${region}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSSP(ssp);
        setSelectedRegion(region);
        setSelectedData(data);
      })
      .catch((_error) => {});
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const region = event.target.value as Region;
    fetchData(selectedSSP, region);
  };

  const handleSSPChange = (event: SelectChangeEvent) => {
    const ssp = event.target.value as SSP;
    fetchData(ssp, selectedRegion);
  };

  useEffect(() => {
    fetchData(selectedSSP, selectedRegion);
  }, []);

  if (!selectedData) return <Loading />;

  return (
    <Layout>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        <Trans>Scenarios</Trans>
      </Typography>
      {steps[VisualizeState.Other].content({
        data: selectedData,
        ssp: selectedSSP,
        region: selectedRegion,
        selectedSSP,
        handleSSPChange,
        selectedRegion,
        handleRegionChange,
        selectedData,
        handleDataMenuChange,
        selectedDataMenu,
        disableTitle: true,
        disableSubtitle: true,
      })}
    </Layout>
  );
}
