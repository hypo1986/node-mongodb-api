// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // add your custom rules here
  rules: {
    'rule-you-wish-to-disable': 0,
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'always'
      }
    ],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 2,
    // replace var with let or const
    'no-var': 2,
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'camelcase': 2,
    'curly': 2,
    'brace-style': [2, '1tbs'],
    'quotes': [2, 'single'],
    // 'semi': [2, 'always'],
    // 'space-in-brackets': [2, 'never'],
    'space-infix-ops': 2
  }
}
