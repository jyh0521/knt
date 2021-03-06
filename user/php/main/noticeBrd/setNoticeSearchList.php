<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $text = $_POST['text'];
    $option = $_POST['option'];
    $startrow = $_POST['startrow'];

    $sql = "SELECT * FROM USR_BRD WHERE BRD_CDE = 'BRD_002' AND BRD_DISABLE = 'Y' AND $option LIKE CONCAT('%', '$text', '%') ORDER BY BRD_DATE DESC LIMIT $startrow,10";
       
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'BRD_ID' => $row['BRD_ID'],
            'BRD_TITLE' => $row['BRD_TITLE'],
            'BRD_WRITER' => $row['BRD_WRITER'],
            'BRD_DATE' => $row['BRD_DATE'],
            'BRD_HIT' => $row['BRD_HIT']
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>