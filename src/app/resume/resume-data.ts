import { PROFILE } from "@/lib/data";
import { TECH_STACK } from "@/lib/data";

export const SKILLS_FLAT = [
  ...new Set(
    TECH_STACK.map((t) => t.name).concat([
      "HTML",
      "CSS",
      "JavaScript",
      "SQL",
      "REST APIs",
      "WebSocket",
      "JWT",
    ]),
  ),
];

export { PROFILE };