var util = require('util');
var riak = require('./riak.js');
var parser = require('./parse_file.js');

parser.parseFile('Locations.csv', function(objects) {
	insertItems(objects, function() {
		util.puts('done');
	});
});

function insertItems(list, cb) {
	if(list.length > 0) {
		var obj = list.shift();
		var bucket = 'locations';
		var key = encodeURIComponent(obj.PartitionKey + "_" + obj.RowKey);
		delete obj.PartitionKey;
		delete obj.RowKey;
		riak.putValue(bucket, key, obj, function() {
			util.puts(encodeURIComponent(bucket) + "/" + encodeURIComponent(key));
			if(list.length > 0) {
				insertItems(list,cb);
			}
			else if(cb) {
				cb();
			}
		});
	}
}
