
let studyGroup = ""; //클릭한 스터디 그룹명 저장
let studyEdit = ""; //게시물 수정 여부
let studyCmtEdit = ""; //댓글 수정 여부
let studyBrdCnt = ""; //게시물 수
let studyCommentListCnt = ""; //댓글 수

let studyContentList = [];
let studyListId = "";
let studyContentOfWriting = [];
let studyCommentList = [];
let studyCommentListId = "";
let studyComment = [];


//study 게시물 목록 보여주기
function initStudyGroupBoard(studyGroup) {
    $("#studyBoard").css("display", "block");
    $("#studyTable").css("display", "block");
    $("#studyBrdListPaging").css("display", "block");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyBrdCnt(studyGroup);
}

//study 헤더 보여주기
function initStudyBoardTableHeader() {
    $("#studyBoardHeader").css("display", "block");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//게시물 조회수
function setStudyBrdHit() {
    if(getCookie("studyBrdHitCookie" + studyListId + "ADMIN") == null) {
        setCookie("studyBrdHitCookie" + studyListId + "ADMIN", "true", 1)

        let param = "brdId=" + studyListId;

        requestData("/knt/user/php/main/studyBrd/setStudyBrdHit.php", param).done(function(result){
            if(result) {
                getStudyContentOfWriting();
            }
        });
    }
    else {
        getStudyContentOfWriting();
    }
}

//study 게시물 리스트 불러오기
function getStudyList(currentPage) {
    let param = "brd=" + studyGroup + "&currentPage=" + currentPage + "&dataPerPage=" + 10;

    requestData("/knt/user/php/main/studyBrd/studyBrdList.php", param).done(function(result){
        studyContentList = result;

        showStudyTableHeader();
        showStudyTable();
        showStudyList(currentPage);
    });
}

//study 작성된 글 수
function getStudyBrdCnt(studyGroup){
    let param = "brd=" + studyGroup;

    requestData("/knt/user/php/main/studyBrd/getStudyBrdCount.php", param).done(function(result){
       studyBrdCnt = result; 

       DrawPaging(studyBrdCnt, 10, 1, "studyBrdListPaging", getStudyList);
    });
}

//study 작성된 글 저장
function writeStudyContent() {
    let title = $("#writeStudyContentTitle").val();
    let content = $("#writeStudyContentText").val();
    let date = getTimeStamp(new Date());

    let param = "brd=" + studyGroup + "&writer=" + "ADMIN" + "&title=" + title + "&content=" + content + "&date=" + date;

    requestData("/knt/user/php/main/studyBrd/writeStudyContent.php", param).done(function(result){
        if(result === true) {
            alert("작성되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//study 리스트 제목 클릭 시 해당 내용 불러오기
function getStudyContentOfWriting() {
    let param = "brdId=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/getStudyContent.php", param).done(function(result){
        studyContentOfWriting = result;

        showStudyContentOfWriting();
    });
}

//제목 클릭 후 삭제 버튼 클릭 시
function deleteStudyContent() {
    let param = "brdId=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/deleteStudyContent.php", param).done(function(result){
       if(result === true) {
           alert("삭제되었습니다.");
       }
       else {
           alert("오류");
       }
    });
}

//게시물 수정 내용 저장
function updateStudyContent() {
    let title = $("#writeStudyContentTitle").val();
    let content = $("#writeStudyContentText").val();
    let date = getTimeStamp(new Date());
    
    let param = "brdId=" + studyListId + "&title=" + title + "&content=" + content + "&date=" + date;

    requestData("/knt/user/php/main/studyBrd/updateStudyContent.php", param).done(function(result){
        if(result === true) {
            alert("수정되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//댓글 리스트 불러오기
function getStudyCommentList(currentPage) {
    let param = "brdId=" + studyListId + "&currentPage=" + currentPage + "&dataPerPage=" + 5;

    requestData("/knt/user/php/main/studyBrd/getStudyCommentList.php", param).done(function(result){
        studyCommentList = result;

        showStudyCommentList();
    });
}

//작성된 댓글 수
function getStudyCommentListCnt() {
    let param = "brdId=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/getStudyCommentListCount.php", param).done(function(result){
        studyCommentListCnt = result;

        DrawPaging(studyCommentListCnt, 5, 1, "studyBrdCommentPaging", getStudyCommentList);
    });
}

//게시물 삭제 시 댓글 삭제
function deleteStudyCommentList() {
    let param = "brdId=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/deleteStudyCommentList.php", param).done(function(result){
        if(result) {
            getStudyList();
        }
        else {
            alert("오류");
        }
    });
}

//댓글 작성
function writeStudyComment() {
    let comment = $("#writeStudyComment").val();
    let date = getTimeStamp(new Date());
    let param = "brdId=" + studyListId + "&comment=" + comment + "&date=" + date + "&writer=" + "ADMIN";

    requestData("/knt/user/php/main/studyBrd/writeStudyComment.php", param).done(function(result){
        if(result === true) {
            alert("댓글이 작성되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//댓글 내용 불러오기
function getStudyComment() {
    let param = "cmtId=" + studyCommentListId;

    requestData("/knt/user/php/main/studyBrd/getStudyComment.php", param).done(function(result){
        studyComment = result;

        setStudyComment();
        $("#writeStudyComment").val(studyComment['CMT_CONTENT']);
    });
}

//댓글 삭제
function deleteStudyComment() {
    let param = "cmtId=" + studyCommentListId;

    requestData("/knt/user/php/main/studyBrd/deleteStudyComment.php", param).done(function(result){
        if(result === true) {
            alert("댓글이 삭제되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//댓글 수정내용 저장
function updateStudyComment() {
    let comment = $("#writeStudyComment").val();
    let date = getTimeStamp(new Date());

    let param = "cmtId=" + studyCommentListId + "&comment=" + comment + "&date=" + date;

    requestData("/knt/user/php/main/studyBrd/updateStudyComment.php", param).done(function(result){
        if(result === true) {
            alert("댓글이 수정되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//study 헤더 추가
function showStudyTableHeader() {
    let studyHeaderHtml = "";

    studyHeaderHtml += "<h3 style='font-size: 250%; margin-bottom: 0.1%;margin-top: 3%;'>STUDY</h3>";
    studyHeaderHtml += "<h4 style='margin-top: 0.1%; margin-left: 95%;'>총 " + "<a style = 'color:#79021f;'>" + studyBrdCnt + "</a>" + "건</h4>";

    $("#studyBoardHeader").empty().append(studyHeaderHtml);
}

//study 테이블
function showStudyTable() {
    let studyTableHtml = "";
    
    studyTableHtml += "<table class='ui selectable celled table' style = 'text-align:center; border-top: 3px solid #79021f;'>";
    studyTableHtml +=     "<thead>";
    studyTableHtml +=         "<tr>";
    studyTableHtml +=            "<th>번호</th>";
    studyTableHtml +=            "<th>제목</th>";
    studyTableHtml +=            "<th>작성자</th>";
    studyTableHtml +=            "<th>작성일</th>";
    studyTableHtml +=            "<th>조회수</th>";
    studyTableHtml +=         "</tr>";
    studyTableHtml +=     "</thead>";
    studyTableHtml +=     "<tbody id='studytbody'>";
    studyTableHtml +=     "</tbody>";
    studyTableHtml += "</table>";
    studyTableHtml += "<button id='studyWriteBtn' class='ui primary submit labeled icon button' style='background-color: #79021f;margin-left: 89%;'><i class='icon edit'></i>글쓰기</button>";
    
    $("#studyBoardTable").empty().append(studyTableHtml);

    //study 글쓰기 버튼 클릭
    $("#studyWriteBtn").off("click").on("click", function(){
        initStudyWriting();
        $("#studyBrdListPaging").css("display", "none");

        studyEdit = "off";
        setStudyContent();
    });
}

//study 게시물 리스트
function showStudyList(currentPage) {
    let studyContentListHtml = "";
    let studyContentListLength = studyContentList.length;
    let startBrdId = (currentPage - 1) * 10 + 1;

    for(let i=0; i<studyContentListLength; i++) {
        studyContentListHtml +=   "<tr class='studyListTitle' id='studyListId" + studyContentList[i]['BRD_ID'] + "' style='cursor: pointer;'>";
        studyContentListHtml +=       "<td class='studyTitleBtn'>" + (i+startBrdId) + "</td>";
        studyContentListHtml +=       "<td class='studyTitleBtn'>" + studyContentList[i]['BRD_TITLE'] + "</td>";
        studyContentListHtml +=       "<td class='studyTitleBtn'>" + studyContentList[i]['BRD_WRITER'] + "</td>";
        studyContentListHtml +=       "<td class='studyTitleBtn'>" + cmpTimeStamp(studyContentList[i]['BRD_DATE']) + "</td>";
        studyContentListHtml +=       "<td class='studyTitleBtn'>" + studyContentList[i]['BRD_HIT'] + "</td>";
        studyContentListHtml +=   "</tr>";
    }

    $("#studytbody").empty().append(studyContentListHtml);

    //study 리스트 제목 클릭
    $(".studyListTitle").off("click").on("click", function(){
        studyListId = this.id.substr(11);

        initStudyContent();
        $("#studyBrdListPaging").css("display", "none");

        setStudyBrdHit();
    });
}

//study 글쓰기 
function setStudyContent() {
    let setStudyContentHtml = "";

    setStudyContentHtml += "<p>";
    setStudyContentHtml +=   "<label for='wirteStudyContentTitle'>제목</label>";
    setStudyContentHtml +=   "<input id='writeStudyContentTitle'>";
    setStudyContentHtml += "</p>";
    setStudyContentHtml += "<p>";
    setStudyContentHtml +=   "<label for='wirteStudyContentText'>내용</label>";
    setStudyContentHtml +=   "<textarea id='writeStudyContentText' cols='50' rows='10'></textarea>";
    setStudyContentHtml += "</p>";
    
    if(studyEdit === "on") {
        setStudyContentHtml += "<p>";
        setStudyContentHtml +=    "<button id='editStudyContentBtn' class='mini ui button'>수정</button>";
        setStudyContentHtml +=    "<button id='cancelEditStudyContentBtn' class='mini ui button'>취소</button>";
        setStudyContentHtml += "</p>";
    }
    else {
        setStudyContentHtml += "<p>";
        setStudyContentHtml +=    "<button id='writeStudyContentBtn' class='mini ui button'>작성</button>";
        setStudyContentHtml +=    "<button id='cancelWriteStudyContentBtn' class='mini ui button'>취소</button>";
        setStudyContentHtml += "</p>";
    }
    
    $("#studyWriting").empty().append(setStudyContentHtml);

    //작성 버튼 클릭 시
    $("#writeStudyContentBtn").off("click").on("click", function(){
        if(confirm("작성하시겠습니까?")) {
            initStudyGroupBoard(studyGroup);
            writeStudyContent();
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //글쓰기 취소 버튼 클릭 시
    $("#cancelWriteStudyContentBtn").off("click").on("click", function(){
        if(confirm("작성을 취소하시겠습니까?")) {
            initStudyGroupBoard(studyGroup);
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //수정 완료 버튼 클릭 시
    $("#editStudyContentBtn").off("click").on("click", function(){
        if(confirm("작성하시겠습니까?")) {
            updateStudyContent();
            initStudyContent();        
            getStudyContentOfWriting();
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //수정 취소 버튼 클릭 시
    $("#cancelEditStudyContentBtn").off("click").on("click", function(){
        initStudyContent();
        showStudyContentOfWriting();
    });
}

//study 선택한 글 보여주기
function showStudyContentOfWriting() {
    let showStudyContentOfWritingHtml = "";

    showStudyContentOfWritingHtml += "<div class='ui segment' style='height: 70%'>";
    showStudyContentOfWritingHtml +=    "<p style='font-size: 270%; margin-bottom: 0.5%;'>" + studyContentOfWriting[0]['BRD_TITLE'] + "</p>";
    showStudyContentOfWritingHtml +=    "<p style='height: 0; color: #979797; font-size: 95%;'>작성자 " + studyContentOfWriting[0]['BRD_WRITER'] + "</p>";
    showStudyContentOfWritingHtml +=    "<p style='color: #979797; font-size: 95%; padding-top: 5px; word-spacing: 5px;'>" + studyContentOfWriting[0]['BRD_DATE'];
    showStudyContentOfWritingHtml +=    " 조회수 " + studyContentOfWriting[0]['BRD_HIT'] + "</p>";
    showStudyContentOfWritingHtml +=        "<div class='ui fitted divider'></div>"
    showStudyContentOfWritingHtml +=    "<p style='font-size: 150%; padding-top: 1.5%; height: 500px'>" + studyContentOfWriting[0]['BRD_CONTENT'] + "</p>";
    showStudyContentOfWritingHtml += "</div>";
    showStudyContentOfWritingHtml += "<p>";
    showStudyContentOfWritingHtml +=   "<button id='studyEditBtn' class='mini ui button'>수정</button>";
    showStudyContentOfWritingHtml +=   "<button id='studyDeleteBtn' class='mini ui button'>삭제</button>";
    showStudyContentOfWritingHtml += "</p>";

    $("#studyBrdContent").empty().append(showStudyContentOfWritingHtml);

    //댓글 리스트 불러오기
    getStudyCommentListCnt();

    //목록 버튼 클릭 시
    $("#showStudyTableBtn").off("click").on("click", function(){
        initStudyGroupBoard(studyGroup);
    });

    //수정 버튼 클릭 시
    $("#studyEditBtn").off("click").on("click", function(){
        if(confirm("수정하시겠습니까?")) {
            initStudyWriting();
            studyEdit = "on";
            setStudyContent();

            $("#writeStudyContentTitle").val(studyContentOfWriting[0]['BRD_TITLE']);
            $("#writeStudyContentText").val(studyContentOfWriting[0]['BRD_CONTENT']);
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //삭제 버튼 클릭 시
    $("#studyDeleteBtn").off("click").on("click", function(){
        if(confirm("삭제하시겠습니까?")) {
            initStudyTable();
            deleteStudyContent();
            deleteStudyCommentList();
        }
        else {
            alert("취소되었습니다.");
        }
    });
}

//댓글 리스트 보여주기
function showStudyCommentList() {
    let showStudyCommentListHtml = "";
    let showStudyCommentListLength = studyCommentList.length;

    showStudyCommentListHtml += "<p>";
    showStudyCommentListHtml +=     "<h3 class='ui dividing header'>";
    showStudyCommentListHtml +=     "<i class='comments icon' style='color: #79021f;'></i>";
    showStudyCommentListHtml +=     " 댓글  " + studyCommentListCnt + "</h3>";
    showStudyCommentListHtml += "</p>";
    for(let i=0; i<showStudyCommentListLength; i++) {
        showStudyCommentListHtml += "<div class = 'commentArea' style = 'position: relative; padding: 1% 2% 1% 0;'>";
        showStudyCommentListHtml +=      "<a class='author' style = 'font-weight: 700; color: #404040;'>"+ studyCommentList[i]['CMT_WRITER']+"</a>";
        showStudyCommentListHtml +=      "<p style='margin-bottom: 0%;'>" + studyCommentList[i]['CMT_CONTENT'] + "</p>";
        showStudyCommentListHtml +=      "<div style='margin-top: 0.5%; font-size: 87%; color: #979797;'>";
        showStudyCommentListHtml +=         "<div>"+ studyCommentList[i]['CMT_DATE'];
        showStudyCommentListHtml +=             "<a href='#' type='button' class = 'studyCommentEditBtn' id = 'studyCommentEdit" + studyCommentList[i]['CMT_ID'] + "' style='padding-left: 1%;'>수정</a>";
        showStudyCommentListHtml +=             "<a href='#' type='button' class = 'studyCommentDeleteBtn' id = 'studyCommentDelete" + studyCommentList[i]['CMT_ID'] + "' style='padding-left: 1%;'>삭제</a>";
        showStudyCommentListHtml +=         "</div>"
        showStudyCommentListHtml +=      "</div>"
        showStudyCommentListHtml += "</div>"
    }

    $("#studyBrdComment").empty().append(showStudyCommentListHtml);

    //댓글 작성
    setStudyComment();

    //댓글 수정버튼 클릭 시
    $(".studyCommentEditBtn").off("click").on("click", function(){
        if(confirm("댓글을 수정하시겠습니까?")) {
            studyCommentListId = this.id.substr(16);

            studyCmtEdit = "on";
            getStudyComment();
        }
        else {
            alert("취소되었습니다");
        }
    });

    //댓글 삭제버튼 클릭 시
    $(".studyCommentDeleteBtn").off("click").on("click", function(){
        if(confirm("댓글을 삭제하시겠습니까?")) {
            studyCommentListId = this.id.substr(18);

            deleteStudyComment();
            getStudyCommentListCnt();
        }
        else {
            alert("취소되었습니다");
        }
    });
}

//댓글 작성
function setStudyComment() {
    let setStudyCommentHtml = "";

    setStudyCommentHtml += "<div  class='ui input' style='width: 99%; height: 130px; padding-top: 1%; padding-bottom: 1%;'>";
    setStudyCommentHtml +=     "<input type='text' id = 'writeStudyComment' placeholder='댓글을 작성하세요.'>";
    setStudyCommentHtml += "</div>";
    
    if(studyCmtEdit === "on") {
        setStudyCommentHtml +=     "<button id='editStudyCommentBtn' class='mini ui button'>수정</button>";
        setStudyCommentHtml +=     "<button id='cancelStudyCommentBtn' class='mini ui button'>취소</button>";
    }
    else {
        setStudyCommentHtml +=     "<div class='ui primary submit labeled icon button' id = 'writeStudyCommentBtn' style = 'background-color: #585c5f;'>";
        setStudyCommentHtml +=     "<i class='icon edit'></i> Add Comment"
        setStudyCommentHtml +=     "</div>";
    }
    
    $("#studyBrdWriteComment").empty().append(setStudyCommentHtml);

    //댓글 작성 버튼 클릭 시
    $("#writeStudyCommentBtn").off("click").on("click", function(){
        if(confirm("댓글을 작성하시겠습니까?")) {
            studyCmtEdit = "off";

            writeStudyComment();
            getStudyCommentListCnt();
            getStudyContentOfWriting();
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //수정 완료 버튼 클릭 시
    $("#editStudyCommentBtn").off("click").on("click", function(){
        if(confirm("댓글을 수정하시겠습니까?")) {
            studyCmtEdit = "off";

            updateStudyComment();
            getStudyCommentListCnt();
            getStudyContentOfWriting();
        }
        else {
            alert("취소되었습니다.");
        }
    });

    //댓글 수정 취소 버튼 클릭 시
    $("#cancelStudyCommentBtn").off("click").on("click", function(){
        studyCmtEdit = "off";

        getStudyCommentListCnt();
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//css
function initStudyWriting() {
    $("#studyTable").css("display", "none");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "block");
}

function initStudyContent() {
    $("#studyTable").css("display", "none");
    $("#studyWriting").css("display", "none");
    $("#studyContent").css("display", "block");
}

function initStudyTable() {
    $("#studyTable").css("display", "block");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "none");
}