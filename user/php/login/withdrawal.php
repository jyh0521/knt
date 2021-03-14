<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $sql = "UPDATE USR_INF SET USR_DISABLE = 'N' WHERE USR_ID = '$id'";

    mysql_query($sql,$connect);
    mysql_close($connect);
?>