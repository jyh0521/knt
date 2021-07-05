<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $title = $_POST['title'];
    $content = $_POST['content'];
    $date = $_POST['date'];

    $sql = "INSERT INTO USR_BRD(BRD_TITLE, BRD_CONTENT, BRD_CDE, BRD_DATE) 
                 VALUES ('$title','$content','BRD_002','$date')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>