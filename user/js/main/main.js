

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    shownotice();
});

//학술국 정보공유 클릭 시 
$("#informationBtn").off("click").on("click", function(){
    showinformation();
});


function shownotice(){
    $("#kntnotice").css("display", "block");

    $("#menuContent").empty().append("공지사항")
}

function showinformation(){
    $("#kntinformation").css("display", "block");
    
    var ContentHtml = "<p>학술국 정보공유<p>";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    $("#menuContent").empty().append(ContentHtml);
}


