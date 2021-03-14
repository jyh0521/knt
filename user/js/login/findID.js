// 이름과 연락처 입력 후 아이디값 반환
$("#findID").off("click").on("click", function () {
    findmyID();
});

function findmyID() {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let usrId="";
    let param = "name=" + name + "&phone=" + phone;
    requestData("/knt/user/php/login/findID.php", param).done(function (result) {
        if(result['USR_ID']===null){
            alert("회원정보가 존재하지 않습니다.");
            name.value = "";
            phone.value = "";
        }
        else {
            usrId = result['USR_ID']
            alert("회원님의 아이디는 "+usrId+" 입니다.\n다시 로그인해주세요.")
            location.replace('/knt/user/html/login/login.html');
        }
    });
}