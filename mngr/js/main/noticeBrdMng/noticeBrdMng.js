let noticeBrdMngList = []; 

let noticeBrdMngContent = []; 

// 게시판 보여주기
function showNoticeBrdMng(){
    $("#noticeBrdMngList").css("display", "block");
    $("#noticeBrdMngContent").css("display", "none");
    
    getNoticeBrdMngListCount();
}

// 목록 전체 데이터 수 불러오기 
function getNoticeBrdMngListCount(){
    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngListCount.php").done(function(result){
        DrawPaging(result['COUNT'], 10, 1, "noticeBrdMngPagingDiv",  getNoticeBrdMngList);
    });
}

// 게시판 목록 불러오기(id, 제목, 작성자, 작성일, 삭제여부)
function getNoticeBrdMngList(currentPage){
    let startrow = (currentPage - 1) * 10;
    let param = "startrow=" + startrow;

    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngList.php", param).done(function(result){
        noticeBrdMngList = result;
        showNoticeBrdMngList(currentPage);
    });
}

// 게시판 내용 데이터 불러오기
function getNoticeBrdMngContent(id){
    let param = "id=" + id; 

    requestData("/knt/mngr/php/main/noticeBrdMng/getNoticeBrdMngContent.php",param).done(function(result){
        $("#noticeBrdMngContent").css("display", "block");
        $("#noticeBrdMngList").css("display", "none");
        noticeBrdMngContent = result;

        showNoticeBrdMngContent();//내용 보여주기
    });
}

// 공지사항 리스트 보여주기
function showNoticeBrdMngList(currentPage){
    $('#noticeBrdMngTableDiv').css('display', 'block');
    $('#noticeBrdMngContentDiv').css('display', 'none');
    $('#noticeBrdMngWriteDiv').css('display', 'none');

    let noticeBrdMngListTbodyHtml = "";
    let noticeBrdMngListSize = noticeBrdMngList.length;
    let startDataIndex = currentPage * 10 - 10 + 1;

    for(let i = 0; i < noticeBrdMngListSize; i++) {
        noticeBrdMngListTbodyHtml += '<tr class="noticeBrdListTr" id="noticeBrdListId' + noticeBrdMngList[i]['BRD_ID'] + '">';
        noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListNum">' + (startDataIndex + i) + '</td>';
        noticeBrdMngListTbodyHtml +=     '<td class="noticeBrdListTitle">' + noticeBrdMngList[i]['BRD_TITLE'] + '</td>';
        noticeBrdMngListTbodyHtml +=     "<td>" + cmpTimeStamp(noticeBrdMngList[i]["BRD_DATE"]) + "</td>";
        noticeBrdMngListTbodyHtml += "</tr>";
    }

    $("#noticeBrdMngListTbody").empty().append(noticeBrdMngListTbodyHtml);

    initNoticeBrdMngListEvent();
}

// 게시판 내용 보여주기
function showNoticeBrdMngContent(){
    $('#noticeBrdMngTableDiv').css('display', 'none');
    $('#noticeBrdMngContentDiv').css('display', 'block');
    $('#noticeBrdMngWriteDiv').css('display', 'none');

    let noticeBrdMngContentDivHtml = "";

    noticeBrdMngContentDivHtml += "<p>제목 : " + noticeBrdMngContent['BRD_TITLE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성자 : " + noticeBrdMngContent['BRD_WRITER'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성일 : " + noticeBrdMngContent['BRD_DATE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>조회수 : " + noticeBrdMngContent['BRD_HIT'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>내용 : " + noticeBrdMngContent['BRD_CONTENT'] + "</p>"
    
    $("#noticeBrdMngContentDiv").empty().append(noticeBrdMngContentDivHtml);
    
    // 목록 버튼 클릭 시(뒤로가기)
    $("#noticeBrdMngContentBackBtn").off("click").on("click", function(){
        showNoticeBrdMng();
    });
}

// 공지사항 리스트 이벤트
function initNoticeBrdMngListEvent() {
    $('.noticeBrdListTr').off('click').on('click', function(){
        let id = this.id.substr(15);
        getNoticeBrdMngContent(id);
    });
}

/*
    TODO
    1. 코드 리펙토링(전역변수 줄이고 파라미터 사용하기)
    2. 테이블은 html로 그리기
    3. "" -> ''로 수정  
*/