/*
 * grunt-run-node
 * https://github.com/jamesdbloom/grunt-run-node
 *
 * Copyright (c) 2014 James Bloom
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        run_node: {
            default_options: {
                options: {
                },
                files: [
                    {
                        src: 'test/helper/default_options_server.js'
                    }
                ]
            },
            custom_options: {
                options: {
                    cwd: './test/helper',
                    stdio: [ 'ignore', 'ignore', 'ignore' ],
                    env: {
                        'foo': 'bar'
                    },
                    detached: true
                },
                files: [
                    {
                        src: 'test/helper/custom_options_server.js'
                    }
                ]
            }
        },

        stop_node: {

        },

        // Unit tests.
        nodeunit: {
            tests: ['test/run_node_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['run_node', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
