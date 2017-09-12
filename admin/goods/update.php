
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
				  $sql="select * from goods where id={$_GET['id']};";
				 // echo $sql;
				 $res=mysqli_query($link,$sql);
				 $list=mysqli_fetch_assoc($res);
	       ?> 
           <form action='action.php?a=update&id=<?php echo $list['id']; ?>&picname=<?php echo $list['picname']; ?>' method='post' enctype='multipart/form-data' ><!--涉及到文件用enctype-->
		        <table border='1' cellspacing='0'>
				     <tr>
					    <td><img src='./pics/s_<?php echo $list['picname']; ?>'></td>
					    <td>
						     <input  type='file' name='picname' />
						</td>
					 </tr>
					 <tr>
					     <td>商品名称</td>
						  <td>  
						      <input type='text' name='goods' value=<?php echo $list['goods']; ?> />
						  </td>
					 </tr>
					  <tr>
					     <td>生产厂家</td>
						  <td>  
						      <input type='text' name='company' value=<?php echo $list['company']; ?> />
						  </td>
					 </tr>
					  <tr>
					     <td>简介</td>
						  <td>  
						      <textarea cols='20' rows='5' name='descr'><?php echo $list[descr]; ?></textarea>
						  </td>
					 </tr>
					  <tr>
					     <td>单价</td>
						  <td>  
						      <input type='text' name='price' value=<?php echo $list['price']; ?> />
						  </td>
					 </tr>
					  
					  <tr>
					     <td>状态</td>
						  <td>  
						      <select name='state'>
							     <option value='1' <?php if($list['state']=='1'){echo "selected";} ?> />新添加
							     <option value='2' <?php if($list['state']=='2'){echo "selected";} ?> />在售
							     <option value='3' <?php if($list['state']=='3'){echo "selected";} ?> />下架
							  </select>
						  </td>
					 </tr>
					  <tr>
					     <td>库存</td>
						  <td>  
						      <input type='text' name='store' value=<?php echo $list['store']; ?> />
						  </td>
					 </tr>
					 
					  <tr>
						  <td colspan='2' align='center'>  
						     <input type='submit' />
							 <input type='reset' />
						  </td>
					 </tr>
				</table>
				
		   </form>
	   </center>
   </body>
</html>