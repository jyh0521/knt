let noticeBrdList = [];
let noticeBrdContent = [];
let noticeBrdListId ="";

function showNoticeBrd(){
    $("#kntNoticeBrd").css("display", "block");
    $("#kntNoticeBrdWrite").css("display", "none");
    $("#kntNoticeBrdContent").css("display", "none");
    $("#UpdatekntNoticeBrdContent").css("display", "none");

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
    let date = getTimeStamp(new Date());//날짜 getTimeStamp() : YYYY-MM-DD hh:mm:ss형식으로 저장
    
    let param = "title=" + noticeBrdWriteTitle + "&content=" + noticeBrdWriteContent + "&date=" + date;

    requestData("/knt/user/php/main/noticeBrd/setNoticeContent.php", param).done(function(result){
        if(result){
            alert("등록 되었습니다.");

            showNoticeBrd();
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
        $("#UpdatekntNoticeBrdContent").css("display", "none");

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
        
        $("#kntNoticeBrd").css("display", "none");
        $("#kntNoticeBrdContent").css("display", "block");
        //공지사항 내용 데이터 불러오기
        getNoticeBrdContent();
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
        $("#kntNoticeBrdContent").css("display", "none");
        $("#UpdatekntNoticeBrdContent").css("display", "block");

        showUpdateNoticeBrd();//수정하는 화면 보여주기
    });

    //삭제 버튼 클릭 시
    $("#noticeContentDelBtn").off("click").on("click", function(){
        let param = "id=" + noticeBrdListId;

        requestData("/knt/user/php/main/noticeBrd/delNoticeContent.php", param).done(function(result){
            if(result){
                alert("삭제 되었습니다.");

                showNoticeBrd();
            }
            else{
                alert("삭제 실패");
            }
        });
    });
}

//수정하는 화면 보여주기
function showUpdateNoticeBrd(){
    let UpdatekntNoticeBrdContentDomainHtml = "";
    //일단 제목 내용만?
    UpdatekntNoticeBrdContentDomainHtml += "<label for = 'noticeBrdUpdateTitle'>제목</label>";
    UpdatekntNoticeBrdContentDomainHtml += "<input type = 'text' id = 'noticeBrdUpdateTitle' value = " + noticeBrdContent[0]['BRD_TITLE'] + "><p>";
    UpdatekntNoticeBrdContentDomainHtml += "<label for='noticeBrdUpdateContent'>내용</label>";
    UpdatekntNoticeBrdContentDomainHtml += "<textarea id = 'noticeBrdUpdateContent'>" + noticeBrdContent[0]['BRD_CONTENT'] + "</textarea><p>";
    UpdatekntNoticeBrdContentDomainHtml += "<button id = 'noticeBrdUpdateBtn'>수정</button>";
    UpdatekntNoticeBrdContentDomainHtml += "<button id = 'noticeBrdUpdateCancleBtn'>취소</button>";

    $("#UpdatekntNoticeBrdContentDomain").empty().append(UpdatekntNoticeBrdContentDomainHtml);

    //취소 버튼 클릭 시
    $("#noticeBrdUpdateCancleBtn").off("click").on("click", function(){
        $("#UpdatekntNoticeBrdContent").css("display", "none");
        $("#kntNoticeBrdContent").css("display", "block");
        getNoticeBrdContent();//공지사항 내용 데이터 불러오기
    });

    //수정 버튼 클릭 시
    $("#noticeBrdUpdateBtn").off("click").on("click", function(){
        //제목, 내용, 아이디, 날짜
        let noticeBrdUpdateTitle = $("#noticeBrdUpdateTitle").val();
        let noticeBrdUpdateContent = $("#noticeBrdUpdateContent").val();
        let date = getTimeStamp(new Date());

        let param = "title=" + noticeBrdUpdateTitle + "&content=" + noticeBrdUpdateContent + "&id=" + noticeBrdListId + "&date=" + date;

        requestData("/knt/user/php/main/noticeBrd/updateNoticeContent.php", param).done(function(result){
            if(result){
                alert("수정 되었습니다.");

                $("#UpdatekntNoticeBrdContent").css("display", "none");
                $("#kntNoticeBrdContent").css("display", "block");
                //공지사항 내용 데이터 불러오기
                getNoticeBrdContent();
            }
            else{
                alert("수정 실패");
            }
        });
    });
}

//공지사항 내용 데이터 불러오기
function getNoticeBrdContent(){
    let param = "id=" + noticeBrdListId;

    requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){
        noticeBrdContent = result;

        showNoticeBrdContent();//공지사항 내용 보여주기
    });
}
