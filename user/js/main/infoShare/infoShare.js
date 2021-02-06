////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var infoShareList = [];
var infoShareSelectedContent = [];

var infoShareSelectedListId = "";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 ////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 게시판 초기화 함수
function initInfoShare(){
    $("#infoShare").css("display", "block");
    $("#kntNotice").css("display", "none");
    $("#kntNoticeWrite").css("display", "none");
    $("#kntStudy").css("display", "none");

    $("#infoShareTableDiv").css("display", "block");
    $("#infoShareContentDiv").css("display", "none");

    getInfoShareList();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 데이터 불러오기 //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 불러오기
function getInfoShareList() {
    requestData("/knt/user/php/main/infoShare/getInfoShareList.php").done(function(result){
        infoShareList = result;

        drawInfoShareTable();
        drawInfoShareList();
        initInfoShareListEvent();
    });
}

// 정보공유 선택된 글 내용 불러오기
function getInfoShareContent() {
    var param = "id=" + infoShareSelectedListId;

    // 선택된 글의 id로 데이터 요청
    requestData("/knt/user/php/main/infoShare/getInfoShareContent.php", param).done(function(result){
        infoShareSelectedContent = result;

        drawInfoShareSelectedContent();
        initInfoShareSelectedContentEvent();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 화면에 그리기 ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 정보공유 글 리스트 테이블 그리기
function drawInfoShareTable() {
    var infoShareTableHtml = "";

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
    var infoShareListHtml = "";
    var infoShareListSize = infoShareList.length;

    for(var i = 0; i < infoShareListSize; i++) {
        infoShareListHtml += "<tr>";
        infoShareListHtml +=     "<td>" + (i + 1) + "</td>";
        infoShareListHtml +=     "<td class='infoShareListTitle' id='infoShareListID"+ infoShareList[i]["BRD_ID"] +"'>" + infoShareList[i]["BRD_TITLE"] + "</td>";
        infoShareListHtml +=     "<td>" + infoShareList[i]["BRD_WRITER"] + "</td>";
        infoShareListHtml +=     "<td>" + infoShareList[i]["BRD_DATE"] + "</td>";
        infoShareListHtml +=     "<td>" + infoShareList[i]["BRD_HIT"] + "</td>";
        infoShareListHtml += "</tr>";
    }

    $("#infoShareListTbodyDiv").empty().append(infoShareListHtml);
}

function drawInfoShareSelectedContent() {
    var infoShareSelectedContentHtml = "";
    var infoShareSelectedContentSize = infoShareSelectedContent.length;

    for(var i = 0; i < infoShareSelectedContentSize; i++) {
        infoShareSelectedContentHtml += "<p>제목: " + infoShareSelectedContent[0]["BRD_TITLE"] + "</p>";
        infoShareSelectedContentHtml += "<p>내용: " + infoShareSelectedContent[0]["BRD_CONTENT"]  + "</p>";
        infoShareSelectedContentHtml += "<p>작성자: " + infoShareSelectedContent[0]["BRD_WRITER"]  + "</p>";
        infoShareSelectedContentHtml += "<p>작성일: " + infoShareSelectedContent[0]["BRD_DATE"]  + "</p>";
        infoShareSelectedContentHtml += "<p>조회수: " + infoShareSelectedContent[0]["BRD_HIT"]  + "</p>";
        infoShareSelectedContentHtml += "<button id='infoShareSelectedContentBackBtn'>뒤로</button>";
    }
    
    $("#infoShareTableDiv").css("display", "none");
    $("#infoShareContentDiv").css("display", "block");

    $("#infoShareContentDiv").empty().append(infoShareSelectedContentHtml);
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

    // 글 작성 버튼 클릭 시
    $("#infoShareListWriteBtn").off("click").on("click", function(){
        
    });
}

// 정보공유 선택된 글 이벤트 초기화
function initInfoShareSelectedContentEvent() {
    // 뒤로 버튼 클릭 시
    $("#infoShareSelectedContentBackBtn").off("click").on("click", function(){
        initInfoShare();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// 기타 함수 //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////