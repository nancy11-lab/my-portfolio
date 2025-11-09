import { motion } from "framer-motion";

function AnimatedCard({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1, // كل كارت يتأخر 0.1 ثانية عن اللي قبله
      }}
      style={{ display: "flex", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;
