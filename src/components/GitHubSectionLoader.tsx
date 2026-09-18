"use client";

import dynamic from "next/dynamic";

const GitHubSection = dynamic(
  () => import("@/components/GitHubSection").then((m) => m.GitHubSection),
  { ssr: false, loading: () => null },
);

/** Lazily loads the GitHub section (below the fold) to keep first load slim. */
export function GitHubSectionLoader() {
  return <GitHubSection />;
}