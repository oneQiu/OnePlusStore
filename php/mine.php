<?php
    $user = $_POST['user'];
    mysql_connect('localhost:3306','root','lemon');
    mysql_query('use oneplus');
    $sql = "SELECT * FROM form JOIN product ON form.product = product.id 
    WHERE USER = '$user'";
    $result = mysql_query($sql);
    $rows = [];
    while($row = mysql_fetch_assoc($result)){
        $rows[] = $row;
    }
    echo json_encode($rows);
?>