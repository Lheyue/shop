<!DOCTYPE html>

<?php
		  require("./include/config/config.php");
		  $link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
		  mysqli_set_charset($link,"utf8");
		  session_start();
				  
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>我的购物车-次元仓</title>
<!-- <link rel="stylesheet" href="./include/buy/css/main.css" type="text/css" /> -->
<link rel="stylesheet" href="./include/buy/css/cart.css">
</head>
<body>
<!--header start-->
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
<div class="cyc_header" id="cyc_header">
	<div class="cyc_h_top_wrap">
		<div class="cyc_func_container">
			<div class="cyc_tools_left left"  id="c_log_reg">
			
								<?php
				session_start();
				    if($_SESSION['username'])
					 {
					echo "<a class='c_tools_item' href='login.php?c=login' target='_blank'>{$_SESSION['username']}</a>";
					echo "&nbsp&nbsp&nbsp&nbsp&nbsp";
					echo "<a class='c_tools_item' href='./include/login/action.php?a=out'>退出</a>";
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
			<a href="index.php" class="cyc_logo_link"><img class="" src="./include/buy/picture/logo.jpg" alt=""></a>
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
							</ul>
			<ul class="c_search_suggest" id="J_search_suggest"></ul>
		</div>
		<a href="buy.php" target="_blank">
			<div class="cyc_cart right">
					<span class="cyc_cart_icon"></span>
					<span class="cyc_cart_text">我的购物车</span>
									
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
	<!--<div class="c_cart_error_wrap">
		<img src="./include/buy/picture/list_empty.png" alt="">
		<div class="c_cart_error_right">
			<p>购物车里神马都木有，解开封印买买买解b(￣▽￣)d</p>
			
			
				
			<a href="index.php'>去逛逛&gt;</a>
		</div>-->
		
		
		
			<form method="post" action="./include/buy/action.php?a=order" id="form1">

<div class="shop-goods">

	<div style="width: 1035px;margin:50px auto;">
	
	<div class="c_thead">
                    <div class="c_th_7 c_th left c_pl">
                        <div class="c_checkbox_simulate c_get_all J_get_all" id="J_get_all">
                            <label>
                                <i class=""><input class="" type="checkbox"></i>
                            </label>
                        </div>
                        全选
                    </div>
                    <div class="c_th_33 c_th left c_pl_60">商品信息</div>
					<div class="c_th_20 c_th left">商品详情</div>
                    <div class="c_th_10 c_th left c_text_c">销售价</div>
                    <div class="c_th_10 c_th c_cart_wrap_th left">数量</div>
                    
                    <div class="c_th_10 c_th left">小计</div>
                    <div class="c_th_10 c_th left">操作</div>
                </div>
        <!--  购物车商品列表 -->
      
		<?php
			$sql = "select * from buycar where username='{$_SESSION['username']}';";
			$res = mysqli_query($link,$sql);
			$total = 0;
			while($list = mysqli_fetch_assoc($res))
			{
				echo "<div class='c_tr c_tr_item  c_item_selected' data-product-id='12129' data-sku-id='38985' data-order='0'>";
                                echo "<div class='c_td c_th_3 left c_checkbox_simulate c_item_select_box'>";
                                    echo "<label>";
                                        echo "<i class='on c_item_checkbox'><input class='' data-product-type='0' type='checkbox' checked='checked'></i>";
                                    echo "</label>";
                                echo "</div>";
								
								
                                echo "<div class='c_td c_th_37 left'>";
                                    echo "<a target='_blank' class='c_cart_product_img' href='index.php?a=p&amp;id=12129'>";
                                        echo "<img src='../admin/goods/pics/{$list['picname']}' width='100%'>";
                                        echo "</a>";
                                    echo "<a target='_blank' class='c_cart_product_name' href='index.php?a=p&amp;id=12129'>";
                                        echo "{$list['goods']}";
                                    echo "</a>";
                                echo "</div>";
								echo "<div class='c_td c_th_20 left c_data_text'>";
                                    echo "{$list['descr']}";
                                echo "</div>"; 
                                echo "<div class='c_td c_th_10 left c_data_text c_text_c'>";
                                echo "<p>￥{$list['price']}</p>";
                                echo "</div>";
                                echo "<div class='c_td c_th_10 left c_data_text'>";
                                echo "<div class='number-box c_number_box'>";
                                echo "<p>{$list['num']}</p>";
                                echo "</div> ";     
                                                          
                                echo "</div>";
                                $total = $list['num'] * $list['price'];
								$ftotal += $list['num'] * $list['price'];
                                echo "<div class='c_td c_th_10 left c_data_text'><span class='c_cart_subsum'>￥$total</span></div>";
                                echo "<span class='' style='font-size:15px;'><a href='./include/buy/action.php?a=del&id={$list['id']}'>删除</a></span>";                             
								echo "<input type='hidden' name='goodsid[]' value='{$list['goodsid']}'>";
								echo "<input type='hidden' name='name[]' value='{$list['goods']}'>";
								echo "<input type='hidden' name='price[]' value='{$list['price']}'>";
								echo "<input type='hidden' name='num[]' value='{$list['num']}'>";
								echo "<input type='hidden' name='total[]' value='{$total}'>";						
								echo "<input type='hidden' name='id[]' value='{$list['id']}'>";						
			}
			echo "<div class='c_go_chkout'>";
			
				echo "<div class='c_dtl_info_wrap right'>";
				echo "应付总额:  <span class='c_need_pay'>￥<em class='c_pay_total'>$ftotal</em></span>";
				echo "<a class='c_sub_btn' href='index.php'>继续购物</a>";
	?>
				<a class='c_sub_btn' onClick="document.getElementById('form1_submit').click()">去结算</a>
				
			
	<?php
			echo "</div>";
			echo "</div>";
	?>
	
	
	
	
	
	</div>
	</div>
	</div>





















        <!--  购物车商品列表 -->
        <table align='center' cellspacing='15' >
           
		
				<input type='hidden' name='addtime' value='<?php echo time(); ?>' />
        
    </div>
		<div class="clear"></div>
		<div class="shop-action">
		
        </div>
            <input type="submit" id="form1_submit" style="display:none">
        </form>
		</table>
	



	
		
	</div>
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
							<img class="c_qr" src="./include/buy/picture/qr.jpg" alt="" />
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
		 ICP © 2016 广州脑动网络科技有限公司 版权所有 <a href="index.php?a=statement" target="_blank"> 免责声明</a>（备案号：<a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">粤ICP备15028368号</a>)
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

<script src="./include/buy/js/jquery.js"></script>
<script src="./include/buy/js/header.js"></script>

</body>
</html>
