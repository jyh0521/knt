//회원 관리 버튼 클릭 시
$("#memberMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("memberMng/memberMng.html", function () {
        
    });
});

//게시판 관리 버튼 클릭 시 
$("#noticeBrdMngBtn").off("click").on("click", function () {
    $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMng.html", function () {
        showNoticeBrdMng();
    });
});