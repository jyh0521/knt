let noticeBrd = (function() {
    let searchOrAll = "";//검색한 리스트 or 전체 리스트

    function showNoticeBrd(){
        makeBackEvent('noticeBrd');

        $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
            if(searchOrAll == "search"){ //검색 관련 리스트 불러오기
                getNoticeSearchListCount();
            }
            else{ //전체 리스트 불러오기
                getNoticeBrdListCount();
            }   
        });  
    }

    //목록 전체 데이터 수 불러오기 
    function getNoticeBrdListCount(){
        requestData("/knt/user/php/main/noticeBrd/getNoticeBrdListCount.php").done(function(result){
            let cnt = result["COUNT"];//공지사항 목록 총 데이터 수
            DrawPaging(cnt, 10, 1, "kntNoticeBrdPagingArea",  getNoticeBrdList);
        });
    }

    //공지사항 목록 데이터 불러오기
    function getNoticeBrdList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = "startrow=" + startrow;

        requestData("/knt/user/php/main/noticeBrd/getNoticeList.php", param).done(function(result){
            let list = result;

            showNoticeBrdTable();
            showNoticeBrdList(currentPage,list);
        });
    }

    //공지사항 조회수 변경
    function setNoticeBrdHit(id){
        if(getCookie("ADMIN" + "noticeBrdHitCookie" + id) == null){//쿠키 존재x
            setCookie("ADMIN" + "noticeBrdHitCookie" + id, "true" , 1);//쿠키 생성
            let param = "id=" + id 
            //클릭한 제목의 아이디를 찾아 조회수를 증가
            requestData("/knt/user/php/main/noticeBrd/setNoticeBrdHit.php", param).done(function(result){
                if(result){
                    getNoticeBrdContent(id);
                }
            });
        }
        else{//쿠키 존재
            getNoticeBrdContent(id);
        }
    }

    //공지사항 내용 데이터 불러오기
    function getNoticeBrdContent(id){
        let param = "id=" + id;

        requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){
            let content = result;

            makeBackEvent('noticeBrdContent');

            $('#menuFuncDiv').load('noticeBrd/noticeBrdContent.html', function () {
                // 함수경로: /knt/user/js/main/noticeBrd/noticeBrdContent.js
                noticeBrdContent.initnoticeBrdContent(content);
            });
        });
    }

    //검색된 리스트 수 불러오기
    function getNoticeSearchListCount(){
        let text = $("#noticeSearchText").val();//검색 input text값
        let option = $("#SelectNoticeSearchOption").val();//선택된 select option
        let param = "text=" + text + "&option=" + option;

        requestData("/knt/user/php/main/noticeBrd/getNoticeSearchListCount.php",param).done(function(result){
            if(result["COUNT"] == "0"){
                alert("등록된 게시글이 없습니다.");

                getNoticeBrdListCount();
            }
            else{
                let cnt =  result["COUNT"];
                DrawPaging(cnt, 10, 1, "kntNoticeBrdPagingArea", setNoticeSearchList);
            }
        });
    }

    //공지사항 검색된 리스트 불러오기
    function setNoticeSearchList(currentPage){
        let text = $("#noticeSearchText").val();//검색 input text값
        let option = $("#SelectNoticeSearchOption").val();//선택된 select option
        let startrow = (currentPage - 1) * 10;
        let param = "text=" + text + "&option=" + option + "&startrow=" + startrow;

        requestData("/knt/user/php/main/noticeBrd/setNoticeSearchList.php", param).done(function(result){
            let list = result;
            
            showNoticeBrdTable();
            showNoticeBrdList(currentPage,list);
        });

    }

    function showNoticeBrdTable(){
        let kntNoticeBrdContentDomainHtml= "";
        
        kntNoticeBrdContentDomainHtml += '<table class="tableDiv">';
        kntNoticeBrdContentDomainHtml +=     "<thead>";
        kntNoticeBrdContentDomainHtml +=         "<tr>";
        kntNoticeBrdContentDomainHtml +=             "<th style='width: 110px;'>번호</th>";
        kntNoticeBrdContentDomainHtml +=             "<th style='width: 490px;'>제목</th>";
        kntNoticeBrdContentDomainHtml +=             "<th>작성일</th>";
        kntNoticeBrdContentDomainHtml +=             "<th>조회수</th>";
        kntNoticeBrdContentDomainHtml +=         "</tr>";
        kntNoticeBrdContentDomainHtml +=     "</thead>";
        kntNoticeBrdContentDomainHtml +=     "<tbody id='noticeBrdListTbody'>";
        kntNoticeBrdContentDomainHtml +=     "</tbody>";
        kntNoticeBrdContentDomainHtml += "</table>";

        $("#kntNoticeBrdDomain").empty().append(kntNoticeBrdContentDomainHtml);
    };

    //공지사항 목록 보여주기
    function showNoticeBrdList(currentPage,list) {

        let noticeBrdListTbodyHtml = "";
        let noticeBrdListSize = list.length;
        let noticeBrdStartNum = (currentPage - 1) * 10 + 1;

        for(let i = 0; i < noticeBrdListSize; i++) {
            noticeBrdListTbodyHtml += "<tr class = 'kntNoticeBrdTitle' id = 'noticeBrdContentListId" + list[i]['BRD_ID'] + "' '>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + (i + noticeBrdStartNum) + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + list[i]["BRD_TITLE"] + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + cmpTimeStamp(list[i]["BRD_DATE"]) + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + list[i]["BRD_HIT"] + "</td>";
            noticeBrdListTbodyHtml += "</tr>";
        }

        $("#noticeBrdListTbody").empty().append(noticeBrdListTbodyHtml);

        initNoticeBrdEvent();
    }

    //공지사항 이벤트
    function initNoticeBrdEvent(){
        //검색 버튼 클릭 시
        $("#noticeSearchBtn").off("click").on("click", function(){
            let noticeSearchText = $("#noticeSearchText").val();//검색 input text값
            if(!noticeSearchText){
                alert("검색어를 입력하세요.");
            }
            else{
                searchOrAll = "search"
                getNoticeSearchListCount();
            }
        });

        //공지사항 목록 중 제목 클릭 시 
        $(".kntNoticeBrdTitle").off("click").on("click", function(){
            let id = this.id.substr(22);
            
            setNoticeBrdHit(id);
        });
    }

    return {
        initNoticeBrd : showNoticeBrd
    };
})();

