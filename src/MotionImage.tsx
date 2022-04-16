import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const MotionImage = chakra(motion.img, {
  shouldForwardProp: () => true,
});

export default MotionImage;
