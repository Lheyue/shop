<!DECTYPE html>
<html>
    <head>
		<meta charset='utf-8' />
	</head>
	<body>
		<center>
			<form action='action.php?a=update&id=<?php echo $_GET[id];?>' method='post'>
			    <table border='1' cellspacing='0'>
				   <tr>
				      <td><?php echo $_GET[name]?></td>
					  <td><input type='text' name='name'/></td>
				   </tr>
				   <tr align='center'>
				      <td colspan='2'><input type='submit' />
				      <input type='reset' /></td>
				   </tr>
				</table>
			</form>
		</center>
	</body>
</html>