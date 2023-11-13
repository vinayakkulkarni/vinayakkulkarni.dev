module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    lib: ['es2022'],
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    'prettier',
    'vue',
    'jsdoc',
    'security',
    '@typescript-eslint',
    'security-node',
    'anti-trojan-source',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:nuxt/recommended',
    'plugin:jsdoc/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:security-node/recommended',
    'plugin:anti-trojan-source/recommended',
    '@unocss',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
