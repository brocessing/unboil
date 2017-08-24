'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

module.exports = function (state, next) {
  sh.input('Git repository:', { onSubmit: answer => answer.trim() })
    .then(url => {
      // @TODO: better parsing of repo input
      state.package.repository = {
        type: 'git',
        url: url
      }

      state.package.homepage = url + '#readme'
      state.package.bugs = {
        url: url + '/issues'
      }

      next(null, state)
    })
    .catch(err => next(err, state))
}
