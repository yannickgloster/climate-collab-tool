import Layout from "./layout";
import Typography from "@mui/material/Typography";
import { default as NextLink } from "next/link";
import Link from "@mui/material/Link";
import { Trans } from "@lingui/macro";

interface loadingErrorProps {
  href: string;
}

// TODO: add force rerender by having an element that is passed up the tree
export default function LoadingError({ href }: loadingErrorProps) {
  return (
    <Layout>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        <Trans>Data could not be loaded</Trans>
      </Typography>
      <Typography variant="body2" textAlign="center">
        <Link component={NextLink} href={href}>
          <Trans>Try load it again.</Trans>
        </Link>
      </Typography>
    </Layout>
  );
}
