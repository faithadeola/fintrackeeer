/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42b983',
          50: '#f0faf5',
          100: '#dbf4e8',
          200: '#bae9d4',
          300: '#8bd7b6',
          400: '#5ac095',
          500: '#42b983',
          600: '#2f9c6a',
          700: '#287c55',
          800: '#246347',
          900: '#1f513c',
        },
        success: '#4CAF50',
        error: '#FF5252',
        dark: '#1E1E1E'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'heading-1': '24px',
        'heading-2': '20px',
        'heading-3': '18px',
        'body': '16px',
        'body-sm': '14px',
        'small': '12px',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
      },
    },
  },
  plugins: [],
}