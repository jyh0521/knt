<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $sql = "SELECT * FROM USR_INF"; 

    $result = mysql_query($sql, $connect);

    $row = mysql_num_rows($result);

    echo json_encode($row);

    mysql_close($connect);
?>