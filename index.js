(function() {
    var SwigCompiler, fs, swig, sysPath;

    fs = require("fs");
    sysPath = require("path");
    swig = require('swig');

    module.exports = SwigCompiler = (function() {

        function SwigCompiler() {}

        SwigCompiler.prototype.brunchPlugin = true;

        SwigCompiler.prototype.type = 'template';

        SwigCompiler.prototype.extension = 'html';

        SwigCompiler.prototype.getDependencies = function(data, path, callback) {
            var dependencies = [];
            var dependency = "";

            // check for extends
            var match = data.match(/extends ['"]([a-zA-Z\/\.]*)['"]/i);
            if(match && match[1]) {
                dependency = sysPath.resolve(sysPath.dirname("/" + path), match[1]).substr(1)
                if(dependencies.indexOf(dependency) === -1) {
                    dependencies.push(dependency);
                }
            }

            // check for includes
            var re = /include ['"]([a-zA-Z\/\.]*)['"]/ig;
            while (match = re.exec(data)) {
                dependency = sysPath.resolve(sysPath.dirname("/" + path), match[1]).substr(1)
                if(dependencies.indexOf(dependency) === -1) {
                    dependencies.push(dependency);
                }
            }

            // check for imports
            var re = /import ['"]([a-zA-Z\/\.]*)['"]/ig;
            while (match = re.exec(data)) {
                dependency = sysPath.resolve(sysPath.dirname("/" + path), match[1]).substr(1)
                if(dependencies.indexOf(dependency) === -1) {
                    dependencies.push(dependency);
                }
            }

            callback(null, dependencies);
        };

        SwigCompiler.prototype.compile = function(data, path, callback) {
            var error, result;
            try {
                result = swig.precompile(data, { filename: path});
                return result = "module.exports = " + result.tpl.toString().replace(' anonymous', '');
            } catch (err) {
                return error = err;
            } finally {
                callback(error, result);
            }
        };

        return SwigCompiler;

    })();

}).call(this);