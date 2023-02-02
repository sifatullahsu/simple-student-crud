/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1180px'
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
          primary: "#F33823",
          secondary: "#FFF6F5",
          accent: "#FFFCFB",
          info: "#ebe8e7"
        },
      },
    ]
  }
}
