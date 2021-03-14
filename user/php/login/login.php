<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pw = $_POST['pw'];

    $sql = "SELECT COUNT(*) AS USR_CNT FROM USR_INF WHERE USR_ID = '{$id}' AND USR_PW = MD5('{$pw}')";
    $sql_2 = "SELECT USR_DISABLE FROM USR_INF WHERE USR_ID = '{$id}'";
    $result = mysql_query($sql, $connect);
    $result_2 = mysql_query($sql_2, $connect);
    $row = mysql_fetch_array($result);
    $row_2 = mysql_fetch_array($result_2);

    if(($row["USR_CNT"] == 1)&&($row_2["USR_DISABLE"] == 'Y')){
        $value = true;
    }
    else{
        $value = false;
    }

    echo json_encode($value);
    mysql_close($connect);
?>