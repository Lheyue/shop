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
			      <th>图片</th>
			      <th>商品ID</th>
			      <th>类别ID</th>
			      <th>商品名称</th>
			      <th>生产厂家</th>
			      <th>简介</th>
			      <th>单价</th>
			      <th>状态</th>
			      <th>库存量</th>
			      <th>被购买数</th>
			      <th>点击次数</th>
			      <th>添加时间</th>
			   </tr>
			   <?php
			        $sql="select * from goods;";
					$res=mysqli_query($link,$sql);
					$state=['1'=>"新添加",'2'=>"在售",'3'=>"下架"];
					while($list=mysqli_fetch_assoc($res))
					{
						echo "<tr>";
						  echo "<td><img src='./pics/s_{$list['picname']}'/></td>";
						  echo "<td>{$list['id']}</td>";
						  echo "<td>{$list['typeid']}</td>";
						  echo "<td>{$list['goods']}</td>";
						  echo "<td>{$list['company']}</td>";
						  echo "<td>{$list['descr']}</td>";
						  echo "<td>{$list['price']}</td>";
						  echo "<td>{$state[$list['state']]}</td>";//把state显示成中文
						  echo "<td>{$list['store']}</td>";
						  echo "<td>{$list['num']}</td>";
						  echo "<td>{$list['clicknum']}</td>";
						  echo "<td>".date("Y-m-d",$list['addtime'])."</td>";
						echo "<tr>";
					}
			   ?>
		   </table>
		</center>
	</body>
        
</html>