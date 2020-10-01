module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'color-no-invalid-hex': true,
    // 'declaration-block-trailing-semicolon': 'always',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['font-named-instance'],
      },
    ],
  },
};
