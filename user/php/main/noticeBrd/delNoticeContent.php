<?
    //삭제는 디비에서 지우는게 아니라 y에서 n으로 바꿈
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "UPDATE USR_BRD SET BRD_DISABLE = 'N' WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>