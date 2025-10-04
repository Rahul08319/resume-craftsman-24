import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm = ({ summary, onChange }: SummaryFormProps) => {
  return (
    <Card className="shadow-[var(--shadow-card)] border-border transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)]">
      <CardHeader>
        <CardTitle className="text-primary">Professional Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="summary">Brief overview of your professional background</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software engineer with 5+ years in full-stack development..."
          className="min-h-[120px] border-input focus:ring-ring resize-none"
        />
      </CardContent>
    </Card>
  );
};
