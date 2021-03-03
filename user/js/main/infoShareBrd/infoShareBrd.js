////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let infoShareList = [];
let infoShareSelectedContent = [];
let infoShareSelectedContentCommentList = [];
let infoShareSelectedListId = "";
let infoShareSelectedCommentId = "";

let infoShareListSize = "";
let infoShareCommentListSize = "";

let writeOption = "";
let commentWriteOption = "";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 게시판 초기화 함수
function initInfoShare(){
    $("#infoShareTableDiv").css("display", "block");
    $("#infoShareContentPagingDiv").css("display", "block"); 

    $("#infoShareContentDiv").css("display", "none");
    $("#infoShareWriteContentFuncDiv").css("display", "none");

    getInfoShareListSize();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 데이터 불러오기 //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 전체 데이터 수 불러오기
function getInfoShareListSize() {
    requestData("/knt/user/php/main/infoShareBrd/getInfoShareListSize.php").done(function(result) {
        infoShareListSize = result["COUNT"];

        DrawPaging(infoShareListSize, 10, 1, "infoShareContentPagingDiv", getInfoShareList);
    });
}

// 정보공유 글 리스트 불러오기
function getInfoShareList(currentPage) {
    let param = "currentPage=" + currentPage + "&dataPerPage=" + 10;

    requestData("/knt/user/php/main/infoShareBrd/getInfoShareList.php", param).done(function(result){
        infoShareList = result;

        drawInfoShareTable();
        drawInfoShareList(currentPage);
    });
}

// 정보공유 선택된 글 조회수 체크
function hitInfoShareContent() {
    let deferred = $.Deferred();

    try {
        //**************************************************** ADMIN 수정 *******************/
        // 쿠키가 없는 경우 쿠키를 만들고 조회수 1 증가
        if(!getCookie("infoShareContentHitCookie" + infoShareSelectedListId + "ADMIN")) {
            setCookie("infoShareContentHitCookie" + infoShareSelectedListId + "ADMIN", "true", 1);

            let param = "brdId=" + infoShareSelectedListId;

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
            infoShareSelectedContent =  result[0];
            
            getInfoShareCommentListSize();
            drawInfoShareSelectedContent();
        });
    });
}

// 정보공유 선택된 글의 댓글 리스트 전체 데이터 수 불러오기
function getInfoShareCommentListSize() {
    let param = "brdId=" + infoShareSelectedListId;
    requestData("/knt/user/php/main/infoShareBrd/getInfoShareCommentListSize.php", param).done(function(result) {
        infoShareCommentListSize = result["COUNT"];

        DrawPaging(infoShareCommentListSize, 5, 1, "infoShareCommentPagingDiv", getInfoShareCommentList);
    });
}

