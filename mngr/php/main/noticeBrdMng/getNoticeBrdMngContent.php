<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT BRD_TITLE, BRD_CONTENT, BRD_WRITER, BRD_DATE, BRD_HIT, BRD_FORM 
              FROM USR_BRD
             WHERE BRD_ID = '$id'";

    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $value = array(
        'BRD_TITLE' => $row['BRD_TITLE'],
        'BRD_CONTENT' => $row['BRD_CONTENT'],
        'BRD_WRITER' => $row['BRD_WRITER'],
        'BRD_DATE' => $row['BRD_DATE'],
        'BRD_HIT' => $row['BRD_HIT'],
        'BRD_FORM' => $row['BRD_FORM']
    );

    echo json_encode($value);

    mysql_close($connect);
?>