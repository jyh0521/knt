// 관리자 권한이 아니면 전부 사용자 페이지로 이동 -> 일단 비활성화
if (sessionStorage.getItem("loginUser") === null) {
    alert("로그인 해주세요.");
    location.replace('/knt/mngr/html/login/login.html');
}

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

// 지원서 양식 버튼 클릭 시
$('#formMngBtn').off('click').on('click', function(){
    $('#menuFuncDiv').load('formMng/formMng.html', function(){
        initFormMng();
    });
});

// 지원서 관리 버튼 클릭 시
$('#subFormMngBtn').off('click').on('click', function(){
    subFormMng.initSubFormMng();
});

/*
    TODO
    1. 화면을 다 그린 후 보여주는 방식으로 수정 -> 현재는 나눠서 그려진다.
*/