<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $formId = $_POST['id'];

    $sql = "UPDATE USR_FORM
               SET FORM_DISABLE = 'N'
             WHERE FORM_ID = '$formId'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>