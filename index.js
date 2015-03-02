(function() {
    var SwigCompiler, fs, swig, sysPath;

    fs = require("fs");
    swig = require('swig');

    module.exports = SwigCompiler = (function() {

        function SwigCompiler() {}

        SwigCompiler.prototype.brunchPlugin = true;

        SwigCompiler.prototype.type = 'template';

        SwigCompiler.prototype.extension = 'html';

        SwigCompiler.prototype.getDependencies = function(data, path, callback) {
            var match = data.match(/extends '([a-zA-Z\/]*)'/i);
            var dependencies = [];
            if(match && match[1]) {
                dependencies.push("app/"+match[1]+".html");
            }
            callback(null, dependencies);
        };

        SwigCompiler.prototype.compile = function(data, path, callback) {
            var error, filename, result;
            try {
                //var name = path.replace(/^app\//, '').split(".")[0];
                return result = swig.compile(path, {});
            } catch (err) {
                return error = err;
            } finally {
                callback(error, result);
            }
        };

        return SwigCompiler;

    })();

}).call(this);