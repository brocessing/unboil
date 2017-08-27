'use strict'

const sh = require('../utils/sh-basic')

function ask () {
  return sh.input(
    `Do you want ${sh.colors.yellow('README')} to be unboiled ? (yes)`,
    { onSubmit: answer => answer === '' || !!answer.match(/^y(es)?$/i) }
  )
}

module.exports = function (state, next) {
  ask()
    .then(answer => {
      state.clearReadme = answer
      next(null, state)
    })
    .catch(err => next(err, state))
}
