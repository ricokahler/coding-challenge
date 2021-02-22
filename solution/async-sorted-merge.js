"use strict";

//Print all entries, across all of the *async* sources, in chronological order.

const sortedByDate = (entriesList) => {
	let sortedEntryList = entriesList.sort((a,b) => a.date - b.date)
	return sortedEntryList;
  }

const printLogs = async (logSources, printer) => {
	let list = []; 
	
	logSources.forEach( async (source) => {
			let entry = await source.popAsync();
			while (entry !== false) {
				list.push(entry);
				entry = await source.popAsync();
			}
			let sortedList = await list.sort((b,a) => b.date - a.date)
			sortedList.forEach( async (entry) =>{
			return await printer.print(entry);
		})
		return printer.done();	
	})
}

module.exports = (logSources, printer) => {
	return new Promise((resolve, reject) => {
	  printLogs(logSources, printer);
	  resolve(console.log("Async sort complete."));
	});
  };

//   let entries = list.sort((b,a) => b.date - a.date);
	// 	entries.map(entry => printer.print(entry))

	//   const promises = logSources.map(async source => {
	// 	let list = [];
	// 	let entry = await source.popAsync();
	// 	while(entry !== false) {
	// 		list.push(entry)
	// 		entry = await source.popAsync()
	// 	}
	// 	console.log(list);
	//   })

	//   const entries = await Promise.all(promises)
	//   console.log(entries.length)
	//   console.log('end')

	// const getListOfEntries = async (source) => {
		
	// 		let entries = await list.sort((b,a) => b.date - a.date)
	// 		let print = await entries.map(entry => {
	// 			printer.print(entry)
	// 		})
	// 		Promise.all(await sortedEntries.map( entry => printer.print(entry)))
	// 			// sortedList.map( entry => {
	// 			// 	return printer.print(entry);
	// 			// })
			
	// 	}





//Working Solution

// const _ = require('lodash')

// const getBatchOfLogs = logSources => {
// 	const logPromises = logSources.map(logSource => {
// 		return logSource.popAsync();
// 	});

// 	return Promise.all(logPromises).then(logs => {
// 		return logs;
// 	}).catch(reason => {
// 		throw new Error(reason);
// 	});
// };

// // Get list of active log sources
// const updateLogSources = (logs, logSources) => {
// 	let activeSources = [];
// 	logs.forEach( (log, i) => {
// 		if (log) {
// 			activeSources.push(logSources[i]);
// 		}
// 	});

// 	return activeSources;
// };

// const getAllLogs = (logSources, printer) => {
// 	let activeLogSources = logSources;
// 	let allLogs = [];
// 	let firstBatch = true;

// 	// Recursively batches of log messages
// 	return new Promise( (resolve, reject) => {
// 		const getLogsRecursive = logSources => {
// 			if (logSources.length > 0) {
// 				getBatchOfLogs(logSources).then(logs => {
// 					activeLogSources = updateLogSources(logs, logSources);
// 					allLogs = allLogs.concat(logs);
// 					if (firstBatch) {
// 						// This is just to start the clock inside printer
// 						allLogs = _.sortBy(allLogs, l => l.date);
// 						printer.print(allLogs.shift());
// 						firstBatch = false;
// 					}
// 					getLogsRecursive(activeLogSources);
// 				});
// 			} else {
// 				resolve(allLogs);
// 			}
// 		};

// 		getLogsRecursive(logSources);
// 	});
// };

// const printLogsInOrder = (logSources, printer) => {
// 	getAllLogs(logSources, printer).then(allLogs => {
// 		console.log("Successfully got all logs!");

// 		_.sortBy(allLogs, l => l.date).forEach(log => {
// 			if (log) {
// 				printer.print(log);
// 			}
// 		});
// 		printer.done();
// 	});
// };

// module.exports = printLogsInOrder;