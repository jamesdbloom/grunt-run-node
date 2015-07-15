/*
 * grunt-run-node
 * https://github.com/jamesdbloom/grunt-run-node
 *
 * Copyright (c) 2014 James Bloom
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var extend = require('util')._extend;
var processList;

module.exports = function (grunt) {

    processList = (function (grunt) {
        var spawn = require('child_process').spawn,
            processes = [];

        return {
            add: function (command, args, options) {
                processes.unshift(spawn(command, args, options));
                grunt.log.ok("Started " + command + " " + args.join(" "));
            },
            stop_all: function () {
                for (var i = 0; i < processes.length; i++) {
                    processes[i].kill();
                }
                grunt.log.ok('Stopped %s launched node processes', processes.length);
            }
        };
    })(grunt);

    grunt.registerMultiTask('run_node', 'Start node asynchronously from your grunt build.', function () {
        // mark task as asynchronous
        var done = this.async();
        var options = this.options({
            cwd: process.cwd(),
            stdio: [],
            env: process.env,
            detached: true
        });
        options.env = extend(process.env, options.env);
        options.stdio = options.stdio || [ 'ignore', (grunt.option('verbose') ? process.stdout : 'ignore'), process.stderr ];

        this.files.forEach(function (file) {
            file.src.forEach(function (filepath, index, array) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    done(false);
                } else {
                    // amend filepath if cwd is specified
                    if (options.cwd !== process.cwd()) {
                        filepath = path.resolve(filepath).replace(path.resolve(options.cwd) + '/', '');
                    }
                    processList.add('node', [filepath], options);
                }
                // last element
                if (index === array.length - 1) {
                    done(true);
                }
            });
        });
    });

    grunt.registerMultiTask('stop_node', 'Stops node instances previously started from your grunt build.', function () {
        processList.stop_all();
    });

    // stop all started node processes on exit
    process.on('exit', function(code) {
        processList.stop_all();
    });
};
