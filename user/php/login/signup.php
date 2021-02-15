<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pw = $_POST['pw'];
    
    $sql = "INSERT INTO USR_INF(USR_ID, USR_PW) VALUES('$id','$pw')";

    mysql_query($sql, $connect);
    mysql_close($connect);
?>