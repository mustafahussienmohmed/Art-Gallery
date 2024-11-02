/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#58c5c7",
        foreground: "var(--foreground)",
        blue: {
          400: "#00e3e7",
          500: "#58c5c7",
          600: "#0c8a8c",
        },
      },
    },
  },
  plugins: [],
};
