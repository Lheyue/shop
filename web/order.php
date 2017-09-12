<!DOCTYPE html>
<html>
<?php
	require("./include/config/config.php");
	$link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
	mysqli_set_charset($link,"utf8");

?>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" >

<title>订单页</title>
<link rel='stylesheet' href='include/order/css/topbar.css' media='screen' >
<link rel='stylesheet' href='include/order/css/popup.css' media='screen' >
<link rel='stylesheet' href='include/order/css/page.css' media='screen' >
<link rel='stylesheet' href='include/order/css/style.css' media='screen' >
<script src="include/order/js/jquery-1.10.1.min.js" type="text/javascript"></script>
<script src="include/order/js/common.js" type="text/javascript"></script>
<script type="text/javascript">var is_mobile = parseInt('');</script>
<script src="include/order/js/shop.js" type="text/javascript"></script>
<script src="include/order/js/shoppingcart.js" type="text/javascript"></script>
</head>
<body>
<!--头部Start--><div class="topbar">
<div class="wrapper">

<div class="user-info" id="topbar_user1">
<ul>

	<?php
				session_start();
				    if($_SESSION['username'])
					 {
					echo "<li><a href='i.php?c=login' class='cyc_tools_item' id=''>{$_SESSION['username']}</a></li>";
					echo "&nbsp&nbsp&nbsp&nbsp&nbsp";
					echo "<li><a class='cyc_tools_item' href='./include/login/action.php?a=out'>退出</a></li>";
					 }else{
					 echo "<li><a class='c_tools_item' href='login.php?c=login' target='_blank'>请登录</a></li> ";
					 echo "<li><a class='c_tools_item' href='i.php?c=login&a=reg' target='_blank'>免费注册</a></li>";
						 
					 }
				?>
</ul>
</div>
</div>
</div><!-- Header Start-->
<div class="wrapper" ><div class="nav">

</div><div class="address"><a href="/">商城首页</a><em>/</em><span>我的订单</span></div>
    <div class="shop-box">
    	<form method="post" action="/gtshop.php?mod=checkout" id="form1">
<div class="shop-tit"><h2 onClick="getShoppingcartTotal();">我的订单</h2><span>在线支付全场满50元免运费</span></div>
<div class="shop-goods">
        <!--  购物车商品列表 -->
          <dl>
            <dt>
                <span class="col col-2">会员ID</span>
                <span class="col col-2">联系人</span>
                <span class="col col-2">地址</span>
                <span class="col col-2">邮编</span>
                <span class="col col-2">电话</span> 
				<span class="col col-2">购买时间</span>
                <span class="col col-2">总金额</span>
                <span class="col col-2">状态</span>
                <span class="col col-2">操作</span>
            </dt>
        </dl>
			<?php
			     
				 $sql="select * from users where username='{$_SESSION['username']}';";
				 $res=mysqli_query($link,$sql);
				 $userlist=mysqli_fetch_assoc($res);
				 
				 
			     $sql="select * from orders where uid={$userlist['id']};";
				// echo $sql;
				 $res=mysqli_query($link,$sql);
				 
				 while($list=mysqli_fetch_assoc($res))
				 {
					echo " <dl>";
					$status=['0'=>"新订单",'1'=>"已发货",'2'=>"已收货",'3'=>"无效订单"];
					echo "<dt>";
					 echo "<span class='col col-2'>{$list['uid']}</span>";
					 echo "<span class='col col-2'>{$list['linkman']}</span>";
					 echo "<span class='col col-2'>{$list['address']}</span>";
					 echo "<span class='col col-2'>{$list['code']}</span>";
					 echo "<span class='col col-2'>{$list['phone']}</span>";
					 echo "<span class='col col-2'>{$list['addtime']}</span>";
					 echo "<span class='col col-2'>{$list['total']}</span>";
					 echo "<span class='col col-2'>{$status[$list['status']]}</span>";
					 echo "<span class='col col-2'><a href='orderdetail.php?id={$list['id']}'>订单详情</a></span>";
					 
					 
				 echo " </dl>";
				 echo "</dt>";
				 }
			?>
        
    </div>
