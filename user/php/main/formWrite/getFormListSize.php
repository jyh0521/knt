<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $sql = "SELECT COUNT(*) AS COUNT
              FROM USR_FORM
             WHERE FORM_DISABLE = 'Y' AND FORM_ACT = 'Y'"; 

    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $value = array(
        'COUNT' => $row['COUNT']
    );

    echo json_encode($value);
    
    mysql_close($connect);
?>