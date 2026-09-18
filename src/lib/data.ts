export const site = {
  name: "adarsh mishra",
  alias: "arcorath",
  role: "backend systems & agentic ai",
  college: "b.tech + m.tech, mathematics & computing — iit (bhu) varanasi · 2024 · gpa 8.99",
  github: "https://github.com/ArcoRATH",
  linkedin: "https://www.linkedin.com/in/adarsh-mishra-53b760218/",
  email: "akmishra2488@gmail.com",
  city: "faridabad, haryana, india",
  displayCity: "faridabad, haryana",
};

export const homeCoords = {
  lat: 28.409,
  lng: 77.311,
  label: "faridabad",
};

export const aboutLines = [
  "i build the systems behind systems — microservices, distributed data, and agentic ai workflows that actually persist their state.",
  "iit (bhu) 2024, mathematics & computing. when a problem interests me, i document it like an engineering memo: my repos ship with architecture diagrams, api references, and troubleshooting guides.",
];

export const facts = [
  "codeforces 1790 · expert",
  "codechef 1914 · 4★",
  "leetcode 2121 · knight",
  "kickstart #1201 global",
  "jee advanced 1503",
];

export type WithPhoto = {
  photo?: string;
  photoCaption?: string;
};

export const PIN_MERGE_KM = 40;

export type Project = {
  id: string;
  num: string;
  title: string;
  repo: string;
  problem: string;
  built: string;
  impact: string;
  tech: string[];
} & WithPhoto;

export const projects: Project[] = [
  {
    id: "socratic-tutor",
    num: "01",
    title: "socratic learning agent",
    repo: "https://github.com/ArcoRATH/socratic_tutor",
    problem: "learning from dense pdfs is passive — people skim, nod, and quit.",
    built: "a stateful langgraph agent that teaches, quizzes, and mastery-gates every concept in a socratic loop over telegram.",
    impact: "500-page books ingested in ~a minute; postgres + pgvector as the single source of truth for all agent state.",
    tech: ["python", "langgraph", "gemini api", "pgvector", "docker", "telegram"],
  },
  {
    id: "smart-vault",
    num: "02",
    title: "smart vault",
    repo: "https://github.com/ArcoRATH/smart_vault",
    problem: "files pile up — duplicates quietly eat storage and nobody notices.",
    built: "a react + django platform with sha-256 content-addressed storage and reference-count-safe deletes.",
    impact: "duplicate uploads cost zero bytes on disk; live savings analytics make the dedup visible.",
    tech: ["react", "typescript", "django", "drf", "react query", "docker"],
  },
];

export const aboutPhoto = {
  src: "",
  caption: "engineering memos, sometimes sunsets",
};

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  note: string;
  bullets: string[];
} & WithPhoto;

export const experience: ExperienceEntry[] = [
  {
    org: "edgini",
    role: "freelance backend developer",
    period: "sep 2025 — feb 2026",
    note: "mcp tooling for ai-driven learning",
    bullets: [
      "engineered 40+ deterministic mcp tools (fastmcp, pydantic) with a neo4j + supabase hybrid data layer — asyncio concurrency cut tool latency ~50%",
      "shipped a test-first, production-ready mcp server: 100% pytest coverage, dual stdio/sse transports, docker lifecycle management",
    ],
  },
  {
    org: "moveworks",
    role: "software engineer",
    period: "jul 2024 — jul 2025",
    note: "ml data platform",
    bullets: [
      "built the ml data pipeline and annotation platform (django, postgresql, celery) on docker + kubernetes with oidc auth and redis queues",
      "built the go microservice that replaced cloudinary — $30k/yr saved; s3 storage, prometheus observability, k8s rollout",
    ],
  },
  {
    org: "jio platforms",
    role: "software engineering intern",
    period: "may — jul 2023",
    note: "nlp on e-commerce queries",
    bullets: [
      "built a NER pipeline (spaCy, pandas, fastapi) scoring 90% f1 on unseen queries — tokenization, preprocessing, custom model training",
      "shipped the model behind a lightweight fastapi service; dockerized and load-tested to <100ms latency with locust",
    ],
  },
];

export const stackGroups = [
  { label: "languages", items: ["python", "c++", "java", "typescript", "sql"] },
  {
    label: "backend",
    items: ["django", "drf", "rest apis", "microservices", "distributed systems", "system design"],
  },
  {
    label: "data & ai",
    items: ["postgres", "pgvector", "langgraph", "gemini api", "pytorch", "spacy"],
  },
  { label: "frontend", items: ["react", "react query", "tailwind css"] },
  { label: "infra", items: ["docker", "kubernetes", "aws s3", "linux", "git"] },
];

export const marqueeItems = [
  "langgraph agents",
  "mcp tooling",
  "vector search",
  "sha-256 dedup — buy one, get zero identical ones free",
  "microservices",
  "distributed systems",
  "ml data pipelines",
  "django + drf",
  "postgres + pgvector",
  "docker & k8s",
  "go microservices",
  "100% pytest coverage — blame-proof",
];
