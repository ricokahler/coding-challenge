'use strict'

const _ = require('lodash')

const getGroupsOfLogs = logSources => {
	const logPromises = logSources.map(logSource => {
		return logSource.popAsync();
	});

	return Promise.all(logPromises).then(logs => {
		return logs;
	})
};


const activeLogSources = (logs, logSources) => {
	let activeSources = [];
	logs.forEach( (log, i) => {
		if (log) {
			activeSources.push(logSources[i]);
		}
	});

	return activeSources;
};

const getLogs = (logSources, printer) => {
	let activeSources = logSources;
	let allLogs = [];
	let firstGroup = true;

	return new Promise( (resolve, reject) => {
		const getLogsRecursive = logSources => {
			if (logSources.length > 0) {
				getGroupsOfLogs(logSources).then(logs => {
					activeSources = activeLogSources(logs, logSources);
					allLogs = allLogs.concat(logs);
					if (firstGroup) {
						allLogs = _.sortBy(allLogs, l => l.date);
						printer.print(allLogs.shift());
						firstGroup = false;
					}
					getLogsRecursive(activeSources);
				});
			} else {
				resolve(allLogs);
			}
		};

		getLogsRecursive(logSources);
	});
};

module.exports = (logSources, printer) => {
	getLogs(logSources, printer).then(allLogs => {

		_.sortBy(allLogs, l => l.date).forEach(log => {
			if (log) {
				printer.print(log);
			}
		});
		printer.done();
	});
};




// "use strict";

// const { resolve } = require('bluebird');
// const _ = require('lodash')
// // Print all entries, across all of the *async* sources, in chronological order.

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

// const updateLogSources = (logs, logSources) => {
//   let activeSources = [];
//   logs.forEach( (log, i) => {
//     if (log) {
//       activeSources.push(logSources[i])
//     }
//   });
//   return activeSources
// }

// const printLogs = (logSources, printer) => {
//   let activeLogSources = logSources;
//   let allLogs = [];
//   let firstBatch = true;

//   return new Promise((resolve, reject) => {
//     const getLogsRecursive = logSources => {
//       if(logSources.length > 0) {
//         getBatchOfLogs(logSources).then(logs => {
//           activeLogSources = updateLogSources(logs,logSources);
//           allLogs = allLogs.concat(logs);
//           if (firstBatch) {
//             allLogs = _.sortBy(allLogs, 1 => 1.date);
//             printer.print(allLogs.shift());
//             firstBatch = false;
//           }
//           getLogsRecursive(activeLogSources);
//         });
//       } else {
//         resolve(allLogs);
//       }
//     };
//     getLogsRecursive(logSources);
//   });
// };

// module.exports = (logSources, printer) => {
//   printLogs(logSources, printer).then(allLogs => {
//     _.sortBy(allLogs, 1 => 1.date).forEach(log => {
//         if (log) {
//           printer.print(log);
//         }
//       });
//       printer.done();
//     });
//   return new Promise((resolve, reject) => {
//     resolve(console.log("Async sort complete."));
//   });
// };
