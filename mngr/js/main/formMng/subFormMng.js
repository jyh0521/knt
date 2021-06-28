let subFormMng = (function(){
    function initSubFormMng() {
        $('#menuFuncDiv').load('formMng/subFormMng/subFormMng.html', function(){
            getSubFormListCount();
        });
    }

    // 목록 전체 데이터 수 불러오기 
    function getSubFormListCount(){
        requestData('/knt/mngr/php/main/formMng/subFormMng/getSubFormListCount.php').done(function(result){
            DrawPaging(result['COUNT'], 10, 1, 'subFormMngPagingDiv',  getSubFormList);
        });
    }

    // 게시판 목록 불러오기(id, 제목, 작성자, 작성일, 삭제여부)
    function getSubFormList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = "startrow=" + startrow;

        requestData('/knt/mngr/php/main/formMng/subFormMng/getSubFormList.php', param).done(function(result){
            drawSubFormList(currentPage, result);
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

        // let noticeBrdMngListTbodyHtml = "";
        // let noticeBrdMngListSize = noticeBrdMngList.length;
        // let startDataIndex = currentPage * 10 - 10 + 1;
    
        // for(let i = 0; i < noticeBrdMngListSize; i++) {
        //     noticeBrdMngListTbodyHtml += '<tr class="noticeBrdListTr" id="noticeBrdListId' + noticeBrdMngList[i]['BRD_ID'] + '">';
        //     noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListNum">' + (startDataIndex + i) + '</td>';
        //     noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListTitle">' + noticeBrdMngList[i]['BRD_TITLE'] + '</td>';
        //     noticeBrdMngListTbodyHtml +=     "<td>" + cmpTimeStamp(noticeBrdMngList[i]["BRD_DATE"]) + "</td>";
        //     noticeBrdMngListTbodyHtml += "</tr>";
        // }
    
        // $("#noticeBrdMngListTbody").empty().append(noticeBrdMngListTbodyHtml);
    
        // initNoticeBrdMngListEvent();
    }

    return {
        initSubFormMng : initSubFormMng
    };

})();