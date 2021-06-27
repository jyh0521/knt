<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $name = $_POST['name'];
    $num = $_POST['num'];
    $birth = $_POST['birth'];
    $sex = $_POST['sex'];
    $phone = $_POST['phone'];
    $pwd = $_POST['pwd'];
    $form = $_POST['form'];
    $ans1 = $_POST['ans1'];
    $ans2 = $_POST['ans2'];
    $ans3 = $_POST['ans3'];
    $ans4 = $_POST['ans4'];
    $ans5 = $_POST['ans5'];

    $sql = "INSERT 
              INTO USR_SUB_FORM (SUB_FORM_NAME, SUB_FORM_NUM, SUB_FORM_BIRTH, SUB_FORM_SEX, SUB_FORM_PHONE, SUB_FORM_PWD, FORM_ID, 
                                 SUB_FORM_ANS1, SUB_FORM_ANS2, SUB_FORM_ANS3, SUB_FORM_ANS4, SUB_FORM_ANS5, SUB_FORM_ISSUBMIT) 
            VALUES ('$name', '$num', '$birth', '$sex', '$phone', MD5('$pwd'), '$form', '$ans1', '$ans2', '$ans3', '$ans4', '$ans5', 'Y')";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>