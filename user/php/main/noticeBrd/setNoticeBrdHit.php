<?

    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "UPDATE USR_BRD 
               SET BRD_HIT = BRD_HIT + 1 
             WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>