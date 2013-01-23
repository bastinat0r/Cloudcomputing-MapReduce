var fs = require('fs');
var csv = require('csv');
var util = require('util');

function parseFile(fileName, cb) {
	fs.readFile(fileName, function(err, data) {
		if(err) {
			util.puts(JSON.stringify(err));
		}
		if(data != null) {
			csv().from.string("" + data).to.array(function(d) {
				var fieldNames = d.shift();
				var objects = [];
				while(d.length > 0) {
					var current = d.shift();
					var x = {};
					for(var i in current) {
						x[fieldNames[i]] = current[i];
					}
					objects.push(x);
				}
				if(cb)
					cb(objects)
			});
		}
	});
};

module.exports.parseFile = parseFile;
