var id = localStorage.getItem('id_session');
if(id != null){
    location.replace('main.html');
}
else{
$("#loginBtn").off("click").on("click", function(){
    logincheck();
}); 

function logincheck(){
    var id = $("#id").val(); 
    var pw = $("#pw").val();

    if(id == "" || pw == ""){
        alert("입력하지 않은 정보가 있습니다.");
    }
    else{
        inputSuccess();
    }
}

function inputSuccess(){
    var id = $("#id").val(); 
    var pw = $("#pw").val();

    var param = "id=" + id + "&pw=" + pw  ;

    requestData("login.php", param).done(function(result) { 
        if(!result){
            alert("로그인에 실패하였습니다.");
        }
        else{
            alert("로그인에 성공하였습니다.");
            localStorage.setItem('id_session', result[0].USR_ID);
            localStorage.setItem('pw_session', result[0].USR_PW);
            location.replace('main.html');
        }
    });
    
}
}
