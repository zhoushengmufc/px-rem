var path = require('path');
var fs = require('fs');
var config = require('./pxrem.config.js');
var pxReg = /(\d*?(?:\.\d+)?)px/ig;
var cssReg = /(\b.*?\b\u0020*:)(.*?)(;|"|(?:\r\n)|\})/g;

function accMul(num1, num2) {
    var m = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {

    };
    try {
        m += s2.split(".")[1].length
    } catch (e) {

    };
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
// Identity loader with SourceMap support
module.exports = function(data) {
	this.cacheable();
	var callback = this.async();
    var configPath = path.resolve("pxrem.webpack.conf.json");
    var rOk = fs.constants? fs.constants.R_OK: fs.R_OK;
    fs.access(configPath, rOk, function (err) {
    	if (err) {
    		throw new Error('when you use px-rem,you must you must create a file called pxrem.webpack.conf.json in the project root directory (same directory with package.json) ');
    	}
    	else {
		    this.addDependency(configPath);
		    fs.readFile(configPath, "utf-8", function(err, userConfig) {
		        if(err) return callback(err);
		        Object.assign(config, JSON.parse(userConfig));
		        var newData = data.replace(cssReg, function (m, n1, n2, n3) {
					return n1 + n2.replace(pxReg, function (pxm, pxn1) {
						if (config.ignoreCss.length) {
							var isIgnore = config.ignoreCss.some(function (cssV, cssIndex) {
								if (n1.includes(cssV)) {
									return true;
								}
							});
							if (isIgnore) {
								return pxm;
							}
						}
						if (!config.convertBorder1px && pxn1 === '1') {
							return pxm;
						}
						else {
							return accMul(pxn1, config.pxToRemRatio) + 'rem';
						}
					}) + n3;
					
				});
		        callback(null, newData);
		    });
    	}
    }.bind(this));
};