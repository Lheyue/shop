
<?php
     session_start();
     require("../config/config.php");
	 $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("打开数据库失败");
	mysqli_set_charset($link,'utf8');
	
var_dump($_POST);
var_dump($_SESSION['code']);

switch($_GET['a'])
{
	case "login":
	if($_SESSION['code']==$_POST['code'])
	{
		$sql="select * from users where username='{$_POST['username']}';";
		$res=mysqli_query($link,$sql);
		$list=mysqli_fetch_assoc($res);
		if(mysqli_num_rows($res)<1)
		{
			echo "用户名不存在";
		}else{
			 if($_POST['password']==$list['pass'])
			 {
				 $_SESSION['username']=$list['username'];
				 header("Location:../../Object.php");
				 
			 }else{
				 echo "密码不正确";
				// echo $list['pass'];
			 }
		}
	}else
	{
		echo "验证码错误";
	}
	break;
	case 'out':
	   unset($_SESSION['code']);
	   unset($_SESSION['username']);
	   header("Location:../../Object.php");
	   echo "退出";
	break;
	
	
}
?>