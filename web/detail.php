<!DOCTYPE html>
<?php
      session_start();
	require("../admin/include/config.php");
	$link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
	mysqli_set_charset($link,'utf8');	
	$sql = "select * from goods where id={$_GET['id']};";
	$res = mysqli_query($link,$sql);
	$list=mysqli_fetch_assoc($res);
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php echo "{$list['goods']}"?></title>
    <meta name="keywords" content="次元仓,cycang.com,二次元,ACG,精品,正品,特卖,游戏" />
    <meta name="description" content="次元仓cycang.com,最好玩的二次元周边网站,二次元,ACG,精品,正品,特卖,游戏,便捷、诚信的服务，为您提供愉悦的购物体验!" />   
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="./include/detail/css/smoothproducts.css" type="text/css" />
    <link rel="stylesheet" href="./include/detail/css/detail.css" type="text/css" />
    <link rel="icon" href="//www.cycang.com/Public/img/favicon.ico" type="image/x-icon">
    <script src="./include/detail/js/wb.js" type="text/javascript" charset="utf-8"></script>
    <!--[if lt IE 9]> 
        <script src="./include/detail/js/html5.js"></script>
    <![endif]-->
</head>
<body>
    <div id="c_comm_dialog_mask" class="ui-window-mask" ></div>
<div class="c_comm_dialog">
	<div class="c_comm_content">
		<span class="c_comm_dialog_close c_comm_dialog_close_icon"></span>
		<div>
			<span class="cyc_comm_dialog_icon comm_right_icon" id="c_comm_dialog_icon"></span>
			<span class="cyc_comm_dialog_text">
				
			</span>
		</div>
		<span class="c_comm_dialog_close c_comm_dialog_sure">确定</span>
	</div>
</div>
    <div id="c_dia_mask" class="ui-window-mask"></div>
<div class="tabs_wrap" id="c_tab_wrap">
	<div class="tabs_content">
		<div class="tabs_tlt">次元仓会员<span class="dia_close"></span></div>

	    <div id="tabs" class="tabs_item_list">
	        <a href="javascript:void(0);" class="on" id="tab_login_title">登录</a>
	        <a href="javascript:void(0);"  id="tab_reg_title">注册</a>
	    </div>

		<div id="tabs_body" class="tabs_body">
		    <div  class="log_form_wrap form_wrap">
			    <form action="" class="login_form" id="user_login_form">
			    	<p class="inputs">
    					<input id="c_user_name" class="ipt " name="loginName" type="text" autocomplete="off" value="">
    					<label for="" class="ipt_label">请输入手机号</label>
					</p>
					<p class="labels"><span class="dred c_user_name_label">请输入手机号</span></p>
					<p class="inputs">
    					<input id="c_user_psw" class="ipt" name="password" type="password" autocomplete="off" value="">
    					<label for="" class="ipt_label">密码</label>
					</p>
					<p class="labels"><span class="dred c_user_psw_label">请输入密码</span></p>
					<p class="inputs">
    					<input id="c_log_verify" class="ipt short_ipt" style="float:left;" name="log_verify" type="text">
    					<img src="./include/detail/picture/i.php" alt="" height="33px" class="verify_img" >
    					<label for="" class="ipt_label">验证码</label>
					</p>
					<p class="remember_p">
						记住我<input type="checkbox" name="remember" id="remember" class="remember">
						<a href="i.php?c=login&a=reset" target="_blank" class="find_pwd">忘记密码?戳我找回</a>
					</p>
			    </form>
			    <p class="log_btn_wrap">
			    	<a id="log_btn" href="javascript:void(0);" class="log_btn">登录</a>
			    </p>
			    <div class="unite_group">
				    <p>合作账号登录：
						<a href="https://api.weibo.com/oauth2/authorize?client_id=3038839783&redirect_uri=http%3A%2F%2Fcycang.com%2Fweibo_login_callback.php&response_type=code" target="_blank" class="icon_login icon_weibo"></a>
						<a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101226230&redirect_uri=http%3A%2F%2Fcycang.com%2Fqq_login_callback.php&state=51810eeba045f40cdb27dd7f5c967949&scope=get_user_info" target="_blank" class="icon_login icon_qq"></a>
						<a href="javascript:;" class="icon_login icon_wechat"></a><!--todo wechat login url-->
	                </p>
				</div>
		    </div>
		    <div class="reg_form_wrap form_wrap">
	   			<form action="" class="login_form" id="user_login_form">
			    	<p class="inputs">
    					<input id="c_reg_name" class="ipt error" name="loginName" type="text" data-text='手机号'>
    					<label for=""  class="ipt_label">手机号</label>
					</p>
					<p class="inputs">
    					<input id="c_reg_img_verify" class="ipt short_ipt" style="float:left;" name="password" type="text" data-text='验证码'>
    					<img src="" alt="" height="33px" class="verify_img" >
    					<label for="" class="ipt_label">验证码</label>
					</p>
					<p class="inputs">
    					<input id="c_reg_sms_code" class="ipt short_ipt" style="float:left;"  name="password" type="text" data-text='短信验证码'>
    					<span class="get_sms_code" id="c_get_sms_code">获取验证码</span>
    					<label for="" class="ipt_label">短信验证码</label>
					</p>
					<p class="inputs">
    					<input id="c_reg_psw" class="ipt" name="password" type="password" data-text='密码'>
    					<label for="" class="ipt_label">输入密码</label>
					</p>
					<p class="inputs">
    					<input id="c_reg_confirm_psw" class="ipt" name="password" type="password" data-text='密码确认'>
    					<label for="" class="ipt_label">密码确认</label>
					</p>
			    </form>
			    <p class="log_btn_wrap">
			    	<a id="reg_btn" href="javascript:void(0);" class="log_btn">注册</a>
			    </p>
			    <p class="reg_explain">点击“免费注册”，即表示您愿意遵守次元仓<a href="i.php?c=login&a=accord" target="_blank" style="color:#ed3f3f;">用户协议</a></p>
		    </div>
		</div>


	</div>
	<!--wechat login box-->
	<div class="c_wechat_login_box">
		<div id="wechat_login_container"></div>
		<div class="c_wechat_back">返回登录</div>
	</div>
