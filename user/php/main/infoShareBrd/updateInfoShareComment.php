<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $content = $_POST['content'];
    $date = $_POST['date'];
    $id = $_POST['id'];

    $sql = "UPDATE USR_BRD_CMT
               SET CMT_CONTENT = '$content', CMT_DATE = '$date'
             WHERE CMT_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>