let noticeBrdList = [];
let noticeBrdContent = [];
let noticeBrdCommentList = [];
let noticeBrdComment = [];
let noticeBrdListId ="";


function showNoticeBrd(){
    $("#kntNoticeBrd").css("display", "block");
    $("#kntNoticeBrdWrite").css("display", "none");
    $("#kntNoticeBrdContent").css("display", "none");
    $("#UpdatekntNoticeBrdContent").css("display", "none");
    $("#kntNoticeBrdComment").css("display", "none");

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
        noticeBrdListTbodyHtml +=     "<td>" + cmpTimeStamp(noticeBrdList[i]["BRD_DATE"]) + "</td>";
        noticeBrdListTbodyHtml +=     "<td>" + noticeBrdList[i]["BRD_HIT"] + "</td>";
        noticeBrdListTbodyHtml += "</tr>";
    }

    $("#noticeBrdListTbody").empty().append(noticeBrdListTbodyHtml);

    //공지사항 목록 중 제목 클릭 시 - 쿠키 존재 확인 > 조회수 증가 > 공지사항 내용 데이터를 불러와야함
    $(".kntNoticeBrdTitle").off("click").on("click", function(){
        noticeBrdListId = this.id.substr(15);
        
        $("#kntNoticeBrd").css("display", "none");
        $("#kntNoticeBrdContent").css("display", "block");
        $("#kntNoticeBrdComment").css("display", "block");
        /* 
        쿠 키 차 근 차 근 
        1. 제목을 클릭-> 조회수를 올리기전에 getCookie(이름)를 이용해 이름의 쿠키를 조회
        2. 널(쿠키가 존재하지 않을 때) - 조회수를 올려준다.
        3. setCookie(noticeBrdListId , true , 1) 쿠키 생성  ===>  66목록마다99 조회수 최대 1 => 이름을 다르게 설정!!!!!!!!!해야함(noticeBrdListId)
           --->이름 noticeBrdListId / 값 true / 1일(유효일자)
        4. 다시 제목을 클릭-> 쿠키가 생성 되어있음 -> 조회수 증가x
        */
        if(getCookie(noticeBrdListId) == null){//쿠키 존재x
            setCookie(noticeBrdListId, "true" , 1);//쿠키 생성
            let param = "id=" + noticeBrdListId 
            //클릭한 제목의 아이디를 찾아 조회수를 증가
            requestData("/knt/user/php/main/noticeBrd/setNoticeBrdHit.php", param).done(function(result){
                if(result){
                    getNoticeBrdContent();//공지사항 내용 데이터 불러오기
                }
            });
        }
        else{//쿠키 존재
            getNoticeBrdContent();//공지사항 내용 데이터 불러오기
        }
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
    //let kntNoticeBrdCommentDomainHtml = "";

    kntNoticeBrdContentDomainHtml += "<p>제목 : " + noticeBrdContent[0]['BRD_TITLE'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>작성자 : " + noticeBrdContent[0]['BRD_WRITER'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>작성일 : " + noticeBrdContent[0]['BRD_DATE'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>조회수 : " + noticeBrdContent[0]['BRD_HIT'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<p>내용 : " + noticeBrdContent[0]['BRD_CONTENT'] + "</p>"
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentBackBtn'>목록</button>";
    //if(관리자면){
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentUpdateBtn'>수정</button>";
    kntNoticeBrdContentDomainHtml += "<button id = 'noticeContentDelBtn'>삭제</button>";
    //}
    $("#kntNoticeBrdContentDomain").empty().append(kntNoticeBrdContentDomainHtml);

    getNoticeBrdComment();//공지사항 댓글 데이터 불러오기
    showNoticeBrdCommentDomain();

    //목록 버튼 클릭 시(뒤로가기)
    $("#noticeContentBackBtn").off("click").on("click", function(){
        showNoticeBrd();
    });

    //수정 버튼 클릭 시
    $("#noticeContentUpdateBtn").off("click").on("click", function(){
        $("#kntNoticeBrdContent").css("display", "none");
        $("#kntNoticeBrdComment").css("display", "none");
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

    //댓글 작성 버튼 클릭 시
    $("#noticeBrdcommentBtn").off("click").on("click", function(){
        //댓글 내용, 작성자, 날짜, 클릭한 제목 아이디
        let noticeBrdcomment = $("#noticeBrdcomment").val();
        let date = getTimeStamp(new Date());

        let param = "comment=" + noticeBrdcomment + "&date=" + date + "&id=" + noticeBrdListId;
        requestData("/knt/user/php/main/noticeBrd/setNoticeComment.php", param).done(function(result){
            if(result){
                alert("댓글이 작성되었습니다.");

                getNoticeBrdComment();
            }
            else{
                alert("댓글이 작성되지 않았습니다.");
            }
        });
        
    });
}

//댓글 작성 공간 + 버튼 보여주기
function showNoticeBrdCommentDomain(){
    let kntNoticeBrdCommentDomainHtml = "";

    kntNoticeBrdCommentDomainHtml += "<p><textarea id = 'noticeBrdcomment' placeholder='댓글을 작성하세요.'></textarea>";
    kntNoticeBrdCommentDomainHtml += "<p><button id = 'noticeBrdcommentBtn'>댓글 작성</button>";

    $("#kntNoticeBrdCommentDomain").empty().append(kntNoticeBrdCommentDomainHtml);
}

//공지사항 수정 화면 보여주기
function showUpdateNoticeBrd(){
    let UpdatekntNoticeBrdContentDomainHtml = "";
    UpdatekntNoticeBrdContentDomainHtml += "<label for = 'noticeBrdUpdateTitle'>제목</label>";
    UpdatekntNoticeBrdContentDomainHtml += "<input type = 'text' id = 'noticeBrdUpdateTitle' value = " + noticeBrdContent[0]['BRD_TITLE'] + ">";
    UpdatekntNoticeBrdContentDomainHtml += "<p>작성자 : " + noticeBrdContent[0]['BRD_WRITER'] + "</p>"
    UpdatekntNoticeBrdContentDomainHtml += "<p>작성일 : " + noticeBrdContent[0]['BRD_DATE'] + "</p>"
    UpdatekntNoticeBrdContentDomainHtml += "<p>조회수 : " + noticeBrdContent[0]['BRD_HIT'] + "</p>"
    UpdatekntNoticeBrdContentDomainHtml += "<label for='noticeBrdUpdateContent'>내용</label>";
    UpdatekntNoticeBrdContentDomainHtml += "<textarea id = 'noticeBrdUpdateContent'>" + noticeBrdContent[0]['BRD_CONTENT'] + "</textarea><p>";
    UpdatekntNoticeBrdContentDomainHtml += "<button id = 'noticeBrdUpdateBtn'>수정</button>";
    UpdatekntNoticeBrdContentDomainHtml += "<button id = 'noticeBrdUpdateCancleBtn'>취소</button>";

    $("#UpdatekntNoticeBrdContentDomain").empty().append(UpdatekntNoticeBrdContentDomainHtml);

    //취소 버튼 클릭 시
    $("#noticeBrdUpdateCancleBtn").off("click").on("click", function(){
        $("#UpdatekntNoticeBrdContent").css("display", "none");
        $("#kntNoticeBrdContent").css("display", "block");
        $("#kntNoticeBrdComment").css("display", "block");
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

//댓글 리스트 보여주기
function showNoticeBrdComment(){
    let noticeBrdCommentListHtml = "";
    let noticeBrdCommentListSize = noticeBrdCommentList.length;

    //내용, 작성자, 날짜
    for(let i = 0; i < noticeBrdCommentListSize; i++) {
        noticeBrdCommentListHtml += "<p>작성자:" + noticeBrdCommentList[i]['CMT_WRITER']+" ";
        noticeBrdCommentListHtml += "작성일:" + noticeBrdCommentList[i]['CMT_DATE'];
        noticeBrdCommentListHtml += "<p>" + noticeBrdCommentList[i]['CMT_CONTENT'] + "</p>";
    }
    $("#kntNoticeBrdCommentListDomain").empty().append(noticeBrdCommentListHtml);
}
//공지사항 내용 데이터 불러오기
function getNoticeBrdContent(){
    let param = "id=" + noticeBrdListId;

    requestData("/knt/user/php/main/noticeBrd/getNoticeContent.php", param).done(function(result){
        noticeBrdContent = result;

        showNoticeBrdContent();//공지사항 내용 보여주기
    });
}

//공지사항 댓글 데이터 불러오기
function getNoticeBrdComment(){
    let param = "id=" + noticeBrdListId;

    requestData("/knt/user/php/main/noticeBrd/getNoticeCommentList.php", param).done(function(result){
        noticeBrdCommentList = result;
        
        showNoticeBrdComment();//공지사항 댓글 리스트 보여주기
    });
}

// 자기 계정으로 쓴 댓글이면 댓글 수정,삭제버튼 보이기 -> 내일하자..