/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import themes from 'daisyui/theme/object'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      blue: '#4197FF',
      body: '#F7ECE7',
      card: '#EFD8D0',
      default: '#000',
      yellow: '#FDDD3D',
      pink: '#FF88F7',
      black: '#000',
      gray: '#303030',
      cyan: '#0EF',
      white: '#fff',
      danger: '#EC534B',
      border: '#ccc',
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        jikotheme: {
          primary: '#C16240',
          secondary: '#536E83',
          success: '#1bc24d',
          warning: '#ffbf35',
          error: '#F02D68',
        },
      },
    ],
  },
}
