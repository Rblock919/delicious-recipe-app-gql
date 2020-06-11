const { eslintConfig } = require('@rblock919/eslint-config');

module.exports = {
  ...eslintConfig,
  rules: {
    ...eslintConfig.rules,
    'func-names': 'off', // when defining mongoose schema methods you can't use the arrow function in most cases due to the 'this' usage
    'class-methods-use-this': 'off',
  },
};
