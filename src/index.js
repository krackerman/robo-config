const assert = require('assert');
const path = require('path');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const { loadConfig, applyConfig } = require('./util/config');


const applyConfigRec = (configNames, variables, projectRoot) => {
  const result = [];
  configNames.forEach((configName) => {
    const config = loadConfig(configName, variables);
    assert(config !== null, `Bad Config Name: ${configName}`);
    if (config.target !== undefined && applyConfig(config, projectRoot)) {
      result.push(`Updated: ${config.target}`);
    }
    if (config.configs !== undefined) {
      result.push(...applyConfigRec(config.configs, variables, projectRoot));
    }
  });
  return result;
};

const generateDocsRec = (configNames) => {
  const result = [
    '# Codebase Configuration Documentation'
  ];
  return result;
};


module.exports = ({
  configs: configNames,
  variables = {},
  projectRoot = appRoot.path,
  confDocsPath = 'CONFDOCS.md'
} = {}) => {
  if (configNames === undefined) {
    const roboConfig = sfs.smartRead(path.join(projectRoot, '.roboconfig.json'));
    assert(roboConfig instanceof Object && !Array.isArray(roboConfig));
    assert(Object.keys(roboConfig).length === 2);
    // eslint-disable-next-line no-param-reassign
    configNames = roboConfig.configs;
    // eslint-disable-next-line no-param-reassign
    variables = roboConfig.variables;
  }

  assert(Array.isArray(configNames) && configNames.every(configName => configName.split('/').length === 2));
  assert(variables instanceof Object && !Array.isArray(variables));

  const result = applyConfigRec(configNames, variables, projectRoot);
  if (sfs.smartWrite(path.join(projectRoot, confDocsPath), generateDocsRec(configNames))) {
    result.push(`Updated: ${confDocsPath}`);
  }
  return result;
};
