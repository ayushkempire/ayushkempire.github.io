"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useContent } from "@/components/ContentProvider";
import type { Content } from "@/lib/content";
import { ACCENTS, applyAccent } from "@/lib/accents";

type Line = { type: "input" | "output" | "accent"; text: string };

const BANNER: Line[] = [
  { type: "accent", text: "▄▀█ █▄▀   ayush kapoor" },
  { type: "accent", text: "█▀█ █ █   backend developer — cair, iit mandi" },
  { type: "output", text: "" },
  { type: "output", text: 'welcome to the portfolio shell. type "help" to explore.' },
];

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cd",
  "pwd",
  "stack",
  "projects",
  "experience",
  "education",
  "certs",
  "open",
  "contact",
  "socials",
  "github",
  "theme",
  "resume",
  "admin",
  "date",
  "uptime",
  "history",
  "banner",
  "echo",
  "clear",
  "exit",
];

const SECTIONS: Record<string, string> = {
  home: "#top",
  top: "#top",
  profile: "#about",
  about: "#about",
  experience: "#experience",
  projects: "#projects",
  work: "#projects",
  stack: "#skills",
  skills: "#skills",
  contact: "#contact",
};

function out(text: string): Line {
  return { type: "output", text };
}

export default function Terminal() {
  const content = useContent();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyIndex = useRef(-1);
  const bootTime = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bootTime.current = Date.now();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !(e.target as HTMLElement).closest("input, textarea")) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, lines]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  async function run(raw: string): Promise<Line[]> {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    const { site, skills, projects, experience, education, certifications } = content;

    switch (cmd?.toLowerCase()) {
      case "help":
        return [
          out("navigation:"),
          out("  ls              — list site sections"),
          out("  cd <section>    — scroll to a section (e.g. cd projects)"),
          out("  pwd             — where am I"),
          out(""),
          out("about ayush:"),
          out("  whoami          — who is this guy"),
          out("  experience      — current role"),
          out("  education       — degrees & CGPAs"),
          out("  stack           — tech I work with"),
          out("  projects        — selected work"),
          out("  certs           — certifications"),
          out("  github          — live stats from the GitHub API"),
          out(""),
          out("actions:"),
          out("  open <project>  — open a project's live site"),
          out("  resume          — open resume pdf"),
          out("  contact         — email & phone"),
          out("  socials         — where to find me"),
          out(`  theme <name>    — restyle the site (${ACCENTS.map((a) => a.name.toLowerCase()).join(" | ")})`),
          out(""),
          out("misc: date · uptime · history · banner · echo · clear · exit"),
          out("tips: ↑↓ history · tab autocomplete · ` toggles me"),
        ];
      case "ls":
        return [
          out("drwxr-xr-x  01  /profile"),
          out("drwxr-xr-x  02  /experience"),
          out("drwxr-xr-x  03  /projects"),
          out("drwxr-xr-x  04  /stack"),
          out("drwxr-xr-x  05  /contact"),
          out(""),
          out('jump with: cd <section>'),
        ];
      case "cd": {
        if (!arg) return [out("usage: cd <section> — try ls")];
        const target = SECTIONS[arg.replace(/^\//, "")];
        if (!target) return [out(`no such section: ${arg} — try ls`)];
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        return [{ type: "accent", text: `→ ${target.replace("#", "/")}` }];
      }
      case "pwd":
        return [out("~/portfolio  (ayushkapoor.in)")];
      case "experience":
        return experience.flatMap((job) => [
          { type: "accent" as const, text: `${job.role} @ ${job.company}` },
          out(`  ${job.period} · ${job.location}`),
          out(`  stack: ${job.stack.join(", ")}`),
        ]);
      case "education":
        return education.flatMap((entry) => [
          { type: "accent" as const, text: entry.school },
          out(`  ${entry.degree} · ${entry.detail} · ${entry.period}`),
        ]);
      case "certs":
        return certifications.map((cert) =>
          out(`  [${cert.date}] ${cert.title} — ${cert.issuer}`)
        );
      case "admin":
        window.open("/admin", "_blank");
        return [out("opening admin console → (password required)")];
      case "date":
        return [
          out(
            new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "medium",
            }) + " IST"
          ),
        ];
      case "uptime": {
        const seconds = Math.floor((Date.now() - bootTime.current) / 1000);
        const mins = Math.floor(seconds / 60);
        return [out(`this session: ${mins}m ${seconds % 60}s — thanks for sticking around`)];
      }
      case "history":
        return history.length
          ? [...history].reverse().map((entry, i) => out(`  ${i + 1}  ${entry}`))
          : [out("no history yet")];
      case "banner":
        return BANNER;
      case "whoami":
        return [
          out(`${site.name} — ${site.role} @ CAIR, IIT Mandi.`),
          out("Builds multi-tenant platforms, auth systems & APIs."),
          out("Runs on Node.js, TypeScript and mountain air."),
        ];
      case "stack":
        return skills.map((group) => out(`  ${group.group}: ${group.items.join(", ")}`));
      case "projects":
        return [
          ...projects.map((p) =>
            out(`  [${p.year}] ${p.title} — ${p.subtitle}${p.link ? "  ↗" : ""}`)
          ),
          out(""),
          out('open one with: open <name>, e.g. "open adhyay"'),
        ];
      case "open": {
        if (!arg) return [out("usage: open <project name>")];
        const match = projects.find((p) => p.title.toLowerCase().includes(arg));
        if (!match) return [out(`no project matching "${arg}"`)];
        if (!match.link) return [out(`${match.title} has no public link (yet).`)];
        window.open(match.link, "_blank");
        return [out(`opening ${match.title} → ${match.link}`)];
      }
      case "contact":
        return [out(`  email: ${site.email}`), out(`  phone: ${site.phone}`)];
      case "socials":
        return content.site.socials.map((s) => out(`  ${s.label.toLowerCase().padEnd(10)} ${s.href}`));
      case "github": {
        const res = await fetch("/api/github").catch(() => null);
        if (!res?.ok) return [out("github api unreachable — try again later")];
        const stats = await res.json();
        return [
          out(`  public repos : ${stats.repos}`),
          out(`  total stars  : ${stats.stars}`),
          out(`  followers    : ${stats.followers}`),
          out(`  most used    : ${stats.topLanguages.join(", ")}`),
          out("  (fetched live, cached 1h)"),
        ];
      }
      case "theme": {
        const index = ACCENTS.findIndex((a) => a.name.toLowerCase() === arg);
        if (index === -1)
          return [out(`usage: theme <${ACCENTS.map((a) => a.name.toLowerCase()).join(" | ")}>`)];
        applyAccent(index);
        return [{ type: "accent", text: `theme set to ${arg} ✦` }];
      }
      case "resume":
        window.open(site.resume, "_blank");
        return [out("opening resume.pdf →")];
      case "echo":
        return [out(args.join(" "))];
      case "sudo":
        return [out("nice try. permission denied ;)")];
      case "":
      case undefined:
        return [];
      default:
        return [out(`command not found: ${cmd} — try "help"`)];
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const raw = value.trim();
    const cmd = raw.toLowerCase();
    setValue("");
    historyIndex.current = -1;
    if (raw) setHistory((prev) => [raw, ...prev.slice(0, 49)]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setOpen(false);
      return;
    }

    setLines((prev) => [...prev, { type: "input", text: raw }]);
    const output = await run(raw);
    setLines((prev) => [...prev, ...output]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex.current < history.length - 1) {
        historyIndex.current += 1;
        setValue(history[historyIndex.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex.current > 0) {
        historyIndex.current -= 1;
        setValue(history[historyIndex.current]);
      } else {
        historyIndex.current = -1;
        setValue("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = value.toLowerCase();
      if (!partial) return;
      const match = COMMANDS.find((c) => c.startsWith(partial));
      if (match) setValue(match + (match === "open" || match === "theme" || match === "cd" ? " " : ""));
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 z-[160] border border-line bg-ink/90 px-3 py-2 sm:right-6 sm:px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim backdrop-blur transition-colors duration-300 hover:border-signal hover:text-signal"
        aria-label="Toggle terminal"
      >
        ~/terminal
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-6 z-[160] flex h-[26rem] max-h-[70vh] w-[calc(100vw-3rem)] max-w-xl flex-col border border-line bg-ink/95 shadow-2xl shadow-black/60 backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
                ayush@portfolio<span className="text-signal">:~</span> — zsh
              </span>
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-bone-dim/30" />
                <span className="size-2.5 rounded-full bg-bone-dim/30" />
                <button
                  onClick={() => setOpen(false)}
                  className="size-2.5 rounded-full bg-signal transition-transform hover:scale-125"
                  aria-label="Close terminal"
                />
              </div>
            </div>
            <div
              ref={bodyRef}
              className="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) =>
                line.type === "input" ? (
                  <p key={i} className="text-bone">
                    <span className="text-signal">❯</span> {line.text}
                  </p>
                ) : line.type === "accent" ? (
                  <p key={i} className="whitespace-pre-wrap text-signal">
                    {line.text}
                  </p>
                ) : (
                  <p key={i} className="whitespace-pre-wrap text-bone-dim">
                    {line.text}
                  </p>
                )
              )}
              <form onSubmit={submit} className="flex items-center gap-2">
                <span className="text-signal">❯</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent font-mono text-xs text-bone"
                  style={{ caretColor: "var(--accent)" }}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
