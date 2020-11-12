'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const logger = require('./logger');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
// appDirectory 是项目的根目录
const appDirectory = fs.realpathSync(process.cwd());

logger.paths('appDirectory 项目的根目录', appDirectory);

// 把相对路径解析为绝对路径的公共方法，已根目录为参照
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

logger.paths('resolveApp', 'resolveApp 用来解析文件资源的绝对路径');

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

logger.paths('publicUrlOrPath 公共资源路径', publicUrlOrPath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

logger.paths('moduleFileExtensions', '模块文件的扩展名列表');

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension => {
      return fs.existsSync(resolveFn(`${filePath}.${extension}`))
    }
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

logger.paths('resolveModule', 'resolveModule 用来解析不确定文件扩展名的文件绝对路径，匹配 moduleFileExtensions 里的扩展名，如果在 moduleFileExtensions 里找到对应的扩展名文件，那就直接使用。如果没有找到，那么就使用 .js 为扩展名，拼接成目标文件名');

// config after eject: we're in ./config/
// 所有需要用到的路径信息
module.exports = {
  // 解析 env 环境变量
  dotenv: resolveApp('.env'),
  // 项目根目录
  appPath: resolveApp('.'),
  // 项目打包的目录
  appBuild: resolveApp('build'),
  // public 资源目录
  appPublic: resolveApp('public'),
  // public 目录下的 index.html 文件
  appHtml: resolveApp('public/index.html'),
  // 解析入口文件，入口文件可能是 index.js, index.jsx, index.ts, index.tsx
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  // package.json 的路径
  appPackageJson: resolveApp('package.json'),
  // src 目录
  appSrc: resolveApp('src'),
  // tsconfig 的路径
  appTsConfig: resolveApp('tsconfig.json'),
  // jsconfig 的路径
  appJsConfig: resolveApp('jsconfig.json'),
  // yarn.lock 文件的路径
  yarnLockFile: resolveApp('yarn.lock'),
  // setupTests 文件的路径
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  // setupProxy 文件的路径
  proxySetup: resolveApp('src/setupProxy.js'),
  // node_modules 的目录路径
  appNodeModules: resolveApp('node_modules'),
  // service-worker 文件的路径
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
