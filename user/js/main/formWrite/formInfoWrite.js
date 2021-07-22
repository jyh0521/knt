let formInfoWrite = (function(){
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
                    getSavedForm(param).done(function(result){
                        let savedForm = result[0];

                        // 저장되거나 제출된 지원서가 있는 경우
                        if(savedForm['SUB_FORM_ID']) {
                            // 지원서가 제출된 경우
                            if(savedForm['SUB_FORM_ISSUBMIT'] === 'Y') {
                                alert('해당 지원서가 이미 제출되었습니다. 수정이 불가합니다.');
                            }

                            // 지원서가 임시저장된 경우
                            else {
                                if(confirm('임시저장된 지원서가 있습니다. 내 지원서로 이동하시겠습니까?')) {
                                    myForm.initMyForm();
                                }
                                else {
                                    alert('취소되었습니다.');
                                }
                            }
                        }
                        // 저장된 지원서가 없는 경우
                        else {
                            $('#menuFuncDiv').load('formWrite/formWrite.html', function () {
                                formWrite.initFormWrite(param);
                            });
                        }
                    });
                }
            }
        });
    }

    // 지원서 내용을 불러오는 함수
    function getSavedForm(info) {
        let deferred = $.Deferred();

        try {
            let param = 'name=' + info['name'] + '&num=' + info['num'] + '&form=' + info['id'];
            requestData('/knt/user/php/main/formWrite/getSavedForm.php', param).done(function(result) {
                deferred.resolve(result);
            });
        } catch(e) {
            deferred.reject(e);
        }

        return deferred.promise();
    }

    // 정보 입력 창 유효성 검사
    function infoValidationCheck(param, pwdChk) {
        let regPwd = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
        let regNum = /^[0-9]{10}$/;

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

        if(!regNum.test(param['num'])){
            alert('학번을 다시 입력해주세요.');
            return false;
        }
        if(!regPwd.test(param['pwd'])){
            alert('비밀번호는 대/소문자, 특수문자, 숫자를 사용해 8자 이상 입력해주세요.');
            return false;
        }
        // 비밀번호와 비밀번호 확인이 다른 경우
        if(param['pwd'] != pwdChk) {
            alert('비밀번호 확인이 다릅니다.');
            return false;
        }

        return true;
    }

    return {
        initFormInfoWrite : initFormInfoWrite
    };
})();