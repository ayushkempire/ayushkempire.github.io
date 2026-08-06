"use client";

import { createContext, useContext } from "react";
import type { Content } from "@/lib/content";

const ContentContext = createContext<Content | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content: Content;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): Content {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent must be used inside ContentProvider");
  return content;
}
