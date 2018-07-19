const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const dotNext = path.resolve(__dirname, './.next')

const buildId = crypto.randomBytes(20).toString('hex');


const file = path.resolve(__dirname, './.next/build-stats.json')
var jsonData = `{"app.js":{"hash":"${buildId}"}}`
var obj = {'app.js': buildId}

fs.writeFileSync(file, jsonData)