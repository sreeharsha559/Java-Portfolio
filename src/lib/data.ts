export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "achievements"
  | "github"
  | "contact";

/* ============================================================
   PROFILE — fill in your real links below.
   GitHub/email/social placeholders keep the site buildable and
   graceful until you replace them with your own values.
   ============================================================ */

export const PROFILE = {
  name: "K Sree Harsha",
  firstName: "Sree Harsha",
  lastName: "K",
  monogram: "SH",
  role: "Java Full Stack Developer",
  tagline:
    "Building scalable web and mobile applications with Java, Spring Boot, React and Kotlin.",
  intro:
    "I design and build full-stack products end-to-end — from database schema to pixel-perfect UI — with a developer's obsession for clean architecture, real-time systems and delightful interfaces.",
  email: "sreeharsha559@gmail.com",
  linkedin: "",
  linkedinUsername: "sreeharsha559",
  githubUsername: "sreeharsha559",
  location: "Kuppam, Andhra Pradesh, India",
  availability: "Open to full-time roles & internships",
};

export const SITE_URL = "https://k-sree-harsha.vercel.app";

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/* ---------------- Stats ---------------- */

export const STATS = [
  { value: 10, suffix: "+", decimals: 0, label: "Projects Shipped", sub: "from idea to production" },
  { value: 1, suffix: "", decimals: 0, label: "Professional Internship", sub: "full-stack development" },
  { value: 3, suffix: "", decimals: 0, label: "Hackathons", sub: "team lead, national level" },
  { value: 8.5, suffix: "", decimals: 1, label: "CGPA", sub: "B.Tech CSE, Kuppam Engineering College" },
];

/* ---------------- About ---------------- */

export const ABOUT_CARDS = [
  {
    icon: "stack",
    title: "Full Stack Development",
    body: "Java + Spring Boot on the backend, React on the frontend, and Kotlin for mobile — I own the whole vertical slice.",
    tags: ["Spring Boot", "React", "Kotlin", "REST APIs"],
  },
  {
    icon: "solve",
    title: "Problem Solving",
    body: "I break ambiguous problems into small, testable pieces and ship pragmatic solutions — on deadline, under pressure.",
    tags: ["Algorithms", "Debugging", "Systems thinking"],
  },
  {
    icon: "lead",
    title: "Leadership",
    body: "Led teams at national hackathons and symposia — turning strangers into squads that deliver in 24 hours.",
    tags: ["Team sync", "Planning", "Code reviews"],
  },
  {
    icon: "learn",
    title: "Continuous Learning",
    body: "Forever tinkering with new tools — from Docker containers to Jetpack Compose — and teaching it forward.",
    tags: ["Compile", "Ship", "Learn"],
  },
];

/* ---------------- Tech Stack ---------------- */

export type TechCategory = "Languages" | "Frontend" | "Backend" | "Database" | "Tools" | "Cloud";

export const TECH_CATEGORIES: ("All" | TechCategory)[] = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Cloud",
];

export interface TechItem {
  name: string;
  icon: string;
  category: TechCategory;
  level: number;
  levelLabel: string;
  usage: string[];
}

