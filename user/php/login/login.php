<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pw = $_POST['pw'];

    $sql = "SELECT COUNT(*) AS USR_CNT FROM USR_INF WHERE USR_ID = '{$id}' AND USR_PW = MD5('{$pw}')";

    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);

    if($row["USR_CNT"] == 1){
        $value = true;
    }
    else{
        $value = false;
    }

    echo json_encode($value);

    mysql_close($connect);
?>