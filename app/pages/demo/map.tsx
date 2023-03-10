import Layout from "../../components/layout";
import Map from "../../components/map";
import Box from "@mui/material/Box";

import { VisualizeProps } from "../../components/visualize";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { Region, SSP } from "@prisma/client";

const ssp = SSP.SSP119;

const region = Region.China;

import { loadTranslation } from "../../utils/translation";
import { GetStaticProps } from "next/types";

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
