let nowPage = '';

//ui 드롭다운 안먹힐때
window.onload = function () {
    $('.ui .dropdown').dropdown();
    
    // 학술국 공지사항 먼저 실행
    noticeBrd.initNoticeBrd();
};

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function () {
    noticeBrd.initNoticeBrd();
});

// 내 지원서 클릭 시
$('#myFormBtn').off('click').on('click', function(){
    myForm.initMyForm();
});

/*
    TODO
    1. 학술국 소개 부분 작성, 일단 공지사항이 맨 처음 보이게 해둠
*/

window.onpopstate = function(event) {
    loadStateContent(event.state);
}

function loadStateContent(state) {
    if(state != null) {
        if(state.page_id === 'noticeBrd') {
            noticeBrd.initNoticeBrd();
        }
        else if(state.page_id === 'myForm') {
            myForm.initMyForm();
        }
    }
}