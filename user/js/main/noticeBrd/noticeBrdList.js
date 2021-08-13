let noticeBrdList = (function() {
    function showNoticeBrd(){
        makeBackEvent('noticeBrdList');

        $('#menuFuncDiv').load('noticeBrd/noticeBrdList.html', function () {
            getNoticeBrdListCount();
        });
    }

    // 목록 전체 데이터 수 불러오기
    function getNoticeBrdListCount(){
        requestData('/knt/user/php/main/noticeBrd/getNoticeBrdListCount.php').done(function(result){
            DrawPaging(result['COUNT'], 10, 1, 'kntNoticeBrdPagingArea',  getNoticeBrdList);
        });
    }

    // 공지사항 목록 데이터 불러오기
    function getNoticeBrdList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = "startrow=" + startrow;

        requestData('/knt/user/php/main/noticeBrd/getNoticeList.php', param).done(function(result){
            $("#kntNoticeBrdDomain").load("noticeBrd/noticeBrdTable.html", function () {
                showNoticeBrdList(currentPage,result);
            });
        });
    }

    // 공지사항 내용 데이터 불러오기
    function getNoticeBrdContent(param){

        requestData('/knt/user/php/main/noticeBrd/getNoticeContent.php', param).done(function(result){
            makeBackEvent('noticeBrdContent');

            $('#menuFuncDiv').load('noticeBrd/noticeBrdContent.html', function () {
                noticeBrdContent.initnoticeBrdContent(result);
            });
        });
    }

    // 검색된 리스트 수 불러오기
    function getNoticeSearchListCount(info){
        let param = makeParam(info);

        requestData('/knt/user/php/main/noticeBrd/getNoticeSearchListCount.php',param).done(function(result){
            if(result['COUNT'] == '0'){
                alert("등록된 게시글이 없습니다.");

                getNoticeBrdListCount();
            }
            else{
                DrawPaging(result['COUNT'], 10, 1, 'kntNoticeBrdPagingArea', setNoticeSearchList);
            }
        });
    }

    // 공지사항 검색된 리스트 불러오기
    function setNoticeSearchList(currentPage){
        let text = $('#noticeSearchText').val();
        let option = $('#SelectNoticeSearchOption').val();
        let startrow = (currentPage - 1) * 10;
        let info = {
            text : text, 
            option : option,
            startrow : startrow
        };
        let param = makeParam(info);

        requestData('/knt/user/php/main/noticeBrd/setNoticeSearchList.php', param).done(function(result){   
            $("#kntNoticeBrdDomain").load("noticeBrd/noticeBrdTable.html", function () {
                showNoticeBrdList(currentPage,result);
            });
        });

    }

    // 공지사항 목록 보여주기
    function showNoticeBrdList(currentPage,list) {

        let noticeBrdListTbodyHtml = '';
        let noticeBrdListSize = list.length;
        let noticeBrdStartNum = (currentPage - 1) * 10 + 1;

        for(let i = 0; i < noticeBrdListSize; i++) {
            if(!(getDataDate(list[i]['BRD_DATE_START']) <= getTodayDate() && getTodayDate() <= getDataDate(list[i]['BRD_DATE_END']))){
                continue;
            }
            else{
            noticeBrdListTbodyHtml += '<tr class = "kntNoticeBrdTitle" id = "noticeBrdContentListId' + list[i]['BRD_ID'] + '" ">';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + (i + noticeBrdStartNum) + '</td>';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + list[i]['BRD_TITLE'] + '</td>';
            noticeBrdListTbodyHtml +=     '<td>' +  getDataDate(list[i]['BRD_DATE_START']) + '~' + getDataDate(list[i]['BRD_DATE_END'])+ '</td>';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + cmpTimeStamp(list[i]['BRD_DATE']) + '</td>';
            noticeBrdListTbodyHtml += '</tr>';
            }
        }

        $('#noticeBrdListTbody').empty().append(noticeBrdListTbodyHtml);

        // 화면을 다 그린 후 보여주기
        $('#kntNoticeBrd').css('display', 'block');

        initNoticeBrdEvent();
    }

    // 공지사항 이벤트
    function initNoticeBrdEvent(){
        // 검색 버튼 클릭 시
        $('#noticeSearchBtn').off('click').on('click', function(){
            let noticeSearchText = $('#noticeSearchText').val();// 검색 input text값
            if(!noticeSearchText){
                alert('검색어를 입력하세요.');
            }
            else{
                let param = {
                    text : $('#noticeSearchText').val(), // 검색 input text값
                    option : $('#SelectNoticeSearchOption').val() // 선택된 select option
                }

                getNoticeSearchListCount(param);
            }
        });

        // 공지사항 목록 중 제목 클릭 시 
        $('.kntNoticeBrdTitle').off('click').on('click', function(){
            let param = "id=" + this.id.substr(22);
            
            getNoticeBrdContent(param);
        });
    }

    return {
        initNoticeBrd : showNoticeBrd
    };
})();
