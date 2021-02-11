<?php
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";
    
    $brd = $_POST['brd'];
    $id = $_POST["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $date = $_POST["date"];

    $sql = "INSERT INTO USR_BRD
                (BRD_TITLE, BRD_WRITER, BRD_CONTENT, BRD_DATE, BRD_CDE)
            VALUES ('$title', '$id', '$content', '$date', '$brd')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>