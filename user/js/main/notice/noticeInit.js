
//공지사항 목록 데이터 저장 
function setNoticeList(){
    var title = $("#signUpNoticeTitle").val();
    var content = $("#signUpNoticeContent").val();
    
    var param = "title=" + title + "&content=" + content;
   
    requestData("", param).done(function(result){
        if(result){
            //등록 문구를 띄우고 화면 초기화 후, 데이터를 불러와서 화면에 출력한다...
            alert("등록 되었습니다.");
            $("#kntNotice").css("display", "block");
            $("#kntNoticeWrite").css("display", "none");
            getNoticeList();//공지사항 목록 불러오기
        }
        else{
            alert("등록 실패");
        }
    });
}

//공지사항 목록 데이터 불러오기
function getNoticeList(){
    //데이터를 불러오는 코드를 작성한 후, 화면에 출력하는 함수
}

//공지사항 목록 보여주기
function showNotice(){

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
    $("#noticeContent").empty().append(contentHtml);
};

//관리자 아이디인지 검사 후 버튼 보여주기
function showBtn(){
    /*
    if("세션 아이디" == "관리자 아이디")
    일단 이렇게 쓰고 나중에 조건 걸고 버튼 생성해주자~
    */
    var btnHtml = "<button>글쓰기</button>";
    $("#writeNoticeBtn").empty().append(btnHtml);
}

//공지사항 글 작성 부분 보여주기
function writeNotice(){

    var contentHtml = "";
    var btnHtml = ""

    //일단 제목 내용만?
    contentHtml += "<label for = 'signUpNoticeTitle'>제목</label>";
    contentHtml += "<input type = 'text' id = 'signupNoticeTitle'>";
    contentHtml += "<label for='signUpNoticeContent'>내용</label>";
    contentHtml += "<textarea id = 'signUpNoticeContent'>";
    btnHtml += "<button>등록</button>";

    $("#writeNoticeContent").empty().append(contentHtml);
    $("#signUpNoticeBtn").empty().append(btnHtml);

}