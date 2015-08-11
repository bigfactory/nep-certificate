

var fs = require('fs');
var path = require('path');
var tls = require('tls');
var crypto  = require('crypto');
var async = require('async');

var env = require('./lib/env');
var certificate = require('./lib/certificate');



var createSecureContext = tls.createSecureContext || crypto.createSecureContext;



exports.get = function(hostname, certCallback){
    var keyFile = path.join(env.certPath, "__hostname.key".replace(/__hostname/, hostname));
    var crtFile = path.join(env.certPath, "__hostname.crt".replace(/__hostname/, hostname));

    async.series([
        function(next){
            if(fs.existsSync(keyFile) && fs.existsSync(crtFile)){
                certCallback(null , fs.readFileSync(keyFile) , fs.readFileSync(crtFile));
            }
            else{
                next();
            }
        },
        function(next){
            if(certificate.checkRootCA()){
                next();
            }
            else{
                certificate.createRootCA(function(){
                    next();
                });
            }
        },
        function(next){
            certificate.createHostCert({
                hostname: hostname,
                keyFile: keyFile,
                crtFile: crtFile
            }, function(){
                next();
            });
        }
    ], function(err, result){
        certCallback(null , fs.readFileSync(keyFile) , fs.readFileSync(crtFile));
    });
};


exports.sni = function(hostname, SNICallback){
    var key, cert, ctx;

    async.series([
        function(next){
            exports.get(hostname, function(err, _key, _cert){
                if(err){
                    next(err);
                }else{
                    key = _key;
                    cert = _cert;
                    next();
                }
            });
        },
        function(next){
            try{
                ctx = createSecureContext({
                    key : key,
                    cert : cert
                });
                next();
            }catch(e){
                next(e);
            }
        }
    ], function(err, result){
        SNICallback(err, ctx);
    });
};

