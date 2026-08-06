"use client";

import { motion } from "motion/react";
import { useContent } from "@/components/ContentProvider";
import { Reveal, SectionHeading } from "@/components/Reveal";

const chipList = {
  visible: { transition: { staggerChildren: 0.05 } },
  hidden: {},
};

const chip = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Skills() {
  const { skills, certifications } = useContent();
  return (
    <section id="skills" className="px-6 py-20 md:px-12 md:py-28">
      <SectionHeading index="04" title="Stack & Credentials" endpoint="/stack" />

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i % 3}>
            <h3 className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {group.group}
              <span className="h-px flex-1 bg-line" />
            </h3>
            <motion.ul
              className="flex flex-wrap gap-2"
              variants={chipList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={chip}
                  className="border border-line px-4 py-2 text-sm text-bone-dim transition-colors duration-300 hover:border-signal hover:bg-signal/10 hover:text-bone"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Certifications
        </h3>
        <ul className="divide-y divide-line border-y border-line">
          {certifications.map((cert) => (
            <li key={cert.title}>
              <a
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-6 py-4"
              >
                <span className="transition-colors duration-300 group-hover:text-signal">
                  {cert.title}
                  <span className="ml-3 text-sm text-bone-dim">{cert.issuer}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3 font-mono text-xs text-bone-dim">
                  {cert.date}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
