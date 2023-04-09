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
        "46ab5e": "#46ab5e",
        edf2fc: "#edf2fc",
        "1f1f1f": "#1f1f1f",
        "0000008a": "#0000008a",
        e5e7eb: "#e5e7eb",
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
        btn: "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
      },
      maxWidth: {
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
