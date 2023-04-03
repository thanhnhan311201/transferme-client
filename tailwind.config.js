/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#f7f9fc",
        "modal-user": "#f3f6fc",
        "3c4043": "#3c4043",
        "5f6368": "#5f6368",
        e0e9f8: "#e0e9f8",
        e1e5ea: "#e1e5ea",
      },
      gridTemplateColumns: {
        "2-for-transferLayout": "320px auto",
      },
      gridTemplateRows: {
        "2-for-transferLayout": "auto 1fr",
      },
      boxShadow: {
        "user-nav":
          "0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)",
      },
    },
  },
  plugins: [],
};
