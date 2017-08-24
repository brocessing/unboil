'use strict'

const colors = require('kool-shell/utils/colors')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

module.exports = function (next) {
  process.stdout.write('\n')
  sh.info(colors.gray('🍳  Unboiling ' + process.cwd()))

  // initialize the state flow
  next(null, {
    package: {},
    tasks: {}
  })
}
