const objectDeepContain = require('object-deep-contain');

const mergeRec = (target, changeset) => Object
  .entries(target || {})
  .map(([attr, elements]) => {
    const changesetElements = changeset[attr];

    if (!Array.isArray(elements)) {
      if (changesetElements !== undefined) {
        return [attr, changesetElements];
      }
      return [attr, elements];
    }

    let next = 0;
    for (let idx = 0, len = elements.length; idx < len && next < changesetElements.length; idx += 1) {
      const targetElement = elements[idx];
      const toInsert = changesetElements[next];

      if (objectDeepContain(
        targetElement,
        Object
          .entries(toInsert)
          .reduce((p, [k, v]) => Object.assign(p, k === 'elements' ? {} : { [k]: v }), {})
      )) {
        // eslint-disable-next-line no-param-reassign
        elements[idx] = mergeRec(targetElement, toInsert);
        next += 1;
      }
    }
    elements.push(...changesetElements.slice(next));
    return [attr, elements];
  })
  .reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {});

module.exports = (target, changeset) => Object.assign(target, { data: mergeRec(target.data, changeset.data) });
