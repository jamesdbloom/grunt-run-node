'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.run_node = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        var exec = require('child_process').exec,
            ps, pkill;
        test.expect(1);
        ps = exec('ps -ef | grep node',
            function (error, stdout, stderr) {
                debugger;
                test.equal(stdout, "foo bar", 'check node process is currently running');
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        ps.on('exit', function (code) {
            exec('pkill -INT -f node',
                function (error, stdout, stderr) {
                    debugger;
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            ps.on('exit', function (code) {
                test.done();
            });
        });
    },
    custom_options: function (test) {
        var exec = require('child_process').exec,
            ps, pkill;
        test.expect(1);
        ps = exec('ps -ef | grep node',
            function (error, stdout, stderr) {
                debugger;
                test.equal(stdout, "foo bar", 'check node process is currently running');
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        ps.on('exit', function (code) {
            pkill = exec('pkill -INT -f node',
                function (error, stdout, stderr) {
                    debugger;
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            ps.on('exit', function (code) {
                test.done();
            });
        });
    }
};
