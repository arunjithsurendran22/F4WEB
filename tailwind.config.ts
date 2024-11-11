import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/page-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: "#002E59",
        customRed: "#E53935",
        customRed2: "#FFEDED",
        customRed3: "#F70000",
        customBlack: "#1A1A1A",
        customBlueLight: "#015DB3",
        customBlueLight2: "#F6F8FE",
        customBlueLight3: "#E4F2FF",
        customGrayLight: "#D9D9D9",
        customGrayLight2: "#999999",
        customGrayLight3: "#333333",
        customGrayLight4: " #ECF1F6",
        customGrayLight5: "#66707A",
        customGrayLight6: "#F6F6F6",
        customYellow: "#FACC15",
        customYellowLight: "#F7B83029",
        subscribe: "#F7F7F7",
        buttonColor: "#015DB3",
        customGreenLite: "#20B526",
        customGreenLite2: "#00C566",
        customGreenLite3: " #E6F9F0",
        gradientBlueStart: "#DFEFFF",
        gradientBlueEnd: "#73BBFF",
      },
    },
  },
  plugins: [],
};
export default config;
