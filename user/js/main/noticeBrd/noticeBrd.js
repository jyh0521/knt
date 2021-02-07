let noticeBrdList = [];
let noticeBrdContent = [];
let noticeBrdListId ="";

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
    kntNoticeBrdContentDomainHtml +=     "<tbody id='noticeBrdListTbody'>";
    kntNoticeBrdContentDomainHtml +=     "</tbody>";
    kntNoticeBrdContentDomainHtml += "</table>";
    //if(세션 아이디 == 관리자 아이디)
    kntNoticeBrdContentDomainHtml += "<button id = 'kntNoticeBrdWriteBtn'>글쓰기</button>"

    $("#kntNoticeBrdDomain").empty().append(kntNoticeBrdContentDomainHtml);

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

    let noticeBrdListTbodyHtml = "";
    let noticeBrdListSize = noticeBrdList.length;

    for(let i = 0; i < noticeBrdListSize; i++) {
        noticeBrdListTbodyHtml += "<tr>";
        noticeBrdListTbodyHtml +=     "<td>" + (i + 1) + "</td>";
        noticeBrdListTbodyHtml +=     "<td class = 'kntNoticeBrdTitle' id = 'noticeBrdListId" + noticeBrdList[i]['BRD_ID']/* 아이디 중복 대비 */ + "'>" + noticeBrdList[i]["BRD_TITLE"] + "</td>";
        noticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_WRITER"] + "</td>";
        noticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_DATE"] + "</td>";
        noticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
        noticeBrdListTbodyHtml += "</tr>";
    }

    $("#noticeBrdListTbody").empty().append(noticeBrdListTbodyHtml);

    //공지사항 목록 중 제목 클릭 시
    $(".kntNoticeBrdTitle").off("click").on("click", function(){
        noticeBrdListId = this.id.substr(15);
        //아이디 중복 대비를 위해 추가한 아이디 자르기!
        //수정, 삭제에서 아이디 사용 위해 따로 밖에 선언

        let param = "id=" + noticeBrdListId;

        requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){
            noticeBrdContent = result;

            $("#kntNoticeBrd").css("display", "none");
            $("#kntNoticeBrdWrite").css("display", "none");
            $("#kntNoticeBrdContent").css("display", "block");
            
            showNoticeBrdContent();//공지사항 내용 보여주기
        });
    });
}

//공지사항 글 작성 부분 보여주기
function showNoticeBrdWrite(){

    let kntNoticeBrdWriteDomainHtml = "";
    //일단 제목 내용만?
    kntNoticeBrdWriteDomainHtml += "<label for = 'noticeBrdWriteTitle'>제목</label>";
    kntNoticeBrdWriteDomainHtml += "<input type = 'text' id = 'noticeBrdWriteTitle'><p>";
    kntNoticeBrdWriteDomainHtml += "<label for='noticeBrdWriteContent'>내용</label>";
    kntNoticeBrdWriteDomainHtml += "<textarea id = 'noticeBrdWriteContent'></textarea><p>";
    kntNoticeBrdWriteDomainHtml += "<button id = 'noticeBrdSignUpBtn'>등록</button>";
    kntNoticeBrdWriteDomainHtml += "<button id = 'noticeBrdCancleBtn'>취소</button>";

    $("#kntNoticeBrdWriteDomain").empty().append(kntNoticeBrdWriteDomainHtml);

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
    let kntNoticeBrdContentDomainHtml = "";
    kntNoticeBrdContentDomainHtml += "<p>제목 : " + noticeBrdContent[0]['BRD_TITLE'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>작성자 : " + noticeBrdContent[0]['BRD_WRITER'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>작성일 : " + noticeBrdContent[0]['BRD_DATE'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>조회수 : " + noticeBrdContent[0]['BRD_HIT'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>내용 : " + noticeBrdContent[0]['BRD_CONTENT'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentBackBtn'>목록보기</button><p>";
    //if(관리자면)
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentUpdateBtn'>수정</button>";
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentDelBtn'>삭제</button>";

    $("#kntNoticeBrdContentDomain").empty().append(kntNoticeBrdContentDomainHtml);

    //목록보기 버튼 클릭 시(뒤로가기)
    $("#noticeContentBackBtn").off("click").on("click", function(){
        showNoticeBrd();
    });

    //수정 버튼 클릭 시
    $("#noticeContentUpdateBtn").off("click").on("click", function(){
        //시작!
    });

    //삭제 버튼 클릭 시
    $("#noticeContentDelBtn").off("click").on("click", function(){

        param = "id=" + noticeBrdListId;

        requestData("/knt/user/php/main/noticeBrd/delNoticeContent.php", param).done(function(result){
            if(result){
                alert("삭제 되었습니다.");

                $("#kntNoticeBrd").css("display", "block");
                $("#kntNoticeBrdWrite").css("display", "none");
                $("#kntNoticeBrdContent").css("display", "none");

                getNoticeBrdList();//공지사항 목록 불러오기
            }
            else{
                alert("삭제 실패");
            }
        });
    });

}
