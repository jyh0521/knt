let formWrite = (function(){
    // 변수
    let maxQueSize = 5;
    let formContent = [];

    
    // 함수
    // 지원서 작성하기 초기화 함수
    function initFormWrite(param) {
        drawFormWriteInfo(param);
        getFormWriteContent(param['id']);
        initFormWriteEvent(param);
    }

    // 지원서 내용을 가져오는 함수
    function getFormWriteContent(id) {
        let param = 'id=' + id;
        requestData('/knt/user/php/main/formWrite/getFormWriteContent.php', param).done(function(result){
            formContent = result[0];
            drawFormWriteContent(formContent);
        });
    }

    /*
        임시 저장된 내용이 있는지 확인하고 없으면 insert 있으면 update
    */
    // 지원서 내용을 제출하는 함수
    function submitUserForm(content) {
        let param = 'name=' + content['name'] + '&num=' + content['num'] + '&birth=' + content['birth'] + '&date=' + content['date'] + '&sex=' + content['sex'] + '&phone=' + content['phone'] + 
                    '&pwd=' + content['pwd'] + '&form=' + content['id'] + '&ans1=' + content['FORM_ANS1'] + '&ans2=' + content['FORM_ANS2'] + 
                    '&ans3=' + content['FORM_ANS3'] + '&ans4=' + content['FORM_ANS4'] + '&ans5=' + content['FORM_ANS5'];

        requestData('/knt/user/php/main/formWrite/submitUserForm.php', param).done(function(result){
            if(result) {
                alert('제출되었습니다.');
                $("#menuFuncDiv").load("noticeBrd/noticeBrdList.html", function () {
                    showNoticeBrd();
                });
            }
            else {
                alert('제출실패했습니다.');
            }
        });
    }

    // 지원서 내용을 임시저장 하는 함수
    function saveUserForm(content) {
        let param = 'name=' + content['name'] + '&num=' + content['num'] + '&birth=' + content['birth'] + '&sex=' + content['sex'] + '&phone=' + content['phone'] + 
                    '&pwd=' + content['pwd'] + '&form=' + content['id'] + '&ans1=' + content['FORM_ANS1'] + '&ans2=' + content['FORM_ANS2'] + 
                    '&ans3=' + content['FORM_ANS3'] + '&ans4=' + content['FORM_ANS4'] + '&ans5=' + content['FORM_ANS5'];

        requestData('/knt/user/php/main/formWrite/saveUserForm.php', param).done(function(result){
            if(result) {
                alert('저장되었습니다.');
            }
            else {
                alert('저장 실패했습니다.');
            }
        });
    }

    // 지원서 정보를 그리는 함수
    function drawFormWriteInfo(param) {
        $('#subUserName').val(param['name']);
        $('#subUserNum').val(param['num']);
    }

    function drawFormWriteContent(param) {
        // 제목
        $('#formWriteContentTitle').empty().append('<h4>' + param['FORM_TITLE'] + '</h4>'); 
        
        // 질문
        let formWriteContentHtml = '';
        let queCnt = 0;

        for(let i = 1; i <= maxQueSize; i++) {
            if(param['FORM_QUE' + i] != 'empty') {
                queCnt++;
                formWriteContentHtml += '<div>';
                formWriteContentHtml += '<p>' + i + '. ' + param['FORM_QUE' + i] + '</p>';
                formWriteContentHtml += '<textarea id="formAnsTextArea' + i + '"class="formAnsText"></textarea>';
                formWriteContentHtml += '<p id="formAnsTextAreaCharCnt' + i + '">0</p>';
                formWriteContentHtml += '</div>';
            }
        }

        $('#formWriteContentQuestionDiv').empty().append(formWriteContentHtml);

        initFormWriteContentEvent(queCnt);
    }   

    // 지원서 작성 이벤트
    function initFormWriteEvent(param) {
        // 임시저장 버튼 클릭 시
        $('#formWriteTempSaveBtn').off('click').on('click', function() {
            param['birth'] = $('#userBirth').val();
            param['sex'] = $('#userSex').val();
            param['phone'] = $('#userPhone').val();

            for(let i = 1; i <= maxQueSize; i++) {
                if(formContent['FORM_QUE' + i] != 'empty') {
                    param['FORM_ANS' + i] = $('#formAnsTextArea' + i).val();
                }
                else {
                    param['FORM_ANS' + i] = 'empty';
                }
            }

            if(confirm('지원서를 임시 저장하시겠습니까? 반드시 제출하셔야 지원이 완료됩니다.')) {
                saveUserForm(param);
            }
            else {
                alert('취소되었습니다.');
            }
        });

        // 제출하기 버튼 클릭 시
        $('#formWriteSubmitBtn').off('click').on('click', function() {
            param['birth'] = $('#userBirth').val();
            param['sex'] = $('#userSex').val();
            param['phone'] = $('#userPhone').val();
            param['date'] = getTimeStamp(new Date());
            
            if(formContentValidationCheck(param)) {
                // 지원서 질문의 답변이 다 쓰였는지 검사
                for(let i = 1; i <= maxQueSize; i++) {
                    if(formContent['FORM_QUE' + i] != 'empty') {
                        if($('#formAnsTextArea' + i).val().trim() === '') {
                            alert('질문' + i + '를 작성해주세요.');
                            return false;
                        }
                        else
                            param['FORM_ANS' + i] = $('#formAnsTextArea' + i).val();
                    }
                    else {
                        param['FORM_ANS' + i] = 'empty';
                    }
                }

                if(confirm('지원서를 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.')) {
                    submitUserForm(param);
                }
                else {
                    alert('취소되었습니다.');
                }
            }
        });

        // 취소 버튼 클릭 시
        $('#formWriteCancelBtn').off('click').on('click', function() {
            if(confirm('지원서 작성을 취소하시겠습니까?')) {
                alert('취소되었습니다.');
                $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
                    showNoticeBrd();
                });
            }
        });

        //성별 셀렉트 박스 특정 옵션 선택 시
        $(document).ready(function() {
            $('#userSex').change(function() {
                $(this).attr("selected");
            }); 
        }); 
    }

    function initFormWriteContentEvent(queCnt) {
        for(let i = 1; i <= queCnt; i++) {
            $('#formAnsTextArea' + i).keyup(function(){
                $('#formAnsTextAreaCharCnt' + i).empty().append(this.value.length);
            });
        }
    }

    // 지원서 작성 내용 유효성 검사
    function formContentValidationCheck(param) {
        let regBirth=/^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;

        if(param['birth'].trim() === '') {
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

        if(!regBirth.test(param['birth'])){
            alert('생년월일을 다시 입력해주세요.');
            return false;
        }
        return true;
    }

    return {
        initFormWrite : initFormWrite,
        drawFormWriteContent : drawFormWriteContent
    };
})();

/*
    TODO
    1. 지원서 작성일자 추가
    2. 지원서 정해진 기간에만 제출할 수 있게 구현
*/