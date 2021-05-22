var idcheck_btn = false;

$("#idcheck").off("click").on("click", function () {
    idCheck();
});

$("#signupBtn").off("click").on("click", function () {
    signUpCheck();
});

$("#gobackBtn").off("click").on("click", function () {
    location.replace('/knt/user/html/login/login.html');
});

function idCheck() {
    var id = $("#id").val();
    var regId = /^[0-9A-Za-z]{4,12}$/;
    if (!regId.test(id)) {
        alert("아이디는 4~12자리의 영문자, 숫자로 입력해주세요.");
    }
    else {
        var param = "id=" + id;
        requestData("/knt/user/php/login/idcheck.php", param).done(function(result){
            if (result == "0") {
                alert("사용 가능한 아이디입니다.");
                idcheck_btn = true;
            }
            else {
                alert("중복된 아이디입니다. 다시 입력해주세요.");
                id.value = "";
            }
        });
    }
}

function signUpCheck() {
    var id = $("#id").val();
    var pw = $("#pw").val();
    var pwc = $("#pwc").val();
    var name = $("#name").val();
    var sid = $("#sid").val();
    var phone = $("#phone").val();
    var regPwd = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/

    if (idcheck_btn == false) {
        alert("아이디 중복 검사를 완료해주세요");
    }
    else if(!regPwd.test(pw)){
        alert("비밀번호는 대소문자, 특수문자, 숫자를 사용해 8자 이상 입력해주세요.");
    }
    else if(pw!=pwc){
        alert("비밀번호를 다시 확인해주세요");
    }
    else if(id == "" || pw == "" || pwc == "" || name == "" || sid == "" || phone == ""){
        alert("모든 정보를 입력해주세요");
    }
    else{
        if(confirm('회원가입 하시겠습니까?')){
            inputSuccess();
        }
    }
};

function inputSuccess() {
    var id = $("#id").val();
    var sid = $("#sid").val();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var date = getTimeStamp(new Date());
    var pw = $("#pw").val();


    var param = "id=" + id + "&sid=" + sid + "&name=" + name + "&phone=" + phone + "&pw=" + pw + "&date=" + date;
    requestData("/knt/user/php/login/signup.php", param).done(function(result){
        location.replace('/knt/user/html/login/login.html');
    });
}

/*
    TODO
    1. 비밀번호 대소문자랑 특수문자 들어가게 하기 o
    2. signup.html main.html에 붙여주기
    3. 성별 , 생년월일 추가?
*/