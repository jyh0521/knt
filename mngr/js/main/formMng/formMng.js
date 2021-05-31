// 변수







// 함수

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
        //drawInfoShareTable();
        drawFormList(result, currentPage);
    });
}

function drawFormList(result, currentPage) {
    let formListHtml = '';
    let formListSize = result.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < formListSize; i++) {
        formListHtml += '<tr id=formList' + result[i]['FORM_ID'] + '>';
        formListHtml +=     '<td>' + (startDataIndex + i) + '</td>';
        formListHtml +=     '<td>' + result[i]['FORM_TITLE'] + '</td>';
        formListHtml += '</tr>';
    }

    $('#formListTbody').empty().append(formListHtml);

    initFormListEvent();
}

function initFormListEvent() {
    
}