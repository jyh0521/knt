

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#kntnotice").css("display", "block");
    $("#kntnotice_Write").css("display", "none");
    $("#kntinformation").css("display", "none");
    $("#kntStudy").css("display", "none");

    showBtn();
    showNotice();
});

//학술국 정보공유 클릭 시 
$("#informationBtn").off("click").on("click", function(){
    $("#kntinformation").css("display", "block");
    $("#kntnotice").css("display", "none");
    $("#kntnotice_Write").css("display", "none");
    $("#kntStudy").css("display", "none");

    showInformation();
});


//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function(){
    $("#kntStudy").css("display", "block");
    $("#kntinformation").css("display", "none");
    $("#kntnotice").css("display", "none");
    $("#kntnotice_Write").css("display", "none");

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

//관리자가 공지사항 글쓰기 버튼 클릭 시 
$("#writeNoticeBtn_Content").off("click").on("click", function(){
    $("#kntnotice").css("display", "none");
    $("#kntnotice_Write").css("display", "block");

    writeNotice();
});

//공지사항 글 등록 버튼 클릭 시 
$("#signupNoticeBtn_Content").off("click").on("click", function(){
    var NoticeTitle = $("#NoticeTitle").val();
    var NoticeContent = $("#NoticeContent").val();

    var param = "NoticeTitle=" + NoticeTitle + "&NoticeContent=" + NoticeContent;

    requestData("signupNotice.php", param).done(function(){
//*****여기서부터 다시 시작하기~~
    });
});

//관리자 아이디인지 검사 후 버튼 생성
function showBtn(){
    /*
    if("세션 아이디" == "관리자 아이디")
    일단 이렇게 쓰고 나중에 조건 걸고 버튼 생성해주자~
    */
    var btnHtml = "<button id = 'writeNoticeBtn'>글쓰기</button>";
    $("#writeNoticeBtn_Content").empty().append(btnHtml);

}

//공지사항 글 작성
function writeNotice(){

    var ContentHtml = "";
    var btnHtml = ""

    //일단 제목 내용만?
    ContentHtml += "<label for = 'NoticeTitle'>제목</label>";
    ContentHtml += "<input type = 'text' id = 'NoticeTitle'/>";
    ContentHtml += "<label for='NoticeContent'>내용</label>";
    ContentHtml += "<input type = 'text' id = 'NoticeContent'/>";
    btnHtml += "<button id = 'signupNoticeBtn_Content'>등록</button>";

    $("#writeNotice_Content").empty().append(ContentHtml);
    $("#signupNoticeBtn_Content").empty().append(btnHtml);

}

//학술국 정보공유 보여주기
function showInformation(){
    var ContentHtml = "<p>학술국 정보공유";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#information_Content").empty().append(ContentHtml);
    
};

//스터디A 게시물 목록 보여주기
function showStudyA_Board(){
    var ContentHtml = "";

    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    
    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyA_Content").empty().append(ContentHtml);
};

//스터디B 게시물 목록 보여주기
function showStudyB_Board(){
    var ContentHtml = "";

    ContentHtml += "<button id='writeBtn'>글쓰기</button>";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyB_Content").empty().append(ContentHtml);
};

//스터디C 게시물 목록 보여주기
function showStudyC_Board(){
    var ContentHtml = "";

    ContentHtml += "<button id='writeBtn'>글쓰기</button>";

    ContentHtml += "<table>";
    ContentHtml +=     "<thead>";
    ContentHtml +=         "<th>제목</th>";
    ContentHtml +=         "<th>작성자</th>";
    ContentHtml +=         "<th>작성일</th>";
    ContentHtml +=         "<th>조회</th>";
    ContentHtml +=     "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    
    $("#studyC_Content").empty().append(ContentHtml);
};