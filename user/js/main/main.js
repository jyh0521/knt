//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#studyGroup").css("display", "none");
    $("#menuFuncDiv").load("noticeBrd/noticeBrd.html");

    showBtn();
    getNoticeList();
});

//학술국 정보공유 클릭 시 
$("#infoShareBtn").off("click").on("click", function(){
    $("#studyGroup").css("display", "none");
    $("#menuFuncDiv").load("infoShareBrd/infoShareBrd.html");
  
    initInfoShare();
});

//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function(){
    $("#studyGroup").css("display", "block");
    $("#menuFuncDiv").load("studyBrd/studyBrd.html");
});//그룹 리스트 보여주기
