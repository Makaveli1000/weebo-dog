// tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html", // Your main HTML file
        "./app.module.js", // Explicitly adding app.module.js for clarity, though it might be covered by src/**/*.{js,ts,jsx,tsx}
        "./src/**/*.{js,ts,jsx,tsx}", // All JS/TS files in src directory
        // If you have other files like components or template files, add them here
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }