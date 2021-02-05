
//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#kntNotice").css("display", "block");
    $("#kntNoticeWrite").css("display", "none");
    $("#kntInfoShare").css("display", "none");
    $("#kntStudy").css("display", "none");

    showBtn();
    showNotice();
});

//학술국 정보공유 클릭 시 
$("#infoShareBtn").off("click").on("click", function(){
    infoShareInit();
});

//관리자가 공지사항 글쓰기 버튼 클릭 시 
$("#writeNoticeBtn").off("click").on("click", function(){
    $("#kntNotice").css("display", "none");
    $("#kntNoticeWrite").css("display", "block");

    writeNotice();
});

//공지사항 등록 버튼 클릭 시
$("#signUpNoticeBtn").off("click").on("click", function(){
    setNoticeList();
});

//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function(){
    $("#kntStudy").css("display", "block");
    $("#kntInfoShare").css("display", "none");
    $("#kntNotice").css("display", "none");
    $("#kntNoticeWrite").css("display", "none");

});//그룹 리스트 보여주기

//study a 클릭 시
$("#studyA").on("click", function(){
    $("#studyA_Content").css("display", "block");
    $("#studyB_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");

    showStudyA_Board();
});
//study b 클릭 시
$("#studyB").on("click", function(){
    $("#studyB_Content").css("display", "block");
    $("#studyA_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");

    showStudyB_Board();
});
//study c 클릭 시
$("#studyC").on("click", function(){
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
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#studyA_Content").empty().append(ContentHtml);
};

//스터디B 게시물 목록 보여주기
function showStudyB_Board(){
    var contentHtml = "";

    contentHtml += "<table>";
    contentHtml +=     "<thead>";
    contentHtml +=         "<th>제목</th>";
    contentHtml +=         "<th>작성자</th>";
    contentHtml +=         "<th>작성일</th>";
    contentHtml +=         "<th>조회</th>";
    contentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    contentHtml += "</table>";
    contentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#studyB_Content").empty().append(contentHtml);
};

//스터디C 게시물 목록 보여주기
function showStudyC_Board(){
    var contentHtml = "";

    contentHtml += "<table>";
    contentHtml +=     "<thead>";
    contentHtml +=         "<th>제목</th>";
    contentHtml +=         "<th>작성자</th>";
    contentHtml +=         "<th>작성일</th>";
    contentHtml +=         "<th>조회</th>";
    contentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    contentHtml += "</table>";
    contentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#studyC_Content").empty().append(contentHtml);
};