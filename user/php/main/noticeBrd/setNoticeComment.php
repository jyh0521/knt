<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $comment = $_POST['comment'];
    $date = $_POST['date'];
    $id = $_POST['id'];

    $sql = "INSERT INTO USR_BRD_CMT(CMT_CONTENT, CMT_WRITER, CMT_DATE, BRD_ID) VALUES ('$comment','ADMIN','$date','$id')";
    //db에는 저장되는데 null이 찍힌다...............왜?
    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);

?>