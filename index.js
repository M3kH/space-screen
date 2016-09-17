var temp = require('temp');
var fs = require('fs');
var child_process = require('child_process');
var path = require('path');
var _ = require('underscore');
var template = _.template(fs.readFileSync('./profile.tpl', { encoding: 'utf8' }));

function createScreenTempTpl( json, cb ){
  temp.open('spaceconf', function(err, info) {
    if (err) throw err;
    fs.write(info.fd, template({spaces: json}));
    fs.close(info.fd, function(err) {
      if (err) throw err;
      cb(info.path);
    });
  });
}

function spawnScreen( path ){
  var spawn = child_process.spawn('screen', ['-c', path], {cwd: process.env.PWD, stdio: 'inherit', stderr: 'inherit'});
  spawn.on('close', function(){ });
}

module.exports = function( config ){
  createScreenTempTpl(config, spawnScreen);
};
