import { ResumeData } from "@/types/resume";
import { formatDisplayDate, calculateDuration } from "@/utils/dateHelper";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Briefcase, GraduationCap, Code2, FolderGit, Sparkles } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="bg-card text-card-foreground shadow-[var(--shadow-elegant)] rounded-2xl p-8 min-h-[1050px] max-w-[850px] mx-auto border border-border/40 font-sans print:shadow-none print:border-none print:p-6 print:rounded-none">
      {/* Header */}
      <div className="border-b border-primary/20 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {data.personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-base font-semibold text-primary mt-1">
              {data.personalInfo.title || "Full Stack Software Craftsman"}
            </p>
          </div>
          {data.personalInfo.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Linkedin className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Github className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal bg-secondary/20 p-3.5 rounded-xl border border-border/40">
            {data.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-3.5 flex items-center gap-2 border-b border-border/40 pb-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => {
              const duration = calculateDuration(exp.startDate, exp.endDate, exp.current);
              return (
                <div key={exp.id} className="border-l-2 border-primary/40 pl-3.5 py-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground">{exp.position}</h3>
                    <span className="text-[11px] font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full w-fit">
                      {formatDisplayDate(exp.startDate)} – {exp.current ? "Present" : formatDisplayDate(exp.endDate)}
                      {duration ? ` • ${duration}` : ""}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary mb-1.5">{exp.company}</p>
                  {exp.description && (
                    <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed space-y-1">
                      {exp.description.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-3.5 flex items-center gap-2 border-b border-border/40 pb-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            Education & Certifications
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-primary/40 pl-3.5 py-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-bold text-sm text-foreground">{edu.degree}</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {formatDisplayDate(edu.startDate)} – {edu.current ? "Present" : formatDisplayDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-primary font-semibold">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-border/40 pb-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Technical & Leadership Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium hover:bg-primary/15 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-3.5 flex items-center gap-2 border-b border-border/40 pb-1.5">
            <FolderGit className="h-3.5 w-3.5" />
            Key Projects & Open Source
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-primary/40 pl-3.5 py-0.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground">{proj.name}</h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      View Project ↗
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-[11px] text-primary font-semibold mb-1">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className="text-xs text-foreground/80 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
