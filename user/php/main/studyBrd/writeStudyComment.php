<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['brdId'];
    $comment = $_POST['comment'];
    $date = $_POST['date'];
    $writer = $_POST['writer'];

    $sql = "INSERT INTO USR_BRD_CMT
            (BRD_ID, CMT_CONTENT, CMT_WRITER, CMT_DATE)
            VALUES ('$id', '$comment', '$writer', '$date')";
    
    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>