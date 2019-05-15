<?php
    // header("Content-type","text/html;charset=utf8");
    $page = $_GET["page"];
    $pagesize = 10;
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    $offset = ($page - 1) * $pagesize;
    $sql = "select * from product limit $offset,$pagesize";
    $result = mysql_query($sql);
    $rows = [];
    while($row = mysql_fetch_assoc($result)){
        $rows[] = $row;
    }
    echo json_encode($rows);
    ?>