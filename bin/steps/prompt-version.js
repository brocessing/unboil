'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/log'))

const DEFAULT_VERSION = '0.0.1'
const REGEX = /^((\w{1}|[1-9]{1}\w+)\.){2}(\w{1}|[1-9]{1}\w+)$/g

const isValid = val => REGEX.test(val)
const def = val => val === undefined || val === '' ? DEFAULT_VERSION : val

function ask () {
  return sh.input('Version: (' + DEFAULT_VERSION + ')', {
    onSubmit: answer => {
      answer = def(answer)
      if (isValid(answer)) return answer
      sh.error('Invalid version: "' + answer + '"')
      return ask()
    }
  })
}

module.exports = function (state, next) {
  ask()
    .then(version => {
      state.package.version = version
      next(null, state)
    })
    .catch(err => next(err, state))
}
