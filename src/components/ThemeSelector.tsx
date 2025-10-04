import { ColorTheme, themeNames } from "@/types/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
}

export const ThemeSelector = ({ selectedTheme, onChange }: ThemeSelectorProps) => {
  const themes: ColorTheme[] = ["professional", "fresh", "creative", "warm"];

  const themeColors: Record<ColorTheme, string> = {
    professional: "bg-[#114ED8]",
    fresh: "bg-[#16A34A]",
    creative: "bg-[#9333EA]",
    warm: "bg-[#F97316]",
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => onChange(theme)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedTheme === theme
                  ? "border-primary shadow-[var(--shadow-card)]"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${themeColors[theme]}`} />
                <Label className="cursor-pointer text-sm font-medium">
                  {themeNames[theme]}
                </Label>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
