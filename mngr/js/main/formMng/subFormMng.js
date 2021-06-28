let subFormMng = (function(){
    function initSubFormMng() {
        $('#menuFuncDiv').load('formMng/subFormMng/subFormMng.html', function(){
            getSubFormListCount();
        });
    }

    // 지원서 목록 전체 데이터 수 불러오기 
    function getSubFormListCount(){
        requestData('/knt/mngr/php/main/formMng/subFormMng/getSubFormListCount.php').done(function(result){
            DrawPaging(result['COUNT'], 10, 1, 'subFormMngPagingDiv',  getSubFormList);
        });
    }

    // 지원서 목록 불러오기
    function getSubFormList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = "startrow=" + startrow;

        requestData('/knt/mngr/php/main/formMng/subFormMng/getSubFormList.php', param).done(function(result){
            drawSubFormList(currentPage, result);
        });
    }

    // 지원서 내용 불러오기
    function getSubFormContent(id){
        let param = "id=" + id;

        requestData('/knt/mngr/php/main/formMng/subFormMng/getSubFormContent.php', param).done(function(subForm){
            param = "id=" + subForm[0]['FORM_ID'];

            requestData('/knt/mngr/php/main/formMng/subFormMng/getFormContent.php', param).done(function(formContent){
                $('#menuFuncDiv').load('formMng/subFormMng/subFormContent.html', function(){
                    drawSubFormContent(subForm[0], formContent[0]);
                });
            });
        });
    }

    function drawSubFormList(currentPage, list) {
        let subFormListHtml = '';
        let subFormListSize = list.length;
        let startDataIndex = currentPage * 10 - 10 + 1;

        for(let i = 0; i < subFormListSize; i++) {
            subFormListHtml += '<tr class="subFormListTr" id="subFormListId' + list[i]['SUB_FORM_ID']+ '">';
            subFormListHtml +=      '<td class="subFormListNum">' + (startDataIndex + i) + '</td>';
            subFormListHtml +=      '<td class="subFormListTitle">' + list[i]['FORM_TITLE'] + '</td>';
            subFormListHtml +=      '<td>' + list[i]['SUB_FORM_NAME'] + '</td>';
            subFormListHtml += '</tr>';
        }

        $("#subFormListTbody").empty().append(subFormListHtml);

        $('#subFormMngDiv').css('display', 'block');

        initSubFormListEvent();
    }

    function drawSubFormContent(subForm, formContent) {

        let subFormTitleHtml = '';

        subFormTitleHtml += '<h4 class="title">' + formContent['FORM_TITLE'] + '</h4>';
        
        $('#subFormTitle').empty().append(subFormTitleHtml);

        let subFormInfoHtml = '';

        subFormInfoHtml += '<h3 class="infoTitle">기본 인적사항</h3>';
        subFormInfoHtml += '<p class="info">' + subForm['SUB_FORM_NAME'] + '</p>';
        subFormInfoHtml += '<p class="info">' + subForm['SUB_FORM_NUM'] + '</p>';
        subFormInfoHtml += '<p class="info">' + subForm['SUB_FORM_BIRTH'] + '</p>';
        subFormInfoHtml += '<p class="info">' + subForm['SUB_FORM_SEX'] + '</p>';

        $('#subFormInfoDiv').empty().append(subFormInfoHtml);

        let subFormQusHtml = '';

        for(let i = 1; i <= 5; i++) {
            if(formContent['FORM_QUE' + i] != 'empty') {
                subFormQusHtml += '<div class="qusAns">'
                subFormQusHtml += '<p class="qus">' + i +'. ' + formContent['FORM_QUE' + i] + '</p>';
                subFormQusHtml += '<p>' + subForm['SUB_FORM_ANS' + i] + '</p>';
                subFormQusHtml += '</div>'
            } 
        }

        $('#subFormQusSubDiv').empty().append(subFormQusHtml);
    }

    // 제출된 지원서 목록 이벤트
    function initSubFormListEvent() {
        // 항목 선택 시
        $('.subFormListTr').off('click').on('click', function(){
            let id = this.id.substr(13);
            getSubFormContent(id);
        });
    }

    return {
        initSubFormMng : initSubFormMng
    };

})();