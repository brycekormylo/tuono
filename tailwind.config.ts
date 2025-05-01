import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					default: "#32302F",
					100: "#5f5d59",
					200: "#54524f",
					300: "#4a4745",
					400: "#3F3d3b",
					500: "#32302F",
					600: "#2A2828",
					700: "#201E1E",
					800: "#151414",
					900: "#0B0A0A",
				},
				light: {
					default: "#e1e0e0",
					50: "#fafafa",
					100: "#f7f7f5",
					300: "#f1f1ef",
					500: "#edede9",
					700: "#e3e3dd",
					900: "#d1d1c7",
				},
				primary: {
					default: "#97C4AD",
					100: "#cbe2d6",
					200: "#bedacc",
					300: "#b1d3c1",
					400: "#a4ccb7",
					500: "#89bda2",
					600: "#7cb698",
					700: "#6fae8e",
					800: "#62a783",
					900: "#589d79",
				},
				secondary: {
					default: "#C8E3DF",
					50: "#f1f8f7",
					100: "#e4f1ef",
					300: "#d6eae7",
					500: "#c8e3df",
					700: "#bbddd8",
					900: "#aed6d0",
				},
				accent: {
					default: "#D1E8BC",
					100: "#eaf5e1",
					300: "#e0efd1",
					500: "#d1e8bc",
					700: "#c1e0a4",
					900: "#b6db95",
				},

				empty: "#93C2AB",
				hint: "#A7D6AA",
				info: "#A3CFC4",
				ok: "#8BCCA5",
				warning: "#DA9B58",
				error: "#EB7757",
			},
		},
	},
	plugins: [],
};

export default config;
