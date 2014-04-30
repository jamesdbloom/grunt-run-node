/*
 * grunt-run-node
 * https://github.com/jamesdbloom/grunt-run-node
 *
 * Copyright (c) 2014 James Bloom
 * Licensed under the MIT license.
 */

'use strict';

var processList = (function () {
    var spawn = require('child_process').spawn,
        processes = [];

    return {
        add: function(command, args, options){
            processes.shift(spawn(command, args, options));
            grunt.log.ok("Started " + command + " " + args.join(" "));
        },
        stop_all: function () {
            for (var i = 0; i < processes.length; i++) {
                processes[i].kill();
            }
        }
    };
})();

module.exports = function (grunt) {

    grunt.registerMultiTask('run_node', 'Start node asynchronously from your grunt build.', function () {
        // tell Grunt this task is asynchronous.
        var done = this.async();

        var options = this.options({
                cwd: process.cwd(),
                stdio: [ 'ignore', (grunt.option('verbose') ? process.stdout : 'ignore'), process.stderr ]
            });

        this.files.forEach(function (file) {
            file.src.forEach(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    processList.add('node', [filepath], {
                        cwd: options.cwd,
                        stdio: options.stdio,
                        env: options.env,
                        detached: options.detached
                    });
                    return true;
                }
            });
        });

        require('sleep').sleep(1);

        done(true);
    });

    grunt.registerMultiTask('stop_node', 'Stops node instances previously started from your grunt build.', function () {
        processList.stop_all();
    });

};
