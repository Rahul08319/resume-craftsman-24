import { ResumeData } from "@/types/resume";
import { CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";

interface ResumeScoreCardProps {
  data: ResumeData;
}

export const ResumeScoreCard = ({ data }: ResumeScoreCardProps) => {
  // Calculate score breakdown
  const checks = [
    {
      label: "Full Name & Contact Info",
      passed: Boolean(data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone),
      weight: 20,
      tip: "Add full name, professional email, and phone number.",
    },
    {
      label: "Professional Summary",
      passed: Boolean(data.summary && data.summary.trim().length >= 50),
      weight: 15,
      tip: "Write a summary of at least 50 characters with your career focus.",
    },
    {
      label: "Work Experience & Metrics",
      passed: Boolean(data.experience.length >= 1 && data.experience.some((e) => e.description.length > 30)),
      weight: 25,
      tip: "Include quantifiable achievements (%, $, numbers) in experience.",
    },
    {
      label: "Education Details",
      passed: Boolean(data.education.length >= 1 && data.education[0].institution && data.education[0].degree),
      weight: 15,
      tip: "List your degree and academic institution.",
    },
    {
      label: "Skills Diversity (5+ skills)",
      passed: Boolean(data.skills.length >= 5),
      weight: 15,
      tip: "Include at least 5 relevant technical or soft skills.",
    },
    {
      label: "Key Projects / Portfolio",
      passed: Boolean(data.projects.length >= 1),
      weight: 10,
      tip: "Highlight 1 or more key projects with technologies used.",
    },
  ];

  const totalScore = checks.reduce((acc, curr) => acc + (curr.passed ? curr.weight : 0), 0);

  const getScoreColor = () => {
    if (totalScore >= 90) return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
    if (totalScore >= 70) return "text-primary border-primary/30 bg-primary/10";
    return "text-amber-500 border-amber-500/30 bg-amber-500/10";
  };

  const getScoreLabel = () => {
    if (totalScore >= 90) return "Apple Executive Caliber";
    if (totalScore >= 70) return "ATS Optimized & Strong";
    if (totalScore >= 50) return "Good Progress";
    return "Draft Mode";
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl border border-border/60 p-5 shadow-[var(--shadow-card)] space-y-4 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">ATS Resume Score</h3>
            <p className="text-xs text-muted-foreground">Real-time craft & screening check</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreColor()}`}>
            {totalScore}% • {getScoreLabel()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${totalScore}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
          <span>Completeness</span>
          <span>Target: 90%+ for top interviews</span>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40">
        {checks.map((check, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 p-2 rounded-lg text-xs transition-colors ${
              check.passed ? "bg-secondary/30 text-foreground" : "bg-muted/30 text-muted-foreground"
            }`}
          >
            {check.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <p className={`font-medium ${check.passed ? "text-foreground" : "text-muted-foreground"}`}>
                {check.label}
              </p>
              {!check.passed && <p className="text-[11px] text-muted-foreground/80 mt-0.5">{check.tip}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
