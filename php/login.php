<?php
    $name = $_POST['name'];
    $password = $_POST['password'];
    $type = $_POST['type'];
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    $sql = "select * from user where name = '$name'";
    $data = mysql_query($sql);
    if($type == 'login'){
        $res = mysql_fetch_assoc($data);
    }else if($type = 'sigin'){
        if(mysql_fetch_assoc($data) >= 1){
            $res = false;
        }else{
            $sql = "insert into user(name,password) values('$name','$password')";
           if( mysql_query($sql)){
            $res = true;
           }else{
            $res = 'wrong';
           }
        }
    }
    echo json_encode( $res );
?>