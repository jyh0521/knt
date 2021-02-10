//study a 클릭 시
$("#studyaBtn").off("click").on("click", function(){
    $("#studyABoard").css("display", "block");
    $("#studyBBoard").css("display", "none");
    $("#studyCBoard").css("display", "none");

    initStudyGroupABoard();
});
//study b 클릭 시
$("#studybBtn").off("click").on("click", function(){
    $("#studyBBoard").css("display", "block");
    $("#studyABoard").css("display", "none");
    $("#studyCBoard").css("display", "none");

    initStudyGroupBBoard();
});
//study c 클릭 시
$("#studycBtn").off("click").on("click", function(){
    $("#studyCBoard").css("display", "block");
    $("#studyBBoard").css("display", "none");
    $("#studyABoard").css("display", "none");

    initStudyGroupCBoard();
});

//스터디A 게시물 목록 보여주기
function initStudyGroupABoard(){
    $("#studyATable").css("display", "block");
    $("#studyAContentOfWriting").css("display", "none");
    $("#studyAWriting").css("display", "none");

    getStudyAList();
};
//study b 게시물 목록 보여주기
function initStudyGroupBBoard(){
    $("#studyBTable").css("display", "block");
    $("#studyBContentOfWriting").css("display", "none");
    $("#studyBWriting").css("display", "none");

    getStudyBList();
};
//study c 게시물 목록 보여주기
function initStudyGroupCBoard(){
    $("#studyCTable").css("display", "block");
    $("#studyCContentOfWriting").css("display", "none");
    $("#studyCWriting").css("display", "none");

    getStudyCList();
};


let studyAList = [];

//study a 게시물 불러오기
function getStudyAList() {
    requestData("/knt/user/php/main/studyBrd/studyBrdListA.php").done(function(result){
        studyAList = result;

        showStudyATable();
        showStudyAList();
    });
}

//study a 테이블
function showStudyATable() {
    let studyATableHtml = "";
    
    studyATableHtml += "<table border='1'>";
    studyATableHtml +=     "<thead>";
    studyATableHtml +=         "<tr>";
    studyATableHtml +=            "<th>번호</th>";
    studyATableHtml +=            "<th>제목</th>";
    studyATableHtml +=            "<th>작성자</th>";
    studyATableHtml +=            "<th>작성일</th>";
    studyATableHtml +=            "<th>조회수</th>";
    studyATableHtml +=         "</tr>";
    studyATableHtml +=     "</thead>";
    studyATableHtml +=     "<tbody id='studyAtbody'>";
    studyATableHtml +=     "</tbody>";
    studyATableHtml += "</table>";
    studyATableHtml += "<button id='studyAWriteBtn'>글쓰기</button>";
    
    $("#studyATable").empty().append(studyATableHtml);

    //study a 글쓰기 버튼 클릭
    $("#studyAWriteBtn").off("click").on("click", function(){
        $("#studyATable").css("display", "none");
        $("#studyAContentOfWriting").css("display", "none");
        $("#studyAWriting").css("display", "block");

        setStudyAContent();
    });
}

//study a 게시물 리스트
function showStudyAList() {
    let studyAListHtml = "";
    let studyAListLength = studyAList.length;

    for(let i=0; i<studyAListLength; i++) {
        studyAListHtml +=   "<tr>";
        studyAListHtml +=       "<td>" + (i+1) + "</td>";
        studyAListHtml +=       "<td id='studyATitleBtn'>" + studyAList[i]['BRD_TITLE'] + "</td>";
        studyAListHtml +=       "<td>" + studyAList[i]['BRD_WRITER'] + "</td>";
        studyAListHtml +=       "<td>" + studyAList[i]['BRD_DATE'] + "</td>";
        studyAListHtml +=       "<td>" + studyAList[i]['BRD_HIT'] + "</td>";
        studyAListHtml +=   "</tr>";
    }

    $("#studyAtbody").empty().append(studyAListHtml);

    $("#studyATitleBtn").off("click").on("click", function(){
        $("#studyATable").css("display", "none");
        $("#studyAContentOfWriting").css("display", "block");
        $("#studyAWriting").css("display", "none");
    })
}

//study a 작성된 글 저장
function writeStudyAContent() {
    let title = $("#writeStudyAContentTitle").val();
    let content = $("#writeStudyAContentText").val();

    let param = "title=" + title + "&content=" + content;

    requestData("/knt/user/php/main/studyBrd/writeStudyAContent.php", param).done(function(result){
        if(result === true) {
            alert("작성되었습니다.");
        }
        else {
            alert("오류");
        }
    });
}

//study a 글쓰기 
function setStudyAContent() {
    let setStudyAContentHtml = "";

    setStudyAContentHtml += "<p>";
    setStudyAContentHtml +=   "<label for='wirteStudyAContentTitle'>제목</label>";
    setStudyAContentHtml +=   "<input id='writeStudyAContentTitle'>";
    setStudyAContentHtml += "</p>";
    setStudyAContentHtml += "<p>";
    setStudyAContentHtml +=   "<label for='wirteStudyAContentText'>내용</label>";
    setStudyAContentHtml +=   "<textarea id='writeStudyAContentText' cols='55' rows='12'></textarea>";
    setStudyAContentHtml += "</p>";
    setStudyAContentHtml += "<p>";
    setStudyAContentHtml +=    "<button id='writeStudyAContentBtn'>작성</button>";
    setStudyAContentHtml +=    "<button id='cancelStudyAContentBtn'>취소</button>";
    setStudyAContentHtml += "</p>";

    $("#studyAWriting").empty().append(setStudyAContentHtml);

    //작성 버튼 클릭 시
    $("#writeStudyAContentBtn").off("click").on("click", function(){
        writeStudyAContent();

        $("#studyATable").css("display", "block");
        $("#studyAWriting").css("display", "none");
        $("#studyAContentOfWriting").css("display", "none");
    });

    //취소 버튼 클릭 시
    $("#cancelStudyAContentBtn").off("click").on("click", function(){
        $("#studyATable").css("display", "block");
        $("#studyAWriting").css("display", "none");
        $("#studyAContentOfWriting").css("display", "none");
    });
}