<?php
    $uname = $_GET['tel'];
    $userpwd = $_GET['userpwd'];

    $con=mysqli_connect('localhost','root','123456','bilibili');

    /*
    获取到用户名和密码之后 先去数据库中判断这个用户名是否存在
    如果用户名存在，直接返回 用户名已经存在
    如果用户名不存在，把这个用户名和密码 插入数据库
    */ 
    $sql = "SELECT * FROM `userlist` WHERE `username` = '$uname'";//连接数据库的username匹配
    
    // $sql="INSERT INTO `stu` (`id`, `username`,  `password`) VALUES (null, '$username', '$password');";
    $res=mysqli_query($con,$sql);
    if(!$res){
        die('报错'.mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    // print_r($row);
    if($row){
        //如果能够进入这条数据，说明数据库中已经存在该用户
        // print_r("该用户已经存在");
        echo json_encode(array(
            "code" => 0,
            "message" => "注册失败，该用户已存在"
        ));
    }else{
        $sqll="INSERT INTO `userlist` ( `id`,`username`, `password`) VALUES (null,  '$uname', '$userpwd');";
        $res1=mysqli_query($con,$sqll);
        if($res1){
            // print_r("注册成功");
            echo json_encode(array(
                "code" => 1,
                "message" => "注册成功"
                ));
        }
    }

?>