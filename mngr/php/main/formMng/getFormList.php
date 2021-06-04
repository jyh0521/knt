<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $dataPerPage = $_POST['dataPerPage'];
    $startPage = $_POST['currentPage'] * $dataPerPage - $dataPerPage;

    $sql = "SELECT R1.*
              FROM (
                SELECT FORM_ID, FORM_TITLE, FORM_ACT
                  FROM USR_FORM
                 WHERE FORM_DISABLE = 'Y'
              ) R1
             LIMIT 10 OFFSET $startPage";

    $result = mysql_query($sql, $connect);
    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'FORM_ID' => $row['FORM_ID'],
            'FORM_TITLE' => $row['FORM_TITLE'],
            'FORM_ACT' => $row['FORM_ACT']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>