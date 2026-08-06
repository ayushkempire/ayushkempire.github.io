import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

function getPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

/** Derives a stable session token from the admin password. */
export function sessionToken(): string | null {
  const password = getPassword();
  if (!password) return null;
  return createHmac("sha256", "portfolio-admin-v1").update(password).digest("hex");
}

export function verifyPassword(input: string): boolean {
  const password = getPassword();
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === expected;
}
