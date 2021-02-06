////////////////////////////////////////////////////////////////////////////// 일단 main.js에서 noticeBrd.js 맨 위에 올려둠. 원하는 위치로 수정할 것 - 용후 -
//관리자가 공지사항 글쓰기 버튼 클릭 시 


/*$("#writeNoticeBtn").off("click").on("click", function(){
    writeNotice();
});

//공지사항 등록 버튼 클릭 시
$("#signUpNoticeBtn").off("click").on("click", function(){
    setNoticeContent();
});
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var NoticeList = [];

function showNoticeBrd(){
    //$("#noticeContent").css("display", "block");
    $("#noticeContent").empty().append("<p>g</p>");
    //getNoticeList();
    //관리자 아이디인지 검사 후 버튼 보여주기
    //if("세션 아이디" == "관리자 아이디"){
        /*var noticeContentHtml = "<button id = NoticeWriteBtn>글쓰기</button>";
        $("#noticeContent").empty().append(noticeContentHtml);

        NoticeWriteBtn();//글쓰기 버튼 클릭 시
        getNoticeList();*/
    /*else{
        getNoticeList();   관리자가 아닐경우
    }*/
};
//공지사항 내용 데이터 저장 
function setNoticeContent(){
    var title = $("#signUpNoticeTitle").val();
    var content = $("#signUpNoticeContent").val();
    
    var param = "title=" + title + "&content=" + content;

    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
            alert("등록 되었습니다.");
            $("#Notice").css("display", "block");
            $("#NoticeWrite").css("display", "none");
            getNoticeList();//공지사항 목록 불러오기
        }
        else{
            alert("등록 실패");
        }
    });
}

//공지사항 목록 데이터 불러오기
function getNoticeList(){
    requestData("/knt/user/php/main/noticeBrd/getNoticeList.php").done(function(result){

        NoticeList = result;

        showNoticeTable();
        showNoticeList();
    });
}

function showNoticeTable(){

    var noticeTableHtml= "";

    noticeTableHtml += "<table border='1'>";
    noticeTableHtml +=     "<thead>";
    noticeTableHtml +=         "<tr>";
    noticeTableHtml +=             "<td>번호</td>";
    noticeTableHtml +=             "<td>제목</td>";
    noticeTableHtml +=             "<td>작성자</td>";
    noticeTableHtml +=             "<td>작성일</td>";
    noticeTableHtml +=             "<td>조회수</td>";
    noticeTableHtml +=         "</tr>";
    noticeTableHtml +=     "</thead>";
    noticeTableHtml +=     "<tbody id='NoticeListTbody'>";
    noticeTableHtml +=     "</tbody>";
    noticeTableHtml += "</table>";

    $("#noticeContent").empty().append(noticeTableHtml);
};

//공지사항 목록 보여주기
function showNoticeList() {

    var NoticeListHtml = "";
    var NoticeListSize = NoticeList.length;

    for(var i = 0; i < NoticeListSize; i++) {
        NoticeListHtml += "<tr>";
        NoticeListHtml +=     "<td>" + (i + 1) + "</td>";
        NoticeListHtml +=     "<td>" + NoticeList[i]["BRD_TITLE"] + "</td>";
        NoticeListHtml +=     "<td>" + NoticeList[i]["BRD_WRITER"] + "</td>";
        NoticeListHtml +=     "<td>" + NoticeList[i]["BRD_DATE"] + "</td>";
        NoticeListHtml +=     "<td>" + NoticeList[i]["BRD_HIT"] + "</td>";
        NoticeListHtml += "</tr>";
    }

    $("#NoticeListTbody").empty().append(NoticeListHtml);
}

/*//관리자가 글쓰기 버튼 클릭 시
function NoticeWriteBtn(){
    $("#NoticeWriteBtn").off("click").on("click", function(){
        writeNotice();
    });
}

//공지사항 글 작성 부분 보여주기
function writeNotice(){

    var ContentHtml = "";
    var btnHtml = ""

    //일단 제목 내용만?
    ContentHtml += "<label for = 'signUpNoticeTitle'>제목</label>";
    ContentHtml += "<input type = 'text' id = 'signUpNoticeTitle'>";
    ContentHtml += "<label for='signUpNoticeContent'>내용</label>";
    ContentHtml += "<textarea id = 'signUpNoticeContent'>";
    btnHtml += "<button>등록</button>";

    $("#writeNoticeContent").empty().append(ContentHtml);
    $("#signUpNoticeBtn").empty().append(btnHtml);

}*/
