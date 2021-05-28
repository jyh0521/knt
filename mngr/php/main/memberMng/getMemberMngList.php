<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $startrow = $_POST['startrow'];

    $sql = "SELECT USR_ID, USR_SID, USR_NAME, USR_PHONE, USR_AUTH, USR_DATE, USR_STD FROM USR_INF WHERE USR_ID NOT IN('ADMIN') ORDER BY USR_DATE DESC LIMIT $startrow,10";
       
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'USR_ID' => $row['USR_ID'],
            'USR_SID' => $row['USR_SID'],
            'USR_NAME' => $row['USR_NAME'],
            'USR_PHONE' => $row['USR_PHONE'],
            'USR_AUTH' => $row['USR_AUTH'],
            'USR_DATE' => $row['USR_DATE'],
            'USR_STD' => $row['USR_STD'],
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>
