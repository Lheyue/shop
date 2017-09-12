<!DOCTYPE html>
<html>
   <head>
       <meta charset='utf-8'/>
	   <title></title>
   </head>
   <body>
      <center>
	    <h2>会员编辑</h2>
	   <table border='1' cellspacing='0'>
	     <tr>
		    <th>用户ID</th>
		    <th>账号</th>
		    <th>真实姓名</th>
		    <th>密码</th>
		    <th>性别</th>
		    <th>地址</th>
		    <th>邮编</th>
		    <th>电话</th>
		    <th>Email</th>
		    <th>状态</th>
		    <th>注册时间</th>
		    <th>操作</th>
		 </tr>
		 <?php
		     //引入配置文件
		     require("../include/config.php");
			 //连接数据库
			 $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
			 //设置字符集
			 mysqli_set_charset($link,'utf8');
			 //sql语句
			 $sql="select * from users;";
			 //执行查询后会返回一个资源。
			 $res=mysqli_query($link,$sql);
			 $sex=["0"=>"女","1"=>"男"];
			 $state=["0"=>"后台管理员","1"=>"启用","2"=>"禁用"];
			 while($list=mysqli_fetch_assoc($res))//把资源变成一个关联式数组，再从数组中把值取出来
			 {   
				 echo "<tr>";
				    echo"<td>{$list['id']}</td>";
				    echo"<td>{$list['username']}</td>";
				    echo"<td>{$list['name']}</td>";
				    echo"<td>{$list['pass']}</td>";
				    echo"<td>{$sex[$list['sex']]}</td>";//把sex里的1和0，用访问数组下标的方式改成男和女。
				    echo"<td>{$list['address']}</td>";
				    echo"<td>{$list['code']}</td>";
				    echo"<td>{$list['phone']}</td>";
				    echo"<td>{$list['email']}</td>";
				    echo"<td>{$state[$list['state']]}</td>";
				    echo"<td>{$list['addtime']}</td>";
				    echo"<td><a href='update.php? id={$list['id']}'>修改</a></td>";//把当前要修改的id传过去。
					
				 echo "</tr>";
			 }
		 ?>
	   </table>
	  </center>
   </body>
</html>