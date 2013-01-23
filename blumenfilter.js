var util = require('util');
var fs = require('fs');
var riak = require('./riak.js');

var debug = true;
var blumenFilter = [];
var blumenFilterSize = 10000;

function hash(str, magicNr) {
	var hash = 13337;
	for(var i = 0; i < str.length; i++) {
		c = str.charCodeAt(i);
		hash = (hash * magicNr) ^ c;
		hash = hash & hash; // convert to 32-bit int ...
	}
	return hash;
}

var numbers = [33, 137, 13, 35, 127, 1337] 

var code = JSON.stringify({
	inputs : "locations",
	query : [
		{
			map : {
				language : 'javascript',
				source : '' + fs.readFileSync('./blumenfilterMap.js')
			}
		},
		{
			reduce : {
				language : 'javascript',
				keep : true,
				source : '' + fs.readFileSync('./blumenfilterReduce.js')
			}
		}
	]
});

if(debug) {
	util.puts(code);
	util.puts("======snip======");
}

riak.mapRed(code, function(data) {
	blumenFilter = JSON.parse(data)[0].blumenFilter;
	util.puts(blumenFilter);
	util.puts("=============");
	checkBlume('foobar');
	checkBlume('Aphrodite GmbH');
	checkBlume('bäng');
	checkBlume('randomString');
	process.stdin.resume();
	process.stdin.on('data', function(chunk) {
		chunk = ("" + chunk).replace(/\n/, "");
		checkBlume("" + chunk);
	});
	process.stdin.on('end', function() {
		util.puts('end');
	});
});

function checkBlume(str) {
	for(var i in numbers) {
		var h = hash(str, numbers[i]);
		var blumenIndex = ((h % blumenFilterSize) + blumenFilterSize) % blumenFilterSize;
		var index1 = blumenIndex >> 5;
		if(blumenFilter[index1] == null) {
			util.puts('- ' + str);
			return false;
		}
		if((blumenFilter[index1] & (1 << (blumenIndex % 32))) == 0) {
			util.puts('- ' + str);
			return false;
		}
	}
	
	util.puts('+ ' + str);
	return true;
}
