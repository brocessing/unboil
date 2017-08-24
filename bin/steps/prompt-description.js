'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

module.exports = function (state, next) {
  sh.input('Description:', { onSubmit: answer => answer.trim() })
    .then(description => {
      state.package.description = description
      next(null, state)
    })
    .catch(err => next(err, state))
}
