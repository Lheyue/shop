<?php
   session_start();
   //var_dump($_POST);
     session_start();
     require("../config/config.php");
	 $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("打开数据库失败");
	mysqli_set_charset($link,'utf8');
switch($_GET['a'])
{
	case "buycar":
	 $name='';
	 $values='';
	 foreach($_POST as $k=> $v)
	 {
		 $name.=",".$k;
		 $values.=",'".$v."'";
		 
	 }
	 $name=ltrim($name,",");
	 $values=ltrim($values,",");
	 $sql="insert into buycar({$name},username) values({$values},'{$_SESSION['username']}');";
	 echo "$sql";
	mysqli_query($link,$sql); 
	header("Location:../../buy.php");
	break;
}