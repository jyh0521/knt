<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $startrow = $_POST['startrow'];

    $sql = "SELECT BRD_ID, BRD_TITLE, BRD_WRITER, BRD_DATE, BRD_DISABLE FROM USR_BRD ORDER BY BRD_DATE DESC LIMIT $startrow,10";
       
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_DISABLE' => $row['BRD_DISABLE']
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>