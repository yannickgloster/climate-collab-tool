import Layout from "../../components/layout";
import Map from "../../components/map";
import Box from "@mui/material/Box";

export default function LoadingTest() {
  return (
    <Layout>
      <Box width={500} border="1px dashed grey">
        <Map />
      </Box>
    </Layout>
  );
}
