<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $text = $_POST['text'];
    $option = $_POST['option'];

    $sql = "SELECT COUNT(*) AS COUNT
              FROM USR_BRD
             WHERE BRD_CDE = 'BRD_002' 
               AND BRD_DISABLE = 'Y' 
               AND $option
              LIKE CONCAT('%', '$text', '%')";

   
    $result = mysql_query($sql, $connect);
    
    $row = mysql_fetch_array($result);
    
    $value = array(
        'COUNT' => $row['COUNT']
    );
    
    echo json_encode($value);
    
    mysql_close($connect);
?>