"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";

const inputClass =
  "w-full border border-line bg-ink-raised px-3 py-2 text-sm text-bone placeholder:text-bone-dim/60 focus:border-signal transition-colors";
const labelClass = "mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim";
const buttonClass =
  "border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-signal hover:text-signal";
const removeClass = "font-mono text-[10px] uppercase tracking-widest text-bone-dim hover:text-signal";

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border border-line" open={false}>
      <summary className="cursor-pointer select-none px-5 py-4 font-serif text-xl italic transition-colors hover:text-signal">
        {title}
        <span className="float-right font-mono text-xs not-italic text-bone-dim transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="space-y-4 border-t border-line p-5">{children}</div>
    </details>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setContent(data))
      .finally(() => setChecked(true));
  }, []);

  // deep-clone current content, mutate it, and set it back
  function edit(mutate: (draft: Content) => void) {
    setContent((current) => {
      if (!current) return current;
      const draft = structuredClone(current);
      mutate(draft);
      return draft;
    });
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Login failed.");
      return;
    }
    const contentRes = await fetch("/api/admin/content");
    setContent(await contentRes.json());
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json();
    setSaving(false);
    setMessage(res.ok ? "Saved — the live site is updated." : data.error ?? "Save failed.");
  }

  if (!checked) {
    return (
      <div className="flex min-h-svh items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-bone-dim">
        Loading…
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-svh items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-sm space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
              Restricted area
            </p>
            <h1 className="mt-2 font-mono text-3xl lowercase tracking-tight">ayushkempire<span className="text-signal">_</span></h1>
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoFocus
            />
          </div>
          <button type="submit" className={buttonClass}>
            Sign in →
          </button>
          {message && <p className="text-sm text-signal">{message}</p>}
        </form>
      </div>
    );
  }

  const { site, about, experience, education, projects, skills, certifications } = content;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            Content editor · no database, just content.json
          </p>
          <h1 className="mt-2 font-mono text-3xl lowercase tracking-tight">ayushkempire<span className="text-signal">_</span></h1>
        </div>
        <a href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-signal">
          View site ↗
        </a>
      </header>

      <div className="space-y-4">
        <Section title="Site & Socials">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={site.name} onChange={(v) => edit((d) => void (d.site.name = v))} />
            <Field label="Role" value={site.role} onChange={(v) => edit((d) => void (d.site.role = v))} />
            <Field label="Email" value={site.email} onChange={(v) => edit((d) => void (d.site.email = v))} />
            <Field label="Phone" value={site.phone} onChange={(v) => edit((d) => void (d.site.phone = v))} />
            <Field label="Location" value={site.location} onChange={(v) => edit((d) => void (d.site.location = v))} />
            <Field label="Availability" value={site.availability} onChange={(v) => edit((d) => void (d.site.availability = v))} />
          </div>
          <Area label="Tagline" value={site.tagline} onChange={(v) => edit((d) => void (d.site.tagline = v))} rows={2} />
          {site.socials.map((social, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="w-32">
                <Field label="Social" value={social.label} onChange={(v) => edit((d) => void (d.site.socials[i].label = v))} />
              </div>
              <div className="flex-1">
                <Field label="URL" value={social.href} onChange={(v) => edit((d) => void (d.site.socials[i].href = v))} />
              </div>
              <button className={removeClass} onClick={() => edit((d) => void d.site.socials.splice(i, 1))}>
                ✕
              </button>
            </div>
          ))}
          <button className={buttonClass} onClick={() => edit((d) => void d.site.socials.push({ label: "New", href: "https://" }))}>
            + Add social
          </button>
        </Section>

        <Section title="About">
          <Area label="Intro (large serif paragraph)" value={about.intro} onChange={(v) => edit((d) => void (d.about.intro = v))} />
          <Area
            label="Body (one paragraph per line)"
            value={about.body.join("\n")}
            onChange={(v) => edit((d) => void (d.about.body = v.split("\n").filter(Boolean)))}
            rows={5}
          />
          {about.facts.map((fact, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="w-40">
                <Field label="Label" value={fact.label} onChange={(v) => edit((d) => void (d.about.facts[i].label = v))} />
              </div>
              <div className="flex-1">
                <Field label="Value" value={fact.value} onChange={(v) => edit((d) => void (d.about.facts[i].value = v))} />
              </div>
              <button className={removeClass} onClick={() => edit((d) => void d.about.facts.splice(i, 1))}>
                ✕
              </button>
            </div>
          ))}
          <button className={buttonClass} onClick={() => edit((d) => void d.about.facts.push({ label: "Label", value: "Value" }))}>
            + Add fact
          </button>
        </Section>

        <Section title="Experience">
          {experience.map((job, i) => (
            <div key={i} className="space-y-4 border border-line p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company" value={job.company} onChange={(v) => edit((d) => void (d.experience[i].company = v))} />
                <Field label="Role" value={job.role} onChange={(v) => edit((d) => void (d.experience[i].role = v))} />
                <Field label="Period" value={job.period} onChange={(v) => edit((d) => void (d.experience[i].period = v))} />
                <Field label="Location" value={job.location} onChange={(v) => edit((d) => void (d.experience[i].location = v))} />
              </div>
              <Field
                label="Stack (comma separated)"
                value={job.stack.join(", ")}
                onChange={(v) => edit((d) => void (d.experience[i].stack = v.split(",").map((s) => s.trim()).filter(Boolean)))}
              />
              <Area
                label="Highlights (one per line)"
                value={job.points.join("\n")}
                onChange={(v) => edit((d) => void (d.experience[i].points = v.split("\n").filter(Boolean)))}
                rows={6}
              />
              <button className={removeClass} onClick={() => edit((d) => void d.experience.splice(i, 1))}>
                ✕ Remove position
              </button>
            </div>
          ))}
          <button
            className={buttonClass}
            onClick={() =>
              edit((d) =>
                void d.experience.push({
                  company: "Company",
                  shortCompany: "Company",
                  role: "Role",
                  period: "2026 — Present",
                  location: "Location",
                  stack: [],
                  points: [],
                })
              )
            }
          >
            + Add position
          </button>
        </Section>

        <Section title="Education">
          {education.map((entry, i) => (
            <div key={i} className="space-y-4 border border-line p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="School" value={entry.school} onChange={(v) => edit((d) => void (d.education[i].school = v))} />
                <Field label="Degree" value={entry.degree} onChange={(v) => edit((d) => void (d.education[i].degree = v))} />
                <Field label="Detail" value={entry.detail} onChange={(v) => edit((d) => void (d.education[i].detail = v))} />
                <Field label="Period" value={entry.period} onChange={(v) => edit((d) => void (d.education[i].period = v))} />
              </div>
              <button className={removeClass} onClick={() => edit((d) => void d.education.splice(i, 1))}>
                ✕ Remove
              </button>
            </div>
          ))}
          <button
            className={buttonClass}
            onClick={() => edit((d) => void d.education.push({ school: "School", degree: "Degree", detail: "", period: "" }))}
          >
            + Add education
          </button>
        </Section>

        <Section title="Projects">
          {projects.map((project, i) => (
            <div key={i} className="space-y-4 border border-line p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={project.title} onChange={(v) => edit((d) => void (d.projects[i].title = v))} />
                <Field label="Subtitle" value={project.subtitle} onChange={(v) => edit((d) => void (d.projects[i].subtitle = v))} />
                <Field label="Year" value={project.year} onChange={(v) => edit((d) => void (d.projects[i].year = v))} />
                <Field label="Live link (blank = none)" value={project.link ?? ""} onChange={(v) => edit((d) => void (d.projects[i].link = v || null))} />
              </div>
              <Area label="Description" value={project.description} onChange={(v) => edit((d) => void (d.projects[i].description = v))} />
              <Field
                label="Stack (comma separated)"
                value={project.stack.join(", ")}
                onChange={(v) => edit((d) => void (d.projects[i].stack = v.split(",").map((s) => s.trim()).filter(Boolean)))}
              />
              <button className={removeClass} onClick={() => edit((d) => { d.projects.splice(i, 1); d.projects.forEach((p, j) => (p.index = String(j + 1).padStart(2, "0"))); })}>
                ✕ Remove project
              </button>
            </div>
          ))}
          <button
            className={buttonClass}
            onClick={() =>
              edit((d) =>
                void d.projects.push({
                  index: String(d.projects.length + 1).padStart(2, "0"),
                  title: "New Project",
                  subtitle: "Subtitle",
                  description: "",
                  stack: [],
                  year: "2026",
                  link: null,
                })
              )
            }
          >
            + Add project
          </button>
        </Section>

        <Section title="Skills">
          {skills.map((group, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="w-40">
                <Field label="Group" value={group.group} onChange={(v) => edit((d) => void (d.skills[i].group = v))} />
              </div>
              <div className="flex-1">
                <Field
                  label="Items (comma separated)"
                  value={group.items.join(", ")}
                  onChange={(v) => edit((d) => void (d.skills[i].items = v.split(",").map((s) => s.trim()).filter(Boolean)))}
                />
              </div>
              <button className={removeClass} onClick={() => edit((d) => void d.skills.splice(i, 1))}>
                ✕
              </button>
            </div>
          ))}
          <button className={buttonClass} onClick={() => edit((d) => void d.skills.push({ group: "New group", items: [] }))}>
            + Add group
          </button>
        </Section>

        <Section title="Certifications">
          {certifications.map((cert, i) => (
            <div key={i} className="space-y-4 border border-line p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={cert.title} onChange={(v) => edit((d) => void (d.certifications[i].title = v))} />
                <Field label="Issuer" value={cert.issuer} onChange={(v) => edit((d) => void (d.certifications[i].issuer = v))} />
                <Field label="Date" value={cert.date} onChange={(v) => edit((d) => void (d.certifications[i].date = v))} />
                <Field label="Certificate URL" value={cert.href} onChange={(v) => edit((d) => void (d.certifications[i].href = v))} />
              </div>
              <button className={removeClass} onClick={() => edit((d) => void d.certifications.splice(i, 1))}>
                ✕ Remove
              </button>
            </div>
          ))}
          <button
            className={buttonClass}
            onClick={() => edit((d) => void d.certifications.push({ title: "Certification", issuer: "", date: "", href: "https://" }))}
          >
            + Add certification
          </button>
        </Section>
      </div>

      <div className="sticky bottom-0 mt-10 flex items-center justify-between gap-4 border-t border-line bg-ink py-4">
        <button
          onClick={save}
          disabled={saving}
          className="border border-signal bg-signal px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {message && <p className="text-sm text-bone-dim">{message}</p>}
        <button
          className={removeClass}
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            setContent(null);
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
