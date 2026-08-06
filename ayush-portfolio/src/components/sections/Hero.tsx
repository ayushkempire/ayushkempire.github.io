"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yName = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-10 pt-28 md:px-12"
    >
      {/* vertical grid lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-6 hidden grid-cols-4 md:mx-12 lg:grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-l border-line first:border-l-0" />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative flex items-start justify-between">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.8 }}
          className="max-w-xs font-mono text-xs leading-relaxed tracking-wide text-bone-dim"
        >
          BACKEND DEVELOPER
          <br />
          CAIR · IIT MANDI
          <br />
          <span className="text-signal">{site.coords}</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 2 }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          {site.availability}
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yName, opacity }} className="relative">
        <motion.h1 className="select-none leading-[0.9]">
          <motion.span
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.5 }}
            className="block text-[13.5vw] font-medium uppercase tracking-tight md:text-[10vw]"
          >
            Ayush
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.65 }}
            className="text-outline block text-[13.5vw] font-medium uppercase tracking-tight md:text-[10vw]"
          >
            Kapoor
            <em className="font-serif normal-case italic text-signal" style={{ WebkitTextStroke: 0 }}>
              .
            </em>
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 2 }}
          className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <p className="max-w-md text-base leading-relaxed text-bone-dim md:text-lg">
            {site.tagline}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-ink"
            >
              Resume
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="link-sweep font-mono text-xs uppercase tracking-[0.2em]">
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone-dim"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <span>© 2026</span>
      </motion.div>
    </section>
  );
}
