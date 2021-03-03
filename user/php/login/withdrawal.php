<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    // 데이터 한줄 삭제
    $id = $_POST['id'];
    $sql = "DELETE FROM USR_INF WHERE USR_ID = '{$id}'";
    mysql_query($sql,$connect);
    mysql_close($connect);
?>