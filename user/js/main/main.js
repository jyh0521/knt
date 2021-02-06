//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    $("#studyGroupList").css("display", "none");
    $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function(){
        showNoticeBrd();
    });
});

//학술국 정보공유 클릭 시 
$("#infoShareBtn").off("click").on("click", function(){
    $("#studyGroupList").css("display", "none");
    $("#menuFuncDiv").load("infoShareBrd/infoShareBrd.html", function(){
        initInfoShare();
    });
});

//학술국 스터디 클릭 시
$("#studyBtn").off("click").on("click", function(){
    $("#studyGroupList").css("display", "block");
    $("#menuFuncDiv").load("studyBrd/studyBrd.html", function(){
    });
});//그룹 리스트 보여주기
