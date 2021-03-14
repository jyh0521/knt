<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT USR_NAME, USR_PHONE, USR_SID, USR_AUTH, USR_DATE, USR_STD
              FROM USR_INF
             WHERE USR_ID = '$id'";
    
    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    
    $value = array(
        array(
            'USR_NAME' => $row['USR_NAME'],
            'USR_PHONE' => $row['USR_PHONE'],
            'USR_SID' => $row['USR_SID'],
            'USR_AUTH' => $row['USR_AUTH'],
            'USR_DATE' => $row['USR_DATE'],
            'USR_STD' => $row['USR_STD']
        )
    );

    echo json_encode($value);

    mysql_close($connect);
?>