let loginUser = sessionStorage.getItem("loginUser")

if (loginUser != null) {
    alert("이미 로그인된 사용자입니다.")
    location.replace('/knt/user/html/main/main.html');
}

else {
    $("#loginBtn").off("click").on("click", function () {
        loginCheck();
    });

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
}