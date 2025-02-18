import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#000000', // very dark green, almost black
  			foreground: '#FFFFCF', // bright silvery
        blood: 'red',
        silver: 'hsl(var(--silver))'
  		}
  	}
  },
  
};
export default config;