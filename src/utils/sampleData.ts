import { ResumeData } from "@/types/resume";

export const getAppleExecutiveSample = (): ResumeData => {
  const currentYear = new Date().getFullYear();

  return {
    personalInfo: {
      fullName: "Rahul Kumar",
      title: "Lead Systems Architect & Platform Engineer",
      email: "rahul.kumar@craftsman.dev",
      phone: "+1 (408) 555-0199",
      location: "Cupertino, CA",
      linkedin: "linkedin.com/in/rahulkumar-architect",
      website: "rahulkumar.design",
      github: "github.com/Rahul08319",
    },
    summary:
      "Visionary Principal Systems Architect and Full-Stack Engineering Leader with 8+ years designing ultra-scalable distributed platforms and fluid, human-centric software. Deep expertise in high-throughput cloud microservices, reactive UI systems, and Apple Human Interface Guidelines. Proven track record elevating engineering velocity by 40% and deploying resilient platforms serving 25M+ active users.",
    experience: [
      {
        id: "exp-1",
        company: "NextGen Cloud Platforms",
        position: "Lead Distributed Systems Architect",
        startDate: `${currentYear - 2}-03`,
        endDate: "",
        current: true,
        description:
          "• Architected next-generation multi-region edge mesh reducing global API latency by 38% for 25M+ monthly users.\n• Championed fluid, micro-frontend design architecture with TypeScript, React, and strict Apple design system tokens.\n• Mentored 18 senior engineers, establishing automated zero-downtime deployment pipelines and 99.995% SLA reliability.",
      },
      {
        id: "exp-2",
        company: "Cupertino Interactive Labs",
        position: "Senior Full-Stack UI/UX Engineer",
        startDate: `${currentYear - 5}-06`,
        endDate: `${currentYear - 2}-02`,
        current: false,
        description:
          "• Led front-end modernization of core customer analytics dashboard, cutting initial load time from 4.2s to 820ms.\n• Spearheaded high-fidelity design component library with zero-dependency CSS spring animations and dark-mode synchronization.\n• Automated end-to-end regression testing suites, driving defect rates down by 54% across 12 releases.",
      },
      {
        id: "exp-3",
        company: "Apex Digital Solutions",
        position: "Software Engineer",
        startDate: `${currentYear - 8}-08`,
        endDate: `${currentYear - 5}-05`,
        current: false,
        description:
          "• Built real-time asynchronous document streaming engine powering collaborative drafting for 500k+ enterprise users.\n• Refactored legacy monolithic API layer into modular Node.js/Go microservices, reducing server footprint by 30%.",
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of California, Berkeley",
        degree: "Master of Science (M.S.)",
        field: "Computer Science & Distributed Systems",
        startDate: `${currentYear - 8}-09`,
        endDate: `${currentYear - 6}-06`,
        current: false,
      },
      {
        id: "edu-2",
        institution: "Institute of Technology",
        degree: "Bachelor of Technology (B.Tech)",
        field: "Information Technology",
        startDate: `${currentYear - 12}-08`,
        endDate: `${currentYear - 8}-05`,
        current: false,
      },
    ],
    skills: [
      "TypeScript",
      "React / Next.js",
      "Distributed Systems",
      "Apple HIG & UI/UX",
      "Tailwind CSS",
      "Node.js & Go",
      "System Architecture",
      "GraphQL & REST",
      "Docker & Kubernetes",
      "PostgreSQL & Redis",
      "CI/CD Pipelines",
      "Performance Optimization",
    ],
    projects: [
      {
        id: "proj-1",
        name: "Resume Craftsman Pro",
        technologies: "React 18, TypeScript, Tailwind CSS, jsPDF, Web Audio",
        description:
          "Apple-inspired intelligent resume generation suite featuring real-time preview, ATS score optimization, and dynamic annual auto-syncing engine.",
        link: "https://github.com/Rahul08319/resume-craftsman-24",
      },
      {
        id: "proj-2",
        name: "FluidMesh Distributed Cache",
        technologies: "Go, Raft Consensus, gRPC, Prometheus",
        description:
          "Ultra-low latency distributed in-memory key-value cache achieving 1.2M QPS with sub-millisecond p99 replication.",
        link: "https://github.com/Rahul08319",
      },
      {
        id: "proj-3",
        name: "Spectra Design Tokens",
        technologies: "CSS Variables, Figma Tokens API, Turborepo",
        description:
          "Unified multi-platform design tokens compiler enabling dynamic theme transitions, liquid glass styling, and accessibility compliance.",
        link: "https://github.com/Rahul08319",
      },
    ],
  };
};
