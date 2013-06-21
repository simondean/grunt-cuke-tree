module.exports = {
  package: '.',
  features: ['features'],
  profiles: {
    default: {
      bin: './node_modules/.bin/cucumber-js',
      args: ['-format', 'json', '-t', '@noop-1']
    }
  }
};