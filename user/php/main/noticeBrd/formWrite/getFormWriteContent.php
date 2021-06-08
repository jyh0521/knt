<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    // 지원서 질문 내용 불러오기
    $sql = "SELECT FORM_TITLE, FORM_QUE1, FORM_QUE2, FORM_QUE3, FORM_QUE4, FORM_QUE5
              FROM USR_FORM
             WHERE FORM_ID = '$id'";
    
    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    
    $value = array(
        array(
            'FORM_TITLE' => $row['FORM_TITLE'],
            'FORM_QUE1' => $row['FORM_QUE1'],
            'FORM_QUE2' => $row['FORM_QUE2'],
            'FORM_QUE3' => $row['FORM_QUE3'],
            'FORM_QUE4' => $row['FORM_QUE4'],
            'FORM_QUE5' => $row['FORM_QUE5'],
        )
    );

    echo json_encode($value);

    mysql_close($connect);
?>