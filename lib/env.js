
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var env = require('nep-env');


var isWin = /^win/.test(process.platform);

var homePath = env.PROFILEPATH;

var certPath = path.join(homePath, '/nep/cert/');

var rootCAPath = path.join(homePath, '/nep/ca/');

    
var cmdSourcePath = path.join(__dirname, '../bin/');
var cmdPath = path.join(homePath, '/nep/bin/');


mkdirp.sync(certPath);
mkdirp.sync(rootCAPath);
mkdirp.sync(cmdPath);

var bins = ['gen-rootCA.cmd', 'gen-rootCA', 'gen-cer.cmd', 'gen-cer'];

function copyBin(name){
    var content = fs.readFileSync(path.join(cmdSourcePath, name));
    fs.writeFileSync(path.join(cmdPath, name), content);
    fs.chmodSync(path.join(cmdPath, name), 0777);
}

for(var i in bins){
    copyBin(bins[i]);
}

var genRootCmd  = isWin ? '../bin/gen-rootCA.cmd' : '../bin/gen-rootCA';
var genCertCmd  = isWin ? '../bin/gen-cer.cmd' : '../bin/gen-cer';


exports.certPath = certPath;
exports.rootCAPath = rootCAPath;
exports.genRootCmd = genRootCmd;
exports.genCertCmd = genCertCmd;