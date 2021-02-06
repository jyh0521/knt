////////////////////////////////////////////////////////////////////////////// 일단 main.js에서 noticeBrd.js 맨 위에 올려둠. 원하는 위치로 수정할 것 - 용후 -
//관리자가 공지사항 글쓰기 버튼 클릭 시 
$("#writeNoticeBtn").off("click").on("click", function(){
    writeNotice();
});

//공지사항 등록 버튼 클릭 시
$("#signUpNoticeBtn").off("click").on("click", function(){
    setNoticeContent();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var kntNoticeList = [];

//공지사항 내용 데이터 저장 
function setNoticeContent(){
    var title = $("#signUpNoticeTitle").val();
    var content = $("#signUpNoticeContent").val();
    
    var param = "title=" + title + "&content=" + content;
   
    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
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
    requestData("/knt/user/php/main/noticeBrd/getNoticeList.php").done(function(result){
        kntNoticeList = result;

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
    noticeTableHtml +=     "<tbody id='kntNoticeListTbody'>";
    noticeTableHtml +=     "</tbody>";
    noticeTableHtml += "</table>";

    $("#noticeContent").empty().append(noticeTableHtml);
};

//공지사항 목록 보여주기
function showNoticeList() {

    var kntNoticeListHtml = "";
    var kntNoticeListSize = kntNoticeList.length;

    for(var i = 0; i < kntNoticeListSize; i++) {
        kntNoticeListHtml += "<tr>";
        kntNoticeListHtml +=     "<td>" + (i + 1) + "</td>";
        kntNoticeListHtml +=     "<td>" + kntNoticeList[i]["BRD_TITLE"] + "</td>";
        kntNoticeListHtml +=     "<td>" + kntNoticeList[i]["BRD_WRITER"] + "</td>";
        kntNoticeListHtml +=     "<td>" + kntNoticeList[i]["BRD_DATE"] + "</td>";
        kntNoticeListHtml +=     "<td>" + kntNoticeList[i]["BRD_HIT"] + "</td>";
        kntNoticeListHtml += "</tr>";
    }

    $("#kntNoticeListTbody").empty().append(kntNoticeListHtml);
}

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
    contentHtml += "<input type = 'text' id = 'signUpNoticeTitle'>";
    contentHtml += "<label for='signUpNoticeContent'>내용</label>";
    contentHtml += "<textarea id = 'signUpNoticeContent'>";
    btnHtml += "<button>등록</button>";

    $("#writeNoticeContent").empty().append(contentHtml);
    $("#signUpNoticeBtn").empty().append(btnHtml);

}