<html>
   <head>
       <meta charset='utf-8'/>
	   <title></title>
   </head>
   <body>
      <center>
	    <h2>会员添加</h2>
		<form action='action.php?a=insert' method='post'>
		<input type='hidden' name='addtime' value='<?php echo time()?>'>
	    <table border='1' cellspacing='0'>
		    <tr>
		      <td>账号：</td>
			  <td><input type='text' name='username'/></td>
		    </tr>
		    <tr>
			  <td>真实姓名：</td>
			  <td><input type='text' name='name'/></td>
			</tr>
			<tr>
			  <td>密码；</td>
			  <td><input type='text' name='pass'/></td>
			</tr>
			 <tr>
			  <td>性别：</td>
			  <td><input type='radio' name='sex' value='1'/>男
			  <input type='radio' name='sex' value='0'/>女</td>
			</tr>
			<tr>
			  <td>地址；</td>
			  <td><input type='text' name='address'/></td>
			</tr>
			<tr>
			  <td>邮编；</td>
			  <td><input type='text' name='code'/></td>
			</tr>
			<tr>
			  <td>电话；</td>
			  <td><input type='text' name='phone'/></td>
			</tr>
			<tr>
			  <td>Email；</td>
			  <td><input type='text' name='email'/></td>
			</tr>
			<tr>
			  <td>状态；</td>
			  <td>
			       <select>
				       <option value='1'>启用
				       <option value='2'>禁用
				       <option value='0'>后台管理员
				   </select>
			  </td>
		  
		   </tr>
		   <tr align='center'>
		       <td colspan='2'><input type='submit' /></td>
		   </tr>
		</table>
	  </center>
   </body>
</html>