<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $dataPerPage = $_POST['dataPerPage'];
    $startPage = $_POST['currentPage'] * $dataPerPage - $dataPerPage;
    $brdId = $_POST['brdId'];

    $sql = "SELECT R1.*
              FROM (
                SELECT CMT_ID, CMT_CONTENT, CMT_WRITER, CMT_DATE
                  FROM USR_BRD_CMT
                 WHERE BRD_ID = '$brdId'
                   AND CMT_DISABLE = 'Y'
                 ORDER BY CMT_DATE DESC
              ) R1
             LIMIT 5 OFFSET $startPage";

    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'CMT_ID' => $row['CMT_ID'],
            'CMT_CONTENT' => $row['CMT_CONTENT'],
            'CMT_WRITER' => $row['CMT_WRITER'],
            'CMT_DATE' => $row['CMT_DATE']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>