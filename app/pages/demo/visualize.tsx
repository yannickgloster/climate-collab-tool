import Layout from "../../components/layout";
import Visualize, { VisualizeProps } from "../../components/lineChart";
import Typography from "@mui/material/Typography";

import { SSPDetails } from "../../utils/details";
import { userState } from "../../utils/game";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

import { Region, SSP } from "@prisma/client";
import Map from "../../components/map";
import Box from "@mui/material/Box";

const ssp = SSP.SSP585;

const region = Region.China;

export default function VisualizeTest({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout gameCode={"TEST"} region={region}>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Visualize Data: {SSPDetails[ssp].name}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {SSPDetails[ssp].description}
      </Typography>
      <Visualize data={data} />
      <Box width={500} border="1px dashed grey">
        <Map data={data.mapData} />
      </Box>
    </Layout>
  );
}
