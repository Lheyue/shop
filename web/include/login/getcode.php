<?php
	function getCode($length, $type=1)
	{
		$arr = "1234567890abcdefghijkmnpqrstuvwxyABCDEFGHJKLMNPQRSTUVWXY";
		
		$len1 = strlen("1234567890");
		$len2 = strlen("1234567890abcdefghijkmnpqrstuvwxy");
		$len3 = strlen($arr);
		
		switch($type)
		{
		case 1:
			for($i = 0; $i < $length; $i++)
				$res .= $arr[rand(0, $len1 - 1)];
			return $res;
		case 2:
			for($i = 0; $i < $length; $i++)
				$res .= $arr[rand(0, $len2 - 1)];
			return $res;
		case 3:
			for($i = 0; $i < $length; $i++)
				$res .= $arr[rand(0, $len3 - 1)];
			return $res;
		default:
			die("²ÎÊý´«µÝ´íÎó£¡");
		}
	}
?>