<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $formId = $_POST['id'];
    $title = $_POST['title'];
    $que1 = $_POST['que1'];
    $que2 = $_POST['que2'];
    $que3 = $_POST['que3'];
    $que4 = $_POST['que4'];
    $que5 = $_POST['que5'];

    $sql = "UPDATE USR_FORM
               SET FORM_TITLE = '$title', FORM_QUE1 = '$que1', FORM_QUE2 = '$que2', FORM_QUE3 = '$que3', FORM_QUE4 = '$que4', FORM_QUE5 = '$que5'
             WHERE FORM_ID = '$formId'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>