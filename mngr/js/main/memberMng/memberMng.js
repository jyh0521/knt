
let memberMngList = []; 

let memberMngContent = []; 

let selectMemberAuthId = ""; //권한이 변경되는 아이디
let selectMemberAuthOption = ""; //선택된 권한 옵션

let selectMemberStudyId = ""; //스터디가 변경되는 아이디
let selectMemberStudyOption = ""; //선택된 스터디 옵션

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

//권한 변경(수정) 하기
function updateMemberAuth(){
    let param = "selectMemberAuthId=" + selectMemberAuthId + "&selectMemberAuthOption=" + selectMemberAuthOption;

    requestData("/knt/mngr/php/main/memberMng/updateMemberAuth.php", param).done(function(result){

        showMemberMng()
    });
}

//스터디 변경(수정) 하기
function updateMemberStudy(){
    let param = 'selectMemberStudyId=' + selectMemberStudyId + '&selectMemberStudyOption=' + selectMemberStudyOption;

    requestData("/knt/mngr/php/main/memberMng/updateMemberStudy.php", param).done(function(result){

        showMemberMng()
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

        //권한 select box
        memberMngListTbodyHtml +=     "<td><select class = 'selectMemberAuth' id = 'selectMemberAuthId"+ memberMngList[i]["USR_ID"]+"'>";
        if(memberMngList[i]["USR_AUTH"] == "Undefined"){ 
            memberMngListTbodyHtml +=           "<option value='Undefined' selected>Undefined</option>";
            memberMngListTbodyHtml +=           "<option value='Student'>Student</option>";
            memberMngListTbodyHtml +=           "<option value='Leader'>Leader</option>";
        }
        else if(memberMngList[i]["USR_AUTH"] == "Student"){
            memberMngListTbodyHtml +=           "<option value='Undefined'>Undefined</option>";
            memberMngListTbodyHtml +=           "<option value='Student' selected>Student</option>";
            memberMngListTbodyHtml +=           "<option value='Leader'>Leader</option>";
            }
        else{
            memberMngListTbodyHtml +=           "<option value='Undefined'>Undefined</option>";
            memberMngListTbodyHtml +=           "<option value='Student'>Student</option>";
            memberMngListTbodyHtml +=           "<option value='Leader' selected>Leader</option>";
        }
        memberMngListTbodyHtml +=     "</select></td>"

        memberMngListTbodyHtml +=     "<td>" + cmpTimeStamp(memberMngList[i]["USR_DATE"]) + "</td>";

        //스터디 select box
        memberMngListTbodyHtml +=     '<td><select class = "selectMemberStudy" id = "selectMemberStudyId'+ memberMngList[i]['USR_ID']+'">';
        if(memberMngList[i]['USR_STD'] == 'STD_001'){ 
            memberMngListTbodyHtml +=           '<option value="STD_001" selected>STD_001</option>';
            memberMngListTbodyHtml +=           '<option value="STD_002">STD_002</option>';
            memberMngListTbodyHtml +=           '<option value="STD_003">STD_003</option>';
        }
        else if(memberMngList[i]['USR_STD'] == 'STD_002'){
            memberMngListTbodyHtml +=           '<option value="STD_001">STD_001</option>';
            memberMngListTbodyHtml +=           '<option value="STD_002" selected>STD_002</option>';
            memberMngListTbodyHtml +=           '<option value="STD_003">STD_003</option>';
            }
        else{
            memberMngListTbodyHtml +=           '<option value="STD_001">STD_001</option>';
            memberMngListTbodyHtml +=           '<option value="STD_002">STD_002</option>';
            memberMngListTbodyHtml +=           '<option value="STD_003"selected>STD_003</option>';
        }
        memberMngListTbodyHtml +=     '</select></td>'

        memberMngListTbodyHtml += '</tr>';
    }

    $('#memberMngListTbody').empty().append(memberMngListTbodyHtml);

    //권한 셀렉트 박스 특정 옵션 선택 시
    $(document).ready(function() {
        $('.selectMemberAuth').change(function() {
            selectMemberAuthId = this.id.substr(18); //아이디
            selectMemberAuthOption = this.value; //선택된 옵션

            updateMemberAuth(); //권한 변경
        }); 
    }); 

    //스터디 셀렉트 박스 특정 옵션 선택 시
    $(document).ready(function() {
        $('.selectMemberStudy').change(function() {
            selectMemberStudyId = this.id.substr(19); //아이디
            selectMemberStudyOption = this.value; //선택된 옵션

            updateMemberStudy(); //스터디 변경
        }); 
    }); 
}

/*
    TODO
    관리자 회원 관리 페이지 만들기
    기능
    1. 회원 정보 전체 띄우기(관리자 빼고 전부 다) - 아이디, 학번, 이름, 연락처, 권한, 가입 날짜, 스터디 그룹 o
    2. 권한이 Admin인 경우에만 회원 권한 설정할 수 있게 만들기 (셀렉트 박스 이용해서 - 일단 Undefine, Student, Leader, Admin) o
    3. 스터디 그룹도 바꿀 수 있게(셀렉트 박스 사용 - STD001, STD002, STD003) o
*/