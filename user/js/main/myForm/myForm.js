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
            
        });

        // 수정 버튼
        $('.myFormListUptBtn').off('click').on('click', function(){
            
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