const os_util = require('../index');

const f1 = (exitSignal, exitValue) => {
	console.log('f1' + exitSignal + exitValue);
};

const f2 = (exitSignal, exitValue) => {
	console.log('f2' + exitSignal + exitValue);
};

os_util.exitHandlers(f1, f2);
