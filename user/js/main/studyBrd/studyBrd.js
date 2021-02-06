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

    getStudyAList();
};
//study b 게시물 목록 보여주기
function initStudyGroupBBoard(){
    $("#studyBTable").css("display", "block");
    $("#studyBContentOfWriting").css("display", "none");
    $("#studyBWriting").css("display", "none");

    getStudyBList();
};
//study c 게시물 목록 보여주기
function initStudyGroupCBoard(){
    $("#studyCTable").css("display", "block");
    $("#studyCContentOfWriting").css("display", "none");
    $("#studyCWriting").css("display", "none");

    getStudyCList();
};
/*
//스터디B 게시물 목록 보여주기
function showStudybBoard(){
    var ContentHtml = "";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=         "<th><button id='writeBtn'>글쓰기</button></th>";
    ContentHtml +=     "</thead>";
    // 나중에 db에서 받아오기
    ContentHtml += "</table>";
    
    $("#studybContent").empty().append(ContentHtml);
};

//스터디C 게시물 목록 보여주기
function showStudycBoard(){
    var ContentHtml = "";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=         "<th><button id='writeBtn'>글쓰기</button></th>";
    ContentHtml +=     "</thead>";
    // 나중에 db에서 받아오기
    ContentHtml += "</table>";
    
    $("#studycContent").empty().append(ContentHtml);
};*/

//study a 게시물 불러오기
function getStudyAList() {
    
}

//study a 테이블
function showStudyATable() {
    var ContentHtml = "";
    
    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=     "</thead>";
    // 나중에 db에서 받아오기
    ContentHtml +=     "<tbody>"
    ContentHtml +=     "</tbody>"
    ContentHtml += "</table>";
    ContentHtml += "<button id='writeBtn'>작성하기</button>";
    
    $("#studyATable").empty().append(ContentHtml);
}

//study a 게시물 리스트
function showStudyAList() {
    
}