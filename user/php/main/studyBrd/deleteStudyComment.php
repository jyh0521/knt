<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $cmtId = $_POST['cmtId'];

    $sql = "UPDATE USR_BRD_CMT
            SET CMT_DISABLE = 'N'
            WHERE CMT_ID = '$cmtId'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>