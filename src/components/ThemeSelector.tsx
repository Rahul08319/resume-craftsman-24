import { ColorTheme, themeNames, themeColors } from "@/types/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
}

export const ThemeSelector = ({ selectedTheme, onChange }: ThemeSelectorProps) => {
  // Apple curated theme options
  const themes: ColorTheme[] = [
    "cupertino",
    "midnight",
    "alpine",
    "sunset",
    "violet",
    "titanium",
  ];

  const themeDisplayColors: Record<ColorTheme, string> = {
    cupertino: "bg-[#0071e3]",
    midnight: "bg-[#1f2024]",
    alpine: "bg-[#28a745]",
    sunset: "bg-[#f56300]",
    violet: "bg-[#af52de]",
    titanium: "bg-[#70757d]",
    professional: "bg-[#0071e3]",
    fresh: "bg-[#28a745]",
    creative: "bg-[#af52de]",
    warm: "bg-[#f56300]",
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border/60 rounded-2xl bg-card">
      <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Apple System Color
          </CardTitle>
          <span className="text-[11px] font-medium text-muted-foreground">
            {themeNames[selectedTheme] || "Cupertino Blue"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => onChange(theme)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all duration-200 active:scale-[0.98] ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30"
                    : "border-border/60 hover:border-primary/40 hover:bg-secondary/40"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 shadow-sm ${themeDisplayColors[theme]}`}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {themeNames[theme]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
