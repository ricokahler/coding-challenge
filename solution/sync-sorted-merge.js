"use strict";

// Print all entries, across all of the sources, in chronological order.


const getListOfEntries = logSources => {
  const list = [];
  logSources.map(source => {
    let entry = source.pop();
    while (entry !== false) {
        list.push(entry);
        entry = source.pop()
      }
    });
    return list;
}

const printLogs = (logSources, printer) => {
  let allEntries = getListOfEntries(logSources);
  allEntries.map(entry => {
      return printer.print(entry);
  });
  
  return printer.done();
}


module.exports = (logSources, printer) => {
  printLogs(logSources, printer);
  return console.log("Sync sort complete.");
};
