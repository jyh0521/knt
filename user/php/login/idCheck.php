<?
    //중복 여부 체크
    include $_SERVER["DOCUMENT_ROOT"]."/lib/php/connectDB.php";

    $id = $_POST['id'];

    $sql = "SELECT * FROM USR_INFO WHERE USR_ID = '{$id}'";

    $result = mysql_query($sql, $connect);
    $row = mysql_num_rows($result);
    echo json_encode($row);

?>