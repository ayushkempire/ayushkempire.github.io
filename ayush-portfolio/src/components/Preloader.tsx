"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-end justify-between bg-ink p-8 md:p-14"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-bone-dim">
            Ayush Kapoor
            <span className="mx-3 text-signal">/</span>
            Portfolio
          </div>
          <div className="font-serif text-7xl italic leading-none md:text-9xl">
            {count}
            <span className="text-signal">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