<div class="clear"></div>

            <input type="submit" id="form1_submit" style="display:none">
        </form>
       
</div>
</div><div class="box_os"  style="display:none;">
<div class="os_x" onclick="hideService();"></div>
    <div class="index-kf">
<h2>金牌客服<a class="fl-r" onClick="$('#d_work_time2').removeClass('hid')">工作时间&gt;</a></h2>
<ul class="kf-list">
<li>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=95956" target="_blank"><img src="include/order/picture/kf1.jpg"></a>
<h3 class="kf-online">
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=2505159552&amp;site=qq&amp;menu=yes" target="_blank" onclick="chartLog(95956, this);" class="qq-btn">向TA咨询</a>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=95956" target="_blank">樊锐</a><i>▪</i></h3>
<p>服务宣言：解答专业严谨，态度温柔舒心</p>
</li>
<li>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=190161" target="_blank"><img src="include/order/picture/kf2.jpg"></a>
<h3 class="kf-online">
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1046732404&amp;site=qq&amp;menu=yes" target="_blank" onclick="chartLog(190161, this);" class="qq-btn">向TA咨询</a>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=190161" target="_blank">段传礼</a><i>▪</i></h3>
<p>服务宣言：只为让你离梦想更近一步</p>
</li>
<li>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=206444" target="_blank"><img src="include/order/picture/kf3.jpg"></a>
<h3 class="kf-online">
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1984989752&amp;site=qq&amp;menu=yes" target="_blank" onclick="chartLog(206444, this);" class="qq-btn">向TA咨询</a>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=206444" target="_blank" style="letter-spacing:-1px">青龙</a><i>▪</i></h3>
<p>服务宣言：精于业务  乐于服务</p>
</li>
<!--
<li>
<div style="height:60px;">&nbsp;</div>
</li>
-->
</ul>
<h2 class="jb-title">首席客服</h2>
<ul>
<li>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=3" target="_blank"><img src="include/order/picture/shouxi.jpg"></a>
<h3 class="kf-offline">
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=706548385&amp;site=qq&amp;menu=yes" target="_blank" onclick="chartLog(3, this);" class="qq-btn">离线请留言</a>
<a href="http://www.guitarworld.com.cn/home.php?mod=space&uid=3" target="_blank">大叔</a><i>▪</i></h3>
<p>网站创始人</p>
</li>
</ul>
        <div class="work-time hid" id="d_work_time2">
<a class="ico-close" onClick="$('#d_work_time2').addClass('hid')">关闭</a>
<h2>工作时间：</h2>
<p>周一至周日</p>
<p>上午9:00 - 12:00</p>
<p>下午13:00 - 18:00</p>
<h2 class="work-tel">400-030-7578</h2>
<p>电话服务时间：</p>
<p>周一至周日</p>
<p>上午9:00 - 晚上22:00</p>
<p>（仅收取市话费）</p>
<p class="mt-10px">注：国家法定节假日休息</p>
</div>
</div>
<div class="clear"></div>
    <div class="acbox">
    	<a class="ico_pp" href="http://www.guitarworld.com.cn/yijian/" target="_blank" title="意见反馈"></a>
        <a class="ico_gt" onclick="goTop();" target="_self" title="回顶部"></a>
    </div>
</div>
<div class="onlineService" style="display:block;">
<p class="ico_os" onclick="showService();"></p>
    <a class="ico_pp" href="http://www.guitarworld.com.cn/yijian/" target="_blank" title="意见反馈"></a>
    <a class="ico_gt" onclick="goTop();" target="_self" title="回顶部"></a>
