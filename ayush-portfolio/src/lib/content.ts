import { promises as fs } from "fs";
import path from "path";
import {
  site,
  about,
  experience,
  education,
  projects,
  skills,
  certifications,
} from "./data";

export const defaultContent = {
  site,
  about,
  experience,
  education,
  projects,
  skills,
  certifications,
};

export type Content = typeof defaultContent;

const CONTENT_FILE = path.join(process.cwd(), "content", "content.json");

/** Loads content.json overrides on top of the code defaults. */
export async function getContent(): Promise<Content> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return { ...defaultContent, ...JSON.parse(raw) };
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content: Content): Promise<void> {
  await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}
