"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/ContentProvider";

export default function Footer() {
  const { site } = useContent();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-line px-6 pb-28 pt-10 md:px-12 md:pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl italic">
            Ayush Kapoor<span className="text-signal">.</span>
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
            {site.location}
            {time && (
              <>
                <span className="mx-3 text-signal">/</span>
                IST {time}
              </>
            )}
          </p>
        </div>
        <nav className="flex flex-wrap gap-6">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="link-sweep font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
            >
              {social.label}
            </a>
          ))}
        </nav>
        <a
          href="#top"
          className="group inline-flex w-fit items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim transition-colors duration-300 hover:border-signal hover:text-signal"
          aria-label="Back to top"
        >
          Top
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim md:flex-row md:justify-between">
        <span>© 2026 Ayush Kapoor — All rights reserved</span>
        <span>Crafted in the Himalayas — fueled by chai, guitar riffs & mountain air</span>
      </div>
    </footer>
  );
}
