// 변수

// 함수
function initFormInfoWrite(id) {
    initFormInfoWriteEvent(id);
}

function initFormInfoWriteEvent(id) {
    $('#formInfoSubmitBtn').off('click').on('click', function(){
        let param = [];
        let pwdChk = $('#userPwdChk').val();

        param['id'] = id;
        param['name'] = $('#userName').val();
        param['num'] = $('#userNum').val();
        param['pwd'] = $('#userPwd').val();
        
        if(infoValidationCheck(param, pwdChk)) {
            if(confirm('등록하시겠습니까?')) {
                // 이미 작성된 지원서가 있는지 확인



                $("#menuFuncDiv").load("formWrite/formWrite.html", function () {
                    // 함수경로: /knt/user/js/main/formWrite/formWrite.js
                    initFormWrite(param);
                });
            }
        }
    });
}

// 정보 입력 창 유효성 검사
function infoValidationCheck(param, pwdChk) {
    if(param['name'].trim() === '') {
        alert('이름을 입력하세요.');
        return false;
    }
    else if(param['num'].trim() === '') {
        alert('학번을 입력하세요.');
        return false;
    }
    else if(param['pwd'].trim() === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }
    else if(pwdChk.trim() === '') {
        alert('비밀번호 확인을 입력하세요.');
        return false;
    }

    // 비밀번호와 비밀번호 확인이 다른 경우
    if(param['pwd'] != pwdChk) {
        alert('비밀번호 확인이 다릅니다.');
        return false;
    }

    return true;
}

/*
    TODO
    1. 비밀번호 유효성 검사: 대소문자, 특수문자, 숫자 넣을 수 있게
*/