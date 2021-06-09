// 변수

// 함수
function initFormInfoWrite(id) {
    initFormInfoWriteEvent(id);
}

function initFormInfoWriteEvent(id) {
    $('#formInfoSubmitBtn').off('click').on('click', function(){
        let param = [];
        param['id'] = id;
        param['name'] = $('#userName').val();
        param['num'] = $('#userNum').val();
        param['birth'] = $('#userBirth').val();
        param['sex'] = $('#userSex').val();
        param['phone'] = $('#userPhone').val();
        
        if(infoValidationCheck(param)) {
            if(confirm('등록하시겠습니까?')) {
                $("#menuFuncDiv").load("formWrite/formWrite.html", function () {
                    // 함수경로: /knt/user/js/main/formWrite/formWrite.js
                    initFormWrite(param);
                });
            }
        }
    });
}

// 정보 입력 창 유효성 검사
function infoValidationCheck(param) {
    if(param['name'].trim() === '') {
        alert('이름을 입력하세요.');
        return false;
    }
    else if(param['num'].trim() === '') {
        alert('학번을 입력하세요.');
        return false;
    }
    else if(param['birth'].trim() === '') {
        alert('생년월일을 입력하세요.');
        return false;
    }
    else if(param['sex'].trim() === '') {
        alert('성별을 입력하세요.');
        return false;
    }   
    else if(param['phone'].trim() === '') {
        alert('연락처를 입력하세요.');
        return false;
    }

    return true;
}