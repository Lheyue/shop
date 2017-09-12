<!DOCTYPE html>
<html>
   <head>
       <meta charset='utf-8'/>
	   <title></title>
   </head>
   <body>
      <center>
	   <h2>类别浏览</h2>
	   <table border='1' cellspacing='0'>
	     <tr>
		    <th>类别ID</th>
		    <th>类别名称</th>
		    <th>父类别ID</th>
		    <th>类别路径</th>
		    <th>类别状态</th>
		    <th>操作</th>
		   
		 </tr>
		 <?php
		     require("../include/config.php");
			 $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
			 mysqli_set_charset($link,'utf8');
			 $sql="select * from type;";
			 $res=mysqli_query($link,$sql);
			
			 while($list=mysqli_fetch_assoc($res))
			 {
				 echo "<tr>";
				      echo "<td>{$list['id']}</td>";
				      echo "<td>{$list['name']}</td>";
				      echo "<td>{$list['pid']}</td>";
				      echo "<td>{$list['path']}</td>";
				      echo "<td>{$list['state']}</td>";
				      echo "<td><a href='action.php?id={$list['id']}&a=del&state={$list['state']}&pid={$list['pid']}'>删除</a></td>";
				 echo "</tr>";
			 }
		 ?>
	   </table>
	  </center>
   </body>
</html>