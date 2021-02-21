<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT * FROM USR_BRD_CMT WHERE BRD_ID = '$id' AND CMT_DISABLE = 'Y'"; 

    $result = mysql_query($sql, $connect);

    $row = mysql_num_rows($result);

    echo json_encode($row);

    mysql_close($connect);
?>