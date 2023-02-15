import Layout from "./layout";
import Typography from "@mui/material/Typography";
import { default as NextLink } from "next/link";
import Link from "@mui/material/Link";

interface loadingErrorProps {
  href: string;
}

// TODO: add force rerender by having an element that is passed up the tree
export default function LoadingError({ href }: loadingErrorProps) {
  return (
    <Layout>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Data could not be loaded
      </Typography>
      <Typography variant="body2" textAlign="center">
        <Link component={NextLink} href={href}>
          Try load it again.
        </Link>
      </Typography>
    </Layout>
  );
}
