const OFF = 0
const ERROR = 2

module.exports = {
  'env': {
    'browser': true,
    'node': true
  },
  'extends': 'standard',
  'plugins': [],
  'rules': {
    'comma-dangle': [ERROR, 'always-multiline'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'no-unused-expressions': ERROR,
    'no-unused-vars': [ERROR, {args: 'none'}],
    'quotes': [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'space-before-function-paren': [ERROR, {anonymous: 'never', named: 'never'}],
    'no-unused-vars': OFF,
    'padded-blocks': OFF,
    'no-return-assign': OFF,
    'no-cond-assign': OFF,
    'no-sequences': OFF,
    'space-in-parens': [2, 'always'],
    'spaced-comment': OFF,
  }
}
