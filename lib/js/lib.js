////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let pagingResult = [];

// 데이터 요청 함수
function requestData(url, param) {
	let deferred = $.Deferred();

	try {
		$.ajax({
			url: url,
			type: "post",
			data: param,
		}).done(function (result) {
			deferred.resolve(JSON.parse(result));
		});

	} catch (e) {
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
	if (nowDate === dataDate) {
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

	if (nowMonth < 10) {
		nowMonth = "0" + nowMonth;
	}

	if (nowDate < 10) {
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

	return value ? value[2] : null;
};

// 쿠키 삭제
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

// 페이징 함수 호출
// 전체 데이터, 한 페이지당 데이터 수, 현재 페이지, 콜백 함수
function DrawPaging(totalData, dataPerPage, currentPage, divId, callback) {
	let param = {
		totalData: totalData,
		dataPerPage: dataPerPage,
		pageCount: 10,
		currentPage: currentPage,
		divId: divId
	}

	paging(param, callback);
}


// 페이징 함수
function paging(param, callback) {
	let totalData = param.totalData;
	let dataPerPage = param.dataPerPage;
	let pageCount = param.pageCount;
	let currentPage = param.currentPage;
	let divId = param.divId;

	let totalPage = Math.ceil(totalData / dataPerPage);    // 총 페이지 수
	let pageGroup = Math.ceil(currentPage / pageCount);    // 페이지 그룹
	let last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호

	if (last > totalPage) {
		last = totalPage;
	}

	let first = last % 10 ? last - (last % 10) + 1 : last - (pageCount - 1);    // 화면에 보여질 첫번째 페이지 번호

	if (first <= 0) {
		first = 1;
	}

	let next = last + 1;
	let prev = first - 1;

	let html = "";

	if (prev > 0) {
		html += "<a href=# id='prev'><</a> ";
	}

	for (let i = first; i <= last; i++) {
		html += "<a href='#' id=" + i + " style = 'display: inline-block; width: 24px; height: 24px; margin: 0 2px; -webkit-box-sizing: border-box; box-sizing: border-box; line-height: 24px; font-family: arial, sans-serif; font-size: 18px;'>" + i + "</a> ";
	}

	if (last < totalPage) {
		html += "<a href=# id='next'>></a>";
	}

	$("#" + divId).html(html);    // 페이지 목록 생성
	$("#" + divId + " a").css("color", "black");
	$("#" + divId + " a#" + currentPage).css({ "background-color": "#535252", "color":"rgb(251 251 251)", "border": "solid 1px" });    // 현재 페이지 표시
	// 콜백 함수로 현재 페이지 반환 -> 쿼리로 currentPage에 해당하는 데이터를 불러온다.
	callback(currentPage);

	$("#" + divId + " a").click(function () {

		let $item = $(this);
		let $id = $item.attr("id");
		let selectedPage = $item.text();

		if ($id == "next") selectedPage = next;
		if ($id == "prev") selectedPage = prev;

		DrawPaging(totalData, dataPerPage, selectedPage, divId, callback);
	});
}