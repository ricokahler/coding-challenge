"use strict";

// Print all entries, across all of the sources, in chronological order.

const sortedByDate = (entriesList) => {
  let sortedEntryList = entriesList.sort((a,b) => a.date - b.date)
  return sortedEntryList;
}


const getListOfEntries = logSources => {
  const list = [];
  logSources.map(source => {
    let entry = source.pop();
    while (entry !== false) {
        list.push(entry);
        entry = source.pop();
      }
    });
    return list;
}

const printLogs = (logSources, printer) => {
  let allEntries = getListOfEntries(logSources);
  sortedByDate(allEntries);
  allEntries.map(entry => {
      return printer.print(entry);
  });
  return printer.done();
}


module.exports = (logSources, printer) => {
  printLogs(logSources, printer);
  return console.log("Sync sort complete.");
};
