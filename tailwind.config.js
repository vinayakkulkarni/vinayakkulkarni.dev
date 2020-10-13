const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  experimental: {
    darkModeVariant: true,
  },
  dark: 'class',
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        twitter: '#1DA1F2',
        linkedIn: '#2867B2',
        github: '#333333',
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
  ],
};
