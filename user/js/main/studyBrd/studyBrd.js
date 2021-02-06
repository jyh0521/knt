//study a 클릭 시
$("#studyA").off("click").on("click", function(){
    $("#studyA_Content").css("display", "block");
    $("#studyB_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");

    showStudyA_Board();
});
//study b 클릭 시
$("#studyB").off("click").on("click", function(){
    $("#studyB_Content").css("display", "block");
    $("#studyA_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");

    showStudyB_Board();
});
//study c 클릭 시
$("#studyC").off("click").on("click", function(){
    $("#studyC_Content").css("display", "block");
    $("#studyB_Content").css("display", "none");
    $("#studyA_Content").css("display", "none");

    showStudyC_Board();
});

//스터디A 게시물 목록 보여주기
function showStudyA_Board(){
    var ContentHtml = "";
    
    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=         "<th><button id='writeBtn'>글쓰기</button></th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyA_Content").empty().append(ContentHtml);
};

//스터디B 게시물 목록 보여주기
function showStudyB_Board(){
    var ContentHtml = "";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=         "<th><button id='writeBtn'>글쓰기</button></th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyB_Content").empty().append(ContentHtml);
};

//스터디C 게시물 목록 보여주기
function showStudyC_Board(){
    var ContentHtml = "";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=         "<th><button id='writeBtn'>글쓰기</button></th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyC_Content").empty().append(ContentHtml);
};