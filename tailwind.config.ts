import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            background: colors.slate[50],
            foreground: colors.black,
            primary: { ...colors.pink, DEFAULT: colors.pink["600"], foreground: "#FFFFFF" },
            secondary: colors.indigo,
            warning: colors.amber,
            success: colors.emerald,
            danger: colors.red,
          },
        },
        dark: {
          colors: {
            background: "#111111",
            foreground: colors.white,
            primary: { ...colors.pink, DEFAULT: colors.pink["600"], foreground: "#FFFFFF" },
            secondary: colors.indigo,
            warning: colors.amber,
            success: colors.emerald,
            danger: colors.red,
          },
        },
      },
    }),
  ],
};
export default config;
