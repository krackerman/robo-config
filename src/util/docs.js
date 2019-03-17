const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const documentTask = (heading, task, level) => {
  assert(typeof heading === 'string');
  assert(task instanceof Object && !Array.isArray(task));
  assert(Number.isInteger(level));

  const result = [];
  if (typeof task.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${heading}`, '');
    result.push(`_Updating \`${task.target}\` using \`${task.strategy}\`._`);
    result.push('');
    if (task.requires.length !== 0) {
      result.push(`_Requires ${task.requires.map(r => `\`${r}\``).join(', ')}._`);
      result.push('');
    }
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} \`${heading}\``, '');
    result.push(task.description);
    result.push('');
  }
  return result;
};

const generateDocs = (taskNames, baseLevel = 0) => {
  assert(Array.isArray(taskNames) && taskNames.every(e => typeof e === 'string'));
  assert(Number.isInteger(baseLevel));

  const tasks = taskNames.map(taskName => ({ level: baseLevel, taskName }));

  // expand tasks with subtasks
  for (let idx = 0; idx < tasks.length; idx += 1) {
    const { level, taskName } = tasks[idx];
    const task = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'tasks', taskName)));
    tasks[idx].task = task;
    tasks.splice(idx + 1, 0, ...(task.tasks || [])
      .sort((a, b) => b.includes('/@') - a.includes('/@'))
      .map(subtaskName => ({ level: level + 1, taskName: subtaskName })));
  }

  const result = [];

  // generate docs for tasks
  let lastLevel = baseLevel;
  tasks.forEach(({ level, taskName, task }) => {
    if (lastLevel < level) {
      result.push(`${'  '.repeat(lastLevel)}<details>`);
      result.push(`${'  '.repeat(lastLevel + 1)}<summary>Details</summary>`);
      result.push('');
    } else if (lastLevel > level) {
      result.push(`${'  '.repeat(level)}</details>`);
      result.push('');
    }
    result.push(...documentTask(taskName, task, level + 1));
    lastLevel = level;
  });
  result.push('</details>');
  result.push('');

  return result;
};
module.exports.generateDocs = generateDocs;
