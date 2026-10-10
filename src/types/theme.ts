export type ColorTheme =
  | "cupertino"
  | "midnight"
  | "alpine"
  | "sunset"
  | "violet"
  | "titanium"
  | "professional"
  | "fresh"
  | "creative"
  | "warm";

export type ResumeTemplate = "modern" | "classic" | "minimalist" | "tech";

export interface ThemeColors {
  primary: string;
  primaryRgb: { r: number; g: number; b: number };
  accent: string;
  accentRgb: { r: number; g: number; b: number };
  description: string;
}

export const themeColors: Record<ColorTheme, ThemeColors> = {
  cupertino: {
    primary: "212 100% 45%", // Apple Cupertino Blue (#0071e3)
    primaryRgb: { r: 0, g: 113, b: 227 },
    accent: "199 89% 48%",
    accentRgb: { r: 14, g: 165, b: 233 },
    description: "Signature Apple System Blue with refined clarity",
  },
  midnight: {
    primary: "240 6% 14%", // Apple Space Black / Midnight (#1f2024)
    primaryRgb: { r: 31, g: 32, b: 36 },
    accent: "212 100% 45%",
    accentRgb: { r: 0, g: 113, b: 227 },
    description: "Deep Space Black with high-contrast precision",
  },
  alpine: {
    primary: "142 71% 40%", // Apple Alpine Green (#28a745)
    primaryRgb: { r: 40, g: 167, b: 69 },
    accent: "160 84% 39%",
    accentRgb: { r: 16, g: 185, b: 129 },
    description: "Cupertino Alpine Forest Green with vibrant accents",
  },
  sunset: {
    primary: "28 95% 50%", // Cupertino Golden Hour (#f56300)
    primaryRgb: { r: 245, g: 99, b: 0 },
    accent: "45 93% 58%",
    accentRgb: { r: 245, g: 158, b: 11 },
    description: "Warm California Sunset with energetic amber glow",
  },
  violet: {
    primary: "272 85% 58%", // VisionOS Liquid Violet (#af52de)
    primaryRgb: { r: 175, g: 82, b: 222 },
    accent: "290 90% 65%",
    accentRgb: { r: 217, g: 70, b: 239 },
    description: "VisionOS Aurora Violet with translucent depth",
  },
  titanium: {
    primary: "220 9% 46%", // Natural Titanium (#70757d)
    primaryRgb: { r: 112, g: 117, b: 125 },
    accent: "210 20% 25%",
    accentRgb: { r: 51, g: 65, b: 85 },
    description: "Brushed Natural Titanium with pure editorial poise",
  },
  // Backward compatibility aliases
  professional: {
    primary: "212 100% 45%",
    primaryRgb: { r: 0, g: 113, b: 227 },
    accent: "199 89% 48%",
    accentRgb: { r: 14, g: 165, b: 233 },
    description: "Professional Cupertino Blue",
  },
  fresh: {
    primary: "142 71% 40%",
    primaryRgb: { r: 40, g: 167, b: 69 },
    accent: "160 84% 39%",
    accentRgb: { r: 16, g: 185, b: 129 },
    description: "Fresh Alpine Green",
  },
  creative: {
    primary: "272 85% 58%",
    primaryRgb: { r: 175, g: 82, b: 222 },
    accent: "290 90% 65%",
    accentRgb: { r: 217, g: 70, b: 239 },
    description: "Creative VisionOS Violet",
  },
  warm: {
    primary: "28 95% 50%",
    primaryRgb: { r: 245, g: 99, b: 0 },
    accent: "45 93% 58%",
    accentRgb: { r: 245, g: 158, b: 11 },
    description: "Warm Sunset Orange",
  },
};

export const themeNames: Record<ColorTheme, string> = {
  cupertino: "Cupertino Blue",
  midnight: "Space Midnight",
  alpine: "Alpine Green",
  sunset: "Sunset Orange",
  violet: "Liquid Violet",
  titanium: "Natural Titanium",
  professional: "Professional Blue",
  fresh: "Fresh Green",
  creative: "Creative Purple",
  warm: "Warm Orange",
};

export const templateNames: Record<ResumeTemplate, string> = {
  modern: "Cupertino Modern",
  classic: "Executive Classic",
  minimalist: "Minimalist Titanium",
  tech: "Silicon Valley Tech",
};

export const templateDescriptions: Record<ResumeTemplate, string> = {
  modern: "Signature Apple aesthetic with hairline dividers, pill badges, and refined hierarchy.",
  classic: "Distinguished editorial typography with balanced symmetry and timeless prestige.",
  minimalist: "Maximum whitespace with high-contrast typographical pacing and pure clarity.",
  tech: "High-density dual column layout tailored for engineering, architecture, and technology leadership.",
};