export const TECH_STACK: TechItem[] = [
  // Languages
  { name: "Java", icon: "java", category: "Languages", level: 80, levelLabel: "Intermediate", usage: ["Spring Boot", "Core Java", "Microservices", "Collections & Streams"] },
  { name: "Python", icon: "python", category: "Languages", level: 70, levelLabel: "Intermediate", usage: ["Scripting", "Automation", "Data Structures"] },
  { name: "Kotlin", icon: "kotlin", category: "Languages", level: 84, levelLabel: "Intermediate", usage: ["Android", "Jetpack Compose", "Coroutines"] },
  // { name: "TypeScript", icon: "typescript", category: "Languages", level: 80, levelLabel: "Advanced", usage: ["React", "Typed APIs", "Tooling"] },
  { name: "JavaScript", icon: "javascript", category: "Languages", level: 86, levelLabel: "Intermediate", usage: ["React", "Node tooling", "ES6+"] },
  // Frontend
  { name: "React", icon: "react", category: "Frontend", level: 86, levelLabel: "Intermediate", usage: ["Hooks", "State management", "Component design"] },
  { name: "HTML", icon: "html", category: "Frontend", level: 95, levelLabel: "Expert", usage: ["Semantic markup"] },
  { name: "CSS", icon: "css", category: "Frontend", level: 88, levelLabel: "Advanced", usage: ["Tailwind", "Responsive layout", "Animations"] },
  // Backend
  { name: "Spring Boot", icon: "springboot", category: "Backend", level: 86, levelLabel: "Intermediate", usage: ["REST APIs", "Spring Data JPA", "Microservices"] },
  { name: "Spring Security", icon: "springsecurity", category: "Backend", level: 76, levelLabel: "Intermediate", usage: ["JWT auth", "Role-based access", "OAuth"] },
  { name: "Hibernate", icon: "hibernate", category: "Backend", level: 78, levelLabel: "Intermediate", usage: ["JPA mappings", "Query optimization", "Relationships"] },
  { name: "REST APIs", icon: "rest", category: "Backend", level: 80, levelLabel: "Intermediate", usage: ["Design", "Auth", "Real-time (WebSocket)"] },
  // Database
  { name: "MySQL", icon: "mysql", category: "Database", level: 84, levelLabel: "Intermediate", usage: ["Schema design", "Joins & indexes", "Stored procedures"] },
  // Tools
  // { name: "Git", icon: "git", category: "Tools", level: 88, levelLabel: "Intermediate", usage: ["Branching", "Rebase", "CI workflows"] },
  // { name: "GitHub", icon: "github", category: "Tools", level: 90, levelLabel: "Intermediate", usage: ["PRs", "Issues", "Actions"] },
  // { name: "Docker", icon: "docker", category: "Tools", level: 62, levelLabel: "Working knowledge", usage: ["Containerized services", "docker-compose"] },
  // { name: "Postman", icon: "postman", category: "Tools", level: 85, levelLabel: "Advanced", usage: ["API testing", "Collections", "Env variables"] },
  { name: "Android Studio", icon: "androidstudio", category: "Tools", level: 82, levelLabel: "Expert", usage: ["Compose UI", "Emulators", "Profiling"] },
  // Cloud
  { name: "Firebase", icon: "firebase", category: "Cloud", level: 72, levelLabel: "Intermediate", usage: ["Auth", "Firestore", "Push notifications"] },
];

/* ---------------- Projects ---------------- */

export interface ProjectFeature {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  features: ProjectFeature[];
  built: string[];
  accent: string;
  accentSoft: string;
  github: string;
  demo: string | null;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "safestride",
    index: "01",
    name: "SafeStride",
    tagline: "Fall detection meets SOS in an Android companion built for elders and riders.",
    description:
      "A Kotlin / Jetpack Compose safety app that detects sudden falls using accelerometer + gyroscope signals, runs a 20-second human-confirmation window, then broadcasts real-time SOS alerts to emergency contacts via SMS with live GPS location.",
    tech: ["Kotlin", "Jetpack Compose", "GPS", "SMS", "Android Sensors", "Room", "DataStore"],
    features: [
      { label: "Fall detection", detail: "Motion-fusion model over accelerometer + gyroscope thresholds, tuned to avoid false positives from normal activity." },
      { label: "20-second confirmation", detail: "Loud countdown + full-screen prompt. Cancel it and no alert fires; ignore it and SOS escalates automatically." },
      { label: "SOS alerts", detail: "Multiple emergency contacts notified instantly via SMS with a Google Maps link of your live location." },
      { label: "Multilingual support", detail: "UI and voice cues localized — the app speaks the user's language, not the developer's." },
    ],
    built: [
      "Real-time sensor pipeline with lifecycle-aware, battery-conscious sampling",
      "Room + DataStore for offline contact & settings persistence",
      "Compose-first UI with accessibility + large-text modes for elderly users",
    ],
    accent: "#22D3EE",
    accentSoft: "rgba(34,211,238,0.35)",
    github: "https://github.com/sreeharsha559/SafeStride",
    demo: null,
    year: "2025",
  },
  {
    id: "queueflow",
    index: "02",
    name: "QueueFlow",
    tagline: "Digital token queues with live, priority-aware flow for service counters.",
    description:
      "A full-stack queue management platform. Customers grab digital tokens from their phone, admins run a real-time dashboard, and a smart priority queue re-orders tokens based on service type and arrival — streamed live over WebSockets.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "JWT", "WebSocket"],
    features: [
      { label: "Smart queue management", detail: "Token lifecycle: booked → active → served → completed, with SLA-aware priority re-ordering." },
      { label: "Digital tokens", detail: "Customers get a scannable token + live position without waiting in a physical line." },
      { label: "Priority queue", detail: "Priority boost for urgent service classes while starvation is bounded by a fairness counter." },
      { label: "Real-time updates", detail: "WebSocket push keeps every counter and customer screen synchronized to the millisecond." },
      { label: "Admin dashboard", detail: "Live metrics: wait times, service rates, current token, and counter assignment." },
    ],
    built: [
      "Spring Security with stateless JWT and role-based access for staff vs. customers",
      "WebSocket pub/sub topology decoupling queue engine from React clients",
      "MySQL with optimized indexing for high-frequency token queries",
    ],
    accent: "#3B82F6",
    accentSoft: "rgba(59,130,246,0.35)",
    github: "https://github.com/sreeharsha559/QueueFlow",
    demo: null,
    year: "2025",
  },
];

