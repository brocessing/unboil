'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('../utils/sh-basic')
const ensureFile = require('../utils/ensure-file')

const LICENSEMD_PATH = path.join(process.cwd(), 'LICENSE.md')
const LICENSE_PATH = path.join(process.cwd(), 'LICENSE')
const CURRENT_YEAR = (new Date()).getFullYear()

module.exports = function (state, next) {
  const license = state.package.license.toLowerCase()
  const templatePath = path.join(__dirname, '..', '..', 'templates', 'licenses', license + '.txt')
  let licensePath = null
  return ensureFile(LICENSEMD_PATH, LICENSE_PATH)
    .then(file => { licensePath = file })
    .then(() => fs.pathExists(templatePath))
    .then(exists => exists ? fs.readFile(templatePath, 'utf8') : '')
    .then(template => template
        .replace(/\{\{ project \}\}/g, state.package.name)
        .replace(/\{\{ author \}\}/g, state.package.author)
        .replace(/\{\{ year \}\}/g, CURRENT_YEAR))
    .then(output => fs.writeFile(licensePath, output))
    .then(() => sh.debug(`LICENSE file updated`))
    .then(() => next(null, state))
    .catch(err => next(err, state))
}
