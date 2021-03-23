let noticeBrdList = [];
let noticeBrdContent = [];
let noticeBrdCommentList = [];
let noticeBrdCommentContent =[];
let noticeBrdContentListId ="";
let noticeBrdCommentListId = "";
let CommentWriteOrUpdate = "";
let ContentWriteOrUpdate = "";

let noticeBrdListCount="";//전체 데이터 수
let searchOrAll = "";//검색한 리스트 or 전체 리스트

function showNoticeBrd(){
    $("#kntNoticeBrd").css("display", "block");
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
    
};

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

//공지사항 내용 데이터 저장 
function setNoticeBrdContent(){
    let writer = sessionStorage.getItem("loginUser");
    let noticeBrdWriteTitle = $("#noticeBrdWriteTitle").val();
    let noticeBrdWriteContent = $("#noticeBrdWriteContent").val();
    let date = getTimeStamp(new Date());//날짜 getTimeStamp() : YYYY-MM-DD hh:mm:ss형식으로 저장

    let param = "writer=" + writer +"&title=" + noticeBrdWriteTitle + "&content=" + noticeBrdWriteContent + "&date=" + date;

    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
            showNoticeBrd();
        }
        else{
            alert("등록을 실패하였습니다.");
        }
    });
}

//공지사항 내용 데이터 수정
function setNoticeBrdUpdate(){
    //제목, 내용, 아이디, 날짜
    let writer = sessionStorage.getItem("loginUser");
    let noticeBrdWriteTitle = $("#noticeBrdWriteTitle").val();
    let noticeBrdWriteContent = $("#noticeBrdWriteContent").val();
    let date = getTimeStamp(new Date());

    let param = "writer=" + writer+"&title=" + noticeBrdWriteTitle + "&content=" + noticeBrdWriteContent + "&id=" + noticeBrdContentListId + "&date=" + date;

    requestData("/knt/user/php/main/noticeBrd/updateNoticeContent.php", param).done(function(result){
        getNoticeBrdContent();
    });
}

//공지사항 내용 데이터 삭제
function setNoticeBrdContentDelete(){
    let param = "id=" + noticeBrdContentListId;

    requestData("/knt/user/php/main/noticeBrd/delNoticeContent.php", param).done(function(result){
        if(result){
            deleteNoticeBrdAllComment(); //공지사항 내용 관련 댓글 데이터 모두 삭제
        }
        else{
            alert("삭제를 실패하였습니다.");
        }
    });
}

//공지사항 내용 관련 댓글 데이터 모두 삭제
function deleteNoticeBrdAllComment(){
    let param = "id=" + noticeBrdContentListId;

    requestData("/knt/user/php/main/noticeBrd/deleteNoticeBrdAllComment.php", param).done(function(result){
        if(result){
            showNoticeBrd();
        }
        else{
            alert("실패");
        }
    });
}

//공지사항 댓글 데이터 삭제
function setNoticeBrdCommentDelete(){
    let param = "id=" + noticeBrdCommentListId;

    requestData("/knt/user/php/main/noticeBrd/deleteNoticeComment.php", param).done(function(result){
        if(result){
            getNoticeBrdCommentListCount();
        }
        else{
            alert("삭제를 실패하였습니다.");
        }
    });
}

