# grunt-run-node 

[![Build status](https://badge.buildkite.com/ceeff74e5709223c5f087943d4b1afa6b660da95b11737fe8f.svg?style=square&theme=slack)](https://buildkite.com/mockserver/grunt-run-node) [![Dependency Status](https://david-dm.org/jamesdbloom/grunt-run-node.png)](https://david-dm.org/jamesdbloom/grunt-run-node) [![devDependency Status](https://david-dm.org/jamesdbloom/grunt-run-node/dev-status.png)](https://david-dm.org/jamesdbloom/grunt-run-node#info=devDependencies) [![Code Climate](https://codeclimate.com/github/jamesdbloom/grunt-run-node.png)](https://codeclimate.com/github/jamesdbloom/grunt-run-node) 

> Start and stop node asynchronously from your grunt build.

Grunt task to simplify testing by asynchrounously starting and stopping one or more node servers during the grunt build.  This plugin contains two separate tasks `run_node` and `stop_node`.  `run_node`will typically be used before test to start the system under test and `stop_node` will typically be used once the tests have been completed.

[![NPM](https://nodei.co/npm/grunt-run-node.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-run-node/)

## Getting Started
This plugin requires Grunt `^1.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-run-node --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-run-node');
```

## The "run_node" task

### Overview
In your project's Gruntfile, add a section named `run_node` to the data object passed into `grunt.initConfig()` to start one or more node servers asynchronously.  To stop previously started node servers use the `stop_node` task.

```js
grunt.initConfig({
    run_node: {
        start: {
            options: {
                cwd: 'test',
                stdio: [ 'ignore', 'ignore', 'ignore' ],
                env: {
                    'foo': 'bar'
                },
                detached: true
            },
            files: { src: [ 'server/server.js'] }
        }
    },
    stop_node: {
        stop: {}
    }
});
```

### Options

#### options.cwd
Type: `String`

Default value: `process.cwd()`

Used to set the current working directory for the executing node processes.

#### options.stdio
Type: `String`

Default value: `[ 'ignore', (grunt.option('verbose') ? process.stdout : 'ignore'), process.stderr ]`

The `stdio` option is an array where each index corresponds to a stream in the node process.

The value is one of the following:

* `pipe` - Create a pipe between the child process and the parent process. The parent end of the pipe is exposed to the parent as a property on the child_process object as ChildProcess.stdio[*file descriptor*]. Pipes created for file descriptors 0 - 2 are also available as ChildProcess.stdin, ChildProcess.stdout and ChildProcess.stderr, respectively.
* `ipc` - Create an IPC channel for passing messages/file descriptors between parent and child. A ChildProcess may have at most one IPC stdio file descriptor. Setting this option enables the ChildProcess.send() method. If the child writes JSON messages to this file descriptor, then this will trigger ChildProcess.on('message'). If the child is a Node.js program, then the presence of an IPC channel will enable process.send() and process.on('message').
* `ignore` - Do not set this file descriptor in the child. Note that Node will always open file descriptor 0 - 2 for the processes it spawns. When any of these is ignored node will open /dev/null and attach it to the child's file descriptor.
* **Stream object** - Share a readable or writable stream that refers to a tty, file, socket, or a pipe with the child process. The stream's underlying file descriptor is duplicated in the child process to the file descriptor that corresponds to the index in the stdio array. Note that the stream must have an underlying descriptor (file streams do not until the 'open' event has occurred).
* **Positive integer** - The integer value is interpreted as a file descriptor that is is currently open in the parent process. It is shared with the child process, similar to how Stream objects can be shared.
* **null** or **undefined** - Use default value. For stdio file descriptors 0, 1 and 2 (in other words, stdin, stdout, and stderr) a pipe is created. For file descriptor 3 and up, the default is 'ignore'.

As a shorthand, the stdio argument may also be one of the following strings, rather than an array:

* `'ignore'` - `['ignore', 'ignore', 'ignore']`
* `'pipe'` - `['pipe', 'pipe', 'pipe']`
* `'inherit'` - `[process.stdin, process.stdout, process.stderr]` or `[0,1,2]`

#### options.env
Type: `Object`

Default value: `{}`

Env can be used to specify environment key-value variables that will be visible to the new process.

#### options.detached
Type: `Boolean`

Default value: `false`

If the detached option is set, the child process will be made the leader of a new process group. This makes it possible for the child to continue running after the parent exits.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-03-05   v0.1.0   Released run_node and stop_node tasks
 * 2015-06-19   v0.1.1   Improved options support & updated dependencies
 * 2015-07-30   v0.1.2   Multiple minor tweaks
 * 2015-07-30   v0.1.3   More minor tweaks and fixes
 * 2016-07-27   v0.1.4   Updating dependencies
 * 2016-07-27   v0.1.5   Downgraded version of sleep to fix build
 * 2016-10-09   v0.1.6   Downgrading version of grunt
 * 2017-04-29   v0.1.7   Updated build & other badges

---

[James D Bloom](http://blog.jamesdbloom.com)
