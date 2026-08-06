"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useContent } from "@/components/ContentProvider";
import { Reveal, SectionHeading } from "@/components/Reveal";

type GithubStats = {
  repos: number;
  followers: number;
  stars: number;
  topLanguages: string[];
};

/** Counts up from 0 when scrolled into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

export default function About() {
  const { about, education } = useContent();
  const [stats, setStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => null);
  }, []);

  return (
    <section id="about" className="px-6 py-20 md:px-12 md:py-28">
      <SectionHeading index="01" title="Profile" endpoint="/profile" />

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-serif text-2xl leading-snug md:text-4xl">
              {about.intro}
            </p>
          </Reveal>
          <div className="mt-10 max-w-xl space-y-6 text-bone-dim leading-relaxed">
            {about.body.map((paragraph, i) => (
              <Reveal key={i} delay={i + 1}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-12">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              Off duty
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Guitar", "Music discovery", "Mountain hiking", "Design & creativity"].map(
                (interest) => (
                  <span
                    key={interest}
                    className="border border-line px-4 py-2 text-sm text-bone-dim transition-colors duration-300 hover:border-signal hover:text-bone"
                  >
                    {interest}
                  </span>
                )
              )}
            </div>
            <blockquote className="mt-10 max-w-md border-l-2 border-signal pl-6 font-serif text-2xl italic leading-snug">
              Ship it clean, scale it right — then take the scenic route home.
            </blockquote>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={2}>
            <dl className="divide-y divide-line border-y border-line">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={3} className="mt-12">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.school} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-medium">{edu.school}</p>
                    <p className="text-sm text-bone-dim">
                      {edu.degree} · {edu.detail}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-bone-dim">{edu.period}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {stats && (
            <Reveal delay={1} className="mt-12">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
                Live from GitHub
              </h3>
              <div className="grid grid-cols-3 divide-x divide-line border border-line">
                {[
                  { label: "Repos", value: stats.repos },
                  { label: "Stars", value: stats.stars },
                  { label: "Followers", value: stats.followers },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 text-center transition-colors duration-300 hover:bg-signal/10"
                  >
                    <p className="font-serif text-3xl italic">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {stats.topLanguages.length > 0 && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                  Most used: {stats.topLanguages.join(" · ")}
                </p>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
