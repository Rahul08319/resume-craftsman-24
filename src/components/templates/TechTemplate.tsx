import { ResumeData } from "@/types/resume";
import { formatDisplayDate, calculateDuration } from "@/utils/dateHelper";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Briefcase, GraduationCap, Code2, FolderGit, Sparkles } from "lucide-react";

interface TechTemplateProps {
  data: ResumeData;
}

export const TechTemplate = ({ data }: TechTemplateProps) => {
  const getInitials = (name: string) => {
    if (!name) return "RC";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-card text-card-foreground shadow-[var(--shadow-elegant)] rounded-2xl p-8 min-h-[1050px] max-w-[850px] mx-auto border border-border/40 font-sans print:shadow-none print:border-none print:p-6 print:rounded-none">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-border/60 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md tracking-wider flex-shrink-0">
            {getInitials(data.personalInfo.fullName)}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {data.personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-base font-semibold text-primary mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              {data.personalInfo.title || "Full Stack Engineer & System Craftsman"}
            </p>
          </div>
        </div>

        {/* Status indicator / location badge */}
        <div className="flex flex-col items-start md:items-end gap-1 text-xs text-muted-foreground">
          {data.personalInfo.location && (
            <span className="flex items-center gap-1 font-medium text-foreground/80">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {data.personalInfo.location}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Verified Profile
          </span>
        </div>
      </div>

      {/* Main Dual-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column (4 cols) - Sidebar */}
        <div className="md:col-span-4 space-y-6 md:border-r md:border-border/60 md:pr-6">
          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Contact
            </h3>
            <div className="space-y-2.5 text-xs text-foreground/80">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2 group">
                  <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.github}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Core Technical Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary/80 text-secondary-foreground border border-border/60 hover:border-primary/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h4 className="font-bold text-foreground text-sm">{edu.degree}</h4>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      {edu.field} • {formatDisplayDate(edu.startDate)} - {edu.current ? "Present" : formatDisplayDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (8 cols) - Main Content */}
        <div className="md:col-span-8 space-y-6">
          {/* Executive Summary */}
          {data.summary && (
            <div className="rounded-xl bg-secondary/30 p-4 border border-border/40">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Executive Summary
              </h2>
              <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-normal">
                {data.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5 border-b border-border/40 pb-2">
                <Briefcase className="w-3.5 h-3.5" />
                Experience & Impact
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => {
                  const duration = calculateDuration(exp.startDate, exp.endDate, exp.current);
                  return (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-primary/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="font-bold text-sm md:text-base text-foreground">
                          {exp.position}
                        </h3>
                        <span className="text-[11px] font-medium text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full w-fit">
                          {formatDisplayDate(exp.startDate)} - {exp.current ? "Present" : formatDisplayDate(exp.endDate)}
                          {duration ? ` • ${duration}` : ""}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-primary mb-2">
                        {exp.company}
                      </p>
                      {exp.description && (
                        <div className="text-xs md:text-sm text-foreground/80 leading-relaxed space-y-1">
                          {exp.description.split("\n").map((line, i) => (
                            <p key={i} className="pl-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5 border-b border-border/40 pb-2">
                <FolderGit className="w-3.5 h-3.5" />
                Featured Engineering Projects
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-bold text-xs md:text-sm text-foreground">{proj.name}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-primary hover:underline font-medium"
                        >
                          View Live ↗
                        </a>
                      )}
                    </div>
                    {proj.technologies && (
                      <p className="text-[11px] font-medium text-primary mb-1.5">
                        {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {proj.description}
                      </p>
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
