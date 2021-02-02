function requestData(url, param) {
	var deferred = $.Deferred();
	
	try{
		$.ajax({
			url : url,
			type : "post",
			data : param,
		}).done(function(result){
			deferred.resolve(JSON.parse(result));
		});
		
	} catch(e) {
		deferred.reject(e);
	}
	
	return deferred.promise();
}