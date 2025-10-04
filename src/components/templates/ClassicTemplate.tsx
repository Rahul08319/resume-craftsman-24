import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-card shadow-[var(--shadow-elegant)] rounded-lg p-8 min-h-[1000px] max-w-[800px] mx-auto">
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Sidebar */}
        <div className="col-span-1 space-y-6 border-r-2 border-primary/20 pr-6">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-xs break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-xs break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide">Skills</h2>
              <div className="space-y-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm text-foreground py-1 border-b border-border last:border-0">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2 uppercase tracking-wide">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            {data.summary && (
              <p className="text-sm text-foreground leading-relaxed mt-3">{data.summary}</p>
            )}
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide border-b-2 border-primary pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-foreground">{exp.position}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
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
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide border-b-2 border-primary pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-primary font-medium">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.field} • {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide border-b-2 border-primary pb-1">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-foreground">{proj.name}</h3>
                    {proj.technologies && (
                      <p className="text-xs text-primary font-medium mb-1">{proj.technologies}</p>
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
      </div>
    </div>
  );
};
