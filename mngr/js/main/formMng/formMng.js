// 변수
let maxQueSize = 5;

// 함수
// 초기화
function initFormMng() {
    getFormListSize();
}

// 지원서 전체 수 불러오기
function getFormListSize() {
    requestData('/knt/mngr/php/main/formMng/getFormListSize.php').done(function(result) {
        DrawPaging(result['COUNT'], 10, 1, 'formMngPagingDiv', getFormMngList);
    });
}

// 지원서 리스트 불러오기
function getFormMngList(currentPage) {
    let param = 'currentPage=' + currentPage + '&dataPerPage=' + 10;

    requestData('/knt/mngr/php/main/formMng/getFormList.php', param).done(function(result){
        drawFormList(result, currentPage);
    });
}

// 지원서 질문 사항 불러오기
function getFormContent(id) {
    let param = 'id=' + id;
    requestData('/knt/mngr/php/main/formMng/getFormContent.php', param).done(function(result){
        drawFormContent(id, result[0]);
    });
}

// 지원서 리스트 그리기
function drawFormList(result, currentPage) {
    $('#formMngTableDiv').css('display', 'block');
    $('#formMngContentDiv').css('display', 'none');
    $('#formMngAddDiv').css('display', 'none');

    let formListHtml = '';
    let formListSize = result.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < formListSize; i++) {
        formListHtml += '<tr id="formList' + result[i]['FORM_ID'] + '" class="formListTitle">';
        formListHtml +=     '<td>' + (startDataIndex + i) + '</td>';
        formListHtml +=     '<td>' + result[i]['FORM_TITLE'] + '</td>';
        formListHtml += '</tr>';
    }

    $('#formListTbody').empty().append(formListHtml);

    initFormListEvent();
}
/*
    TODO
    1. 제목, 질문 label 태그로 묶기
*/
function drawFormContent(id, result) {
    $('#formMngTableDiv').css('display', 'none');
    $('#formMngContentDiv').css('display', 'block');
    $('#formMngAddDiv').css('display', 'none');

    let formContentHtml = '';

    formContentHtml += '<input id="formContTitle" value="' + result['FORM_TITLE'] + '"/>';

    for(let i = 1; i <= maxQueSize; i++) {
        if(result['FORM_QUE' + i] != 'empty') {
            formContentHtml += '<input id="formContQue'+ i +'" value="' + result['FORM_QUE' + i] + '"/>';
        }
    }

    formContentHtml += '<button id="formContUpdateBtn">확인</button>';
    formContentHtml += '<button id="formContDelBtn">삭제</button>';
    formContentHtml += '<button id="formContBackBtn">뒤로</button>';

    $('#formMngContentDiv').empty().append(formContentHtml);

    initFormContentBtnEvent(id, result);
}

function initFormListEvent() {
    // 지원서 양식 클릭 시
    $('.formListTitle').off('click').on('click', function(){
        let id = this.id.substr(8);
        getFormContent(id);
    });

    // 지원서 양식 추가 버튼 클릭 시
    $('#formMngAddBtn').off('click').on('click', function(){
        $('#formMngTableDiv').css('display', 'none');
        $('#formMngContentDiv').css('display', 'none');
        $('#formMngAddDiv').css('display', 'block');

        $('#formMngAddDiv').load('formMng/registerForm/registerForm.html', function(){
            initRegisterForm();
        });
    });
}

// 지원서 양식 내용 확인 시 이벤트
function initFormContentBtnEvent(id, result) {
    // 확인 버튼 클릭 시
    $('#formContUpdateBtn').off('click').on('click', function(){
        let flag = false;
        
        // 각 내용을 비교해서 수정된 사항이 있으면 수정, 아니면 그냥 냅두기
        if(result['FORM_TITLE'] != $('#formContTitle').val()) {
            flag = true;    
        }

        for(let i = 1; i <= maxQueSize; i++) {
            if(result['FORM_QUE' + i] != 'empty') {
                // 수정된 사항이 있으면
                if(result['FORM_QUE' + i] != $('#formContQue' + i).val()) {
                    flag = true;
                }
            }
        }

        // 수정 사항이 있는 경우
        if(flag) {
            if(confirm('수정 하시겠습니까?')) {
                result['FORM_TITLE'] = $('#formContTitle').val();

                for(let i = 1; i <= maxQueSize; i++) {
                    if(result['FORM_QUE' + i] != 'empty') {
                        if($('#formContQue' + i).val().trim() == '') {
                            result['FORM_QUE' + i] = 'empty';
                        }
                        else {
                            result['FORM_QUE' + i] = $('#formContQue' + i).val();
                        }
                    }
                }

                let param = 'id=' + id + '&title=' + result['FORM_TITLE'] +
                            '&que1=' + result['FORM_QUE1'] + '&que2=' + result['FORM_QUE2'] +
                            '&que3=' + result['FORM_QUE3'] + '&que4=' + result['FORM_QUE4'] + '&que5=' + result['FORM_QUE5'];
                
                requestData("/knt/mngr/php/main/formMng/updateFormCont.php", param).done(function(result){
                    if(result) {
                        alert("수정이 완료되었습니다.");
                        initFormMng();
                    }
                    else {
                        alert("수정 실패하였습니다.");
                    }
                });
            }
            else {
                alert('취소되었습니다.');
            }
        }
        // 수정 사항이 없는 경우
        else {
            initFormMng();
        }
    });

    // 삭제 버튼 클릭 시
    $('#formContDelBtn').off('click').on('click', function(){

    });

    // 뒤로 버튼 클릭 시
    $('#formContBackBtn').off('click').on('click', function(){
        initFormMng();
    });
}