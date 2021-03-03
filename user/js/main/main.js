//ui 드롭다운 안먹힐때
window.onload = function() {
    $('.ui .dropdown').dropdown();
 };

//세션값 확인 후 인증 세션이 없으면, 해당페이지 확인 불가. LOGIN.HTML로 이동
let loginUser = sessionStorage.getItem("loginUser")

if (loginUser == null) {
    alert("세션이 존재하지 않습니다. 로그인 페이지로 돌아갑니다.")
    location.replace('/knt/user/html/login/login.html');
}

//상단 버튼 제어

//관리자인지 확인 후, 관리자 페이지 버튼 생성
if (sessionStorage.getItem("loginUser") == 'ADMIN') {
    let mngrBtnDivHtml = "<button id = 'mngrBtn'>관리자 페이지</button>";

    $("#mngrBtnDiv").empty().append(mngrBtnDivHtml);

    //관리자 페이지 버튼 클릭 시 관리자 main.html로 이동
    $("#mngrBtn").off("click").on("click", function () {
        location.replace('/knt/mngr/html/main/main.html');
    });
}
//1. 홈버튼 클릭
//$("#homeBtn").off("click").on("click", function () {
//
//}
//2. 그룹명 클릭

//3. 마이페이지 클릭

//4. 로그아웃 클릭



//학술국 소개 버튼 클릭 시



//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function () {
    $("#studyGroupList").css("display", "none");
    $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
        showNoticeBrd();
    });
});

//학술국 정보공유 클릭 시 
$("#infoShareBtn").off("click").on("click", function () {
    $("#studyGroupList").css("display", "none");
    $("#menuFuncDiv").load("infoShareBrd/infoShareBrd.html", function () {
        initInfoShare();
    });
});

//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function () {
    $("#studyGroupList").css("display", "block");
});

$(".studyGroup").off("click").on("click", function() {
    studyGroup = this.id;

    $("#menuFuncDiv").load("studyBrd/studyBrd.html", function () {
        initStudyGroupBoard(studyGroup);
    });
})