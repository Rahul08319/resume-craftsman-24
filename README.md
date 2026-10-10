<div align="center">

#  Resume Craftsman Pro
### *Apple-Grade ATS Resume Suite with Cupertino Aesthetics & Dynamic Sync*

[![Build & Verify](https://github.com/Rahul08319/resume-craftsman-24/actions/workflows/auto-verify-and-sync.yml/badge.svg)](https://github.com/Rahul08319/resume-craftsman-24/actions)
[![Apple HIG Compliant](https://img.shields.io/badge/Design_Language-Apple_HIG_%26_Liquid_Glass-0071e3?logo=apple&logoColor=white)](https://developer.apple.com/design/human-interface-guidelines/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Dynamic Year Engine](https://img.shields.io/badge/Automated_Sync-Active_for_Coming_Years-purple.svg)](#-dynamic-annual-engine)

<br />

<p align="center">
  <b>Resume Craftsman Pro</b> is an executive-caliber resume design and ATS optimization suite engineered around <b>Apple’s Human Interface Guidelines (HIG)</b>. Crafted with translucent <b>Liquid Glass</b> chrome, smooth spring physics, real-time live previewing, automated year-over-year tenure calculations, and high-fidelity vector PDF generation.
</p>

[Explore Live Demo](#-getting-started) • [Feature Highlights](#-crafted-features) • [Apple Design Philosophy](#-apple-design-system-standards) • [Documentation](#-project-architecture)

---

</div>

<br />

## 🌟 Crafted Features

<table>
  <tr>
    <td width="50%">
      <h3>🍏 Cupertino Liquid Glass UI</h3>
      <ul>
        <li><b>Translucent Chrome:</b> Frosted glass navigation with backdrop blur (<code>backdrop-blur-xl</code>) and specular highlight borders.</li>
        <li><b>Smooth Spring Motion:</b> Natural transition curves (<code>cubic-bezier(0.16, 1, 0.3, 1)</code>) that feel fluid, responsive, and tactile.</li>
        <li><b>Light & Dark Mode:</b> Seamless toggle between Cupertino Daylight and Space Midnight.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📊 Real-Time ATS Score Engine</h3>
      <ul>
        <li><b>Live Quality Meter:</b> 0–100% dynamic rating scoring completeness, contact integrity, and career impact.</li>
        <li><b>Quantifiable Metric Checks:</b> Proactively suggests adding measurable impact metrics (%, $, KPIs).</li>
        <li><b>Keyword & Skill Coverage:</b> Ensures minimum threshold diversity across core competencies.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📑 4 Apple Executive Templates</h3>
      <ul>
        <li><b>Cupertino Modern:</b> Signature Apple look with hairline rules, pill badges, and refined typographical pacing.</li>
        <li><b>Silicon Valley Tech:</b> High-density dual-column layout tailored for engineering, architecture, and technology leadership.</li>
        <li><b>Executive Classic:</b> Distinguished editorial serif typography with balanced symmetry and timeless prestige.</li>
        <li><b>Minimalist Titanium:</b> Maximum whitespace with high-contrast typographical rhythm.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎨 6 Apple System Color Themes</h3>
      <ul>
        <li><b>Cupertino Blue</b> (<code>#0071e3</code>): Signature Apple system accent.</li>
        <li><b>Space Midnight</b> (<code>#1f2024</code>): Deep Space Black precision.</li>
        <li><b>Alpine Green</b> (<code>#28a745</code>): Crisp forest vibrancy.</li>
        <li><b>Sunset Orange</b> (<code>#f56300</code>): Warm California Golden Hour.</li>
        <li><b>Liquid Violet</b> (<code>#af52de</code>): VisionOS aurora depth.</li>
        <li><b>Natural Titanium</b> (<code>#70757d</code>): Brushed metal editorial tone.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔄 Dynamic Annual Engine</h3>
      <ul>
        <li><b>Self-Updating Dates:</b> Automatically computes tenure duration (e.g. <code>2024 – Present • 2 yrs 8 mos</code>) against the current calendar year.</li>
        <li><b>Automated CI/CD Maintenance:</b> Scheduled GitHub Actions workflow checks and maintains the codebase automatically over coming years.</li>
        <li><b>Evergreen Copyright & Metadata:</b> Automatically synchronizes with future calendar cycles.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>💾 Storage & Export Suite</h3>
      <ul>
        <li><b>Local Persistence:</b> Auto-saves every keystroke in <code>localStorage</code>; never lose progress.</li>
        <li><b>1-Click Sample Profile:</b> Instantly load a full Apple Executive profile to test all templates.</li>
        <li><b>JSON Backup & Restore:</b> Export or import your resume data anytime.</li>
        <li><b>Print & Vector PDF:</b> Pixel-perfect browser print (A4 calibrated) and custom high-res jsPDF generator.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

---

## 📐 Apple Design System Standards

Resume Craftsman Pro strictly adheres to the core tenets of Apple design:

```
                       APPLE HIG PRINCIPLES
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
     CLARITY                DEFERENCE                 DEPTH
  Precise SF Pro         Content leads;          Translucent layers,
  typographical          chrome recedes via      subtle specular
  hierarchy & space      liquid glass materials  borders & soft shadows
```

1. **Light is the Default:** Designed light-first (`#f5f5f7` canvas with crisp neutral tones) with a deliberate, smooth Space Midnight dark mode.
2. **Restraint & Meaning:** Rather than overwhelming with unnecessary decorations, elements use whitespace as a luxury signal and subtle hairline borders for structural order.
3. **Fluid Springs:** Tactile micro-interactions (`active:scale-[0.98]`, spring transitions `duration-300`) model physical momentum.

<br />

---

## 🔄 Dynamic Annual Engine

This project incorporates built-in dynamic logic so it remains continuously up-to-date across future years without manual code edits:

- **Dynamic Tenure Calculation (`dateHelper.ts`):** Work experiences marked as `"Present"` dynamically compute their duration up to the current month and year in real-time.
- **Dynamic Copyright & Editions (`Index.tsx`):** Header badges and footer copyrights dynamically evaluate `new Date().getFullYear()`.
- **Scheduled CI/CD (`.github/workflows/auto-verify-and-sync.yml`):** Automatically executes automated builds and verification runs monthly and on New Year's Day to ensure long-term stability and compatibility.

<br />

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language:** [TypeScript 5.8](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + [Radix UI Primitives](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/) (Apple SF-style minimalist iconography)
- **Document Engine:** [jsPDF](https://github.com/parallax/jsPDF) + Custom CSS Print A4 stylesheet
- **State & Notifications:** LocalStorage Sync + [Sonner](https://sonner.emilkowal.ski/)

<br />

---

## 📁 Project Architecture

```
resume-craftsman-24/
├── .github/
│   └── workflows/
│       └── auto-verify-and-sync.yml   # Automated continuous build & year sync
├── public/                            # Static brand assets
├── src/
│   ├── components/
│   │   ├── templates/                 # 4 Apple Executive Resume Templates
│   │   │   ├── ModernTemplate.tsx     # Cupertino Modern with hairline dividers
│   │   │   ├── TechTemplate.tsx       # Silicon Valley Tech dual-column layout
│   │   │   ├── ClassicTemplate.tsx    # Editorial serif prestige
│   │   │   └── MinimalistTemplate.tsx # Titanium whitespace minimalism
│   │   ├── ui/                        # Radix UI + Tailwind component library
│   │   ├── PersonalInfoForm.tsx       # Contact, headline, and social profiles
│   │   ├── SummaryForm.tsx            # Executive career statement
│   │   ├── ExperienceForm.tsx         # Chronological work history
│   │   ├── EducationForm.tsx          # Degrees and academic credentials
│   │   ├── SkillsForm.tsx             # Competency tags and taxonomy
│   │   ├── ProjectsForm.tsx           # Featured open-source & engineering projects
│   │   ├── ThemeSelector.tsx          # 6 Apple System Color picker
│   │   ├── TemplateSelector.tsx       # Segmented template switcher
│   │   ├── ResumeScoreCard.tsx        # Real-time ATS optimizer & completeness meter
│   │   └── PreviewToolbar.tsx         # Zoom controls, Copy MD, and Direct Print
│   ├── hooks/
│   │   └── useTheme.ts                # Dynamic CSS custom property injector
│   ├── types/
│   │   ├── resume.ts                  # Type definitions for resume models
│   │   └── theme.ts                   # Apple system themes and template types
│   ├── utils/
│   │   ├── dateHelper.ts              # Dynamic annual calculation & tenure parser
│   │   ├── pdfGenerator.ts            # High-resolution vector PDF generator
│   │   └── sampleData.ts              # 1-Click Apple Executive sample data
│   ├── pages/
│   │   ├── Index.tsx                  # Main workspace with Liquid Glass navigation
│   │   └── NotFound.tsx               # 404 handler
│   ├── index.css                      # Apple Liquid Glass tokens & print stylesheets
│   ├── App.tsx                        # Application routing & context providers
│   └── main.tsx                       # React DOM entry point
├── package.json
└── vite.config.ts
```

<br />

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Node.js 20 LTS recommended)
- npm, pnpm, or bun

### 1. Clone the repository
```bash
git clone https://github.com/Rahul08319/resume-craftsman-24.git
cd resume-craftsman-24
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch local development server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

<br />

---

## ⚡ TypeSafe AI System One Integration Analysis

As part of this project's architecture, we evaluated the integration of **TypeSafe AI System One primitives** (Choice, Noul, Score) for contextual memory compaction and intelligent tool categorization:

1. **Choice Primitive for Tool Categorization:**
   - Evaluated using TypeSafe's Jev model: applying a single `Choice` primitive over a defined set of mutually exclusive tool categories (`read_only_query`, `state_mutation`, `external_side_effect`, `diagnostic_probe`, `unclassified_or_compound`) sharpens the distribution, prevents contradictory classifications, and produces calibrated confidence intervals for safe context compaction.
2. **Prompting Best Practices Verification (`src/core.ts`):**
   - Question instructions adhere to TypeSafe best practices by utilizing explicit backticked state references (e.g. ``tool_call.output_summary``), single narrow semantic judgments, comprehensive mutually exclusive criteria, and safe non-destructive fallback handling.

<br />

---

## 📄 License & Attribution

Designed and developed with pride by [Rahul Kumar](https://github.com/Rahul08319).  
Released under the **MIT License**. Continuously updated and maintained for current and future years.
