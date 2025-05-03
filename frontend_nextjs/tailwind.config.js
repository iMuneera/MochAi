module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Ensure your files are included
    ],
    theme: {
      extend: {
        animation: {
          typing: "typing 2s steps(20, end), blink 0.5s step-end infinite",
        },
        keyframes: {
          typing: {
            from: { width: "0%" },
            to: { width: "100%" },
          },
          blink: {
            "50%": { borderColor: "transparent" },
          },
        },
      },
    },
    plugins: [],
  };