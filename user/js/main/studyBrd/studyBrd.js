
let studyGroup = ""; //클릭한 스터디 그룹명 저장
let studyEdit = "";

let studyContentList = [];
let studyListId = "";
let studyContentOfWriting = [];
let studyCommentList = [];



//study a 클릭 시
$("#studyaBtn").off("click").on("click", function(){
    $("#studyBoard").css("display", "block");

    studyGroup = "STD_001";
    initStudyGroupABoard();
});
//study b 클릭 시
$("#studybBtn").off("click").on("click", function(){
    $("#studyBoard").css("display", "block");

    studyGroup = "STD_002";
    initStudyGroupBBoard();
});
//study c 클릭 시
$("#studycBtn").off("click").on("click", function(){
    $("#studyBoard").css("display", "block");

    studyGroup = "STD_003";
    initStudyGroupCBoard();
});

//study a 게시물 목록 보여주기
function initStudyGroupABoard(){
    $("#studyTable").css("display", "block");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};
//study b 게시물 목록 보여주기
function initStudyGroupBBoard(){
    $("#studyTable").css("display", "block");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};
//study c 게시물 목록 보여주기
function initStudyGroupCBoard(){
    $("#studyTable").css("display", "block");
    $("#studyContent").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};

//study 게시물 리스트 불러오기
function getStudyList() {
    let param = "brd=" + studyGroup;

    requestData("/knt/user/php/main/studyBrd/studyBrdList.php", param).done(function(result){
        studyContentList = result;

        showStudyTable();
        showStudyList();
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
function getStudyCommentList() {
    let param = "brdId=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/getStudyCommentList.php", param).done(function(result){
        studyCommentList = result;

        showStudyCommentList();
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
    })
}

//study 테이블
function showStudyTable() {
    let studyTableHtml = "";
    
    studyTableHtml += "<table border='1'>";
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
    studyTableHtml += "<button id='studyWriteBtn'>글쓰기</button>";
    
    $("#studyTable").empty().append(studyTableHtml);

    //study 글쓰기 버튼 클릭
    $("#studyWriteBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "none");
        $("#studyContent").css("display", "none");
        $("#studyWriting").css("display", "block");

        studyEdit = "off";
        setStudyContent();
    });
}

//study 게시물 리스트
function showStudyList() {
    let studyContentListHtml = "";
    let studyContentListLength = studyContentList.length;

    for(let i=0; i<studyContentListLength; i++) {
        studyContentListHtml +=   "<tr>";
        studyContentListHtml +=       "<td>" + (i+1) + "</td>";
        studyContentListHtml +=       "<td class='studyTitleBtn' id='studyListId" + studyContentList[i]['BRD_ID'] + "'>" + studyContentList[i]['BRD_TITLE'] + "</td>";
        studyContentListHtml +=       "<td>" + studyContentList[i]['BRD_WRITER'] + "</td>";
        studyContentListHtml +=       "<td>" + studyContentList[i]['BRD_DATE'] + "</td>";
        studyContentListHtml +=       "<td>" + studyContentList[i]['BRD_HIT'] + "</td>";
        studyContentListHtml +=   "</tr>";
    }

    $("#studytbody").empty().append(studyContentListHtml);

    //study 리스트 제목 클릭
    $(".studyTitleBtn").off("click").on("click", function(){
        studyListId = this.id.substr(11);

        $("#studyTable").css("display", "none");
        $("#studyContent").css("display", "block");
        $("#studyWriting").css("display", "none");

        getStudyContentOfWriting();
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
        setStudyContentHtml +=    "<button id='editStudyContentBtn'>수정</button>";
        setStudyContentHtml +=    "<button id='cancelStudyContentBtn'>취소</button>";
        setStudyContentHtml += "</p>";
    }
    else {
        setStudyContentHtml += "<p>";
        setStudyContentHtml +=    "<button id='writeStudyContentBtn'>작성</button>";
        setStudyContentHtml +=    "<button id='cancelStudyContentBtn'>취소</button>";
        setStudyContentHtml += "</p>";
    }
    
    $("#studyWriting").empty().append(setStudyContentHtml);

    //작성 버튼 클릭 시
    $("#writeStudyContentBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyWriting").css("display", "none");
        $("#studyContent").css("display", "none");

        writeStudyContent();
        getStudyList();
    });

    //취소 버튼 클릭 시
    $("#cancelStudyContentBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyWriting").css("display", "none");
        $("#studyContent").css("display", "none");

        getStudyList();
    });

    //수정 버튼 클릭 시
    $("#editStudyContentBtn").off("click").on("click", function(){
        updateStudyContent();

        $("#studyTable").css("display", "none");
        $("#studyWriting").css("display", "none");
        $("#studyContent").css("display", "block");
        
        getStudyContentOfWriting();
    });
}

