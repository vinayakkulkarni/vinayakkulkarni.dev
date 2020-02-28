module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: 'stylelint-config-standard',
  rules: {
    'color-no-invalid-hex': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['font-named-instance'],
      },
    ],
  },
};
