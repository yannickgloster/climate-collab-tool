import Layout from "../../components/layout";
import Map from "../../components/map";
import Box from "@mui/material/Box";

import { VisualizeProps } from "../../components/lineChart";

import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

import { Region, SSP } from "@prisma/client";

const ssp = SSP.SSP585;

const region = Region.China;

export default function LoadingTest() {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout>
      <Box width={500} border="1px dashed grey">
        <Map data={data.mapData} />
      </Box>
    </Layout>
  );
}
