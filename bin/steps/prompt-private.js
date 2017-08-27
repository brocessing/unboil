'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/input'))

function ask(name) {
  return sh.input(
    `Is ${sh.colors.yellow(name)} a private package? (no)`,
    { onSubmit: answer => !!answer.match(/^y(es)?$/i) }
  )
}

module.exports = function (state, next) {
  ask(state.package.name)
    .then(answer => {
      state.package.private = answer
      next(null, state)
    })
    .catch(err => next(err, state))
}
