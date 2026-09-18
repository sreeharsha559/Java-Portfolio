import type { Metadata } from "next";
import { PROFILE, SKILLS_FLAT } from "./resume-data";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: `${PROFILE.name} — Java Full Stack Developer resume. Print or save as PDF.`,
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-surface-800 px-4 py-10 sm:px-8 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-[820px] items-center justify-between print:hidden">
        <p className="font-mono text-sm text-ink-muted">
          A print-ready copy — use your browser to save as PDF (Ctrl/Cmd + P).
        </p>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[820px] bg-white p-8 text-slate-900 shadow-2xl sm:p-12 print:shadow-none">
        <header className="border-b-2 border-slate-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="mt-1 text-lg font-medium text-blue-600">{PROFILE.role}</p>
          <p className="mt-2 text-sm text-slate-600">{PROFILE.email}</p>
          <p className="mt-1 text-sm text-slate-600">
            B.Tech Computer Science Engineering · Kuppam Engineering College · CGPA 8.5
          </p>
        </header>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{PROFILE.intro}</p>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">Technical Skills</h2>
          <ul className="grid grid-cols-2 gap-1.5 text-sm text-slate-700 sm:grid-cols-3">
            {SKILLS_FLAT.map((s) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-blue-600" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">Projects</h2>
          <h3 className="text-sm font-semibold">
            QueueFlow — Smart Queue Management System (Java · Spring Boot · React · MySQL · WebSocket)
          </h3>
          <p className="mt-1 text-sm text-slate-700">
            Full-stack digital token platform. Real-time priority queue pushed over WebSockets, JWT-secured REST API,
            admin dashboard with live metrics.
          </p>
          <h3 className="mt-3 text-sm font-semibold">
            SafeStride — Fall Detection &amp; SOS Android App (Kotlin · Jetpack Compose · GPS · SMS)
          </h3>
          <p className="mt-1 text-sm text-slate-700">
            Motion-fusion fall detection with a 20-second confirmation window, automatic SMS SOS to multiple emergency
            contacts with live GPS location, multilingual UI, Room + DataStore persistence.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">Experience</h2>
          <h3 className="text-sm font-semibold">Full Stack Development Intern — SkillDzire</h3>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Built REST APIs with Java + Spring Boot following layered architecture.</li>
            <li>Implemented React frontends consuming those APIs end-to-end.</li>
            <li>Designed MySQL schemas and optimized queries for product features.</li>
            <li>Practiced Git workflows: branches, pull requests and code reviews.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">Achievements</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>1st Place — Web Design Competition</li>
            <li>Main Coordinator — National Symposium</li>
            <li>Team Leader — National Hackathons</li>
            <li>3-Time Runner-Up — Technical Quiz</li>
          </ul>
        </section>
      </article>
    </main>
  );
}