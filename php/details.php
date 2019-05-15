<?php
    $id = $_GET["id"];
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    $sql = "select * from product where id = $id";
    $result = mysql_query($sql);
    $res = mysql_fetch_assoc($result);
    echo json_encode($res);
?>