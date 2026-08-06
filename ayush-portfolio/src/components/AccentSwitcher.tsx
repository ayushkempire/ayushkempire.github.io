"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ACCENTS, ACCENT_EVENT, applyAccent, savedAccentIndex } from "@/lib/accents";

export default function AccentSwitcher() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const saved = savedAccentIndex();
    if (saved > 0) {
      setActive(saved);
      applyAccent(saved);
    }
    // stay in sync when the terminal's `theme` command changes the accent
    const onChange = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener(ACCENT_EVENT, onChange);
    return () => window.removeEventListener(ACCENT_EVENT, onChange);
  }, []);

  return (
    <div className="fixed bottom-6 left-4 z-[160] flex items-center gap-3 border border-line bg-ink/90 px-3 py-2 backdrop-blur sm:left-6 sm:px-4">
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim sm:inline">
        Accent
      </span>
      <div className="flex gap-2">
        {ACCENTS.map((option, i) => (
          <motion.button
            key={option.name}
            onClick={() => applyAccent(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="relative size-3.5 rounded-full"
            style={{ background: option.accent }}
            aria-label={`Switch accent to ${option.name}`}
            title={option.name}
          >
            {active === i && (
              <motion.span
                layoutId="accent-ring"
                className="absolute -inset-1 rounded-full border border-bone"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
