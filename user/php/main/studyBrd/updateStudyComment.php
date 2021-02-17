<?php
    include $_SERVER["DOCUMENT_ROOT"]."knt/lib/php/connectDB.php";

    $cmtId = $_POST['cmtId'];
    $comment = $_POST['comment'];
    $date = $_POST['date'];

    $sql = "UPDATE USR_BRD_CMT
            SET CMT_CONTENT = '$comment', CMT_DATE = '$date'
            WHERE CMT_ID = '$cmtId'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>