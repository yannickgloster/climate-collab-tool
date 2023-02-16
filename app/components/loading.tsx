import { motion } from "framer-motion";
import Layout from "./layout";
import LoopIcon from "@mui/icons-material/Loop";

export default function Loading() {
  return (
    <Layout>
      <LoopIcon
        component={motion.svg}
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
        fontSize="large"
      />
    </Layout>
  );
}
