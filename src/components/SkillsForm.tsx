import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      onChange([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)]">
      <CardHeader>
        <CardTitle className="text-primary">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a skill and press Enter"
            className="flex-1"
          />
          <Button onClick={addSkill} size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border border-border rounded-lg bg-muted/30">
          {skills.length === 0 ? (
            <p className="text-muted-foreground text-sm w-full text-center py-2">
              No skills added yet
            </p>
          ) : (
            skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="pl-3 pr-1 py-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-[var(--transition-smooth)]"
              >
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
