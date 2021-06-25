let myForm = (function(){

    let name = '';
    let num = '';
    let pwd = '';

    function initMyForm() {
        if(nowPage != 'myForm') {
            let state = {'page_id' : 'myForm' };
            history.pushState(state, null, null);
            nowPage = 'myForm';
        }

        $("#menuFuncDiv").load("myForm/myForm.html", function() {
            initMyFormBtnEvent();
        });
    }

    function getSavedMyForm(name, num, pwd) {
        let param = 'name=' + name + '&num=' + num + '&pwd=' + pwd;

        requestData('/knt/user/php/main/myForm/getSavedMyForm.php', param).done(function(result){
            $('#menuFuncDiv').load('myForm/myFormList.html', function(){
                drawMyFormList(result);
            });
        });
    }

    function getMySelectedForm(id, mode) {
        let param = 'id=' + id;

        requestData('/knt/user/php/main/myForm/getMySelectedForm.php', param).done(function(myForm){
            param = 'id=' + myForm[0]['FORM_ID'];

            requestData('/knt/user/php/main/formWrite/getFormWriteContent.php', param).done(function(formContent){
                if(mode === 'check') {
                    $('#menuFuncDiv').load('myForm/myFormChk.html', function(){
                        drawMySelectedForm(myForm[0], formContent[0]);
                    });
                }
                else if(mode ==='update') {
                    $('#menuFuncDiv').load('formWrite/formWrite.html', function(){
                        formWrite.drawFormWriteContent(formContent[0]);
                        setMyFormAnswer(myForm[0], formContent[0]);
                        initMyFormWriteBtnEvent(formContent[0], id);
                    });
                }
            });
        });
    }

    function delSavedMyForm(id) {
        let param = 'id=' + id;

        requestData('/knt/user/php/main/myForm/delSavedMyForm.php', param).done(function(result){
            if(result){
                alert('삭제 되었습니다.');
                getSavedMyForm(name, num, pwd);
            }
            else{
                alert('삭제 실패하였습니다.');
            }
        });
    }

    // 이미 저장된 지원서 임시저장(update) 함수
    function uptSavedMyForm(content) {
        let param = makeParam(content);

        requestData('/knt/user/php/main/myForm/uptSavedMyForm.php', param).done(function(result){
            if(result){
                alert('저장되었습니다');
            }
            else{
                alert('저장 실패하였습니다.');
            }
        });
    }

    // 이미 저장된 지원서 제출(update) 함수
    function submitSavedMyForm(content) {
        let param = makeParam(content);

        requestData('/knt/user/php/main/myForm/submitSavedMyForm.php', param).done(function(result){
            if(result){
                alert('제출되었습니다.');

                // 제출 후 내 지원서 처음으로 이동
                getSavedMyForm(name, num, pwd);
            }
            else{
                alert('제출 실패하였습니다.');
            }
        });
    }

    function drawMyFormList(formList) {
        let myFormListHtml = '';

        for(let i = 0; i < formList.length; i++) {
            myFormListHtml += '<tr class="myFormListTr" id="myFormList' + formList[i]['SUB_FORM_ID'] + '">';
            myFormListHtml +=   '<td>' + formList[i]['FORM_TITLE'] + '</td>';

            if(formList[i]['SUB_FORM_ISSUBMIT'] === 'N') {
                myFormListHtml += '<td>미제출</td>';
            }
            else {
                myFormListHtml += '<td>제출</td>';
            }   

            myFormListHtml += '</tr>';
        }

        $('#myFormListTbody').empty().append(myFormListHtml);

        initMyFormListEvent();
    }

    function drawMySelectedForm(myForm, formContent) {
        let mySelectedFormInfoHtml = '';

        mySelectedFormInfoHtml += '<p>' + formContent['FORM_TITLE'] + '</p>';
        mySelectedFormInfoHtml += '<p>이름: ' + myForm['SUB_FORM_NAME'] + '</p>';
        mySelectedFormInfoHtml += '<p>학번: ' + myForm['SUB_FORM_NUM'] + '</p>';
        mySelectedFormInfoHtml += '<p>생년월일: ' + myForm['SUB_FORM_BIRTH'] + '</p>';
        mySelectedFormInfoHtml += '<p>성별: ' + myForm['SUB_FORM_SEX'] + '</p>';

        $('#myFormChkInfoDiv').empty().append(mySelectedFormInfoHtml);

        let mySelectedFormQusHtml = '';

        for(let i = 1; i <= 5; i++) {
            if(formContent['FORM_QUE' + i] != 'empty') {
                mySelectedFormQusHtml += '<p>질문' + i + '</p>';
                mySelectedFormQusHtml += '<p>' + formContent['FORM_QUE' + i] + '</p>';
                mySelectedFormQusHtml += '<p>' + myForm['SUB_FORM_ANS' + i] + '</p>';
            } 
        }

        $('#myFormChkQusDiv').empty().append(mySelectedFormQusHtml);
    }

    function setMyFormAnswer(myForm, formContent) {
        // $('#subUserName').empty().append('이름: ' +  myForm['SUB_FORM_NAME']);
        // $('#subUserNum').empty().append('학번: ' + myForm['SUB_FORM_NUM']); 인풋 박스 써서 잠깐 바꿀게용..
        $('#subUserName').val(myForm['SUB_FORM_NAME']);
        $('#subUserNum').val(myForm['SUB_FORM_NUM']);
        $('#userBirth').val(myForm['SUB_FORM_BIRTH']);
        $('#userSex').val(myForm['SUB_FORM_SEX']);
        $('#userPhone').val(myForm['SUB_FORM_PHONE']);

        for(let i = 1; i <= 5; i++) {
            if(formContent['FORM_QUE' + i] != 'empty') {
                $('#formAnsTextArea' + i).val(myForm['SUB_FORM_ANS' + i]);
                $('#formAnsTextAreaCharCnt' + i).empty().append($('#formAnsTextArea' + i).val().length);
            }
        }
    }

    function initMyFormBtnEvent() {
        // 조회하기 버튼 클릭 시
        $('#myFormFindBtn').off('click').on('click', function() {
            name = $('#userName').val();
            num = $('#userNum').val();
            pwd = $('#userPwd').val();

            if(myFormValidate(name, num, pwd)) {
                if(confirm('지원서를 조회하시겠습니까?')) {
                    getSavedMyForm(name, num, pwd);
                }
                else {
                    alert('취소되었습니다.');
                }
            }
        });
    }

    function initMyFormListEvent() {
        // 지원서 항목을 클릭했을 때
        $('.myFormListTr').off('click').on('click', function(){
            let selectedId = this.id.substr(10);

            if(this.lastElementChild.innerText === '제출') {
                $('#myFormListYSubmitBtnDiv').css('display', 'block');
                $('#myFormListNSubmitBtnDiv').css('display', 'none');
            }
            else {
                $('#myFormListYSubmitBtnDiv').css('display', 'none');
                $('#myFormListNSubmitBtnDiv').css('display', 'block');
            }

            // 조회 버튼
            $('.myFormListChkBtn').off('click').on('click', function(){
                if(confirm('해당 지원서를 조회하시겠습니까?')) {
                    getMySelectedForm(selectedId, 'check');
                }
                else {
                    alert('취소되었습니다.');
                }
            });

            // 수정 버튼
            $('.myFormListUptBtn').off('click').on('click', function(){
                if(confirm('해당 지원서를 수정하시겠습니까?')) {
                    getMySelectedForm(selectedId, 'update');
                }
                else {
                    alert('취소되었습니다.');
                }
            });

            // 삭제 버튼
            $('.myFormListDelBtn').off('click').on('click', function(){
                if(confirm('해당 지원서를 정말 삭제하시겠습니까? 삭제된 지원서는 복구할 수 없습니다.')) {
                    delSavedMyForm(selectedId);
                }
                else {
                    alert('취소되었습니다.');
                }
            });
        });
    }

    // 내 지원서 수정 시 이벤트
    function initMyFormWriteBtnEvent(formContent, id) {
        // 임시저장 버튼 클릭 시
        $('#formWriteTempSaveBtn').off('click').on('click', function() {
            if(confirm('지원서를 임시 저장하시겠습니까? 반드시 제출하셔야 지원이 완료됩니다.')) {
                let content = getNowFormContent(formContent);
                content['id'] = id;
                uptSavedMyForm(content);
            }
            else {
                alert('취소되었습니다.');
            }
        });

        // 제출 버튼 클릭 시
        $('#formWriteSubmitBtn').off('click').on('click', function() {
            if(confirm('지원서를 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.')) {
                let content = getNowFormContent(formContent);
                content['id'] = id;
                submitSavedMyForm(content);
            }
            else {
                alert('취소되었습니다.');
            }
        });

        // 취소 버튼 클릭 시
        $('#formWriteCancelBtn').off('click').on('click', function() {
            // 내 지원서 처음으로 이동
            getSavedMyForm(name, num, pwd);
        });
    }

    function myFormValidate(name, num, pwd) {
        if(name.trim() === '') {
            alert('이름을 입력해주세요.');
            return false;
        }
        else if(num.trim() === ''){
            alert('학번을 입력해주세요.');
            return false;
        }
        else if(pwd.trim() === ''){
            alert('비밀번호를 입력해주세요.');
            return false;
        }

        return true;
    }

    function getNowFormContent(formContent) {
        let content = [];

        content['birth'] = $('#userBirth').val();
        content['sex'] = $('#userSex').val();
        content['phone'] = $('#userPhone').val();

        for (let i = 1; i <= 5; i++) {
        if(formContent['FORM_QUE' + i] != 'empty') {
            content['ans' + i] = $('#formAnsTextArea' + i).val();
        }
        else {
            content['ans' + i] = 'empty';
        }
        }

        return content;
    }


    return { 
        initMyForm : initMyForm
    };
})();