const colors = require('kool-shell/utils/colors')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

module.exports = function (err, state) {
  if (err) return require('./error')(err, state)
  process.stdout.write('\n')
  sh.success(colors.yellow(state.name) + ' is unboiled !\n')
  sh.log(state)
}
