<?
   include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $birth = $_POST['birth'];
    $sex = $_POST['sex'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    $ans1 = $_POST['ans1'];
    $ans2 = $_POST['ans2'];
    $ans3 = $_POST['ans3'];
    $ans4 = $_POST['ans4'];
    $ans5 = $_POST['ans5'];
    

    $sql = "UPDATE USR_SUB_FORM
               SET SUB_FORM_BIRTH = '$birth', SUB_FORM_SEX = '$sex', SUB_FORM_PHONE = '$phone', SUB_FORM_DATE = '$date'
                   SUB_FORM_ANS1 = '$ans1', SUB_FORM_ANS2 = '$ans2', SUB_FORM_ANS3 = '$ans3', 
                   SUB_FORM_ANS4 = '$ans4', SUB_FORM_ANS5 = '$ans5', SUB_FORM_ISSUBMIT = 'Y'
             WHERE SUB_FORM_ID = '$id'";

    $result = mysql_query($sql, $connect);

    echo json_encode($result);

    mysql_close($connect);
?>