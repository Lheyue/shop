  <?php 
   require("../include/config.php");
   require("./function.php");
   $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
   mysqli_set_charset($link,'utf8');
	      
    switch($_GET['a'])
	{
	 case 'add':
		  var_dump($_POST);
		  var_dump($_FILES['picname']);
		  $path="./pics/";
		  $typelist=["image/png","image/jpg","image/gif","image/jpeg"];
		  $res=fileUpload($_FILES['picname'],$path,$typelist);//function.php里的函数
		  if($res['error'])
		  {
			  imageResize($res['info'],$path,130,100,"s_");//function.php里的函数，改变图片大小
			  imageResize($res['info'],$path,300,200,"m_");//function.php里的函数，改变图片大小
				foreach($_POST as $k=>$v)
			  {
				  $name.=",".$k;
				  $values.=",'".$v."'";
			  }
			    $name=ltrim($name,",");
		        $values=ltrim($values,","); 
				$name.=",picname";//将上传的图片名称加到后面
				$values.=",'".$res['info']."'";
		  $sql="insert goods({$name}) values({$values});"; 
		  //echo $sql;
		  mysqli_query($link,$sql);
		  if(mysqli_insert_id($link))
		  {
			  echo "商品添加成功";
		  }else{
			  echo "商品添加失败";
		  }
		  }else{
			  echo $res['info'];//函数中的错误提醒存在这里。
		  }
		
		
		 
	break;
	case "update":
	//var_dump($_FILES['picname']);
	//var_dump($_FILES['picname']['name']);die;
	    if(!empty($_FILES['picname']['name']))//为空说明没有新的图片上传
		{
			//有图片上传的部分
			$path="./pics/";
			@unlink($path.'s_'.$_GET['picname']);//删除原来的图片 加@表示强制执行，不报警告。
			@unlink($path.'m_'.$_GET['picname']);
			@unlink($path.''.$_GET['picname']);
					
					//重新上传图片，粘贴自上面的case
					  $typelist=["image/png","image/jpg","image/gif","image/jpeg"];
					  $res=fileUpload($_FILES['picname'],$path,$typelist);//function.php里的函数
					  if($res['error'])//为真说明图片上传成功
					  {
						  imageResize($res['info'],$path,130,100,"s_");//function.php里的函数，改变图片大小
						  imageResize($res['info'],$path,300,200,"m_");//function.php里的函数，改变图片大小
						
						foreach($_POST as $k=>$v)
						{
							$set.=",".$k."='".$v."'";
						}
						$set=ltrim($set,',');
						$set.=",picname='".$res['info']."'";
						//echo $set;die;
					    $sql="update goods set {$set} where id={$_GET['id']};"; 
					
					  }else{
						  //上传文件失败的错误信息
						  echo $res['info'];//函数中的错误提醒存在这里。
					  }
		}else{
			//没有图片上传的部分
			$set='';
			foreach($_POST as $k=>$v)
			{
				$set.=",".$k."='".$v."'";
			}
			$set=ltrim($set,',');
			$sql="update goods set {$set} where id={$_GET['id']};";
			
		}
		mysqli_query($link,$sql);//无论有没有图片插入，都会执行sql语句。
		if(mysqli_affected_rows($link))
		{
			echo "修改成功";
		}else{
			echo "修改失败";
		}
    break;	
	case 'del':
	    $sql="delete from goods where id='{$_GET['id']}';";
		echo $sql;
		mysqli_query($link,$sql);
		if(mysqli_affected_rows($link))
		{
		    $path="./pics/";
			@unlink($path.'s_'.$_GET['picname']);//删除原来的图片 加@表示强制执行，不报警告。
			@unlink($path.'m_'.$_GET['picname']);
			@unlink($path.''.$_GET['picname']);
			
			echo "删除成功";
		}else{
			echo "删除失败";
		}
	break;
}	
?> 