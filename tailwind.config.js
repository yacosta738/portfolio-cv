/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['selector', '.dark'], // Use class-based dark mode with explicit selector
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Use CSS variables for colors to match global.css
				'primary': {
					50: 'var(--color-primary-50)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
				},
				'accent': {
					500: 'var(--color-accent-500)',
				}
			},
			fontFamily: {
				sans: ['var(--font-sans)'],
			},
			spacing: {
				'1': 'var(--spacing-1)',
				'2': 'var(--spacing-2)',
				'3': 'var(--spacing-3)',
			},
			borderRadius: {
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
			}
		},
	},
	plugins: [],
}
