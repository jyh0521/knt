<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $name = $_POST['name'];
    $num = $_POST['num'];
    $form = $_POST['form'];

    // 지원서 질문 내용 불러오기
    $sql = "SELECT SUB_FORM_ID, SUB_FORM_NAME, SUB_FORM_NUM, SUB_FORM_BIRTH, SUB_FORM_SEX, SUB_FORM_PHONE, FORM_ID,
                   SUB_FORM_ANS1, SUB_FORM_ANS2, SUB_FORM_ANS3, SUB_FORM_ANS4, SUB_FORM_ANS5, 
                   SUB_FORM_ISSUBMIT
              FROM USR_SUB_FORM
             WHERE SUB_FORM_NAME = '$name' AND SUB_FORM_NUM = '$num' AND FORM_ID = '$form' AND SUB_FORM_DISABLE = 'Y'";
    
    $result = mysql_query($sql, $connect);
    $row = mysql_fetch_array($result);
    
    $value = array(
        array(
            'SUB_FORM_ID' => $row['SUB_FORM_ID'],
            'SUB_FORM_NAME' => $row['SUB_FORM_NAME'],
            'SUB_FORM_NUM' => $row['SUB_FORM_NUM'],
            'SUB_FORM_BIRTH' => $row['SUB_FORM_BIRTH'],
            'SUB_FORM_SEX' => $row['SUB_FORM_SEX'],
            'SUB_FORM_PHONE' => $row['SUB_FORM_PHONE'],
            'FORM_ID' => $row['FORM_ID'],
            'SUB_FORM_ANS1' => $row['SUB_FORM_ANS1'],
            'SUB_FORM_ANS2' => $row['SUB_FORM_ANS2'],
            'SUB_FORM_ANS3' => $row['SUB_FORM_ANS3'],
            'SUB_FORM_ANS4' => $row['SUB_FORM_ANS4'],
            'SUB_FORM_ANS5' => $row['SUB_FORM_ANS5'],
            'SUB_FORM_ISSUBMIT' => $row['SUB_FORM_ISSUBMIT']
        )
    );

    echo json_encode($value);

    mysql_close($connect);
?>