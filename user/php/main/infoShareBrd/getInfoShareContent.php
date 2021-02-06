<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    // 정보공유 선택된 글의 내용 불러오기
    $sql = "SELECT BRD_TITLE, BRD_CONTENT, BRD_WRITER, BRD_DATE, BRD_HIT
              FROM USR_BRD
             WHERE BRD_ID = '$id'";
    
    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    
    $value = array(
        'CONTENT' =>
        array(
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_CONTENT' => $row['BRD_CONTENT'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT']
        )
    );

    // 정보공유 선택된 글의 댓글 전부 불러오기
    $sql = "SELECT CMT_ID, CMT_CONTENT, CMT_WRITER, CMT_DATE
              FROM USR_BRD_CMT
             WHERE BRD_ID = '$id' 
               AND CMT_DISABLE = 'Y'";
    
    $result = mysql_query($sql, $connect);

    $comment = array();
    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'CMT_ID' => $row['CMT_ID'],
            'CMT_CONTENT' => $row['CMT_CONTENT'],
            'CMT_WRITER' => $row['CMT_WRITER'],
            'CMT_DATE' => $row['CMT_DATE']
        );

        array_push($comment, $tmp);
    }

    $value['COMMENT'] = $comment;

    echo json_encode($value);

    mysql_close($connect);
?>