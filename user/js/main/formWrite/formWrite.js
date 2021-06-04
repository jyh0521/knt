// 변수


// 함수
// 지원서 작성하기 초기화 함수
function initFormWrite() {
    getFormListSize();
}

// 지원서 전체 수 불러오기
function getFormListSize() {
    requestData('/knt/user/php/main/formWrite/getFormListSize.php').done(function(result) {
        DrawPaging(result['COUNT'], 10, 1, 'formMngPagingDiv', getFormMngList);
    });
}

// 지원서 리스트 불러오기
function getFormMngList(currentPage) {
    let param = 'currentPage=' + currentPage + '&dataPerPage=' + 10;

    requestData('/knt/user/php/main/formWrite/getFormWriteList.php', param).done(function(result){
        drawFormList(result, currentPage);
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
        formListHtml += '</tr>';
    }

    $('#formWriteListTbody').empty().append(formListHtml);

    //initFormListEvent();
}
