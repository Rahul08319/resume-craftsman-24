import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Code, FolderGit } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-card shadow-[var(--shadow-elegant)] rounded-lg p-8 min-h-[1000px] max-w-[800px] mx-auto">
      <div className="border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3">Professional Summary</h2>
          <p className="text-foreground leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-primary/30 pl-4">
                <h3 className="font-semibold text-lg text-foreground">{exp.position}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-primary/30 pl-4">
                <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
                <p className="text-primary font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.field} • {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <FolderGit className="h-5 w-5" />
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-primary/30 pl-4">
                <h3 className="font-semibold text-lg text-foreground">{proj.name}</h3>
                {proj.technologies && (
                  <p className="text-sm text-primary font-medium mb-1">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className="text-foreground leading-relaxed mb-1">{proj.description}</p>
                )}
                {proj.link && (
                  <a href={proj.link} className="text-sm text-accent hover:underline">
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
