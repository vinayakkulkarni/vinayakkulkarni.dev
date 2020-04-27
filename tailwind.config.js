/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
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
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
