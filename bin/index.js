#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
let program = require('commander');
let config = require('../pxrem.config.js');
const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .option('-c, --config <path>', 'set config path')
  .parse(process.argv);
if (program.config) {
	configUser = require(process.cwd() + '/' + program.config);
	Object.assign(config, configUser);
}
const pxToRemRatio = config.pxToRemRatio;


let accMul = function (num1, num2) {
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
let pxReg = /(\d*?(?:\.\d+)?)px/ig;
let cssReg = /(\b.*?\b\u0020*:)(.*?)(;|"|(?:\r\n)|\})/g;
glob(config.patterns, {}, function (err, files) {
	files.forEach(function (v, i, o) {
		if (v.includes('-px2rem')) {
			return;
		}
		let newFilePath = v;
		if (!config.isReplace) {
			newFilePath = v.replace(/(.*\/)?(.*?)(\..*?)/, function (m, n1, n2, n3) {
				return (n1? n1: '') + (n2 + '-px2rem') + (n3? n3: '');  
			});
		}
		fs.readFile(v, 'utf-8', function (err, data) {
			let newData = data.replace(cssReg, function (m, n1, n2, n3) {
				return n1 + n2.replace(pxReg, function (pxm, pxn1) {
					if (config.ignoreCss.length) {
						let isIgnore = config.ignoreCss.some(function (cssV, cssIndex) {
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
						return accMul(pxn1, pxToRemRatio) + 'rem';
					}
				}) + n3;
				
			});
			fs.writeFile(newFilePath, newData, 'utf-8', function () {
				console.log(newFilePath);
			});
		});
	});
});



