const fs = require('fs');
const Path = require('path');

const files = [ 'package-lock.json', 'yarn.lock', 'node_modules' ];

const deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file, index) => {
			const curPath = Path.join(path, file);
			if (fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderRecursive(curPath);
			} else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

files.forEach((file) => {
	try {
		if (fs.existsSync(file)) {
			if (file.indexOf('lock') !== -1) {
				fs.unlinkSync(file);
			} else {
				deleteFolderRecursive(file);
			}
			console.log(`${file} is deleted`);
		}
	} catch (error) {
		console.log('error', error);
	}
});
