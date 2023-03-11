import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { default as NextLink } from "next/link";

import Layout from "../components/layout";

import { loadTranslation } from "../utils/translation";
import { GetStaticProps } from "next/types";
import { Trans, t, plural } from "@lingui/macro";

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
        <Trans>Sources</Trans>
      </Typography>
      <Typography variant="body2" textAlign="center">
        <Link component={NextLink} href="/">
          <Trans>Return Home</Trans>
        </Link>
      </Typography>
      <Typography variant="h4" textAlign="center" fontWeight={800}>
        <Trans>Images</Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.1">
          Photo by{" "}
          <Link href="https://unsplash.com/@katekerdi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Katerina Kerdi
          </Link>{" "}
          on{" "}
          <Link href="https://unsplash.com/photos/-YiJvbfNDqk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.2">
          Photo by{" "}
          <Link href="https://unsplash.com/@eberhardgross?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            eberhard 🖐 grossgasteiger
          </Link>{" "}
          on{" "}
          <Link href="https://unsplash.com/images/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.3">
          Photo by{" "}
          <Link href="https://unsplash.com/@maritaextrabold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Marita Kavelashvili
          </Link>{" "}
          on{" "}
          <Link href="https://unsplash.com/wallpapers/nature/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.4">
          Photo by{" "}
          <a href="https://unsplash.com/it/@chrisleboutillier?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Chris LeBoutillier
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/TUJud0AWAPI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.5">
          Photo by{" "}
          <a href="https://unsplash.com/@polarmermaid?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Anne Nygård
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/Emissions?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.6">
          Photo by{" "}
          <a href="https://unsplash.com/@stijntestrake?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Stijn te Strake
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/UdhpcfImQ9Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.7">
          Photo by{" "}
          <a href="https://unsplash.com/fr/@viramedio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Chris Ensminger
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/yJDZTDeHeG8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.8">
          Photo by{" "}
          <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Annie Spratt
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/CoGIz2DJKp8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.9">
          Photo by{" "}
          <a href="https://unsplash.com/@timmossholder?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Tim Mossholder
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/farmers?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.10">
          Photo by{" "}
          <a href="https://unsplash.com/@qangjaka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Qang Jaka
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/oqy-em7_ifM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.11">
          Photo by{" "}
          <a href="https://unsplash.com/@lucabravo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Luca Bravo
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/wallpapers/nature/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.12">
          Photo by{" "}
          <a href="https://unsplash.com/@rozetsky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Ant Rozetsky
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/industry?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.13">
          Photo by{" "}
          <a href="https://unsplash.com/@joeldevriend?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Joël de Vriend
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/qZ6if8WXl7E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.14">
          Photo by{" "}
          <a href="https://unsplash.com/@brenoassis?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Breno Assis
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/housing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.15">
          Photo by{" "}
          <a href="https://unsplash.com/@robmenting?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Rob Menting
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/erYjzEufvr0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.16">
          Photo by{" "}
          <a href="https://unsplash.com/@publicpowerorg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            American Public Power Association
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/eIBTh5DXW9w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.17">
          Photo by{" "}
          <a href="https://unsplash.com/@feiffert?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Frank Eiffert
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/pedestrian-street?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.18">
          Photo by{" "}
          <a href="https://unsplash.com/ko/@besluk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Luke Besley
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/k5l-zbRSPds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.19">
          Photo by{" "}
          <a href="https://unsplash.com/@starocker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            VOO QQQ
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/RSYBi_1fhfM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.20">
          Photo by{" "}
          <a href="https://unsplash.com/@arnosenoner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Arno Senoner
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/yqu6tJkSQ_k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="image.credit.21">
          Photo by{" "}
          <a href="https://unsplash.com/@collab_media?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Collab Media
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/GmqezLxud8g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </Trans>
      </Typography>
    </Layout>
  );
}
