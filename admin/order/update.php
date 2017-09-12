<!DOCTYPE html>
<html>
   <head>
        <meta charset='utf-8'/>
   </head>
   <body>
       <center>
	   <h2>订单状态修改</h2>
<?php
    require("../include/config.php");
	$link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
	mysqli_set_charset($link,"utf8");
	echo $status;
	
?>
 <form action='action.php?id=<?php echo $_GET['id'] ?>' method='post' >
     <table border='1' cellspacing='0'>
	      <tr>
		       <td>状态</td>
			   <td colspan='2' align='center'>
			      <select name='status'>
					 <option value='0' <?php if($_GET['status']=='0'){ echo "selected";} ?> />新订单
					 <option value='1' <?php if($_GET['status']=='1'){ echo "selected";} ?> />已发货
					 <option value='2' <?php if($_GET['status']=='2'){ echo "selected";} ?> />已收货
					 <option value='3' <?php if($_GET['status']=='3'){ echo "selected";} ?> />无效订单
				  </select>
			   </td>
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