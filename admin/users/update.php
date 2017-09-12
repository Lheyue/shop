<html>
   <head>
       <meta charset='utf-8'/>
	   <title></title>
   </head>
   <body>
      <center>
	  <?php
	      require("../include/config.php");
		  $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("数据库连接失败");
		  mysqli_set_charset($link,"utf8");
		  $sql="select * from users where id={$_GET['id']};";
		  $res=mysqli_query($link,$sql);
		  $list=mysqli_fetch_assoc($res);
		  //var_dump($list);
	  ?>
	    <h2>会员添加</h2>
		<form action='action.php?a=update&id=<?php echo $list[id];?>' method='post'>
		<input type='hidden' name='addtime' value='<?php echo time()?>'>
	    <table border='1' cellspacing='0'>
		    <tr>
		      <td>账号：</td>
			  <td><input type='text' name='username' value='<?php echo $list['username']?>'/></td>
		    </tr>
		    <tr>
			  <td>真实姓名：</td>
			  <td><input type='text' name='name' value='<?php echo $list['name']?>'/></td>
			</tr>
			<tr>
			  <td>密码；</td>
			  <td><input type='text' name='pass' value='<?php echo $list['pass']?>'/></td>
			</tr>
			 <tr>
			  <td>性别：</td>
			  <td><input type='radio' name='sex' value='1'<?php if($list['sex']==1){echo "checked";}?>/>男
			  <input type='radio' name='sex' value='0' <?php if($list['sex']==0){echo "checked";}?>/>女
			  </td>
			</tr>
			<tr>
			  <td>地址；</td>
			  <td><input type='text' name='address' value='<?php echo $list['address']?>'/></td>
			</tr>
			<tr>
			  <td>邮编；</td>
			  <td><input type='text' name='code' value='<?php echo $list['code']?>'/></td>
			</tr>
			<tr>
			  <td>电话；</td>
			  <td><input type='text' name='phone' value='<?php echo $list['phone']?>'/></td>
			</tr>
			<tr>
			  <td>Email；</td>
			  <td><input type='text' name='email' value='<?php echo $list['email']?>'/></td>
			</tr>
			<tr>
			  <td>状态；</td>
			  <td>
			       <select>
				       <option value='1' />启用
				       <option value='2' <?php if($list['state']==2){echo "selected";}?> />禁用
				       <option value='0' <?php if($list['state']==0){echo "selected";}?> />后台管理员
				   </select>
			  </td>
		  
		   </tr>
		   <tr align='center'>
		       <td colspan='2'><input type='submit' />
		       <input type='reset' /></td>
		   </tr>
		</table>
	  </center>
   </body>
</html>