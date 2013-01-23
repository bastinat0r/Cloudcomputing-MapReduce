function(list) {
	var x = {};
	for(var i in list) {
		if(list[i].num == null) {
			x = list[i];
			break;
		}
	}
	for(var i in list) {
		if(list[i].num != null) {
			if(x[list[i].num] == null)
				x[list[i].num] = 1;
			else
				x[list[i].num] ++;
		}
	}
	return [x];
}
