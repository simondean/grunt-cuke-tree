/*
 * grunt-cuke-tree
 * https://github.com/simondean/grunt-cuke-tree
 *
 * Copyright (c) 2013 Simon Dean
 * Licensed under the MIT license.
 */

'use strict';

var WinSpawn = require('win-spawn');
var Path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cuketree', 'Runs cucumber tests via cuke-tree', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var cuketreeBin = 'node_modules/.bin/cuketree';
    var cuketreeArgs = [];

    if (options.config) {
      cuketreeArgs.push('-c');
      cuketreeArgs.push(options.config);
    }

    var cuketreeConfig = require(Path.resolve(options.config || 'default') + '.cukeTree.js');

    var inputDir = Path.dirname(cuketreeConfig.input);
    var outputDir = Path.dirname(cuketreeConfig.output);
    grunt.verbose.ok('Creating directory ' + inputDir);
    grunt.file.mkdir(inputDir);
    grunt.verbose.ok('Creating directory ' + outputDir);
    grunt.file.mkdir(outputDir);

    var done = this.async();

    grunt.verbose.ok('Launching cuketree');
    grunt.verbose.writeflags({
      bin: cuketreeBin,
      args: cuketreeArgs
    });

    // See https://github.com/joyent/node/issues/2318 for the reason that
    // win-spawn has to be used instead of child_process
    var cuketreeProcess = new WinSpawn(cuketreeBin, cuketreeArgs, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    var cuketreeStdout = [];
    var cuketreeStderr = [];

    cuketreeProcess.stdout.on('data', function(data) {
      cuketreeStdout.push(data.toString());
    });

    cuketreeProcess.stderr.on('data', function(data) {
      cuketreeStderr.push(data.toString());
    });

    var finished = false;

    function error(msg) {
      grunt.log.error();
      if (cuketreeStderr.length > 0) { grunt.log.errorlns(cuketreeStderr.join('')); }
      if (msg) { grunt.log.error(msg); }
    }

    cuketreeProcess.on('error', function(err) {
      if (finished) { return; }
      finished = true;

      error(err);
      grunt.fail.warn('Failed to execute cuke-tree');
    });

    cuketreeProcess.on('close', function(code, signal) {
      if (finished) { return; }
      finished = true;

      if (code !== 0) {
        error();
        grunt.fail.warn('Something failed.  cuketree exit status was ' + code);
      }
      else {
        grunt.verbose.ok();
        done();
      }
    });
  });

};