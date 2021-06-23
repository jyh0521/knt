//ui 드롭다운 안먹힐때
window.onload = function () {
    $('.ui .dropdown').dropdown();
    
    // 학술국 공지사항 먼저 실행
    noticeBrd.initNoticeBrd();
};

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function () {
    // var state = {'page_id' : 'main.html'};
    // history.pushState(state, null, 'noticeBrd.html');

    noticeBrd.initNoticeBrd();
});

// 내 지원서 클릭 시
$('#myFormBtn').off('click').on('click', function(){
    var state = {'page_id' : noticeBrd.initNoticeBrd() };
    history.pushState(state, null, 'myForm.html');

    myForm.initMyForm();
});

/*
    TODO
    1. 학술국 소개 부분 작성, 일단 공지사항이 맨 처음 보이게 해둠
*/

// window.onpopstate = function(event) {
//     loadStateContent(event.state);
// }

// function loadStateContent(state) {
//     if(state != null) {
//         $("#menuFuncDiv").load(state.page_id, function () {
//             $("#kntNoticeBrd").css("display", "block");
//             $("#kntNoticeBrdWrite").css("display", "none");
//             $("#kntNoticeBrdContent").css("display", "none");
//             $("#UpdatekntNoticeBrdContent").css("display", "none");
//             $("#kntNoticeBrdComment").css("display", "none");
        
//             if(searchOrAll == "search"){ //검색 관련 리스트 불러오기
//                 getNoticeSearchListCount();
//             }
//             else{ //전체 리스트 불러오기
//                 getNoticeBrdListCount();
//             }
//         });
//     }
// }