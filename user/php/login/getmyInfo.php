<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    // 정보공유 선택된 글의 내용 불러오기
    $sql = "SELECT USR_NAME, USR_PHONE, USR_SID, USR_AUTH
              FROM USR_INF
             WHERE USR_ID = '$id'";
    
    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    
    $value = array(
        array(
            'USR_NAME' => $row['USR_NAME'],
            'USR_PHONE' => $row['USR_PHONE'],
            'USR_SID' => $row['USR_SID'],
            'USR_AUTH' => $row['USR_AUTH']
        )
    );

    echo json_encode($value);

    mysql_close($connect);
?>