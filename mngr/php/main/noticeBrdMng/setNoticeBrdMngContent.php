<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $writer = $_POST['writer'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $date = $_POST['date'];
    $form = $_POST['form'];

    $sql = "INSERT 
              INTO USR_BRD(BRD_TITLE, BRD_CONTENT, BRD_WRITER, BRD_CDE, BRD_DATE, BRD_FORM) 
            VALUES ('$title','$content','$writer','BRD_002','$date', '$form')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>