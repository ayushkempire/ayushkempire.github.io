"use client";

import { useRef, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#$%&()~";

/** On hover, scrambles the text with glitch characters then resolves back. */
export default function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const raf = useRef<number>(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const progress = frame.current / 24;
      const resolved = Math.floor(progress * text.length);
      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " " || i < resolved) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      frame.current += 1;
      if (resolved < text.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <span ref={ref} onMouseEnter={scramble} className={className}>
      {text}
    </span>
  );
}
