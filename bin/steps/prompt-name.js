'use strict'

const slug = require('slug')
const path = require('path')
const sh = require('../utils/sh-basic')

const DEFAULT_NAME = slug(path.basename(process.cwd()))

const def = val => val === undefined || val === '' ? DEFAULT_NAME : val

const errors = {
  noName: 'You must provide a name to create a module',
  tooLong: 'Module name can\'t contain more than 214 characters',
  badStartChar: 'Module name can only start with a lowercase alphabetic character',
  badChar: 'Module name should contain only lowercase alphanumeric characters, dots, hyphens, and underscores',
  badTrimming: 'Module name cannot contain leading or trailing spaces'
}

function realName (slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.substring(1))
    .join(' ')
}

function validateName (name, cb) {
  if (name === undefined || typeof name !== 'string' || name.length === 0) { return cb(errors.noName) }
  if (name.length > 214) return cb(errors.tooLong)
  if (name.trim() !== name) return cb(errors.badTrimming)
  if (!name.match(/^[a-z]/)) return cb(errors.badStartChar)
  if (!name.match(/^[a-z0-9_\-.]*$/)) return cb(errors.badChar)

  return cb(null, name)
}

function ask () {
  return sh.input(`Name: (${DEFAULT_NAME})`, {
    onSubmit: answer => {
      return validateName(def(answer.trim()), (err, name) => {
        if (err) {
          sh.error(err)
          return ask()
        } else return name
      })
    }
  })
}

module.exports = function (state, next) {
  ask()
    .then(name => {
      state.package.name = name
      state.name = realName(name)
      next(null, state)
    })
    .catch(err => next(err, state))
}
