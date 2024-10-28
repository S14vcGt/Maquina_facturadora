module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'background-nav': '#1C67AD',
        'color-text-nav': '#fff',
        'background-body': '#F2F7FD',
        'color-text-main': '#000000',
        'background-button': '#2B83CC',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom': '-1px 10px 38px -2px rgba(0,0,0,0.25)',
      }
    }
  },
  plugins: [],
}