/* ---------------- Experience ---------------- */

export const EXPERIENCE = [
  {
    role: "Full Stack Development Intern",
    company: "SkillDzire",
    period: "Internship",
    tagline: "Shipped production features on a real team — the first time code left my machine for the world.",
    highlights: [
      "Built and maintained REST APIs in Java with Spring Boot, following layered architecture and clean separation of concerns.",
      "Implemented React frontends consuming those APIs — typed data flow, loading states, and error handling end-to-end.",
      "Worked with SQL (MySQL) to design schemas and write optimized queries for real product features.",
      "Practiced Git workflows: feature branches, pull requests, code reviews, and clean commits.",
    ],
    skills: ["Java", "Spring Boot", "React", "SQL", "REST APIs"],
  },
];

/* ---------------- Education ---------------- */

export const EDUCATION = [
  {
    stage: "B.Tech — Computer Science Engineering",
    place: "Kuppam Engineering College",
    score: "CGPA 8.5",
    period: "2023 — 2027",
    detail: "Core CS curriculum with a specialization focus on software engineering, data structures, databases and full-stack systems.",
    featured: true,
  },
  {
    stage: "Intermediate — MPC",
    place: "State Board of Intermediate, Andhra Pradesh",
    score: "Strong academics",
    period: "2021 — 2023",
    detail: "Mathematics, Physics and Chemistry — the foundation that steered me toward engineering.",
    featured: false,
  },
  {
    stage: "SSC (10th)",
    place: "Board of Secondary Education, Andhra Pradesh",
    score: "Completed",
    period: "2020 — 2021",
    detail: "The starting line — where curiosity about how software works first began.",
    featured: false,
  },
];

/* ---------------- Achievements ---------------- */

export const ACHIEVEMENTS = [
  {
    title: "Web Design Competition",
    placement: "1st Place",
    icon: "trophy",
    note: "Designed and built a complete web experience under a strict timebox, judged on design polish, UX and code quality.",
    featured: true,
  },
  {
    title: "National Symposium",
    placement: "Main Coordinator",
    icon: "flag",
    note: "Led planning and execution of a national-level technical symposium — logistics, tracks, and 500+ participants.",
    featured: false,
  },
  {
    title: "National Hackathons",
    placement: "Team Leader",
    icon: "rocket",
    note: "Captained cross-functional teams through 36-hour builds — product decisions, architecture, and demos.",
    featured: false,
  },
  {
    title: "Technical Quiz",
    placement: "3-Time Winner",
    icon: "medal",
    note: "Consistent podium finishes in state and inter-college technical quizzes on CS fundamentals.",
    featured: false,
  },
];

/* ---------------- Contact ---------------- */

export const CONTACT = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "mail",
    hint: "Fastest response",
  },
  {
    label: "LinkedIn",
    value: PROFILE.linkedin,
    href: `https://www.linkedin.com/${PROFILE.linkedin}`,
    icon: "linkedin",
    hint: "Professional network",
  },
  {
    label: "GitHub",
    value: PROFILE.githubUsername,
    href: `https://github.com/${PROFILE.githubUsername}`,
    icon: "github",
    hint: "Code & commits",
  },
];