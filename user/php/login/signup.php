<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $id = $_POST['id'];
    $sid = $_POST['sid'];
    $pw = $_POST['pw'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    
    $sql = "INSERT 
            INTO USR_INF(USR_ID, USR_SID, USR_PW, USR_NAME, USR_PHONE, USR_AUTH, USR_DATE, USR_DISABLE) 
            VALUES('$id','$sid',MD5('{$pw}'),'$name','$phone','USER','$date','Y')";

    mysql_query($sql, $connect);
    mysql_close($connect);
?>