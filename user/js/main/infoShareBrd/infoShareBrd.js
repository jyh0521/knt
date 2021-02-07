////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let infoShareList = [];
let infoShareSelectedContent = [];
let infoShareSelectedContentCommentList = [];
let infoShareSelectedListId = "";

let writeOption = "";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 게시판 초기화 함수
function initInfoShare(){
    $("#infoShareTableDiv").css("display", "block");
    $("#infoShareContentDiv").css("display", "none");
    $("#infoShareWriteContentFuncDiv").css("display", "none");

    getInfoShareList();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 데이터 불러오기 //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 불러오기
function getInfoShareList() {
    requestData("/knt/user/php/main/infoShareBrd/getInfoShareList.php").done(function(result){
        infoShareList = result;

        drawInfoShareTable();
        drawInfoShareList();
    });
}

// 정보공유 선택된 글 조회수 체크
function hitInfoShareContent() {
    var deferred = $.Deferred();

    try {
        //**************************************************** ADMIN 수정 *******************/
        // 쿠키가 없는 경우 쿠키를 만들고 조회수 1 증가
        if(!getCookie("infoShareContentHitCookie" + infoShareSelectedListId + "ADMIN")) {
            setCookie("infoShareContentHitCookie" + infoShareSelectedListId + "ADMIN", "true", 1);

            var param = "brdId=" + infoShareSelectedListId;

            requestData("/knt/user/php/main/infoShareBrd/hitInfoShareContent.php", param).done(function(result){
                deferred.resolve(result);
            });
        }
        else {
            deferred.resolve("success");
        }
    } catch(e) {
        deferred.reject(e);
    }

    return deferred.promise();
}

// 정보공유 선택된 글 내용 불러오기
function getInfoShareContent() {
    hitInfoShareContent().done(function(){
        let param = "id=" + infoShareSelectedListId;

        // 선택된 글의 id로 데이터 요청
        requestData("/knt/user/php/main/infoShareBrd/getInfoShareContent.php", param).done(function(result){
            infoShareSelectedContent =  result["CONTENT"];
            infoShareSelectedContentCommentList = result["COMMENT"];

            $("#infoShareTableDiv").css("display", "none");
            $("#infoShareContentDiv").css("display", "block");
            $("#infoShareWriteContentFuncDiv").css("display", "none");

            drawInfoShareSelectedContent();
            drawInfoShareSelectedContentComment();
        });
    });
}

/******************************************************************************************************************************************/
// 정보공유 글 작성하기, ADMIN 수정할 것
function writeInfoShareContent() {
    let title = $("#infoShareWriteContentTitle").val();
    let content = $("#infoShareWriteContentTextArea").val();
    let date = getTimeStamp(new Date());
    let param = "id=" + "ADMIN" + "&title=" + title + "&content=" + content + "&date=" + date; 

    // 작성하기
    if(writeOption === "write") {
        requestData("/knt/user/php/main/infoShareBrd/writeInfoShareContent.php", param).done(function(result){
            if(result) {
                alert("작성되었습니다.");
                initInfoShare();
            } else {
                alert("작성 실패하였습니다.");
            }
        });
    }
    // 수정하기
    else if(writeOption === "update") {
        param += "&brdId=" + infoShareSelectedListId;

        requestData("/knt/user/php/main/infoShareBrd/updateInfoShareContent.php", param).done(function(result){
            if(result) {
                alert("수정되었습니다.");
                initInfoShare();
            }
            else {
                alert("수정 실패하였습니다.");
            }
        });
    }
}

// 정보공유 선택된 글 삭제하기
function deleteInfoShareContent() {
    let param ="brdId=" + infoShareSelectedListId;

    requestData("/knt/user/php/main/infoShareBrd/deleteInfoShareContent.php", param).done(function(result){
        if(result) {
            alert("삭제되었습니다.");
            initInfoShare();
        }
        else {
            alert("삭제 실패하였습니다.");
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 화면에 그리기 ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 테이블 그리기
function drawInfoShareTable() {
    let infoShareTableHtml = "";

    infoShareTableHtml += "<table id='infoShareListTable' border='1'>";
    infoShareTableHtml +=     "<thead>";
    infoShareTableHtml +=         "<tr>";
    infoShareTableHtml +=             "<td>번호</td>";
    infoShareTableHtml +=             "<td>제목</td>";
    infoShareTableHtml +=             "<td>작성자</td>";
    infoShareTableHtml +=             "<td>작성일</td>";
    infoShareTableHtml +=             "<td>조회수</td>";
    infoShareTableHtml +=         "</tr>";
    infoShareTableHtml +=     "</thead>";
    infoShareTableHtml +=     "<tbody id='infoShareListTbodyDiv'>";
    infoShareTableHtml +=     "</tbody>";
    infoShareTableHtml += "</table>";
    infoShareTableHtml += "<button id='infoShareListWriteBtn'>작성하기</button>";

    $("#infoShareTableDiv").empty().append(infoShareTableHtml);
}

// 정보공유 글 리스트 그리기
function drawInfoShareList() {
    let infoShareListHtml = "";
    let infoShareListSize = infoShareList.length;

    for(let i = 0; i < infoShareListSize; i++) {
        infoShareListHtml += "<tr>";
        infoShareListHtml +=     "<td>" + (i + 1) + "</td>";
        infoShareListHtml +=     "<td class='infoShareListTitle' id='infoShareListID"+ infoShareList[i]["BRD_ID"] +"'>" + infoShareList[i]["BRD_TITLE"] + "</td>";
        infoShareListHtml +=     "<td>" + infoShareList[i]["BRD_WRITER"] + "</td>";
        infoShareListHtml +=     "<td>" + cmpTimeStamp(infoShareList[i]["BRD_DATE"]) + "</td>";
        infoShareListHtml +=     "<td>" + infoShareList[i]["BRD_HIT"] + "</td>";
        infoShareListHtml += "</tr>";
    }

    $("#infoShareListTbodyDiv").empty().append(infoShareListHtml);

    initInfoShareListEvent();
}

/******************************************************************************************************************************************/
// ADMIN 수정할 것
// 정보공유 선택된 글 내용 그리기
function drawInfoShareSelectedContent() {
    let infoShareSelectedContentHtml = "";

    // 선택된 글 내용 그리기
    infoShareSelectedContentHtml += "<p>제목: " + infoShareSelectedContent["BRD_TITLE"] + "</p>";
    infoShareSelectedContentHtml += "<p>내용: " + infoShareSelectedContent["BRD_CONTENT"]  + "</p>";
    infoShareSelectedContentHtml += "<p>작성자: " + infoShareSelectedContent["BRD_WRITER"]  + "</p>";
    infoShareSelectedContentHtml += "<p>작성일: " + infoShareSelectedContent["BRD_DATE"]  + "</p>";
    infoShareSelectedContentHtml += "<p>조회수: " + infoShareSelectedContent["BRD_HIT"]  + "</p>";

    if(infoShareSelectedContent["BRD_WRITER"] === "ADMIN") {
        infoShareSelectedContentHtml += "<button id='infoShareSelectedContentDelBtn'>삭제</button>";
        infoShareSelectedContentHtml += "<button id='infoShareSelectedContentUptBtn'>수정</button>";
    }

    infoShareSelectedContentHtml += "<button id='infoShareSelectedContentBackBtn'>뒤로</button>";

    $("#infoShareSelectedContentDiv").empty().append(infoShareSelectedContentHtml);

    initInfoShareSelectedContentEvent();
}

// 정보공유 선택된 글의 댓글 내용 그리기
function drawInfoShareSelectedContentComment() {
    let infoShareSelectedContentCommentHtml = "";
    let infoShareSelectedContentCommentListSize = infoShareSelectedContentCommentList.length;

    // 선택된 글의 댓글 목록 그리기
    for(let i = 0; i < infoShareSelectedContentCommentListSize; i++) {
        infoShareSelectedContentCommentHtml += "<h4>작성자: " + infoShareSelectedContentCommentList[i]["CMT_WRITER"] + "</h4>";
        infoShareSelectedContentCommentHtml += "<h4>작성일: " + infoShareSelectedContentCommentList[i]["CMT_DATE"] + "</h4>";
        infoShareSelectedContentCommentHtml += "<h4>내용: " + infoShareSelectedContentCommentList[i]["CMT_CONTENT"] + "</h4>";
    }

    $("#infoShareSelectedContentCommentDiv").empty().append(infoShareSelectedContentCommentHtml);
}

// 정보공유 글 작성 부분 그리기
function drawInfoShareWriteContent() {
    $("#infoShareTableDiv").css("display", "none");
    $("#infoShareContentDiv").css("display", "none");
    $("#infoShareWriteContentFuncDiv").css("display", "block");

    initInfoShareWriteContentEvent();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 게시판 이벤트 ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 이벤트 초기화
function initInfoShareListEvent() {
    $(".infoShareListTitle").off("click").on("click", function(){
        // ID 자르기
        infoShareSelectedListId = this.id.substr(15);
        
        // 선택된 글 불러오기
        getInfoShareContent();
    });

    // 작성하기 버튼 클릭 시
    $("#infoShareListWriteBtn").off("click").on("click", function(){ 
        writeOption = "write";       
        drawInfoShareWriteContent();
    });
}

// 정보공유 선택된 글 이벤트 초기화
function initInfoShareSelectedContentEvent() {
    // 삭제 버튼 클릭 시
    $("#infoShareSelectedContentDelBtn").off("click").on("click", function(){
        if(confirm("삭제하시겠습니까?")) {
            deleteInfoShareContent();
        }
        else {
            alert("취소되었습니다.");
        }
    });

    // 수정 버튼 클릭 시
    $("#infoShareSelectedContentUptBtn").off("click").on("click", function(){
        if(confirm("수정하시겠습니까?")) {
            writeOption = "update";
            drawInfoShareWriteContent();

            $("#infoShareWriteContentTitle").val(infoShareSelectedContent["BRD_TITLE"]);
            $("#infoShareWriteContentTextArea").val(infoShareSelectedContent["BRD_CONTENT"]);
        }
        else {
            alert("취소되었습니다.");
        }
    });

    // 뒤로 버튼 클릭 시
    $("#infoShareSelectedContentBackBtn").off("click").on("click", function(){
        initInfoShare();
    });
}

function initInfoShareWriteContentEvent() {
    // 작성하기 버튼 클릭 시
    $("#infoShareWriteContentWriteBtn").off("click").on("click", function(){
        if(confirm("작성하시겠습니까?")) {
            writeInfoShareContent();
        } else {
            alert("취소되었습니다.");
        }
    });

    // 뒤로 버튼 클릭 시
    $("#infoShareWriteContentBackBtn").off("click").on("click", function(){
        initInfoShare();
    });
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// 기타 함수 //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
    TODO
    1. 글 작성 o
    2. 댓글 작성
    3. 수정 o
    4. 삭제 o
    5. 페이징
    6. 조회수

    일단 ID는 ADMIN으로 설정
*/