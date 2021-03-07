// 이름과 연락처 입력 후 아이디값 반환

function inputSuccess() {
    var name = $("#name").val();
    var phone = $("#phone").val();

    var param = "name=" + name + "&phone=" + phone;

    requestData("/knt/user/php/login/findID.php", param).done(function (result) {
        if (!result) {
            alert("아이디를 찾을 수 없습니다. 다시 시도해주세요.");
        }
        else {
            alert(name, "님의 아이디는", id, "입니다.");
            alert("다시 로그인해주세요.");
            location.replace('/knt/user/html/login/login.html');
        }
    });
}