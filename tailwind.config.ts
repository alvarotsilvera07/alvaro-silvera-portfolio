import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        cinema: {
          bg: '#0A0A0A',
          fg: '#F5F3EE',
          gold: {
            DEFAULT: '#C89B5C',
            light: '#D4A574',
          },
          red: '#8B2E2E',
          gray: {
            50: '#FBFBFA',
            100: '#F6F5F3',
            200: '#EBEAE6',
            300: '#D0CEC7',
            400: '#A2A097',
            500: '#76746D',
            600: '#5D5B56',
            700: '#494843',
            800: '#302F2C',
            900: '#1D1C1A',
            950: '#121110',
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
