import { motion } from "framer-motion";
import { ChevronDown } from "react-feather";

const ScrollIndicator = ({ targetId }) => {
  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <motion.div
      className="flex justify-center mt-12 cursor-pointer"
      onClick={scrollTo}
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <ChevronDown size={40} className="text-teal-400" />
    </motion.div>
  );
};

export default ScrollIndicator;