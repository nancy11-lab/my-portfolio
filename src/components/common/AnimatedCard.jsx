// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// function AnimatedCard({ children, id }) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hasBeenVisible, setHasBeenVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const { isIntersecting, boundingClientRect } = entry;

//           if (isIntersecting && boundingClientRect.y > 0) {
//             //  داخل الشاشة من الأسفل → أظهر الكارت
//             setIsVisible(true);
//             setHasBeenVisible(true);
//           } else if (!isIntersecting && boundingClientRect.y < 0) {
//             //  خرج من الشاشة من الأعلى → خفيه
//             setIsVisible(false);
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <motion.div
//       ref={ref}
//       data-id={id}
//       initial={{ opacity: 0, y: 50 }}
//       animate={
//         isVisible
//           ? { opacity: 1, y: 0 } // 👇 يظهر بحركة
//           : hasBeenVisible
//           ? { opacity: 1, y: 0 } // 👇 يفضل ظاهر لما أطلع فوق
//           : { opacity: 0, y: 50 } // 👇 أول مرة قبل ما يظهر
//       }
//       transition={{ duration: 0.6 }}
//       // style={{ display: "flex", justifyContent: "center" }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export default AnimatedCard;

// AnimatedCard.jsx
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
