import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

// naive in-memory rate limit: 5 requests per IP per 10 minutes
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please fill in all fields correctly." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO ?? "ayushkempire@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  try {
    if (apiKey) {
      const resend = new Resend(apiKey);
      const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      if (error) throw new Error(error.message);

      // auto-confirmation to the visitor — best-effort, never fails the request
      await resend.emails
        .send({
          from,
          to: email,
          replyTo: to,
          subject: "Thanks for reaching out — Ayush Kapoor",
          text: [
            `Hi ${name},`,
            "",
            "Thanks for your message — it landed safely in my inbox.",
            "I usually reply within 24 hours (IST).",
            "",
            `Your message:`,
            `"${message}"`,
            "",
            "Talk soon,",
            "Ayush Kapoor",
            "Backend Developer · CAIR, IIT Mandi",
          ].join("\n"),
        })
        .catch(() => null);
    } else if (process.env.WEB3FORMS_ACCESS_KEY) {
      // free alternative — Web3Forms: no domain needed, key emailed instantly at web3forms.com
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success !== true) {
        throw new Error(data?.message ?? "Web3Forms rejected the message");
      }
    } else {
      // free fallback — FormSubmit.co: no account, no API key, no domain needed.
      // It requires browser-style Origin/Referer headers, and the very first
      // submission emails a one-time activation link to `to`.
      const origin = request.headers.get("origin") ?? new URL(request.url).origin;
      const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/`,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[Portfolio] ${subject}`,
          _template: "box",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => null);
      if (String(data?.message ?? "").toLowerCase().includes("activation")) {
        return Response.json(
          { error: "Inbox not activated yet — the site owner must click the activation link FormSubmit emailed them." },
          { status: 503 }
        );
      }
      if (!res.ok || String(data?.success) !== "true") {
        throw new Error(data?.message ?? "FormSubmit rejected the message");
      }
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send. Please try again." },
      { status: 502 }
    );
  }
}
