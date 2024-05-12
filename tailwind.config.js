/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'white-txt':'#F4F5F7',
        'nav-blue':'#2B4D7D',
        'btn-orange':'#E56335',
        'btn-red':'#CD2435',
        'yellow-light':'#D4AC63',
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

