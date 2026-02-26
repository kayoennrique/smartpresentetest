import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sora: ['var(--font-sora)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        parisienne: ['var(--font-parisienne)', 'cursive'],
      },

      colors: {
        'color-white-10': 'rgb(248 249 250)',
        'color-blue-10': 'rgb(10 36 63)',
        'color-orange-10': 'rgb(239 102 86)',
        'color-red-10': 'rgb(189 67 54)',
        'color-red-20': 'rgb(74 12 7)',
        'color-gray-10': 'rgb(33 37 41)',
        'color-gray-20': 'rgb(107 123 138)',
        'color-gray-30': 'rgb(117 129 156)',
        'color-gray-40': 'rgb(30 30 30)',
        'color-gray-50': 'rgb(229 231 235)',
        'color-green-10': 'rgb(78 136 114)',
        'color-green-20': 'rgb(223 239 233)',
        'color-green-30': 'rgb(5 150 105)',
        'color-green-40': 'rgb(16 185 129)',
      },

      backgroundImage: {
        'red-gradient': 'linear-gradient(90deg, #EF6656 0%, #BD4336 100%)',
        'red-gradient-10': 'linear-gradient(90deg, #BD4336 0%, #EF6656 100%)',

        'radial-red-section':
          'radial-gradient(circle at 50% 55%, #BD4336 0%, #7A241B 55%, #3A0F0B 85%)',

        'radial-red-glow-top':
          'radial-gradient(circle at center, rgba(239,102,86,0.15) 0%, transparent 70%)',

        'radial-white-center':
          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 65%)',

        'radial-red-glow-bottom':
          'radial-gradient(circle at center, rgba(189,67,54,0.25) 0%, transparent 70%)',
      },
    },
  },

  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.border-red-gradient': {
          border: '1px solid transparent',
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(90deg, #EF6656 0%, #BD4336 100%) border-box',
        },
      });
    },
  ],
};

export default config;
