"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { site } from "@/lib/data";

const links = [
  { label: "Profile", href: "#about", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Stack", href: "#skills", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 200 && !open);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 mix-blend-difference md:px-12"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="font-mono text-sm uppercase tracking-[0.25em]">
          AK<span className="text-signal">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-sweep font-mono text-xs uppercase tracking-[0.2em]"
            >
              <span className="mr-1 text-signal">{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="font-mono text-xs uppercase tracking-[0.2em] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center gap-2 bg-ink px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 font-serif text-5xl italic"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <span className="mr-4 font-mono text-sm not-italic text-signal">
                  {link.index}
                </span>
                {link.label}
              </motion.a>
            ))}
            <div className="mt-10 flex gap-6">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
