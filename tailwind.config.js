/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scan all JSX/TSX files
  theme: {
    extend: {
      colors: {
        blue: "#2937A4",
        black: "#000000",
        white: "#ffffff",
        gray: "#6C757D",
        lightGray: "#CBCBCB",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
    }, // Customize if needed
  },
  plugins: [],
};
