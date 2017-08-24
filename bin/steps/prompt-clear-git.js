'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

const GIT_PATH = path.join(process.cwd(), '.gittest')

module.exports = function (state, next) {
  fs.pathExists(GIT_PATH)
    .then(exists => {
      if (exists) {
        sh.input(`Do you want to ungit this project? (yes)`, {
          onSubmit: answer => {
            state.tasks.clearGit = (answer === '' || answer.match(/^y(es)?$/i))
            next(null, state)
          }
        }).catch(err => next(err, state))
      } else next(null, state)
    })
    .catch(err => next(err, state))
}
