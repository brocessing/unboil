const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

module.exports = function (err, state) {
  process.stdout.write('\n')
  const msg = (err && err.message) ? err.message : err
  sh.error(msg + '\n')
  if (err.message && err.stack) sh.log(err.stack)
}
