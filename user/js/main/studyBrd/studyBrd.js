//study a 클릭 시
$("#studyaBtn").off("click").on("click", function(){
    $("#studyABoard").css("display", "block");
    $("#studyBBoard").css("display", "none");
    $("#studyCBoard").css("display", "none");

    initStudyGroupABoard();
});
//study b 클릭 시
$("#studybBtn").off("click").on("click", function(){
    $("#studyBBoard").css("display", "block");
    $("#studyABoard").css("display", "none");
    $("#studyCBoard").css("display", "none");

    initStudyGroupBBoard();
});
//study c 클릭 시
$("#studycBtn").off("click").on("click", function(){
    $("#studyCBoard").css("display", "block");
    $("#studyBBoard").css("display", "none");
    $("#studyABoard").css("display", "none");

    initStudyGroupCBoard();
});

//스터디A 게시물 목록 보여주기
function initStudyGroupABoard(){
    $("#studyATable").css("display", "block");
    $("#studyAContentOfWriting").css("display", "none");
    $("#studyAWriting").css("display", "none");

    getStudyList();
};
//study b 게시물 목록 보여주기
function initStudyGroupBBoard(){
    $("#studyBTable").css("display", "block");
    $("#studyBContentOfWriting").css("display", "none");
    $("#studyBWriting").css("display", "none");

    getStudyList();
};
//study c 게시물 목록 보여주기
function initStudyGroupCBoard(){
    $("#studyCTable").css("display", "block");
    $("#studyCContentOfWriting").css("display", "none");
    $("#studyCWriting").css("display", "none");

    getStudyList();
};


let studyList = [];
let studyListId = "";
let studyContentOfWriting = [];

//study 게시물 불러오기
function getStudyAList() {
    requestData("/knt/user/php/main/studyBrd/studyBrdList.php").done(function(result){
        studyList = result;

        showStudyTable();
        showStudyList();
    });
}

//study 작성된 글 저장
function writeStudyContent() {
    let title = $("#writeStudyContentTitle").val();
    let content = $("#writeStudyContentText").val();

    let param = "title=" + title + "&content=" + content

    requestData("/knt/user/php/main/studyBrd/writeStudyContent.php", param).done(function(result){
        if(result === true) {
            alert("작성되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//study a 리스트 제목 클릭 시 해당 내용 불러오기
function getStudyContentOfWriting() {
    let param = "id=" + studyListId;

    requestData("/knt/user/php/main/studyBrd/getStudyContent.php", param).done(function(result){
        studyContentOfWriting = result;

        showStudyContentOfWriting();
    });
}

//study a 테이블
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

    //study a 글쓰기 버튼 클릭
    $("#studyWriteBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "none");
        $("#studyContentOfWriting").css("display", "none");
        $("#studyWriting").css("display", "block");

        setStudyContent();
    });
}

//study a 게시물 리스트
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
    setStudyContentHtml +=   "<textarea id='writeStudyContentText' cols='55' rows='12'></textarea>";
    setStudyContentHtml += "</p>";
    setStudyContentHtml += "<p>";
    setStudyContentHtml +=    "<button id='writeStudyContentBtn'>작성</button>";
    setStudyContentHtml +=    "<button id='cancelStudyContentBtn'>취소</button>";
    setStudyContentHtml += "</p>";

    $("#studyWriting").empty().append(setStudyContentHtml);

    //작성 버튼 클릭 시
    $("#writeStudyContentBtn").off("click").on("click", function(){
        writeStudyAContent();

        $("#studyTable").css("display", "block");
        $("#studyWriting").css("display", "none");
        $("#studyContentOfWriting").css("display", "none");
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
    showStudyContentOfWritingHtml +=       "<td colspan='2'>제목 " + studyContentOfWriting['BRD_TITLE'] + "</td>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td>작성자 " + studyContentOfWriting['BRD_WRITER'] + "</td>";
    showStudyContentOfWritingHtml +=       "<td>작성일자 " + studyContentOfWriting['BRD_DATE'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td colspan='2'>" + studyContentOfWriting['BRD_CONTENT'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml +=   "<tr>";
    showStudyContentOfWritingHtml +=       "<td>조회수 " + studyContentOfWriting['BRD_HIT'] + "</td>";
    showStudyContentOfWritingHtml +=   "</tr>";
    showStudyContentOfWritingHtml += "</table>";
    showStudyContentOfWritingHtml += "<p>";
    showStudyContentOfWritingHtml +=   "<button id='showStudyAableBtn'>목록</button>";
    showStudyContentOfWritingHtml +=   "<button id='studyEditBtn'>수정</button>";
    showStudyContentOfWritingHtml +=   "<button id='studyDeleteBtn'>삭제</button>";
    showStudyContentOfWritingHtml += "</p>";

    $("#studyContentOfWriting").empty().append(showStudyContentOfWritingHtml);

    //목록 버튼 클릭 시
    $("#showStudyTableBtn").off("click").on("click", function(){
        $("#studyTable").css("display", "block");
        $("#studyContentOfWriting").css("display", "none");
        $("#studyWriting").css("display", "none");
    })

    //수정 버튼 클릭 시
    $("#studyEditBtn").off("click").on("click", function(){
        $("#study")
    })
}