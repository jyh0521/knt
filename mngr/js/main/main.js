// 관리자 권한이 아니면 전부 사용자 페이지로 이동 -> 일단 비활성화
// if (sessionStorage.getItem("loginUser") == "ADMIN") {
//     /*
//         TODO
//         1. 관리자 권한이 부여된 사용자가 접속된 경우에만 main.html을 그리도록 하기
//     */
// } else {
//     alert("현재 권한으로는 접근할 수 없습니다.");
//     location.replace('/knt/user/html/main/main.html');
// }

//회원 관리 버튼 클릭 시
$("#memberMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("memberMng/memberMng.html", function () {
        showMemberMng();
    });
});

//게시판 관리 버튼 클릭 시 
$("#noticeBrdMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMng.html", function () {
        showNoticeBrdMng();
    });
});

// 지원서 등록 버튼 클릭 시
$('#formMngBtn').off('click').on('click', function(){
    $('#menuFuncDiv').load('formMng/formMng.html', function(){
        initFormMng();
    });
});

/*
    TODO
    1. 관리자 페이지 로그인 만들기
    2. 공지사항 작성 시 지원서를 연결
    3. 화면을 다 그린 후 보여주는 방식으로 수정 -> 현재는 나눠서 그려진다.
*/