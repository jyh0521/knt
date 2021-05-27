let id = sessionStorage.getItem('loginUser');
let myGroup="";

if (id != null) {
    location.replace('/knt/user/html/main/main.html');
}
else {
    loginEvent();
}

function loginEvent(){
    //엔터 클릭 시
    $("#USER_SEARCH").off("keyup").keyup(function(e) { // 사용자명 검색 엔터
        if (e.which == 13 || e.keycode == 13) {
            loginCheck();
        }
    });

    //로그인버튼 클릭 시
    $("#loginBtn").off("click").on("click", function () {
        loginCheck();
    });
}

function loginCheck() {
    var id = $("#id").val();
    var pw = $("#pw").val();

    if (id == "" || pw == "") {
        alert("입력하지 않은 정보가 있습니다.");
    }
    else {
        inputSuccess();
    }
}

function inputSuccess() {
    var id = $("#id").val();
    var pw = $("#pw").val();
    let myGroup = "";
    var param = "id=" + id + "&pw=" + pw;

    requestData("/knt/user/php/login/login.php", param).done(function (result) {
        if (!result) {
            alert("로그인에 실패하였습니다.");
        }
        else {
            alert("로그인에 성공하였습니다.");
            sessionStorage.setItem("loginUser", id);
            location.replace('/knt/user/html/main/main.html');
        }
    });
}

/*
    TODO
    1. 아이디, 비밀번호 입력 후 아이디 혹은 비밀번호에 포커스 되있는 상태에서 엔터쳐도 동작하게 하기. o
    
    예제 코드
    $("#USER_SEARCH").off("keyup").keyup(function(e) { // 사용자명 검색 엔터
        if (e.which == 13 || e.keycode == 13) {
            doSearch();
        }
	});

    2. 회원가입 버튼 누르면 회원가입 창으로 이동
    3. loginCheck 수정
*/