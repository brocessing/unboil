'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

module.exports = function (err, state) {
  process.stdout.write('\n')
  sh.success(sh.colors.yellow(state.package.name) + ' is unboiled !\n')
}
