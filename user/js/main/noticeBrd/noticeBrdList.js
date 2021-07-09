let noticeBrdList = (function() {
    function showNoticeBrd(){
        makeBackEvent('noticeBrd');

        $('#menuFuncDiv').load('noticeBrd/noticeBrd.html', function () {
            // 전체 리스트 불러오기
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
        let info =  {
            startrow : startrow
        };
        let param = makeParam(info);

        requestData('/knt/user/php/main/noticeBrd/getNoticeList.php', param).done(function(result){
            showNoticeBrdTable();
            showNoticeBrdList(currentPage,result);
        });
    }

    // 공지사항 내용 데이터 불러오기
    function getNoticeBrdContent(info){
        let param = makeParam(info);

        requestData('/knt/user/php/main/noticeBrd/getNoticeContent.php', param).done(function(result){
            let content = result;

            makeBackEvent('noticeBrdContent');

            $('#menuFuncDiv').load('noticeBrd/noticeBrdContent.html', function () {
                noticeBrdContent.initnoticeBrdContent(content);
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
        let text = $('#noticeSearchText').val();//검색 input text값
        let option = $('#SelectNoticeSearchOption').val();//선택된 select option
        let startrow = (currentPage - 1) * 10;
        let info = {
            text : text,
            option : option,
            startrow : startrow
        };
        let param = makeParam(info);

        requestData('/knt/user/php/main/noticeBrd/setNoticeSearchList.php', param).done(function(result){   
            showNoticeBrdTable();
            showNoticeBrdList(currentPage,result);
        });

    }

    /*
        TODO    
        1. .load 써서 html에 미리 그려놓기
        2. 화면 그려주기 정정
    */
    function showNoticeBrdTable(){
        let kntNoticeBrdContentDomainHtml= '';
        
        kntNoticeBrdContentDomainHtml += '<table class="tableDiv">';
        kntNoticeBrdContentDomainHtml +=     '<thead>';
        kntNoticeBrdContentDomainHtml +=         '<tr>';
        kntNoticeBrdContentDomainHtml +=             '<th style="width: 110px;">번호</th>';
        kntNoticeBrdContentDomainHtml +=             '<th style="width: 490px;">제목</th>';
        kntNoticeBrdContentDomainHtml +=             '<th>작성일</th>';
        kntNoticeBrdContentDomainHtml +=         '</tr>';
        kntNoticeBrdContentDomainHtml +=     '</thead>';
        kntNoticeBrdContentDomainHtml +=     '<tbody id="noticeBrdListTbody">';
        kntNoticeBrdContentDomainHtml +=     '</tbody>';
        kntNoticeBrdContentDomainHtml += '</table>';

        $('#kntNoticeBrdDomain').empty().append(kntNoticeBrdContentDomainHtml);

        // 화면을 다 그린 후 보여주기
        $('#kntNoticeBrd').css('display', 'block');
    };

    //공지사항 목록 보여주기
    function showNoticeBrdList(currentPage,list) {

        let noticeBrdListTbodyHtml = '';
        let noticeBrdListSize = list.length;
        let noticeBrdStartNum = (currentPage - 1) * 10 + 1;

        for(let i = 0; i < noticeBrdListSize; i++) {
            noticeBrdListTbodyHtml += '<tr class = "kntNoticeBrdTitle" id = "noticeBrdContentListId' + list[i]['BRD_ID'] + '" ">';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + (i + noticeBrdStartNum) + '</td>';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + list[i]['BRD_TITLE'] + '</td>';
            noticeBrdListTbodyHtml +=     '<td class = "noticeBrdList">' + cmpTimeStamp(list[i]['BRD_DATE']) + '</td>';
            noticeBrdListTbodyHtml += '</tr>';
        }

        $('#noticeBrdListTbody').empty().append(noticeBrdListTbodyHtml);

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
            let id = this.id.substr(22);
            let param = {
                id : id
            };
            getNoticeBrdContent(param);
        });
    }

    return {
        initNoticeBrd : showNoticeBrd
    };
})();
