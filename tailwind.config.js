/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
      backgroundColor: {
        "dark-blue-1": "#000814",
        "dark-blue-2": "#001D3D",
        "dark-blue-3": "#003566",
      },
      textColor: {
        yellow: "#FFC300",
        "light-yellow": "#FFD60A",
      },
      borderColor: {
        "dark-blue-1": "#000814",
      },
      boxShadow: {
        "dark-blue-1":
          "0 1px 3px 0 rgba(0, 8, 20, 0.1), 0 1px 2px 0 rgba(0, 8, 20, 0.06)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
