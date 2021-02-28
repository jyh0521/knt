<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $brd = $_POST['brd'];
    $startBrdId = ($_POST['currentPage'] - 1) * $_POST['dataPerPage'];

    $sql = "SELECT * FROM USR_BRD
            WHERE BRD_CDE = '$brd'
            AND BRD_DISABLE = 'Y'
            ORDER BY BRD_DATE DESC
            LIMIT $startBrdId, 10";

    $result = mysql_query($sql, $connect);
   
    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>