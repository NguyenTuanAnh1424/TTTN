import { useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const CountingStat = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  
  // Ignore "24/7" as per user request
  const isExcluded = value === "24/7" || label.includes("Hỗ trợ xuyên suốt");
  
  // Extract number and suffix (e.g. "97+" -> 97, "+")
  const numMatch = value.match(/^(\d+)(.*)/);
  const isNumber = !isExcluded && numMatch !== null;
  const targetNumber = isNumber ? parseInt(numMatch[1], 10) : 0;
  const suffix = isNumber ? numMatch[2] : "";

  const [displayValue, setDisplayValue] = useState(isNumber ? `0${suffix}` : value);
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView && isNumber) {
      const controls = animate(count, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(`${Math.floor(latest)}${suffix}`);
        }
      });
      return controls.stop;
    }
  }, [isInView, isNumber, targetNumber, suffix, count]);

  return (
    <div ref={ref} className="bg-[#eef8f2] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 border border-[#eef8f2] hover:border-[#115b40]/20">
      <span className="text-4xl font-bold text-[#115b40] mb-3">{displayValue}</span>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
};
