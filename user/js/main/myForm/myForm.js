let name = '';
let num = '';
let pwd = '';

function initMyForm() {
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
                    drawFormWriteContent(formContent[0]);
                    setMyFormAnswer(myForm[0], formContent[0]);

                    /*
                        TODO
                        1. 이벤트 모드 2개로 설정해서 함수 만들기 or 새로 함수 만들기
                    */
                    initFormWriteEvent()
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

/*
    TODO
    1. 다이얼로그로 조회할 수 있게 수정
*/
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
    $('#subUserName').empty().append('이름: ' +  myForm['SUB_FORM_NAME']);
    $('#subUserNum').empty().append('학번: ' + myForm['SUB_FORM_NUM']);
    $('#userBirth').val(myForm['SUB_FORM_BIRTH']);
    $('#userSex').val(myForm['SUB_FORM_SEX']);
    $('#userPhone').val(myForm['SUB_FORM_PHONE']);

    for(let i = 1; i <= 5; i++) {
        if(formContent['FORM_QUE' + i] != 'empty') {
            $('#formAnsTextArea' + i).val(myForm['SUB_FORM_ANS' + i]);
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