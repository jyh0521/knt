var idcheck_btn = false;

$("#idcheck").off("click").on("click", function () {
    idCheck();
});

$("#signupBtn").off("click").on("click", function () {
    signUpCheck();
});

function idCheck() {
    var id = $("#id").val();
    var param = "id=" + id;
    $.ajax({
        url: "/knt/user/php/login/idcheck.php",
        type: "post",
        data: param,
    }).done(function (result) {
        if (result == "0") {
            alert("사용 가능한 아이디입니다.");
            idcheck_btn = true;
        }
        else {
            alert("중복된 아이디입니다. 다시 입력");
            id.value = "";
        }
    });
}


function signUpCheck() {
    var id = $("#id").val();
    var pw = $("#pw").val();
    var pwc = $("#pwc").val();
    var f_id = /^[0-9a-z]{4,12}$/;

    if (id == "" || pw == "" || pwc == "") {
        alert("모든 정보를 입력해주세요");
    }
    else if (idcheck_btn == false) {
        alert("아이디 중복 검사를 완료해주세요");
    }
    else if (!f_id.test(id)) {
        alert("아이디는 4~12자리의 영문과 숫자로 입력해주세요.");
    }
    else {
        if (pw != pwc) {
            alert("비밀번호를 다시 확인해주세요");
        }
        else {
            inputSuccess();
        }
    }
};

function inputSuccess() {
    var id = $("#id").val();
    var sid = $("#sid").val();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var date = getTodayDate();
    var pw = $("#pw").val();
    
    var param = "id=" + id + "sid=" + sid + "name=" + name + "phone=" + phone + "&pw=" + pw + "date=" + date;
    $.ajax({
        url: "/knt/user/php/login/signup.php",
        type: "post",
        data: param,
    }).done(function () {
        alert("회원가입 완료");
        location.replace('/knt/user/html/login/login.html');
    });
}