const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    // etc.
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
        },
        foreground: {
          primary: 'var(--foreground-primary)',
          secondary: 'var(--foreground-secondary)',
        },
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
    // ...
  ],
};
