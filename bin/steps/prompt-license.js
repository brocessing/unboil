'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

const DEFAULT_LICENSE = require('../../package.json').license
const def = val => val === undefined || val === '' ? DEFAULT_LICENSE : val

module.exports = function (state, next) {
  sh.input(`License: (${DEFAULT_LICENSE})`, { onSubmit: answer => def(answer).trim() })
    .then(license => {
      // @TODO : if (license !== DEFAULT_LICENSE) update LICENSE file
      state.package.license = license
      next(null, state)
    })
    .catch(err => next(err, state))
}
