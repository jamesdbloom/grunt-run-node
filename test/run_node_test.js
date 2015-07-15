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
        ps = exec('ps -ef | grep -v grep | grep default_options_server.js | awk \'{ print $8 \" \" $9; }\'',
            function (error, stdout, stderr) {
                test.equal(stdout, "node test/helper/default_options_server.js\n", 'check node process is currently running');
                if (error !== null) {
                    grunt.log.error('exec error: ' + error);
                }
            });
        ps.on('exit', function (code) {
            pkill = exec('pkill -INT -f default_options_server.js',
                function (error, stdout, stderr) {
                    if (error !== null) {
                        grunt.log.error('exec error: ' + error);
                    }
                });
            pkill.on('exit', function (code) {
                test.done();
            });
        });
    },
    custom_options: function (test) {
        var exec = require('child_process').exec,
            ps, pkill;
        test.expect(1);
        ps = exec('ps -ef | grep -v grep | grep custom_options_server.js | awk \'{ print $8 \" \" $9; }\'',
            function (error, stdout, stderr) {
                test.equal(stdout, "node custom_options_server.js\n", 'check node process is currently running');
                if (error !== null) {
                    grunt.log.error('exec error: ' + error);
                }
            });
        ps.on('exit', function (code) {
            pkill = exec('pkill -INT -f custom_options_server.js',
                function (error, stdout, stderr) {
                    if (error !== null) {
                        grunt.log.error('exec error: ' + error);
                    }
                });
            pkill.on('exit', function (code) {
                test.done();
            });
        });
    }
};
