'use strict'

const fs = require('fs-extra')
const path = require('path')
const colors = require('kool-shell/utils/colors')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

const VALIDE_PATHS = [
  'README',
  'readme',
  'README.md',
  'readme.md'
].map(filename => path.join(process.cwd(), filename))

// fs.pathExists but with an array of possible path
// resolve with the first path found
function variablePathExists (paths) {
  return new Promise((resolve, reject) => {
    paths.forEach(p => {
      fs.pathExists(p)
        .then(exists => {
          if (exists) resolve(p)
        })
        .catch(err => reject(err))
    })
  })
}

module.exports = function (state, next) {
  variablePathExists(VALIDE_PATHS).then(foundPath => {
    if (foundPath) {
      sh.input(`Do you want to unboil ${foundPath.split('/').pop()}? (yes)`, {
        onSubmit: answer => {
          state.tasks.clearReadme = (answer === '' || answer.match(/^y(es)?$/i))
          state.tasks.readmePath = foundPath
          next(null, state)
        }
      }).catch(err => next(err, state))
    } else next(null, state)
  })
}