//공지사항 댓글 데이터 저장
function setNoticeBrdComment(){
    //댓글 내용, 작성자, 날짜, 클릭한 제목 아이디
    let writer = sessionStorage.getItem("loginUser");
    let noticeBrdCommentContent = $("#noticeBrdCommentContent").val();
    let date = getTimeStamp(new Date());

    let param = "writer=" + writer + "&comment=" + noticeBrdCommentContent + "&date=" + date + "&id=" + noticeBrdContentListId;
    requestData("/knt/user/php/main/noticeBrd/setNoticeComment.php", param).done(function(result){
        if(result){
            getNoticeBrdCommentListCount();//댓글 데이터 불러오기
        }
        else{
            alert("작성을 실패하였습니다.");
        }
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

//공지사항 댓글 데이터 수정
function setNoticeBrdCommentUpdate(){
    //아이디, 내용, 작성일, 작성자
    let noticeBrdCommentContent = $("#noticeBrdCommentContent").val();
    let date = getTimeStamp(new Date());
    let param = "id=" + noticeBrdCommentListId + "&date=" + date + "&content=" + noticeBrdCommentContent;

    requestData("/knt/user/php/main/noticeBrd/updateNoticeComment.php", param).done(function(result){
        if(result){
            CommentWriteOrUpdate = "write"
            $("#kntNoticeBrdCommentListDomain").css("display", "block");

            getNoticeBrdCommentListCount();//공지사항 댓글 데이터 불러오기
        }
        else{
            alert("수정을 실패하였습니다.");
        }
    });
}

//공지사항 댓글 내용 데이터 불러오기
function getNoticeBrdCommentContent(){
    let param = "id=" + noticeBrdCommentListId;

    requestData("/knt/user/php/main/noticeBrd/getNoticeBrdCommentContent.php", param).done(function(result){
        noticeBrdCommentContent = result['CMT_CONTENT'];//내용 저장

        showNoticeBrdCommentDomain();//댓글 작성 or 수정 공간 + 버튼 보여주기
    });
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

        showNoticeBrdContent();//공지사항 내용 보여주기
    });
}

//공지사항 댓글 총 데이터 수 불러오기
function getNoticeBrdCommentListCount(){
    let param = "id=" + noticeBrdContentListId;

    requestData("/knt/user/php/main/noticeBrd/getNoticeBrdCommentListCount.php",param).done(function(result){
        let noticeBrdCommentListCount = String(result);//공지사항 댓글 총 데이터 수
        DrawPaging(noticeBrdCommentListCount, 10, 1, "kntNoticeBrdCommentPagingArea",  getNoticeBrdComment);
        //페이징 함수 호출 후 getNoticeBrdComment로 현재 페이지를 들고 호출
    });
}

//공지사항 댓글 목록 데이터 불러오기
function getNoticeBrdComment(currentPage){
    let startrow = (currentPage - 1) * 10;
    let param = "id=" + noticeBrdContentListId + "&startrow=" + startrow;

    requestData("/knt/user/php/main/noticeBrd/getNoticeCommentList.php", param).done(function(result){
        noticeBrdCommentList = result;

        showNoticeBrdComment();//공지사항 댓글 리스트 보여주기
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
    let noticeHeaderHtml = "";
    noticeHeaderHtml+="<h3 style=' font-size: 30px; margin-bottom: 0px;margin-top: 30px;'>공지사항</h3>";
    noticeHeaderHtml+="<h4 style='margin-top: 0px;margin-left: 95%;'>총 "+"<a style = 'color:#79021f;'>"+noticeBrdListCount+"</a>"+"건</h4>";

    $("#noticeHeader").empty().append(noticeHeaderHtml);
}

function showNoticeBrdTable(){
    let kntNoticeBrdContentDomainHtml= "";
    
    kntNoticeBrdContentDomainHtml += "<table table class='ui selectable celled table' style = 'text-align:center; border-top: 3px solid #79021f;'>";
    kntNoticeBrdContentDomainHtml +=     "<thead>";
    kntNoticeBrdContentDomainHtml +=         "<tr>";
    kntNoticeBrdContentDomainHtml +=             "<th style='background: #f2f0f06b; color: rgb(56 56 56);'>번호</th>";
    kntNoticeBrdContentDomainHtml +=             "<th style = 'width:50%; background: #f2f0f06b; color: rgb(56 56 56);'>제목</th>";
    kntNoticeBrdContentDomainHtml +=             "<th style='width:14%; background: #f2f0f06b; color: rgb(56 56 56);'>작성자</th>";
    kntNoticeBrdContentDomainHtml +=             "<th style='width:16%; background: #f2f0f06b; color: rgb(56 56 56);'>작성일</th>";
    kntNoticeBrdContentDomainHtml +=             "<th style='width:10%; background: #f2f0f06b; color: rgb(56 56 56);'>조회수</th>";
    kntNoticeBrdContentDomainHtml +=         "</tr>";
    kntNoticeBrdContentDomainHtml +=     "</thead>";
    kntNoticeBrdContentDomainHtml +=     "<tbody id='noticeBrdListTbody'>";
    kntNoticeBrdContentDomainHtml +=     "</tbody>";
    kntNoticeBrdContentDomainHtml += "</table>";
    if(sessionStorage.getItem("loginUser")=='ADMIN'){
        kntNoticeBrdContentDomainHtml += "<div class='ui primary submit labeled icon button' id = 'kntNoticeBrdWriteBtn' style='background-color: #79021f;margin-left: 89%;'>"
        kntNoticeBrdContentDomainHtml += "<i class='icon edit'></i>글쓰기"
        kntNoticeBrdContentDomainHtml += "</div>"
    }
    $("#kntNoticeBrdDomain").empty().append(kntNoticeBrdContentDomainHtml);

    //검색 버튼 클릭 시
    $("#noticeSearchBtn").off("click").on("click", function(){
        let noticeSearchText = $("#noticeSearchText").val();//검색 input text값
        if(!noticeSearchText){
            alert("검색어를 입력하세요.");
        }
        else{
            searchOrAll = "search"
            showNoticeBrd();
        }
    });

    //관리자가 글쓰기 버튼 클릭 시
    $("#kntNoticeBrdWriteBtn").off("click").on("click", function(){
        ContentWriteOrUpdate = "write";

        $("#kntNoticeBrdWrite").css("display", "block");
        $("#kntNoticeBrd").css("display", "none");

        showNoticeBrdWrite();
    });
};

//공지사항 목록 보여주기
function showNoticeBrdList(currentPage) {

    let noticeBrdListTbodyHtml = "";
    let noticeBrdListSize = noticeBrdList.length;
    let noticeBrdStartNum = (currentPage - 1) * 10 + 1; //페이지마다의 첫번째 목록의 번호 

     for(let i = 0; i < noticeBrdListSize; i++) {
        noticeBrdListTbodyHtml += "<tr>";
        noticeBrdListTbodyHtml +=     "<td style='height: 60px;'>" + (i + noticeBrdStartNum) + "</td>";
        noticeBrdListTbodyHtml +=     "<td class = 'kntNoticeBrdTitle' id = 'noticeBrdContentListId" + noticeBrdList[i]['BRD_ID']/* 아이디 중복 대비 */ + "' style='height: 60px;'>" + noticeBrdList[i]["BRD_TITLE"] + "</td>";
        noticeBrdListTbodyHtml +=     "<td style='height: 60px;'>" + noticeBrdList[i]["BRD_WRITER"] + "</td>";
        noticeBrdListTbodyHtml +=     "<td style='height: 60px;'>" + cmpTimeStamp(noticeBrdList[i]["BRD_DATE"]) + "</td>";
        noticeBrdListTbodyHtml +=     "<td style='height: 60px;'>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
        noticeBrdListTbodyHtml += "</tr>";
    }

    $("#noticeBrdListTbody").empty().append(noticeBrdListTbodyHtml);

    //공지사항 목록 중 제목 클릭 시 - 쿠키 존재 확인 > 조회수 증가 > 공지사항 내용 데이터를 불러와야함
    $(".kntNoticeBrdTitle").off("click").on("click", function(){
        noticeBrdContentListId = this.id.substr(22);
        
        setNoticeBrdHit();
    });
}

//공지사항 글 작성or수정 부분 보여주기
function showNoticeBrdWrite(){
    let kntNoticeBrdWriteDomainHtml = "";

    if(ContentWriteOrUpdate == "update"){
        document.getElementById("noticeBrdWriteTitle").value = noticeBrdContent[0]['BRD_TITLE'];
        document.getElementById("noticeBrdWriteContent").value = noticeBrdContent[0]['BRD_CONTENT'];
        kntNoticeBrdWriteDomainHtml += "<button id = 'noticeBrdUpdateBtn'>수정</button>";
        kntNoticeBrdWriteDomainHtml += "<button id = 'noticeBrdUpdateCancleBtn'>취소</button>";
    }
    else{
        document.getElementById("noticeBrdWriteTitle").value = null;
        document.getElementById("noticeBrdWriteContent").value = null;
        kntNoticeBrdWriteDomainHtml += "<button class = 'ui button'id = 'noticeBrdSignUpBtn'>등록</button>";
        kntNoticeBrdWriteDomainHtml += "<button class = 'ui button' id = 'noticeBrdCancleBtn'>취소</button>";
    }

    $("#kntNoticeBrdWriteBtnDomain").empty().append(kntNoticeBrdWriteDomainHtml);
    //등록 버튼 클릭 시
    $("#noticeBrdSignUpBtn").off("click").on("click", function(){
        if(confirm("등록하시겠습니까?")){
            setNoticeBrdContent();
        }
        else{
            alert("취소되었습니다.");
        }
    });
    //등록 취소 버튼 클릭 시
    $("#noticeBrdCancleBtn").off("click").on("click", function(){
        showNoticeBrd();
    });
    //내용 수정 버튼 클릭 시
    $("#noticeBrdUpdateBtn").off("click").on("click", function(){
        setNoticeBrdUpdate();
    });
    //취소 버튼 클릭 시
    $("#noticeBrdUpdateCancleBtn").off("click").on("click", function(){
        getNoticeBrdContent();//공지사항 내용 데이터 불러오기
    });
}

//공지사항 내용 보여주기
function showNoticeBrdContent(){
    let kntNoticeBrdContentDomainHtml = "";
    kntNoticeBrdContentDomainHtml += "<div class='ui segment' style='height: 72.917%'>";
    kntNoticeBrdContentDomainHtml +=    "<p style='font-size: 30px; margin-bottom: 5px;'>" + noticeBrdContent[0]['BRD_TITLE'] + "</p>";
    kntNoticeBrdContentDomainHtml +=    "<p style='height: 5px; color: #979797; font-size: 12px;'>작성자 " + noticeBrdContent[0]['BRD_WRITER'] + "</p>";
    kntNoticeBrdContentDomainHtml +=    "<p style='hegith: 10px; color: #979797; font-size: 12px; word-spacing: 5px;'>" + noticeBrdContent[0]['BRD_DATE'];
    kntNoticeBrdContentDomainHtml +=    " 조회수 " + noticeBrdContent[0]['BRD_HIT']+ "</p>";
    kntNoticeBrdContentDomainHtml +=        "<div class='ui fitted divider'></div>"
    kntNoticeBrdContentDomainHtml +=    "<p style='font-size: 20px; padding-top: 20px; height: 300px'>" +  noticeBrdContent[0]['BRD_CONTENT'] + "</p>";
    kntNoticeBrdContentDomainHtml += "</div>";
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentBackBtn'>목록</button>";

    // kntNoticeBrdContentDomainHtml += "<p>제목 : " + noticeBrdContent[0]['BRD_TITLE'] + "</p>"
    // kntNoticeBrdContentDomainHtml += "<p>작성자 : " + noticeBrdContent[0]['BRD_WRITER'] + "</p>"
    // kntNoticeBrdContentDomainHtml += "<p>작성일 : " + noticeBrdContent[0]['BRD_DATE'] + "</p>"
    // kntNoticeBrdContentDomainHtml += "<p>조회수 : " + noticeBrdContent[0]['BRD_HIT'] + "</p>"
    // kntNoticeBrdContentDomainHtml += "<p>내용 : " + noticeBrdContent[0]['BRD_CONTENT'] + "</p>"
   //kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentBackBtn'>목록</button>";
    if(sessionStorage.getItem("loginUser")=='ADMIN'){
        kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentUpdateBtn'>수정</button>";
        kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentDelBtn'>삭제</button>";
    }
    $("#kntNoticeBrdContentDomain").empty().append(kntNoticeBrdContentDomainHtml);

    getNoticeBrdCommentListCount();//공지사항 댓글 총 데이터 수 불러오기
    
    //목록 버튼 클릭 시(뒤로가기)
    $("#noticeContentBackBtn").off("click").on("click", function(){
        showNoticeBrd();
    });
    //수정 버튼 클릭 시
    $("#noticeContentUpdateBtn").off("click").on("click", function(){
        if(confirm("수정하시겠습니까?")){
            ContentWriteOrUpdate = "update";

            $("#kntNoticeBrdWrite").css("display", "block");
            $("#kntNoticeBrdContent").css("display", "none");
            $("#kntNoticeBrdComment").css("display", "none");
        
            showNoticeBrdWrite();
        }
        
    });
    //삭제 버튼 클릭 시
    $("#noticeContentDelBtn").off("click").on("click", function(){
        if(confirm("삭제하시겠습니까?")){
            setNoticeBrdContentDelete();
        }
    });
}

//댓글 리스트 보여주기 + 댓글 삭제, 수정 버튼 생성
function showNoticeBrdComment(){
    let noticeBrdCommentListHtml = "";
    let noticeBrdCommentListSize = noticeBrdCommentList.length;
    CommentWriteOrUpdate ="write";
    //내용, 작성자, 날짜
    for(let i = 0; i < noticeBrdCommentListSize; i++) {
        noticeBrdCommentListHtml += "<div class = 'commentArea' style = 'position: relative; padding: 12px 23px 10px 0;'>";
        noticeBrdCommentListHtml +=     "<a class='author' style = 'font-weight: 700; color: #404040;'>"+ noticeBrdCommentList[i]['CMT_WRITER']+"</a>";
        noticeBrdCommentListHtml +=     "<p style='margin-bottom: 0px;'>" + noticeBrdCommentList[i]['CMT_CONTENT'] + "</p>";
        noticeBrdCommentListHtml +=     "<div style='margin-top: 7px; font-size: 12px; color: #979797;'>";
        noticeBrdCommentListHtml +=         "<div>"+noticeBrdCommentList[i]['CMT_DATE'];
        if(noticeBrdCommentList[i]['CMT_WRITER']==sessionStorage.getItem("loginUser")){
            noticeBrdCommentListHtml +=             "<a href='#' type='button' class = 'noticeBrdCommentListUpDateBtn' id = 'noticeBrdCommentUpdateId" + noticeBrdCommentList[i]['CMT_ID'] + "' style='padding-left: 10px;'>수정</a>";
            noticeBrdCommentListHtml +=             "<a href='#' type='button' class = 'noticeBrdCommentListDeleteBtn' id = 'noticeBrdCommentDeleteId" + noticeBrdCommentList[i]['CMT_ID'] + "' style='padding-left: 10px;'>삭제</a>";
        }
        noticeBrdCommentListHtml +=         "</div>";
        noticeBrdCommentListHtml +=     "</div>";
        noticeBrdCommentListHtml += "</div>"
    }
    $("#kntNoticeBrdCommentListDomain").empty().append(noticeBrdCommentListHtml);

    showNoticeBrdCommentDomain();
    //댓글 수정 버튼 클릭 시
    $(".noticeBrdCommentListUpDateBtn").off("click").on("click", function(){
        if(confirm("댓글을 수정하시겠습니까?")){
            CommentWriteOrUpdate ="update"
            noticeBrdCommentListId = this.id.substr(24);

            getNoticeBrdCommentContent();//공지사항 댓글 내용 데이터 불러오기
        }
    });
    //댓글 삭제 버튼 클릭 시
    $(".noticeBrdCommentListDeleteBtn").off("click").on("click", function(){
        if(confirm("댓글을 삭제하시겠습니까?")){
            noticeBrdCommentListId = this.id.substr(24);

            setNoticeBrdCommentDelete();
        }
    });
}

//댓글 작성 or 수정 공간 + 버튼 보여주기
function showNoticeBrdCommentDomain(){
    let kntNoticeBrdCommentDomainHtml = "";
//여기 다시
    if(CommentWriteOrUpdate == "update"){
        document.getElementById("noticeBrdCommentContent").value = noticeBrdCommentContent;
        kntNoticeBrdCommentDomainHtml += "<p><button id = 'noticeBrdCommentUpdateBtn'>댓글 수정</button>";
        kntNoticeBrdCommentDomainHtml += "<button id = 'noticeBrdCommentUpdateBackBtn'>뒤로가기</button>";
    }
    else{
        document.getElementById("noticeBrdCommentContent").value = null;
        kntNoticeBrdCommentDomainHtml += "<div class='ui primary submit labeled icon button' id = 'noticeBrdcommentWriteBtn' style = 'background-color: #585c5f;'>"
        kntNoticeBrdCommentDomainHtml += "<i class='icon edit'></i> Add Comment"
        kntNoticeBrdCommentDomainHtml += "</div>"
    }
    $("#kntNoticeBrdCommentBtnDomain").empty().append(kntNoticeBrdCommentDomainHtml);
    //댓글 작성 버튼 클릭 시
    $("#noticeBrdcommentWriteBtn").off("click").on("click", function(){
        let noticeBrdCommentContent = $("#noticeBrdCommentContent").val();//검색 input text값
        if(!noticeBrdCommentContent){
            alert("내용을 입력해주세요.");
        }
        else{
            if(confirm("댓글을 작성하시겠습니까?")){
                setNoticeBrdComment();
            }
        }
    });
    //댓글 수정 버튼 클릭 시(내용 적은 후)
    $("#noticeBrdCommentUpdateBtn").off("click").on("click", function(){
        setNoticeBrdCommentUpdate();//댓글 수정
    });
    //뒤로가기 버튼 클릭 시
    $("#noticeBrdCommentUpdateBackBtn").off("click").on("click", function(){
        getNoticeBrdCommentListCount();//공지사항 댓글 데이터 불러오기
    });
}