/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        main: "#f5f5f5",
      },
      colors: {
        heading: "rgba(175, 47, 47, 0.15)",
      },
      boxShadow: {
        inputShadow: "0 2px 5px 0 rgb(0 0 0 / 20%);",
        initialShadow: "inset 0 -2px 1px rgba(0,0,0,0.03)",
      },
      borderColor: {
        borderLine: "#ededed",
      },
    },
  },
  plugins: [],
};
