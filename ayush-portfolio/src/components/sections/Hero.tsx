"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import Magnetic from "@/components/Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Word split into letters that cascade up one-by-one on load, then drift in a
 * perpetual staggered wave. Three layers: entrance → infinite wave → hover.
 */
function Letters({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <>
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "115%", rotate: 9, opacity: 0 }}
          animate={{ y: "0%", rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: startDelay + i * 0.055 }}
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: startDelay + 1.2 + i * 0.14,
            }}
          >
            <span className="hero-letter">{letter}</span>
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const { site } = useContent();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yName = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)`;

  // normalized cursor position (-0.5..0.5) drives the portrait's 3D tilt
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const tiltY = useSpring(useTransform(normX, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const tiltX = useSpring(useTransform(normY, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        normX.set((e.clientX - rect.left) / rect.width - 0.5);
        normY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-10 pt-28 md:px-12"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      {/* vertical grid lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-6 hidden grid-cols-4 md:mx-12 lg:grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-l border-line first:border-l-0" />
        ))}
      </div>

      {/* portrait — fades into the ink, tilts in 3D toward the cursor */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease, delay: 1.9 }}
        style={{ y: yName, perspective: 1000 }}
        className="pointer-events-none absolute bottom-0 right-[8vw] hidden h-[85svh] w-auto select-none md:block"
      >
        <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="h-full w-auto">
          <Image
            src="/images/portrait-hero.png"
            alt=""
            width={1350}
            height={1333}
            priority
            className="h-full w-auto object-contain grayscale contrast-110 opacity-90"
            style={{
              maskImage: "linear-gradient(205deg, black 55%, transparent 88%)",
              WebkitMaskImage: "linear-gradient(205deg, black 55%, transparent 88%)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.8 }}
          className="max-w-xs font-mono text-xs leading-relaxed tracking-wide text-bone-dim"
        >
          BACKEND DEVELOPER
          <br />
          CAIR · IIT MANDI
          <br />
          <span className="text-signal">{site.coords}</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 2 }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          {site.availability}
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yName, opacity }} className="relative">
        <motion.h1 className="leading-[0.9]">
          <span className="-mt-[0.18em] block overflow-hidden pb-[0.05em] pt-[0.18em] text-[13.5vw] font-medium uppercase tracking-tight md:text-[10vw]">
            <Letters text="Ayush" startDelay={1.5} />
          </span>
          <span className="text-outline -mt-[0.18em] block overflow-hidden pb-[0.05em] pt-[0.18em] text-[13.5vw] font-medium uppercase tracking-tight md:text-[10vw]">
            <Letters text="Kapoor" startDelay={1.75} />
            <motion.em
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 12, delay: 2.3 }}
              className="inline-block font-serif normal-case italic text-signal"
              style={{ WebkitTextStroke: 0 }}
            >
              .
            </motion.em>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 2 }}
          className="mt-8 max-w-xl"
        >
          <p className="max-w-md text-base leading-relaxed text-bone-dim md:text-xl">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Magnetic>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-signal px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:shadow-[0_0_32px_-4px_var(--accent)]"
              >
                View Resume
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-bone/40 bg-ink/60 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone backdrop-blur transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                Get in touch
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone-dim"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <span>© 2026</span>
      </motion.div>
    </section>
  );
}
