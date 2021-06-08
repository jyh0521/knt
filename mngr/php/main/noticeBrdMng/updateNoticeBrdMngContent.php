<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $title = $_POST['title'];
    $writer = $_POST['writer'];
    $content = $_POST['content'];
    $date = $_POST['date'];
    $form = $_POST['form'];

    $sql = "UPDATE USR_BRD 
               SET BRD_TITLE = '$title', BRD_CONTENT = '$content', BRD_WRITER = '$writer', BRD_DATE = '$date', BRD_FORM = '$form' 
             WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>