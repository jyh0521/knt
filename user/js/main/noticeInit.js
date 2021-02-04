//공지사항 목록 보여주기
function showNotice(){

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
    $("#notice_Content").empty().append(ContentHtml);

};

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