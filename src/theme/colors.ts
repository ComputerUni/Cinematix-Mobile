export const Colors = {
  background: "#1A1A24",
  card: "#222831",
  cardElevated: "#2D3440",

  inputBackground: "rgba(255, 255, 255, 0.05)",
  inputBorder: "rgba(255, 255, 255, 0.1)",
  inputFocusedBorder: "#FFD369",

  accent: "#FFD369",
  accentHover: "#E5BC57",
  accentMuted: "rgba(255, 211, 105, 0.15)",

  textPrimary: "#EEEEEE",
  textSecondary: "#8D99AE",
  textMuted: "#5C6479",
  textInverse: "#1A1A24",

  rating: "#FFD369",
  success: "#4EBA6F",
  error: "#E50914",
  warning: "#FFAA00",

  border: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(255, 255, 255, 0.15)",

  overlay: "rgba(0, 0, 0, 0.6)",
  posterGradient: [
    "transparent",
    "rgba(26, 26, 36, 0.8)",
    "#1A1A24",
  ],
} as const;

export type ColorType = typeof Colors;