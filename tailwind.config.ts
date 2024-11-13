import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height:{
        "1/10": '10%',
        "12/100": '12%',
        "2/10": '20%',
        "3/10": '30%',
        "4/10": '40%',
        "5/10": '50%',
        "6/10": '60%',
        "7/10": '70%',
        "8/10": '80%',
        "9/10": '90%',
        "95/100": '95%',
      },
      width:{
        "1/10": '10%',
        "12/100": '12%',
        "2/10": '20%',
        "3/10": '30%',
        "4/10": '40%',
        "42/100": '42%',
        "5/10": '50%',
        "6/10": '60%',
        "7/10": '70%',
        "8/10": '80%',
        "9/10": '90%',
        "95/100": '95%',
      },
      screens: {
        '3xl': '2040px',
      }
    },
  },
  plugins: [],
} satisfies Config;
