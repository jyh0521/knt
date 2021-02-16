
let studyGroup = ""; //클릭한 스터디 그룹명 저장

let studyList = [];
let studyListId = "";
let studyContentOfWriting = [];



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
    $("#studyContentOfWriting").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};
//study b 게시물 목록 보여주기
function initStudyGroupBBoard(){
    $("#studyTable").css("display", "block");
    $("#studyContentOfWriting").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};
//study c 게시물 목록 보여주기
function initStudyGroupCBoard(){
    $("#studyTable").css("display", "block");
    $("#studyContentOfWriting").css("display", "none");
    $("#studyWriting").css("display", "none");

    getStudyList();
};

//study 게시물 리스트 불러오기
function getStudyList() {
    let param = "brd=" + studyGroup;

    requestData("/knt/user/php/main/studyBrd/studyBrdList.php", param).done(function(result){
        studyList = result;

        showStudyTable();
        showStudyList();
    });
}

//study 작성된 글 저장
function writeStudyContent() {
    let title = $("#writeStudyContentTitle").val();
    let content = $("#writeStudyContentText").val();
    let date = getTimeStamp(new Date());

    let param = "brd=" + studyGroup + "&id=" + "ADMIN" + "&title=" + title + "&content=" + content + "&date=" + date;

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

//수정 내용 저장
function updateStudyContent() {
    let title = $("#writeStudyContentTitle").val();
    let content = $("#writeStudyContetntText").val();
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
        $("#studyContentOfWriting").css("display", "none");
        $("#studyWriting").css("display", "block");

        setStudyContent();
    });
}

//study 게시물 리스트
function showStudyList() {
    let studyListHtml = "";
    let studyListLength = studyList.length;

    for(let i=0; i<studyListLength; i++) {
        studyListHtml +=   "<tr>";
        studyListHtml +=       "<td>" + (i+1) + "</td>";
        studyListHtml +=       "<td class='studyTitleBtn' id='studyListId" + studyList[i]['BRD_ID'] + "'>" + studyList[i]['BRD_TITLE'] + "</td>";
        studyListHtml +=       "<td>" + studyList[i]['BRD_WRITER'] + "</td>";
        studyListHtml +=       "<td>" + studyList[i]['BRD_DATE'] + "</td>";
        studyListHtml +=       "<td>" + studyList[i]['BRD_HIT'] + "</td>";
        studyListHtml +=   "</tr>";
    }

    $("#studytbody").empty().append(studyListHtml);

    //study 리스트 제목 클릭
    $(".studyTitleBtn").off("click").on("click", function(){
        studyListId = this.id.substr(11);

        $("#studyTable").css("display", "none");
        $("#studyContentOfWriting").css("display", "block");
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
    setStudyContentHtml += "<p>";
    setStudyContentHtml +=    "<button id='writeStudyContentBtn'>작성</button>";
    setStudyContentHtml +=    "<button id='cancelStudyContentBtn'>취소</button>";
    setStudyContentHtml += "</p>";

    $("#studyWriting").empty().append(setStudyContentHtml);

    //작성 버튼 클릭 시
    $("#writeStudyContentBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyWriting").css("display", "none");
        $("#studyContentOfWriting").css("display", "none");

        writeStudyContent();
    });

    //취소 버튼 클릭 시
    $("#cancelStudyContentBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyWriting").css("display", "none");
        $("#studyContentOfWriting").css("display", "none");
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

    $("#studyContentOfWriting").empty().append(showStudyContentOfWritingHtml);

    //목록 버튼 클릭 시
    $("#showStudyTableBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyContentOfWriting").css("display", "none");
        $("#studyWriting").css("display", "none");
    });

    //수정 버튼 클릭 시
    $("#studyEditBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "none");
        $("studyContentOfWriting").css("display", "block");
        $("#studyWriting").css("display", "none");

        updateStudyContent();
    });

    //삭제 버튼 클릭 시
    $("#studyDeleteBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyContentOfWriting").css("display", "none");
        $("#studyWriting").css("display", "none");

        deleteStudyContent();
        getStudyList();
    });
}