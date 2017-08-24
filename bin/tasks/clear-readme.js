'use strict'

const fs = require('fs-extra')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

module.exports = function (state, next) {
  if (state.tasks.clearReadme) {
    // @TODO : template
    fs.outputFile(state.tasks.readmePath, '')
      .then(() => {
        sh.success('README unboiled !')
        next(null, state)
      })
      .catch(err => next(err, state))
    } else next(null, state)
}
