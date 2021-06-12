// 변수
let maxQueSize = 5;
let formContent = [];

// 함수
// 지원서 작성하기 초기화 함수
function initFormWrite(param) {
    drawFormWriteInfo(param);
    getFormWriteContent(param['id']);
    initFormWriteEvent(param);
}

// 지원서 내용을 가져오는 함수
function getFormWriteContent(id) {
    let param = 'id=' + id;
    requestData('/knt/user/php/main/formWrite/getFormWriteContent.php', param).done(function(result){
        formContent = result[0];
        drawFormWriteContent(formContent);
    });
}

/*
    임시 저장된 내용이 있는지 확인하고 없으면 insert 있으면 update
*/
// 지원서 내용을 제출하는 함수
function submitUserForm(content) {
    let param = 'name=' + content['name'] + '&num=' + content['num'] + '&birth=' + content['birth'] + '&sex=' + content['sex'] + '&phone=' + content['phone'] + 
                '&pwd=' + content['pwd'] + '&form=' + content['id'] + '&ans1=' + content['FORM_ANS1'] + '&ans2=' + content['FORM_ANS2'] + 
                '&ans3=' + content['FORM_ANS3'] + '&ans4=' + content['FORM_ANS4'] + '&ans5=' + content['FORM_ANS5'];

    requestData('/knt/user/php/main/formWrite/submitUserForm.php', param).done(function(result){
        if(result) {
            alert('제출되었습니다.');
            $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
                showNoticeBrd();
            });
        }
        else {
            alert('제출실패했습니다.');
        }
    });
}

// 지원서 내용을 임시저장 하는 함수
function saveUserForm(content) {
    let param = 'name=' + content['name'] + '&num=' + content['num'] + '&birth=' + content['birth'] + '&sex=' + content['sex'] + '&phone=' + content['phone'] + 
                '&pwd=' + content['pwd'] + '&form=' + content['id'] + '&ans1=' + content['FORM_ANS1'] + '&ans2=' + content['FORM_ANS2'] + 
                '&ans3=' + content['FORM_ANS3'] + '&ans4=' + content['FORM_ANS4'] + '&ans5=' + content['FORM_ANS5'];

    requestData('/knt/user/php/main/formWrite/saveUserForm.php', param).done(function(result){
        if(result) {
            alert('저장되었습니다.');
        }
        else {
            alert('저장 실패했습니다.');
        }
    });
}

// 지원서 정보를 그리는 함수
function drawFormWriteInfo(param) {
    $('#subUserName').empty().append('이름: ' + param['name']);
    $('#subUserNum').empty().append('학번: ' + param['num']);
}

function drawFormWriteContent(param) {
    // 제목
    $('#formWriteContentTitle').empty().append('<p>' + param['FORM_TITLE'] + '</p>');
    
    // 질문
    let formWriteContentHtml = '';

    formWriteContentHtml += '<ul>';
    for(let i = 1; i <= maxQueSize; i++) {
        if(param['FORM_QUE' + i] != 'empty') {
            formWriteContentHtml += '<li>';
            formWriteContentHtml += '<p>' + i + '. ' + param['FORM_QUE' + i] + '</p>';
            formWriteContentHtml += '<textarea id="formAnsTextArea' + i + '"></textarea>';
            formWriteContentHtml += '</li>';
        }
    }
    formWriteContentHtml += '</ul>';

    $('#formWriteContentQuestionDiv').empty().append(formWriteContentHtml);
}   

// 지원서 작성 이벤트
function initFormWriteEvent(param) {
    // 임시저장 버튼 클릭 시
    $('#formWriteTempSaveBtn').off('click').on('click', function() {
        param['birth'] = $('#userBirth').val();
        param['sex'] = $('#userSex').val();
        param['phone'] = $('#userPhone').val();

        for(let i = 1; i <= maxQueSize; i++) {
            if(formContent['FORM_QUE' + i] != 'empty') {
                param['FORM_ANS' + i] = $('#formAnsTextArea' + i).val();
            }
            else {
                param['FORM_ANS' + i] = 'empty';
            }
        }

        if(confirm('지원서를 임시 저장하시겠습니까? 반드시 제출하셔야 지원이 완료됩니다.')) {
            saveUserForm(param);
        }
        else {
            alert('취소되었습니다.');
        }
    });

    // 제출하기 버튼 클릭 시
    $('#formWriteSubmitBtn').off('click').on('click', function() {
        param['birth'] = $('#userBirth').val();
        param['sex'] = $('#userSex').val();
        param['phone'] = $('#userPhone').val();
        
        if(formContentValidationCheck(param)) {
            // 지원서 질문의 답변이 다 쓰였는지 검사
            for(let i = 1; i <= maxQueSize; i++) {
                if(formContent['FORM_QUE' + i] != 'empty') {
                    if($('#formAnsTextArea' + i).val().trim() === '') {
                        alert('질문' + i + '를 작성해주세요.');
                        return false;
                    }
                    else
                        param['FORM_ANS' + i] = $('#formAnsTextArea' + i).val();
                }
                else {
                    param['FORM_ANS' + i] = 'empty';
                }
            }

            if(confirm('지원서를 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.')) {
                submitUserForm(param);
            }
            else {
                alert('취소되었습니다.');
            }
        }
    });

    // 취소 버튼 클릭 시
    $('#formWriteCancelBtn').off('click').on('click', function() {
        if(confirm('지원서 작성을 취소하시겠습니까?')) {
            alert('취소되었습니다.');
            $("#menuFuncDiv").load("noticeBrd/noticeBrd.html", function () {
                showNoticeBrd();
            });
        }
    });
}

