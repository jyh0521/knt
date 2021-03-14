//마이페이지 데이터 관련 변수
//현재 로그인된 회원의 개인정보 불러오기
let id = sessionStorage.getItem("loginUser");
let usrName = "";
let phone = "";
let sid = "";
let auth = "";
let usrAuth = "";
///////////////////////////////////////

//정보 불러오는 함수
function getmyInfo() {
    let param = "id=" + id;
    // 선택된 글의 id로 데이터 요청
    requestData("/knt/user/php/login/getmyInfo.php", param).done(function (result) {
        usrName = result[0]["USR_NAME"]
        phone = result[0]["USR_PHONE"]
        sid = result[0]["USR_SID"]
        auth = result[0]["USR_AUTH"]
        if (auth === "Undefined") {
            usrAuth = "권한 설정이 필요합니다.";
        }
        if (auth === "Admin") {
            usrAuth = "학술국 운영진";
        }
        if (auth === "User") {
            usrAuth = "학술국원";
        }
        showmyInfo();
    });
}

// 마이페이지에 띄울 내용 정리

function showmyInfo() {
    let myPageBrdHtml = "";
    myPageBrdHtml += "<p> " + usrName + "님 안녕하세요." + "</p>"
    myPageBrdHtml += "<p>학번 : " + sid + "</p>"
    myPageBrdHtml += "<p>전화번호 : " + phone + "</p>"
    myPageBrdHtml += "<p>권한 : " + usrAuth + "</p>"
    //가입일시
    $("#myPageBrdHtmlDomain").empty().append(myPageBrdHtml);
}