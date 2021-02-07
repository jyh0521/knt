let noticeBrdList = [];
let noticeBrdContent = [];

function showNoticeBrd(){
    $("#kntNoticeBrd").css("display", "block");
    $("#kntNoticeBrdWrite").css("display", "none");
    $("#kntNoticeBrdContent").css("display", "none");

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
    let noticeBrdWriteTitle = $("#noticeBrdWriteTitle").val();
    let noticeBrdWriteContent = $("#noticeBrdWriteContent").val();
    let data = getTimeStamp(new Date());//날짜 getTimeStamp() : YYYY-MM-DD hh:mm:ss형식으로 저장
    
    let param = "title=" + noticeBrdWriteTitle + "&content=" + noticeBrdWriteContent + "&data=" + data;

    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
            alert("등록 되었습니다.");
            $("#kntNoticeBrd").css("display", "block");
            $("#kntNoticeBrdWrite").css("display", "none");
            $("#kntNoticeBrdContent").css("display", "none");
            getNoticeBrdList();//공지사항 목록 불러오기
        }
        else{
            alert("등록 실패");
        }
    });
}

function showNoticeBrdTable(){

    let kntNoticeBrdContentDomainHtml= "";

    kntNoticeBrdContentDomainHtml += "<table border='1'>";
    kntNoticeBrdContentDomainHtml +=     "<thead>";
    kntNoticeBrdContentDomainHtml +=         "<tr>";
    kntNoticeBrdContentDomainHtml +=             "<td>번호</td>";
    kntNoticeBrdContentDomainHtml +=             "<td>제목</td>";
    kntNoticeBrdContentDomainHtml +=             "<td>작성자</td>";
    kntNoticeBrdContentDomainHtml +=             "<td>작성일</td>";
    kntNoticeBrdContentDomainHtml +=             "<td>조회수</td>";
    kntNoticeBrdContentDomainHtml +=         "</tr>";
    kntNoticeBrdContentDomainHtml +=     "</thead>";
    kntNoticeBrdContentDomainHtml +=     "<tbody id='NoticeBrdListTbody'>";
    kntNoticeBrdContentDomainHtml +=     "</tbody>";
    kntNoticeBrdContentDomainHtml += "</table>";
    //if(세션 아이디 == 관리자 아이디)
    kntNoticeBrdContentDomainHtml += "<button id = 'kntNoticeBrdWriteBtn'>글쓰기</button>"

    $("#kntNoticeBrdContentDomain").empty().append(kntNoticeBrdContentDomainHtml);

    //관리자가 글쓰기 버튼 클릭 시
    $("#kntNoticeBrdWriteBtn").off("click").on("click", function(){
        $("#kntNoticeBrdWrite").css("display", "block");
        $("#kntNoticeBrd").css("display", "none");
        $("#kntNoticeBrdContent").css("display", "none");
        showNoticeBrdWrite();
    });

};

//공지사항 목록 보여주기
function showNoticeBrdList() {

    let NoticeBrdListTbodyHtml = "";
    let noticeBrdListSize = noticeBrdList.length;

    for(let i = 0; i < noticeBrdListSize; i++) {
        NoticeBrdListTbodyHtml += "<tr>";
        NoticeBrdListTbodyHtml +=     "<td>" + (i + 1) + "</td>";
        NoticeBrdListTbodyHtml +=     "<td id = '" + noticeBrdList[i]['BRD_TITLE'] + "'>"/*???고민해보기*/ + noticeBrdList[i]["BRD_TITLE"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_WRITER"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_DATE"] + "</td>";
        NoticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
        NoticeBrdListTbodyHtml += "</tr>";
    }

    $("#NoticeBrdListTbody").empty().append(NoticeBrdListTbodyHtml);

    //공지사항 목록 중 제목 클릭 시
    $("#kntNoticeBrdTitle").off("click").on("click", function(){
        /*공지사항 내용 불러오기 getNoticeContent 제목 저장.......?ㅠㅠ어케ㅏㅁ함*/

        param = "title=" + kntNoticeBrdTitle;

        requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){

            noticeBrdContent = result;
            $("#kntNoticeBrdContent").css("display", "block");
            $("#kntNoticeBrd").css("display", "none");
            $("#kntNoticeBrdWrite").css("display", "none");
            
            showNoticeBrdContent();//공지사항 내용 보여주기
        });
    });
}

//공지사항 글 작성 부분 보여주기
function showNoticeBrdWrite(){

    let kntNoticeBrdWriteContentDomainHtml = "";
    //일단 제목 내용만?
    kntNoticeBrdWriteContentDomainHtml += "<label for = 'noticeBrdWriteTitle'>제목</label>";
    kntNoticeBrdWriteContentDomainHtml += "<input type = 'text' id = 'noticeBrdWriteTitle'><p>";
    kntNoticeBrdWriteContentDomainHtml += "<label for='noticeBrdWriteContent'>내용</label>";
    kntNoticeBrdWriteContentDomainHtml += "<textarea id = 'noticeBrdWriteContent'></textarea><p>";
    kntNoticeBrdWriteContentDomainHtml += "<button id = 'noticeBrdSignUpBtn'>등록</button>";
    kntNoticeBrdWriteContentDomainHtml += "<button id = 'noticeBrdCancleBtn'>취소</button>";

    $("#kntNoticeBrdWriteContentDomain").empty().append(kntNoticeBrdWriteContentDomainHtml);

    //등록 버튼 클릭 시
    $("#noticeBrdSignUpBtn").off("click").on("click", function(){
        setNoticeBrdContent();
    });

    //취소 버튼 클릭 시
    $("#noticeBrdCancleBtn").off("click").on("click", function(){
        showNoticeBrd();
    });
}

//공지사항 내용 보여주기
function showNoticeBrdContent(){

}
