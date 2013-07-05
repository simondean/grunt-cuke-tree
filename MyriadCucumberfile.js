module.exports = {
  package: '.',
  profiles: {
    default: {
      bin: './monkey_patches/.bin/cucumber-js',
      args: ['-format', 'json', '-t', '@noop-1']
    }
  }
};