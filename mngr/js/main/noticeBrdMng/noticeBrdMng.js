let noticeBrdMngList = []; 

let noticeBrdMngContentListId = "";
let noticeBrdMngContent = []; 

//게시판 보여주기
function showNoticeBrdMng(){
    $("#noticeBrdMngList").css("display", "block");
    $("#noticeBrdMngContent").css("display", "none");
    
    getNoticeBrdMngListCount();
}

//목록 전체 데이터 수 불러오기 
function getNoticeBrdMngListCount(){
    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngListCount.php").done(function(result){
        DrawPaging(result['COUNT'], 10, 1, "noticeBrdMngPagingDiv",  getNoticeBrdMngList);
    });
}

//게시판 목록 불러오기(id, 제목, 작성자, 작성일, 삭제여부)
function getNoticeBrdMngList(currentPage){
    let startrow = (currentPage - 1) * 10;
    let param = "startrow=" + startrow;

    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngList.php", param).done(function(result){
        noticeBrdMngList = result;

        showNoticeBrdMngTable();
        showNoticeBrdMngList(currentPage);
    });
}

//게시판 내용 데이터 불러오기
function getNoticeBrdMngContent(){
    let param = "id=" + noticeBrdMngContentListId; 

    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngContent.php",param).done(function(result){
        $("#noticeBrdMngContent").css("display", "block");
        $("#noticeBrdMngList").css("display", "none");
        noticeBrdMngContent = result;

        showNoticeBrdMngContent();//내용 보여주기
    });
}
//게시판 테이블
function showNoticeBrdMngTable(){
    let noticeBrdMngDivHtml= "";

    noticeBrdMngDivHtml += "<table border='1'>";
    noticeBrdMngDivHtml +=     "<thead>";
    noticeBrdMngDivHtml +=         "<tr>";
    noticeBrdMngDivHtml +=             "<td>번호</td>";
    noticeBrdMngDivHtml +=             "<td>제목</td>";
    noticeBrdMngDivHtml +=             "<td>작성일</td>";
    noticeBrdMngDivHtml +=         "</tr>";
    noticeBrdMngDivHtml +=     "</thead>";
    noticeBrdMngDivHtml +=     "<tbody id='noticeBrdMngListTbody'>";
    noticeBrdMngDivHtml +=     "</tbody>";
    noticeBrdMngDivHtml += "</table>";

    $("#noticeBrdMngDiv").empty().append(noticeBrdMngDivHtml);
}

function showNoticeBrdMngList(currentPage){
    let noticeBrdMngListTbodyHtml = "";
    let noticeBrdMngListSize = noticeBrdMngList.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < noticeBrdMngListSize; i++) {
        noticeBrdMngListTbodyHtml += "<tr>";
        noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListNum">' + (startDataIndex + i) + '</td>';
        noticeBrdMngListTbodyHtml +=     "<td>" + noticeBrdMngList[i]["BRD_TITLE"] + "</td>";
        noticeBrdMngListTbodyHtml +=     "<td>" + cmpTimeStamp(noticeBrdMngList[i]["BRD_DATE"]) + "</td>";
        noticeBrdMngListTbodyHtml += "</tr>";
    }

    $("#noticeBrdMngListTbody").empty().append(noticeBrdMngListTbodyHtml);

    //내용 버튼 클릭 시
    $(".noticeBrdMngContentBtn").off("click").on("click", function(){
        noticeBrdMngContentListId = this.id.substr(25);
        
        getNoticeBrdMngContent(); //게시판 내용 데이터 불러오기
    });
}

//게시판 내용 보여주기
function showNoticeBrdMngContent(){
    let noticeBrdMngContentDivHtml = "";

    noticeBrdMngContentDivHtml += "<p>제목 : " + noticeBrdMngContent['BRD_TITLE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성자 : " + noticeBrdMngContent['BRD_WRITER'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성일 : " + noticeBrdMngContent['BRD_DATE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>조회수 : " + noticeBrdMngContent['BRD_HIT'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>내용 : " + noticeBrdMngContent['BRD_CONTENT'] + "</p>"
    
    $("#noticeBrdMngContentDiv").empty().append(noticeBrdMngContentDivHtml);
    
    //목록 버튼 클릭 시(뒤로가기)
    $("#noticeBrdMngContentBackBtn").off("click").on("click", function(){
        showNoticeBrdMng();
    });
}

/*
    TODO
    1. 코드 리펙토링(전역변수 줄이고 파라미터 사용하기)
    2. 테이블은 html로 그리기  
*/