// 정보공유 선택된 글의 댓글 리스트 불러오기
function getInfoShareCommentList(currentPage) {
    let param = "brdId=" + infoShareSelectedListId + "&currentPage=" + currentPage + "&dataPerPage=" + 5;

    requestData("/knt/user/php/main/infoShareBrd/getInfoShareCommentList.php", param).done(function(result) {
        infoShareSelectedContentCommentList = result;

        drawInfoShareSelectedContentComment();
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

function writeInfoShareComment() {
    // ADMIN 수정
    // 내용, 작성자, 작성일, 게시판 아이디
    let content = $("#infoShareWriteCommentTextArea").val();

    if(content === "") {
        alert("댓글을 작성해주세요.");

        return false;
    }

    let date = getTimeStamp(new Date());
    let brdId = infoShareSelectedListId;
    let param = "content=" + content + "&writer=" + "ADMIN" + "&date=" + date + "&brdId=" + brdId;
    
    if(commentWriteOption === "write") {
        requestData("/knt/user/php/main/infoShareBrd/writeInfoShareComment.php", param).done(function(result){
            if(result) {
                alert("작성되었습니다.");
                getInfoShareContent();
            } else {
                alert("작성 실패하였습니다.");
            }
        });
    }
    else if(commentWriteOption === "update") {
        param += "&id=" + infoShareSelectedCommentId;

        requestData("/knt/user/php/main/infoShareBrd/updateInfoShareComment.php", param).done(function(result){
            if(result) {
                alert("수정되었습니다.");
                getInfoShareContent();
            } else {
                alert("수정 실패하였습니다.");
            }
        });
    }
}

function deleteInfoShareComment() {
    let param = "id=" + infoShareSelectedCommentId;

    requestData("/knt/user/php/main/infoShareBrd/deleteInfoShareComment.php", param).done(function(result){
        if(result) {
            alert("삭제되었습니다.");
            getInfoShareContent();
        } else {
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

    infoShareTableHtml += "<table class = 'ui single line table' id='infoShareListTable'>";
    infoShareTableHtml +=     "<thead>";
    infoShareTableHtml +=         "<tr>";
    infoShareTableHtml +=             "<td>번호</td>";
    infoShareTableHtml +=             "<td style = 'width:200%;'>제목</td>";
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
function drawInfoShareList(currentPage) {
    let infoShareListHtml = "";
    let infoShareListSize = infoShareList.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < infoShareListSize; i++) {
        infoShareListHtml += "<tr>";
        infoShareListHtml +=     "<td>" + (startDataIndex + i) + "</td>";
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
    $("#infoShareTableDiv").css("display", "none");
    $("#infoShareContentDiv").css("display", "block");
    $("#infoShareWriteContentFuncDiv").css("display", "none");
    $("#infoShareContentPagingDiv").css("display", "none");

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

    commentWriteOption = "write";

    // 선택된 글의 댓글 목록 그리기
    for(let i = 0; i < infoShareSelectedContentCommentListSize; i++) {
        infoShareSelectedContentCommentHtml += "<h4>작성자: " + infoShareSelectedContentCommentList[i]["CMT_WRITER"] + "</h4>";
        infoShareSelectedContentCommentHtml += "<h4>작성일: " + infoShareSelectedContentCommentList[i]["CMT_DATE"] + "</h4>";
        infoShareSelectedContentCommentHtml += "<h4 id='infoShareComment" + infoShareSelectedContentCommentList[i]["CMT_ID"] + "'>내용: " + infoShareSelectedContentCommentList[i]["CMT_CONTENT"] + "</h4>";

        // ************************************************ ADMIN 수정
        if(infoShareSelectedContentCommentList[i]["CMT_WRITER"] === "ADMIN") {
            infoShareSelectedContentCommentHtml += "<button class='infoShareCommentUptBtn'>수정</button>";
			infoShareSelectedContentCommentHtml += "<button class='infoShareCommentDelBtn'>삭제</button>";
		}
    }

    infoShareSelectedContentCommentHtml += "<h5>댓글 작성하기</h5>";
	infoShareSelectedContentCommentHtml += "<textarea name='infoShareWriteCommentTextArea' id='infoShareWriteCommentTextArea' cols='40' rows='3'></textarea>";
	infoShareSelectedContentCommentHtml += "<button id='infoShareCommentWriteBtn'>작성</button>";

    $("#infoShareSelectedContentCommentDiv").empty().append(infoShareSelectedContentCommentHtml);

    initInfoShareCommentEvent();
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

// 정보공유 글 작성 이벤트 초기화
function initInfoShareWriteContentEvent() {
    // 글 작성하기 버튼 클릭 시
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

// 정보공유 글 댓글 작성 이벤트 초기화
function initInfoShareCommentEvent() {
    // 댓글 작성 버튼 클릭 시
    $("#infoShareCommentWriteBtn").off("click").on("click", function(){
        if(commentWriteOption === "write") {
            if(confirm("작성하시겠습니까?")) {
                writeInfoShareComment();
            }
            else {
                alert("취소되었습니다.");
            }
        }
        else if(commentWriteOption === "update") {
            if(confirm("수정하시겠습니까?")) {
                writeInfoShareComment();
            }
            else {
                alert("취소되었습니다.");
            }
        }
    });

    $(".infoShareCommentUptBtn").off("click").on("click", function(){
        if(confirm("수정하시겠습니까?")) {
            commentWriteOption = "update";
            infoShareSelectedCommentId = this.previousElementSibling.id.substr(16);

            $("#infoShareWriteCommentTextArea").val(this.previousElementSibling.innerText.substr(4));
            $("#infoShareCommentWriteBtn").after("<button id='infoShareUpdateCancel'>취소</button>");
            
            // 수정 취소 버튼 클릭 시
            $("#infoShareUpdateCancel").off("click").on("click", function(){
                alert("수정 취소되었습니다.");
                getInfoShareContent();
            });
        }
        else {
            alert("취소되었습니다.");
        }  
    });

    // 댓글 삭제 버튼 클릭 시
    $(".infoShareCommentDelBtn").off("click").on("click", function(){
        if(confirm("삭제하시겠습니까?")) {
            infoShareSelectedCommentId = this.previousElementSibling.previousElementSibling.id.substr(16);

            deleteInfoShareComment();
        }
        else {
            alert("취소되었습니다.");
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// 기타 함수 //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
    TODO
    글을 지울 때 해당 글의 댓글들도 삭제하게 구현

    일단 ID는 ADMIN으로 설정
*/