//ui 드롭다운 안먹힐때
window.onload = function () {
    $('.ui .dropdown').dropdown();
};

//학술국 공지사항 클릭 시
$("#noticeBtn").off("click").on("click", function () {
    // var state = {'page_id' : 'main.html'};
    // history.pushState(state, null, 'noticeBrd.html');

    noticeBrd.initNoticeBrd();
});

// 내 지원서 클릭 시
$('#myFormBtn').off('click').on('click', function(){
    // var state = {'page_id' : 'main.html'};
    // history.pushState(state, null, 'myForm.html');

    myForm.initMyForm();
});

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

/*
    TODO
    1. init 함수 안에 .load 넣기
*/


////////////////////////////////////////////////////////////////////////// 삭제 예정 //////////////////////////////////////////////////////////////////////////////////

// //세션값 확인 후 인증 세션이 없으면, 해당페이지 확인 불가. LOGIN.HTML로 이동
// // -> 메인에서 로그인 할 수 있게 수정, 로그인 안되있으면 login 버튼 출력, 로그인 되있으면 logout 버튼 출력
// if (sessionStorage.getItem("loginUser") == null) {
//     // alert("세션이 존재하지 않습니다. 로그인 페이지로 돌아갑니다.")
//     // location.replace('/knt/user/html/login/login.html');
//     let beforeLoginHtm = "";
//     beforeLoginHtm += '<a href="#" type="button" id="loginBtn" class="item" onclick="location.href=\'/knt/user/html/login/login.html\'">Login</a>';
//     beforeLoginHtm += '<a href="#" type="button" id="joinBtn" class="item">Join</a>'; 

//     $("#usrMenu").empty().append(beforeLoginHtm);
// } else {
//     let afterLoginHtml = "";
//     afterLoginHtml += '<a href="#" type="button" id="logoutBtn" class="item">Logout</a>';
//     afterLoginHtml += '<a href="#" type="button" id="myGroup" class="item">My Group</a>';
//     afterLoginHtml += '<a href="#" type="button" id="myInfo" class="item">My Page</a>';
    
//     // 관리자가 접속했다면, 관리자 페이지 버튼 생성
//     /*
//         TODO
//         1. ID가 ADMIN일 경우가 아니라 사용자 권한이 Admin 일 경우로 수정(현재는 id가 ADMIN인 경우)
//     */
//         if(sessionStorage.getItem("loginUser") == 'ADMIN') {
//             afterLoginHtml += '<a href="#" type="button" id="mngrPageBtn" class="item">Manager Page</a>'
//         }
    
//         $("#usrMenu").empty().append(afterLoginHtml);
//     }
    
    
//     //상단 버튼 제어
//     //Join 버튼 클릭 시
//     $("#joinBtn").off("click").on("click", function () {
//         $("#menuFuncDiv").load("/knt/user/html/login/signup.html", function () {
//             getSignUp();
//         });
//     });
    
//     //1. 홈버튼 클릭
//     $("#homeBtn").off("click").on("click", function () {
//         location.replace('/knt/user/html/main/main.html');
//     });
    
//     //2. 그룹명 클릭 >> 로그인 시 세션에 그룹값도 myGroup이라는 키에 넣어주고, 
//     //상단의 myGroup 버튼 클릭 시 "~어떤 그룹입니다."라는 메세지와 함께 해당 그룹 페이지로 이동.
//     $("#myGroup").off("click").on("click", function () {
//         let param = "id=" + id;
//         requestData("/knt/user/php/login/getmyInfo.php", param).done(function (result) {
//             stdGroup = result[0]["USR_STD"]
//         });       
//         alert("회원님께서 속한 그룹은 "+ stdGroup +"입니다.");
//     });
    
//     //3-1. 마이페이지 메뉴 클릭 시
//     $("#myInfo").off("click").on("click", function () {
//         $("#menuFuncDiv").load("myPage/myPage.html", function () {
//             getmyInfo();
//         })
//     });
    
//     //4. 로그아웃 클릭
//     $("#logoutBtn").off("click").on("click", function () {
//         let OK;
//         OK = confirm("로그아웃 하시겠습니까?");
//         if (OK) {
//             alert("로그아웃합니다.");
//             sessionStorage.removeItem("loginUser");
//             location.replace('/knt/user/html/main/main.html');
//         }
//     });
    
//     //5. 관리자 페이지 클릭 시
//     $("#mngrPageBtn").off("click").on("click", function () {
//         location.replace('/knt/mngr/html/main/main.html');
//     });

// 지원서 작성하기 클릭 시
// $('#formWriteBtn').off('click').on('click', function(){
//     $('#menuFuncDiv').load('formWrite/formWrite.html', function(){
//         initFormWrite();
//     });
// });

// //학술국 정보공유 클릭 시 
// $("#infoShareBtn").off("click").on("click", function () {
//     $("#studyGroupList").css("display", "none");
//     $("#menuFuncDiv").load("infoShareBrd/infoShareBrd.html", function () {
//         initInfoShare();
//     });
// });

// //학술국 스터디 클릭 시
// $("#studyBtn").off("click").on("click", function () {
//     $("#studyGroupList").css("display", "block");
// });

// $(".studyGroup").off("click").on("click", function () {
//     studyGroup = this.id;

//     $("#menuFuncDiv").load("studyBrd/studyBrd.html", function () {
//         initStudyGroupBoard(studyGroup);
//     });
// })