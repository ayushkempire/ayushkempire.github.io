"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

export default function Footer() {
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
    <footer className="border-t border-line px-6 py-10 md:px-12">
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
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim md:flex-row md:justify-between">
        <span>© 2026 Ayush Kapoor — All rights reserved</span>
        <span>Designed & built from scratch with Next.js + TypeScript</span>
      </div>
    </footer>
  );
}
