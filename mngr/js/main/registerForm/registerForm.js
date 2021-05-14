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
        if(formContentCnt >= 1) {
            let formMainContent = document.getElementById("formMainContentList");
            formMainContent.removeChild(formMainContent.childNodes[formContentCnt - 1]);
            formContentCnt--;
        }
    });

    // 지원서 등록 버튼
    document.getElementById("formRegisterBtn").addEventListener('click', function(){
        if(formContentCnt <= 0 ) {
            alert("질문을 작성해주세요.");
        }
        else {
            let title = document.getElementById("formTitle").value;
            let formContent = [];
            for(let i = 1; i < formContentCnt; i++) {
                formContent.push(document.getElementById('formContent' + i).value);
            }
        }
    });
}