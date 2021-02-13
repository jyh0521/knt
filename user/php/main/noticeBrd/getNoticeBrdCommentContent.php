<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT CMT_CONTENT FROM USR_BRD_CMT WHERE CMT_ID = '$id'";

    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $value = array('CMT_CONTENT' => $row['CMT_CONTENT']);

    echo json_encode($value);

    mysql_close($connect);
?>