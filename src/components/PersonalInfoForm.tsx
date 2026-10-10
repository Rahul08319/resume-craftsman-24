import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfo } from "@/types/resume";
import { User, Sparkles } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border/60 rounded-2xl bg-card transition-all duration-300">
      <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Personal & Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 sm:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. Rahul Kumar"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold text-foreground">
              Professional Title / Role
            </Label>
            <Input
              id="title"
              value={data.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Lead Systems Architect & Platform Engineer"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="rahul@example.com"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold text-foreground">
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (408) 555-0199"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-xs font-semibold text-foreground">
              Location / City & Country *
            </Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Cupertino, CA"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="linkedin" className="text-xs font-semibold text-foreground">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/rahulkumar"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="github" className="text-xs font-semibold text-foreground">
              GitHub Profile
            </Label>
            <Input
              id="github"
              value={data.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="github.com/Rahul08319"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-xs font-semibold text-foreground">
              Portfolio / Website
            </Label>
            <Input
              id="website"
              value={data.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="rahulkumar.dev"
              className="rounded-xl border-border/70 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
