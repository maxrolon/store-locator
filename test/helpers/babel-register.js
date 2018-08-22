require('@babel/register')({
  ignore: ['node_modules/*', 'test/*'],
  presets: [
    '@babel/preset-env'
  ]
})
