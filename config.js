'use strict';

const path = require('path');
const lodash = require('lodash');
const out = require('./lib/out');

const cwd = process.cwd();
const defaultConfig = {
  postPath: 'source/_posts/yuque',
  cachePath: 'yuque.json',
  mdNameFormat: 'title',
  baseUrl: 'https://www.yuque.com/api/v2',
  login: '',
  repo: '',
  adapter: 'hexo',
  concurrency: 5,
};

function loadConfig() {
  const pkg = loadJson() || loadYaml();
  if (!pkg) {
    out.error('current directory should have a package.json');
    return null;
  }
  const { yuqueConfig } = pkg;
  if (!lodash.isObject(yuqueConfig)) {
    out.error('package.yueConfig should be an object.');
    return null;
  }
  const config = Object.assign({}, defaultConfig, yuqueConfig);
  return config;
}

function loadJson() {
  const pkgPath = path.join(cwd, 'package.json');
  // out.info(`loading config: ${pkgPath}`);
  try {
    const pkg = require(pkgPath);
    return pkg;
  } catch (error) {
    return false;
  }
}

function loadYaml() {
  // TODO
}

module.exports = loadConfig();
