'use strict'

const sh = require('../utils/sh-basic')

module.exports = function (state, next) {
  sh.log('')
  next(null, state)
}