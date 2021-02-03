
//학술국 소개 클릭 시
$("#introduceBtn").off("click").on("click", function(){
    showintroduce();
});

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function(){
    shownotice();
});

//학술국 정보공유 클릭 시 
$("#informationBtn").off("click").on("click", function(){
    showinformation();
});

function showintroduce(){
    //$("#menuContent").innerHTML = "학술국 소개"; 이거 왜 안돼
    document.querySelector('#menuContent').innerHTML = "학술국 소개......어쩌구";
}

function shownotice(){
    document.querySelector('#menuContent').innerHTML = "공지사항";
}

function showinformation(){
    var ContentHtml = "<p>학술국 정보공유<p>";
    ContentHtml += "<button id='writeBtn'>글쓰기</button>";
    document.querySelector('#menuContent').innerHTML = ContentHtml;
}