</div>
<script type="text/javascript">
var isIndex = ('shoppingcart' == 'index');
function showService() {
$('.onlineService').hide();
$('.box_os').show();
}
function hideService() {
$('.box_os').hide();
$('.onlineService').show();
}
function onResize() {
if($(window).width() <= 1200){
$("body").addClass("body-wrap");
if (isIndex) $('.onlineService').show();
}
else{
$("body").removeClass("body-wrap");	
//if (isIndex) $('.onlineService').hide();
}
}
$().ready(function(){
$(window).bind('resize', onResize);
onResize();
});
function chartLog(kf, obj) {
$.ajax({type:"POST",
url:'./?mod=ajax_asklog',
dataType:"text",
data:{servicerid:kf, urlid: new Date().getTime()},
async:true,
success:function(data){if(data == 'set'){
if ($(obj).parent().attr('class') == 'kf-offline') {
$(obj).parent().attr('class', 'kf-online');
$(obj).html('向TA咨询');
} else {
$(obj).parent().attr('class', 'kf-offline');
$(obj).html('离线请留言');
}
}}
});

}

</script><div class="footer-inner">
<div class="wrapper">
<ul>
<li class="f-icon1"><h3>正品保障</h3><p>全场正品，行货保障</p></li>
<li class="f-icon2"><h3>晒单奖励</h3><p>晒单可获得吉他币奖励</p></li>
<li class="f-icon3"><h3>专业配送</h3><p>尊享全国满50元包邮服务</p></li>
<li class="f-icon4"><h3>无忧退换货</h3><p>支持7天退货，15天换货</p></li>
<li class="f-icon5"><h3>特色服务体验</h3><p>注重细节，以人为本</p></li>
</ul>
</div>
</div>

<div class="footer-nav">
<div class="wrapper">
<dl>
<dt>购物指南</dt>
<dd><a href="/member.php?mod=register" target="_blank">免费注册</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=buystep" target="_blank">购物步骤</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=showorder" target="_blank">用户晒单</a></dd>
</dl>
<dl>
<dt>支付物流</dt>
<dd><a href="/gtshop.php?mod=information&amp;t=payment" target="_blank">支付方式</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=delivery" target="_blank">配送方式</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=scope" target="_blank">配送范围</a></dd>
</dl>
<dl>
<dt>服务保障</dt>
<dd><a href="/gtshop.php?mod=information&amp;t=exchange" target="_blank">退换政策</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=refund" target="_blank">退款流程</a></dd>
<dd><a href="/gtshop.php?mod=information&amp;t=guarantee" target="_blank">正品保障</a></dd>
</dl>
<dl>
<dt>关于我们</dt>
<dd><a href="http://www.guitarworld.com.cn/about/" target="_blank">网站介绍</a></dd>
<dd><a href="http://www.guitarworld.com.cn/followus/" target="_blank">关注我们</a></dd>
<dd><a href="http://www.guitarworld.com.cn/contactus/" target="_blank">联系我们</a></dd>
</dl>
<dl>
<dt>帮助中心</dt>
<dd><a href="/member.php?mod=register" target="_blank">找回密码</a></dd>
<dd><a>常见问题</a></dd>
<dd><a href="/yijian/" target="_blank">意见反馈</a></dd>
</dl>
<div class="online">
<p class="hot-tel">400-030-7578</p>
            <p>(周一至周日9:00-22:00)</p>
            <p>（仅收取市话费）</p>
<p class="mt-10px"><a class="service-btn" onclick="goTop()">在线咨询</a></p>
</div>
<div class="clear"></div>
</div>
</div>
<div class="footer">
 
</div>

