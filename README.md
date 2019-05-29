# Prose/OS

Copyright (c) 2019 Seán D. Murray
SEE MIT LICENSE FILE

An OS Utility. Make writing node easier, prettier and less error prone. Writes and reads more like prose.

## Usage

```javascript
const os_util = require('prose_os');

// The 1 or more functions passed in will be called in order when the
// system exits. The called functions will have 2 arguments passed:
// * exitSignal is a string value for the reason the sytem exited such as 'exit' or 'SIGINT' (a ctl-c).
// * exitValue the exit value that will be returned to the system.. 0 = all is OK, 1 = a failure.
// WARNING: functions must be short and have no ASYNC calls!!
os_util.exitFunctions(functionOne, functionTwo);

// Get the value assigned to a OS environmental variable.
// If a value was set that is returned.
// If a value is not set and a default is passed in that is returned.
// If a default was not set, undefined is returned.
// The last argument determines if the OS env variable was required.
// If it is set to true and os env variable is not set, and error is trown.
os_util.getEnviromentVariable('MY_OS_ENV_VARIABLE_NAME', 'A_DEFAULT_VALUE', true);

// Run an external command in synchronous mode.
// When the process completes, returns an obect as follows:
// const result = {
//   status: 0|1, // 0 = returns OK, 1 = failed.
//   message: 'Any exceptions messages',
//   stderr: 'Output to the standard error',
//   stdout: 'Opuput top the standard out'
// };
os_util.systemSync('/path/to/some/executable/here/');

```
