"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useContent } from "@/components/ContentProvider";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function Projects() {
  const { projects } = useContent();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="projects" className="px-6 py-20 md:px-12 md:py-28">
      <SectionHeading index="03" title="Selected Work" endpoint="/projects" />

      <div className="border-t border-line">
        {projects.map((project) => {
          const isOpen = active === project.index;
          return (
            <Reveal key={project.index}>
              <article
                className="group border-b border-line"
                onMouseEnter={() => setActive(project.index)}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  onClick={() => setActive(isOpen ? null : project.index)}
                  className="flex w-full items-baseline gap-6 py-8 text-left md:gap-10"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-sm text-signal">{project.index}</span>
                  <h3
                    className={`flex-1 font-serif text-3xl leading-none transition-all duration-500 md:text-6xl ${
                      isOpen ? "translate-x-3 italic text-signal" : ""
                    }`}
                  >
                    {project.title}
                  </h3>
                  <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone-dim md:block">
                    {project.subtitle}
                  </span>
                  <span className="font-mono text-sm text-bone-dim">{project.year}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pl-10 md:grid-cols-12 md:pl-16">
                        <p className="max-w-2xl leading-relaxed text-bone-dim md:col-span-7">
                          {project.description}
                        </p>
                        <div className="md:col-span-5">
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="border border-line px-3 py-1 font-mono text-[11px] text-bone-dim"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="group/link mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal"
                            >
                              Visit live site
                              <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                                ↗
                              </span>
                            </a>
                          ) : (
                            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
                              <span className="size-1.5 rounded-full bg-signal" />
                              In development — private codebase
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12">
        <a
          href="https://github.com/ayushkempire"
          target="_blank"
          rel="noreferrer"
          className="link-sweep font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
        >
          Full archive on GitHub ↗
        </a>
      </Reveal>
    </section>
  );
}
