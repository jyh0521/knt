<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $name = $_POST['name'];
    $phone = $_POST['phone'];

    $sql = "SELECT USR_ID
            FROM USR_INF 
            WHERE USR_NAME = '{$name}' AND USR_PHONE = '{$phone}'";

    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);

    $value = array('USR_ID' => $row['USR_ID']);

    echo json_encode($value);
    mysql_close($connect);
?>