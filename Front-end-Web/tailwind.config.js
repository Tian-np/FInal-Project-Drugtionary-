module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
  // plugins: [require("daisyui")],

  variants: {
    scrollbar: ["dark"],
  },
  darkMode: "media",
};