</div>
<!--wechat login!-->
<script src="./include/detail/js/wxlogin.js"></script> 
    <!--header start-->
    <div class="cyc_header" id="cyc_header">
	<div class="cyc_h_top_wrap">
		<div class="cyc_func_container">
			<div class="cyc_tools_left left"  id="c_log_reg">
				<?php
				session_start();
				    if($_SESSION['username'])
					 {
					echo "<a href='i.php?c=login' class='cyc_tools_item' id=''>{$_SESSION['username']}</a>";
					echo "&nbsp&nbsp&nbsp&nbsp&nbsp";
					echo "<a class='cyc_tools_item' href='./include/login/action.php?a=out'>退出</a>";
					 }else{
					 echo "<a class='c_tools_item' href='login.php?c=login' target='_blank'>请登录</a> ";
					 echo "<a class='c_tools_item' href='i.php?c=login&a=reg' target='_blank'>免费注册</a>";
						 
					 }
				?>
						
            				</div>
			<div class="cyc_tools_right right">
				<div class="c_weibo right" >
					<wb:follow-button uid="5560954188" type="red_1" width="67" height="24" ></wb:follow-button>
				</div>
				<!--<a href="index.php?a=introduce" class="cyc_tools_item" target="_blank" >公司简介</a>-->
				<a href="index.php?a=service" class="cyc_tools_item" target="_blank" >联系客服</a>
				<a href="buy.php" class="cyc_tools_item" target="_blank">购物车</a>
				<a href="order.php" class="cyc_tools_item" target="_blank" >我的订单</a>
				<a href="i.php?a=favoriteList" class="cyc_tools_item" target="_blank" >我的收藏</a>
			</div>
		</div>
	</div>
	<div class="cyc_h_mid_wrap">
		<div class="cyc_logo left">
			<a href="index.php" class="cyc_logo_link"><img class="" src="./include/detail/picture/logo.jpg" alt=""></a>
		</div>
		<div class="cyc_search left">
			<form action="index.php" method="get" target="_blank" id="J_search" data-suggest-url="index.php?c=product&a=getSearchSuggest">
				<div class="cyc_search_input">
					<input type="hidden" name="a" value="page">
					<input type="text" class="cyc_search_key" name="q" value="" id="search_key" autocomplete="off">
					<input type="submit" value="搜索" class="cyc_search_btn">
				</div>
			</form>
			<ul class="cyc_hot_query">
															<li><a href="index.php?a=page&q=lolita" target="_blank" title="lolita">lolita</a></li>
											<li><a href="index.php?a=page&q=Honest" target="_blank" title="Honest">Honest</a></li>
											<li><a href="index.php?a=page&q=人" target="_blank" title="人">人</a></li>
											<li><a href="index.php?a=page&q=画影" target="_blank" title="画影">画影</a></li>
											<li><a href="index.php?a=page&q=风荷举" target="_blank" title="风荷举">风荷举</a></li>
											<li><a href="index.php?a=page&q=剑三" target="_blank" title="剑三">剑三</a></li>
											<li><a href="index.php?a=page&q=鹤归" target="_blank" title="鹤归">鹤归</a></li>
											<li><a href="index.php?a=page&q=烟昔泠" target="_blank" title="烟昔泠">烟昔泠</a></li>
											<li><a href="index.php?a=page&q=鲛人歌" target="_blank" title="鲛人歌">鲛人歌</a></li>
											<li><a href="index.php?a=page&q=举" target="_blank" title="举">举</a></li>
											<li><a href="index.php?a=page&q=风荷" target="_blank" title="风荷">风荷</a></li>
												</ul>
			<ul class="c_search_suggest" id="J_search_suggest"></ul>
		</div>
		<a href="buy.php" target="_blank">
			<div class="cyc_cart right">
					<span class="cyc_cart_icon"></span>
					<span class="cyc_cart_text">我的购物车</span>
					<span class="cyc_cart_nums"  style="display:none;" >0</span>				
			</div>
		</a>
	</div>
	<div class="cyc_h_bot_wrap">
		<div class="cyc_h_bot_container">
			<div class="cyc_h_link right">
				<div class="cyc_link_list right">
					<div class="cyc_link_item left">
						<a target="_blank" href="index.php">首页</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=8">服饰仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=16">周边仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=6">古风仓</a>
					</div>
					<div class="cyc_link_item left">
						<a target="_blank" href="index.php?a=skShop">闪购仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=13">手办仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=9">漫展票务</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=10">零食仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=12">首饰仓</a>
					</div>
					<div class="cyc_link_item left ">
						<a target="_blank" href="index.php?a=page&chid=15">汉风仓</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    <!--header end-->
    <div class="cyc_bread_nav">
        <a class="cyc_bread_item left first" href="index.php?a=page">全部 <span class="cyc_bread_arrow"> > </span></a>
                                    <a class="cyc_bread_item left" href="index.php?a=page&cid=5">居家宅品
                <span class="cyc_bread_arrow"> > </span>
                </a>
                            <a class="cyc_bread_item left" href="index.php?a=page&cid=48">手办
                <span class="cyc_bread_arrow"> > </span>
                </a>
                            <span class="cyc_bread_item left cyc_not_arrow"><?php echo "{$list['goods']}"?></span>
    </div>
    <div class="cyc_dtl_wrap">
        <div class="cyc_dtl_left left">
            <!-- 相册 -->
            <div class="sp-wrap">
                <div class="sp-large">
					<?php
						
						echo "<a href='../admin/goods/pics/{$list['picname']}' class='sp-current-big fakeA'>";
						  echo "<img src='../admin/goods/pics/{$list['picname']}' alt='{$list['goods']}' data-origin-figure='../admin/goods/pics/{$list['picname']}'>";
						echo "</a>";
					?>
                    
                </div>
                <div class="sp-thumbs-wrap">
                    <div class="sp-small-pics">
                        <div class="sp-thumbs sp-tb-active">
                                                    </div>
                    </div>
                    <span class="sp-small-btn sp-small-prev"></span>
                    <span class="sp-small-btn sp-small-next"></span>
                </div>
            </div>
            <div class="cyc_icon_list">
                <div class="jiathis_style_24x24">
                    <a class="jiathis_button_weixin"></a>
                    <a class="jiathis_button_cqq"></a>
                    <a class="jiathis_button_tsina"></a>
                    <a class="jiathis_button_qzone"></a>
                </div>
            </div>
        </div>
        <div class="cyc_dtl_right left">
           

			
			
	

	