// 지원서 작성 내용 유효성 검사
function formContentValidationCheck(param) {
    if(param['birth'].trim() === '') {
        alert('생년월일을 입력하세요.');
        return false;
    }
    else if(param['sex'].trim() === '') {
        alert('성별을 입력하세요.');
        return false;
    }   
    else if(param['phone'].trim() === '') {
        alert('연락처를 입력하세요.');
        return false;
    }

    return true;
}




















































// 지원서 전체 수 불러오기
// function getFormListSize() {
//     requestData('/knt/user/php/main/noticeBrd/formWrite/getFormListSize.php').done(function(result) {
//         DrawPaging(result['COUNT'], 10, 1, 'formWritePagingDiv', getFormWriteList);
//     });
// }

// 지원서 리스트 불러오기
// function getFormWriteList(currentPage) {
//     let param = 'currentPage=' + currentPage + '&dataPerPage=' + 10;

//     requestData('/knt/user/php/main/noticeBrd/formWrite/getFormWriteList.php', param).done(function(result){
//         drawFormList(result, currentPage);
//     });
// }

// // 지원서 양식 불러오기
// function getFormWriteContent(id) {
//     let param = 'id=' + id;
//     requestData('/knt/user/php/main/formWrite/getFormWriteContent.php', param).done(function(result){
//         drawFormWriteContent(id, result[0]);
//     });
// }

// // 지원서 리스트 그리기
// function drawFormList(result, currentPage) {
//     $('#formWriteTableDiv').css('display', 'block');
//     $('#formWriteContentDiv').css('display', 'none');

//     let formListHtml = '';
//     let formListSize = result.length;
//     let startDataIndex = currentPage * 10 - 10 + 1;

//     for(let i = 0; i < formListSize; i++) {
//         formListHtml += '<tr id="formList' + result[i]['FORM_ID'] + '">';
//         formListHtml +=     '<td class="formListNum">' + (startDataIndex + i) + '</td>';
//         formListHtml +=     '<td class="formListTitle">' + result[i]['FORM_TITLE'] + '</td>';
//         formListHtml +=     '<td><input type="radio" name="selectForm" value="formWrite' + result[i]['FORM_ID'] + '"/></td>';
//         formListHtml += '</tr>';
//     }

//     $('#formWriteListTbody').empty().append(formListHtml);

//     initFormWriteEvent();
// }

// function drawFormWriteContent(id, result) {
//     $('#formWriteTableDiv').css('display', 'none');
//     $('#formWriteContentDiv').css('display', 'block');

//     let formWriteContentHtml = '';
//     formWriteContentHtml += '<p>' + result['FORM_TITLE'] + '</p>';
    
//     // 인적사항
//     formWriteContentHtml += '<ul>';
//     formWriteContentHtml +=     '<li><input placeholder="이름"/></li>';
//     formWriteContentHtml +=     '<li><input placeholder="학번"/></li>';
//     formWriteContentHtml +=     '<li><input placeholder="생년월일"/></li>';
//     formWriteContentHtml +=     '<li><input placeholder="성별"/></li>';
//     formWriteContentHtml +=     '<li><input placeholder="연락처"/></li>';
//     formWriteContentHtml += '</ul>';

//     // 지원서 질문
//     formWriteContentHtml += '<ul>';
//     for(let i = 1; i <= maxQueSize; i++) {
//         if(result['FORM_QUE' + i] != 'empty') {
//             formWriteContentHtml += '<li>';
//             formWriteContentHtml += '<p>' + i + '. ' + result['FORM_QUE' + i] + '</p>';
//             formWriteContentHtml += '<textarea></textarea>';
//             formWriteContentHtml += '</li>';
//         }
//     }
//     formWriteContentHtml += '</ul>';

//     formWriteContentHtml += '<button id="formWriteSaveBtn">임시저장</button>';
//     formWriteContentHtml += '<button id="formWriteSubmitBtn">제출</button>';
//     formWriteContentHtml += '<button id="formWriteBackBtn">뒤로</button>';
//     $('#formWriteContentDiv').empty().append(formWriteContentHtml);

//     initFormWriteContEvent(id, result);
// }

// function initFormWriteEvent() {
//     $('#formSelectBtn').off('click').on('click', function(){
//         let form = $('input[name="selectForm"]:checked').val();

//         if(form) {
//             getFormWriteContent(form.substr(9));
//         }
//         else {
//             alert('지원서를 선택해주세요.');
//         }
//     });
// }

// function initFormWriteContEvent(id, result) {
//     $('#formWriteBackBtn').off('click').on('click', function(){
//         initFormWrite();
//     });
// }