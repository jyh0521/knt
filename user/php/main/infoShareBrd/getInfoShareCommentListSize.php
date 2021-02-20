<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $brdId = $_POST['brdId'];

    $sql = "SELECT COUNT(*) AS COUNT
              FROM USR_BRD_CMT
             WHERE BRD_ID = '$brdId'
               AND CMT_DISABLE = 'Y'"; 

    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $value = array(
        'COUNT' => $row['COUNT']
    );

    echo json_encode($value);

    mysql_close($connect);
?>