<form action='<?php if($_SESSION['username']){echo "./include/detail/action.php?a=buycar";}else{echo "./login.php";}?>' method='post'>			
    <p class="cyc_product_name">
        <span class="c_prev_sale_icon"><?php $state=['1'=>"新添加","2"=>"在售",'3'=>"下架"]; echo "{$state[$list['state']]}"?></span>
        <?php echo "{$list['goods']}"?>
    </p>
    <h5 class="cyc_sub_brief" ></h5>
    <div class="cyc_price_wrap">
        <div class="cyc_dtl_p">
            价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp格;：
                        <span class="cyc_price_num">￥<?php echo "{$list['price']}"?></span>
            <p class="cyc_dtl_p c_sell_num_wrap">
            销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
            已售 <span class="c_sell_num"></span> 件</p>
        </div>
                        <p class="cyc_service cyc_dtl_p">生产厂家：
            <?php echo "{$list['company']}"?>
            <a href="https://static.meiqia.com/dist/standalone.html?eid=17853&metadata=%7B%22%5Cu5546%5Cu54c1%5Cu94fe%5Cu63a5%22%3A%22http%3A%5C%2F%5C%2Fcycang.com%5C%2Findex.php%3Fa%3Dp%26id%3D11319%22%7D" target="_blank" class='c_service_wrap'>
                <img class="c_service_icon" src="./include/detail/picture/service_icon.png">
                <span class="c_service_title">联系客服</span>
            </a>
        </p>
    </div>
            <div
            <div class="cyc_style_wrap">
        <span class="cyc_dtl_tlt left">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存：</span>
		<span class="cyc_dtl_tlt left"><?php echo "{$list['store']}"?></span>
    </div>
    <div class="cyc_add_min_wrap">
        <span class="cyc_dtl_tlt left">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：  </span>
        <div id="cyc_add_min" class="cyc_size_content left ">
            <span class="cyc_size_min cyc_math_item left" onclick='setQty(-1);'>-</span>
            <input id="c_num_ipt" class="cyc_num_ipt cyc_size_ipt left" value="1" name='num' readonly="readonly">
            <span class="cyc_size_add cyc_math_item left" onclick='setQty(+1);'>+</span>
        </div>
        <div class="c_stock_num"></div>
    </div>
	 <div class="cyc_add_cart_wrap">
        <!--todo-->
        <button id="c_add_to_cart" class="cyc_dtl_btn" type='submit'>加入购物车</button>
		
         
            <button id="J_fav" class="cyc_fav_btn" data-pid="11319" data-fav="0">收藏</button>
            </div>
	
	   <input type='hidden' id='descr' name='descr' value='<?php echo $list['descr']?>'>
	   <input type='hidden' id='price' name='price' value='<?php echo $list['price']?>'>
	   <input type='hidden' id='picname' name='picname' value='<?php echo $list['picname']?>'>
	   <input type='hidden' id='goodsid' name='goodsid' value='<?php echo $list['id']?>'>
	   <input type='hidden' id='goods' name='goods' value='<?php echo $list['goods']?>'>
	
	</form>
	
	
	
	
	
	
	
	
	
	
	
	
	<script>
	      var num=document.getElementById("c_num_ipt");
		  function setQty(n)
		  {
			  var w=parseInt(num.value) + parseInt(n);
			  
			  if(w<1)
			  {
				  num.value=1;
				  
			  }else{
				  
				  num.value=w;
			  }
		  }
	</script>
   
