import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { default as NextLink } from "next/link";

import Layout from "../components/layout";

import { loadTranslation } from "../utils/translation";
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

export default function () {
  return (
    <Layout img="/images/eberhard-grossgasteiger-jCL98LGaeoE-unsplash.jpg">
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Sources
      </Typography>
      <Typography variant="body2" textAlign="center">
        <Link component={NextLink} href="/">
          Return Home
        </Link>
      </Typography>
      <Typography variant="h4" textAlign="center" fontWeight={800}>
        Images
      </Typography>
      <Typography variant="body1" textAlign="center">
        Photo by{" "}
        <Link href="https://unsplash.com/@katekerdi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Katerina Kerdi
        </Link>{" "}
        on{" "}
        <Link href="https://unsplash.com/photos/-YiJvbfNDqk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </Link>
      </Typography>
      <Typography variant="body1" textAlign="center">
        Photo by{" "}
        <Link href="https://unsplash.com/@eberhardgross?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          eberhard 🖐 grossgasteiger
        </Link>{" "}
        on{" "}
        <Link href="https://unsplash.com/images/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </Link>
      </Typography>
    </Layout>
  );
}
