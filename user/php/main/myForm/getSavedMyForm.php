<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $name = $_POST['name'];
    $num = $_POST['num'];
    $pwd = $_POST['pwd'];

    // 지원서 질문 내용 불러오기
    $sql = "SELECT SUB_FORM_ID, FORM_TITLE, SUB_FORM_ISSUBMIT
              FROM USR_SUB_FORM usf, USR_FORM uf
             WHERE SUB_FORM_NAME = '$name' 
               AND SUB_FORM_NUM = '$num' 
               AND SUB_FORM_PWD = '$pwd' 
               AND SUB_FORM_DISABLE = 'Y'
               AND usf.FORM_ID = uf.FORM_ID";
    
    $result = mysql_query($sql, $connect);

    $value = array();

    while($row = mysql_fetch_array($result)) {
        $tmp = array(
            'SUB_FORM_ID' => $row['SUB_FORM_ID'],
            'FORM_TITLE' => $row['FORM_TITLE'],
            'SUB_FORM_ISSUBMIT' => $row['SUB_FORM_ISSUBMIT']
        );

        array_push($value, $tmp);
    }

    echo json_encode($value);

    mysql_close($connect);
?>