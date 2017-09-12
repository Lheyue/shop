<!DOCTYPE html>
<?php
	require("./include/config/config.php");
	$link = mysqli_connect(HOST,USER,PASSWORD,DBNAME) or die("连接数据库失败");
	mysqli_set_charset($link,"utf8");

?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>次元仓-最好玩的二次元周边网站（cycang.com）</title>
	<link rel="stylesheet" href="include/index/css/slide.css" type="text/css" />
	<link rel="stylesheet" href="include/index/css/index.css" type="text/css" />
	<link rel="icon" href="//www.cycang.com/Public/img/favicon.ico" type="image/x-icon">
	<meta name="keywords" content="次元仓,cycang.com,二次元,ACG,精品,正品,特卖,游戏" />
	<meta name="description" content="次元仓cycang.com,最好玩的二次元周边网站,二次元,ACG,精品,正品,特卖,游戏,便捷、诚信的服务，为您提供愉悦的购物体验!" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<script src="include/index/js/wb.js" type="text/javascript" charset="utf-8"></script>
	<!-- cycang.com Baidu tongji analytics -->
	<script type="text/javascript">
		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc5a2a3ab962346d1e9cfaf5dc654c2f5' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<!--[if lt IE 9]>
	<script src="include/index/js/html5.js"></script>
	<![endif]-->
</head>
<body>
	<!--header start-->
	<header class="c_header">
	<nav class="c_tools">
		<div class="c_container">
			<div class="c_tools_left">
				<p>吱，欢迎来到次元仓</p>
				<?php
				session_start();
				    if($_SESSION['username'])
					 {
					echo "<a class='c_tools_item' href='login.php?c=login' target='_blank'>{$_SESSION['username']}</a>";
					echo "<a class='c_tools_item' href='./include/login/action.php?a=out'>退出</a>";
					 }else{
					 echo "<a class='c_tools_item' href='login.php?c=login' target='_blank'>请登录</a> ";
					 echo "<a class='c_tools_item' href='i.php?c=login&a=reg' target='_blank'>免费注册</a>";
						 
					 }
				?>

							</div>
			<div class="c_tools_right">
				<a class="c_tools_item" href="order.php" target="_blank">我的订单</a>
				<a class="c_tools_item c_tools_cart" href="buy.php" target="_blank">
					<span>购物车</span>
										<b>0</b>
									</a>
				<a class="c_tools_item" href="i.php?a=favoriteList" class="c_tools_fav" target="_blank"><span>收藏夹</span></a>
				<a class="c_tools_item" href="index.php?a=service" target="_blank">联系客服</a>
				<div class="c_weibo left"><wb:follow-button uid="5560954188" type="red_1" width="90" height="24" ></wb:follow-button></div>
			</div>
		</div>
	</nav>
	<div class="c_container">
		<a href="index.php" class="c_header_logo left"><img src="include/index/picture/logo.png" alt="../../../index.php" /></a>
		<div class="c_search left">
			<form action="index.php" method="get" target="_blank" id="J_search" data-suggest-url="index.php?c=product&a=getSearchSuggest">
				<input type="hidden" name="a" value="page">
				<input type="text" name="q" value="" id="search_key" autocomplete="off">
				<input type="submit" name="" value="搜&nbsp;索">
			</form>
			<ul class="c_search_suggest" id="J_search_suggest"></ul>
			<div class="c_hot_query">
							<a href="index.php?a=page&q=lolita" target="_blank" title="lolita">lolita</a>
			<a href="index.php?a=page&q=Honest" target="_blank" title="Honest">Honest</a>
			<a href="index.php?a=page&q=人" target="_blank" title="人">人</a>
			<a href="index.php?a=page&q=画影" target="_blank" title="画影">画影</a>
			<a href="index.php?a=page&q=风荷举" target="_blank" title="风荷举">风荷举</a>
			<a href="index.php?a=page&q=剑三" target="_blank" title="剑三">剑三</a>
			<a href="index.php?a=page&q=鹤归" target="_blank" title="鹤归">鹤归</a>
			<a href="index.php?a=page&q=烟昔泠" target="_blank" title="烟昔泠">烟昔泠</a>
			<a href="index.php?a=page&q=鲛人歌" target="_blank" title="鲛人歌">鲛人歌</a>
			<a href="index.php?a=page&q=举" target="_blank" title="举">举</a>
			<a href="index.php?a=page&q=风荷" target="_blank" title="风荷">风荷</a>
				</div>
		</div>
		<a href="http://cycang.com/act.php?c=appDownload" class="c_header_dl right" target="_blank">
			<img src="include/index/picture/qr.jpg" alt="" target="_blank"/>
			<p>下载手机次元仓</p>
		</a>
	</div>
	<nav class="c_nav_btm">
		<a href="index.php?a=page&chid=8" target="_blank">服饰仓</a>
		<a href="index.php?a=page&chid=16" target="_blank">周边仓</a>
		<a href="index.php?a=page&chid=6" target="_blank">古风仓</a>
		<a href="index.php?a=page&chid=13" target="_blank">手办仓</a>
		<a href="index.php?a=page&chid=10" target="_blank">零食仓</a>
		<a href="index.php?a=page&chid=12" target="_blank">首饰仓</a>
		<a href="index.php?a=page&chid=15" target="_blank">汉风仓</a>
		<a href="buy.php" class="c_header_cart right" target="_blank">
			<i class="c_cart_icon"></i>
			<span>购物车</span>
						<b>(0)</b>
					</a>
	</nav>
