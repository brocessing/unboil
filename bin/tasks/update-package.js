'use strict'

const fs = require('fs-extra')
const path = require('path')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/exit'))
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/log'))

const PACKAGE_PATH = path.join(process.cwd(), 'package.json')

module.exports = function (state, next) {
  fs.readJson(PACKAGE_PATH)
    .then(packageObj => {
      const newPackage = Object.assign({}, packageObj, state.package || {})
      sh.log(newPackage)

      sh.input('Is this ok? (yes)', {onSubmit: answer => answer === '' || answer.match(/^y(es)?$/i)})
        .then(answer => {
          if (answer) {
            fs.writeJson(PACKAGE_PATH, newPackage, {spaces: 2})
              .then(() => {
                process.stdout.write('\n')
                sh.success('package.json unboiled !')
                next(null, state)
              })
              .catch(err => next(err, state))
          } else sh.exit(0)
        }).catch(err => next(err, state))
    })
    .catch(err => next(err, state))
}
