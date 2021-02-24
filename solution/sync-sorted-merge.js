'use strict';

module.exports = (logSources, printer) => {
  // run this code until all logSources have been drained
  while (logSources.every((logSource) => !logSource.drained)) {
    // assign the first logSource as the first oldest
    let oldest = logSources[0];

    // iterate through every log source and check if the `last` value is older
    // than our current oldest. if it is, then assign that as the oldest
    for (const logSource of logSources) {
      if (logSource.last.date.getTime() > oldest.last.date.getTime()) {
        oldest = logSource;
      }
    }

    // after that's all done, print the oldest
    printer.print(oldest.last);

    // move this logSource forward
    oldest.pop();
  }

  printer.done();
};
