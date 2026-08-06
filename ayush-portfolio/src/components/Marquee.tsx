"use client";

import { motion, useScroll, useVelocity, useSpring, useTransform } from "motion/react";

const items = [
  "Backend Engineering",
  "Full-stack Systems",
  "REST APIs",
  "PostgreSQL",
  "Next.js",
  "TypeScript",
  "AI Integration",
];

export default function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 100, damping: 30 });
  const skewX = useTransform(smooth, [-2000, 2000], [8, -8], { clamp: true });

  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-5">
      <motion.div style={{ skewX }} className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif text-2xl italic md:text-3xl">{item}</span>
            <span className="text-signal">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
