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
            var dependencies = [];

            // check for extends
            var match = data.match(/extends '([a-zA-Z\/\.]*)'/i);
            if(match && match[1]) {
                console.log("MATCH extends");
                console.log(match);
                dependencies.push("app/"+match[1]+".html");
            }

            // check for includes
            var re = /include '([a-zA-Z\/\.]*)'/ig;
            while (match = re.exec(data)) {
                console.log("MATCH include");
                console.log(match);
                dependencies.push("app/"+match[1]+".html");
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