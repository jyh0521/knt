let noticeBrd = (function() {
    let noticeBrdList = [];
    let noticeBrdContent = [];
    let noticeBrdContentListId ="";

    let noticeBrdListCount="";//전체 데이터 수!
    let searchOrAll = "";//검색한 리스트 or 전체 리스트

    function showNoticeBrd(){
        makeBackEvent('noticeBrd');

        $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
            $("#kntNoticeBrdWrite").css("display", "none");
            $("#kntNoticeBrdContent").css("display", "none");
            $("#UpdatekntNoticeBrdContent").css("display", "none");
            $("#kntNoticeBrdComment").css("display", "none");
        
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
            noticeBrdListCount = String(result);//공지사항 목록 총 데이터 수
            DrawPaging(noticeBrdListCount, 10, 1, "kntNoticeBrdPagingArea",  getNoticeBrdList);
            //페이징 함수 호출 후 getNoticeBrdList로 현재 페이지를 들고 호출
        });
    }

    //공지사항 목록 데이터 불러오기
    function getNoticeBrdList(currentPage){
        let startrow = (currentPage - 1) * 10;
        let param = "startrow=" + startrow;

        requestData("/knt/user/php/main/noticeBrd/getNoticeList.php", param).done(function(result){
            noticeBrdList = result;

            showNoticeHeader();
            showNoticeBrdTable();
            showNoticeBrdList(currentPage);
        });
    }

    //공지사항 조회수 변경
    function setNoticeBrdHit(){
        if(getCookie("ADMIN"/*로그인한 아이디*/ + "noticeBrdHitCookie"/*길게*/ + noticeBrdContentListId) == null){//쿠키 존재x
            setCookie("ADMIN" + "noticeBrdHitCookie" + noticeBrdContentListId, "true" , 1);//쿠키 생성
            let param = "id=" + noticeBrdContentListId 
            //클릭한 제목의 아이디를 찾아 조회수를 증가
            requestData("/knt/user/php/main/noticeBrd/setNoticeBrdHit.php", param).done(function(result){
                if(result){
                    getNoticeBrdContent();//공지사항 내용 데이터 불러오기
                }
            });
        }
        else{//쿠키 존재
            getNoticeBrdContent();//공지사항 내용 데이터 불러오기
        }
    }

    //공지사항 내용 데이터 불러오기
    function getNoticeBrdContent(){
        let param = "id=" + noticeBrdContentListId;

        requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){
            $("#kntNoticeBrd").css("display", "none");
            $("#kntNoticeBrdWrite").css("display", "none");
            $("#kntNoticeBrdContent").css("display", "block");
            $("#kntNoticeBrdComment").css("display", "block");
            noticeBrdContent = result;

            makeBackEvent('noticeBrdContent');
            showNoticeBrdContent();//공지사항 내용 보여주기
        });
    }

    //검색된 리스트 수 불러오기
    function getNoticeSearchListCount(){
        let noticeSearchText = $("#noticeSearchText").val();//검색 input text값
        let SelectNoticeSearchOption = $("#SelectNoticeSearchOption").val();//선택된 select option
        let param = "text=" + noticeSearchText + "&option=" + SelectNoticeSearchOption;

        requestData("/knt/user/php/main/noticeBrd/getNoticeSearchListCount.php",param).done(function(result){
            if(!result){
                alert("등록된 게시글이 없습니다.");

                getNoticeBrdListCount();
            }
            else{
                noticeBrdListCount =  String(result);//////////////
                DrawPaging(noticeBrdListCount, 10, 1, "kntNoticeBrdPagingArea", setNoticeSearchList);////////////
            }
        });
    }

    //공지사항 검색된 리스트 불러오기
    function setNoticeSearchList(currentPage){
        let noticeSearchText = $("#noticeSearchText").val();//검색 input text값
        let SelectNoticeSearchOption = $("#SelectNoticeSearchOption").val();//선택된 select option
        let startrow = (currentPage - 1) * 10;
        let param = "text=" + noticeSearchText + "&option=" + SelectNoticeSearchOption + "&startrow=" + startrow;

        requestData("/knt/user/php/main/noticeBrd/setNoticeSearchList.php", param).done(function(result){
            noticeBrdList = result;//////////////
            
            showNoticeHeader();
            showNoticeBrdTable();
            showNoticeBrdList(currentPage);
        });

    }

    function showNoticeHeader(){
        let noticeBrdTitleTxTHtml = "";
        noticeBrdTitleTxTHtml+='<h2 class="noticeBrdHeaderTitle">공 지 사 항</h2>';

        $("#noticeBrdTitleTxT").empty().append(noticeBrdTitleTxTHtml);
    }

    function showNoticeBrdTable(){
        let kntNoticeBrdContentDomainHtml= "";
        
        //kntNoticeBrdContentDomainHtml += "<h4>총 "+"<a style = 'color:#79021f;'>"+noticeBrdListCount+"</a>"+"건</h4>";
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

        // 화면을 다 그린 후 보여주기
        $("#kntNoticeBrd").css("display", "block");

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
    };

    //공지사항 목록 보여주기
    function showNoticeBrdList(currentPage) {

        let noticeBrdListTbodyHtml = "";
        let noticeBrdListSize = noticeBrdList.length;
        let noticeBrdStartNum = (currentPage - 1) * 10 + 1; //페이지마다의 첫번째 목록의 번호 

        for(let i = 0; i < noticeBrdListSize; i++) {
            noticeBrdListTbodyHtml += "<tr class = 'kntNoticeBrdTitle' id = 'noticeBrdContentListId" + noticeBrdList[i]['BRD_ID']/* 아이디 중복 대비 */ + "' '>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + (i + noticeBrdStartNum) + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + noticeBrdList[i]["BRD_TITLE"] + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + cmpTimeStamp(noticeBrdList[i]["BRD_DATE"]) + "</td>";
            noticeBrdListTbodyHtml +=     "<td class = 'noticeBrdList'>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
            noticeBrdListTbodyHtml += "</tr>";
        }

        $("#noticeBrdListTbody").empty().append(noticeBrdListTbodyHtml);

        //공지사항 목록 중 제목 클릭 시 - 쿠키 존재 확인 > 조회수 증가 > 공지사항 내용 데이터를 불러와야함
        $(".kntNoticeBrdTitle").off("click").on("click", function(){
            noticeBrdContentListId = this.id.substr(22);
            
            setNoticeBrdHit();
        });
    }

    //공지사항 내용 보여주기
    function showNoticeBrdContent(){
        let kntNoticeBrdContentDomainHtml = "";
        kntNoticeBrdContentDomainHtml += "<div class='ui segment' style='height: 72.917%; margin-top: 14px;'>";
        kntNoticeBrdContentDomainHtml +=    "<p style='font-size: 30px; margin-bottom: 5px;'>" + noticeBrdContent[0]['BRD_TITLE'] + "</p>";
        kntNoticeBrdContentDomainHtml +=    "<p style='hegith: 10px; color: #979797; font-size: 12px; word-spacing: 5px;'>" + noticeBrdContent[0]['BRD_DATE'];
        kntNoticeBrdContentDomainHtml +=    " 조회수 " + noticeBrdContent[0]['BRD_HIT']+ "</p>";
        kntNoticeBrdContentDomainHtml +=        "<div class='ui fitted divider'></div>"
        kntNoticeBrdContentDomainHtml +=    "<p style='font-size: 20px; padding-top: 20px; height: 300px'>" +  noticeBrdContent[0]['BRD_CONTENT'] + "</p>";
        kntNoticeBrdContentDomainHtml += "</div>";

        if(noticeBrdContent[0]['BRD_FORM'] != 'empty') {
            let submitBtnHtml = '';
            submitBtnHtml += '<div class="ui primary submit labeled icon button writeRegistedFormBtn" id="writeRegisterdForm' + noticeBrdContent[0]['BRD_FORM'] + '"">';
            submitBtnHtml +=    '<i class="icon edit"></i>지원하기';
            submitBtnHtml += '</div>';
            $('#kntNoticeSubmitBtnDiv').empty().append(submitBtnHtml);
        }

        $("#kntNoticeBrdContentDomain").empty().append(kntNoticeBrdContentDomainHtml);

        // 지원서 작성하기 버튼 클릭 시
        $('.writeRegistedFormBtn').off('click').on('click', function(){
            let id = this.id.substr(18);

            if(confirm('지원서를 작성하시겠습니까?')) {
                $("#menuFuncDiv").load("formWrite/formInfoWrite.html", function () {
                    // 함수경로: /knt/user/js/main/formWrite/formInfoWrite.js
                    formInfoWrite.initFormInfoWrite(id);
                });
            }
            else {
                alert('취소되었습니다.');
            }
        });
    }

    return {
        initNoticeBrd : showNoticeBrd
    };

})();

/*
    TODO
    1. 이벤트 따로 함수로 분리하면 좋을듯
*/
