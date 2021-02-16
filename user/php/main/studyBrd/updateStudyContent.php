<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['brdId'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $date = $_POST['date'];

    $sql = "UPDATE USR_BRD
            SET BRD_TITLE = '$title' AND BRD_CONTENT = '$content' AND BRD_DATE = '$date'
            WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>