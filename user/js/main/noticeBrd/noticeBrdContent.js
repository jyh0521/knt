let noticeBrdContent = (function() {

    function initnoticeBrdContent(content){
        showNoticeBrdContent(content);
    }

    //공지사항 내용 보여주기
    function showNoticeBrdContent(content){

        //제목
        let kntNoticeBrdContentTitleDomainHtml = '';
        kntNoticeBrdContentTitleDomainHtml += '<p class="title">' + content['BRD_TITLE'] + '</p>';

        $('#kntNoticeBrdContentTitleDomain').empty().append(kntNoticeBrdContentTitleDomainHtml);

        //내용
        let kntNoticeBrdContentDomainHtml = '';
        kntNoticeBrdContentDomainHtml +=    '<p>' + makeEnter(content['BRD_CONTENT']) + '</p>';

        $('#kntNoticeBrdContentDomain').empty().append(kntNoticeBrdContentDomainHtml);

        //등록일
        let kntNoticeBrdContentDateDomainHtml = ''
        kntNoticeBrdContentDateDomainHtml += '<p>등록일 ' + content['BRD_DATE']; + '</p>';

        $('#kntNoticeBrdContentDateDomain').empty().append(kntNoticeBrdContentDateDomainHtml);

        //지원하기 버튼
        if(content['BRD_FORM'] != 'empty') {
            let submitBtnHtml = '';
            submitBtnHtml += '<div class="ui primary submit labeled icon button writeRegistedFormBtn" id="writeRegisterdForm' + content['BRD_FORM'] + '"">';
            submitBtnHtml +=    '<i class="icon edit"></i>지원하기';
            submitBtnHtml += '</div>';
            $('#kntNoticeSubmitBtnDiv').empty().append(submitBtnHtml);
        }

        initNoticeBrdContentEvent();
    }

    //공지사항 내용 이벤트
    function initNoticeBrdContentEvent(){
        $('.writeRegistedFormBtn').off('click').on('click', function(){
            let id = this.id.substr(28);

            if(confirm('지원서를 작성하시겠습니까?')) {
                $("#menuFuncDiv").load("formWrite/formInfoWrite.html", function () {
                    formInfoWrite.initFormInfoWrite(id);
                });
            }
            else {
                alert('취소되었습니다.');
            }
        });
    }
    
    return {
        initnoticeBrdContent : initnoticeBrdContent
    };
})();