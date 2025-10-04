import { useState } from "react";
import { ResumeData } from "@/types/resume";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { SummaryForm } from "@/components/SummaryForm";
import { ExperienceForm } from "@/components/ExperienceForm";
import { EducationForm } from "@/components/EducationForm";
import { SkillsForm } from "@/components/SkillsForm";
import { ProjectsForm } from "@/components/ProjectsForm";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const handleDownload = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      toast.error("Please fill in at least your name and email");
      return;
    }

    try {
      generatePDF(resumeData);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-[var(--shadow-card)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Resume Builder
            </h1>
          </div>
          <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-card)]">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(personalInfo) =>
                setResumeData({ ...resumeData, personalInfo })
              }
            />
            <SummaryForm
              summary={resumeData.summary}
              onChange={(summary) =>
                setResumeData({ ...resumeData, summary })
              }
            />
            <ExperienceForm
              experiences={resumeData.experience}
              onChange={(experience) =>
                setResumeData({ ...resumeData, experience })
              }
            />
            <EducationForm
              education={resumeData.education}
              onChange={(education) =>
                setResumeData({ ...resumeData, education })
              }
            />
            <SkillsForm
              skills={resumeData.skills}
              onChange={(skills) =>
                setResumeData({ ...resumeData, skills })
              }
            />
            <ProjectsForm
              projects={resumeData.projects}
              onChange={(projects) =>
                setResumeData({ ...resumeData, projects })
              }
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Live Preview</h2>
              <p className="text-sm text-muted-foreground">
                Your resume updates in real-time as you type
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 overflow-auto max-h-[calc(100vh-200px)]">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
