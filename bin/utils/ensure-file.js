'use strict'

const fs = require('fs-extra')
const path = require('path')

function ensureFile (preferedPath, fallbackPath) {
  return new Promise((resolve, reject) => {
    fs.pathExists(preferedPath)
        .then(exists => {
          if (exists) resolve(preferedPath)
          else fs.ensureFile(fallbackPath)
            .then(() => resolve(fallbackPath))
            .catch(reject)
        })
        .catch(reject)
  })
}

module.exports = ensureFile
