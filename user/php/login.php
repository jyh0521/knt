<?

    include $_SERVER["DOCUMENT_ROOT"]."/lib/php/connectDB.php";

    $id = $_POST['id'];
    $pw = $_POST['pw'];

    $sql = "SELECT * FROM USR_INFO WHERE USR_ID = '{$id}' AND USR_PW = '{$pw}'";

    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);

    if($row){
        $value = array(
            array(
                'USR_ID'=>$row['USR_ID'],
                'USR_PW'=>$row['USR_PW']
            )
        );
        echo json_encode($value);
    }
    else{
        echo json_encode($row); 
    }
    mysql_close($connect);
?>