#!/usr/bin/env node

const waterfall = require('run-waterfall')

waterfall(
  [
    require('./steps/welcome'),

    require('./steps/prompt-name'),
    require('./steps/prompt-version'),
    require('./steps/prompt-description'),
    require('./steps/prompt-author'),
    require('./steps/prompt-license'),
    require('./steps/prompt-git-repository'),

    require('./tasks/update-package'),

    require('./steps/prompt-clear-git'),
    require('./steps/prompt-clear-readme'),

    require('./tasks/clear-git'),
    require('./tasks/clear-readme')
  ],
  (err, state) => err
    ? require('./steps/error')(err, state)
    : require('./steps/success')(err, state)
)
