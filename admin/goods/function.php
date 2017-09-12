<?php

/*************************************************************************
 *函数名称：fileUpload
 *函数功能：上传文件
 *形参列表：	upfile：上传文件	path：上传路径	
 *				typelist：类型过滤	maxsize：上传大小限制，默认0不限制
 *返回值：res["error"]是否成功		res["info"]失败原因或成功文件名
 *E-mail：ice_wan@msn.cn
 *************************************************************************/

function fileUpload($upfile,$path,$typelist=array(),$maxsize=0){
	//1.初始化变量信息
	$path = rtrim($path,"/")."/"; //上传文件存储目录
	$res = array("error"=>false,"info"=>""); //定义返回结果格式
	// var_dump($upfile);
	// die('fun');
	//2.判断上传错误号
	if($upfile['error']>0){
		switch($upfile['error']){
			case 1: $info = "上传文件超出php.ini配置大小"; break;
			case 2: $info = "上传大小超过表单MAX_FILE_SIZE"; break;
			case 3: $info = "文件只有部分被上传"; break;
			case 4: $info = "没有文件被上传"; break;
			case 6: $info = "找不到临时文件夹"; break;
			case 7: $info = "文件写入失败"; break;
			default: $info="未知错误！"; break;
		}
		$res['info']=$info;
		return $res;
	}

	//3.过滤上传文件类型
	if(count($typelist)>0){
		if(!in_array($upfile['type'],$typelist)){
			$res['info']="文件类型错误！";
			return $res;
		}
	}

	//4. 过滤上传文件大小
	if($maxsize>0 && $upfile['size']>$maxsize){
		$res['info']="文件大小超出限制！";
		return $res;
	}

	//5.随机上传文件名
	$ext = pathinfo($upfile['name'],PATHINFO_EXTENSION); //获取上传文件的扩展名
	do{
		//随机新的上传文件名
		$filename = date("YmdHis").rand(1000,9999).".".$ext;
	}while(file_exists($path.$filename)); //判断是否存在
    
	//6.移动上传文件
	//先判断是否是上传文件
	if(is_uploaded_file($upfile['tmp_name'])){
		//移动上传文件
		if(move_uploaded_file($upfile['tmp_name'],$path.$filename)){
			$res['info']=$filename;
			$res['error']=true;
		}else{
			$res['info']="上传文件移动失败！";
		}
	}else{
		$res['info']="不是一个有效的上传文件！";
	}
	return $res;
}

/*****************************************************************
 *函数名称：imageResize
 *函数功能：缩放图片
 *形参列表：picname：图片文件名称		
 *     		maxWidth 图片被缩放后的最大宽度
 *			maxHeight 图片被缩放后的最大高度
 *			pre 缩放后的图片名前缀，默认为"s_"
 *返回值：布尔值表示成功与否。
 *E-mail：ice_wan@msn.cn
 ****************************************************************/

function imageResize($picname,$path,$maxWidth,$maxHeight,$pre="s_"){
    $path = rtrim($path,"/")."/";
    //1获取被缩放的图片信息
    $info = getimagesize($path.$picname);
    //获取图片的宽和高
    $width = $info[0];
    $height = $info[1];
    
    //2根据图片类型，使用对应的函数创建画布源。
    switch($info[2]){
        case 1: //gif格式
            $srcim = imagecreatefromgif($path.$picname);
            break;
        case 2: //jpeg格式
            $srcim = imagecreatefromjpeg($path.$picname);
            break;
        case 3: //png格式
            $srcim = imagecreatefrompng($path.$picname);
            break;
       default:
            return false;
            //die("无效的图片格式");
            break;
    }
    //3. 计算缩放后的图片尺寸
    if($maxWidth/$width<$maxHeight/$height){
        $w = $maxWidth;
        $h = ($maxWidth/$width)*$height;
    }else{
        $w = ($maxHeight/$height)*$width;
        $h = $maxHeight;
    }
    //4. 创建目标画布
    $dstim = imagecreatetruecolor($w,$h); 

    //5. 开始绘画(进行图片缩放)
    imagecopyresampled($dstim,$srcim,0,0,0,0,$w,$h,$width,$height);

    //6. 输出图像另存为
    switch($info[2]){
        case 1: //gif格式
            imagegif($dstim,$path.$pre.$picname);
            break;
        case 2: //jpeg格式
            imagejpeg($dstim,$path.$pre.$picname);
            break;
        case 3: //png格式
            imagepng($dstim,$path.$pre.$picname);
            break;
    }

    //7. 释放资源
    imagedestroy($dstim);
    imagedestroy($srcim);
    
    return true;
}