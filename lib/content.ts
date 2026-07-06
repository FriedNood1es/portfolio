// All claims on this site mirror KentLozano-Resume.html (the source of truth).
// Rule: every line must be a Defensible Claim — provable or explainable live.
// bastaFDA has NO database; do not reintroduce MySQL/schema claims here.

export const identity = {
  name: "Kent Lozano",
  headline: "Software Developer",
  headlineQualifier: "Web & Mobile",
  location: "Davao City, Philippines",
  email: "kentlozano45@gmail.com",
  github: "https://github.com/FriedNood1es",
  githubHandle: "FriedNood1es",
  linkedin: "https://www.linkedin.com/in/kntlzn/",
  linkedinHandle: "kntlzn",
  resume: "/resume/KentLozano-Resume.pdf",
  site: "kent-lozano.vercel.app",
  degree:
    "BS Information Technology, Holy Cross of Davao College (2020–2026)",
};

export const about = [
  `Information Technology graduate specializing in cross-platform mobile
   development with Flutter and modern web development with TypeScript,
   React, and Next.js. I built and defended bastaFDA, a medicine-verification
   mobile app that combines TensorFlow Lite image classification, OCR, and
   FDA registration data.`,
  `I practice agentic coding — developing with AI agents like Claude Code and
   GitHub Copilot to accelerate the work while keeping full command of the
   architecture, data flow, and debugging. On the QA side, I've tested a
   Laravel-based academic analytics system end to end, from test-case design
   to data validation.`,
  `Currently seeking a Junior Software Developer or Mobile Developer role.`,
];

export type SkillGroup = { label: string; icon: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    icon: "code",
    items: ["TypeScript", "JavaScript (ES6+)", "Dart", "Python", "Java"],
  },
  {
    label: "Mobile & Web",
    icon: "devices",
    items: [
      "Flutter",
      "React.js",
      "Next.js",
      "Native Android",
      "HTML5",
      "CSS3",
      "Responsive Design",
    ],
  },
  {
    label: "AI & Machine Learning",
    icon: "chip",
    items: [
      "TensorFlow Lite",
      "OCR integration",
      "On-device model deployment",
    ],
  },
  {
    label: "AI-Assisted Development",
    icon: "bot",
    items: [
      "Agentic coding (Claude Code, GitHub Copilot)",
      "Prompt engineering",
      "AI code review & validation",
    ],
  },
  {
    label: "Backend & Databases",
    icon: "database",
    items: ["Firebase (Auth, Firestore)", "MySQL", "SQL", "RESTful APIs"],
  },
  {
    label: "Testing & QA",
    icon: "bug",
    items: [
      "Test case design",
      "Manual & functional testing",
      "Data validation",
      "User acceptance testing",
      "Bug reporting",
    ],
  },
  {
    label: "DevOps & Tooling",
    icon: "branch",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Android Studio",
      "VS Code",
      "Debugging & testing workflows",
    ],
  },
  {
    label: "Design",
    icon: "pen",
    items: ["UI/UX prototyping", "Adobe Photoshop", "Canva"],
  },
];

