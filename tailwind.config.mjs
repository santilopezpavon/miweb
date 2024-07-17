/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			'xl': '6.5rem',
			'lg': '3.6rem',
			'md': '2rem',
			'xs': ['1.6rem', '1.5']
		},
		
		extend: {
			maxWidth: {
				'50': '50rem',
			}
		
		},
	},
	plugins: [],
}
