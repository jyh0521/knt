$("#withdrawalBtn").off("click").on("click", function () {
    let OK;
    OK = confirm("회원 탈퇴 하시겠습니까?");
    id = sessionStorage.getItem("loginUser");
    if (OK) {
        alert("회원탈퇴를 진행합니다.");
        var param = "id=" + id;
        $.ajax({
            url: '/knt/user/php/login/withdrawal.php',
            type: 'post',
            data: param,
        }).done(function () {
            sessionStorage.clear();
            alert("회원탈퇴가 완료되었습니다.");
            location.replace('/knt/user/html/login/login.html');
        })
    }
})