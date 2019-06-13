var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    BASE_URL:'""',
    WS_BASE_URL:'"ws://localhost:10101/eops/notify"'
})
