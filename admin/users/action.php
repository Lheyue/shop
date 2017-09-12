<?php
  //var_dump($_POST);
  $name='';
  $values='';
  require("../include/config.php");
  $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
  mysqli_set_charset($link,'utf8');
  
  switch($_GET['a'])
  {
	  case "insert":
			   foreach($_POST as $k=>$v)
		  {
			  $name.=",".$k;
			  $values.=",'".$v."'";
		  }
		  $name=ltrim($name,',');//去掉字符串左边的逗号,
		  $values=ltrim($values,',');
		 // echo $name."<br />";
		//  echo $values;
		  $sql="insert into users({$name}) values({$values});";
		  mysqli_query($link,$sql);
		   if(mysqli_insert_id($link))
		   {
			   echo "数据插入成功";
		   }
		   else{
			   echo "数据插入失败";
		   }
		 // echo $sql;
	  break;
	  case "update":
	      //var_dump($_POST);
		  $set="";
		  foreach($_POST as $k=>$v)
		  {
			   $set.=",".$k."='"."$v"."'";
		  }
		  $set=ltrim($set,",");
		  $sql="update users set {$set} where id={$_GET[id]};";
		 // echo $sql;
		  mysqli_query($link,$sql);
		 
		  if(mysqli_affected_rows($link))//判断是否影响函数的行数
		  {
			  echo "数据修改成功";
		  }
		  else{
			  echo "数据修改失败";
		  }
	  break;
	  case "del":
	     //var_dump($_POST);
		 // echo $_GET[id];
		   $sql="delete from users where id={$_GET[id]};";
		   mysqli_query($link,$sql);
		    if(mysqli_affected_rows($link))//判断是否影响函数的行数
		  {
			  echo "数据删除成功";
		  }
		  else{
			  echo "数据删除失败";
		  }
	  break;
  }
 
?>
