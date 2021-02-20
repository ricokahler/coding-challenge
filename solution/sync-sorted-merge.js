"use strict";

// Print all entries, across all of the sources, in chronological order.

const sortedByDate = (entriesList) => {
  let sortedEntryList = entriesList.sort((a,b) => a.date - b.date)
  return sortedEntryList;
}


const getListOfEntries = logSources => {
  const list = [];
  logSources.map(source => {
      while (source.drained === false) {
        let entry = source.pop();
        list.push(entry);
      } 
    });
    return list;
}

const printLogs = (logSources, printer) => {
  let allEntries = getListOfEntries(logSources);
  let sortedEntries = sortedByDate(allEntries);
  let printedEntries = sortedEntries.map(entry => {
    if(entry.date) {
    return printer.print(entry)
    } else { entry.date === undefined }
  });
  console.log(printedEntries);
}


module.exports = (logSources, printer) => {
  printLogs(logSources, printer);
  return console.log("Sync sort complete.");
};
