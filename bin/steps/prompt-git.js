'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/input'))

const GIT_PATH = path.join(process.cwd(), '.git')

function ask(name) {
  return sh.input(
    `Does ${sh.colors.yellow(name)} have a git repository? (yes)`,
    { onSubmit: answer => !answer.match(/^no?$/i) }
  )
}

module.exports = function (state, next) {
  fs.pathExists(GIT_PATH)
    .then(exists => exists ? ask(state.package.name) : false)
    .then(answer => {
      state.hasGitRepo = !!answer
      state.package.homepage = null
      state.package.bugs = null
      state.package.repository = null
      next(null, state)
    })
    .catch(err => next(err, state))
}