//study a 선택한 글 보여주기
function showStudyContentOfWriting() {
    let showStudyContentOfWritingHtml = "";

    showStudyContentOfWritingHtml += "<table>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td colspan='2'>제목 " + studyContentOfWriting[0]['BRD_TITLE'] + "</td>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td>작성자 " + studyContentOfWriting[0]['BRD_WRITER'] + "</td>";
    showStudyContentOfWritingHtml +=       "<td>작성일자 " + studyContentOfWriting[0]['BRD_DATE'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td colspan='2'>" + studyContentOfWriting[0]['BRD_CONTENT'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td>조회수 " + studyContentOfWriting[0]['BRD_HIT'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml += "</table>";
    showStudyContentOfWritingHtml += "<p>";
    showStudyContentOfWritingHtml +=   "<button id='showStudyTableBtn'>목록</button>";
    showStudyContentOfWritingHtml +=   "<button id='studyEditBtn'>수정</button>";
    showStudyContentOfWritingHtml +=   "<button id='studyDeleteBtn'>삭제</button>";
    showStudyContentOfWritingHtml += "</p>";

    $("#studyBrdContent").empty().append(showStudyContentOfWritingHtml);

    //댓글 리스트 불러오기
    getStudyCommentList();

    //목록 버튼 클릭 시
    $("#showStudyTableBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyContent").css("display", "none");
        $("#studyWriting").css("display", "none");

        getStudyList();
    });

    //수정 버튼 클릭 시
    $("#studyEditBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "none");
        $("#studyContent").css("display", "none");
        $("#studyWriting").css("display", "block");

        studyEdit = "on";
        setStudyContent();

        $("#writeStudyContentTitle").val(studyContentOfWriting[0]['BRD_TITLE']);
        $("#writeStudyContentText").val(studyContentOfWriting[0]['BRD_CONTENT']);
    });

    //삭제 버튼 클릭 시
    $("#studyDeleteBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyContent").css("display", "none");
        $("#studyWriting").css("display", "none");

        deleteStudyContent();
        getStudyList();
    });
}

//댓글 리스트 보여주기
function showStudyCommentList() {
    let showStudyCommentListHtml = "";
    let showStudyCommentListLength = studyCommentList.length;

    for(let i=0; i<showStudyCommentListLength; i++) {
        showStudyCommentListHtml += "<table>";
        showStudyCommentListHtml +=     "<tr>";
        showStudyCommentListHtml +=         "<td>작성자 " + studyCommentList[i]['CMT_WRITER'] + "</td>";
        showStudyCommentListHtml +=         "<td>작성일자 " + studyCommentList[i]['CMT_DATE'] + "</td>";
        showStudyCommentListHtml +=     "</tr>";
        showStudyCommentListHtml +=     "<tr>";
        showStudyCommentListHtml +=         "<td colspan='2'>" + studyCommentList[i]['CMT_CONTENT'] + "</td>";
        showStudyCommentListHtml +=     "</tr>";
        showStudyCommentListHtml += "</table>";
        showStudyCommentListHtml += "<button id='studyCommentEditBtn'>수정</button>";
        showStudyCommentListHtml += "<button id='studyCommentDeleteBtn'>삭제</button>";
    }

    $("#studyBrdComment").empty().append(showStudyCommentListHtml);

    //댓글 작성
    setStudyComment();
}

//댓글 작성
function setStudyComment() {
    let setStudyCommentHtml = "";

    setStudyCommentHtml += "<p>";
    setStudyCommentHtml +=     "<label for='writeStudyComment'>댓글</label>";
    setStudyCommentHtml +=     "<textarea id='writeStudyComment' cols='30' rows='2'></textarea>";
    setStudyCommentHtml +=     "<button id='writeStudyCommentBtn'>작성</button>";
    setStudyCommentHtml += "</p>";

    $("#studyBrdWriteComment").empty().append(setStudyCommentHtml);

    //댓글 작성 버튼 클릭 시
    $("#writeStudyCommentBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "none");
        $("#studyWriting").css("display", "none");
        $("#studyContent").css("display", "block");

        writeStudyComment();
        getStudyCommentList();
    });
}