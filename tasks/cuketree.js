/*
 * grunt-cuke-tree
 * https://github.com/simondean/grunt-cuke-tree
 *
 * Copyright (c) 2013 Simon Dean
 * Licensed under the MIT license.
 */

'use strict';

var Path = require('path');
var OS = require('os');
var ChildProcess = require('child_process');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cuketree', 'Runs cucumber tests via cuke-tree', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var possibleBinPaths = ['node_modules/.bin/cuketree', 'node_modules/grunt-cuke-tree/.bin/cuketree'];
    var binPath = null;
    
    for (var i = 0; i < possibleBinPaths.length; i++) {
      var possibleBinPath = possibleBinPaths[i];
      
      grunt.verbose.ok('Checking whether ' + possibleBinPath + ' exists');
      if (grunt.file.exists(possibleBinPath)) {
        grunt.verbose.ok('Found ' + possibleBinPath);
        binPath = possibleBinPath;
        break;
      }
    }
    
    if (!binPath) {
      grunt.fail.warn('Failed to find cuketree bin');
    }
    
    var cuketreeArgs = [binPath];

    if (options.config) {
      cuketreeArgs.push('-c');
      cuketreeArgs.push(options.config);
    }

    // See https://github.com/joyent/node/issues/2318 for the reason that
    // cmd.exe has to be used on Windows
    if (OS.type() === 'Windows_NT') {
      cuketreeArgs[0] = cuketreeArgs[0].replace(/\//g, '\\');
      cuketreeArgs = ['cmd.exe', '/c', cuketreeArgs.join(' ')];
    }
    
    var cuketreeBin = cuketreeArgs.shift();

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

    var cuketreeProcess = ChildProcess.spawn(cuketreeBin, cuketreeArgs, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    cuketreeProcess.stdout.on('data', function(data) {
      grunt.log.oklns(data.toString());
    });

    cuketreeProcess.stderr.on('data', function(data) {
      grunt.log.errorlns(data.toString());
    });

    var finished = false;

    function error(msg) {
      grunt.log.error();
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
