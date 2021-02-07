<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $brdId = $_POST['brdId'];

    $sql = "UPDATE USR_BRD
               SET BRD_DISABLE = 'N'
             WHERE BRD_ID = '$brdId'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>