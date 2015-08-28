var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var env = require('./env');


exports.checkRootCA = function(callback) {
    var crtFile = path.join(env.rootCAPath, 'rootCA.crt'),
        keyFile = path.join(env.rootCAPath, 'rootCA.key');

    return (fs.existsSync(crtFile) && fs.existsSync(keyFile));
};


exports.createRootCA = function(callback) {
    var cmd = env.genRootCmd + ' . ';
    console.log(cmd);
    exec(cmd, {
        cwd: env.rootCAPath
    }, function(err, stdout, stderr) {
        console.log(arguments)
        if (err) {
            callback && callback(new Error("error when generating certificate"), null);
        }
        else {
            callback(null);
        }
    });
};


exports.createHostCert = function(options, callback) {
    var cmd = env.genCertCmd + 
        ' __host __path  __caprefix'
            .replace(/__host/, options.hostname)
            .replace(/__path/, './')
            .replace(/__caprefix/, '../ca/rootCA'); //改成绝对地址的原因是防止路径中存在空格等字符
    console.log(cmd);
    exec(cmd, {
        cwd: env.certPath
    }, function(err, stdout, stderr) {
        console.log(arguments)
        if (err) {
            callback && callback(new Error("error when generating certificate"), null);
        }
        else {
            callback(null);
        }
    });
};
