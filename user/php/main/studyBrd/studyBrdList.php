<?php
    include $_SERVER["DOCUMENT_ROOT"]."/lib/php/connectDB.php";

    $sql = "SELECT * FROM USR_BRD
            WHERE USR_CDE = 'STD_001'
            AND USR_DISABLE = 'Y'";

    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    $value = array();

    while($row) {
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_CONTENT' => $row['BRD_CONTENT'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT'],
        );

        array_push($value, $tmp);
    }

    mysql_close($connect);
?>