export type ProjectStatus = "shipped" | "in-progress" | "planned";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  period: string;
  kind: string;
  stack: string[];
  summary: string;
  points: string[];
  /** One or more call-to-action links (live app, repository, etc). */
  links?: { href: string; label: string }[];
  /** Path under /public. When set, replaces the placeholder panel. */
  image?: string;
  /** Multiple screenshots under /public — takes priority over `image` and enables the gallery/swipe UI. */
  images?: string[];
  /** Screenshots are a phone screen capture (9:20) rather than a wide desktop shot (16:10). */
  mobileAspect?: boolean;
  /** No screenshot by design — the visual slot points back at the live page instead. */
  selfPreview?: boolean;
  /** Placeholder panel accent hue (deg) until a real screenshot lands. */
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "bastafda",
    name: "bastaFDA",
    status: "shipped",
    period: "2025 – 2026",
    kind: "Capstone Project — defended before a faculty panel",
    stack: ["Flutter", "Dart", "TensorFlow Lite", "OCR", "Firebase"],
    summary:
      "A mobile app that verifies medicine authenticity by cross-referencing OCR text extraction and on-device image recognition against official FDA registration data.",
    points: [
      "Trained and integrated a TensorFlow Lite image-classification model to identify supported medicine products on-device.",
      "Engineered a multi-scan OCR workflow that aggregates results across captures, improving accuracy on low-quality packaging.",
      "Implemented the full product flow — scanning, verification, history, reporting — with Firebase authentication and real-time data.",
      "Leveraged agentic coding tools (Claude Code, GitHub Copilot) for scaffolding, refactoring, and test iteration, reviewing and validating all generated code against project requirements.",
    ],
    links: [
      {
        href: "https://github.com/FriedNood1es/basta_fda",
        label: "View repository",
      },
    ],
    images: [
      "/projects/bastafda_1.jpg",
      "/projects/bastafda_2.jpg",
      "/projects/bastafda_3.jpg",
      "/projects/bastafda_4.jpg",
    ],
    mobileAspect: true,
    hue: 152,
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    status: "shipped",
    period: "2025 – Present",
    kind: "Personal Project",
    stack: ["Next.js", "TypeScript", "React", "Vercel"],
    summary:
      "The site you're reading — a responsive portfolio built with Next.js and TypeScript, deployed on Vercel with automated deployments from GitHub.",
    points: [
      "Statically generated, zero client-side framework overhead beyond React itself.",
      "Designed and iterated with an agentic coding workflow (Claude Code), with every claim reviewed against the resume.",
    ],
    links: [
      {
        href: "https://github.com/FriedNood1es/portfolio",
        label: "View source",
      },
    ],
    selfPreview: true,
    hue: 32,
  },
  {
    slug: "kanbo",
    name: "Kanbo",
    status: "shipped",
    period: "2026",
    kind: "Personal Project — full-stack",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "@dnd-kit"],
    summary:
      "A drag-and-drop Kanban board for tracking my own job search, with real GitHub/Google sign-in, per-user data, and a conversion-funnel stats page — built to close the backend/database gap in my other projects.",
    points: [
      "Built the Kanban board on @dnd-kit/react with fractional-position reordering, so dragging a card only ever rewrites that one row, never its neighbors.",
      "Wired up Auth.js v5 with database-backed sessions and both GitHub and Google OAuth, enforcing per-user data access on every Server Action rather than trusting the client.",
      "Added a funnel/conversion stats page computed from real stage-transition history, CSV export, stale-application flagging, and a full dark-mode palette rather than a generic color inversion.",
      "Iterated feature-by-feature with an agentic coding workflow (Claude Code), testing each change against the live app before shipping.",
    ],
    links: [
      { href: "https://kanbo-two.vercel.app", label: "View live app" },
      { href: "https://github.com/FriedNood1es/kanbo", label: "View repository" },
    ],
    images: ["/projects/kanbo_1.png", "/projects/kanbo_2.png", "/projects/kanbo_3.png"],
    hue: 265,
  },
];

export type Experience = {
  org: string;
  role: string;
  detail?: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Holy Cross of Davao College",
    role: "QA Intern, Developer Track",
    detail: "Academic Intervention System (Laravel)",
    location: "Davao City, Philippines",
    period: "2026",
    points: [
      "Performed QA on an academic intervention system for the Office of the VP for Academic Affairs that monitors per-course and per-professor grade trends behind pass/fail rates.",
      "Designed and executed test cases across grade-checking, analytics, and reporting features; verified grade computations against source academic records.",
      "Traced reported defects into the Laravel codebase to localize root causes and propose fixes to the development team.",
      "Contributed to domain modeling and assisted developers during feature implementation; supported user acceptance testing with academic stakeholders.",
    ],
  },
  {
    org: "Content Moderation (Remote)",
    role: "Chat Moderator",
    location: "Remote",
    period: "2024 – 2025",
    points: [
      "Reviewed high volumes of user-generated content against platform guidelines, maintaining accuracy under strict turnaround times.",
      "Resolved escalated user concerns professionally in a fast-paced, metrics-driven environment.",
    ],
  },
];

export const education = {
  org: "Holy Cross of Davao College",
  degree: "BS Information Technology",
  location: "Davao City, Philippines",
  period: "2020 – 2026",
  capstone: "bastaFDA — Mobile Verification of FDA-Approved Products",
  coursework: [
    "Mobile Application Development",
    "Database Management Systems",
    "Software Engineering",
    "Data Structures & Algorithms",
  ],
};
