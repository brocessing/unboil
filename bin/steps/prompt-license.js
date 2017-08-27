'use strict'

const { license } = require('../../package.json')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

const DEFAULT_LICENSE = license || 'MIT'
const def = val => val === undefined || val === '' ? DEFAULT_LICENSE : val

function ask() {
  return sh.input(`License: (${DEFAULT_LICENSE})`, {
    onSubmit: answer => def(answer).trim()
  })
}

module.exports = function (state, next) {
  ask()
    .then(license => {
      // @TODO : if (license !== DEFAULT_LICENSE) update LICENSE file
      state.package.license = license
      next(null, state)
    })
    .catch(err => next(err, state))
}
