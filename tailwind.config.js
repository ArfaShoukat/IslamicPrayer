/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Tells Tailwind to scan all .js/.jsx/.ts/.tsx files in src folder
  ],
  theme: {
    extend: {},                     // 👇 You can customize your theme here (like adding colors/fonts)
  },
  plugins: [],                      // 👇 You can add Tailwind plugins here if needed
};
