var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var env = require('./env');


exports.checkRootCA = function(callback) {
    var crtFile = path.join(env.certPath, 'CA.crt'),
        keyFile = path.join(env.certPath, 'CA.key');

    return (fs.existsSync(crtFile) && fs.existsSync(keyFile));
};


exports.createRootCA = function(callback) {
    var cmd = env.genRootCmd + ' . ';

    exec(cmd, {
        cwd: env.certPath
    }, function(err, stdout, stderr) {
        if (err) {
            callback && callback(new Error("error when generating certificate"), null);
        }
        else {
            callback(null);
        }
    });
};


exports.createHostCert = function(options, callback) {
    var cmd = env.genCertCmd + ' __host __path'.replace(/__host/, options.hostname).replace(/__path/, env.certPath);
    exec(cmd, {
        cwd: env.certPath
    }, function(err, stdout, stderr) {
        if (err) {
            callback && callback(new Error("error when generating certificate"), null);
        }
        else {
            callback(null);
        }
    });
};