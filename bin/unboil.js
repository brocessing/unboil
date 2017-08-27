#!/usr/bin/env node

'use strict'

const waterfall = require('run-waterfall')

waterfall(
  [
    require('./steps/log-welcome'),

    require('./steps/log-newline'),

    require('./steps/prompt-name'),
    require('./steps/prompt-version'),
    require('./steps/prompt-description'),
    require('./steps/prompt-author'),
    require('./steps/prompt-license'),
    require('./steps/prompt-private'),
    require('./steps/prompt-readme'),
    require('./steps/prompt-git'),
    require('./steps/prompt-git-origin'),

    require('./steps/log-newline'),

    require('./steps/update-packagejson'),
    require('./steps/update-license'),
    require('./steps/update-readme'),
    require('./steps/update-changelog'),
    require('./steps/update-git'),
  ],
  (err, state) => err
    ? require('./steps/log-error')(err, state)
    : require('./steps/log-success')(err, state)
)
