let noticeBrdMngContent = (function() {

    function initnoticeBrdMngContent(content,id){
        showNoticeBrdMngContent(content,id);
    }

    // 게시판 내용 삭제하기
    function delNoticeBrdMngContent(param) {
        requestData('/knt/mngr/php/main/noticeBrdMng/delNoticeBrdMngContent.php', param).done(function(result){
            if(result){
                alert('삭제 되었습니다.');
                $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMngList.html", function () {
                    noticeBrdMngList.initNoticeBrdMng();
                });
            }
            else{
                alert('삭제 실패하였습니다.');
            }
        });
    }

    // 게시판 내용 보여주기
    function showNoticeBrdMngContent(Content,id){
        // 제목
        let kntNoticeBrdMngContentTitleDomainHtml = "";
        kntNoticeBrdMngContentTitleDomainHtml += '<p class="title">' + Content['BRD_TITLE'] + '</p>';

        $("#kntNoticeBrdMngContentTitleDomain").empty().append(kntNoticeBrdMngContentTitleDomainHtml);

        // 내용
        let kntNoticeBrdMngContentDomainHtml = "";
        kntNoticeBrdMngContentDomainHtml +=    "<p>" + makeEnter(Content['BRD_CONTENT']) + "</p>";

        $("#kntNoticeBrdMngContentDomain").empty().append(kntNoticeBrdMngContentDomainHtml);

        // 등록일, 작성자, 등록된 지원서
        let kntNoticeBrdMngContentDateWriterFormDomainHtml = ""
        kntNoticeBrdMngContentDateWriterFormDomainHtml += "<p>등록일 " + Content['BRD_DATE']; + "</p>"
        kntNoticeBrdMngContentDateWriterFormDomainHtml += "<p>작성자 " + Content['BRD_WRITER'] + "</p>";
        if(noticeBrdMngContent['BRD_FORM'] === 'empty') {
            kntNoticeBrdMngContentDateWriterFormDomainHtml += "<p>등록된 지원서 : 없음</p>";
        }
        else {
            kntNoticeBrdMngContentDateWriterFormDomainHtml += "<p>등록된 지원서 : " + Content['BRD_FORM'] + "</p>";
        }

        $("#kntNoticeBrdMngContentDateWriterFormDomain").empty().append(kntNoticeBrdMngContentDateWriterFormDomainHtml);

        initNoticeBrdMngContentEvent(Content,id);
    }

    // 공지사항 내용 이벤트
    function initNoticeBrdMngContentEvent(Content,id) {
        // 수정 버튼 클릭 시
        $('#noticeBrdMngContentUpdateBtn').off('click').on('click', function(){
            let param = [];
            param['title'] = Content['BRD_TITLE'];
            param['content'] = Content['BRD_CONTENT'];
            param['form'] = Content['BRD_FORM'];
            param['id'] = id;

            $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMngWrite.html", function () {
                noticeBrdMngWrite.initnoticeBrdMngWrite(param,'update');
            });
        });

        // 삭제 버튼 클릭 시
        $('#noticeBrdMngContentDeleteBtn').off('click').on('click', function(){
            if(confirm('삭제 하시겠습니까?')) {
                let param = 'id=' + id;
                delNoticeBrdMngContent(param);
            }
            else {
                alert('취소 되었습니다.');
            }
        });

        // 뒤로 버튼 클릭 시
        $('#noticeBrdMngContentBackBtn').off('click').on('click', function(){
            $("#menuFuncDiv").load("noticeBrdMng/noticeBrdMngList.html", function () {
                noticeBrdMngList.initNoticeBrdMng();
            });
        });
    }
        
    return {
        initnoticeBrdMngContent : initnoticeBrdMngContent
    };
})();