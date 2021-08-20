let noticeBrdMngWrite = (function() {

    function initnoticeBrdMngWrite(param, mode){
        showNoticeBrdMngWrite(param, mode);
    }

    // 게시판 내용 작성하기
    function setNoticeBrdMngContent(param) {
        requestData('/knt/mngr/php/main/noticeBrdMng/setNoticeBrdMngContent.php', param).done(function(result){
            if(result){
                alert('작성 되었습니다.');
                $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngList.html', function () {
                    noticeBrdMngList.initNoticeBrdMng();
                });
            }
            else{
                alert('작성 실패하였습니다.');
            }
        });
    }

    // 게시판 내용 수정하기
    function updateNoticeBrdMngContent(param) {
        requestData('/knt/mngr/php/main/noticeBrdMng/updateNoticeBrdMngContent.php', param).done(function(result){
            if(result){
                alert('수정 되었습니다.');
                $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngList.html', function () {
                    noticeBrdMngList.initNoticeBrdMng();
                });
            }
            else{
                alert('수정 실패하였습니다.');
            }
        });
    }

    // 게시판 글 쓰기 화면 보여주기
    function showNoticeBrdMngWrite(param, mode) {
        // 지원서 제목 불러온 후 그리기
        requestData('/knt/mngr/php/main/noticeBrdMng/getActFormList.php').done(function(result){
            // select box 추가
            let formSelectBoxHtml = '';
            formSelectBoxHtml += '<option value="empty" selected="selected">없음</option>'
        
            for(let i = 0; i < result.length; i++) {
                formSelectBoxHtml += '<option value="formSelect' + result[i]['FORM_ID'] + '">' + result[i]['FORM_TITLE']+ '</option>'
            }

            $('#formName').empty().append(formSelectBoxHtml);

            let noticeBrdMngWriteHtml = '';

            // 글 작성 시
            if(mode === 'write') {
                noticeBrdMngWriteHtml += '<button id="noticeBrdMngWriteContentBtn" class="ui black basic button">작성</button>';
            }
            // 글 수정 시
            else {
                $('#noticeBrdMngWriteTitle').val(param['title']);
                $('#noticeBrdMngWriteContent').val(param['content']);

                // 지원서가 등록되있지 않은 경우
                if(param['form'] === 'empty') {
                    $('#formName').val('empty');
                }
                // 지원서가 등록되있는 경우
                else {
                    $('#formName').val(param['form']);
                }

                noticeBrdMngWriteHtml += '<button id="noticeBrdMngWriteUpdateContentBtn" class="ui black basic button">수정</button>';
            }

            noticeBrdMngWriteHtml += '<button id="noticeBrdMngWriteBackBtn" class="ui black basic button">뒤로</button>';
            
            $('#noticeBrdMngWriteBtnDiv').empty().append(noticeBrdMngWriteHtml);

            initNoticeBrdMngWriteEvent();
        });

        // 공지사항 작성 이벤트
        function initNoticeBrdMngWriteEvent() {
            // 작성 버튼 클릭 시
            $('#noticeBrdMngWriteContentBtn').off('click').on('click', function(){
                let form = $('#formName').val();
                let info = {
                    title : $('#noticeBrdMngWriteTitle').val(),
                    content : $('#noticeBrdMngWriteContent').val(),
                    date : getTimeStamp(new Date()),
                    form : form,
                    writer : 'ADMIN',
                    startDate : $('#noticeBrdMngDateStart').val(),
                    endDate : $('#noticeBrdMngDateEnd').val(),
                };

                if(form != 'empty') {
                    form = form.substr(10);
                }

                if(confirm('작성 하시겠습니까?')) {
                    let param = makeParam(info);
                    setNoticeBrdMngContent(param);
                }
                else {
                    alert('취소 되었습니다.');
                }
            });

            // 수정 버튼 클릭 시
            $('#noticeBrdMngWriteUpdateContentBtn').off('click').on('click', function(){
                let form = $('#formName').val();
                let info = {
                    title : $('#noticeBrdMngWriteTitle').val(),
                    content : $('#noticeBrdMngWriteContent').val(),
                    date : getTimeStamp(new Date()),
                    form : form,
                    id : param['id'],
                    writer : 'ADMIN'
                };

                if(form != 'empty') {
                    form = form.substr(10);
                }

                if(confirm('수정 하시겠습니까?')) {
                    let param = makeParam(info);
                    updateNoticeBrdMngContent(param);
                }
                else {
                    alert('취소 되었습니다.');
                }
            });

            // 뒤로 버튼 클릭 시
            $('#noticeBrdMngWriteBackBtn').off('click').on('click', function(){
                $('#menuFuncDiv').load('noticeBrdMng/noticeBrdMngList.html', function () {
                    noticeBrdMngList.initNoticeBrdMng();
                });
            });
        }
    }

    return {
        initnoticeBrdMngWrite : initnoticeBrdMngWrite
    };
})();