<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT * FROM USR_BRD_CMT WHERE BRD_ID = '$id' AND CMT_DISABLE = 'Y'"; 

    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'CMT_ID' => $row['CMT_ID'],
            'CMT_CONTENT' => $row['CMT_CONTENT'],
            'CMT_WRITER' => $row['CMT_WRITER'],
            'CMT_DATE' => $row['CMT_DATE'],
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>