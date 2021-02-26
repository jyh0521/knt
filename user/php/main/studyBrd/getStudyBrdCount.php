<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $brd = $_POST['brd'];

    $sql = "SELECT COUNT(*) AS cnt
            FROM USR_BRD
            WHERE BRD_CDE = '$brd'
            AND BRD_DISABLE = 'Y'";

    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $count = $row['cnt'];

    echo json_encode($count);

    mysql_close($connect);
?>