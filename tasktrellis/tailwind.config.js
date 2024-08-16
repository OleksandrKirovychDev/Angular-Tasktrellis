/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        warning: "#ECB800",
        primary: {
          100: "#F0F0FF",
          200: "#51a4d3",
          300: "#298fc9",
          500: "#7B79FF",
          600: "#4945FF",
          650: "#3f51b5",
          700: "#2B1887",
        },
        error: {
          100: "#FCECEA",
          200: "#F5C0B8",
          400: "#F85E54",
          500: "#E9584F",
          600: "#D02B20",
          700: "#B72B1A",
        },
        neutral: {
          100: "#F6F6F9",
          200: "#DCDCE4",
          300: "#C0C0CF",
          600: "#666687",
          700: "#666687",
          800: "#32324D",
        },
        blue: {
          500: "#0079bf",
          400: "#0066A0",
        },
        "main-section-blue": "#0079bf",
        success: {
          100: "#EAFBE7",
          200: "#C6F0C2",
          500: "#5CB176",
          600: "#328048",
          700: "#2F6846",
          DEFAULT: "#5CB176",
        },
        white: "#fff",
        "white-darker": "#F4F2FF",
        "purple-grey": "#9E9CFDFF",
        purple: "#8ca3ee",
        pink: "#FFDADAFF",
        grey: {
          700: "#8E8EA9",
          600: "#D9D9D9",
          500: "#F6F6F9",
          400: "#DCDCE4",
          300: "#EAEAEF",
          100: "#f3f4f6",
        },
        yellow: {
          300: "#fde047",
          400: "#facc15",
        },
        "light-grey": "#ebecf0",
        "dark-grey": "#8a8a8a",
      },
      fontSize: {
        xxs: ["10px", "12px"],
        xs: ["12px", "18px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "22px"],
        xl: ["50px", "60px"],
      },
      opacity: {
        0.6: "60%",
      },
      boxShadow: {
        "custom-l": "0px 11px 51px 9px rgba(216, 216, 216, 0.97)",
      },
    },
  },
  plugins: [],
};
