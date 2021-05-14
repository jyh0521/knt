// 관리자 권한이 아니면 전부 사용자 페이지로 이동
if (sessionStorage.getItem("loginUser") == "ADMIN") {
    /*
        TODO
        1. 관리자 권한이 부여된 사용자가 접속된 경우에만 main.html을 그리도록 하기
    */
} else {
    alert("현재 권한으로는 접근할 수 없습니다.");
    location.replace('/knt/user/html/main/main.html');
}

//회원 관리 버튼 클릭 시
$("#memberMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("memberMng/memberMng.html", function () {
        
    });
});

//게시판 관리 버튼 클릭 시 
$("#noticeBrdMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMng.html", function () {
        showNoticeBrdMng();
    });
});

// 지원서 등록 버튼 클릭 시
/*
    TODO
    1. Jquery로 바꾸기
*/
let registerFormBtn = document.getElementById('registerFormBtn');
registerFormBtn.addEventListener('click', function(){
    $("#menuFuncDiv").load("registerForm/registerForm.html", function() {
        initRegisterForm(); 
    });
});