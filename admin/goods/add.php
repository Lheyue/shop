
<!DOCTYPE html>
<html>
   <head>
        <meta charset='utf-8'/>
   </head>
   <body>
       <center>
	       <?php 
		          require("../include/config.php");
	  	          $link=mysqli_connect(HOST,USER,PASSWORD,DBNAME)or die("连接数据库失败");
				  mysqli_set_charset($link,'utf8');
	       ?> 
           <form action='action.php?a=add' method='post' enctype='multipart/form-data' ><!--涉及到文件用enctype-->
		        <table border='1' cellspacing='0'>
				     <tr>
					    <td>选择商品类别</td>
					    <td>
						     <select name='typeid'>
							     <?php
								     $sql="select * from type where state=1;";
									 $res=mysqli_query($link,$sql);
									 while($list=mysqli_fetch_assoc($res))
									 {
										 echo "<option value='{$list['id']}' />{$list['name']}";
									 }
								 ?>
							 </select>
						</td>
					 </tr>
					 <tr>
					     <td>商品名称</td>
						  <td>  
						      <input type='text' name='goods' />
						  </td>
					 </tr>
					  <tr>
					     <td>生产厂家</td>
						  <td>  
						      <input type='text' name='company' />
						  </td>
					 </tr>
					  <tr>
					     <td>简介</td>
						  <td>  
						      <textarea cols='20' rows='5' name='descr'></textarea>
						  </td>
					 </tr>
					  <tr>
					     <td>单价</td>
						  <td>  
						      <input type='text' name='price' />
						  </td>
					 </tr>
					  <tr>
					     <td>图片名</td>
						  <td>  
						      <input type='file' name='picname' />
						  </td>
					 </tr>
					  <tr>
					     <td>状态</td>
						  <td>  
						      <select name='state'>
							     <option value='1' />新添加
							     <option value='2' />在售
							     <option value='3' />下架
							  </select>
						  </td>
					 </tr>
					  <tr>
					     <td>库存</td>
						  <td>  
						      <input type='text' name='store' />
						  </td>
					 </tr>
					 
					  <tr>
						  <td colspan='2' align='center'>  
						     <input type='submit' />
							 <input type='reset' />
						  </td>
					 </tr>
				</table>
				<input type='hidden' name='addtime' value='<?php echo time(); ?>' />
		   </form>
	   </center>
   </body>
</html>