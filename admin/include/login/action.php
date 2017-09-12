<?php
    //var_dump($_POST);
	require("../config.php");
	$link=mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("数据库连接失败");
	mysqli_set_charset($link,'utf8');
	$username=$_POST['username'];
	$password=$_POST['password'];
	$sql="select * from users where username='{$username}';";
	$res=mysqli_query($link,$sql);
	$list=mysqli_fetch_assoc($res);
	if(mysqli_num_rows($res)<1)//返回的条数
	{
		die("该用户不存在");
	}else{
		if($list['pass']==$password)
		{
			if($list['state']==0)
			{
				header("Location:../../daohang.php");
			}else{
				die("你没有权限登录后台");
			}
		}else{
			echo "密码不正确";
		}
	}
?>