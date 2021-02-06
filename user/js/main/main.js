//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#menuFuncDiv").load("noticeBrd/noticeBrd.html");
    $("#kntNotice").css("display", "block");
    $("#kntNoticeWrite").css("display", "none");
    $("#infoShare").css("display", "none");
    $("#studyGroup").css("display", "none");
    $("#studyA_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");
    $("#studyC_Content").css("display", "none");

    showBtn();
    getNoticeList();
});

//학술국 정보공유 클릭 시 
$("#infoShareBtn").off("click").on("click", function(){
    $("#menuFuncDiv").load("infoShareBrd/infoShareBrd.html");
  
    initInfoShare();
});

//관리자가 공지사항 글쓰기 버튼 클릭 시 
$("#writeNoticeBtn").off("click").on("click", function(){
    $("#kntNotice").css("display", "none");
    $("#kntNoticeWrite").css("display", "block");

    writeNotice();
});

//공지사항 등록 버튼 클릭 시
$("#signUpNoticeBtn").off("click").on("click", function(){
    setNoticeContent();
});

//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function(){
    $("#studyGroup").css("display", "block");
    $("#infoShare").css("display", "none");
    $("#kntNotice").css("display", "none");
    $("#kntNoticeWrite").css("display", "none");

    $("#menuFuncDiv").load("studyBrd/studyBrd.html");
});//그룹 리스트 보여주기

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