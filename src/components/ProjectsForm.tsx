import { Project } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    onChange([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-primary">Projects</CardTitle>
        <Button onClick={addProject} size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No projects added yet</p>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 border border-border rounded-lg space-y-4 bg-card transition-[var(--transition-smooth)] hover:border-primary/30"
            >
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                  placeholder="Brief description of the project..."
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <Input
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="space-y-2">
                <Label>Project Link (Optional)</Label>
                <Input
                  value={proj.link || ""}
                  onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
