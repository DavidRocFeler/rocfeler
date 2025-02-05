import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    plugins: [
      require("tailwind-scrollbar-hide") // Agregamos el plugin para ocultar la scrollbar
    ],
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #000000 54%, #030021 100%)',
      },
      screens: {
        xxs: '350px',
        xs: '388px',
        s: '500px',
        ssm: '560px',
        sm: '600px',
        md: '700px',
        mdd: '750px',
        mddd: '800px',
        xl: '900px',
        xll: '1000px',
        xxl: '1200px',
        xxxl: '1400px'
      },
      safelist: [
        'flex-row',
        'flex-row-reverse',
      ],
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-loop": "scroll 10s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