</header>

	<!--header end-->
	
	<div class="c_content">
		<!--分类&slider start-->
		<div class="c_slider">
			<ul class="c_cat_nav">
				<h1>商品分类</h1>
				
				<?php 
				  $sql="select * from type where pid=0;";
				  $res=mysqli_query($link,$sql);
				  while($list=mysqli_fetch_assoc($res))
				  {
					echo "  <li> ";
					echo "<p class='c_cat_item_list'> ";
					echo "	<a href='./index.php?id={$list['id']}'>{$list['name']}</a> ";
				echo "	</p> ";
				//echo "	<div class='c_cat_more'> ";
												
				//	echo "	<div> ";
				//	echo "		<a class='c_cat_item' href='Object.php?a=page&cid=96' target='_blank'>泳衣</a> ";
							
				//	echo "	</div> ";
				//echo "	</div> ";
			echo "	</li> ";
				  }
				?>
				
						
					
					<div class="c_cat_more">
											
						<div>
							<a class="c_cat_item" href="index.php?a=page&cid=119" target="_blank">自拍杆</a>
							<a class="c_cat_item" href="index.php?a=page&cid=93" target="_blank">票务</a>
							<a class="c_cat_item" href="index.php?a=page&cid=50" target="_blank">手机壳</a>
							<a class="c_cat_item" href="index.php?a=page&cid=101" target="_blank">耳机</a>
							<a class="c_cat_item" href="index.php?a=page&cid=118" target="_blank">屏幕保护膜</a>
							<a class="c_cat_item" href="index.php?a=page&cid=116" target="_blank">Wacom系列</a>
							<a class="c_cat_item" href="index.php?a=page&cid=112" target="_blank">交通卡</a>
							<a class="c_cat_item" href="index.php?a=page&cid=103" target="_blank">鼠键</a>
							<a class="c_cat_item" href="index.php?a=page&cid=102" target="_blank">U盘</a>
							<a class="c_cat_item" href="index.php?a=page&cid=39" target="_blank">移动电源</a>
							<a class="c_cat_item" href="index.php?a=page&cid=40" target="_blank">鼠标垫</a>
							<a class="c_cat_item" href="index.php?a=page&cid=41" target="_blank">金属贴</a>
						</div>
											</div>
				</li>
							</ul>
			<div class="c_swiper_wrap">
				<div class="swiper-container c_swiper_wrap_container">
					<div class="swiper-wrapper">
						<div class="swiper-slide"><a href="http://cycang.com/index.php?a=p&id=12022" target="_blank"><img src="include/index/picture/1484218495431.png" width="100%"></a></div>
						<div class="swiper-slide"><a href="http://cycang.com/index.php?a=page&chid=0&sort=sell_time_start|desc&q=全职高手&cid=0&bid=0&price=1|1000" target="_blank"><img src="include/index/picture/1482573901892.png" width="100%"></a></div>
						<div class="swiper-slide"><a href="http://www.cycang.com/index.php?a=p&id=10909" target="_blank"><img src="include/index/picture/1483515409672.png" width="100%"></a></div>
						<div class="swiper-slide"><a href="http://cycang.com/index.php?a=page&chid=0&cid=0&bid=490&price=1|1000" target="_blank"><img src="include/index/picture/1480585437992.png" width="100%"></a></div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
			<div class="c_extra">
				<a href="index.php?a=skShop" class="c_sk_entry" target="_blank"></a>
				<a href="index.php?a=page&chid=9" class="c_tick_entry" target="_blank"></a>
			</div>
		</div>
		<!--分类&slider end-->
		
				<!--专场 start-->
		<div class="c_act">
			<p class="c_act_title">活动专场</p>
			<div class="c_act_swiper" id="J_act_container">
								<a href="./include/cycang/Index.html"><img src="include/index/picture/1483690125485.png" alt="剑三同人专场"></a>
								<a href="./include/cycang/Index.html"><img src="include/index/picture/1483693040799.png" alt="新春零食大赏"></a>
								
							</div>

			<div style="display:none" class="c_act_page" id="J_act_page"></div>
		</div>
		<!--专场 end-->

		<!--推荐-->
		<div class="c_recommend">
			<div class="c_commend_bar"><span></span></div>
			<div class="c_recommend_title">
				<div class="left c_on J_new">
					<p>新品推荐</p>
					<a href="index.php?a=page&is_new=1" target="_blank" class="c_stop_propa">更多</a>
				</div>
				<span class="c_mid_line left"></span>
				<div class="left J_hot">
					<p>热卖推荐</p>
					<a href="index.php?a=page&is_hot=1" target="_blank" class="c_stop_propa">更多</a>
				</div>
			</div>
			<ul class="c_product_list" id="J_recommend_container">
				<?php
					
					if($_GET['id'])
						{
							$sql="select * from type where path like '%{$_GET['id']}%';";//模糊匹配
							$typeres=mysqli_query($link,$sql);
							
							$in='';
							
							while($typelist=mysqli_fetch_assoc($typeres))
							{
								$in.=",".$typelist['id'];//拼接下方数据库用到的语句
							}
							$in=ltrim($in,",");
							$sql="select * from goods where typeid in ({$in});";
							
						}else{
							//无ID传过来显示所有商品
							$sql="select * from goods;";
						}
						$res=mysqli_query($link,$sql);
						while(@$list=mysqli_fetch_assoc($res))
						{
							
							
							echo "<li>";
								 echo "<a href='./detail.php?id={$list['id']}' target='_blank'>";
								 echo "<img data-original='' src='../admin/goods/pics/{$list['picname']}' class='c_lazyload'>";
								 echo "<p class='c_product_name'>{$list['goods']} {$list['price']} {$list['descr']}</p>";
								 echo "<p class='c_prduct_price'>{$list['price']}</p>";
								 echo "</a>";
							
						}
				?>
				
				<li>
					<a href="index.php?a=p&id=12108" target="_blank">
						<img data-original="http://f.p.cycangcdn.com/1484214885668.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload">
						<p class="c_product_name">【Infanta.婴梵塔】Lolita 草莓小厨娘 KC</p>
						<p class="c_prduct_price">&yen;58.00</p>
					</a>
				</li>
				<li>
					<a href="index.php?a=p&id=12102" target="_blank">
						<img data-original="http://f.p.cycangcdn.com/1484210410822.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload">
						<p class="c_product_name">【散漫舍】魔卡少女樱小樱FATE魔法阵USB暖水保温杯垫</p>
						<p class="c_prduct_price">&yen;15.00</p>
					</a>
				</li>
				<li>
					<a href="index.php?a=p&id=12096" target="_blank">
						<img data-original="http://f.p.cycangcdn.com/supplier/1484205159930.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload">
						<p class="c_product_name">【有萌】【日版周边预售】BUSHIROAD 从零开始的异世界 蕾姆新年</p>
						<p class="c_prduct_price">&yen;120.00</p>
					</a>
				</li>	
				
								
			</ul>
			<div class="c_recommend_page"></div>
		</div>


		<!-- 品牌墙 -->
		<div class="c_brand">
			<a href="index.php?a=page&supplier_code=1801001"><img data-original="http://f.p.cycangcdn.com/1480304143900.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1101004"><img data-original="http://f.p.cycangcdn.com/1480490869865.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1101012"><img data-original="http://f.p.cycangcdn.com/1480304125659.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=2101001"><img data-original="http://f.p.cycangcdn.com/1480304250388.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1201001"><img data-original="http://f.p.cycangcdn.com/1480477875838.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=2101002"><img data-original="http://f.p.cycangcdn.com/1480492537153.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=100004"><img data-original="http://f.p.cycangcdn.com/1480302113288.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=100010"><img data-original="http://f.p.cycangcdn.com/1480302128380.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1101037"><img data-original="http://f.p.cycangcdn.com/1480304356488.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1601007"><img data-original="http://f.p.cycangcdn.com/1480302679565.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1101042"><img data-original="http://f.p.cycangcdn.com/1480304191928.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=802004"><img data-original="http://f.p.cycangcdn.com/1480649598649.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1601008"><img data-original="http://f.p.cycangcdn.com/1480493800090.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1606002"><img data-original="http://f.p.cycangcdn.com/1480304209532.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1601009"><img data-original="http://f.p.cycangcdn.com/1480304312396.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1000018"><img data-original="http://f.p.cycangcdn.com/1480403516418.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=1102019"><img data-original="http://f.p.cycangcdn.com/1480304156798.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
			<a href="index.php?a=page&supplier_code=100019"><img data-original="http://f.p.cycangcdn.com/1480304174500.jpg" src="include/index/picture/loading.jpg" alt="" class="c_lazyload"></a>
		</div>


		
	</div>
	<a class="c_fix_top" href="javascript:;" id="J_top"></a>
	<!-- footer start -->
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
							<a href="//cycang.com/act.php?c=appDownload" target="_blank">
								<img class="c_qr" src="include/index/picture/qr.jpg" alt="" />
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
	</footer>
	<!-- footer end -->

	<input type="hidden" id="J_get_sk_info" value="index.php?c=page&a=getSeckillList">

	<script type="text/html" id="J_sk_tmpl">
		<div class="c_sk_wrap">
			<p class="c_sk_title"><span class="c_arrow_wrap">{{if skList[0].is_finish == 1 }}<span id="J_sk_text">本期闪购已结束</span>{{else}}<span id="J_sk_text">离本期闪购{{if skList[0].is_begin == 1}}结束{{else}}开始{{/if}}还有</span>&nbsp;<span class="c_time" data-time="{{skList[0].sell_time_gap}}" data-is-begin="skList[0].is_begin"></span>{{/if}}</span></p>

			<ul class="c_sk_list" id="J_sk_container">
				{{each skList as sk_item}}
					<li data-product-id="{{sk_item.product_id}}">
						<a href="index.php?a=sp&id={{sk_item.product_id}}" target="_blank"><img src="include/index/picture/{{sk_item.figure}}" alt="" class="c_sk_left"></a>
						<div class="c_sk_right">
							<p class="c_sk_name">{{sk_item.name}}</p>
							<p class="c_sk_price">&yen;{{sk_item.cover_price}}</p>
							<del>&yen;{{sk_item.origin_price}}</del>

							{{if sk_item.is_finish != 1 && sk_item.is_begin == 1}}
								<div class="c_sk_bar"><span style="width: {{100-sk_item.leaving_proportion}}%"></span></div>
								{{if sk_item.leaving_proportion == 0}}
									<p class="c_sk_stock">已抢光</p>
								{{else}}
									<a href="index.php?a=sp&id={{sk_item.product_id}}" class="c_sk_btn" target="_blank">马上抢</a>
									<p class="c_sk_stock">已抢购{{100 - sk_item.leaving_proportion}}%</p>
								{{/if}}
							{{else if sk_item.is_begin != 1}}
								<div class="c_sk_bar"><span style="width: {{100-sk_item.leaving_proportion}}%"></span></div>
								<a href="index.php?a=sp&id={{sk_item.product_id}}" class="c_sk_btn" target="_blank">即将开始</a>
								<p class="c_sk_stock">已抢购{{100 - sk_item.leaving_proportion}}%</p>
							{{else}}
						 		<a href="javascript:;" class="c_sk_btn c_sk_end" target="_blank">闪购结束</a>
							{{/if}}
						
						</div>
					</li>
				{{/each}}
			</ul>
			<div {{if skList.length <= 9}}style="display:none"{{/if}} class="c_act_page" id="J_sk_page"></div>
		</div>
	</script>
	<script type="text/html" id="J_floor_tmpl">
		{{each data.list as $product_info}}
		<li class="animated fade">
			<a href="index.php?a=p&id={{$product_info.product_id}}" target="_blank">
				<img src="include/index/picture/{{$product_info.figure}}" alt="{{$product_info.name}}" class="c_lazyload">
				<p class="c_product_name">{{$product_info.name}}</p>
				{{if ($product_info.origin_price - $product_info.cover_price) > 0}}
				<div class="c_price_wrap">
					<span>折扣价</span>
					<span class="c_price_now">&yen;{{$product_info.cover_price}}</span>
					<del>&yen; {{$product_info.origin_price}}</del>
				</div>
				{{else}}
				<p class="c_prduct_price">&yen;{{$product_info.cover_price}}</p>
				{{/if}}
			</a>
		</li>
		{{/each}}
	</script>
	<script src="include/index/js/jquery.js"></script>
	<script src="include/index/js/slide.js"></script> 
	<script src="include/index/js/jquery.lazyload.min.js"></script>
	<script src="include/index/js/jpages.min.js"></script>
	<script src="include/index/js/countdown.js"></script>
	<script src="include/index/js/header.js"></script>
	<script src="include/index/js/index.js"></script>
</body>
</html>
