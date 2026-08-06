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
    // failsafe: rAF freezes in background tabs — never leave the preloader stuck
    const failsafe = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, 3000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[400] flex flex-col justify-between bg-ink p-6 md:p-12"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone-dim">
            <span>Portfolio</span>
            <span className="hidden items-center gap-2 sm:flex">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block size-1.5 rounded-full bg-signal"
              />
              Loading
            </span>
            <span>© 2026</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="font-serif text-3xl italic md:text-5xl"
              >
                Ayush Kapoor<span className="text-signal">.</span>
              </motion.p>
            </div>
            <p className="font-serif text-6xl italic leading-none tabular-nums sm:text-7xl md:text-9xl">
              {count}
              <span className="text-signal">%</span>
            </p>
          </div>

          {/* progress bar */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 bg-signal transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
