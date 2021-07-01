let login = (function(){
    initLogin();
    
    // 로그인 초기화 함수
    function initLogin() {
        let id = sessionStorage.getItem('loginUser');

        if (id != null) {
            alert('이미 로그인되어있습니다.');
            location.href='/knt/mngr/html/main/main.html';
        }
        else {
            initLoginEvent();
        }
    }

    // 로그인 이벤트 초기화 함수
    function initLoginEvent() {
        // 로그인 버튼 클릭 시
        $('#loginBtn').off('click').on('click', function(){
            let id = $('#userId').val();
            let pwd = $('#userPwd').val();

            if(loginValidate(id, pwd)) {
                let param = {
                    id : id,
                    pwd : pwd
                };
                checkLoginInfo(param);
            }
        });
    }

    function checkLoginInfo(info) {
        let param = makeParam(info);

        requestData('/knt/mngr/php/login/login.php', param).done(function(result){
            if(result) {
                alert('로그인 되었습니다.');
                sessionStorage.setItem("loginUser", info['id']);
                location.href='/knt/mngr/html/main/main.html';
            }
            else {
                alert('아이디와 비밀번호를 다시 확인해주세요.');
            }
        });
    }

    // 로그인 유효성 검사 함수
    function loginValidate(id, pwd) {
        if(id.trim() === '') {
            alert('아이디를 입력해주세요.');
            return false;
        }
        else if(pwd.trim() === '') {
            alert('비밀번호를 입력해주세요.');
            return false;
        }

        return true;
    }
})();