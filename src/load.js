const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listTasks, extractMeta } = require('./plugin/task');

module.exports = (pl) => {
  assert(Object.keys(pl).length === 4, 'Unknown property exposed.');
  assert(typeof pl.taskDir === 'string');
  assert(typeof pl.reqDir === 'string');
  assert(typeof pl.varDir === 'string');
  assert(typeof pl.docDir === 'string');

  return ({
    syncDocs: () => syncDocs(pl.taskDir, pl.reqDir, pl.varDir, pl.docDir),
    generateDocs: (pluginName, taskNames) => [
      `## Plugin [${pluginName}](https://www.npmjs.com/package/${pluginName})`,
      '',
      ...generateDocs(pl.taskDir, pl.reqDir, pl.varDir, taskNames, 2)
    ],
    apply: (projectRoot, taskNames, variables) => applyTasksRec(pl.taskDir, projectRoot, taskNames, variables),
    test: (projectRoot, variables = {}) => {
      const taskNames = listTasks(pl.taskDir);
      const meta = extractMeta(pl.taskDir, taskNames);

      const unexpectedVars = Object.keys(variables).filter(v => meta.variables.includes(v));
      assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);

      const vars = meta.variables.reduce((p, c) => Object.assign(p, { [c]: p[c] || c }), variables);
      const result = applyTasksRec(pl.taskDir, projectRoot, taskNames, vars);
      if (sfs.smartWrite(path.join(projectRoot, 'CONFDOCS.md'), [
        '## Example CONFDOCS.md',
        '',
        ...generateDocs(pl.taskDir, pl.reqDir, pl.varDir, taskNames, 2)
      ])) {
        result.push('Updated: CONFDOCS.md');
      }
      return result;
    }
  });
};
