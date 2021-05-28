/*
    TODO
    관리자 회원 관리 페이지 만들기
    기능
    1. 회원 정보 전체 띄우기(관리자 빼고 전부 다) - 아이디, 학번, 이름, 연락처, 권한, 가입 날짜, 스터디 그룹 o
    2. 권한이 Admin인 경우에만 회원 권한 설정할 수 있게 만들기 (셀렉트 박스 이용해서 - 일단 Undefine, Student, Leader, Admin)
    3. 스터디 그룹도 바꿀 수 있게(셀렉트 박스 사용 - STD001, STD002, STD003)
*/
let memberMngList = []; 

let memberMngContent = []; 

//회원 정보 게시판 보여주기
function showMemberMng(){
    $("#memberMngList").css("display", "block");
    
    getMemberMngListCount();
}

//회원 정보 목록 전체 데이터 수 불러오기 
function getMemberMngListCount(){
    requestData("/knt/mngr/php/main/memberMng/getMemberMngListCount.php").done(function(result){
        let memberListCount = String(result);//총 데이터 수

        DrawPaging(memberListCount, 10, 1, "memberMngPagingDiv",  getmemberdMngList);
    });
}

//게시판 목록 불러오기(아이디, 학번, 이름, 연락처, 권한, 가입 날짜, 스터디 그룹)
function getmemberdMngList(currentPage){
    let startrow = (currentPage - 1) * 10;
    let param = "startrow=" + startrow;

    requestData("/knt/mngr/php/main/memberMng/getMemberMngList.php", param).done(function(result){
        memberMngList = result;

        showMemberMngTable();
        showMemberMngList();
    });
}

//게시판 테이블
function showMemberMngTable(){
    let memberMngDivHtml= "";

    memberMngDivHtml += "<table border='1'>";
    memberMngDivHtml +=     "<thead>";
    memberMngDivHtml +=         "<tr>";
    memberMngDivHtml +=             "<td>ID</td>";
    memberMngDivHtml +=             "<td>학번</td>";
    memberMngDivHtml +=             "<td>이름</td>";
    memberMngDivHtml +=             "<td>연락처</td>";
    memberMngDivHtml +=             "<td>권한</td>";
    memberMngDivHtml +=             "<td>가입 날짜</td>";
    memberMngDivHtml +=             "<td>스터디 그룹</td>";
    memberMngDivHtml +=         "</tr>";
    memberMngDivHtml +=     "</thead>";
    memberMngDivHtml +=     "<tbody id='memberMngListTbody'>";
    memberMngDivHtml +=     "</tbody>";
    memberMngDivHtml += "</table>";

    $("#memberMngDiv").empty().append(memberMngDivHtml);
}

function showMemberMngList(){
    let memberMngListTbodyHtml = "";
    let memberMngListSize = memberMngList.length;

    for(let i = 0; i < memberMngListSize; i++) {
        memberMngListTbodyHtml += "<tr>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_ID"] + "</td>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_SID"] + "</td>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_NAME"] + "</td>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_PHONE"] + "</td>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_AUTH"] + "</td>";
        memberMngListTbodyHtml +=     "<td>" + cmpTimeStamp(memberMngList[i]["USR_DATE"]) + "</td>";
        memberMngListTbodyHtml +=     "<td>" + memberMngList[i]["USR_STD"] + "</td>";
        memberMngListTbodyHtml += "</tr>";
    }

    $("#memberMngListTbody").empty().append(memberMngListTbodyHtml);
}

