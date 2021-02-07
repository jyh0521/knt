// 데이터 요청 함수
function requestData(url, param) {
	let deferred = $.Deferred();
	
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

// 현재 시간을 구하는 함수 yyyy-mm-dd hh:mm:ss 형태로 (DB의 datetime형태랑 동일)
function getTimeStamp(date) {
	let d = new Date(date);
	let s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

	return s;
}

// 0 붙이기
function leadingZeros(n, digits) {
	let zero = '';
	n = n.toString();
	
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
	    	zero += '0';
	}
	
	return zero + n;
}

// 현재 날짜와 비교하여 같은 날이면 시간 반환, 다른 날이면 날짜 반환(ex. 게시판 작성일)
function cmpTimeStamp(date) {
	let nowDate = getTodayDate();
	let dataDate = getDataDate(date);

	// 오늘 날짜와 데이터의 날짜가 같은 경우
	if(nowDate === dataDate) {
		return date.substr(11);
	} 
	else {
		return date.substr(0, 10);
	}
}

// 오늘 년-월-일 추출
function getTodayDate() {
	let today = new Date();
	let nowYear = today.getFullYear();
	let nowMonth = today.getMonth() + 1;
	let nowDate = today.getDate();
	
	if(nowMonth < 10) {
		nowMonth = "0" + nowMonth;
	}

	if(nowDate < 10) {
		nowDate = "0" + nowDate;
	}

	return nowYear + "-" + nowMonth + "-" + nowDate;
}

// 데이터의 년-월-일 추출
function getDataDate(date) {
	return date.substr(0, 10);
}

// 쿠키 등록
function setCookie(name, value, exp) {
	var date = new Date();
	
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

// 쿠키 검색
function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	
	return value? value[2] : null;
};

// 쿠키 삭제
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}