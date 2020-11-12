const chalk = require('chalk');

let pathsMap = {};

function paths(...args) {
  let key = args[0];
  if (pathsMap[key]) {
    return;
  }
  let arr = args.slice(1);
  pathsMap[key] = arr;
  console.log(chalk.red(key) ,chalk.blue(...arr));
}

let envMap = {};
function env(...args) {
  let key = args[0];
  if (envMap[key]) {
    return;
  }
  let arr = args.slice(1);
  envMap[key] = arr;
  console.log(chalk.green(key) ,chalk.blue(...arr));
}

let modulesMap = {};
function modules(...args) {
  let key = args[0];
  if (modulesMap[key]) {
    return;
  }
  let arr = args.slice(1);
  modulesMap[key] = arr;
  console.log(chalk.blueBright(key) ,chalk.blue(...arr));
}


module.exports = {
  paths,
  env,
  modules,
};
