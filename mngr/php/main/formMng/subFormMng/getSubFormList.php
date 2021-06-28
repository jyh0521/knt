<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $startrow = $_POST['startrow'];

    $sql = "SELECT SUB_FORM_ID, uf.FORM_TITLE, SUB_FORM_NAME
              FROM USR_SUB_FORM usf, USR_FORM uf
             WHERE usf.FORM_ID = uf.FORM_ID
               AND SUB_FORM_DISABLE = 'Y'
             ORDER BY SUB_FORM_NAME LIMIT $startrow, 10";
        
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)){
        $tmp = array(
            'SUB_FORM_ID' => $row['SUB_FORM_ID'],
            'FORM_TITLE' => $row['FORM_TITLE'],
            'SUB_FORM_NAME' => $row['SUB_FORM_NAME']
        );

        array_push($value, $tmp);
    }
    
    echo json_encode($value);

    mysql_close($connect);
?>
