// 변수
maxQueSize = 5;

// 함수
// 지원서 작성하기 초기화 함수
function initFormWrite() {
    getFormListSize();
}

// 지원서 전체 수 불러오기
function getFormListSize() {
    requestData('/knt/user/php/main/formWrite/getFormListSize.php').done(function(result) {
        DrawPaging(result['COUNT'], 10, 1, 'formWritePagingDiv', getFormWriteList);
    });
}

// 지원서 리스트 불러오기
function getFormWriteList(currentPage) {
    let param = 'currentPage=' + currentPage + '&dataPerPage=' + 10;

    requestData('/knt/user/php/main/formWrite/getFormWriteList.php', param).done(function(result){
        drawFormList(result, currentPage);
    });
}

// 지원서 양식 불러오기
function getFormWriteContent(id) {
    let param = 'id=' + id;
    requestData('/knt/user/php/main/formWrite/getFormWriteContent.php', param).done(function(result){
        drawFormWriteContent(id, result[0]);
    });
}

// 지원서 리스트 그리기
function drawFormList(result, currentPage) {
    $('#formWriteTableDiv').css('display', 'block');
    $('#formWriteContentDiv').css('display', 'none');

    let formListHtml = '';
    let formListSize = result.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < formListSize; i++) {
        formListHtml += '<tr id="formList' + result[i]['FORM_ID'] + '">';
        formListHtml +=     '<td class="formListNum">' + (startDataIndex + i) + '</td>';
        formListHtml +=     '<td class="formListTitle">' + result[i]['FORM_TITLE'] + '</td>';
        formListHtml +=     '<td><input type="radio" name="selectForm" value="formWrite' + result[i]['FORM_ID'] + '"/></td>';
        formListHtml += '</tr>';
    }

    $('#formWriteListTbody').empty().append(formListHtml);

    initFormWriteEvent();
}

function drawFormWriteContent(id, result) {
    $('#formWriteTableDiv').css('display', 'none');
    $('#formWriteContentDiv').css('display', 'block');

    let formWriteContentHtml = '';
    formWriteContentHtml += '<p>' + result['FORM_TITLE'] + '</p>';
    
    // 인적사항
    formWriteContentHtml += '<ul>';
    formWriteContentHtml += '<li><input placeholder="이름"/></li>';
    formWriteContentHtml += '<li><input placeholder="학번"/></li>';
    formWriteContentHtml += '<li><input placeholder="생년월일"/></li>';
    formWriteContentHtml += '<li><input placeholder="성별"/></li>';
    formWriteContentHtml += '<li><input placeholder="연락처"/></li>';
    formWriteContentHtml += '</ul>';

    // 지원서 질문
    formWriteContentHtml += '<ul>';
    for(let i = 1; i <= maxQueSize; i++) {
        if(result['FORM_QUE' + i] != 'empty') {
            formWriteContentHtml += '<li>';
            formWriteContentHtml += '<p>' + i + '. ' + result['FORM_QUE' + i] + '</p>';
            formWriteContentHtml += '<textarea></textarea>';
            formWriteContentHtml += '</li>';
        }
    }
    formWriteContentHtml += '</ul>';

    formWriteContentHtml += '<button id="formWriteSaveBtn">임시저장</button>';
    formWriteContentHtml += '<button id="formWriteSubmitBtn">제출</button>';
    formWriteContentHtml += '<button id="formWriteBackBtn">뒤로</button>';
    $('#formWriteContentDiv').empty().append(formWriteContentHtml);

    initFormWriteContEvent(id, result);
}

function initFormWriteEvent() {
    $('#formSelectBtn').off('click').on('click', function(){
        let form = $('input[name="selectForm"]:checked').val();

        if(form) {
            getFormWriteContent(form.substr(9));
        }
        else {
            alert('지원서를 선택해주세요.');
        }
    });
}

function initFormWriteContEvent(id, result) {
    $('#formWriteBackBtn').off('click').on('click', function(){
        initFormWrite();
    });
}