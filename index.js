var _ = require('underscore'),
    temp = require('temp'),
    fs = require('fs'),
    child_process = require('child_process'),
    json = JSON.parse(fs.readFileSync('./example.conf', { encoding: 'utf8' })),
    template = _.template(fs.readFileSync('./profile.tpl', { encoding: 'utf8' }));


function createTemplate( json ){
  temp.open('spaceconf', function(err, info) {
    if (err) throw err;
    fs.write(info.fd, template(json));
    fs.close(info.fd, function(err) {
      if (err) throw err;
      spawnScreen(info.path);
    });
  });
}

function spawnScreen( path ){
  var spawn = child_process.spawn('screen', ['-c', path], {cwd: process.env.PWD, stdio: 'inherit', stderr: 'inherit'});
  spawn.on('close', function(){ });
}

module.exports = function( config ){
  createTemplate(config);
};
