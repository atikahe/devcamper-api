module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    'ecmaVersion': 12,
  },
  rules: {
  /**
   * Cancels some rule from airbnb
   * for the time being
   * TODO: try to enforce them all
   */
    'linebreak-style': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'consistent-return': 0,
    'indent': [
      'error',
      2,
    ],
    'quotes': [
      'error',
      'single',
    ],
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'quote-props': [
      'error',
      'consistent'
    ],
    'no-console': [
      'error',
      {
        'allow': ['log', 'error']
      }
    ],
    'object-curly-newline': [
      'error',
      {
        'consistent': true
      }
    ]
  },
};
