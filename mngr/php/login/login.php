<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pwd = $_POST['pwd'];

    $sql = "SELECT COUNT(*) AS USR_CNT
              FROM USR_INF 
             WHERE USR_ID = BINARY('{$id}') 
               AND USR_PW = MD5('{$pwd}') 
               AND USR_DISABLE = 'Y'";

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