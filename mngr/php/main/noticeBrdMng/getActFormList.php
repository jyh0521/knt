<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $sql = "SELECT FORM_ID, FORM_TITLE
              FROM USR_FORM
             WHERE FORM_DISABLE = 'Y' AND FORM_ACT = 'Y'";
    
    $result = mysql_query($sql, $connect);
    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'FORM_ID' => $row['FORM_ID'],
            'FORM_TITLE' => $row['FORM_TITLE']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>