<!-- 预售 e -->

        </div>
        <div class="cyc_dtl_tips">
            <!-- 底部提示 -->
            <h3 class="cyc_dtl_tips_icon left">购物帮助：</h3>
            <div class="cyc_tips_item left">
                <div>支付方式<span class="cyc_tips_q"></span></div>
                <ul class="cyc_tips_dtl w200">
                    <li>可使用支付宝/网银</li>
                </ul>
            </div>
            <div class="cyc_tips_item left">
                <div>发货说明<span class="cyc_tips_q"></span></div>
                <ul class="cyc_tips_dtl w200">
                    <li>下午三点前下单当天发货</li>
                    <li>三点后隔天发货</li>
                    <li>周末物流部休息，因此周五三点后下单会在周一发货</li>
                </ul>
            </div>
            <div class="cyc_tips_item left">
                <div>配送说明<span class="cyc_tips_q"></span></div>
                <ul class="cyc_tips_dtl w370">
                    <li>包邮发圆通快递</li>
                    <li>圆通快递全国绝大多数城市（除港澳台）均可送达，配送时间约1-4天</li>
                    <li>顺丰快递：配送时间约为1-3天（港澳台、国外除外）</li>
                </ul>
            </div>
            <div class="cyc_tips_item left">
                <div>退换货服务<span class="cyc_tips_q"></span></div>
                <ul class="cyc_tips_dtl w200">
                    <li>普通商品享有质量问题7天退货，签收后3个工作日之内可换货</li>
                    <li>其他特殊商品（如手办）的售后以页面说明为准。</li>
                </ul>
            </div>
        </div>
    </div>
    <!--<div class="cyc_item_dtl_wrap">
        <div class="cyc_item_dtl_tlt">
            <span class="cyc_item_dtl_text left">商品详情</span>
            <p class="cyc_qr_wrap right">
                <span class="cyc_qr_icon left"></span>
                <span class="cyc_item_dtl_text">下载次元仓移动版</span>
                <span class="cyc_big_qr_img"></span>
            </p>
        </div>
        <div class="cyc_dtl_intro">
            <img src="./include/detail/picture/1481514952031.png" alt="" /><img src="./include/detail/picture/1481515106760.jpg" alt="" />
        </div>-->
    </div>
    <div class="cyc_reco_wrap" >
        <p class="cyc_reco_title">
            <span>购买了该商品的顾客还买了：</span>
        </p>
        <div class="cyc_list_left" id="J_reco_list_left"></div>
        <div class="cyc_list_right" id="J_reco_list_right"></div>
        <div class="cyc_reco_list" id="J_reco_list">
            <ul>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=4065" target="_blank">
                        <img src="./include/detail/picture/1455367771168.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;510.00</span></p>
                            <p class="cyc_reco_item_name">【官方正版】【现货】 1/8 叶修in《全职高手》1.0 手办</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=7116" target="_blank">
                        <img src="./include/detail/picture/1466063155661.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;770.00</span></p>
                            <p class="cyc_reco_item_name">GSC 四月是你的谎言 宫园薰 小提琴 手办 现货</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=1731" target="_blank">
                        <img src="./include/detail/picture/1443001257366.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;220.00</span></p>
                            <p class="cyc_reco_item_name">GSC 干物妹!小埋 粘土人 再版 可动手办 现货</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=8185" target="_blank">
                        <img src="./include/detail/picture/1469152826531.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;150.00</span></p>
                            <p class="cyc_reco_item_name">【猫受屋】GSC 15周年企划 魔卡少女樱 木之本樱手办 小樱 预定</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=5059" target="_blank">
                        <img src="./include/detail/picture/1457071579608.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;300.00</span></p>
                            <p class="cyc_reco_item_name">【有萌】【日版手办现货】MaxFactory figma魔卡少女樱木之本樱战斗服</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=1734" target="_blank">
                        <img src="./include/detail/picture/1443001499869.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;250.00</span></p>
                            <p class="cyc_reco_item_name">GSC 干物妹！小埋  盒蛋 手办 现货 粘土</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=2871" target="_blank">
                        <img src="./include/detail/picture/1452593032293.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;48.00</span></p>
                            <p class="cyc_reco_item_name">【INMAX】潮儿正版 神探夏洛克 夏洛克 华生 卷福 手办</p>
                        </div>
                    </a>
                </li>
                                <li class="cyc_reco_item cyc_hover_item">
                    <a href="index.php?a=p&id=4058" target="_blank">
                        <img src="./include/detail/picture/1452741232347.jpg" alt="" width="248px" height="248px">
                        <div class="cyc_reco_item_dtl">
                            <p><span class="cyc_reco_price left">&yen;38.00</span></p>
                            <p class="cyc_reco_item_name">【北裔堂】剑网3 二师兄 小猪背部挂件手办 附带耳机延长线</p>
                        </div>
                    </a>
                </li>
                            </ul>
        </div>
    </div>
    <!--footer start-->
    <footer class="c_footer">
	<div class="c_container">
		<div class="c_accept_wrap">
			<ul class="c_accept">
				<li>
					<i class="c_icon_cang1"></i>
					<span>首次下单免邮</span>
				</li>
				<li>
					<i class="c_icon_cang2"></i>
					<span>自营69元包邮</span>
				</li>
				<li>
					<i class="c_icon_cang3"></i>
					<span>7天退货保障</span>
				</li>
			</ul>
		</div>
		<div class="c_infor_wrap">
			<div class="c_infor">
				<dl>
					<dt>商务合作</dt>
					<dd><a href="index.php?a=cooper" target="_blank">品牌进驻</a></dd>
					<dd>IP授权</dd>
					<dd>批发业务</dd>
					<dd>票务合作</dd>
				</dl>
				<dl>
					<dt>联系方式</dt>
					<dd>官方邮箱：act@cycang.com</dd>
					<dd>渠道合作：act@cycang.com</dd>
					<dd>媒体合作：act@cycang.com</dd>
				</dl>
				<dl>
					<dt>客服售后</dt>
					<dd>客服热线：400-667-1673</dd>
					<dd>客服QQ1：3112573893</dd>
					<dd>客服QQ2：2627466500</dd>
				</dl>
				<dl>
					<dt>直播合作</dt>
					<dd>QQ：2201959143</dd>
				</dl>

				<ul class="c_infor_right">
					<li>
						<a href="http://cycang.com/act.php?c=appDownload" target="_blank">
							<img class="c_qr" src="./include/detail/picture/qr.jpg" alt="" />
							<p class="c_red_light">下载手机次元仓</p>
						</a>
					</li>
					<li>
						<i class="c_icon_weibo"></i>
						<p>微博搜索并关注<span class="c_red_light">@次元仓</span></p>
					</li>
					<li>
						<i class="c_icon_wechat"></i>
						<p>微信公众号搜索并关注<span class="c_red_light">次元仓</span></p>
					</li>
				</ul>
			</div>	
		</div>
		<p class="c_copyright">
		 ICP ? 2016 广州脑动网络科技有限公司 版权所有 <a href="index.php?a=statement" target="_blank"> 免责声明</a>（备案号：<a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">粤ICP备15028368号</a>)
		</p>
	</div>
	<!-- cycang.com Baidu tongji analytics -->
	<div style="display:none">
		<script type="text/javascript">
			var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
			document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc5a2a3ab962346d1e9cfaf5dc654c2f5' type='text/javascript'%3E%3C/script%3E"));
		</script>
	</div>
</footer>

    <!--footer end-->
    <a class="c_fix_top" href="#cyc_header"></a>
    <input type="hidden" value="0" id="isPresent">
    <input type="hidden" value="11319" id="product_id">
    <input type="hidden" value="i.php?c=coupon&a=receiveCoupon" id="coupon_url">
    <input type="hidden" value="//www.cycang.com/Public/build/img/shop/cart.png" id="flyIconUrl">

    <script src="./include/detail/js/jquery.js"></script> 
    <script src="./include/detail/js/smoothproducts_cyc.min.js"></script>
    <script src="./include/detail/js/countdown.js"></script>
    <script src="./include/detail/js/marquee.js"></script>
    <script src="./include/detail/js/header.js"></script>
    <script src="./include/detail/js/store.min.js"></script>
    <script src="./include/detail/js/detail.js"></script>
    <script src="./include/detail/js/layer.js"></script>
    <script src="./include/detail/js/jia.js"></script> 
</body>
</html>