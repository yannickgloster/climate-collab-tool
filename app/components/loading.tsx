import { motion } from "framer-motion";
import Layout from "./layout";
import LoopIcon from "@mui/icons-material/Loop";

export default function Loading() {
  return (
    <Layout>
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <LoopIcon fontSize="large" />
      </motion.div>
    </Layout>
  );
}
