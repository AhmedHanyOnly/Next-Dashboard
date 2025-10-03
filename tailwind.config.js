module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff8080", 
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // <-- هنا
  ],
};
