<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pw = $_POST['pw'];

    $sql = "SELECT COUNT(*) AS USR_CNT FROM USR_INF WHERE USR_ID = '{$id}' AND USR_PW = MD5('{$pw}')";

    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);



    if($row["USR_CNT"] == 1){
        // $value = array(
        //     array(
        //         'USR_ID'=>$row['USR_ID'],
        //         'USR_PW'=>$row['USR_PW']
        //     )
        // );
        // echo json_encode($value);
        $value = true;

    }
    else{
        // echo json_encode($row); 
        $value = false;
    }

    echo json_encode($value);

    mysql_close($connect);
?>