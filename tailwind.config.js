/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend:{
    colors:{
      light:{
        "text":"hsl(200, 15%, 8%)",
        "input":"hsl(0, 0%, 52%)",
        "bg":"hsl(0, 0%, 98%)"
      },
      dark:{
        "bg":"hsl(207, 26%, 17%)",
        "element":"hsl(209, 23%, 22%)",
      }
    }
   }
  },
  darkMode:["class"],
  plugins: [],
}
