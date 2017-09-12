<!DOCTYPE html>
<html>
      <head>
         <meta charset='utf-8' />
      </head>
	<body>
	    <center>
		   <h2>商品浏览</h2>
		   <?php 
		      require("../include/config.php");
			  $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
			  mysqli_set_charset($link,'utf8');
		   ?>
		   <table border='1' cellspacing='0'>
		       <tr>
			      <th>ID</th>
			      <th>会员ID</th>
			      <th>联系人</th>
			      <th>地址</th>
			      <th>邮编</th>
			      <th>电话</th>
			      <th>购买时间</th>
			      <th>总金额</th>
			      <th>状态</th>
			      <th>操作</th>
			    
			   </tr>
			   <?php
			        $sql="select * from orders;";
					$res=mysqli_query($link,$sql);
					$status=['0'=>"新订单",'1'=>"已发货",'2'=>"已收货",'3'=>"无效订单"];
					while($list=mysqli_fetch_assoc($res))
					{
						echo "<tr>";
						
						  echo "<td>{$list['id']}</td>";
						  echo "<td>{$list['uid']}</td>";
						  echo "<td>{$list['linkman']}</td>";
						  echo "<td>{$list['address']}</td>";
						  echo "<td>{$list['code']}</td>";
						  echo "<td>{$list['phone']}</td>";
						 
						  echo "<td>{$list['addtime']}</td>";
						  echo "<td>{$list['total']}</td>";
						  echo "<td>{$status[$list['status']]}</td>";
						  
					echo "<td><a href='update.php?id={$list['id']}'>状态修改</a></td>";
						
						//  echo "<td>".date("Y-m-d",$list['addtime'])."</td>";
						echo "<tr>";
					}
			   ?>
		   </table>
		</center>
	</body>
        
</html>