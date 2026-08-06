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

/** Section heading with index number — e.g. "01 / Profile" */
export function SectionHeading({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`mb-14 flex items-baseline gap-4 md:mb-20 ${className}`}>
      <span className="font-mono text-sm text-signal">{index}</span>
      <h2 className="font-serif text-4xl italic md:text-6xl">{title}</h2>
      <span className="hidden h-px flex-1 self-center bg-line md:block" />
    </Reveal>
  );
}
