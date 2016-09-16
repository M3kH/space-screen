#!/usr/bin/env node

var spacescreen = require('../index.js');
var configFile = process.argv[2];
var fs = require('fs');
var path = require('path');
var json = JSON.parse(fs.readFileSync(path.resolve(process.env.PWD, configFile), { encoding: 'utf8' }));

spacescreen(json);
