var fs = require('fs');
var path = require('path');
var async = require('async');

// Create new Controller object and specify fallback directory
function Controller (directory){

    // Looks in default "controller" directory at root
    this.directory = directory || './controller';

    if (!(this instanceof Controller)) {
        return new Controller(directory);
    }

};

// Return promise consisting of object built from contents of files
Controller.prototype.buildControllers = function(){

    return new Promise(function (resolve, reject) {

        var directory = this.directory;

        var controllers = {};

        fs.readdir(directory, function (err, files) {

            if (err) return reject(err);

            async.each(files, function(item, callback){
                var controllerName = path.basename(item, '.js');
                controllers[controllerName] = require('../.'+directory+'/'+item);
                callback();
            }, function(err){
                if (err) reject(err);
                resolve(controllers);
            });

        });

    });

};

// Calls buildControllers to build controller object
// and to assign object to the Koa context and to the controller object
Controller.prototype.initialize = function(){
    var Controller = this;
    return function* (next){
        ctx = this;
        ctx.controllers = Controller.ctrl = yield Controller.buildControllers();
        yield* next;
    };
};

module.exports = Controller;