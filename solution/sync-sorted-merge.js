"use strict";

// Print all entries, across all of the sources, in chronological order.



module.exports = (logSources, printer) => {
  console.log(logSources[0].pop());
  return console.log("Sync sort complete.");
};
