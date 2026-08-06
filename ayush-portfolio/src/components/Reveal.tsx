"use client";

import { motion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.08 },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Text slides up out of an overflow-hidden mask when scrolled into view. */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.12em] align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Section heading with index number and API-endpoint readout — e.g. "01 / Profile · GET /profile 200 OK" */
export function SectionHeading({
  index,
  title,
  endpoint,
  className = "",
}: {
  index: string;
  title: string;
  endpoint?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      {endpoint && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim"
        >
          <span className="text-signal">GET</span> {endpoint}
          <span className="ml-3 text-green-500/80">200 OK</span>
        </motion.p>
      )}
      <div className="flex items-baseline gap-4">
        <MaskReveal>
          <span className="flex items-baseline gap-4">
            <span className="font-mono text-sm not-italic text-signal">{index}</span>
            <h2 className="font-serif text-4xl italic md:text-6xl">{title}</h2>
          </span>
        </MaskReveal>
        <motion.span
          className="hidden h-px flex-1 origin-left self-center bg-line md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
