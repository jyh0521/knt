

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#kntnotice").css("display", "block");
    $("#kntinformation").css("display", "none");

    showNotice();
});

//학술국 정보공유 클릭 시 
$("#informationBtn").off("click").on("click", function(){
    $("#kntinformation").css("display", "block");
    $("#kntnotice").css("display", "none");

    showinformation();
});

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

function showinformation(){
    var ContentHtml = "<p>학술국 정보공유";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#information_Content").empty().append(ContentHtml);
    
};


