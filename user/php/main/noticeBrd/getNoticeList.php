<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $startrow = $_POST['startrow'];

    $sql = "SELECT R1.*
              FROM (
                SELECT BRD_ID, BRD_TITLE, BRD_DATE, BRD_HIT
                  FROM USR_BRD
                 WHERE BRD_CDE = 'BRD_002'
                   AND BRD_DISABLE = 'Y'
                 ORDER BY BRD_DATE DESC
              ) R1
              LIMIT 10 OFFSET $startrow";
       
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT']
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>
