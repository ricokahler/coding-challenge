"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const sortedByDate = (entriesList) => {
  let sortedEntryList = entriesList.sort((a,b) => a.date - b.date)
  return sortedEntryList;
}


const getListOfEntries = logSources  => {
  const logSourcePromises = logSources.map(source => {
      return source.popAsync();
    });
  
   return logSourcePromises;
}

const printLogs = (logSources, printer) => {
  let allEntries = getListOfEntries(logSources);
  // allEntries.then(log => {return log})
  // sortedByDate(allEntries);
  // allEntries.map(entry => {
  //     return printer.print(entry);
  // });
  // return printer.done();
  console.log(allEntries)
}

module.exports = (logSources, printer) => {
  printLogs(logSources, printer)
  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
