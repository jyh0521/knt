<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $startrow = $_POST['startrow'];

    $sql = "SELECT BRD_ID, BRD_TITLE, BRD_DATE, BRD_DATE_START, BRD_DATE_END
              FROM USR_BRD
             WHERE BRD_DISABLE = 'Y'
             ORDER BY BRD_DATE DESC LIMIT $startrow,10";
        
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_DATE_START' => $row['BRD_DATE_START'],
            'BRD_DATE_END' => $row['BRD_DATE_END'],
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>
