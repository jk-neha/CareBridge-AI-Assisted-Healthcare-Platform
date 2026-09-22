/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral surface scale (slight green-grey tint, not pure grey)
        canvas: {
          DEFAULT: "#F6F7F5",
          subtle: "#EFF1EE",
        },
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#152420",
          soft: "#3E4A46",
          muted: "#6B756F",
          faint: "#9AA39D",
        },
        line: {
          DEFAULT: "#E4E7E2",
          strong: "#D2D6CE",
        },
        // Primary: deep clinical green — trust, calm, health
        primary: {
          50: "#EAF4EF",
          100: "#CFE7DA",
          200: "#A3D0B7",
          300: "#71B692",
          400: "#469C72",
          500: "#0B6E4F",
          600: "#095C41",
          700: "#084A35",
          800: "#083B2B",
          900: "#082F23",
        },
        // Secondary: muted clinical blue — informational accents
        accent: {
          50: "#EAF2F6",
          100: "#CFE1EA",
          200: "#9FC3D6",
          300: "#6EA4C1",
          400: "#4988AC",
          500: "#2D6E8E",
          600: "#255C77",
          700: "#1E4A61",
        },
        warning: {
          50: "#FBF1E3",
          100: "#F4DBAE",
          500: "#B7791F",
          600: "#96631A",
        },
        danger: {
          50: "#FBEAE9",
          100: "#F3C9C6",
          500: "#B3261E",
          600: "#941F19",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.625rem",
      },
      boxShadow: {
        elevated: "0 8px 24px -8px rgba(21, 36, 32, 0.18)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
