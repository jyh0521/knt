<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $content = $_POST['content'];
    $writer = $_POST['writer'];
    $date = $_POST['date'];
    $brdId = $_POST['brdId'];

    $sql = "INSERT
              INTO USR_BRD_CMT (CMT_CONTENT, CMT_WRITER, CMT_DATE, BRD_ID)
            VALUES ('$content', '$writer', '$date', '$brdId')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>