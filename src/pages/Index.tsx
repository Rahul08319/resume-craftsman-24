import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { ColorTheme, ResumeTemplate } from "@/types/theme";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { SummaryForm } from "@/components/SummaryForm";
import { ExperienceForm } from "@/components/ExperienceForm";
import { EducationForm } from "@/components/EducationForm";
import { SkillsForm } from "@/components/SkillsForm";
import { ProjectsForm } from "@/components/ProjectsForm";
import { ThemeSelector } from "@/components/ThemeSelector";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ResumeScoreCard } from "@/components/ResumeScoreCard";
import { PreviewToolbar } from "@/components/PreviewToolbar";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import { TechTemplate } from "@/components/templates/TechTemplate";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  Upload,
  Save,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { getAppleExecutiveSample } from "@/utils/sampleData";
import { getCurrentYear } from "@/utils/dateHelper";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

const STORAGE_KEY = "resume_craftsman_data_v2";
const THEME_KEY = "resume_craftsman_theme_v2";
const TEMPLATE_KEY = "resume_craftsman_template_v2";

const initialEmptyData: ResumeData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

const Index = () => {
  const currentYear = getCurrentYear();

  // Load state from localStorage or defaults
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return (saved as ColorTheme) || "cupertino";
  });

  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(() => {
    const saved = localStorage.getItem(TEMPLATE_KEY);
    return (saved as ResumeTemplate) || "modern";
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
    // Default to the rich Apple executive sample so the page looks stunning immediately!
    return getAppleExecutiveSample();
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark");
  });

  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>("Just now");

  useTheme(selectedTheme);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Persist to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      localStorage.setItem(THEME_KEY, selectedTheme);
      localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSavedTime(timeStr);
    } catch (e) {
      console.error("Error saving resume state", e);
    }
  }, [resumeData, selectedTheme, selectedTemplate]);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate data={resumeData} />;
      case "tech":
        return <TechTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  const handleDownload = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      toast.error("Please fill in at least your name and email");
      return;
    }

    try {
      generatePDF(resumeData, selectedTheme, selectedTemplate);
      toast.success("High-resolution PDF generated and downloaded!");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    }
  };

  const handleLoadSample = () => {
    const sample = getAppleExecutiveSample();
    setResumeData(sample);
    setSelectedTheme("cupertino");
    setSelectedTemplate("modern");
    toast.success("Apple Executive Sample loaded successfully!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the resume? This will reset all fields.")) {
      setResumeData(initialEmptyData);
      toast.info("Resume cleared");
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${resumeData.personalInfo.fullName ? resumeData.personalInfo.fullName.replace(/\s+/g, "_") : "Resume"}_backup.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Resume backup exported as JSON!");
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.personalInfo) {
          setResumeData(parsed);
          toast.success("Resume imported successfully from JSON!");
        } else {
          toast.error("Invalid resume JSON schema.");
        }
      } catch (err) {
        toast.error("Failed to read JSON file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 text-foreground transition-colors duration-300">
      {/* Apple Liquid Glass Floating Header */}
      <header className="apple-glass sticky top-0 z-50 border-b border-border/50 shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-md specular-border">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-foreground">
                  Resume Craftsman
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  {currentYear} Edition
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Auto-saved {lastSavedTime}
                </span>
                <span>•</span>
                <span className="text-[11px]">Apple HIG Design</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="rounded-xl text-xs font-semibold h-8 border-border/70 hover:bg-secondary/60"
              title="Load full Apple Executive sample data"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Load Sample
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJSON}
              className="rounded-xl text-xs font-semibold h-8 border-border/70 hover:bg-secondary/60 hidden sm:inline-flex"
              title="Export resume data as JSON backup"
            >
              <Save className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              Export
            </Button>

            <label className="cursor-pointer">
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              <div className="inline-flex items-center justify-center rounded-xl text-xs font-semibold h-8 px-3 border border-border/70 hover:bg-secondary/60 text-foreground transition-colors cursor-pointer select-none">
                <Upload className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                Import
              </div>
            </label>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive"
              title="Reset form"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>

            <Button
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-8 px-4 text-xs shadow-md active:scale-95 transition-all"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor (5 cols) */}
          <section id="form-section" className="lg:col-span-5 space-y-6 print:hidden">
            {/* Top Config Row: Themes & Templates */}
            <div className="space-y-4">
              <ThemeSelector selectedTheme={selectedTheme} onChange={setSelectedTheme} />
              <TemplateSelector selectedTemplate={selectedTemplate} onChange={setSelectedTemplate} />
            </div>

            {/* ATS Optimizer & Score Card */}
            <ResumeScoreCard data={resumeData} />

            {/* Modular Form Sections */}
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(personalInfo) => setResumeData({ ...resumeData, personalInfo })}
            />

            <SummaryForm
              summary={resumeData.summary}
              onChange={(summary) => setResumeData({ ...resumeData, summary })}
            />

            <ExperienceForm
              experiences={resumeData.experience}
              onChange={(experience) => setResumeData({ ...resumeData, experience })}
            />

            <EducationForm
              education={resumeData.education}
              onChange={(education) => setResumeData({ ...resumeData, education })}
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={(skills) => setResumeData({ ...resumeData, skills })}
            />

            <ProjectsForm
              projects={resumeData.projects}
              onChange={(projects) => setResumeData({ ...resumeData, projects })}
            />
          </section>

          {/* Right Column: Live Sticky Preview (7 cols) */}
          <section className="lg:col-span-7 lg:sticky lg:top-20">
            {/* Live Preview Controls Toolbar */}
            <div className="print:hidden">
              <PreviewToolbar
                zoom={zoom}
                onZoomChange={setZoom}
                onToggleFullscreen={() => setIsFullscreen(true)}
                resumeData={resumeData}
              />
            </div>

            {/* Preview Sheet Canvas */}
            <div
              id="preview-container"
              className="overflow-auto max-h-[calc(100vh-140px)] rounded-2xl border border-border/50 bg-secondary/30 p-4 sm:p-6 shadow-inner transition-all flex justify-center print:overflow-visible print:max-h-none print:p-0 print:border-none print:bg-white"
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease-out",
                }}
                className="w-full flex justify-center"
              >
                {renderTemplate()}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Fullscreen Modal Preview */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Fullscreen Document Preview ({currentYear})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="h-8 rounded-xl text-xs"
              >
                Print / Save PDF
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(false)}
                className="h-8 w-8 rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex justify-center p-4">
            <div className="max-w-[850px] w-full">{renderTemplate()}</div>
          </div>
        </div>
      )}

      {/* Footer with Dynamic Year Calculation */}
      <footer className="mt-16 py-8 border-t border-border/40 bg-card/40 text-center text-xs text-muted-foreground print:hidden">
        <div className="container mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-semibold text-foreground">Resume Craftsman</span>
            <span>•</span>
            <span>Crafted with Apple Human Interface Guidelines</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Auto-updating Engine Active
            </span>
          </div>
          <p>
            © {currentYear} Rahul Kumar & Contributors. Open source on{" "}
            <a
              href="https://github.com/Rahul08319/resume-craftsman-24"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              GitHub
            </a>
            . Continuously maintained and verified for {currentYear} and future years.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
