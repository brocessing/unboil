'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('../utils/sh-basic')

const GIT_PATH = path.join(process.cwd(), '.git')

module.exports = function (state, next) {
  fs.remove(GIT_PATH)
    .then(() => state.hasGitRepo ? sh.silentExec('git', ['init']) : { code: 0 })
    .then(res => {
      if (!state.hasGitRepo) return sh.debug(`.git folder removed`)
      if (res.code !== 0) return Promise.reject(res.stderr)
      sh.debug(`.git folder (re)created`)
    })
    .then(() => {
      const repoUrl = state.gitOriginUrl
      if (state.hasGitRepo && repoUrl) return new Promise((resolve, reject) => {
        sh.silentExec('git', ['remote', 'add', 'origin', repoUrl])
          .then(res => res.code !== 0 ? Promise.reject(res.stderr) : '')
          .then(() => sh.debug(`${repoUrl} added as remote origin`))
          .then(resolve)
          .catch(reject)
      })
    })
    .then(() => next(null, state))
    .catch(err => next(err, state))
}
