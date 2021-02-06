<?php
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $sql = "SELECT * FROM USR_BRD WHERE BRD_CDE = 'BRD_003'";

    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_CONTENT' => $row['BRD_CONTENT'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT'],
            'BRD_CDE' => $row['BRD_CDE'],
            'BRD_DISABLE' => $row['BRD_DISABLE']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>