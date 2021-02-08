<?

    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    //클릭한 제목의 아이디를 찾아 조회수를 증가한다. 
    $sql = "UPDATE USR_BRD SET BRD_HIT = BRD_HIT + 1 WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>