<div class="popup-bg" id="d_tip_login" style="display:none;">
<div class="popup login-box">
<div class="popup-title"><strong>您尚未登录</strong> <a class="ico-close" onclick="closeLogin();">关闭</a></div>
<div class="popup-cont">
<p class="login-tips" style="display:none;">错误提示区域</p>
<p class="login-input"><input type="text" id="loginUsername" value="用户名/UID/Email" style="color:#999" onfocus="inputFocus(this);" onblur="inputBlur(this, 1);" /></p>
<p class="login-input"><input type="password" id="loginPwd" value="密  码" style="color:#999" onfocus="inputFocus(this);" onblur="inputBlur(this, 2);"/></p>
<p class="login-row"><label class="fl-l"><input type="checkbox" id="autoLogin"/> 下次自动登录</label><a class="fl-r" href="http://www.guitarworld.com.cn/member.php?mod=register">找回密码?</a></p>
<p class="login-btn-box" onclick="loginDo();"><span class="login-btn">登    录</span></p>
<p class="txt-r"><a href="http://www.guitarworld.com.cn/member.php?mod=register"><b>免费注册</b></a></p>
<p style="color:#999">使用合作网站账号登录：</p>
<p><a href="/connect.php?mod=login&amp;op=init&amp;referer=http%3A%2F%2Fwww.guitarworld.com.cn%2F&amp;statfrom=login_simple"><img alt="qq登录" src="include/order/picture/login-qq.png"/></a>
   <a class="ml-10px" href="/xwb.php?m=xwbAuth.login"><img alt="新浪微博登录" src="include/order/picture/login-sina.png"/></a></p>
</div>
</div>
</div>
<script type="text/javascript">
function closeLogin() {
closePopup('d_tip_login');
}
function showLogin() {
openPopup('d_tip_login');
}
function inputFocus(obj) {
if ($(obj).val() == '用户名/UID/Email' || $(obj).val() == '密  码') {
$(obj).val('');
}
$(obj).css('color', '');
}
function inputBlur(obj, item) {
if ($(obj).val() != '') return;
if (item == 1) {
$(obj).css('color', '#999');
$(obj).val('用户名/UID/Email');
} else if (item == 2) {
$(obj).css('color', '#999');
$(obj).val('密  码');
}
}
function loginDo() {
$('.login-btn-box').removeAttr('onclick');
$('.login-btn').attr('class', 'login-btn no-login-btn');
var url = '/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&formhash=d39c9738';
var username = $('#loginUsername').val() == '用户名/UID/Email'?'': encodeURIComponent($('#loginUsername').val());
var password = $('#loginPwd').val() == '密  码'?'': encodeURIComponent($('#loginPwd').val());
if (username != '') {
url += '&username='+username;
}
if (password != '') {
url += '&password='+password;
}
if ($('#autoLogin').is(":checked")) {
url += '&cookietime='+3600*24*30;
}

$.ajax({
 type: "POST",
 url:url,
 success: function(msg){
$.ajax({
 type: "POST",
 url:'/islogined.php',
 success: function(msg){
if(msg == 1){
location.reload();
} else{
$('.login-tips').html('账号密码验证失败！');
$('.login-tips').show();
$('.login-btn-box').attr('onclick', 'loginDo();');
$('.login-btn.no-login-btn').attr('class','login-btn');
}
 },
 error: function(msg){
 $('.login-tips').html('登录失败！');
 $('.login-btn-box').attr('onclick', 'loginDo();');
 $('.login-btn.no-login-btn').attr('class','login-btn');
 }
}); 
 }  
}); 
}
$('#d_tip_login').keydown(function(e){
if(e.keyCode==13){
  loginDo();
}
});
</script>


<div class="popup-bg" id="d_tip_common" style="display:none">
<div class="popup">
<div class="popup-title"><strong>提示信息</strong> <a class="ico-close" onclick="closePopup('d_tip_common')">关闭</a></div>
<div class="popup-cont"><p id="d_tip_common_content"></p></div>
<div class="popup-foot"><span class="btn btn-orange" onclick="closePopup('d_tip_common')">确认</span></div> 
</div>
</div>

<div class="popup-bg" id="d_tip_confirm_delete_cart" style="display:none" attr_item_id="">
<div class="popup">
<div class="popup-title"><strong>提示信息</strong> <a class="ico-close" onclick="closePopup('d_tip_confirm_delete_cart')">关闭</a></div>
<div class="popup-cont">确认从购物车移除该商品？</div>
<div class="popup-foot"><span class="btn btn-orange" onclick="deleteCartOk()">确认</span> <span class="btn" onclick="closePopup('d_tip_confirm_delete_cart')">取消</span></div> 
</div>
</div>

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?98475421a8ba3b6604d901b52267cad6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script></body>
</html>