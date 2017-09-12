(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var coupon = require('./util/oper_pc_coupon');
var pc = {
	init:function(){
		var that = this;
		$(function(){
			that.bindCusEvent();
			if($('#c_coupon_open').val()){
				coupon.init();
			}
		})
	}, 
	bindCusEvent:function(){
		$('.c_img_lazy').lazyload({ 
			event : "turnPage",
			effect : "fadeIn"
		});
		$('.c_holder').jPages({
			containerID: 'c_brand_item_list',
			previous : "←",
			next : "→",
			perPage:16, 
			midRange: 3,
			minHeight: false,
			direction: "random",
			animation   : "fadeInUp",
			callback    : function( pages, items ){
			/* lazy load current images */
				items.showing.find("img").trigger("turnPage");
				/* lazy load next page images */
				items.oncoming.find("img").trigger("turnPage");
			}
		});
		$('body').on('click','.c_buy_btn',function(){
			window.location.href = $(this).parents('.c_brand_item').find('.c_item_link').attr('href');
		});
		$(window).on('scroll', function(){
			if($(this).scrollTop() > 400){
				$('.c_go_top').show();
			}else{
				$('.c_go_top').hide();
			}
		});
		var wid = $('.c_brand_img_wrap').width();
		$('area').each(function(inx,el){
			var arr = $(el).attr("coords").split(",");
			console.log($(el).attr("coords"))
			for (var k = 0; k < arr.length ; k++) {
			    arr[k] = parseInt(arr[k]*wid/1040);
			}
			$(el).attr("coords",arr.join(","));

		})

	}
}

pc.init();

module.exports = pc;
},{"./util/oper_pc_coupon":7}],2:[function(require,module,exports){
var browser = {
	versions:function(){
	    var u = navigator.userAgent, app = navigator.appVersion;
	    return {         //移动终端浏览器版本信息
	        trident: u.indexOf('Trident') > -1, //IE内核
	        presto: u.indexOf('Presto') > -1, //opera内核
	        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
	        iPad: u.indexOf('iPad') > -1, //是否iPad
	        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	    };
	 }()
}
module.exports = browser;
},{}],3:[function(require,module,exports){
var login = {
	data: {
		newUserUrl: $('#newUserUrl').val(),
		oldUserUrl: $('#oldUserUrl').val(),
		smsUrl: $('#smsUrl').val(),
		captchaUrl:$('#captchaUrl').val()
	},
	height:0,
	width:0,
	tabWrap:null,
	successCb:null,
	msgcode:null,
	opt:null,
	init:function(opt,cb){
		
		// init 的时候分两个步骤。 1个计算摆放位置 2对tab初始化 3 展示出来
		if(typeof opt === 'function'){
			this.successCb = opt;
		}else{
			this.opt = opt;
			this.successCb = cb;
		}
        this.initStatus();
        this.initPlugin();
        this.cusEvent();
        this.msgcode.init($('#c_get_sms_code'), this.data.smsUrl);//todo手机验证码！
		this.tabWrap = $('#c_tab_wrap');
		this.width = this.tabWrap.outerWidth && this.tabWrap.outerWidth();
		this.height = this.tabWrap.outerWidth && this.tabWrap.outerWidth();
		opt.type && $('#tab_'+opt.type+'_title').trigger('click');
	},
	//调用该方法，把登录窗口显示出来
	showLogin: function(){
		var winWidth = $(window).width();
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	this.tabWrap.css({
			left:(winWidth-this.height)/2,
			top:scrollTop + 50
		});
    	$('#c_dia_mask').show();
		$('#c_tab_wrap').show();
		$('#img_code').trigger('click');
	},
	cusEvent:function(){
		var that = this;
		$('body').on('click','.dia_close',function(){
			$('#c_dia_mask').hide();
			$('#c_tab_wrap').hide();
		}).on('click','.ipt_label',function(){
			var jqThis = $(this).siblings('.ipt');
			jqThis.removeClass('error');
			jqThis.siblings('label').hide();
			$('.dred.'+jqThis.attr('id')+'_label').hide();
			jqThis.focus();
		}).on('focus','input.ipt',function(){
			var jqThis = $(this);
			jqThis.removeClass('error');
			jqThis.siblings('label').hide();
			$('.dred.'+jqThis.attr('id')+'_label').hide();	
		}).on('blur','input.ipt',function(){
			var jqThis = $(this);
			if( jqThis.val() == ''){
				jqThis.addClass('error');
				jqThis.siblings('label').show();
				$('.dred.'+jqThis.attr('id')+'_label').show();
			}else{
				jqThis.removeClass('error');
				jqThis.siblings('label').hide();
				$('.dred.'+jqThis.attr('id')+'_label').hide();
			} 
		}).on('click','#log_btn',function(){
			var params = {};
	        params.phone = $('#c_user_name').val();
	        params.password = $('#c_user_psw').val();
	        params.remember = $('#remember').val();
	        if (params.phone == '') { alert('请填写用户名'); return false; };
	        if (params.password == '') { alert('请填写密码'); return false; };
	        $.ajax({  
	            type: "post",  
	            url: that.data.oldUserUrl,//todo 正常登录的url！！
	            dataType: "json",  
	            data: {
	                phone: params.phone,
	                password: params.password
	                // remember: params.remember//todo
	            },  
	            success: function(ret){
	                if(ret.code == 200){
	                	if(that.successCb){
	                		// alert('登录成功,可以买买买啦( ＞ω＜)!!!');//todo 登录成功提示
	                		$('.dia_close').trigger('click');
	                		that.successCb(that.opt);
	                	}else{
	                		$('#c_dia_mask').hide();
							$('#c_tab_wrap').hide();
	                	}
	                }else{
	                    alert(ret.result);
	                }
	            },
	            error : function(ret){  
	                alert('未知错误，请重新尝试');
	            }
	        });
		}).on('click','#img_code',function(){
			$(this).attr('src',that.data.captchaUrl+'?'+ parseInt(Math.random() * 100000));//todo验证码
		// }).on('click','#tab_login_title',function(){
		// 	$('.log_form_wrap .verify_img').attr('src','i.php?c=login&a=captcha');//todo
		// }).on('click','#tab_reg_title',function(){
		// 	$('.reg_form_wrap .verify_img').attr('src','i.php?c=login&a=captcha');//todo
		}).on('click','#reg_btn',function(){
			var phone = $('#c_reg_name'),
                sms_verify = $('#c_reg_sms_code'),
                img_verify = $('#c_reg_img_code'),
                pwd = $('#c_reg_psw'),
                repwd =$('#c_reg_confirm_psw'),
                data = {
                    phone: phone.val(),
                    sms_verify: sms_verify.val(),
                    img_verify: img_verify.val(),
                    password: pwd.val(),
                    repassword: repwd.val()
                };

            if(that.NotBlank(['#c_reg_name', '#c_reg_img_verify', '#c_reg_sms_code', '#c_reg_img_code', '#c_reg_psw', '#c_reg_confirm_psw'])) {
                if(pwd.val() !== repwd.val()) {
                    alert('两次密码不相同');
                    return;
                }
                $.ajax({  
                    type: "post",  
                    url: that.data.newUserUrl,  //todo注册
                    dataType: "json",  
                    data: data,  
                    success: function(ret){
                        if(ret.code == 200){
                        	if(that.successCb){
                        		// alert('登录成功,可以买买买啦( ＞ω＜)!!!');
                        		$('.dia_close').trigger('click');
                        		that.successCb.data = ret;
                        		that.successCb(that.opt);
                        	}else{
                        		$('#c_dia_mask').hide();
								$('#c_tab_wrap').hide();
                        	}

                        }else{
                            alert(ret.result);
                        }
                    },
                    error : function(ret){   
                        alert('未知错误，请重新尝试');
                    }
                });
            }
		})
	},
	NotBlank:function(array){
		 var len = array.length;
            for(var i =0; i < len; i++) { 
                var dom = $(array[i]),
                    val = dom.val();

                if(val == '') {
                    alert(dom.data('text')+'不能为空');
                    return false;
                }

            }
            return true;
	},
	initStatus:function(){
        var aTabBodys = $('#tabs_body > div');
        $('#tabs > a').each(function(index){
            $(this).click(function(){
                $(this).removeClass().addClass('on').siblings().removeClass();
                aTabBodys.hide().eq(index).show();
                // aTabBodys.eq(index).find('.verify_img').attr('src','i.php?c=login&a=captcha');
            });
        });
        $('input.ipt').each(function(){
        	var jqThis = $(this);
        	if(jqThis.val() != ''){
        		jqThis.removeClass('error');
				jqThis.siblings('label').hide();
				$('.dred.'+jqThis.attr('id')+'_label').hide();
        	}else{
        		jqThis.addClass('error');
				jqThis.siblings('label').show();
				$('.dred.'+jqThis.attr('id')+'_label').show();
        	} 
        });
	},
	initPlugin:function(){
		this.msgcode = {
            el: undefined,
            tips: undefined,

            bind: function(link) {
                var that = this;

                this.el.click(function() {
                	if(!that.el.hasClass('btn-gray')){
	                   	var val = $('#c_reg_name').val();
	                   	var imgCodeVal = $('#c_reg_img_code').val();
	                    if (!val) {
	                        alert('手机号码不能为空');
	                        return;
	                    }
	                    if (!imgCodeVal) {
	                    	alert('验证码不能为空！');
	                    	return;
	                    }
	                    $.ajax({
	                        url: link,
	                        type: 'POST',
	                        dataType: 'json',  
	                        data: {
	                            phone: val,
	                            img_verify: imgCodeVal
	                        }
	                    }).done(function(data){
	                        //条件
	                        if(data.code == 200) { 
	                            alert(data.result);
	                            that.el.attr('disabled', 'disabled').addClass('btn-gray').css('cursor', 'not-allowed');
	                            that.countDown(function() {
	                                that.el.val('获取验证码').removeAttr('disabled').removeClass('btn-gray').css('cursor', 'pointer').css('background-color', '#ed3f3f')
	                            })
	                        }else{
	                            alert(data.result);
	                        }
	                    })
                	}
                })
            },

            init: function(el,link) {
                this.el = el;
                // this.tips = tips
                this.bind(link);
            },
            countDown: function(cb) {
                var that = this,
                    count = 120;

                (function fcount() {
                    if(count < 0) return cb();
                    if(count == 0){
                    	count--;
                    	that.el.text('重新获取');
                    }else{
                    	that.el.text('重新获取('+ count-- + ')')
                    }
                    
                    that.el.attr('disabled', 'disabled');
                    that.el.css('background-color', '#CCC');
                    setTimeout(fcount, 1000)
                })()
            }
        }

	}

}

module.exports = login;
},{}],4:[function(require,module,exports){
//common login in pc and wap and app
var	loginPC = require('./login.js');
var loginWap = require('./new_login_wap.js');
var myAlert = require('./my_alert.js');
var browser = require('./browser.js');

var loginAll = {
	init: function(viewType){
		if(viewType == 0){
			//pc plugin
			loginPC.init(function(){
				myAlert(viewType, '登录成功!', function(){
					location.reload();
				});
			});	
		}else if(viewType == 1){
			//wap
			loginWap.init(function(){
				myAlert(viewType, '登录成功', function(){
					location.reload();
				});
			});
		}
	},
	login: function(viewType, contents){
		if(viewType == 0) {
		 	//pc
		 	if(!contents){
			 	loginPC.showLogin();
		 	}else{
		 		myAlert(0, contents, function(){
		 			loginPC.showLogin();
		 		})
		 	}
		}else if(viewType == 1){
		 	//wap
		 	if(!contents){
			 	loginWap.showLogin();
		 	}else{
		 		myAlert(1, contents, function(){
		 			loginWap.showLogin();
		 		})
		 	}
		}else {
		 	//app
			if(browser.versions.mobile){ 
		    	if(browser.versions.ios){
		    		if(contents){
			    		myAlert(1, contents, function(){
				    		window.location.href = 'cyc://CYCJs2IOS.goLogin';
			    		});
		    		}else{
		    			window.location.href = 'cyc://CYCJs2IOS.goLogin';
		    		}
		    	}else if(browser.versions.android){
		    		if(window.cyc && window.cyc.openDialog){
		    			window.cyc.openDialog(2002, contents||'确定跳转到登录页面？');
		    		}
		    	}
		    }			 	
		}
	},
	logout: function(){
		//for logout
		var date = new Date();
		var ckArr = document.cookie.split(/\;\s*/);
		var cookies = {}, tmp;
		date.setTime(date.getTime() - 100000);

		for(var i=0, len=ckArr.length; i < len; i++){
			tmp = ckArr[i].split('=');
			cookies[tmp[0]] = tmp[1];
		}

		for(k in cookies){
			if(k == 'cyc_id' || k == 'PHPSESSID'){
				document.cookie = k + '=' + cookies[k] + ';expires=' + date.toGMTString() + ';domain=.cycang.com';
			}
		}

		$.ajax({
			url: 'user?a=loginOut',
			dataType: 'json',
			success: function(data){
				if(data.code == 200){
					location.reload();
				}else{
					myAlert(data.result);
				}
			},
			error: function(){
				myAlert('网络异常，请刷新后再试！~');
			}
		});
	}
}


module.exports = loginAll;
},{"./browser.js":2,"./login.js":3,"./my_alert.js":5,"./new_login_wap.js":6}],5:[function(require,module,exports){
/**
* act alert 模块
* pc用自带的弹框（todo）
* wap和app用layer插件
*/
module.exports = function(viewType, msg, cb){
	var cb = typeof cb == 'function' ? cb : null;
	if(viewType == 0){
		alert(msg);
		cb&&cb();
	}else{
		layer.open({
			btn: ['确定'],
			content: msg,
			end: cb
		});
	}
}
},{}],6:[function(require,module,exports){
var login = {
	data:{
		oldUrl:$('#oldUserUrl').val(),
		newUrl:$('#newUserUrl').val(),
		getSmsUrl:$('#smsUrl').val()
	},
	successCb: null,
	init:function(cb){
		this.bindCusEvent();
		this.initPlugins();
		this.msgcode.init($('#c_get_sms_code'),this.data.getSmsUrl);
		if(typeof cb == 'function') this.successCb = cb;
	},
	showLogin: function(){
    	$('.c_mask').show();
    	$('.c_fadeOut_layer').css({
    		'display':'block'
    	});
    	$('.c_fadeOut_layer').addClass('flip-bottom');
    	$('#img_code').trigger('touchend');
	},
	bindCusEvent:function(){
		var that = this;
		$('body').on('touchend','#c_old_get',function(){
			// 老用户登录
			var params = {};
	        params.phone = $('#c_old_user_phone').val();
	        params.pwd = $('#c_old_user_pwd').val();
	        if (params.phone == '') {
	        	// todo layerjs
	        	layer.open({
					btn: ['确定'],
	        	    content: '请填写手机号码'
	        	});
	        	return false; 
	        };
	        if (params.pwd == '') { 
	        	// todo layerjs
	        	layer.open({
					btn: ['确定'],
	        	    content: '请填密码'
	        	});
	        	return false; 
	        };
	        $.ajax({  
	            type: "post",  
	            url: that.data.oldUrl,   // todo need change
	            dataType: "json",  
	            data: {
	                phone: params.phone,
	                password: params.pwd
	            },  
	            success: function(ret){
               		if(ret.code==200){
               			$('.c_mask').hide();
               			$('.c_fadeOut_layer').css({
               				'display':'none'	
               			})
               			// window.cyc.isLogin = 1;
               			// layer.open({
               			    // content: '登陆成功！',
               			    // btn:['好的'],
               			    // yes:function(){
               			    // 	// window.location.reload();
               			    // }
               			// });
               			if(typeof that.successCb == 'function'){
               				that.successCb();
               			}
               		}else{
               			layer.open({
							btn: ['确定'],
               			    content: ret.result
               			});
               		}
	            },
	            error : function(ret){ 
	            // todo layerjs   
               		layer.open({
						btn: ['确定'],
		        	    content: '未知错误，请重新尝试~'
		        	});
		        	$('.c_mask').hide();
		        	$('.c_fadeOut_layer').css({
		        		'display':'none'	
		        	})
	            }
	        });
		}).on('touchend','#c_new_get',function(){//原来是touchend
			//新用户注册
			var phone = $('#c_new_user_phone'),
                sms_verify = $('#c_reg_sms_code'),
                pwd = $('#c_user_psw'),
                share_code = that.getQueryString('share_code'),
                img_verify = $('#c_reg_img_code');
                data = {
                    phone: phone.val(),
                    sms_verify: sms_verify.val(),
                    password: pwd.val(),
                    share_code:share_code,
                    img_verify: img_verify.val()
                };
            if(that.NotBlank(['#c_new_user_phone', '#c_user_psw', '#c_reg_img_code', '#c_reg_sms_code',])) {
                $.ajax({  
                    type: "post",  
                    url: that.data.newUrl,  
                    dataType: "json",  
                    data: data,  
                    success:function(ret){
                		if(ret.code==200){
	               			$('.c_mask').hide();
	               			$('.c_fadeOut_layer').css({
	               				'display':'none'	
	               			})
	               			// window.cyc.isLogin = 1;
	               			layer.open({
								btn: ['确定'],
	               			    content: '注册成功！',
	               			    end: function(){
	               			    	window.location.reload();
	               			    }
	               			    // btn:['好的'],
	               			    // yes:function(){
	               			    // 	// window.location.reload();
	               			    // }

	               			});
	               		}else{
	               			layer.open({
								btn: ['确定'],
	               			    content: ret.result
	               			});
	               		}
                	},
                	error:function(){
                		layer.open({
							btn: ['确定'],
			        	    content: '未知错误，请重新尝试~'
		        		});
		        		$('.c_mask').hide();
		        		$('.c_fadeOut_layer').css({
		        			'display':'none'	
		        		})
                	}
                });
            }
		}).on('touchend', '#img_code', function(){
			$(this).attr('src', 'captcha?' + parseInt(Math.random() * 10000));
		});
		$('.c_cls_icon').on('touchend',function(){//原来是touchend
			$('.c_mask').hide();
			$('.c_fadeOut_layer').css({
				'display':'none'
			})
		});
		$('.c_mask').on('touchend',function(){//原来是touchend
			$('.c_mask').hide();
			$('.c_fadeOut_layer').css({
				'display':'none'	
			})
		});
		$('.c_order_nav_ul li').click(function(){
				var t=$(this).index();
				var wh=$('.c_nav_line').width();
				f=-50*t+"%";
				cq=100*t+"%";
				$('.c_nav_mid').css({'-webkit-transform':'translate('+f+')','-webkit-transition':'500ms linear'} );
				$('.c_nav_line').css({'-webkit-transform':'translate('+cq+')','-webkit-transition':'300ms linear'} );
				$(this).siblings().removeClass('on');
				$(this).addClass('on');
		});
	},
	initPlugins:function(){
		this.msgcode = {
            el: undefined,
            tips: undefined,

            bind: function(link) {
                var that = this;

                this.el.click(function() {
                	if(!that.el.hasClass('c_btn_disabled')){
	                   	var val = $('#c_new_user_phone').val();
	                   	var imgCodeVal = $('#c_reg_img_code').val();
	                    if (!val) {
	                        alert('手机号码不能为空');
	                        return;
	                    }
	                    if (!imgCodeVal) {
	                    	alert('验证码不能为空');
	                    	return;
	                    }
	                    $.ajax({
	                        url: link,
	                        type: 'POST',
	                        dataType: 'json',  
	                        data: {
	                            phone: val,
	                            img_verify: imgCodeVal
	                        },
	                        success:function(data){
                        		if(data.code == 200) { 
		                    		layer.open({
										btn: ['确定'],
		    			        	    content: data.result
		    		        		});
                        		    that.el.addClass('c_btn_disabled')
                        		    that.countDown(function() {
                        		        that.el.val('获取验证码').removeClass('c_btn_disabled');
                        		    })
                        		}else{
			                		layer.open({
										btn: ['确定'],
						        	    content: data.result
					        		});
                        		}
	                        }
	                    })
                	}
                })
            },

            init: function(el,link) {
                this.el = el;
                // this.tips = tips
                this.bind(link);
            },
            countDown: function(cb) {
                var that = this,
                    count = 120;

                (function fcount() {
                    if(count < 0) return cb();
                    if(count == 0){
                    	count--;
                    	that.el.text('重新获取');
                    }else{
                    	that.el.text('重新获取('+ count-- + ')')
                    }
                    setTimeout(fcount, 1000)
                })()
            }
        }
	},
	NotBlank:function(array){
		 var len = array.length;
            for(var i =0; i < len; i++) { 
                var dom = $(array[i]),
                    val = dom.val();

                if(val == '') {
                	// 这里可以用layerjs todo
                	layer.open({
                		btn: ['确定'],
	        	    	content: dom.data('text')+'不能为空'
	        		});
                    return false;
                }

            }
            return true;
	},
	getQueryString:function(str){
		var reg = new RegExp("(^|&)"+ str +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null){
	    	return  unescape(r[2])
	    }else{
	    	return "";
	    }
	}
}
module.exports = login;
},{}],7:[function(require,module,exports){
var loginAll = require('./login_all');
var myAlert = require('./my_alert.js');
var coupon = {
	UI:{
		getBtn:'.c_oper_coupon',
		loginBtn: '.c_log_in a',
		logoutBtn: '.c_log_out a'
	},
	data:{
		getCouponUrl: $('#c_get_coupon_url').val(),
		// logoutUrl: $('#clogoutUrl').val(),
		viewType: $('#c_page_type').val(),
	},
	init:function(){
		// 包括 优惠券领取以及登录注册,领取后的细节，提示，重复领取的提示
		this.bindCusEvent();
		loginAll.init(this.data.viewType);
	},
	bindCusEvent:function(){
		var that = this; 
		$('body').on('click',this.UI.getBtn,function(){
			var jqThis = $(this);
			var value = jqThis.data('value');
			if(jqThis.hasClass('getting')) return;
			jqThis.addClass('getting'); 
			$.ajax({
				url: that.data.getCouponUrl,
				dataType: 'json',
				data: { 
					param: value,
					oper_no:$('#c_oper_no').val()
				}
			})
			.done(function(data) {
				if(data.code == 200){ 
					// 成功
					myAlert(that.data.viewType,'领取优惠券成功!可以去买买买啦~');
				}else if(data.code == 2002 || data.code == 2001){ // app 那边没有token的话就会返回2001的
					loginAll.login(that.data.viewType,'请先去登录一下哦~');
				}else{
					myAlert(that.data.viewType,data.result);
				}
			})
			.fail(function() {
				myAlert(that.data.viewType,'领取失败，请刷新后在试~');
			})
			.always(function() {
				jqThis.removeClass('getting');
			});
			
		})
	}

}

module.exports = coupon;
},{"./login_all":4,"./my_alert.js":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJvcGVyL3B1YmxpYy9zcmMvanMvcGMuanMiLCJvcGVyL3B1YmxpYy9zcmMvanMvdXRpbC9icm93c2VyLmpzIiwib3Blci9wdWJsaWMvc3JjL2pzL3V0aWwvbG9naW4uanMiLCJvcGVyL3B1YmxpYy9zcmMvanMvdXRpbC9sb2dpbl9hbGwuanMiLCJvcGVyL3B1YmxpYy9zcmMvanMvdXRpbC9teV9hbGVydC5qcyIsIm9wZXIvcHVibGljL3NyYy9qcy91dGlsL25ld19sb2dpbl93YXAuanMiLCJvcGVyL3B1YmxpYy9zcmMvanMvdXRpbC9vcGVyX3BjX2NvdXBvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY291cG9uID0gcmVxdWlyZSgnLi91dGlsL29wZXJfcGNfY291cG9uJyk7XHJcbnZhciBwYyA9IHtcclxuXHRpbml0OmZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHQkKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoYXQuYmluZEN1c0V2ZW50KCk7XHJcblx0XHRcdGlmKCQoJyNjX2NvdXBvbl9vcGVuJykudmFsKCkpe1xyXG5cdFx0XHRcdGNvdXBvbi5pbml0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSwgXHJcblx0YmluZEN1c0V2ZW50OmZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuY19pbWdfbGF6eScpLmxhenlsb2FkKHsgXHJcblx0XHRcdGV2ZW50IDogXCJ0dXJuUGFnZVwiLFxyXG5cdFx0XHRlZmZlY3QgOiBcImZhZGVJblwiXHJcblx0XHR9KTtcclxuXHRcdCQoJy5jX2hvbGRlcicpLmpQYWdlcyh7XHJcblx0XHRcdGNvbnRhaW5lcklEOiAnY19icmFuZF9pdGVtX2xpc3QnLFxyXG5cdFx0XHRwcmV2aW91cyA6IFwi4oaQXCIsXHJcblx0XHRcdG5leHQgOiBcIuKGklwiLFxyXG5cdFx0XHRwZXJQYWdlOjE2LCBcclxuXHRcdFx0bWlkUmFuZ2U6IDMsXHJcblx0XHRcdG1pbkhlaWdodDogZmFsc2UsXHJcblx0XHRcdGRpcmVjdGlvbjogXCJyYW5kb21cIixcclxuXHRcdFx0YW5pbWF0aW9uICAgOiBcImZhZGVJblVwXCIsXHJcblx0XHRcdGNhbGxiYWNrICAgIDogZnVuY3Rpb24oIHBhZ2VzLCBpdGVtcyApe1xyXG5cdFx0XHQvKiBsYXp5IGxvYWQgY3VycmVudCBpbWFnZXMgKi9cclxuXHRcdFx0XHRpdGVtcy5zaG93aW5nLmZpbmQoXCJpbWdcIikudHJpZ2dlcihcInR1cm5QYWdlXCIpO1xyXG5cdFx0XHRcdC8qIGxhenkgbG9hZCBuZXh0IHBhZ2UgaW1hZ2VzICovXHJcblx0XHRcdFx0aXRlbXMub25jb21pbmcuZmluZChcImltZ1wiKS50cmlnZ2VyKFwidHVyblBhZ2VcIik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsJy5jX2J1eV9idG4nLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJCh0aGlzKS5wYXJlbnRzKCcuY19icmFuZF9pdGVtJykuZmluZCgnLmNfaXRlbV9saW5rJykuYXR0cignaHJlZicpO1xyXG5cdFx0fSk7XHJcblx0XHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCQodGhpcykuc2Nyb2xsVG9wKCkgPiA0MDApe1xyXG5cdFx0XHRcdCQoJy5jX2dvX3RvcCcpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0JCgnLmNfZ29fdG9wJykuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5wYy5pbml0KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBjOyIsInZhciBicm93c2VyID0ge1xyXG5cdHZlcnNpb25zOmZ1bmN0aW9uKCl7XHJcblx0ICAgIHZhciB1ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgYXBwID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XHJcblx0ICAgIHJldHVybiB7ICAgICAgICAgLy/np7vliqjnu4jnq6/mtY/op4jlmajniYjmnKzkv6Hmga9cclxuXHQgICAgICAgIHRyaWRlbnQ6IHUuaW5kZXhPZignVHJpZGVudCcpID4gLTEsIC8vSUXlhoXmoLhcclxuXHQgICAgICAgIHByZXN0bzogdS5pbmRleE9mKCdQcmVzdG8nKSA+IC0xLCAvL29wZXJh5YaF5qC4XHJcblx0ICAgICAgICB3ZWJLaXQ6IHUuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xLCAvL+iLueaenOOAgeiwt+atjOWGheaguFxyXG5cdCAgICAgICAgZ2Vja286IHUuaW5kZXhPZignR2Vja28nKSA+IC0xICYmIHUuaW5kZXhPZignS0hUTUwnKSA9PSAtMSwgLy/ngavni5DlhoXmoLhcclxuXHQgICAgICAgIG1vYmlsZTogISF1Lm1hdGNoKC9BcHBsZVdlYktpdC4qTW9iaWxlLiovKSwgLy/mmK/lkKbkuLrnp7vliqjnu4jnq69cclxuXHQgICAgICAgIGlvczogISF1Lm1hdGNoKC9cXChpW147XSs7KCBVOyk/IENQVS4rTWFjIE9TIFgvKSwgLy9pb3Pnu4jnq69cclxuXHQgICAgICAgIGFuZHJvaWQ6IHUuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgfHwgdS5pbmRleE9mKCdMaW51eCcpID4gLTEsIC8vYW5kcm9pZOe7iOerr+aIlnVj5rWP6KeI5ZmoXHJcblx0ICAgICAgICBpUGhvbmU6IHUuaW5kZXhPZignaVBob25lJykgPiAtMSAsIC8v5piv5ZCm5Li6aVBob25l5oiW6ICFUVFIROa1j+iniOWZqFxyXG5cdCAgICAgICAgaVBhZDogdS5pbmRleE9mKCdpUGFkJykgPiAtMSwgLy/mmK/lkKZpUGFkXHJcblx0ICAgICAgICB3ZWJBcHA6IHUuaW5kZXhPZignU2FmYXJpJykgPT0gLTEgLy/mmK/lkKZ3ZWLlupTor6XnqIvluo/vvIzmsqHmnInlpLTpg6jkuI7lupXpg6hcclxuXHQgICAgfTtcclxuXHQgfSgpXHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyOyIsInZhciBsb2dpbiA9IHtcclxuXHRkYXRhOiB7XHJcblx0XHRuZXdVc2VyVXJsOiAkKCcjbmV3VXNlclVybCcpLnZhbCgpLFxyXG5cdFx0b2xkVXNlclVybDogJCgnI29sZFVzZXJVcmwnKS52YWwoKSxcclxuXHRcdHNtc1VybDogJCgnI3Ntc1VybCcpLnZhbCgpLFxyXG5cdFx0Y2FwdGNoYVVybDokKCcjY2FwdGNoYVVybCcpLnZhbCgpXHJcblx0fSxcclxuXHRoZWlnaHQ6MCxcclxuXHR3aWR0aDowLFxyXG5cdHRhYldyYXA6bnVsbCxcclxuXHRzdWNjZXNzQ2I6bnVsbCxcclxuXHRtc2djb2RlOm51bGwsXHJcblx0b3B0Om51bGwsXHJcblx0aW5pdDpmdW5jdGlvbihvcHQsY2Ipe1xyXG5cdFx0XHJcblx0XHQvLyBpbml0IOeahOaXtuWAmeWIhuS4pOS4quatpemqpOOAgiAx5Liq6K6h566X5pGG5pS+5L2N572uIDLlr7l0YWLliJ3lp4vljJYgMyDlsZXnpLrlh7rmnaVcclxuXHRcdGlmKHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpe1xyXG5cdFx0XHR0aGlzLnN1Y2Nlc3NDYiA9IG9wdDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLm9wdCA9IG9wdDtcclxuXHRcdFx0dGhpcy5zdWNjZXNzQ2IgPSBjYjtcclxuXHRcdH1cclxuICAgICAgICB0aGlzLmluaXRTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmluaXRQbHVnaW4oKTtcclxuICAgICAgICB0aGlzLmN1c0V2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5tc2djb2RlLmluaXQoJCgnI2NfZ2V0X3Ntc19jb2RlJyksIHRoaXMuZGF0YS5zbXNVcmwpOy8vdG9kb+aJi+acuumqjOivgeegge+8gVxyXG5cdFx0dGhpcy50YWJXcmFwID0gJCgnI2NfdGFiX3dyYXAnKTtcclxuXHRcdHRoaXMud2lkdGggPSB0aGlzLnRhYldyYXAub3V0ZXJXaWR0aCAmJiB0aGlzLnRhYldyYXAub3V0ZXJXaWR0aCgpO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLnRhYldyYXAub3V0ZXJXaWR0aCAmJiB0aGlzLnRhYldyYXAub3V0ZXJXaWR0aCgpO1xyXG5cdFx0b3B0LnR5cGUgJiYgJCgnI3RhYl8nK29wdC50eXBlKydfdGl0bGUnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0sXHJcblx0Ly/osIPnlKjor6Xmlrnms5XvvIzmiornmbvlvZXnqpflj6PmmL7npLrlh7rmnaVcclxuXHRzaG93TG9naW46IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHRcdHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgIFx0dGhpcy50YWJXcmFwLmNzcyh7XHJcblx0XHRcdGxlZnQ6KHdpbldpZHRoLXRoaXMuaGVpZ2h0KS8yLFxyXG5cdFx0XHR0b3A6c2Nyb2xsVG9wICsgNTBcclxuXHRcdH0pO1xyXG4gICAgXHQkKCcjY19kaWFfbWFzaycpLnNob3coKTtcclxuXHRcdCQoJyNjX3RhYl93cmFwJykuc2hvdygpO1xyXG5cdFx0JCgnI2ltZ19jb2RlJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9LFxyXG5cdGN1c0V2ZW50OmZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywnLmRpYV9jbG9zZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnI2NfZGlhX21hc2snKS5oaWRlKCk7XHJcblx0XHRcdCQoJyNjX3RhYl93cmFwJykuaGlkZSgpO1xyXG5cdFx0fSkub24oJ2NsaWNrJywnLmlwdF9sYWJlbCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGpxVGhpcyA9ICQodGhpcykuc2libGluZ3MoJy5pcHQnKTtcclxuXHRcdFx0anFUaGlzLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG5cdFx0XHRqcVRoaXMuc2libGluZ3MoJ2xhYmVsJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5oaWRlKCk7XHJcblx0XHRcdGpxVGhpcy5mb2N1cygpO1xyXG5cdFx0fSkub24oJ2ZvY3VzJywnaW5wdXQuaXB0JyxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIganFUaGlzID0gJCh0aGlzKTtcclxuXHRcdFx0anFUaGlzLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG5cdFx0XHRqcVRoaXMuc2libGluZ3MoJ2xhYmVsJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5oaWRlKCk7XHRcclxuXHRcdH0pLm9uKCdibHVyJywnaW5wdXQuaXB0JyxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIganFUaGlzID0gJCh0aGlzKTtcclxuXHRcdFx0aWYoIGpxVGhpcy52YWwoKSA9PSAnJyl7XHJcblx0XHRcdFx0anFUaGlzLmFkZENsYXNzKCdlcnJvcicpO1xyXG5cdFx0XHRcdGpxVGhpcy5zaWJsaW5ncygnbGFiZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnLmRyZWQuJytqcVRoaXMuYXR0cignaWQnKSsnX2xhYmVsJykuc2hvdygpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdFx0anFUaGlzLnNpYmxpbmdzKCdsYWJlbCcpLmhpZGUoKTtcclxuXHRcdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5oaWRlKCk7XHJcblx0XHRcdH0gXHJcblx0XHR9KS5vbignY2xpY2snLCcjbG9nX2J0bicsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtcyA9IHt9O1xyXG5cdCAgICAgICAgcGFyYW1zLnBob25lID0gJCgnI2NfdXNlcl9uYW1lJykudmFsKCk7XHJcblx0ICAgICAgICBwYXJhbXMucGFzc3dvcmQgPSAkKCcjY191c2VyX3BzdycpLnZhbCgpO1xyXG5cdCAgICAgICAgcGFyYW1zLnJlbWVtYmVyID0gJCgnI3JlbWVtYmVyJykudmFsKCk7XHJcblx0ICAgICAgICBpZiAocGFyYW1zLnBob25lID09ICcnKSB7IGFsZXJ0KCfor7floavlhpnnlKjmiLflkI0nKTsgcmV0dXJuIGZhbHNlOyB9O1xyXG5cdCAgICAgICAgaWYgKHBhcmFtcy5wYXNzd29yZCA9PSAnJykgeyBhbGVydCgn6K+35aGr5YaZ5a+G56CBJyk7IHJldHVybiBmYWxzZTsgfTtcclxuXHQgICAgICAgICQuYWpheCh7ICBcclxuXHQgICAgICAgICAgICB0eXBlOiBcInBvc3RcIiwgIFxyXG5cdCAgICAgICAgICAgIHVybDogdGhhdC5kYXRhLm9sZFVzZXJVcmwsLy90b2RvIOato+W4uOeZu+W9leeahHVybO+8ge+8gVxyXG5cdCAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIiwgIFxyXG5cdCAgICAgICAgICAgIGRhdGE6IHtcclxuXHQgICAgICAgICAgICAgICAgcGhvbmU6IHBhcmFtcy5waG9uZSxcclxuXHQgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhcmFtcy5wYXNzd29yZFxyXG5cdCAgICAgICAgICAgICAgICAvLyByZW1lbWJlcjogcGFyYW1zLnJlbWVtYmVyLy90b2RvXHJcblx0ICAgICAgICAgICAgfSwgIFxyXG5cdCAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJldCl7XHJcblx0ICAgICAgICAgICAgICAgIGlmKHJldC5jb2RlID09IDIwMCl7XHJcblx0ICAgICAgICAgICAgICAgIFx0aWYodGhhdC5zdWNjZXNzQ2Ipe1xyXG5cdCAgICAgICAgICAgICAgICBcdFx0Ly8gYWxlcnQoJ+eZu+W9leaIkOWKnyzlj6/ku6XkubDkubDkubDllaYoIO+8ns+J77ycKSEhIScpOy8vdG9kbyDnmbvlvZXmiJDlip/mj5DnpLpcclxuXHQgICAgICAgICAgICAgICAgXHRcdCQoJy5kaWFfY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdCAgICAgICAgICAgICAgICBcdFx0dGhhdC5zdWNjZXNzQ2IodGhhdC5vcHQpO1xyXG5cdCAgICAgICAgICAgICAgICBcdH1lbHNle1xyXG5cdCAgICAgICAgICAgICAgICBcdFx0JCgnI2NfZGlhX21hc2snKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI2NfdGFiX3dyYXAnKS5oaWRlKCk7XHJcblx0ICAgICAgICAgICAgICAgIFx0fVxyXG5cdCAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHQgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJldC5yZXN1bHQpO1xyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgfSxcclxuXHQgICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uKHJldCl7ICBcclxuXHQgICAgICAgICAgICAgICAgYWxlcnQoJ+acquefpemUmeivr++8jOivt+mHjeaWsOWwneivlScpO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH0pO1xyXG5cdFx0fSkub24oJ2NsaWNrJywnI2ltZ19jb2RlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3NyYycsdGhhdC5kYXRhLmNhcHRjaGFVcmwrJz8nKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTAwMDAwKSk7Ly90b2Rv6aqM6K+B56CBXHJcblx0XHQvLyB9KS5vbignY2xpY2snLCcjdGFiX2xvZ2luX3RpdGxlJyxmdW5jdGlvbigpe1xyXG5cdFx0Ly8gXHQkKCcubG9nX2Zvcm1fd3JhcCAudmVyaWZ5X2ltZycpLmF0dHIoJ3NyYycsJ2kucGhwP2M9bG9naW4mYT1jYXB0Y2hhJyk7Ly90b2RvXHJcblx0XHQvLyB9KS5vbignY2xpY2snLCcjdGFiX3JlZ190aXRsZScsZnVuY3Rpb24oKXtcclxuXHRcdC8vIFx0JCgnLnJlZ19mb3JtX3dyYXAgLnZlcmlmeV9pbWcnKS5hdHRyKCdzcmMnLCdpLnBocD9jPWxvZ2luJmE9Y2FwdGNoYScpOy8vdG9kb1xyXG5cdFx0fSkub24oJ2NsaWNrJywnI3JlZ19idG4nLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwaG9uZSA9ICQoJyNjX3JlZ19uYW1lJyksXHJcbiAgICAgICAgICAgICAgICBzbXNfdmVyaWZ5ID0gJCgnI2NfcmVnX3Ntc19jb2RlJyksXHJcbiAgICAgICAgICAgICAgICBpbWdfdmVyaWZ5ID0gJCgnI2NfcmVnX2ltZ19jb2RlJyksXHJcbiAgICAgICAgICAgICAgICBwd2QgPSAkKCcjY19yZWdfcHN3JyksXHJcbiAgICAgICAgICAgICAgICByZXB3ZCA9JCgnI2NfcmVnX2NvbmZpcm1fcHN3JyksXHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBzbXNfdmVyaWZ5OiBzbXNfdmVyaWZ5LnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGltZ192ZXJpZnk6IGltZ192ZXJpZnkudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHB3ZC52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICByZXBhc3N3b3JkOiByZXB3ZC52YWwoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoYXQuTm90QmxhbmsoWycjY19yZWdfbmFtZScsICcjY19yZWdfaW1nX3ZlcmlmeScsICcjY19yZWdfc21zX2NvZGUnLCAnI2NfcmVnX2ltZ19jb2RlJywgJyNjX3JlZ19wc3cnLCAnI2NfcmVnX2NvbmZpcm1fcHN3J10pKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwd2QudmFsKCkgIT09IHJlcHdkLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+S4pOasoeWvhueggeS4jeebuOWQjCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQuYWpheCh7ICBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIiwgIFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhhdC5kYXRhLm5ld1VzZXJVcmwsICAvL3RvZG/ms6jlhoxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRpZih0aGF0LnN1Y2Nlc3NDYil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHQvLyBhbGVydCgn55m75b2V5oiQ5YqfLOWPr+S7peS5sOS5sOS5sOWVpigg77yez4nvvJwpISEhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHQkKCcuZGlhX2Nsb3NlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdHRoYXQuc3VjY2Vzc0NiLmRhdGEgPSByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHR0aGF0LnN1Y2Nlc3NDYih0aGF0Lm9wdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0fWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHQkKCcjY19kaWFfbWFzaycpLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdCQoJyNjX3RhYl93cmFwJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmV0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24ocmV0KXsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+acquefpemUmeivr++8jOivt+mHjeaWsOWwneivlScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9KVxyXG5cdH0sXHJcblx0Tm90Qmxhbms6ZnVuY3Rpb24oYXJyYXkpe1xyXG5cdFx0IHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IGxlbjsgaSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgdmFyIGRvbSA9ICQoYXJyYXlbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGRvbS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkb20uZGF0YSgndGV4dCcpKyfkuI3og73kuLrnqbonKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblx0aW5pdFN0YXR1czpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhVGFiQm9keXMgPSAkKCcjdGFic19ib2R5ID4gZGl2Jyk7XHJcbiAgICAgICAgJCgnI3RhYnMgPiBhJykuZWFjaChmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcygnb24nKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICBhVGFiQm9keXMuaGlkZSgpLmVxKGluZGV4KS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhVGFiQm9keXMuZXEoaW5kZXgpLmZpbmQoJy52ZXJpZnlfaW1nJykuYXR0cignc3JjJywnaS5waHA/Yz1sb2dpbiZhPWNhcHRjaGEnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnaW5wdXQuaXB0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIFx0dmFyIGpxVGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgXHRpZihqcVRoaXMudmFsKCkgIT0gJycpe1xyXG4gICAgICAgIFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdFx0anFUaGlzLnNpYmxpbmdzKCdsYWJlbCcpLmhpZGUoKTtcclxuXHRcdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgXHR9ZWxzZXtcclxuICAgICAgICBcdFx0anFUaGlzLmFkZENsYXNzKCdlcnJvcicpO1xyXG5cdFx0XHRcdGpxVGhpcy5zaWJsaW5ncygnbGFiZWwnKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnLmRyZWQuJytqcVRoaXMuYXR0cignaWQnKSsnX2xhYmVsJykuc2hvdygpO1xyXG4gICAgICAgIFx0fSBcclxuICAgICAgICB9KTtcclxuXHR9LFxyXG5cdGluaXRQbHVnaW46ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubXNnY29kZSA9IHtcclxuICAgICAgICAgICAgZWw6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGlwczogdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24obGluaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZWwuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBcdGlmKCF0aGF0LmVsLmhhc0NsYXNzKCdidG4tZ3JheScpKXtcclxuXHQgICAgICAgICAgICAgICAgICAgXHR2YXIgdmFsID0gJCgnI2NfcmVnX25hbWUnKS52YWwoKTtcclxuXHQgICAgICAgICAgICAgICAgICAgXHR2YXIgaW1nQ29kZVZhbCA9ICQoJyNjX3JlZ19pbWdfY29kZScpLnZhbCgpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWwpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgn5omL5py65Y+356CB5LiN6IO95Li656m6Jyk7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCFpbWdDb2RlVmFsKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICBcdGFsZXJ0KCfpqozor4HnoIHkuI3og73kuLrnqbrvvIEnKTtcclxuXHQgICAgICAgICAgICAgICAgICAgIFx0cmV0dXJuO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGxpbmssXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsICBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB2YWwsXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ192ZXJpZnk6IGltZ0NvZGVWYWxcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu2XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5jb2RlID09IDIwMCkgeyBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5yZXN1bHQpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuYWRkQ2xhc3MoJ2J0bi1ncmF5JykuY3NzKCdjdXJzb3InLCAnbm90LWFsbG93ZWQnKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb3VudERvd24oZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsLnZhbCgn6I635Y+W6aqM6K+B56CBJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5yZW1vdmVDbGFzcygnYnRuLWdyYXknKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNlZDNmM2YnKVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLnJlc3VsdCk7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKGVsLGxpbmspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwgPSBlbDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMudGlwcyA9IHRpcHNcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZChsaW5rKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY291bnREb3duOiBmdW5jdGlvbihjYikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gMTIwO1xyXG5cclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBmY291bnQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY291bnQgPCAwKSByZXR1cm4gY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb3VudCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBcdGNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgXHR0aGF0LmVsLnRleHQoJ+mHjeaWsOiOt+WPlicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFx0dGhhdC5lbC50ZXh0KCfph43mlrDojrflj5YoJysgY291bnQtLSArICcpJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWwuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNDQ0MnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZjb3VudCwgMTAwMClcclxuICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBsb2dpbjsiLCIvL2NvbW1vbiBsb2dpbiBpbiBwYyBhbmQgd2FwIGFuZCBhcHBcclxudmFyXHRsb2dpblBDID0gcmVxdWlyZSgnLi9sb2dpbi5qcycpO1xyXG52YXIgbG9naW5XYXAgPSByZXF1aXJlKCcuL25ld19sb2dpbl93YXAuanMnKTtcclxudmFyIG15QWxlcnQgPSByZXF1aXJlKCcuL215X2FsZXJ0LmpzJyk7XHJcbnZhciBicm93c2VyID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XHJcblxyXG52YXIgbG9naW5BbGwgPSB7XHJcblx0aW5pdDogZnVuY3Rpb24odmlld1R5cGUpe1xyXG5cdFx0aWYodmlld1R5cGUgPT0gMCl7XHJcblx0XHRcdC8vcGMgcGx1Z2luXHJcblx0XHRcdGxvZ2luUEMuaW5pdChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdG15QWxlcnQodmlld1R5cGUsICfnmbvlvZXmiJDlip8hJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcdFxyXG5cdFx0fWVsc2UgaWYodmlld1R5cGUgPT0gMSl7XHJcblx0XHRcdC8vd2FwXHJcblx0XHRcdGxvZ2luV2FwLmluaXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRteUFsZXJ0KHZpZXdUeXBlLCAn55m75b2V5oiQ5YqfJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGxvZ2luOiBmdW5jdGlvbih2aWV3VHlwZSwgY29udGVudHMpe1xyXG5cdFx0aWYodmlld1R5cGUgPT0gMCkge1xyXG5cdFx0IFx0Ly9wY1xyXG5cdFx0IFx0aWYoIWNvbnRlbnRzKXtcclxuXHRcdFx0IFx0bG9naW5QQy5zaG93TG9naW4oKTtcclxuXHRcdCBcdH1lbHNle1xyXG5cdFx0IFx0XHRteUFsZXJ0KDAsIGNvbnRlbnRzLCBmdW5jdGlvbigpe1xyXG5cdFx0IFx0XHRcdGxvZ2luUEMuc2hvd0xvZ2luKCk7XHJcblx0XHQgXHRcdH0pXHJcblx0XHQgXHR9XHJcblx0XHR9ZWxzZSBpZih2aWV3VHlwZSA9PSAxKXtcclxuXHRcdCBcdC8vd2FwXHJcblx0XHQgXHRpZighY29udGVudHMpe1xyXG5cdFx0XHQgXHRsb2dpbldhcC5zaG93TG9naW4oKTtcclxuXHRcdCBcdH1lbHNle1xyXG5cdFx0IFx0XHRteUFsZXJ0KDEsIGNvbnRlbnRzLCBmdW5jdGlvbigpe1xyXG5cdFx0IFx0XHRcdGxvZ2luV2FwLnNob3dMb2dpbigpO1xyXG5cdFx0IFx0XHR9KVxyXG5cdFx0IFx0fVxyXG5cdFx0fWVsc2Uge1xyXG5cdFx0IFx0Ly9hcHBcclxuXHRcdFx0aWYoYnJvd3Nlci52ZXJzaW9ucy5tb2JpbGUpeyBcclxuXHRcdCAgICBcdGlmKGJyb3dzZXIudmVyc2lvbnMuaW9zKXtcclxuXHRcdCAgICBcdFx0aWYoY29udGVudHMpe1xyXG5cdFx0XHQgICAgXHRcdG15QWxlcnQoMSwgY29udGVudHMsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0ICAgIFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdjeWM6Ly9DWUNKczJJT1MuZ29Mb2dpbic7XHJcblx0XHRcdCAgICBcdFx0fSk7XHJcblx0XHQgICAgXHRcdH1lbHNle1xyXG5cdFx0ICAgIFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2N5YzovL0NZQ0pzMklPUy5nb0xvZ2luJztcclxuXHRcdCAgICBcdFx0fVxyXG5cdFx0ICAgIFx0fWVsc2UgaWYoYnJvd3Nlci52ZXJzaW9ucy5hbmRyb2lkKXtcclxuXHRcdCAgICBcdFx0aWYod2luZG93LmN5YyAmJiB3aW5kb3cuY3ljLm9wZW5EaWFsb2cpe1xyXG5cdFx0ICAgIFx0XHRcdHdpbmRvdy5jeWMub3BlbkRpYWxvZygyMDAyLCBjb250ZW50c3x8J+ehruWumui3s+i9rOWIsOeZu+W9lemhtemdou+8nycpO1xyXG5cdFx0ICAgIFx0XHR9XHJcblx0XHQgICAgXHR9XHJcblx0XHQgICAgfVx0XHRcdCBcdFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bG9nb3V0OiBmdW5jdGlvbigpe1xyXG5cdFx0Ly9mb3IgbG9nb3V0XHJcblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0XHR2YXIgY2tBcnIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoL1xcO1xccyovKTtcclxuXHRcdHZhciBjb29raWVzID0ge30sIHRtcDtcclxuXHRcdGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSAtIDEwMDAwMCk7XHJcblxyXG5cdFx0Zm9yKHZhciBpPTAsIGxlbj1ja0Fyci5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcblx0XHRcdHRtcCA9IGNrQXJyW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRcdGNvb2tpZXNbdG1wWzBdXSA9IHRtcFsxXTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IoayBpbiBjb29raWVzKXtcclxuXHRcdFx0aWYoayA9PSAnY3ljX2lkJyB8fCBrID09ICdQSFBTRVNTSUQnKXtcclxuXHRcdFx0XHRkb2N1bWVudC5jb29raWUgPSBrICsgJz0nICsgY29va2llc1trXSArICc7ZXhwaXJlcz0nICsgZGF0ZS50b0dNVFN0cmluZygpICsgJztkb21haW49LmN5Y2FuZy5jb20nO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAndXNlcj9hPWxvZ2luT3V0JyxcclxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDIwMCl7XHJcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdG15QWxlcnQoZGF0YS5yZXN1bHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0bXlBbGVydCgn572R57uc5byC5bi477yM6K+35Yi35paw5ZCO5YaN6K+V77yBficpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luQWxsOyIsIi8qKlxyXG4qIGFjdCBhbGVydCDmqKHlnZdcclxuKiBwY+eUqOiHquW4pueahOW8ueahhu+8iHRvZG/vvIlcclxuKiB3YXDlkoxhcHDnlKhsYXllcuaPkuS7tlxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZpZXdUeXBlLCBtc2csIGNiKXtcclxuXHR2YXIgY2IgPSB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyA/IGNiIDogbnVsbDtcclxuXHRpZih2aWV3VHlwZSA9PSAwKXtcclxuXHRcdGFsZXJ0KG1zZyk7XHJcblx0XHRjYiYmY2IoKTtcclxuXHR9ZWxzZXtcclxuXHRcdGxheWVyLm9wZW4oe1xyXG5cdFx0XHRidG46IFsn56Gu5a6aJ10sXHJcblx0XHRcdGNvbnRlbnQ6IG1zZyxcclxuXHRcdFx0ZW5kOiBjYlxyXG5cdFx0fSk7XHJcblx0fVxyXG59IiwidmFyIGxvZ2luID0ge1xyXG5cdGRhdGE6e1xyXG5cdFx0b2xkVXJsOiQoJyNvbGRVc2VyVXJsJykudmFsKCksXHJcblx0XHRuZXdVcmw6JCgnI25ld1VzZXJVcmwnKS52YWwoKSxcclxuXHRcdGdldFNtc1VybDokKCcjc21zVXJsJykudmFsKClcclxuXHR9LFxyXG5cdHN1Y2Nlc3NDYjogbnVsbCxcclxuXHRpbml0OmZ1bmN0aW9uKGNiKXtcclxuXHRcdHRoaXMuYmluZEN1c0V2ZW50KCk7XHJcblx0XHR0aGlzLmluaXRQbHVnaW5zKCk7XHJcblx0XHR0aGlzLm1zZ2NvZGUuaW5pdCgkKCcjY19nZXRfc21zX2NvZGUnKSx0aGlzLmRhdGEuZ2V0U21zVXJsKTtcclxuXHRcdGlmKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nKSB0aGlzLnN1Y2Nlc3NDYiA9IGNiO1xyXG5cdH0sXHJcblx0c2hvd0xvZ2luOiBmdW5jdGlvbigpe1xyXG4gICAgXHQkKCcuY19tYXNrJykuc2hvdygpO1xyXG4gICAgXHQkKCcuY19mYWRlT3V0X2xheWVyJykuY3NzKHtcclxuICAgIFx0XHQnZGlzcGxheSc6J2Jsb2NrJ1xyXG4gICAgXHR9KTtcclxuICAgIFx0JCgnLmNfZmFkZU91dF9sYXllcicpLmFkZENsYXNzKCdmbGlwLWJvdHRvbScpO1xyXG4gICAgXHQkKCcjaW1nX2NvZGUnKS50cmlnZ2VyKCd0b3VjaGVuZCcpO1xyXG5cdH0sXHJcblx0YmluZEN1c0V2ZW50OmZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHQkKCdib2R5Jykub24oJ3RvdWNoZW5kJywnI2Nfb2xkX2dldCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly8g6ICB55So5oi355m75b2VXHJcblx0XHRcdHZhciBwYXJhbXMgPSB7fTtcclxuXHQgICAgICAgIHBhcmFtcy5waG9uZSA9ICQoJyNjX29sZF91c2VyX3Bob25lJykudmFsKCk7XHJcblx0ICAgICAgICBwYXJhbXMucHdkID0gJCgnI2Nfb2xkX3VzZXJfcHdkJykudmFsKCk7XHJcblx0ICAgICAgICBpZiAocGFyYW1zLnBob25lID09ICcnKSB7XHJcblx0ICAgICAgICBcdC8vIHRvZG8gbGF5ZXJqc1xyXG5cdCAgICAgICAgXHRsYXllci5vcGVuKHtcclxuXHRcdFx0XHRcdGJ0bjogWyfnoa7lrponXSxcclxuXHQgICAgICAgIFx0ICAgIGNvbnRlbnQ6ICfor7floavlhpnmiYvmnLrlj7fnoIEnXHJcblx0ICAgICAgICBcdH0pO1xyXG5cdCAgICAgICAgXHRyZXR1cm4gZmFsc2U7IFxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICAgIGlmIChwYXJhbXMucHdkID09ICcnKSB7IFxyXG5cdCAgICAgICAgXHQvLyB0b2RvIGxheWVyanNcclxuXHQgICAgICAgIFx0bGF5ZXIub3Blbih7XHJcblx0XHRcdFx0XHRidG46IFsn56Gu5a6aJ10sXHJcblx0ICAgICAgICBcdCAgICBjb250ZW50OiAn6K+35aGr5a+G56CBJ1xyXG5cdCAgICAgICAgXHR9KTtcclxuXHQgICAgICAgIFx0cmV0dXJuIGZhbHNlOyBcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgICAkLmFqYXgoeyAgXHJcblx0ICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsICBcclxuXHQgICAgICAgICAgICB1cmw6IHRoYXQuZGF0YS5vbGRVcmwsICAgLy8gdG9kbyBuZWVkIGNoYW5nZVxyXG5cdCAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIiwgIFxyXG5cdCAgICAgICAgICAgIGRhdGE6IHtcclxuXHQgICAgICAgICAgICAgICAgcGhvbmU6IHBhcmFtcy5waG9uZSxcclxuXHQgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhcmFtcy5wd2RcclxuXHQgICAgICAgICAgICB9LCAgXHJcblx0ICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgICAgXHRcdGlmKHJldC5jb2RlPT0yMDApe1xyXG4gICAgICAgICAgICAgICBcdFx0XHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICBcdFx0XHQkKCcuY19mYWRlT3V0X2xheWVyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgXHRcdFx0XHQnZGlzcGxheSc6J25vbmUnXHRcclxuICAgICAgICAgICAgICAgXHRcdFx0fSlcclxuICAgICAgICAgICAgICAgXHRcdFx0Ly8gd2luZG93LmN5Yy5pc0xvZ2luID0gMTtcclxuICAgICAgICAgICAgICAgXHRcdFx0Ly8gbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgIFx0XHRcdCAgICAvLyBjb250ZW50OiAn55m76ZmG5oiQ5Yqf77yBJyxcclxuICAgICAgICAgICAgICAgXHRcdFx0ICAgIC8vIGJ0bjpbJ+WlveeahCddLFxyXG4gICAgICAgICAgICAgICBcdFx0XHQgICAgLy8geWVzOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgIFx0XHRcdCAgICAvLyBcdC8vIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgXHRcdFx0ICAgIC8vIH1cclxuICAgICAgICAgICAgICAgXHRcdFx0Ly8gfSk7XHJcbiAgICAgICAgICAgICAgIFx0XHRcdGlmKHR5cGVvZiB0aGF0LnN1Y2Nlc3NDYiA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgICAgXHRcdFx0XHR0aGF0LnN1Y2Nlc3NDYigpO1xyXG4gICAgICAgICAgICAgICBcdFx0XHR9XHJcbiAgICAgICAgICAgICAgIFx0XHR9ZWxzZXtcclxuICAgICAgICAgICAgICAgXHRcdFx0bGF5ZXIub3Blbih7XHJcblx0XHRcdFx0XHRcdFx0YnRuOiBbJ+ehruWumiddLFxyXG4gICAgICAgICAgICAgICBcdFx0XHQgICAgY29udGVudDogcmV0LnJlc3VsdFxyXG4gICAgICAgICAgICAgICBcdFx0XHR9KTtcclxuICAgICAgICAgICAgICAgXHRcdH1cclxuXHQgICAgICAgICAgICB9LFxyXG5cdCAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24ocmV0KXsgXHJcblx0ICAgICAgICAgICAgLy8gdG9kbyBsYXllcmpzICAgXHJcbiAgICAgICAgICAgICAgIFx0XHRsYXllci5vcGVuKHtcclxuXHRcdFx0XHRcdFx0YnRuOiBbJ+ehruWumiddLFxyXG5cdFx0ICAgICAgICBcdCAgICBjb250ZW50OiAn5pyq55+l6ZSZ6K+v77yM6K+36YeN5paw5bCd6K+VfidcclxuXHRcdCAgICAgICAgXHR9KTtcclxuXHRcdCAgICAgICAgXHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG5cdFx0ICAgICAgICBcdCQoJy5jX2ZhZGVPdXRfbGF5ZXInKS5jc3Moe1xyXG5cdFx0ICAgICAgICBcdFx0J2Rpc3BsYXknOidub25lJ1x0XHJcblx0XHQgICAgICAgIFx0fSlcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9KTtcclxuXHRcdH0pLm9uKCd0b3VjaGVuZCcsJyNjX25ld19nZXQnLGZ1bmN0aW9uKCl7Ly/ljp/mnaXmmK90b3VjaGVuZFxyXG5cdFx0XHQvL+aWsOeUqOaIt+azqOWGjFxyXG5cdFx0XHR2YXIgcGhvbmUgPSAkKCcjY19uZXdfdXNlcl9waG9uZScpLFxyXG4gICAgICAgICAgICAgICAgc21zX3ZlcmlmeSA9ICQoJyNjX3JlZ19zbXNfY29kZScpLFxyXG4gICAgICAgICAgICAgICAgcHdkID0gJCgnI2NfdXNlcl9wc3cnKSxcclxuICAgICAgICAgICAgICAgIHNoYXJlX2NvZGUgPSB0aGF0LmdldFF1ZXJ5U3RyaW5nKCdzaGFyZV9jb2RlJyksXHJcbiAgICAgICAgICAgICAgICBpbWdfdmVyaWZ5ID0gJCgnI2NfcmVnX2ltZ19jb2RlJyk7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBzbXNfdmVyaWZ5OiBzbXNfdmVyaWZ5LnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwd2QudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcmVfY29kZTpzaGFyZV9jb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltZ192ZXJpZnk6IGltZ192ZXJpZnkudmFsKClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmKHRoYXQuTm90QmxhbmsoWycjY19uZXdfdXNlcl9waG9uZScsICcjY191c2VyX3BzdycsICcjY19yZWdfaW1nX2NvZGUnLCAnI2NfcmVnX3Ntc19jb2RlJyxdKSkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGF0LmRhdGEubmV3VXJsLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSwgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgICAgIFx0XHRpZihyZXQuY29kZT09MjAwKXtcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdCQoJy5jX2ZhZGVPdXRfbGF5ZXInKS5jc3Moe1xyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdFx0J2Rpc3BsYXknOidub25lJ1x0XHJcblx0ICAgICAgICAgICAgICAgXHRcdFx0fSlcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQvLyB3aW5kb3cuY3ljLmlzTG9naW4gPSAxO1xyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdGxheWVyLm9wZW4oe1xyXG5cdFx0XHRcdFx0XHRcdFx0YnRuOiBbJ+ehruWumiddLFxyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdCAgICBjb250ZW50OiAn5rOo5YaM5oiQ5Yqf77yBJyxcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQgICAgZW5kOiBmdW5jdGlvbigpe1xyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdCAgICBcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQgICAgfVxyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdCAgICAvLyBidG46Wyflpb3nmoQnXSxcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQgICAgLy8geWVzOmZ1bmN0aW9uKCl7XHJcblx0ICAgICAgICAgICAgICAgXHRcdFx0ICAgIC8vIFx0Ly8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdCAgICAvLyB9XHJcblxyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdH0pO1xyXG5cdCAgICAgICAgICAgICAgIFx0XHR9ZWxzZXtcclxuXHQgICAgICAgICAgICAgICBcdFx0XHRsYXllci5vcGVuKHtcclxuXHRcdFx0XHRcdFx0XHRcdGJ0bjogWyfnoa7lrponXSxcclxuXHQgICAgICAgICAgICAgICBcdFx0XHQgICAgY29udGVudDogcmV0LnJlc3VsdFxyXG5cdCAgICAgICAgICAgICAgIFx0XHRcdH0pO1xyXG5cdCAgICAgICAgICAgICAgIFx0XHR9XHJcbiAgICAgICAgICAgICAgICBcdH0sXHJcbiAgICAgICAgICAgICAgICBcdGVycm9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBcdFx0bGF5ZXIub3Blbih7XHJcblx0XHRcdFx0XHRcdFx0YnRuOiBbJ+ehruWumiddLFxyXG5cdFx0XHQgICAgICAgIFx0ICAgIGNvbnRlbnQ6ICfmnKrnn6XplJnor6/vvIzor7fph43mlrDlsJ3or5V+J1xyXG5cdFx0ICAgICAgICBcdFx0fSk7XHJcblx0XHQgICAgICAgIFx0XHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG5cdFx0ICAgICAgICBcdFx0JCgnLmNfZmFkZU91dF9sYXllcicpLmNzcyh7XHJcblx0XHQgICAgICAgIFx0XHRcdCdkaXNwbGF5Jzonbm9uZSdcdFxyXG5cdFx0ICAgICAgICBcdFx0fSlcclxuICAgICAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0pLm9uKCd0b3VjaGVuZCcsICcjaW1nX2NvZGUnLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3NyYycsICdjYXB0Y2hhPycgKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTAwMDApKTtcclxuXHRcdH0pO1xyXG5cdFx0JCgnLmNfY2xzX2ljb24nKS5vbigndG91Y2hlbmQnLGZ1bmN0aW9uKCl7Ly/ljp/mnaXmmK90b3VjaGVuZFxyXG5cdFx0XHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuY19mYWRlT3V0X2xheWVyJykuY3NzKHtcclxuXHRcdFx0XHQnZGlzcGxheSc6J25vbmUnXHJcblx0XHRcdH0pXHJcblx0XHR9KTtcclxuXHRcdCQoJy5jX21hc2snKS5vbigndG91Y2hlbmQnLGZ1bmN0aW9uKCl7Ly/ljp/mnaXmmK90b3VjaGVuZFxyXG5cdFx0XHQkKCcuY19tYXNrJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuY19mYWRlT3V0X2xheWVyJykuY3NzKHtcclxuXHRcdFx0XHQnZGlzcGxheSc6J25vbmUnXHRcclxuXHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdFx0JCgnLmNfb3JkZXJfbmF2X3VsIGxpJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgdD0kKHRoaXMpLmluZGV4KCk7XHJcblx0XHRcdFx0dmFyIHdoPSQoJy5jX25hdl9saW5lJykud2lkdGgoKTtcclxuXHRcdFx0XHRmPS01MCp0K1wiJVwiO1xyXG5cdFx0XHRcdGNxPTEwMCp0K1wiJVwiO1xyXG5cdFx0XHRcdCQoJy5jX25hdl9taWQnKS5jc3Moeyctd2Via2l0LXRyYW5zZm9ybSc6J3RyYW5zbGF0ZSgnK2YrJyknLCctd2Via2l0LXRyYW5zaXRpb24nOic1MDBtcyBsaW5lYXInfSApO1xyXG5cdFx0XHRcdCQoJy5jX25hdl9saW5lJykuY3NzKHsnLXdlYmtpdC10cmFuc2Zvcm0nOid0cmFuc2xhdGUoJytjcSsnKScsJy13ZWJraXQtdHJhbnNpdGlvbic6JzMwMG1zIGxpbmVhcid9ICk7XHJcblx0XHRcdFx0JCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGluaXRQbHVnaW5zOmZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1zZ2NvZGUgPSB7XHJcbiAgICAgICAgICAgIGVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpcHM6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKGxpbmspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHRpZighdGhhdC5lbC5oYXNDbGFzcygnY19idG5fZGlzYWJsZWQnKSl7XHJcblx0ICAgICAgICAgICAgICAgICAgIFx0dmFyIHZhbCA9ICQoJyNjX25ld191c2VyX3Bob25lJykudmFsKCk7XHJcblx0ICAgICAgICAgICAgICAgICAgIFx0dmFyIGltZ0NvZGVWYWwgPSAkKCcjY19yZWdfaW1nX2NvZGUnKS52YWwoKTtcclxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+aJi+acuuWPt+eggeS4jeiDveS4uuepuicpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHQgICAgICAgICAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghaW1nQ29kZVZhbCkge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgXHRhbGVydCgn6aqM6K+B56CB5LiN6IO95Li656m6Jyk7XHJcblx0ICAgICAgICAgICAgICAgICAgICBcdHJldHVybjtcclxuXHQgICAgICAgICAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBsaW5rLFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCAgXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdmFsLFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdfdmVyaWZ5OiBpbWdDb2RlVmFsXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdFx0aWYoZGF0YS5jb2RlID09IDIwMCkgeyBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgXHRcdGxheWVyLm9wZW4oe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJ0bjogWyfnoa7lrponXSxcclxuXHRcdCAgICBcdFx0XHQgICAgICAgIFx0ICAgIGNvbnRlbnQ6IGRhdGEucmVzdWx0XHJcblx0XHQgICAgXHRcdCAgICAgICAgXHRcdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdFx0ICAgIHRoYXQuZWwuYWRkQ2xhc3MoJ2NfYnRuX2Rpc2FibGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdCAgICB0aGF0LmNvdW50RG93bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdCAgICAgICAgdGhhdC5lbC52YWwoJ+iOt+WPlumqjOivgeeggScpLnJlbW92ZUNsYXNzKCdjX2J0bl9kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdFx0ICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHR9ZWxzZXtcclxuXHRcdFx0ICAgICAgICAgICAgICAgIFx0XHRsYXllci5vcGVuKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRidG46IFsn56Gu5a6aJ10sXHJcblx0XHRcdFx0XHRcdCAgICAgICAgXHQgICAgY29udGVudDogZGF0YS5yZXN1bHRcclxuXHRcdFx0XHRcdCAgICAgICAgXHRcdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdFx0fVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcdH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihlbCxsaW5rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRpcHMgPSB0aXBzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmQobGluayk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvdW50RG93bjogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDEyMDtcclxuXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gZmNvdW50KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvdW50IDwgMCkgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHRjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIFx0dGhhdC5lbC50ZXh0KCfph43mlrDojrflj5YnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBcdHRoYXQuZWwudGV4dCgn6YeN5paw6I635Y+WKCcrIGNvdW50LS0gKyAnKScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZmNvdW50LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdH0sXHJcblx0Tm90Qmxhbms6ZnVuY3Rpb24oYXJyYXkpe1xyXG5cdFx0IHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IGxlbjsgaSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgdmFyIGRvbSA9ICQoYXJyYXlbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGRvbS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIFx0Ly8g6L+Z6YeM5Y+v5Lul55SobGF5ZXJqcyB0b2RvXHJcbiAgICAgICAgICAgICAgICBcdGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgXHRcdGJ0bjogWyfnoa7lrponXSxcclxuXHQgICAgICAgIFx0ICAgIFx0Y29udGVudDogZG9tLmRhdGEoJ3RleHQnKSsn5LiN6IO95Li656m6J1xyXG5cdCAgICAgICAgXHRcdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHRnZXRRdWVyeVN0cmluZzpmdW5jdGlvbihzdHIpe1xyXG5cdFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiKyBzdHIgK1wiPShbXiZdKikoJnwkKVwiKTtcclxuXHQgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG5cdCAgICBpZihyIT1udWxsKXtcclxuXHQgICAgXHRyZXR1cm4gIHVuZXNjYXBlKHJbMl0pXHJcblx0ICAgIH1lbHNle1xyXG5cdCAgICBcdHJldHVybiBcIlwiO1xyXG5cdCAgICB9XHJcblx0fVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gbG9naW47IiwidmFyIGxvZ2luQWxsID0gcmVxdWlyZSgnLi9sb2dpbl9hbGwnKTtcclxudmFyIG15QWxlcnQgPSByZXF1aXJlKCcuL215X2FsZXJ0LmpzJyk7XHJcbnZhciBjb3Vwb24gPSB7XHJcblx0VUk6e1xyXG5cdFx0Z2V0QnRuOicuY19vcGVyX2NvdXBvbicsXHJcblx0XHRsb2dpbkJ0bjogJy5jX2xvZ19pbiBhJyxcclxuXHRcdGxvZ291dEJ0bjogJy5jX2xvZ19vdXQgYSdcclxuXHR9LFxyXG5cdGRhdGE6e1xyXG5cdFx0Z2V0Q291cG9uVXJsOiAkKCcjY19nZXRfY291cG9uX3VybCcpLnZhbCgpLFxyXG5cdFx0Ly8gbG9nb3V0VXJsOiAkKCcjY2xvZ291dFVybCcpLnZhbCgpLFxyXG5cdFx0dmlld1R5cGU6ICQoJyNjX3BhZ2VfdHlwZScpLnZhbCgpLFxyXG5cdH0sXHJcblx0aW5pdDpmdW5jdGlvbigpe1xyXG5cdFx0Ly8g5YyF5ousIOS8mOaDoOWIuOmihuWPluS7peWPiueZu+W9leazqOWGjCzpooblj5blkI7nmoTnu4boioLvvIzmj5DnpLrvvIzph43lpI3pooblj5bnmoTmj5DnpLpcclxuXHRcdHRoaXMuYmluZEN1c0V2ZW50KCk7XHJcblx0XHRsb2dpbkFsbC5pbml0KHRoaXMuZGF0YS52aWV3VHlwZSk7XHJcblx0fSxcclxuXHRiaW5kQ3VzRXZlbnQ6ZnVuY3Rpb24oKXtcclxuXHRcdHZhciB0aGF0ID0gdGhpczsgXHJcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJyx0aGlzLlVJLmdldEJ0bixmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIganFUaGlzID0gJCh0aGlzKTtcclxuXHRcdFx0dmFyIHZhbHVlID0ganFUaGlzLmRhdGEoJ3ZhbHVlJyk7XHJcblx0XHRcdGlmKGpxVGhpcy5oYXNDbGFzcygnZ2V0dGluZycpKSByZXR1cm47XHJcblx0XHRcdGpxVGhpcy5hZGRDbGFzcygnZ2V0dGluZycpOyBcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IHRoYXQuZGF0YS5nZXRDb3Vwb25VcmwsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkYXRhOiB7IFxyXG5cdFx0XHRcdFx0cGFyYW06IHZhbHVlLFxyXG5cdFx0XHRcdFx0b3Blcl9ubzokKCcjY19vcGVyX25vJykudmFsKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMjAwKXsgXHJcblx0XHRcdFx0XHQvLyDmiJDlip9cclxuXHRcdFx0XHRcdG15QWxlcnQodGhhdC5kYXRhLnZpZXdUeXBlLCfpooblj5bkvJjmg6DliLjmiJDlip8h5Y+v5Lul5Y675Lmw5Lmw5Lmw5ZWmficpO1xyXG5cdFx0XHRcdH1lbHNlIGlmKGRhdGEuY29kZSA9PSAyMDAyIHx8IGRhdGEuY29kZSA9PSAyMDAxKXsgLy8gYXBwIOmCo+i+ueayoeaciXRva2Vu55qE6K+d5bCx5Lya6L+U5ZueMjAwMeeahFxyXG5cdFx0XHRcdFx0bG9naW5BbGwubG9naW4odGhhdC5kYXRhLnZpZXdUeXBlLCfor7flhYjljrvnmbvlvZXkuIDkuIvlk6Z+Jyk7XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRteUFsZXJ0KHRoYXQuZGF0YS52aWV3VHlwZSxkYXRhLnJlc3VsdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuZmFpbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRteUFsZXJ0KHRoYXQuZGF0YS52aWV3VHlwZSwn6aKG5Y+W5aSx6LSl77yM6K+35Yi35paw5ZCO5Zyo6K+VficpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGpxVGhpcy5yZW1vdmVDbGFzcygnZ2V0dGluZycpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY291cG9uOyJdfQ==
