var util = require('util');
var fs = require('fs');
var riak = require('./riak.js');

var debug = true;

var code = JSON.stringify({
	inputs : "locations",
	query : [
		{
			map : {
				language : 'javascript',
				source : "function(v) { return [{ num : (/\\d+/.exec(v.key))[0] }]; }",
			}
		}, {
			reduce : {
				language : 'javascript',
				keep : true,
				source : "" + fs.readFileSync('zipReduce.js')
			}
		}
	]
});

if(debug) {
	util.puts(code);
	util.puts("======snip======");
}

riak.mapRed(code, function(data) {
	var d = JSON.parse(data)[0];
	for(var zip in d) {
		util.puts(zip + "\t" + d[zip]);
	}
});
