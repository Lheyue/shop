(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var template = require('../plugins/template');
var index = {
	data: {
		getSKUrl: $('#J_get_sk_info').val()
	},
	UI: {
		catItem: '.c_cat_nav li',
		swiperSelector: '.c_swiper_wrap_container',
		swiperPaginationSelector: '.swiper-pagination',
		gotoTop: '.c_fix_top',
		timeDown:'.c_time',
		floorChange: '.c_floor_change',
		floor: '.c_floor',
		sk: '.c_sk'
	},
	init: function(){
		this.bindEvent();
		this.initPlugins();
	},
	bindEvent: function(){
		var that = this;
		var winHeight = $(window).height();
		var $floor = $(that.UI.floor);
		var $sk = $(that.UI.sk);
		$(that.UI.catItem).hover(function(){
			$(this).addClass('c_cat_hovered').find('.c_cat_more').show();
		}, function(){
			$(this).removeClass('c_cat_hovered').find('.c_cat_more').hide();
		});
		$(window).scroll(function(){
			var $this = $(this);
			var scrollTop = $this.scrollTop();
			var jqGotoTop = $(that.UI.gotoTop);
			scrollTop > winHeight ? jqGotoTop.fadeIn(1000):jqGotoTop.fadeOut(1000);

			$floor.each(function(){
				var $item = $(this);
				var top = $item.offset().top;
				var $change = $item.find(that.UI.floorChange);
				if(top - scrollTop - winHeight <= 0 && $change.data('start') == 0){//高度在窗口内且第一次请求
					that.applyFloorData($change);
				}
			})

			var skTop = $sk.offset().top;
			if ( skTop - scrollTop - winHeight <= 0 && !$sk.data('hadInit')){//只执行一次
				that.reflashSK();
				$sk.data('hadInit', 1);
				that.initSkInterval(120000);
			}

		}).resize(function(){
			winHeight = $(window).height();
		}).on('load', function(){
			$(this).scroll();
		});
		$('body').on('click', '.c_recommend_title div', function(){
			if($(this).hasClass('J_new')){
				$('.c_recommend_page .jp-previous').click();
				$('.c_commend_bar').removeClass('c_commend_right');
			}else{
				$('.c_recommend_page .jp-next').click();
				$('.c_commend_bar').addClass('c_commend_right');
			}
			$('.c_on').removeClass('c_on');
			$(this).addClass('c_on');
		}).on('click', '.c_stop_propa', function(e){
			e.stopPropagation();
		}).on('click', that.UI.floorChange, function(){
			that.applyFloorData($(this));
		}).on('click', '#J_top', function(){
			$('html,body').animate({scrollTop: '0px'}, 500);
		});


	},
	initPlugins: function(){

		//banner 轮播实例
		var bannerSwiper = new Swiper(this.UI.swiperSelector, {
		    mode:'horizontal',
		    loop: true,
		    autoplay:3000,
		    speed: 500,
		    calculateHeight: true,
		    pagination: this.UI.swiperPaginationSelector,
		    paginationClickable: true
		});

		$('.c_lazyload').lazyload();

		//活动专场jpage初始化
	    $("div#J_act_page").jPages({
	        containerID : "J_act_container",
	        animation   : false,
	        perPage: 4,
	        fallback: 600,
	        previous: '',
	        next: '',
	        delay: 1 //delay=0 ie8有bug
	    });
	    
	    //推荐
	    $('div.c_recommend_page').jPages({
	    	containerID : "J_recommend_container",
	        animation   : false,
	        perPage: 20,
	        fallback: 600,
	        previous: '',
	        next: '',
	        callback: function(){
	        	$('.c_lazyload').lazyload();
	        }
	    });
	    
	},
	initTimeDown: function(){
		var that = this;
		var $timeDown = $(this.UI.timeDown);
		var _time = $timeDown.data('time');
		var _is_begin = $timeDown.data('is-begin');
		if($timeDown.length < 1) return;
		$timeDown.timeCountDown({
			time: _time*1000,
			callback: function (result) {
                var day = this.fillZero(result.d),
                    hour = this.fillZero(result.h),
                    minute = this.fillZero(result.m),
                    second = this.fillZero(result.s),
                    // ms = result.ms,
                    last_time = result.last_times;
                if ( last_time > 0) {
                	var html = day != '00' ? day + '天' : '';
                	html += hour + ':' + minute + ':' + second;
                	$timeDown.html(html);
                }else{
                	//计时结束刷新(允许1秒误差)
                	setTimeout(function(){
	                	that.reflashSK();
                	}, 1000);
                }
            }
		})
	},
	initSkInterval: function(delay){
		var that = this;
		setInterval(function(){
			that.reflashSK();
		}, delay);
	},
	reflashSK: function(){
		var that = this;
		$.ajax({
			url: that.data.getSKUrl,
			data: {
				start: 0,
				nums: 99
			},
			dataType: 'json',
			success: function(data){
				if (data.code == 200) {
					if(data.result && data.result.length>0){
						$(that.UI.sk).show();
						that.renderSK({skList: data.result});
					}else{
						$(that.UI.sk).hide();
					}
				} else {
					console.log(data.result);
				}
			},
			error: function(){
				console.log('get sk info err~');
			}
		})
	},
	renderSK: function(SKInfo){
		var $sk = $('.c_sk');

	 	if($sk.data('notFirst') != 1 || this.shouldFlashAll(SKInfo)){
			//第一次 或者 返回列表产品id改变了  走正常的render
	 		var html = template('J_sk_tmpl', SKInfo);
	 		$sk.empty().append(html);
	 		var opt = {
		        containerID : "J_sk_container",
		        animation   : false,
		        perPage: 9,
		        fallback: 600,
		        previous: '',
		        next: ''
		    };

		    if($sk.data('notFirst') == 1){
		    	opt.fallback = 1;
		    	opt.delay = 1;
		    }

		    $("div#J_sk_page").jPages(opt);
		    //闪购时间
		    this.initTimeDown();

		    $sk.data('notFirst', 1);//标记为不是第一次
	 	}else{
	 		//库存不同直接修改dom
	 		for (var i = 0, len = SKInfo.skList.length; i < len; i++) {
	 			if(this.data.SKInfo.skList[i].leaving_proportion != SKInfo.skList[i].leaving_proportion) {
	 				$('.c_sk li[data-product-id="' + SKInfo.skList[i].product_id + '"]')
	 					.find('.c_sk_bar span')
	 					.css('width', 100 - SKInfo.skList[i].leaving_proportion + '%')
	 					.end()
	 					.find('.c_sk_stock')
	 					.text(function(){
	 						if(SKInfo.skList[i].leaving_proportion != 0){
	 							return '已抢购' + (100 - SKInfo.skList[i].leaving_proportion) + '%';
	 						}else{
	 							return '抢光啦';
	 						}
	 					});
	 			}
	 		}
	 	}
 		this.data.SKInfo = SKInfo; 
	},
	shouldFlashAll: function(SKInfo){
		//列表改变
		if(this.data.SKInfo.skList.length != SKInfo.skList.length){
			return true;
		}
		//闪购状态改变
		if(this.data.SKInfo.skList[0].is_finish != SKInfo.skList[0].is_finish || this.data.SKInfo.skList[0].is_begin != SKInfo.skList[0].is_begin){
			return true;
		}
		//列表改变
		for (var i = 0, len = SKInfo.skList.length; i < len; i++ ) {
			if (SKInfo.skList[i].product_id != this.data.SKInfo.skList[i].product_id ) return true;
		}
		return false;
	},
	//$this->请求楼层换一批按钮的jq对象
	applyFloorData: function($changeBtn){
		var that = this;
		var url = $changeBtn.data('href') + $changeBtn.data('chid');
		var start = $changeBtn.data('start') - 0;
		if($changeBtn.hasClass('getting')) return;
		$changeBtn.addClass('getting');
		$.ajax({
			url: url,
			data: {
				start: start
			},
			dataType: 'json',
			success: function(data){
				if(data.code == 200){
					that.randerFloor($changeBtn.closest(that.UI.floor).find('.c_product_list'), data.result);
					if(data.result.data.list.length < 8) //换完了 重置为首页
						$changeBtn.data('start', 0);
					else
						$changeBtn.data('start', start + 8);
				}else{
					that.randerError($changeBtn.closest(that.UI.floor).find('.c_product_list'), data.result);
				}
				$changeBtn.removeClass('getting');
			},
			error: function(){
				$changeBtn.data('start', start - 8);
				$changeBtn.removeClass('getting');
				that.randerError($changeBtn.closest(that.UI.floor).find('.c_product_list'), '网络出现错误，请刷新再试~~');
			}
		});
	},
	//渲染楼层方法
	randerFloor: function($productList, result){
		var html = template('J_floor_tmpl', result);
		$productList.find('li').remove().end().append($(html));
	},
	randerError: function($productList, msg){
		$productList.find('li').remove().end().append('<p style="font-size: 16px; text-align:center; line-height: 315px;">' + msg + '<p>');
	}
}

index.init();
},{"../plugins/template":2}],2:[function(require,module,exports){
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjeWh1Yi9wYy9QdWJsaWMvc3JjL2pzL3Nob3AvaW5kZXguanMiLCJjeWh1Yi9wYy9QdWJsaWMvc3JjL2pzL3BsdWdpbnMvdGVtcGxhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hSQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3BsdWdpbnMvdGVtcGxhdGUnKTtcclxudmFyIGluZGV4ID0ge1xyXG5cdGRhdGE6IHtcclxuXHRcdGdldFNLVXJsOiAkKCcjSl9nZXRfc2tfaW5mbycpLnZhbCgpXHJcblx0fSxcclxuXHRVSToge1xyXG5cdFx0Y2F0SXRlbTogJy5jX2NhdF9uYXYgbGknLFxyXG5cdFx0c3dpcGVyU2VsZWN0b3I6ICcuY19zd2lwZXJfd3JhcF9jb250YWluZXInLFxyXG5cdFx0c3dpcGVyUGFnaW5hdGlvblNlbGVjdG9yOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuXHRcdGdvdG9Ub3A6ICcuY19maXhfdG9wJyxcclxuXHRcdHRpbWVEb3duOicuY190aW1lJyxcclxuXHRcdGZsb29yQ2hhbmdlOiAnLmNfZmxvb3JfY2hhbmdlJyxcclxuXHRcdGZsb29yOiAnLmNfZmxvb3InLFxyXG5cdFx0c2s6ICcuY19zaydcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmJpbmRFdmVudCgpO1xyXG5cdFx0dGhpcy5pbml0UGx1Z2lucygpO1xyXG5cdH0sXHJcblx0YmluZEV2ZW50OiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0dmFyIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHRcdHZhciAkZmxvb3IgPSAkKHRoYXQuVUkuZmxvb3IpO1xyXG5cdFx0dmFyICRzayA9ICQodGhhdC5VSS5zayk7XHJcblx0XHQkKHRoYXQuVUkuY2F0SXRlbSkuaG92ZXIoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnY19jYXRfaG92ZXJlZCcpLmZpbmQoJy5jX2NhdF9tb3JlJykuc2hvdygpO1xyXG5cdFx0fSwgZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY19jYXRfaG92ZXJlZCcpLmZpbmQoJy5jX2NhdF9tb3JlJykuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdHZhciBzY3JvbGxUb3AgPSAkdGhpcy5zY3JvbGxUb3AoKTtcclxuXHRcdFx0dmFyIGpxR290b1RvcCA9ICQodGhhdC5VSS5nb3RvVG9wKTtcclxuXHRcdFx0c2Nyb2xsVG9wID4gd2luSGVpZ2h0ID8ganFHb3RvVG9wLmZhZGVJbigxMDAwKTpqcUdvdG9Ub3AuZmFkZU91dCgxMDAwKTtcclxuXHJcblx0XHRcdCRmbG9vci5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyICRpdGVtID0gJCh0aGlzKTtcclxuXHRcdFx0XHR2YXIgdG9wID0gJGl0ZW0ub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRcdHZhciAkY2hhbmdlID0gJGl0ZW0uZmluZCh0aGF0LlVJLmZsb29yQ2hhbmdlKTtcclxuXHRcdFx0XHRpZih0b3AgLSBzY3JvbGxUb3AgLSB3aW5IZWlnaHQgPD0gMCAmJiAkY2hhbmdlLmRhdGEoJ3N0YXJ0JykgPT0gMCl7Ly/pq5jluqblnKjnqpflj6PlhoXkuJTnrKzkuIDmrKHor7fmsYJcclxuXHRcdFx0XHRcdHRoYXQuYXBwbHlGbG9vckRhdGEoJGNoYW5nZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0dmFyIHNrVG9wID0gJHNrLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0aWYgKCBza1RvcCAtIHNjcm9sbFRvcCAtIHdpbkhlaWdodCA8PSAwICYmICEkc2suZGF0YSgnaGFkSW5pdCcpKXsvL+WPquaJp+ihjOS4gOasoVxyXG5cdFx0XHRcdHRoYXQucmVmbGFzaFNLKCk7XHJcblx0XHRcdFx0JHNrLmRhdGEoJ2hhZEluaXQnLCAxKTtcclxuXHRcdFx0XHR0aGF0LmluaXRTa0ludGVydmFsKDEyMDAwMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KS5yZXNpemUoZnVuY3Rpb24oKXtcclxuXHRcdFx0d2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cdFx0fSkub24oJ2xvYWQnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLnNjcm9sbCgpO1xyXG5cdFx0fSk7XHJcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5jX3JlY29tbWVuZF90aXRsZSBkaXYnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdKX25ldycpKXtcclxuXHRcdFx0XHQkKCcuY19yZWNvbW1lbmRfcGFnZSAuanAtcHJldmlvdXMnKS5jbGljaygpO1xyXG5cdFx0XHRcdCQoJy5jX2NvbW1lbmRfYmFyJykucmVtb3ZlQ2xhc3MoJ2NfY29tbWVuZF9yaWdodCcpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQkKCcuY19yZWNvbW1lbmRfcGFnZSAuanAtbmV4dCcpLmNsaWNrKCk7XHJcblx0XHRcdFx0JCgnLmNfY29tbWVuZF9iYXInKS5hZGRDbGFzcygnY19jb21tZW5kX3JpZ2h0Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0JCgnLmNfb24nKS5yZW1vdmVDbGFzcygnY19vbicpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdjX29uJyk7XHJcblx0XHR9KS5vbignY2xpY2snLCAnLmNfc3RvcF9wcm9wYScsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSkub24oJ2NsaWNrJywgdGhhdC5VSS5mbG9vckNoYW5nZSwgZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhhdC5hcHBseUZsb29yRGF0YSgkKHRoaXMpKTtcclxuXHRcdH0pLm9uKCdjbGljaycsICcjSl90b3AnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6ICcwcHgnfSwgNTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSxcclxuXHRpbml0UGx1Z2luczogZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvL2Jhbm5lciDova7mkq3lrp7kvotcclxuXHRcdHZhciBiYW5uZXJTd2lwZXIgPSBuZXcgU3dpcGVyKHRoaXMuVUkuc3dpcGVyU2VsZWN0b3IsIHtcclxuXHRcdCAgICBtb2RlOidob3Jpem9udGFsJyxcclxuXHRcdCAgICBsb29wOiB0cnVlLFxyXG5cdFx0ICAgIGF1dG9wbGF5OjMwMDAsXHJcblx0XHQgICAgc3BlZWQ6IDUwMCxcclxuXHRcdCAgICBjYWxjdWxhdGVIZWlnaHQ6IHRydWUsXHJcblx0XHQgICAgcGFnaW5hdGlvbjogdGhpcy5VSS5zd2lwZXJQYWdpbmF0aW9uU2VsZWN0b3IsXHJcblx0XHQgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLmNfbGF6eWxvYWQnKS5sYXp5bG9hZCgpO1xyXG5cclxuXHRcdC8v5rS75Yqo5LiT5Zy6anBhZ2XliJ3lp4vljJZcclxuXHQgICAgJChcImRpdiNKX2FjdF9wYWdlXCIpLmpQYWdlcyh7XHJcblx0ICAgICAgICBjb250YWluZXJJRCA6IFwiSl9hY3RfY29udGFpbmVyXCIsXHJcblx0ICAgICAgICBhbmltYXRpb24gICA6IGZhbHNlLFxyXG5cdCAgICAgICAgcGVyUGFnZTogNCxcclxuXHQgICAgICAgIGZhbGxiYWNrOiA2MDAsXHJcblx0ICAgICAgICBwcmV2aW91czogJycsXHJcblx0ICAgICAgICBuZXh0OiAnJyxcclxuXHQgICAgICAgIGRlbGF5OiAxIC8vZGVsYXk9MCBpZTjmnIlidWdcclxuXHQgICAgfSk7XHJcblx0ICAgIFxyXG5cdCAgICAvL+aOqOiNkFxyXG5cdCAgICAkKCdkaXYuY19yZWNvbW1lbmRfcGFnZScpLmpQYWdlcyh7XHJcblx0ICAgIFx0Y29udGFpbmVySUQgOiBcIkpfcmVjb21tZW5kX2NvbnRhaW5lclwiLFxyXG5cdCAgICAgICAgYW5pbWF0aW9uICAgOiBmYWxzZSxcclxuXHQgICAgICAgIHBlclBhZ2U6IDIwLFxyXG5cdCAgICAgICAgZmFsbGJhY2s6IDYwMCxcclxuXHQgICAgICAgIHByZXZpb3VzOiAnJyxcclxuXHQgICAgICAgIG5leHQ6ICcnLFxyXG5cdCAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCl7XHJcblx0ICAgICAgICBcdCQoJy5jX2xhenlsb2FkJykubGF6eWxvYWQoKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0ICAgIFxyXG5cdH0sXHJcblx0aW5pdFRpbWVEb3duOiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0dmFyICR0aW1lRG93biA9ICQodGhpcy5VSS50aW1lRG93bik7XHJcblx0XHR2YXIgX3RpbWUgPSAkdGltZURvd24uZGF0YSgndGltZScpO1xyXG5cdFx0dmFyIF9pc19iZWdpbiA9ICR0aW1lRG93bi5kYXRhKCdpcy1iZWdpbicpO1xyXG5cdFx0aWYoJHRpbWVEb3duLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHRcdCR0aW1lRG93bi50aW1lQ291bnREb3duKHtcclxuXHRcdFx0dGltZTogX3RpbWUqMTAwMCxcclxuXHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXkgPSB0aGlzLmZpbGxaZXJvKHJlc3VsdC5kKSxcclxuICAgICAgICAgICAgICAgICAgICBob3VyID0gdGhpcy5maWxsWmVybyhyZXN1bHQuaCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gdGhpcy5maWxsWmVybyhyZXN1bHQubSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gdGhpcy5maWxsWmVybyhyZXN1bHQucyksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbXMgPSByZXN1bHQubXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lID0gcmVzdWx0Lmxhc3RfdGltZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGxhc3RfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFx0dmFyIGh0bWwgPSBkYXkgIT0gJzAwJyA/IGRheSArICflpKknIDogJyc7XHJcbiAgICAgICAgICAgICAgICBcdGh0bWwgKz0gaG91ciArICc6JyArIG1pbnV0ZSArICc6JyArIHNlY29uZDtcclxuICAgICAgICAgICAgICAgIFx0JHRpbWVEb3duLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFx0Ly/orqHml7bnu5PmnZ/liLfmlrAo5YWB6K64Meenkuivr+W3rilcclxuICAgICAgICAgICAgICAgIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdCAgICAgICAgICAgICAgICBcdHRoYXQucmVmbGFzaFNLKCk7XHJcbiAgICAgICAgICAgICAgICBcdH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9KVxyXG5cdH0sXHJcblx0aW5pdFNrSW50ZXJ2YWw6IGZ1bmN0aW9uKGRlbGF5KXtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoYXQucmVmbGFzaFNLKCk7XHJcblx0XHR9LCBkZWxheSk7XHJcblx0fSxcclxuXHRyZWZsYXNoU0s6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHRoYXQuZGF0YS5nZXRTS1VybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHN0YXJ0OiAwLFxyXG5cdFx0XHRcdG51bXM6IDk5XHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRpZihkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0XHRcdCQodGhhdC5VSS5zaykuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHR0aGF0LnJlbmRlclNLKHtza0xpc3Q6IGRhdGEucmVzdWx0fSk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0JCh0aGF0LlVJLnNrKS5oaWRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEucmVzdWx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnZXQgc2sgaW5mbyBlcnJ+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSxcclxuXHRyZW5kZXJTSzogZnVuY3Rpb24oU0tJbmZvKXtcclxuXHRcdHZhciAkc2sgPSAkKCcuY19zaycpO1xyXG5cclxuXHQgXHRpZigkc2suZGF0YSgnbm90Rmlyc3QnKSAhPSAxIHx8IHRoaXMuc2hvdWxkRmxhc2hBbGwoU0tJbmZvKSl7XHJcblx0XHRcdC8v56ys5LiA5qyhIOaIluiAhSDov5Tlm57liJfooajkuqflk4FpZOaUueWPmOS6hiAg6LWw5q2j5bi455qEcmVuZGVyXHJcblx0IFx0XHR2YXIgaHRtbCA9IHRlbXBsYXRlKCdKX3NrX3RtcGwnLCBTS0luZm8pO1xyXG5cdCBcdFx0JHNrLmVtcHR5KCkuYXBwZW5kKGh0bWwpO1xyXG5cdCBcdFx0dmFyIG9wdCA9IHtcclxuXHRcdCAgICAgICAgY29udGFpbmVySUQgOiBcIkpfc2tfY29udGFpbmVyXCIsXHJcblx0XHQgICAgICAgIGFuaW1hdGlvbiAgIDogZmFsc2UsXHJcblx0XHQgICAgICAgIHBlclBhZ2U6IDksXHJcblx0XHQgICAgICAgIGZhbGxiYWNrOiA2MDAsXHJcblx0XHQgICAgICAgIHByZXZpb3VzOiAnJyxcclxuXHRcdCAgICAgICAgbmV4dDogJydcclxuXHRcdCAgICB9O1xyXG5cclxuXHRcdCAgICBpZigkc2suZGF0YSgnbm90Rmlyc3QnKSA9PSAxKXtcclxuXHRcdCAgICBcdG9wdC5mYWxsYmFjayA9IDE7XHJcblx0XHQgICAgXHRvcHQuZGVsYXkgPSAxO1xyXG5cdFx0ICAgIH1cclxuXHJcblx0XHQgICAgJChcImRpdiNKX3NrX3BhZ2VcIikualBhZ2VzKG9wdCk7XHJcblx0XHQgICAgLy/pl6rotK3ml7bpl7RcclxuXHRcdCAgICB0aGlzLmluaXRUaW1lRG93bigpO1xyXG5cclxuXHRcdCAgICAkc2suZGF0YSgnbm90Rmlyc3QnLCAxKTsvL+agh+iusOS4uuS4jeaYr+esrOS4gOasoVxyXG5cdCBcdH1lbHNle1xyXG5cdCBcdFx0Ly/lupPlrZjkuI3lkIznm7TmjqXkv67mlLlkb21cclxuXHQgXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBTS0luZm8uc2tMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0IFx0XHRcdGlmKHRoaXMuZGF0YS5TS0luZm8uc2tMaXN0W2ldLmxlYXZpbmdfcHJvcG9ydGlvbiAhPSBTS0luZm8uc2tMaXN0W2ldLmxlYXZpbmdfcHJvcG9ydGlvbikge1xyXG5cdCBcdFx0XHRcdCQoJy5jX3NrIGxpW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBTS0luZm8uc2tMaXN0W2ldLnByb2R1Y3RfaWQgKyAnXCJdJylcclxuXHQgXHRcdFx0XHRcdC5maW5kKCcuY19za19iYXIgc3BhbicpXHJcblx0IFx0XHRcdFx0XHQuY3NzKCd3aWR0aCcsIDEwMCAtIFNLSW5mby5za0xpc3RbaV0ubGVhdmluZ19wcm9wb3J0aW9uICsgJyUnKVxyXG5cdCBcdFx0XHRcdFx0LmVuZCgpXHJcblx0IFx0XHRcdFx0XHQuZmluZCgnLmNfc2tfc3RvY2snKVxyXG5cdCBcdFx0XHRcdFx0LnRleHQoZnVuY3Rpb24oKXtcclxuXHQgXHRcdFx0XHRcdFx0aWYoU0tJbmZvLnNrTGlzdFtpXS5sZWF2aW5nX3Byb3BvcnRpb24gIT0gMCl7XHJcblx0IFx0XHRcdFx0XHRcdFx0cmV0dXJuICflt7LmiqLotK0nICsgKDEwMCAtIFNLSW5mby5za0xpc3RbaV0ubGVhdmluZ19wcm9wb3J0aW9uKSArICclJztcclxuXHQgXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0IFx0XHRcdFx0XHRcdFx0cmV0dXJuICfmiqLlhYnllaYnO1xyXG5cdCBcdFx0XHRcdFx0XHR9XHJcblx0IFx0XHRcdFx0XHR9KTtcclxuXHQgXHRcdFx0fVxyXG5cdCBcdFx0fVxyXG5cdCBcdH1cclxuIFx0XHR0aGlzLmRhdGEuU0tJbmZvID0gU0tJbmZvOyBcclxuXHR9LFxyXG5cdHNob3VsZEZsYXNoQWxsOiBmdW5jdGlvbihTS0luZm8pe1xyXG5cdFx0Ly/liJfooajmlLnlj5hcclxuXHRcdGlmKHRoaXMuZGF0YS5TS0luZm8uc2tMaXN0Lmxlbmd0aCAhPSBTS0luZm8uc2tMaXN0Lmxlbmd0aCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Ly/pl6rotK3nirbmgIHmlLnlj5hcclxuXHRcdGlmKHRoaXMuZGF0YS5TS0luZm8uc2tMaXN0WzBdLmlzX2ZpbmlzaCAhPSBTS0luZm8uc2tMaXN0WzBdLmlzX2ZpbmlzaCB8fCB0aGlzLmRhdGEuU0tJbmZvLnNrTGlzdFswXS5pc19iZWdpbiAhPSBTS0luZm8uc2tMaXN0WzBdLmlzX2JlZ2luKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHQvL+WIl+ihqOaUueWPmFxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IFNLSW5mby5za0xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XHJcblx0XHRcdGlmIChTS0luZm8uc2tMaXN0W2ldLnByb2R1Y3RfaWQgIT0gdGhpcy5kYXRhLlNLSW5mby5za0xpc3RbaV0ucHJvZHVjdF9pZCApIHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblx0Ly8kdGhpcy0+6K+35rGC5qW85bGC5o2i5LiA5om55oyJ6ZKu55qEanHlr7nosaFcclxuXHRhcHBseUZsb29yRGF0YTogZnVuY3Rpb24oJGNoYW5nZUJ0bil7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHR2YXIgdXJsID0gJGNoYW5nZUJ0bi5kYXRhKCdocmVmJykgKyAkY2hhbmdlQnRuLmRhdGEoJ2NoaWQnKTtcclxuXHRcdHZhciBzdGFydCA9ICRjaGFuZ2VCdG4uZGF0YSgnc3RhcnQnKSAtIDA7XHJcblx0XHRpZigkY2hhbmdlQnRuLmhhc0NsYXNzKCdnZXR0aW5nJykpIHJldHVybjtcclxuXHRcdCRjaGFuZ2VCdG4uYWRkQ2xhc3MoJ2dldHRpbmcnKTtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0c3RhcnQ6IHN0YXJ0XHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAyMDApe1xyXG5cdFx0XHRcdFx0dGhhdC5yYW5kZXJGbG9vcigkY2hhbmdlQnRuLmNsb3Nlc3QodGhhdC5VSS5mbG9vcikuZmluZCgnLmNfcHJvZHVjdF9saXN0JyksIGRhdGEucmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmKGRhdGEucmVzdWx0LmRhdGEubGlzdC5sZW5ndGggPCA4KSAvL+aNouWujOS6hiDph43nva7kuLrpppbpobVcclxuXHRcdFx0XHRcdFx0JGNoYW5nZUJ0bi5kYXRhKCdzdGFydCcsIDApO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHQkY2hhbmdlQnRuLmRhdGEoJ3N0YXJ0Jywgc3RhcnQgKyA4KTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHRoYXQucmFuZGVyRXJyb3IoJGNoYW5nZUJ0bi5jbG9zZXN0KHRoYXQuVUkuZmxvb3IpLmZpbmQoJy5jX3Byb2R1Y3RfbGlzdCcpLCBkYXRhLnJlc3VsdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCRjaGFuZ2VCdG4ucmVtb3ZlQ2xhc3MoJ2dldHRpbmcnKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JGNoYW5nZUJ0bi5kYXRhKCdzdGFydCcsIHN0YXJ0IC0gOCk7XHJcblx0XHRcdFx0JGNoYW5nZUJ0bi5yZW1vdmVDbGFzcygnZ2V0dGluZycpO1xyXG5cdFx0XHRcdHRoYXQucmFuZGVyRXJyb3IoJGNoYW5nZUJ0bi5jbG9zZXN0KHRoYXQuVUkuZmxvb3IpLmZpbmQoJy5jX3Byb2R1Y3RfbGlzdCcpLCAn572R57uc5Ye6546w6ZSZ6K+v77yM6K+35Yi35paw5YaN6K+Vfn4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHQvL+a4suafk+alvOWxguaWueazlVxyXG5cdHJhbmRlckZsb29yOiBmdW5jdGlvbigkcHJvZHVjdExpc3QsIHJlc3VsdCl7XHJcblx0XHR2YXIgaHRtbCA9IHRlbXBsYXRlKCdKX2Zsb29yX3RtcGwnLCByZXN1bHQpO1xyXG5cdFx0JHByb2R1Y3RMaXN0LmZpbmQoJ2xpJykucmVtb3ZlKCkuZW5kKCkuYXBwZW5kKCQoaHRtbCkpO1xyXG5cdH0sXHJcblx0cmFuZGVyRXJyb3I6IGZ1bmN0aW9uKCRwcm9kdWN0TGlzdCwgbXNnKXtcclxuXHRcdCRwcm9kdWN0TGlzdC5maW5kKCdsaScpLnJlbW92ZSgpLmVuZCgpLmFwcGVuZCgnPHAgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7IHRleHQtYWxpZ246Y2VudGVyOyBsaW5lLWhlaWdodDogMzE1cHg7XCI+JyArIG1zZyArICc8cD4nKTtcclxuXHR9XHJcbn1cclxuXHJcbmluZGV4LmluaXQoKTsiLCIvKiFhcnQtdGVtcGxhdGUgLSBUZW1wbGF0ZSBFbmdpbmUgfCBodHRwOi8vYXVpLmdpdGh1Yi5jb20vYXJ0VGVtcGxhdGUvKi9cclxuIWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm4gYS5yZXBsYWNlKHQsXCJcIikucmVwbGFjZSh1LFwiLFwiKS5yZXBsYWNlKHYsXCJcIikucmVwbGFjZSh3LFwiXCIpLnJlcGxhY2UoeCxcIlwiKS5zcGxpdCh5KX1mdW5jdGlvbiBiKGEpe3JldHVyblwiJ1wiK2EucmVwbGFjZSgvKCd8XFxcXCkvZyxcIlxcXFwkMVwiKS5yZXBsYWNlKC9cXHIvZyxcIlxcXFxyXCIpLnJlcGxhY2UoL1xcbi9nLFwiXFxcXG5cIikrXCInXCJ9ZnVuY3Rpb24gYyhjLGQpe2Z1bmN0aW9uIGUoYSl7cmV0dXJuIG0rPWEuc3BsaXQoL1xcbi8pLmxlbmd0aC0xLGsmJihhPWEucmVwbGFjZSgvXFxzKy9nLFwiIFwiKS5yZXBsYWNlKC88IS0tW1xcd1xcV10qPy0tPi9nLFwiXCIpKSxhJiYoYT1zWzFdK2IoYSkrc1syXStcIlxcblwiKSxhfWZ1bmN0aW9uIGYoYil7dmFyIGM9bTtpZihqP2I9aihiLGQpOmcmJihiPWIucmVwbGFjZSgvXFxuL2csZnVuY3Rpb24oKXtyZXR1cm4gbSsrLFwiJGxpbmU9XCIrbStcIjtcIn0pKSwwPT09Yi5pbmRleE9mKFwiPVwiKSl7dmFyIGU9bCYmIS9ePVs9I10vLnRlc3QoYik7aWYoYj1iLnJlcGxhY2UoL149Wz0jXT98W1xccztdKiQvZyxcIlwiKSxlKXt2YXIgZj1iLnJlcGxhY2UoL1xccypcXChbXlxcKV0rXFwpLyxcIlwiKTtuW2ZdfHwvXihpbmNsdWRlfHByaW50KSQvLnRlc3QoZil8fChiPVwiJGVzY2FwZShcIitiK1wiKVwiKX1lbHNlIGI9XCIkc3RyaW5nKFwiK2IrXCIpXCI7Yj1zWzFdK2Irc1syXX1yZXR1cm4gZyYmKGI9XCIkbGluZT1cIitjK1wiO1wiK2IpLHIoYShiKSxmdW5jdGlvbihhKXtpZihhJiYhcFthXSl7dmFyIGI7Yj1cInByaW50XCI9PT1hP3U6XCJpbmNsdWRlXCI9PT1hP3Y6blthXT9cIiR1dGlscy5cIithOm9bYV0/XCIkaGVscGVycy5cIithOlwiJGRhdGEuXCIrYSx3Kz1hK1wiPVwiK2IrXCIsXCIscFthXT0hMH19KSxiK1wiXFxuXCJ9dmFyIGc9ZC5kZWJ1ZyxoPWQub3BlblRhZyxpPWQuY2xvc2VUYWcsaj1kLnBhcnNlcixrPWQuY29tcHJlc3MsbD1kLmVzY2FwZSxtPTEscD17JGRhdGE6MSwkZmlsZW5hbWU6MSwkdXRpbHM6MSwkaGVscGVyczoxLCRvdXQ6MSwkbGluZToxfSxxPVwiXCIudHJpbSxzPXE/W1wiJG91dD0nJztcIixcIiRvdXQrPVwiLFwiO1wiLFwiJG91dFwiXTpbXCIkb3V0PVtdO1wiLFwiJG91dC5wdXNoKFwiLFwiKTtcIixcIiRvdXQuam9pbignJylcIl0sdD1xP1wiJG91dCs9dGV4dDtyZXR1cm4gJG91dDtcIjpcIiRvdXQucHVzaCh0ZXh0KTtcIix1PVwiZnVuY3Rpb24oKXt2YXIgdGV4dD0nJy5jb25jYXQuYXBwbHkoJycsYXJndW1lbnRzKTtcIit0K1wifVwiLHY9XCJmdW5jdGlvbihmaWxlbmFtZSxkYXRhKXtkYXRhPWRhdGF8fCRkYXRhO3ZhciB0ZXh0PSR1dGlscy4kaW5jbHVkZShmaWxlbmFtZSxkYXRhLCRmaWxlbmFtZSk7XCIrdCtcIn1cIix3PVwiJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsXCIrKGc/XCIkbGluZT0wLFwiOlwiXCIpLHg9c1swXSx5PVwicmV0dXJuIG5ldyBTdHJpbmcoXCIrc1szXStcIik7XCI7cihjLnNwbGl0KGgpLGZ1bmN0aW9uKGEpe2E9YS5zcGxpdChpKTt2YXIgYj1hWzBdLGM9YVsxXTsxPT09YS5sZW5ndGg/eCs9ZShiKTooeCs9ZihiKSxjJiYoeCs9ZShjKSkpfSk7dmFyIHo9dyt4K3k7ZyYmKHo9XCJ0cnl7XCIreitcIn1jYXRjaChlKXt0aHJvdyB7ZmlsZW5hbWU6JGZpbGVuYW1lLG5hbWU6J1JlbmRlciBFcnJvcicsbWVzc2FnZTplLm1lc3NhZ2UsbGluZTokbGluZSxzb3VyY2U6XCIrYihjKStcIi5zcGxpdCgvXFxcXG4vKVskbGluZS0xXS5yZXBsYWNlKC9eXFxcXHMrLywnJyl9O31cIik7dHJ5e3ZhciBBPW5ldyBGdW5jdGlvbihcIiRkYXRhXCIsXCIkZmlsZW5hbWVcIix6KTtyZXR1cm4gQS5wcm90b3R5cGU9bixBfWNhdGNoKEIpe3Rocm93IEIudGVtcD1cImZ1bmN0aW9uIGFub255bW91cygkZGF0YSwkZmlsZW5hbWUpIHtcIit6K1wifVwiLEJ9fXZhciBkPWZ1bmN0aW9uKGEsYil7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGI/cShiLHtmaWxlbmFtZTphfSk6ZyhhLGIpfTtkLnZlcnNpb249XCIzLjAuMFwiLGQuY29uZmlnPWZ1bmN0aW9uKGEsYil7ZVthXT1ifTt2YXIgZT1kLmRlZmF1bHRzPXtvcGVuVGFnOlwiPCVcIixjbG9zZVRhZzpcIiU+XCIsZXNjYXBlOiEwLGNhY2hlOiEwLGNvbXByZXNzOiExLHBhcnNlcjpudWxsfSxmPWQuY2FjaGU9e307ZC5yZW5kZXI9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gcShhLGIpfTt2YXIgZz1kLnJlbmRlckZpbGU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1kLmdldChhKXx8cCh7ZmlsZW5hbWU6YSxuYW1lOlwiUmVuZGVyIEVycm9yXCIsbWVzc2FnZTpcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7cmV0dXJuIGI/YyhiKTpjfTtkLmdldD1mdW5jdGlvbihhKXt2YXIgYjtpZihmW2FdKWI9ZlthXTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBkb2N1bWVudCl7dmFyIGM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSk7aWYoYyl7dmFyIGQ9KGMudmFsdWV8fGMuaW5uZXJIVE1MKS5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLFwiXCIpO2I9cShkLHtmaWxlbmFtZTphfSl9fXJldHVybiBifTt2YXIgaD1mdW5jdGlvbihhLGIpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYj10eXBlb2YgYSxcIm51bWJlclwiPT09Yj9hKz1cIlwiOmE9XCJmdW5jdGlvblwiPT09Yj9oKGEuY2FsbChhKSk6XCJcIiksYX0saT17XCI8XCI6XCImIzYwO1wiLFwiPlwiOlwiJiM2MjtcIiwnXCInOlwiJiMzNDtcIixcIidcIjpcIiYjMzk7XCIsXCImXCI6XCImIzM4O1wifSxqPWZ1bmN0aW9uKGEpe3JldHVybiBpW2FdfSxrPWZ1bmN0aW9uKGEpe3JldHVybiBoKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLGopfSxsPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGEpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXt9LnRvU3RyaW5nLmNhbGwoYSl9LG09ZnVuY3Rpb24oYSxiKXt2YXIgYyxkO2lmKGwoYSkpZm9yKGM9MCxkPWEubGVuZ3RoO2Q+YztjKyspYi5jYWxsKGEsYVtjXSxjLGEpO2Vsc2UgZm9yKGMgaW4gYSliLmNhbGwoYSxhW2NdLGMpfSxuPWQudXRpbHM9eyRoZWxwZXJzOnt9LCRpbmNsdWRlOmcsJHN0cmluZzpoLCRlc2NhcGU6aywkZWFjaDptfTtkLmhlbHBlcj1mdW5jdGlvbihhLGIpe29bYV09Yn07dmFyIG89ZC5oZWxwZXJzPW4uJGhlbHBlcnM7ZC5vbmVycm9yPWZ1bmN0aW9uKGEpe3ZhciBiPVwiVGVtcGxhdGUgRXJyb3JcXG5cXG5cIjtmb3IodmFyIGMgaW4gYSliKz1cIjxcIitjK1wiPlxcblwiK2FbY10rXCJcXG5cXG5cIjtcIm9iamVjdFwiPT10eXBlb2YgY29uc29sZSYmY29uc29sZS5lcnJvcihiKX07dmFyIHA9ZnVuY3Rpb24oYSl7cmV0dXJuIGQub25lcnJvcihhKSxmdW5jdGlvbigpe3JldHVyblwie1RlbXBsYXRlIEVycm9yfVwifX0scT1kLmNvbXBpbGU9ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBkKGMpe3RyeXtyZXR1cm4gbmV3IGkoYyxoKStcIlwifWNhdGNoKGQpe3JldHVybiBiLmRlYnVnP3AoZCkoKTooYi5kZWJ1Zz0hMCxxKGEsYikoYykpfX1iPWJ8fHt9O2Zvcih2YXIgZyBpbiBlKXZvaWQgMD09PWJbZ10mJihiW2ddPWVbZ10pO3ZhciBoPWIuZmlsZW5hbWU7dHJ5e3ZhciBpPWMoYSxiKX1jYXRjaChqKXtyZXR1cm4gai5maWxlbmFtZT1ofHxcImFub255bW91c1wiLGoubmFtZT1cIlN5bnRheCBFcnJvclwiLHAoail9cmV0dXJuIGQucHJvdG90eXBlPWkucHJvdG90eXBlLGQudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gaS50b1N0cmluZygpfSxoJiZiLmNhY2hlJiYoZltoXT1kKSxkfSxyPW4uJGVhY2gscz1cImJyZWFrLGNhc2UsY2F0Y2gsY29udGludWUsZGVidWdnZXIsZGVmYXVsdCxkZWxldGUsZG8sZWxzZSxmYWxzZSxmaW5hbGx5LGZvcixmdW5jdGlvbixpZixpbixpbnN0YW5jZW9mLG5ldyxudWxsLHJldHVybixzd2l0Y2gsdGhpcyx0aHJvdyx0cnVlLHRyeSx0eXBlb2YsdmFyLHZvaWQsd2hpbGUsd2l0aCxhYnN0cmFjdCxib29sZWFuLGJ5dGUsY2hhcixjbGFzcyxjb25zdCxkb3VibGUsZW51bSxleHBvcnQsZXh0ZW5kcyxmaW5hbCxmbG9hdCxnb3RvLGltcGxlbWVudHMsaW1wb3J0LGludCxpbnRlcmZhY2UsbG9uZyxuYXRpdmUscGFja2FnZSxwcml2YXRlLHByb3RlY3RlZCxwdWJsaWMsc2hvcnQsc3RhdGljLHN1cGVyLHN5bmNocm9uaXplZCx0aHJvd3MsdHJhbnNpZW50LHZvbGF0aWxlLGFyZ3VtZW50cyxsZXQseWllbGQsdW5kZWZpbmVkXCIsdD0vXFwvXFwqW1xcd1xcV10qP1xcKlxcL3xcXC9cXC9bXlxcbl0qXFxufFxcL1xcL1teXFxuXSokfFwiKD86W15cIlxcXFxdfFxcXFxbXFx3XFxXXSkqXCJ8Jyg/OlteJ1xcXFxdfFxcXFxbXFx3XFxXXSkqJ3xcXHMqXFwuXFxzKlskXFx3XFwuXSsvZyx1PS9bXlxcdyRdKy9nLHY9bmV3IFJlZ0V4cChbXCJcXFxcYlwiK3MucmVwbGFjZSgvLC9nLFwiXFxcXGJ8XFxcXGJcIikrXCJcXFxcYlwiXS5qb2luKFwifFwiKSxcImdcIiksdz0vXlxcZFteLF0qfCxcXGRbXixdKi9nLHg9L14sK3wsKyQvZyx5PS9eJHwsKy87ZS5vcGVuVGFnPVwie3tcIixlLmNsb3NlVGFnPVwifX1cIjt2YXIgej1mdW5jdGlvbihhLGIpe3ZhciBjPWIuc3BsaXQoXCI6XCIpLGQ9Yy5zaGlmdCgpLGU9Yy5qb2luKFwiOlwiKXx8XCJcIjtyZXR1cm4gZSYmKGU9XCIsIFwiK2UpLFwiJGhlbHBlcnMuXCIrZCtcIihcIithK2UrXCIpXCJ9O2UucGFyc2VyPWZ1bmN0aW9uKGEpe2E9YS5yZXBsYWNlKC9eXFxzLyxcIlwiKTt2YXIgYj1hLnNwbGl0KFwiIFwiKSxjPWIuc2hpZnQoKSxlPWIuam9pbihcIiBcIik7c3dpdGNoKGMpe2Nhc2VcImlmXCI6YT1cImlmKFwiK2UrXCIpe1wiO2JyZWFrO2Nhc2VcImVsc2VcIjpiPVwiaWZcIj09PWIuc2hpZnQoKT9cIiBpZihcIitiLmpvaW4oXCIgXCIpK1wiKVwiOlwiXCIsYT1cIn1lbHNlXCIrYitcIntcIjticmVhaztjYXNlXCIvaWZcIjphPVwifVwiO2JyZWFrO2Nhc2VcImVhY2hcIjp2YXIgZj1iWzBdfHxcIiRkYXRhXCIsZz1iWzFdfHxcImFzXCIsaD1iWzJdfHxcIiR2YWx1ZVwiLGk9YlszXXx8XCIkaW5kZXhcIixqPWgrXCIsXCIraTtcImFzXCIhPT1nJiYoZj1cIltdXCIpLGE9XCIkZWFjaChcIitmK1wiLGZ1bmN0aW9uKFwiK2orXCIpe1wiO2JyZWFrO2Nhc2VcIi9lYWNoXCI6YT1cIn0pO1wiO2JyZWFrO2Nhc2VcImVjaG9cIjphPVwicHJpbnQoXCIrZStcIik7XCI7YnJlYWs7Y2FzZVwicHJpbnRcIjpjYXNlXCJpbmNsdWRlXCI6YT1jK1wiKFwiK2Iuam9pbihcIixcIikrXCIpO1wiO2JyZWFrO2RlZmF1bHQ6aWYoL15cXHMqXFx8XFxzKltcXHdcXCRdLy50ZXN0KGUpKXt2YXIgaz0hMDswPT09YS5pbmRleE9mKFwiI1wiKSYmKGE9YS5zdWJzdHIoMSksaz0hMSk7Zm9yKHZhciBsPTAsbT1hLnNwbGl0KFwifFwiKSxuPW0ubGVuZ3RoLG89bVtsKytdO24+bDtsKyspbz16KG8sbVtsXSk7YT0oaz9cIj1cIjpcIj0jXCIpK299ZWxzZSBhPWQuaGVscGVyc1tjXT9cIj0jXCIrYytcIihcIitiLmpvaW4oXCIsXCIpK1wiKTtcIjpcIj1cIithfXJldHVybiBhfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmU/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGR9KTpcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1kOnRoaXMudGVtcGxhdGU9ZH0oKTsiXX0=
