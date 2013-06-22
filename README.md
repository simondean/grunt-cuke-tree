# grunt-cuke-tree

> Run cucumber tests via cuke-tree

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cuke-tree --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cuke-tree');
```

## cuketree task

_Run this task with the `grunt cuketree` command._

### Options

#### options.config
Type: `String`
Default value: `default`

Name the cuke-tree config file to use with cuke-tree.  cuke-tree will append `.cukeTree.js` to config name when loading the config file.

### Usage Examples

#### Basic Usage
In this example, cuke-tree will look for a config file with the default file name of `default.cukeTree.js`

```js
grunt.initConfig({
  cuketree: {},
})
```

#### Custom cuke-tree config file
In this example, a different config file is specified for cuke-tree.  Specifying `ide` as the config will cause cuke-tree to look for a config file called `ide.cukeTree.js`.

```js
grunt.initConfig({
  cuketree: {
    options: {
      config: 'ide',
    },
  },
})
```

cuke-tree will look for a config file called

#### Multiple cuke-tree config files
In this example, multiple cuke-tree config files are used.

```js
grunt.initConfig({
  cuketree: {
    run: {},
    ide: {
      options: {
      	config: 'ide',
      },
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.1.0
Initial release

### 0.1.1
No longer hiding cuke-tree's console output