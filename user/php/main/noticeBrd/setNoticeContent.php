<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $title = $_POST['title'];
    $content = $_POST['content'];

    $sql = "INSERT INTO USR_BRD(BRD_TITLE, BRD_CONTENT, BRD_CDE, BRD_DISABLE) VALUES ('$title','$content','BRD_002','Y')";//일단

    $result = mysql_query($sql, $connect);
    if($result){
        $result = "true";
        echo($result);
    }else{
        $result = "false";
        echo($result);
    }
    mysql_close($connect);
?>