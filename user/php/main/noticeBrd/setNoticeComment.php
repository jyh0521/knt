<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $writer = $_POST['writer'];
    $comment = $_POST['comment'];
    $date = $_POST['date'];
    $id = $_POST['id'];

    $sql = "INSERT INTO USR_BRD_CMT(CMT_CONTENT, CMT_WRITER, CMT_DATE, BRD_ID) VALUES ('$comment','$writer','$date','$id')";
    
    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);

?>