<?php
$id=$_GET['id'];
$name=$_GET['name'];
$tlabel=$_GET['tlabel'];
$bi_name=$_GET['bi_name'];
$img=$_GET['img'];
$price=$_GET['price'];
// $id="34835";
// $name="广州·2021鬼灭之刃only2.0";
// $tlabel="2021.03.21";
// $venue_name="岭南电子商务产业园";
// $cover="//i1.hdslb.com/bfs/openplatform/202012/PQyqkEdg1607335301266.png";
// $price_low="5500";


print_r($id);
$con=mysqli_connect('localhost','root','123456','bilibili');


// 查找
// $sql = "SELECT * FROM `goods`(`id`,`bil_id`,`name`,`time`) VALUES (NULL,'$id','$name','$time')";//连接数据库的id匹配
$sql = "SELECT * FROM `goods` WHERE `name`='$name'";
print_r($sql);
$res=mysqli_query($con,$sql);
print_r($res);


// 如果已经有数据了，就停止
if(!$res){
    die('报错'.mysqli_error($con));
}
$row = mysqli_fetch_assoc($res);
if($row){
    print_r("数据存在");
}else{
    $sql1="INSERT INTO  `goods`(`id`,`bil_id`,`name`,`tlabel`,`bi_name`,`img`,`price`) VALUES (NULL,'$id','$name','$tlabel','$bi_name','$img','$price')";
    $res1=mysqli_query($con,$sql1);
        if($res1){
            print_r("添加成功");
        }
}


?>



