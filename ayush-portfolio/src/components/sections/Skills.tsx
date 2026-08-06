"use client";

import { skills, certifications } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading index="04" title="Stack & Credentials" />

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i % 3}>
            <h3 className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {group.group}
              <span className="h-px flex-1 bg-line" />
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-line px-4 py-2 text-sm text-bone-dim transition-colors duration-300 hover:border-signal hover:text-bone"
                >
                  {item}
                </li>
              ))}
            </ul>
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
