module.exports = {
  "command": "run",
  "input": "./tmp/cucumber/custom_report.js",
  "output": "./tmp/cuketree/custom_report/",
  "features": "./features/",
  "bin": "node ./node_modules/myriad-cucumber/bin/myriad-cucumber --workers=4",
  "run": "./features/",
  "ext": []
};