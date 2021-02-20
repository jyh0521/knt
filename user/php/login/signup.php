<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $sid = $_POST['sid'];
    $pw = $_POST[MD5('pw')];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    
    $sql = "INSERT 
            INTO USR_INF(USR_ID, USR_SID, USR_PW, USR_NAME, USR_PHONE, USER_AUTH, USR_DATE, USR_DISABLE) 
            VALUES('$id','$sid','$pw','$name','$phone','USER','$date','Y')";

    $result = mysql_query($sql, $connect);
    echo json_encode($result);
    mysql_close($connect);
?>