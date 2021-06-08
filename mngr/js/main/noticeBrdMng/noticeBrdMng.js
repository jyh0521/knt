let noticeBrdMngList = []; 

let noticeBrdMngContent = [];
let selectedId = ''; 

// 게시판 보여주기
function showNoticeBrdMng(){
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

// 게시판 내용 작성하기
function setNoticeBrdMngContent(param) {
    requestData('/knt/mngr/php/main/noticeBrdMng/setNoticeBrdMngContent.php', param).done(function(result){
        if(result){
            alert('작성 되었습니다.');
            showNoticeBrdMng();
        }
        else{
            alert('작성 실패하였습니다.');
        }
    });
}

// 게시판 내용 수정하기
function updateNoticeBrdMngContent(param) {
    requestData('/knt/mngr/php/main/noticeBrdMng/updateNoticeBrdMngContent.php', param).done(function(result){
        if(result){
            alert('수정 되었습니다.');
            showNoticeBrdMng();
        }
        else{
            alert('수정 실패하였습니다.');
        }
    });
}

// 게시판 내용 삭제하기
function delNoticeBrdMngContent(param) {
    requestData('/knt/mngr/php/main/noticeBrdMng/delNoticeBrdMngContent.php', param).done(function(result){
        if(result){
            alert('삭제 되었습니다.');
            showNoticeBrdMng();
        }
        else{
            alert('삭제 실패하였습니다.');
        }
    });
}

// 공지사항 리스트 보여주기
function showNoticeBrdMngList(currentPage){
    $('#noticeBrdMngTableDiv').css('display', 'block');
    $('#noticeBrdMngShowContentDiv').css('display', 'none');
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
    $('#noticeBrdMngShowContentDiv').css('display', 'block');
    $('#noticeBrdMngWriteDiv').css('display', 'none');

    let noticeBrdMngContentDivHtml = "";

    noticeBrdMngContentDivHtml += "<p>제목 : " + noticeBrdMngContent['BRD_TITLE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성자 : " + noticeBrdMngContent['BRD_WRITER'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>작성일 : " + noticeBrdMngContent['BRD_DATE'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>조회수 : " + noticeBrdMngContent['BRD_HIT'] + "</p>"
    noticeBrdMngContentDivHtml += "<p>내용 : " + noticeBrdMngContent['BRD_CONTENT'] + "</p>"
    
    $("#noticeBrdMngContentDiv").empty().append(noticeBrdMngContentDivHtml);

    initNoticeBrdMngContentBtnEvent();
}

// 게시판 글 쓰기 화면 보여주기
function showNoticeBrdMngWrite(param, mode) {
    $('#noticeBrdMngTableDiv').css('display', 'none');
    $('#noticeBrdMngShowContentDiv').css('display', 'none');
    $('#noticeBrdMngWriteDiv').css('display', 'block');

    let noticeBrdMngWriteHtml = '';

    // 글 작성 시
    if(mode === 'write') {
        noticeBrdMngWriteHtml += '<button id="noticeBrdMngWriteContentBtn">작성</button>';
    }
    // 글 수정 시
    else {
        $('#noticeBrdMngWriteTitle').val(param['title']);
        $('#noticeBrdMngWriteContent').val(param['content']);
        noticeBrdMngWriteHtml += '<button id="noticeBrdMngWriteUpdateContentBtn">수정</button>';
    }

    noticeBrdMngWriteHtml += '<button class="noticeBrdMngWriteBackBtn">뒤로</button>';
    
    $('#noticeBrdMngWriteBtnDiv').empty().append(noticeBrdMngWriteHtml);

    initNoticeBrdMngWriteEvent();
}

// 공지사항 리스트 이벤트
function initNoticeBrdMngListEvent() {
    // 공지사항 리스트 클릭 시
    $('.noticeBrdListTr').off('click').on('click', function(){
        let id = this.id.substr(15);
        selectedId = id;
        getNoticeBrdMngContent(id);
    });

    // 글 쓰기 클릭 시
    $('#noticeBrdMngWriteBtn').off('click').on('click', function(){
        showNoticeBrdMngWrite('write');
    });
}

// 공지사항 작성 이벤트
function initNoticeBrdMngWriteEvent() {
    // 작성 버튼 클릭 시
    $('#noticeBrdMngWriteContentBtn').off('click').on('click', function(){
        let title = $('#noticeBrdMngWriteTitle').val();
        let content = $('#noticeBrdMngWriteContent').val();
        let date = getTimeStamp(new Date()); // 날짜 getTimeStamp() : YYYY-MM-DD hh:mm:ss형식으로 저장

        if(confirm('작성 하시겠습니까?')) {
            let param = "writer=ADMIN" + "&title=" + title + "&content=" + content + "&date=" + date;
            setNoticeBrdMngContent(param);
        }
        else {
            alert('취소 되었습니다.');
        }
    });

    // 수정 버튼 클릭 시
    $('#noticeBrdMngWriteUpdateContentBtn').off('click').on('click', function(){
        let title = $('#noticeBrdMngWriteTitle').val();
        let content = $('#noticeBrdMngWriteContent').val();
        let date = getTimeStamp(new Date()); // 날짜 getTimeStamp() : YYYY-MM-DD hh:mm:ss형식으로 저장

        if(confirm('수정 하시겠습니까?')) {
            let param = 'id=' + selectedId + '&writer=ADMIN' + '&title=' + title + '&content=' + content + '&date=' + date;
            updateNoticeBrdMngContent(param);
        }
        else {
            alert('취소 되었습니다.');
        }
    });

    // 뒤로 버튼 클릭 시
    $('#noticeBrdMngWriteBackBtn').off('click').on('click', function(){
        showNoticeBrdMng();
    });
}

// 공지사항 내용 이벤트
function initNoticeBrdMngContentBtnEvent() {
    // 수정 버튼 클릭 시
    $('#noticeBrdMngContentUpdateBtn').off('click').on('click', function(){
        let param = [];
        param['title'] = noticeBrdMngContent['BRD_TITLE'];
        param['content'] = noticeBrdMngContent['BRD_CONTENT'];
        showNoticeBrdMngWrite(param, 'update');
    });

    // 삭제 버튼 클릭 시
    $('#noticeBrdMngContentDeleteBtn').off('click').on('click', function(){
        if(confirm('삭제 하시겠습니까?')) {
            let param = 'id=' + selectedId;
            delNoticeBrdMngContent(param);
        }
        else {
            alert('취소 되었습니다.');
        }
    });

    // 뒤로 버튼 클릭 시
    $('#noticeBrdMngContentBackBtn').off('click').on('click', function(){
        showNoticeBrdMng();
    });
}

/*
    TODO
    1. 코드 리펙토링(전역변수 줄이고 파라미터 사용하기)
    2. "" -> ''로 수정  
*/