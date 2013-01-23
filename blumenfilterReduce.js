function (list) {
	var blumenFilter = []
	var blumenFilterSize = 10000;
	for(var i in list) {
		if(list[i].hashes != null) {
			for(var j in list[i].hashes) {
				var blumenIndex = ((list[i].hashes[j] % blumenFilterSize) + blumenFilterSize) % blumenFilterSize; 
				var index1 = blumenIndex >> 5;
				blumenFilter[index1] |= 1 << (blumenIndex % 32);
			}
		}
		if(list[i].blumenFilter != null) {
			for(var j in list[i].blumenFilter) {
				blumenFilter[j] |= list[i].blumenFilter[j];
			}
		}
	}
	return [{blumenFilter : blumenFilter}]
}
