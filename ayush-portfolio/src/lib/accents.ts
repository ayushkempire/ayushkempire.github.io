export const ACCENTS = [
  { name: "Signal", accent: "#ff4d00", soft: "#ffb347" },
  { name: "Acid", accent: "#c8f31d", soft: "#eaff7a" },
  { name: "Volt", accent: "#8b5cf6", soft: "#d8b4fe" },
  { name: "Ice", accent: "#22d3ee", soft: "#a5f3fc" },
] as const;

export const ACCENT_STORAGE_KEY = "portfolio-accent";
export const ACCENT_EVENT = "accent-change";

/** Applies accent by index, persists it, and notifies listeners (switcher/terminal). */
export function applyAccent(index: number) {
  const option = ACCENTS[index];
  if (!option) return false;
  const root = document.documentElement;
  root.style.setProperty("--accent", option.accent);
  root.style.setProperty("--accent-soft", option.soft);
  localStorage.setItem(ACCENT_STORAGE_KEY, String(index));
  window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: index }));
  return true;
}

export function savedAccentIndex(): number {
  const saved = Number(localStorage.getItem(ACCENT_STORAGE_KEY));
  return saved >= 0 && saved < ACCENTS.length ? saved : 0;
}
