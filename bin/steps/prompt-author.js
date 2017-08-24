'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/exec'))

function ask (author) {
  const def = author && author !== '' ? author : false
  const label = def ? 'Author: (' + def + ')' : 'Author:'
  return sh.input(label, {
    onSubmit: answer => def && (!answer || answer === '') ? def : answer
  })
}

module.exports = function (state, next) {
  sh.silentExec('git', ['config', 'user.name'])
    .then(out => out.stdout)
    .catch(out => '')
    .then(ask)
    .then(author => {
      state.package.author = author
      next(null, state)
    })
    .catch(err => next(err, state))
}
