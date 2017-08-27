const colors = require('kool-shell/utils/colors')

module.exports = require('kool-shell')()
  .use(require('kool-shell/plugins/exec'))
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/log'), {
    level: 'debug',
    color: true,
    debugPrefix: colors.gray(' → '),
    errorPrefix: colors.red(' ×  '),
    warnPrefix: colors.red(' !  ')
  })
