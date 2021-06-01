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
        drawFormContent(result[0]);
    });
}

// 지원서 리스트 그리기
function drawFormList(result, currentPage) {
    $('#formMngTableDiv').css('display', 'block');
    $('#formMngContentDiv').css('display', 'none');

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

function drawFormContent(result) {
    $('#formMngTableDiv').css('display', 'none');
    $('#formMngContentDiv').css('display', 'block');

    let formContentHtml = '';

    formContentHtml += '<p>제목: ' + result['FORM_TITLE'] + '</p>';

    for(let i = 1; i <= maxQueSize; i++) {
        if(result['FORM_QUE' + i] != 'empty') {
            formContentHtml += '<p>질문' + i + ': ' + result['FORM_QUE' + i] + '</p>'
        }
    }

    $('#formMngContentDiv').empty().append(formContentHtml);

    // if(infoShareSelectedContent["BRD_WRITER"] === "ADMIN") {
    //     infoShareSelectedContentHtml += "<button id='infoShareSelectedContentDelBtn'>삭제</button>";
    //     infoShareSelectedContentHtml += "<button id='infoShareSelectedContentUptBtn'>수정</button>";
    // }

    // infoShareSelectedContentHtml += "<button id='infoShareSelectedContentBackBtn'>뒤로</button>";

    // $("#infoShareSelectedContentDiv").empty().append(infoShareSelectedContentHtml);

    // initInfoShareSelectedContentEvent();
}

function initFormListEvent() {
    // 지원서 클릭 시
    $('.formListTitle').off('click').on('click', function(){
        let id = this.id.substr(8);
        getFormContent(id);
    });


    // // 작성하기 버튼 클릭 시
    // $("#infoShareListWriteBtn").off("click").on("click", function(){ 
    //     writeOption = "write";       
    //     drawInfoShareWriteContent();
    // });
}