import { ResumeTemplate, templateNames } from "@/types/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Layout } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onChange: (template: ResumeTemplate) => void;
}

export const TemplateSelector = ({ selectedTemplate, onChange }: TemplateSelectorProps) => {
  const templates: ResumeTemplate[] = ["modern", "classic", "minimalist"];

  return (
    <Card className="shadow-[var(--shadow-card)] border-border">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Layout className="h-5 w-5" />
          Resume Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template}
              onClick={() => onChange(template)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedTemplate === template
                  ? "border-primary shadow-[var(--shadow-card)]"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Label className="cursor-pointer text-sm font-medium">
                {templateNames[template]}
              </Label>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
