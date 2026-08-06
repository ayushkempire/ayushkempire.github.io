"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border-b border-line bg-transparent py-4 text-lg placeholder:text-bone-dim/50 focus:border-signal transition-colors duration-300";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading index="05" title="Contact" />

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h3 className="font-serif text-4xl leading-tight md:text-6xl">
              Let&apos;s build
              <br />
              <em className="text-signal">something.</em>
            </h3>
            <p className="mt-6 max-w-sm leading-relaxed text-bone-dim">
              Have a project in mind, a role to fill, or just want to talk systems
              architecture? My inbox is open.
            </p>
            <div className="mt-10 space-y-3 font-mono text-sm">
              <a href={`mailto:${site.email}`} className="link-sweep block w-fit">
                {site.email}
              </a>
              <a href={`tel:${site.phone}`} className="link-sweep block w-fit text-bone-dim">
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            {status === "sent" ? (
              <div className="border border-signal p-10 text-center">
                <p className="font-serif text-3xl italic">Message received.</p>
                <p className="mt-3 text-bone-dim">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid gap-x-8 md:grid-cols-2">
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    maxLength={200}
                    className={inputClass}
                  />
                </div>
                <input
                  name="subject"
                  placeholder="Subject"
                  required
                  maxLength={200}
                  className={inputClass}
                />
                <textarea
                  name="message"
                  placeholder="Tell me about it…"
                  required
                  rows={5}
                  maxLength={5000}
                  className={`${inputClass} resize-none`}
                />
                <div className="flex items-center justify-between pt-8">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-ink disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-signal">
                      {error}{" "}
                      <a href={`mailto:${site.email}`} className="underline">
                        Email me directly
                      </a>
                    </p>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
