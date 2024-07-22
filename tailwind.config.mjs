/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			'xl': '6.5rem',
			'lg': '3.6rem',
			"lg-red": "2.5rem",
			"xl-red": "4rem",

			'md': '2rem',
			'md-red': '1.8rem',

			'xs': ['1.8rem', '1.5']
		},
		
		extend: {
			maxWidth: {
				'50': '50rem',
			},
			colors: {
				'white': '#dddddd',
			  },
		
		
		},
	},
	plugins: [],
}
