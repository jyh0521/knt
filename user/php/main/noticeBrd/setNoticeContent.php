<?
    include $_SERVER["DOCUMENT_ROOT"]."/knt/lib/php/connectDB.php";

    $title = $_POST['title'];
    $content = $_POST['content'];
    $data = $_POST['data'];

    $sql = "INSERT INTO USR_BRD(BRD_TITLE, BRD_CONTENT, BRD_WRITER, BRD_CDE, BRD_DATE) VALUES ('$title','$content','ADMIN','BRD_002','$data')";//일단

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