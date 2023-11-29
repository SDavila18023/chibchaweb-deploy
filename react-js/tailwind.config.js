import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      screens: {
        base: '900px'
      },
      colors: {
        blue: {
          100: '#c3daf8',
          200: '#95bef3',
          300: '#2c7de6',
          400: '#10468c',
          500: '#041122'
        },
        red: {
          100: '#eb9696',
          200: '#e57c7c',
          300: '#e06262',
          400: '#db4848',
          500: '#d62e2e'
        },
        yellow: {
          100: '#f7eaa1',
          200: '#f6e489',
          300: '#f4df71',
          400: '#f2d95a',
          500: '#f0d442'
        },
        gray: {
          100: '#a3b1c2',
          200: '#8c9eb2',
          300: '#758aa3',
          400: '#607791',
          500: '#51647A'
        }
      },
      fontFamily: {
        inika: "'Inika', serif"
      },
      boxShadow: {
        header: '0px 2px 14px 1px rgba(0, 0, 0, 0.15)',
        card: '0px 12px 22px -7px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('scroll', '&::-webkit-scrollbar'),
      addVariant('scroll-thumb', '&::-webkit-scrollbar-thumb'),
      addVariant('scroll-track', '&::-webkit-scrollbar-track'),
      addVariant('pointer', '@media (any-hover:hover)')
    })
  ],
}

