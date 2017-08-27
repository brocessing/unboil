'use strict'

const sh = require('../utils/sh-basic')

const REGEX = /^(git@([a-z0-9._~/?#\[\]@!$&'()*+,;=`-]+):|https?:\/\/([a-z0-9._~?#\[\]@!$&'()*+,;=`-]+)\/)([a-z0-9._~:/?#\[\]@!$&'()*+,;=`-]+)\.git$/i

const GIT_DOMAINS = [
  'www.bitbucket.org',
  'bitbucket.org',
  'www.github.com',
  'github.com',
  'www.gitlab.com',
  'gitlab.com'
]


function validate (answer = '') {
  let url = (answer + '').trim()
  if (url.substr(-1, 1) === '/') url = url.slice(0, -1)
  if (url.substr(-4, 4) !== '.git') url += '.git'

  const result = url.match(REGEX)
  if (!result) {
    sh.error('Invalid repository origin')
    return ask()
  }
  const host = result[2] || result[3]
  const path = result[4]
  return { host, path, url }
}

function ask () {
  return sh.input('Repository origin (ssh/https):', { onSubmit: validate })
}

module.exports = function (state, next) {
  if (!state.hasGitRepo) return next(null, state)

  ask()
    .then(({ host, path, url }) => {

      state.gitOriginUrl = url

      state.package.repository = {
        type: 'git',
        url: 'git+' + url
      }

      if (~GIT_DOMAINS.indexOf(host)) {
        const projectUrl = `https://${host}/${path}`
        state.package.homepage =  projectUrl + '#readme'
        state.package.bugs = { url: projectUrl + '/issues' }
      }

      next(null, state)
    })
    .catch(err => next(err, state))
}
