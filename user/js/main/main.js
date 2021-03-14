//ui 드롭다운 안먹힐때
window.onload = function () {
    $('.ui .dropdown').dropdown();
};

//세션값 확인 후 인증 세션이 없으면, 해당페이지 확인 불가. LOGIN.HTML로 이동
if (sessionStorage.getItem("loginUser") == null) {
    alert("세션이 존재하지 않습니다. 로그인 페이지로 돌아갑니다.")
    location.replace('/knt/user/html/login/login.html');
}


//상단 버튼 제어

//관리자인지 확인 후, 관리자 페이지 버튼 생성
if (sessionStorage.getItem("loginUser") == 'ADMIN') {
    let mngrBtnDivHtml = "<a href='#' type='button' id = 'mngrBtn' class='item'>ManagerPage</a>";
    $("#mngrBtnDiv").empty().append(mngrBtnDivHtml);
    //관리자 페이지 버튼 클릭 시 관리자 main.html로 이동
    $("#mngrBtn").off("click").on("click", function () {
        location.replace('/knt/mngr/html/main/main.html');
    });
}

//1. 홈버튼 클릭
$("#homeBtn").off("click").on("click", function () {
    location.replace('/knt/user/html/main/main.html');
});

//2. 그룹명 클릭 >> 로그인 시 세션에 그룹값도 myGroup이라는 키에 넣어주고, 
//상단의 myGroup 버튼 클릭 시 "~어떤 그룹입니다."라는 메세지와 함께 해당 그룹 페이지로 이동.
$("#myGroup").off("click").on("click", function () {
    let param = "id=" + id;
    requestData("/knt/user/php/login/getmyInfo.php", param).done(function (result) {
        stdGroup = result[0]["USR_STD"]
    });       
    alert("회원님께서 속한 그룹은 "+ stdGroup +"입니다.");
});

//3-1. 마이페이지 메뉴 클릭 시
$("#myInfo").off("click").on("click", function () {
    $("#menuFuncDiv").load("myPage/myPage.html", function () {
        getmyInfo();
    })
});

//4. 로그아웃 클릭
$("#logout").off("click").on("click", function () {
    let OK;
    OK = confirm("로그아웃 하시겠습니까?");
    if (OK) {
        alert("로그아웃합니다.");
        sessionStorage.removeItem("loginUser");
        location.replace('/knt/user/html/login/login.html');
    }
    else {
        location.replace('/knt/user/html/main/main.html');
    }
});

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

$(".studyGroup").off("click").on("click", function () {
    studyGroup = this.id;

    $("#menuFuncDiv").load("studyBrd/studyBrd.html", function () {
        initStudyGroupBoard(studyGroup);
    });
})