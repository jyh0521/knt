var noticeBrdList = [];

function showNoticeBrd(){
    $("#kntNoticeBrd").css("display", "block");

    getNoticeBrdList();
};

//공지사항 목록 데이터 불러오기
function getNoticeBrdList(){
    requestData("/knt/user/php/main/noticeBrd/getNoticeList.php").done(function(result){
        noticeBrdList = result;

        showNoticeBrdTable();
        showNoticeBrdList();
    });
}

//공지사항 내용 데이터 저장 
function setNoticeBrdContent(){
    var noticeBrdWriteTitle = $("#noticeBrdWriteTitle").val();
    var noticeBrdWriteContent = $("#noticeBrdWriteContent").val();
    
    var param = "title=" + noticeBrdWriteTitle + "&content=" + noticeBrdWriteContent;

    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
            alert("등록 되었습니다.");
            $("#kntNoticeBrd").css("display", "block");
            $("#kntNoticeBrdWrite").css("display", "none");
            getNoticeBrdList();//공지사항 목록 불러오기
        }
        else{
            alert("등록 실패");
        }
    });
}

function showNoticeBrdTable(){

    var kntNoticeBrdContentHtml= "";

    kntNoticeBrdContentHtml += "<table border='1'>";
    kntNoticeBrdContentHtml +=     "<thead>";
    kntNoticeBrdContentHtml +=         "<tr>";
    kntNoticeBrdContentHtml +=             "<td>번호</td>";
    kntNoticeBrdContentHtml +=             "<td>제목</td>";
    kntNoticeBrdContentHtml +=             "<td>작성자</td>";
    kntNoticeBrdContentHtml +=             "<td>작성일</td>";
    kntNoticeBrdContentHtml +=             "<td>조회수</td>";
    kntNoticeBrdContentHtml +=         "</tr>";
    kntNoticeBrdContentHtml +=     "</thead>";
    kntNoticeBrdContentHtml +=     "<tbody id='NoticeBrdListTbody'>";
    kntNoticeBrdContentHtml +=     "</tbody>";
    kntNoticeBrdContentHtml += "</table>";
    //if(세션 아이디 == 관리자 아이디)
    kntNoticeBrdContentHtml += "<button id = 'kntNoticeBrdWriteBtn'>글쓰기</button>"

    $("#kntNoticeBrdContent").empty().append(kntNoticeBrdContentHtml);

    //관리자가 글쓰기 버튼 클릭 시
    $("#kntNoticeBrdWriteBtn").off("click").on("click", function(){
        $("#kntNoticeBrdWrite").css("display", "block");
        $("#kntNoticeBrd").css("display", "none");

        showNoticeBrdWrite();
    });

};

//공지사항 목록 보여주기
function showNoticeBrdList() {

    var NoticeBrdListTbodyHtml = "";
    var noticeBrdListSize = noticeBrdList.length;

    for(var i = 0; i < noticeBrdListSize; i++) {
        NoticeBrdListTbodyHtml += "<tr>";
        NoticeBrdListTbodyHtml +=     "<td>" + (i + 1) + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_TITLE"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_WRITER"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_DATE"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
        NoticeBrdListTbodyHtml += "</tr>";
    }

    $("#NoticeBrdListTbody").empty().append(NoticeBrdListTbodyHtml);
}

//공지사항 글 작성 부분 보여주기
function showNoticeBrdWrite(){

    var kntNoticeBrdWriteContentHtml = "";
    //일단 제목 내용만?
    kntNoticeBrdWriteContentHtml += "<label for = 'noticeBrdWriteTitle'>제목</label>";
    kntNoticeBrdWriteContentHtml += "<input type = 'text' id = 'noticeBrdWriteTitle'><p>";
    kntNoticeBrdWriteContentHtml += "<label for='noticeBrdWriteContent'>내용</label>";
    kntNoticeBrdWriteContentHtml += "<textarea id = 'noticeBrdWriteContent'></textarea><p>";
    kntNoticeBrdWriteContentHtml += "<button id = 'noticeBrdSignUpBtn'>등록하기</button><p>";

    $("#kntNoticeBrdWriteContent").empty().append(kntNoticeBrdWriteContentHtml);

    //등록하기 버튼 클릭 시
    $("#noticeBrdSignUpBtn").off("click").on("click", function(){
        setNoticeBrdContent();
    });

}
