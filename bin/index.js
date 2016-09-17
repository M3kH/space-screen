#!/usr/bin/env node

var spacescreen = require('../index.js');
var configFile = process.argv[2];
var fs = require('fs');
var path = require('path');
var homePath = process.env[(process.platform=='win32') ? 'USERPROFILE' : 'HOME'];


(function(){
  var filePath = !configFile ? path.resolve(homePath, '.space-screen') : path.resolve(process.env.PWD, configFile);

  try{
    var json = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  }catch(e){
    console.log("We couldn't find the right configuration file, we were looking for: \n"+filePath);
    return false;
  }

  spacescreen(json);
})();
