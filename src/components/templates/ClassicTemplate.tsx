import { ResumeData } from "@/types/resume";
import { formatDisplayDate, calculateDuration } from "@/utils/dateHelper";
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  return (
    <div className="bg-card text-card-foreground shadow-[var(--shadow-elegant)] rounded-2xl p-8 min-h-[1050px] max-w-[850px] mx-auto border border-border/40 font-serif print:shadow-none print:border-none print:p-6 print:rounded-none">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Sidebar */}
        <div className="md:col-span-1 space-y-6 md:border-r border-border/60 md:pr-6">
          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest font-sans border-b border-border/60 pb-1">
              Contact
            </h2>
            <div className="space-y-2 text-xs font-sans text-foreground/80">
              {data.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-start gap-2">
                  <Github className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.github}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest font-sans border-b border-border/60 pb-1">
                Competencies
              </h2>
              <div className="space-y-1 font-sans">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-xs text-foreground/80 py-1 border-b border-border/40 last:border-0">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in left column for Classic balance */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest font-sans border-b border-border/60 pb-1">
                Education
              </h2>
              <div className="space-y-3 font-sans">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-xs text-foreground">{edu.degree}</h3>
                    <p className="text-xs text-primary font-medium">{edu.institution}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {edu.field} • {formatDisplayDate(edu.startDate)} – {edu.current ? "Present" : formatDisplayDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div className="border-b border-border/60 pb-4">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              {data.personalInfo.fullName || "Your Full Name"}
            </h1>
            {data.personalInfo.title && (
              <p className="text-sm font-semibold text-primary font-sans mt-0.5 uppercase tracking-wider">
                {data.personalInfo.title}
              </p>
            )}
            {data.summary && (
              <p className="text-xs md:text-sm text-foreground/90 leading-relaxed mt-3 italic">
                "{data.summary}"
              </p>
            )}
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest font-sans border-b-2 border-primary pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => {
                  const duration = calculateDuration(exp.startDate, exp.endDate, exp.current);
                  return (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="font-bold text-sm text-foreground">{exp.position}</h3>
                        <span className="text-[11px] font-sans text-muted-foreground">
                          {formatDisplayDate(exp.startDate)} – {exp.current ? "Present" : formatDisplayDate(exp.endDate)}
                          {duration ? ` (${duration})` : ""}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-primary font-semibold mb-1.5">{exp.company}</p>
                      {exp.description && (
                        <div className="text-xs font-sans text-foreground/80 leading-relaxed space-y-1">
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

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest font-sans border-b-2 border-primary pb-1">
                Notable Projects & Works
              </h2>
              <div className="space-y-3 font-sans">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="border-b border-border/40 pb-2.5 last:border-0">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-bold text-xs text-foreground">{proj.name}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                          View Project ↗
                        </a>
                      )}
                    </div>
                    {proj.technologies && (
                      <p className="text-[11px] text-primary font-medium mb-1">{proj.technologies}</p>
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
      </div>
    </div>
  );
};
