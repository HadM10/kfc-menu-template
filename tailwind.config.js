/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      height: {
        112: '28rem', // Add this line if you want to define h-112
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
