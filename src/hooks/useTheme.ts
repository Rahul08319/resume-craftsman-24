import { useEffect } from "react";
import { ColorTheme, themeColors } from "@/types/theme";

export const useTheme = (theme: ColorTheme) => {
  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];

    // Update CSS variables
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
  }, [theme]);
};
