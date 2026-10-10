import { ResumeData } from "@/types/resume";
import { formatDisplayDate, calculateDuration } from "@/utils/dateHelper";

interface MinimalistTemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate = ({ data }: MinimalistTemplateProps) => {
  return (
    <div className="bg-card text-card-foreground shadow-[var(--shadow-elegant)] rounded-2xl p-8 min-h-[1050px] max-w-[850px] mx-auto border border-border/40 font-sans print:shadow-none print:border-none print:p-6 print:rounded-none">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-border/60">
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-1.5 tracking-tight">
          {data.personalInfo.fullName || "Your Full Name"}
        </h1>
        {data.personalInfo.title && (
          <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">
            {data.personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.website) && (
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-2">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.github && <span>•</span>}
            {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
            {data.personalInfo.website && <span>•</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 max-w-2xl mx-auto">
          <p className="text-center text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-primary mb-4 uppercase tracking-widest border-b border-border/40 pb-1">
            Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => {
              const duration = calculateDuration(exp.startDate, exp.endDate, exp.current);
              return (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-0.5">
                    <h3 className="font-semibold text-sm text-foreground">{exp.position}</h3>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDisplayDate(exp.startDate)} – {exp.current ? "Present" : formatDisplayDate(exp.endDate)}
                      {duration ? ` • ${duration}` : ""}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-1.5">{exp.company}</p>
                  {exp.description && (
                    <div className="text-xs text-foreground/80 leading-relaxed space-y-1">
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
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-primary mb-4 uppercase tracking-widest border-b border-border/40 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-semibold text-xs text-foreground">{edu.degree}</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {formatDisplayDate(edu.startDate)} – {edu.current ? "Present" : formatDisplayDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {edu.institution} • {edu.field}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-primary mb-3 uppercase tracking-widest border-b border-border/40 pb-1">
            Skills
          </h2>
          <p className="text-xs text-foreground/85 leading-relaxed tracking-wide">
            {data.skills.join("  •  ")}
          </p>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-primary mb-4 uppercase tracking-widest border-b border-border/40 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between mb-0.5">
                  <h3 className="font-semibold text-xs text-foreground">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-primary hover:underline">
                      Link ↗
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-[11px] text-primary/80 mb-1">{proj.technologies}</p>
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
