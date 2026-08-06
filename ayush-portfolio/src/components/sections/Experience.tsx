"use client";

import { experience } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading index="02" title="Experience" />

      <div className="space-y-24">
        {experience.map((job) => (
          <div key={job.company} className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                    {job.period}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl italic leading-tight md:text-4xl">
                    {job.role}
                  </h3>
                  <p className="mt-3 text-lg text-bone-dim">{job.company}</p>
                  <p className="mt-1 font-mono text-xs text-bone-dim">{job.location}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line px-3 py-1 font-mono text-[11px] text-bone-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <ul className="space-y-0 divide-y divide-line border-y border-line lg:col-span-7">
              {job.points.map((point, i) => (
                <Reveal key={i} delay={i}>
                  <li className="group flex gap-6 py-5">
                    <span className="font-mono text-xs text-signal transition-transform duration-300 group-hover:translate-x-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-bone-dim transition-colors duration-300 group-hover:text-bone">
                      {point}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
