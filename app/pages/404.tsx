import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import { default as NextLink } from "next/link";
import Link from "@mui/material/Link";
import Image from "next/image";
import Image404 from "../public/images/emile-seguin-R9OueKOtGGU-unsplash.jpg";

export default function Custom404() {
  return (
    <Layout>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Page Not Found
      </Typography>
      <Typography variant="body1" textAlign="center">
        You're looking a little lost.
      </Typography>
      <Typography variant="body2" textAlign="center">
        <Link component={NextLink} href="/">
          Return Home
        </Link>
      </Typography>
    </Layout>
  );
}
