export const site = {
  name: "Adarsh Mishra",
  handle: "ArcoRATH",
  role: "Backend Systems & Agentic AI",
  college: "Mathematics and Computing @ IIT (BHU), Varanasi",
  github: "https://github.com/ArcoRATH",
  linkedin: "https://www.linkedin.com/in/adarsh-mishra-53b760218/",
  email: "akmishra@gmail.com",
};

export const taglines = [
  "backend systems enthusiast",
  "mathematics & computing @ iit (bhu)",
  "microservices & distributed systems",
  "agentic ai workflows",
  "high-performance ml data pipelines",
];

export const navLinks = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export const skillGroups = [
  {
    title: "languages",
    icon: ">",
    skills: ["Python", "C++", "Java", "TypeScript", "SQL"],
  },
  {
    title: "backend & full-stack",
    icon: "{}",
    skills: [
      "Django",
      "Django REST Framework",
      "REST APIs",
      "Microservices",
      "Distributed Systems",
      "System Design",
      "React",
      "React Query",
      "Tailwind CSS",
    ],
  },
  {
    title: "data & ai",
    icon: "λ",
    skills: [
      "PostgreSQL",
      "pgvector",
      "LangGraph",
      "Gemini API",
      "PyTorch",
      "TensorFlow",
      "NumPy",
      "Pandas",
      "Vector & Graph DBs",
    ],
  },
  {
    title: "infra & tools",
    icon: "#",
    skills: [
      "Docker",
      "Docker Compose",
      "Gunicorn",
      "Git",
      "GitHub",
      "Linux",
      "LaTeX",
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  repo: string;
  accent: "neon" | "viol";
};

export const projects: Project[] = [
  {
    id: "socratic-tutor",
    index: "01",
    title: "Socratic Learning Agent",
    tagline: "LangGraph · Gemini · pgvector · Telegram",
    description:
      "A stateful AI tutor that turns text PDFs — from short papers to 500-page books — into an interactive Socratic learning journey over Telegram. It teaches each section, quizzes understanding, and tracks how well every concept sticks before moving on.",
    highlights: [
      "Mastery-gated teach → challenge → evaluate loop orchestrated with LangGraph — advance/retry decisions driven by per-concept mastery scores",
      "Book-scale ingestion: extraction + size-based chunking + batched embeddings with rate-limit backoff — a 500-page book in ~a minute",
      "Front/back-matter filter (heuristics + LLM classification) keeps only teachable content",
      "PostgreSQL + pgvector as the single source of truth; agent state round-tripped through JSON",
    ],
    tech: [
      "Python",
      "LangGraph",
      "Gemini API",
      "PostgreSQL",
      "pgvector",
      "Docker",
      "Telegram Bot API",
    ],
    repo: "https://github.com/ArcoRATH/socratic_tutor",
    accent: "neon",
  },
  {
    id: "smart-vault",
    index: "02",
    title: "Smart Vault",
    tagline: "React · Django · SHA-256 dedup · Docker",
    description:
      "A full-stack file management platform with content-addressed storage: every upload is SHA-256 hashed and identical content is stored exactly once — the dashboard reports exactly how much storage that saves.",
    highlights: [
      "SHA-256 content dedup with reference counting — duplicate uploads cost 0 bytes on disk",
      "Reference-count-safe deletes so duplicate records never dangle",
      "Full-text search + multi-facet filtering (type / size / date / duplicates) with server-side pagination",
      "Analytics: logical vs. actual disk usage, savings %, per-type breakdown, upload trends",
      "One-command Docker Compose startup for the entire stack",
    ],
    tech: [
      "React",
      "TypeScript",
      "Django",
      "DRF",
      "React Query",
      "Tailwind CSS",
      "Docker",
    ],
    repo: "https://github.com/ArcoRATH/smart_vault",
    accent: "viol",
  },
];

export const aboutLines = [
  { prompt: "whoami", out: "Adarsh Mishra — Mathematics & Computing @ IIT (BHU), Varanasi" },
  { prompt: "cat focus.txt", out: "scalable backend architectures · context-aware agentic workflows" },
  { prompt: "cat focus.txt --next", out: "high-performance ML pipelines · microservices · API integrations" },
  { prompt: "interests --list", out: "[backend system design, graph/vector databases, python, c++]" },
  { prompt: "status", out: "● always learning something new" },
];
