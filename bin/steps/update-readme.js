'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('../utils/sh-basic')
const ensureFile = require('../utils/ensure-file')

const READMEMD_PATH = path.join(process.cwd(), 'README.md')
const README_PATH = path.join(process.cwd(), 'README')
const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates', 'readme.txt')

module.exports = function (state, next) {
  let readmePath = null
  if (state.clearReadme) {
    ensureFile(README_PATH, READMEMD_PATH)
    .then(file => { readmePath = file })
    .then(() => fs.readFile(TEMPLATE_PATH, 'utf8'))
    .then(template => template
          .replace(/\{\{ project \}\}/g, state.package.name)
          .replace(/\{\{ description \}\}/g, state.package.description))
    .then(output => fs.writeFile(readmePath, output))
    .then(() => sh.debug(`README file updated`))
    .then(() => next(null, state))
    .catch(err => next(err, state))
  } else next(null, state)
}
