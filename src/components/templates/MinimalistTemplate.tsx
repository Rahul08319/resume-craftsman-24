import { ResumeData } from "@/types/resume";

interface MinimalistTemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate = ({ data }: MinimalistTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-card shadow-[var(--shadow-elegant)] rounded-lg p-8 min-h-[1000px] max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-border">
        <h1 className="text-4xl font-light text-foreground mb-3 tracking-tight">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mt-2">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && data.personalInfo.linkedin && <span>•</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-center text-foreground leading-relaxed italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-foreground">{exp.position}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-foreground">{edu.degree}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
            Skills
          </h2>
          <p className="text-sm text-foreground">{data.skills.join(" • ")}</p>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-widest">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-medium text-foreground mb-1">{proj.name}</h3>
                {proj.technologies && (
                  <p className="text-xs text-muted-foreground mb-1">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className="text-sm text-foreground leading-relaxed mb-1">{proj.description}</p>
                )}
                {proj.link && (
                  <a href={proj.link} className="text-xs text-accent hover:underline">
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
