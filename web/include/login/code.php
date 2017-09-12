<?php
session_start();
//验证码的绘制

include("./getcode.php");
//1. 初始化变量信息

$length=4;						//验证码的长度（几位验证）
$code = getCode($length,1);

$_SESSION['code'] = $code;
// $var_dump($_SESSION('code'));
// die();
//调用生成验证码函数，获取到验证码
$width=$length*18;				//定义验证码画布宽度
$height=22;						//定义验证码画布高度
//2. 准备画布
$im = imagecreatetruecolor($width,$height);

$bg[0] = imagecolorallocate($im,220,220,220); //分配一个颜色
$bg[1] = imagecolorallocate($im,184,249,252); //分配一个颜色
$bg[2] = imagecolorallocate($im,251,166,247); //分配一个颜色
$bg[3] = imagecolorallocate($im,190,227,250);//分配一个颜色
//----------------------------------------------------------------
$c[0] = imagecolorallocate($im,255,0,0); //分配一个颜色
$c[1] = imagecolorallocate($im,0,0,255); //分配一个颜色
$c[2] = imagecolorallocate($im,19,117,24); //分配一个颜色
$c[3] = imagecolorallocate($im,112,26,119); //分配一个颜色
$c[4] = imagecolorallocate($im,139,129,37); //分配一个颜色
$c[5] = imagecolorallocate($im,23,145,145); //分配一个颜色

//3.开始绘画
//随机填充背景
imagefill($im,0,0,$bg[rand(0,3)]);

//绘制验证码
for($i=0;$i<$length;$i++){
	imagettftext($im,15,rand(-50,50),4+$i*15,18,$c[rand(0,5)],"./msyh.ttf",$code[$i]);
}
//绘制干扰线和点
for($i=0;$i<5;$i++){	//5条干扰线
	$cc = imagecolorallocate($im,rand(0,255),rand(0,255),rand(0,255));
	imageline($im,rand(0,$width - 1),rand(0,$height),rand(0,$width),rand(0,$height),$cc);
}
for($i=0;$i<50;$i++){	//50个干扰点
	$cc = imagecolorallocate($im,rand(0,255),rand(0,255),rand(0,255));
	imagesetpixel($im,rand(0,$width),rand(0,$height),$cc);
}

//4. 输出
header("Content-Type:image/jpeg");
imagepng($im);

//5.释放资源
imagedestroy($im);
?>