'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:"http://fanyi-api.baidu.com/api/api/trans/vip/translate"
})
