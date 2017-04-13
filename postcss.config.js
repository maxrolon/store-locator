const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({ addModulesDirectories: ['node_modules' ], } ),
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ }),
  ]
}
