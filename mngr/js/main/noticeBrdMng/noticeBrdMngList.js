let noticeBrdMngList = (function() {
    // 게시판 보여주기
    function showNoticeBrdMng(){
        //makeBackEvent('noticeBrdMngList');

        $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngList.html', function () {
            getNoticeBrdMngListCount();
        });
    }

    // 목록 전체 데이터 수 불러오기 
    function getNoticeBrdMngListCount(){
        requestData('/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngListCount.php').done(function(result){
            DrawPaging(result['COUNT'], 10, 1, 'noticeBrdMngPagingDiv',  getNoticeBrdMngList);
        });
    }

    // 게시판 목록 불러오기(id, 제목, 작성자, 작성일, 삭제여부)
    function getNoticeBrdMngList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = 'startrow=' + startrow;

        requestData('/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngList.php', param).done(function(result){
            $('#noticeBrdMngTableDiv').load('noticeBrdMng/noticeBrdMngTable.html', function () {
                showNoticeBrdMngList(currentPage,result);
            });
        });
    }

    // 게시판 내용 데이터 불러오기
    function getNoticeBrdMngContent(id){
        let param = 'id=' + id; 

        requestData('/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngContent.php',param).done(function(result){
            $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngContent.html', function () {
                noticeBrdMngContent.initnoticeBrdMngContent(result,id);
            });
        });
    }

    // 공지사항 리스트 보여주기
    function showNoticeBrdMngList(currentPage,noticeBrdMngList){
        let noticeBrdMngListTbodyHtml = '';
        let noticeBrdMngListSize = noticeBrdMngList.length;
        let startDataIndex = currentPage * 10 - 10 + 1;

        for(let i = 0; i < noticeBrdMngListSize; i++) {
            noticeBrdMngListTbodyHtml += '<tr class="noticeBrdListTr" id="noticeBrdListId' + noticeBrdMngList[i]['BRD_ID'] + '">';
            noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListNum">' + (startDataIndex + i) + '</td>';
            noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListTitle">' + noticeBrdMngList[i]['BRD_TITLE'] + '</td>';
            noticeBrdMngListTbodyHtml +=     '<td>' +  getDataDate(noticeBrdMngList[i]['BRD_DATE_START']) + '~' + getDataDate(noticeBrdMngList[i]['BRD_DATE_END'])+ '</td>';
            noticeBrdMngListTbodyHtml +=     '<td>' + cmpTimeStamp(noticeBrdMngList[i]['BRD_DATE']) + '</td>';
            noticeBrdMngListTbodyHtml += '</tr>';
        }

        $('#noticeBrdMngListTbody').empty().append(noticeBrdMngListTbodyHtml);

        // 화면을 다 그린 후 보여주기
        $('#kntNoticeBrdMng').css('display', 'block');

        initNoticeBrdMngListEvent();
    }

    // 공지사항 리스트 이벤트
    function initNoticeBrdMngListEvent() {
        // 공지사항 리스트 클릭 시
        $('.noticeBrdListTr').off('click').on('click', function(){
            getNoticeBrdMngContent(this.id.substr(15));
        });

        // 글 쓰기 클릭 시
        $('#noticeBrdMngWriteBtn').off('click').on('click', function(){
            $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngWrite.html', function () {
                noticeBrdMngWrite.initnoticeBrdMngWrite(null, 'write');
            });
        });
    }

    return {
        initNoticeBrdMng : showNoticeBrdMng
    };
})();

/*
    TODO
    1. 코드 리펙토링(전역변수 줄이고 파라미터 사용하기)
    2. ' -> ''로 수정
    3. 공지사항 내용 보여줄 때 지원서 아이디 말고 지원서 이름으로 나오게 쿼리 수정하기
*/