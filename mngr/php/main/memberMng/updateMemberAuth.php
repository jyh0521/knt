<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['selectMemberAuthId'];
    $option = $_POST['selectMemberAuthOption'];

    $sql = "UPDATE USR_INF SET USR_AUTH = '$option' WHERE USR_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>