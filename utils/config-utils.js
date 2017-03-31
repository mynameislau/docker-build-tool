const path = require('path');
const fs = require('fs');

const confPath = path.resolve('./config/config.js');
const fileExists = fs.existsSync(confPath);

module.exports = fileExists ? require(confPath)() : {};
