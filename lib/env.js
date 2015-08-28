
var path = require('path');
var mkdirp = require('mkdirp');
var env = require('nep-env');


var isWin = /^win/.test(process.platform);

var homePath = env.PROFILEPATH;

var certPath = path.join(homePath, '/.nep/cert/');

var rootCAPath = path.join(homePath, '/.nep/ca/');

    
var cmdPath = path.join(__dirname, '../bin/');

var genRootCmd  = isWin ? path.join(cmdPath, 'gen-rootCA.cmd') : path.join(cmdPath, 'gen-rootCA');

var genCertCmd  = isWin ? path.join(cmdPath, 'gen-cer.cmd') : path.join(cmdPath, 'gen-cer');

mkdirp.sync(certPath);
mkdirp.sync(rootCAPath);

exports.certPath = certPath;
exports.rootCAPath = rootCAPath;
exports.genRootCmd = genRootCmd;
exports.genCertCmd = genCertCmd;