<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $formId = $_POST['id'];
    $check = $_POST['check'];

    if($check == "true") {
        $sql = "UPDATE USR_FORM
                   SET FORM_ACT = 'Y'
                 WHERE FORM_ID = '$formId'";
    }
    else {
        $sql = "UPDATE USR_FORM
                   SET FORM_ACT = 'N'
                 WHERE FORM_ID = '$formId'";
    }

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>