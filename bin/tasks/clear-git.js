'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))

const GIT_PATH = path.join(process.cwd(), '.gittest')

module.exports = function (state, next) {
  if (state.tasks.clearGit) {
    fs.remove(GIT_PATH)
      .then(() => {
        sh.success('.git unboiled !')
        next(null, state)
      })
      .catch(err => next(err, state))
    } else next(null, state)
}
