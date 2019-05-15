<?php
    $data = $_POST['data'];
    $sumPrice = $_POST['sumPrice'];
    $user = $_POST['user'];
    $res = 0;
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    foreach ($data as $key) {
    $id = $key['id'];
    $number = $key['number'];
    $sql = "insert into form(user,producT,sumPrice) values('$user','$id','$number')";
    mysql_query($sql);
        if(mysql_query($sql)){
            $res++;
        }
    }
    echo json_encode($res);
?>