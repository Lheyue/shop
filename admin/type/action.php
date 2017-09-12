
<?php
    require("../include/config.php");
	$link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("打开数据库失败");
	mysqli_set_charset($link,'utf8');
switch($_GET['a'])
{   case 'add':
      if($_POST['id'])
	  
	  {   
	      $sql="update type set state=0 where id={$_POST['id']};";//传过来的是父ID，有子类别state=0。
		  mysqli_query($link,$sql);
		  $sql="insert into type (name,pid,path) values('{$_POST['name']}','{$_POST['id']}','{$_POST['path']}{$_POST['id']},');";
		  mysqli_query($link,$sql);
		   if(mysqli_insert_id($link))
		  {
			  echo "添加子类别成功";
		  }
		  else{
			  echo "添加子类别失败";
		  }
	  }
	  
	  else//添加根类别
	  {
		  
	  //var_dump($_POST);
		$sql="insert into type(name,path) values('{$_POST['name']}','{$_POST['path']}');";
		mysqli_query($link,$sql);
		if(mysqli_insert_id($link))
		{
			echo "类别添加成功";
		}
		else
		{
			echo "类别添加失败";
		}
	  }
	break;
	case 'update':
	    $sql="update type set name='{$_POST[name]}' where id={$_GET[id]};";
		mysqli_query($link,$sql);
		//echo $sql;
		if(mysqli_affected_rows($link))
		{
			echo "修改成功";
		}
		else{
			echo "修改失败";
		}
	break;
    case 'del':
	     if($_GET['state']==1)
		 {
		   $sql="delete from type where id={$_GET[id]};";
		   mysqli_query($link,$sql);
		   if(mysqli_affected_rows($link))
		   {
			   $sql="select * from type where pid={$_GET['pid']};";//找到有和要删除的有同一个pid的一行
			   $res=mysqli_query($link,$sql);
			   if(mysqli_num_rows($res)<1)//查询结果集里有几条,小于1则说明没有匹配到相同级别的
			   {
				   //更改父类别状态
				   $sql="update type set state='1' where id={$_GET[pid]};";
				   mysqli_query($link,$sql);
				   if(mysqli_affected_rows($link))
				   {
					   echo "类别删除成功，父类别状态修改成功";
				   }else{
					   echo "类别删除成功，父类别状态修改失败";
				   }
			   }
			   else{
				   echo "类别删除成功，但是有同级类别存在，父类别无需修改。";
			   }
		   }else{
			   echo "类别删除失败";
		   }
		 }
		 else{
			 //有子类别存在，不能删除
			 echo "有子类别存在，不能删除!";
		 }
	break;
}
		
?>