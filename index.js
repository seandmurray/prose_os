/* jshint esversion: 6 */
// Copyright (c) 2019 Seán D. Murray
// SEE MIT LICENSE FILE
const child_process = require('child_process');

const array_util = require('prose_array');
const isit = require('prose_isit');
const string_util = require('prose_string');

const PROCESS_EXIT_EMITS = ['exit', 'SIGINT'];

const EMIT_UNCAUGHT_EXCEPTION = 'uncaughtException';
const EMIT_UNHANDLED_REJECTION = 'unhandledRejection';

const EXIT_HANDLERS = [];
const UNCAUGHT_EXCEPTION_HANDLERS = [];
const UNHANDLED_REJECTION_HANDLERS = [];

const CALL_EXIT_HANDLERS = (exitSignal, exitValue) => {
	for (const handler of EXIT_HANDLERS) {
		handler(exitSignal, exitValue);
	}
	process.exit(exitValue);
};

/// START THIS IS EXECUTED WHEN 1st used.
for (const exitSignal of PROCESS_EXIT_EMITS) {
	process.on(exitSignal, (exitValue) => {
		CALL_EXIT_HANDLERS(exitSignal, exitValue);
	});
}

process.on(EMIT_UNCAUGHT_EXCEPTION, (error, origin) => {
	if (array_util.isEmpty(UNCAUGHT_EXCEPTION_HANDLERS)) {
		console.error(error.stack);
	}
	else {
		for (const handler of UNCAUGHT_EXCEPTION_HANDLERS) {
			handler(error, origin);
		}
	}
	process.exit(1);
});

process.on(EMIT_UNHANDLED_REJECTION, (reason, promise) => {
	if (array_util.isEmpty(UNCAUGHT_EXCEPTION_HANDLERS)) {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
		process.exit(1);
	}
	else {
		for (const handler of EXIT_HANDLERS) {
			handler(reason, promise);
		}
	}
});
/// END

function addHandlers(collection, ...handlers) {
	handlers = array_util.flatten(handlers);
	if (array_util.isEmpty(handlers)) throw new Error('A least one valid function is required!');
	for (const handler of handlers) {
		if (isit.notFunction(handler)) throw new Error('A valid function is required!');
		collection.push(handler);
	}
	return true;
}

exports.exitHandlers = (...handlers) => {
	return addHandlers(EXIT_HANDLERS, handlers);
};

exports.getEnviromentVariable = (name, aDefault, required = false) => {
	if (isit.notString(name) || string_util.isBlank(name)) throw new Error('The environment name must be a non blank string');
	if (isit.notBoolean(required)) throw new Error('The "required" parameter must be a boolean');
	const result = process.env[name];
	if (required) {
		if (string_util.isBlank(result)) throw new Error('The environmental variable: "' + name + '" is required.');
	}
	else {
		if (string_util.isBlank(result)) return aDefault;
	}
	return result;
};

exports.uncaughtExceptionHandlers = (...handlers) => {
	return addHandlers(UNCAUGHT_EXCEPTION_HANDLERS, handlers);
};

exports.unhandledRejectionHandlers = (...handlers) => {
	return addHandlers(UNHANDLED_REJECTION_HANDLERS, handlers);
};

exports.systemSync = (cmd) => {
	const result = {
		status: 0,
		message: null,
		stderr: null,
		stdout: null,
	};
	try {
		result.stdout = child_process.execSync(cmd).toString();
	}
	catch (error) {
		result.status = error.status;
		result.message = error.message.toString();
		result.stderr = error.stderr.toString();
		result.stdout = error.stdout.toString();
	}
	return result;
};
