/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container:{
		center: true,
		padding: '15px',
	},
	screens:{
		'xs': '375px',
		'sm': '640px',
		'md': '768px',
		'lg': '1024px',
		'xl': '1280px',
		'2xl': '1536px',
		'3xl': '1920px',
		'4xl': '2560px',
		'5xl': '3840px',
	},
	fontFamily: {
		primary: ['var(--font-jetbrains-mono)'],
	},
  	extend: {
  		colors: {
  			primary: "#1c1c22",
			secondary: "#2727c",
			accent:{
				DEFAULT: "#00ff99",
				hover: "#00e187",
			}
  			
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
