function(v) {
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
	var result = { 
		hashes : [] 
	};
	var data = JSON.parse(v.values[0].data);

	for(var i in numbers) {
		result.hashes.push(hash(data.name, numbers[i]));
	}
	return [result];
}
