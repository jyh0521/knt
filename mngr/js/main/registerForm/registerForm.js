let formContentCnt = 1;

function initRegisterForm() {
    let registerFormHtml = "";

    initRegisterFormEvent();
   // document.getElementById('menuFuncDiv').innerHTML = registerFormHtml;
}

function initRegisterFormEvent() {
    // 지원서 등록 + 버튼
    document.getElementById("formContentPlus").addEventListener('click', function(){
        // 질문 개수 제한 5개
        if(formContentCnt <= 5) {
            // let formContentHtml = "";
            // formContentHtml += "<li><input type='text' name='formContent" + formContentCnt + "' id='formContent" + formContentCnt + "' placeholder='질문을 입력해주세요.'/></li>";
            //document.getElementById("formMainContentList").append(formContentHtml);
            
            let newFormContent = document.createElement("input");
            newFormContent.setAttribute("type", "text");
            newFormContent.setAttribute("id", "formContent" + formContentCnt);
            newFormContent.setAttribute("name", "formContent" + formContentCnt );
            newFormContent.setAttribute("placeholder", "질문을 입력해주세요.");

            document.getElementById("formMainContentList").appendChild(newFormContent);

            formContentCnt++;
        }
        else {
            alert("질문은 최대 5개까지 작성할 수 있습니다.");
        }
    });

    // 지원서 등록 - 버튼
    document.getElementById("formContentMinus").addEventListener('click', function(){
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