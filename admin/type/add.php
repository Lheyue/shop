<!DECTYPE html>
<html>
    <head>
		<meta charset='utf-8' />
	</head>
	<body>
		<center>
			<h2>类别添加</h2>
			<?php
			    isset($_GET['name'])? $name=$_GET['name']:$name="根类别名称";//isset判断一个变量是否存在的函数
			    isset($_GET['id'])? $id=$_GET['id']:$id="0";
			    isset($_GET['path'])? $path=$_GET['path']:$path="0,";
				
			?>
			<!--把值传给action做处理，用post的方式-->
			<form action='action.php?a=add' method='post'>
			<input type='hidden' name='path' value='<?php echo $path;?>'/>
			<input type='hidden' name='id' value='<?php echo $id;?>'/>
			<table border='1' cellspacing='0'>
			  <tr>
			     <td><?php echo $name;?></td>
				 <td><input type='text' name='name' /></td>
			  </tr>
			  <tr align='center'>
			    
				 <td colspan='2'><input type='submit'/>
				 <input type='reset' />
				 </td>
			  </tr>
			</table>
			</form>
		</center>
	</body>
</html>