import { ResumeTemplate, templateNames, templateDescriptions } from "@/types/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onChange: (template: ResumeTemplate) => void;
}

export const TemplateSelector = ({ selectedTemplate, onChange }: TemplateSelectorProps) => {
  const templates: ResumeTemplate[] = ["modern", "tech", "classic", "minimalist"];

  return (
    <Card className="shadow-[var(--shadow-card)] border-border/60 rounded-2xl bg-card">
      <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <Layout className="h-4 w-4 text-primary" />
            Resume Template
          </CardTitle>
          <span className="text-[11px] font-medium text-muted-foreground">
            {templateNames[selectedTemplate]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template;
            return (
              <button
                key={template}
                type="button"
                onClick={() => onChange(template)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 active:scale-[0.98] ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30"
                    : "border-border/60 hover:border-primary/40 hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    {templateNames[template]}
                  </span>
                  {template === "tech" && (
                    <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-1.5 py-0.2 rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                  {templateDescriptions[template]}
                </p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
