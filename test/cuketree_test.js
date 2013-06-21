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

exports.cuketree = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(3);

    test.equal(grunt.file.exists('tmp/cucumber/default_report.js'), true, 'cucumber JSON report does not exist');
    test.equal(grunt.file.read('tmp/cucumber/default_report.js'), grunt.file.read('test/expected/cucumber/default_report.js'), 'Content of cucumber JSON report does not match expected content');
    test.equal(grunt.file.exists('tmp/cuketree/default_report/report.htm'), true, 'cuketree HTML report does not exist');

    test.done();
  },
  custom_options: function(test) {
    test.expect(3);

    test.equal(grunt.file.exists('tmp/cucumber/custom_report.js'), true, 'cucumber JSON report does not exist');
    test.equal(grunt.file.read('tmp/cucumber/custom_report.js'), grunt.file.read('test/expected/cucumber/custom_report.js'), 'Content of cucumber JSON report does not match expected content');
    test.equal(grunt.file.exists('tmp/cuketree/custom_report/report.htm'), true, 'cuketree HTML report does not exist');

    test.done();
  },
};
