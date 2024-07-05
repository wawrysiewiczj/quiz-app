import React from "react";
import { motion as m } from "framer-motion";

const Animation = ({ children }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
};

export default Animation;
