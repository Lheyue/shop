
<?php
session_start();
     require("../config/config.php");
	 $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("打开数据库失败");
	mysqli_set_charset($link,'utf8');
	//var_dump($_POST);
	var_dump($_GET);
switch($_GET['a'])
{
	case "order":
	var_dump($_POST);
	$sql="select * from users where username='{$_SESSION['username']}';";
	echo $sql;
	$res = mysqli_query($link,$sql);
	$userlist = mysqli_fetch_assoc($res);
	
	for($i=0; $i<count($_POST['goodsid']);$i++)
	{
		//订单表信息插入
		$name="uid,linkman,address,code,phone,addtime,total";
		$values="'{$userlist['id']}','{$userlist['name']}','{$userlist['address']}','{$userlist['code']}','{$userlist['phone']}','{$userlist['addtime']}','{$_POST['total'][$i]}'";
		$sql="insert into orders ({$name}) values ({$values});";
		mysqli_query($link,$sql);
		echo $sql;
		echo "<br/>";
		$orderid=mysqli_insert_id($link);
		//订单详情表信息插入
		$name="orderid,goodsid,name,price,num";
	    $values="'{$orderid}','{$_POST['goodsid'][$i]}','{$_POST['name'][$i]}','{$_POST['price'][$i]}','{$_POST['num'][$i]}'";
		$sql="insert into detail ({$name}) values({$values});";
		mysqli_query($link,$sql);
		echo $sql;
		echo "<br/>";
		$sql="delete from buycar where id={$_POST['id'][$i]};";
		mysqli_query($link,$sql);
		
		echo $sql;
		echo "<br/>";
	}
	
	header("Location:../../order.php");
	
	break;
	case "del":
	$sql="delete from buycar where id='{$_GET['id']}';";
	echo $sql;
	$res = mysqli_query($link,$sql);
	if(mysqli_affected_rows($link))
	{
		echo "删除成功";
	}
	else{
		echo"删除失败";
	}
	break;
}