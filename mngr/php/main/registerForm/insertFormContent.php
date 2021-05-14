<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $title = $_POST['title'];
    $content1 = $_POST['content1'];
    $content2 = $_POST['content2'];
    $content3 = $_POST['content3'];
    $content4 = $_POST['content4'];
    $content5 = $_POST['content5'];

    $sql = "INSERT
              INTO USR_FORM (FORM_TITLE, FORM_QUE1, FORM_QUE2, FORM_QUE3, FORM_QUE4, FORM_QUE5)
            VALUES ('$title', '$content1', '$content2', '$content3', '$content4', '$content5')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>