export type ColorTheme = "professional" | "fresh" | "creative" | "warm";
export type ResumeTemplate = "modern" | "classic" | "minimalist";

export interface ThemeColors {
  primary: string;
  primaryRgb: { r: number; g: number; b: number };
  accent: string;
}

export const themeColors: Record<ColorTheme, ThemeColors> = {
  professional: {
    primary: "220 85% 45%",
    primaryRgb: { r: 17, g: 78, b: 216 },
    accent: "200 95% 50%",
  },
  fresh: {
    primary: "142 76% 36%",
    primaryRgb: { r: 22, g: 163, b: 74 },
    accent: "160 84% 39%",
  },
  creative: {
    primary: "271 91% 65%",
    primaryRgb: { r: 147, g: 51, b: 234 },
    accent: "280 100% 70%",
  },
  warm: {
    primary: "25 95% 53%",
    primaryRgb: { r: 249, g: 115, b: 22 },
    accent: "45 93% 58%",
  },
};

export const themeNames: Record<ColorTheme, string> = {
  professional: "Professional Blue",
  fresh: "Fresh Green",
  creative: "Creative Purple",
  warm: "Warm Orange",
};

export const templateNames: Record<ResumeTemplate, string> = {
  modern: "Modern",
  classic: "Classic",
  minimalist: "Minimalist",
};
