const resolve = require('resolve');
const paths = require('../config/paths');

const ts = require(resolve.sync('typescript', {
  basedir: paths.appNodeModules,
}));

let config= ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
console.log('-----');

console.log(config);

