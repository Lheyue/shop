

<?php
  //echo $_GET['id'];//订单号
   require("./include/config/config.php");
    $link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
	mysqli_set_charset($link,"utf8");
	$sql="update orders set status='2' where id={$_GET['id']}";
	//echo $sql;
	mysqli_query($link,$sql);
	if(mysqli_affected_rows($link))
	{
		echo "状态修改成功！";
	}else{
		echo "状态修改失败！";
		
	}