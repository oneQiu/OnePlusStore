<?php
    $data = $_POST['data'];
    $user = $_POST['user'];
    $formid = $_POST['formid'];
    $address = $_POST['address'];
    $ftext = $_POST['ftext'];
    $res = 0;
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    foreach ($data as $key) {
    $id = $key['id'];
    $number = $key['number'];
    $sql = "insert into form(user,product,sumNum,formid,address,ftext) values('$user','$id','$number','$formid','$address','$ftext')";
    // mysql_query($sql);
        if(mysql_query($sql)){
            $res++;
        }
    }
    echo json_encode($res);
?>