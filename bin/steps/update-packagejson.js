'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('../utils/sh-basic')

const PACKAGE_PATH = path.join(process.cwd(), 'package.json')

function loadPackageJson () {
  return new Promise((resolve, reject) => {
    fs.pathExists(PACKAGE_PATH)
      .then(exists => {
        if (!exists) return resolve({})
        else fs.readJson(PACKAGE_PATH)
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

module.exports = function (state, next) {
  loadPackageJson()
    .then(oldPackage => {
      const newPackage = Object.assign({}, oldPackage, state.package)

      for (let k in state.package) {
        if (state.package[k] === null) delete newPackage[k]
      }

      if (!newPackage.dependencies) newPackage.dependencies = {}
      if (!newPackage.devDependencies) newPackage.devDependencies = {}

      fs.writeJson(PACKAGE_PATH, newPackage, {spaces: 2})
        .then(() => sh.debug(`package.json updated`))
        .then(() => next(null, state))
        .catch(err => next(err, state))
    })
    .catch(err => next(err, state))
}
