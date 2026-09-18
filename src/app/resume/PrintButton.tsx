"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light"
    >
      Print / Save PDF
    </button>
  );
}