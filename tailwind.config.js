const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', ...fontFamily.sans],
        mono: ['"Roboto Mono"', ...fontFamily.mono],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        styrene: ['"Styrene A"', ...fontFamily.sans],
      },
      borderRadius: {
        sm: '4px',
      },
      colors: {
        brand: {
          white: '#ffffff',
          dark: '#3f4174',
          blue: '#5599fe',
          green: '#48df7b',
          purple: '#b56cff',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#5599fe',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        hedera: {
          purple: '#8259ef',
          blue: '#2d84eb',
          green: '#3ec878',
          charcoal: '#464646',
          smoke: '#8c8c8c',
        },
        navbar: {
          dropdown: '#6289d5',
          'link-hover': 'rgba(255, 255, 255, 0.15)',
          'link-active': 'rgba(255, 255, 255, 0.2)',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        draw: 'draw 2s forwards',
        'data-flow': 'dataFlow 15s linear infinite',
        blob: 'blob 7s infinite',
        shine: 'shine 3s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        dataFlow: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hedera-gradient': 'linear-gradient(135deg, #8259ef 0%, #2d84eb 100%)',
        'hedera-green-gradient':
          'linear-gradient(135deg, #3ec878 0%, #2d84eb 100%)',
        'navbar-gradient':
          'linear-gradient(135deg, rgba(85, 153, 254, 0.95) 0%, rgba(63, 65, 116, 0.95) 100%)',
        'navbar-gradient-dark':
          'linear-gradient(135deg, rgba(85, 153, 254, 0.95) 0%, rgba(63, 65, 116, 0.95) 100%)',
      },
      backdropBlur: {
        navbar: '12px',
      },
      boxShadow: {
        navbar:
          '0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
