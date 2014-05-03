"use strict";

console.log("My command line arguments are: " + process.argv.join(' '));
console.log("My system arguments are: " + JSON.stringify(process.env, null, 2));

require('sleep').sleep(60);