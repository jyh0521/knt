let formContentCnt = 1;

function initRegisterForm() {
    let registerFormHtml = "";

    initRegisterFormEvent();
   // document.getElementById('menuFuncDiv').innerHTML = registerFormHtml;
}

function initRegisterFormEvent() {
    // 지원서 등록 + 버튼
    document.getElementById("formContentPlus").addEventListener('click', function(){
        // 질문 추가
        if(formContentCnt <= 5) {
            let newFormContentLi = document.createElement("li");
            newFormContentLi.setAttribute("id", "formContentLi" + formContentCnt);
            document.getElementById("formMainContentList").appendChild(newFormContentLi);

            let newFormContentInput = document.createElement("input");
            newFormContentInput.setAttribute("type", "text");
            newFormContentInput.setAttribute("id", "formContentInput" + formContentCnt);
            newFormContentInput.setAttribute("name", "formContentInput" + formContentCnt );
            newFormContentInput.setAttribute("placeholder", "질문을 입력해주세요.");

            document.getElementById("formContentLi" + formContentCnt).appendChild(newFormContentInput);

            formContentCnt++;
        }
        // 질문 개수 제한 5개
        else {
            alert("질문은 최대 5개까지 작성할 수 있습니다.");
        }
    });

    // 지원서 등록 - 버튼
    document.getElementById("formContentMinus").addEventListener('click', function(){
        // 질문 삭제
        if(formContentCnt >= 2) {
            let formMainContent = document.getElementById("formMainContentList");
            formMainContent.removeChild(formMainContent.childNodes[formContentCnt - 1]);
            formContentCnt--;
        }
    });

    // 지원서 등록 버튼
    document.getElementById("formRegisterBtn").addEventListener('click', function(){
        if(formContentCnt <= 1 ) {
            alert("질문을 작성해주세요.");
        }
        else {        
            // 제목이 입력 되었는지 검사
            let titleFlag = true;
            if(document.getElementById("formTitle").value.trim() === "") {
                titleFlag = false;
            }
            // 질문이 모두 입력 되었는지 검사
            let contentFlag = true;
            if(titleFlag) {
                for(let i = 1; i < formContentCnt; i++) {
                    let str = document.getElementById("formContentInput" + i).value;
                    if(str.trim() === "") {
                        contentFlag = false;
                        break;
                    }
                }
            }

            if(!titleFlag) {
                alert("제목을 입력해주세요.")
            }
            else if(!contentFlag)  {
                alert("질문을 모두 작성해주세요.");
            }
            else {
                if(confirm("지원서를 등록 하시겠습니까?")) {
                    let title = document.getElementById("formTitle").value;
                    let formContent = [];
                    for(let i = 1; i < formContentCnt; i++) {
                        formContent.push(document.getElementById('formContentInput' + i).value);
                    }

                    let param = "title=" + title;
                    //let param = "content=" + content + "&writer=" + "ADMIN" + "&date=" + date + "&brdId=" + brdId;
                    for(let i = 0; i < 5; i++) {
                        if(formContent[i]) {
                            param += "&content" + (i + 1) + "=" + formContent[i];
                        }
                        else {
                            param += "&content" + (i + 1) + "=empty";
                        }
                    }

                    insertFormContent(param);
                }
                else {
                    alert("취소되었습니다.");
                }
            }
        }
    });
}

function insertFormContent(param) {
    requestData("/knt/mngr/php/main/registerForm/insertFormContent.php", param).done(function(result){
        if(result) {
            alert("지원서 등록이 완료되었습니다.");
        }
        else {
            alert("지원서 등록이 실패하였습니다.");
        }
    });
}