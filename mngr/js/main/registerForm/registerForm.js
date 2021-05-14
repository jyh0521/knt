let formContentCnt = 1;

function initRegisterForm() {
    let registerFormHtml = "";

    initRegisterFormEvent();
   // document.getElementById('menuFuncDiv').innerHTML = registerFormHtml;
}

function initRegisterFormEvent() {
    document.getElementById("formContentPlus").addEventListener('click', function(){
        // 질문 개수 제한 5개
        if(formContentCnt <= 5) {
            let formContentHtml = "";
            formContentHtml += "<li><input type='type' name='formContent" + formContentCnt + "' id='formContent" + formContentCnt + "' placeholder='질문을 입력해주세요.'/></li>";
            document.getElementById("formMainContentList").innerHTML += formContentHtml;
            formContentCnt++;
        }
        else {
            alert("질문은 최대 5개까지 작성할 수 있습니다.");
        }
    });

    document.getElementById("formContentMinus").addEventListener('click', function(){
        if(formContentCnt >= 1) {
            let formMainContent = document.getElementById("formMainContentList");
            formMainContent.removeChild(formMainContent.childNodes[formContentCnt - 1]);
            formContentCnt--;
        }
    });
}