<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="./include/login/css/login.css">
    <link rel="stylesheet" type="text/css" href="./include/login/css/footer.css">
    <title>登录-次元仓</title>
</head>
<body>
<!-- header start -->
<div class="c_content c_content_top">
    <a href="index.php" class="c_top_logo c_fl"><img src="./include/login/picture/loginreg_logo.png" alt="logo"></a>
    <p class="c_top_txt c_fr">欢迎登录</p>
    <div class="c_clear_both"></div>
</div>
<!-- header end -->
<div class="c_login_wrap">
    <div class="c_content">
    <!-- ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ -->
        <form action='./include/login/action.php?a=login' method="post" class="c_login_box c_fr" enctype='multipart/form-data'>
            <ul id="c_comm_login">
                <li><p>用户登录</p></li>
                <li>
                    <label><span class="c_user_logo c_fl"></span><input type="text" class="c_login_input c_fl" name="username" id="username" placeholder="请输入用户名" required></label>
                </li>
                <div class="c_clear_both"></div>
                <li>
                    <label><span class="c_pwd_logo c_fl"></span><input type="password" class="c_login_input c_fl" name="password" id="password" placeholder="密码" required></label>
                    <div class="c_clear_both"></div>
                </li>
                <li>
                    <label><span class="c_v_code_font c_fl">验证码:</span><input type="text" class="c_v_code_input c_fl" name="code" id="code" placeholder="验证码" required></label>
                    <img src="./include/login/code.php" onclick="this.src='./include/login/code.php +MATH.random();'"  >
                    <div class="c_clear_both"></div>
                </li>
                <li>
                    <label><input type="checkbox" class="c_fl" name="remember" id="remember"><span class="c_remember c_fl" >记住我</span></label>
                    <a href="i.php?c=login&a=reset" class="c_remember c_fr">忘记密码？</a>
                    <div class="c_clear_both"></div>
                </li>
                <li>
                    <!--<a href="./include/login/action.php" class="c_btn c_login_btn c_fl c_fake_a" id="login-btn">登录 </a>-->
					<button type="submit" class="c_btn c_login_btn c_fl">登录</button>
                    <a href="i.php?c=login&a=reg" class="c_btn c_reg_btn c_fl" id="reg-btn" href="i.php?c=login&a=reg">快速注册</a>
                    <div class="c_clear_both"></div>
                </li>
                <li class="c_wq_login">
                    <span class="c_fl">合作账号登录：</span>
                    <span class="c_fl">
                        <a href="https://api.weibo.com/oauth2/authorize?client_id=3038839783&redirect_uri=http%3A%2F%2Fcycang.com%2Fweibo_login_callback.php&response_type=code" target="_blank"><div class="c_weibo_icon c_fl"></div>微博登录</a>
                    </span>
                    <span class="c_fl">
                        <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101226230&redirect_uri=http%3A%2F%2Fcycang.com%2Fqq_login_callback.php&state=4a3a4003b81d164b73c39f8da3b7d49f&scope=get_user_info" target="_blank"><div class="c_qq_icon c_fl"></div>QQ登录</a>
                    </span>
					<span class="c_fl">
						<a href="javascript:;" class="c_wechat_btn"><div class="c_wechat_icon c_fl"></div>微信登录</a>
					</span>
                    <div class="c_clear_both"></div>
                </li>
                <div class="c_line"></div>
                <li class="c_tips">
                    <span>1.担心邮费？次元仓自营商品首次下单、购物满69元均可免邮！</span><br>
                    <span>2.木有优惠券？下载APP并注册、使用第三方账号首次登录、绑定手机三管齐下拿优惠券~</span>
                </li>
            </ul>
            <!--wechat login-->
            <div class="c_wechat_box">
            	<div id="wechat_login_container"></div>
            	<a href="javascript:;" class="c_wechat_back">返回登录</a>
            </div>
        </form>
    </div>
    <div class="c_clear_both"></div>
</div>

<!-- footer start -->
<script src="./include/loginl/js/jquery.js" type="text/javascript"></script>
<script src="./include/loginl/js/login.js" type="text/javascript"></script>

<input type="hidden" id="J_login_url" value="i.php?c=login&a=checkLogin&is_ajax=1">
<div class="c_footer c_footer2">
    <div class="c_content">
    	<div class="c_customer_service"></div>
        <div class="c_copy_right"> ICP © 2015 广州脑动网络科技有限公司 版权所有（备案号：<a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">粤ICP备15028368号</a>)
		<!-- cycang.com Baidu tongji analytics -->
        </div>
    </div>
</div>
<script src="./include/loginl/js/jquery.js" type="text/javascript"></script>
<script>
$(function(){
  $("#verify").click(function(){
        $(this).attr("src", "i.php?c=login&a=captcha");
    });
});
</script>
<div style="display:none">
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc5a2a3ab962346d1e9cfaf5dc654c2f5' type='text/javascript'%3E%3C/script%3E"));
</script>
</div>
<!-- footer end -->
<script src="./include/loginl/js/wxlogin.js"></script>
<script type="text/javascript">
	$(function(){
		setTimeout(function(){
			$('#verify').click();
		},100);

		//微信js登录
		$('.c_wechat_btn').on('click', function(){
			var obj = new WxLogin({
				id: "wechat_login_container",
				appid: "wxc475a3f1e55f542a",
				scope: "snsapi_login",
				redirect_uri: "https://cycang.com/wechat_login_callback.php",
				state: "",
				style: "",
				href: ""
			});
			$('#c_comm_login').css('display', 'none');
			$('.c_wechat_box').fadeIn();
		});
		$('.c_wechat_back').on('click', function(){
			$('.c_wechat_box').css('display', 'none');
			$('#c_comm_login').fadeIn();
		});
	});
</script>
</body>
</html>


