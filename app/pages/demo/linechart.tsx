import Layout from "../../components/layout";
import Linechart from "../../components/lineChart";

import { VisualizeProps } from "../../components/visualize";

import { userState } from "../../utils/game";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

import { Region, SSP } from "@prisma/client";

const ssp = SSP.SSP585;

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

export default function VisualizeTest({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout gameCode={"TEST"} region={region}>
      <Linechart data={data.line.temp} variableName="Mean Temperature" />
    </Layout>
  );
}
