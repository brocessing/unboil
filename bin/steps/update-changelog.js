'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('../utils/sh-basic')

const CHANGELOGMD_PATH = path.join(process.cwd(), 'CHANGELOG.md')
const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG')

function ensureChangelogFile() {
  return new Promise((resolve, reject) => {
    fs.pathExists(CHANGELOG_PATH)
        .then(exists => {
          if (exists) resolve(CHANGELOG_PATH)
          else fs.ensureFile(CHANGELOGMD_PATH)
            .then(() => resolve(CHANGELOGMD_PATH))
            .catch(reject)
        })
        .catch(reject)
  })
}

module.exports = function (state, next) {
  let changelogPath = null
  return ensureChangelogFile()
    .then(file => { changelogPath = file })
    .then(output => fs.writeFile(changelogPath, ''))
    .then(() => sh.debug(`CHANGELOG file updated`))
    .then(() => next(null, state))
    .catch(err => next(err, state))
}
