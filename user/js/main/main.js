

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#kntnotice").css("display", "block");
    $("#kntinformation").css("display", "none");

    showBtn();
    showNotice();
});

//학술국 정보공유 클릭 시 
$("#informationBtn").off("click").on("click", function(){
    $("#kntinformation").css("display", "block");
    $("#kntnotice").css("display", "none");

    showinformation();
});

//관리자가 공지사항 글쓰기 버튼 클릭 시 
$("#writeNoticeBtn").off("click").on("click", function(){
    $("#kntnotice").css("display", "none");
    $("#kntnotice_Write").css("display", "block");

    writeNotice();
});

//공지사항 글 등록 버튼 클릭 시 
$("#signupNoticeBtn").off("click").on("click", function(){
    var NoticeTitle = $("#NoticeTitle").val();
    var NoticeContent = $("#NoticeContent").val();

    var param = "NoticeTitle=" + NoticeTitle + "&NoticeContent=" + NoticeContent;

    requestData("signupNotice.php", param).done(function(){
//*****여기서부터 다시 시작하기~~
    });
});

//관리자 아이디인지 검사 후 버튼 생성
function showBtn(){
    if("세션 아이디" == "관리자 아이디"){//일단 이렇게 쓰자..
        var btnHtml = "<button id = 'writeNoticeBtn'>글쓰기</button>";
        $("#notice_Content").empty().append(btnHtml);
    }
}

//공지사항 목록 보여주기
function showNotice(){

    var ContentHtml = "";
    
    ContentHtml += "<table>";
    ContentHtml += "<thead>";
    ContentHtml += "<th>제목</th>";
    ContentHtml += "<th>작성자</th>";
    ContentHtml += "<th>작성일</th>";
    ContentHtml += "<th>조회</th>";
    ContentHtml += "</thead>";
    /* 나중에 db에서 받아오기 */
    ContentHtml += "</table>";
    $("#notice_Content").empty().append(ContentHtml);

};

//공지사항 글 작성
function writeNotice(){

    var ContentHtml = "";

    //일단 제목 내용만?
    ContentHtml += "<label for = 'NoticeTitle'>제목</label>";
    ContentHtml += "<input type = 'text' id = 'NoticeTitle'/>";
    ContentHtml += "<label for='NoticeContent'>내용</label>";
    ContentHtml += "<input type = 'text' id = 'NoticeContent'/>";
    ContentHtml += "<button id = 'signupNoticeBtn'>등록</button>";

    $("#writeNotice_Content").empty().append(ContentHtml);

}

//학술국 정보공유 보여주기
function showinformation(){
    var ContentHtml = "<p>학술국 정보공유";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#information_Content").empty().append(ContentHtml);
    
};


