import { useState } from "react";
import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Copy, Check, Printer, FileText } from "lucide-react";
import { toast } from "sonner";

interface PreviewToolbarProps {
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  onToggleFullscreen: () => void;
  resumeData: ResumeData;
}

export const PreviewToolbar = ({
  zoom,
  onZoomChange,
  onToggleFullscreen,
  resumeData,
}: PreviewToolbarProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    let md = `# ${resumeData.personalInfo.fullName || "Resume"}\n`;
    if (resumeData.personalInfo.title) md += `**${resumeData.personalInfo.title}**\n\n`;
    md += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n\n`;

    if (resumeData.summary) {
      md += `## Professional Summary\n${resumeData.summary}\n\n`;
    }

    if (resumeData.experience.length > 0) {
      md += `## Experience\n`;
      resumeData.experience.forEach((e) => {
        md += `### ${e.position} at ${e.company}\n*${e.startDate} - ${e.current ? "Present" : e.endDate}*\n${e.description}\n\n`;
      });
    }

    if (resumeData.education.length > 0) {
      md += `## Education\n`;
      resumeData.education.forEach((ed) => {
        md += `### ${ed.degree} - ${ed.institution}\n*${ed.field} (${ed.startDate} - ${ed.current ? "Present" : ed.endDate})*\n\n`;
      });
    }

    if (resumeData.skills.length > 0) {
      md += `## Skills\n${resumeData.skills.join(", ")}\n\n`;
    }

    if (resumeData.projects.length > 0) {
      md += `## Projects\n`;
      resumeData.projects.forEach((p) => {
        md += `### ${p.name}\n${p.technologies ? `*${p.technologies}*\n` : ""}${p.description}\n\n`;
      });
    }

    navigator.clipboard.writeText(md);
    setCopied(true);
    toast.success("Resume copied as Markdown to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-card/80 backdrop-blur-md border border-border/60 rounded-xl shadow-sm mb-3 text-xs">
      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground mr-1 hidden sm:inline font-medium">Zoom:</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-lg"
          onClick={() => onZoomChange(Math.max(0.6, zoom - 0.1))}
          title="Zoom out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <span className="px-1.5 font-mono text-[11px] text-foreground font-semibold min-w-[42px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-lg"
          onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
          title="Zoom in"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg text-muted-foreground"
          onClick={() => onZoomChange(1)}
          title="Reset zoom to 100%"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 rounded-lg text-xs font-medium"
          onClick={handleCopyMarkdown}
          title="Copy formatted markdown"
        >
          {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
          <span>{copied ? "Copied" : "Copy MD"}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 rounded-lg text-xs font-medium"
          onClick={handlePrint}
          title="Direct print or Save as PDF via browser"
        >
          <Printer className="h-3.5 w-3.5 mr-1" />
          <span>Print</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-lg"
          onClick={onToggleFullscreen}
          title="Toggle Fullscreen Preview"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
