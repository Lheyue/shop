
<?php
      require("../include/config.php");
	  $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
	  mysqli_set_charset($link,'utf8');
    //echo $_POST['status'];
   // echo $_GET['id'];
	
	$sql = "update orders set status='{$_POST['status']}' where id={$_GET['id']};";
	// echo $sql;
	mysqli_query($link,$sql);
	
	if(mysqli_affected_rows($link))
	{
		echo "状态修改成功！";
	}else{
		echo "状态修改失败！";
		
	}

?>