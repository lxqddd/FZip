#! /usr/bin/env node

import argv from 'minimist'

const argvObj = argv(process.argv.slice(2))

console.log(argvObj)
