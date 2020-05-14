const assert = require('assert');

const os_util = require('../index');

const testArray = [1, 2, 3, 4];
const testFunction = () => {};
const testNum = 123;
const testObj = { "a": "b" };
const testString = 'avalue';

let tmp1;
let tmp2;

// exitHandlers
assert.equal(os_util.exitHandlers(testFunction), true, 'A test function is valid');
assert.throws(function () { os_util.exitHandlers(); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(undefined); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(null); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(testArray); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(testNum); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(testObj); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(testString); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(false); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.exitHandlers(true); }, Error, 'Expected an exception!');
tmp1 = os_util.systemSync('node ./test/OKExit.js');
assert.equal(tmp1.status, 0, 'OK exit code');
assert.equal(tmp1.message, null, 'OK exit message');
assert.equal(tmp1.stderr, null, 'OK standard error');
assert.equal(tmp1.stdout, "f1exit0\nf2exit0\n", 'OK standard out');
tmp1 = os_util.systemSync('node ./test/ExceptionExit.js');
assert.equal(tmp1.status, 1, 'Not OK exit code');
assert.equal(tmp1.message.startsWith('Command failed'), true, 'Not OK exit message');
assert.equal(tmp1.stderr.startsWith('Error: THIS IS AN EXPECTED TESTING EXCEPTION, THIS IS NOT AN ERROR'), true, 'Not OK standard error');
assert.equal(tmp1.stdout, "f1exit1\nf2exit1\n", 'Not OK standard out');
console.log('exitHandlers testing success');

// getEnviromentVariable
tmp1 = 'aenvname';
tmp2 = 'adefaultvalue';
assert.throws(function () { os_util.getEnviromentVariable(); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(undefined); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(null); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(testArray); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(testNum); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(testObj); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(false); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(true); }, Error, 'Expected an exception!');
assert.throws(function () { os_util.getEnviromentVariable(tmp1, null, true); }, Error, 'Expected an exception!');
assert.equal(os_util.getEnviromentVariable(tmp1), undefined, 'An undefined variable gets the undefined default');
assert.equal(os_util.getEnviromentVariable(tmp1, tmp2), tmp2, 'An undefined env variable gets default value');
process.env[tmp1] = tmp2;
assert.equal(os_util.getEnviromentVariable(tmp1, 'somethingelse', true), tmp2, 'An defined env variable gets the set value');
assert.equal(os_util.getEnviromentVariable(tmp1, null, true), tmp2, 'An defined env variable gets the set value');
console.log('getEnviromentVariable testing success');
