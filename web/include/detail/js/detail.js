(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var itemSize = require('../plugins/itemsize');
var login = require('../plugins/login');
var fakeA = require('../plugins/FakeA');
var template = require('../plugins/template');

var detail = {
    UI:{
        styleItem:'.cyc_style_item',
        addMin:'#cyc_add_min',
        sizeIpt:'#c_num_ipt',   
        priceNum:'#c_price_num',
        saleOut:'.c_sale_out',
        priceWrap: '.cyc_price_wrap',
        priceBlock: '.c_price_block',
        priceBenefit: '.c_price_benefit',
        addCart:'#c_add_to_cart',
        typeItem:'.cyc_type_item',
        headerLogin:'#cyc_header_login',
        headerReg:'#cyc_header_reg',
        logRegWrap:'#c_log_reg',
        headCart:'.cyc_cart',
        headCartNums:'.cyc_cart_nums',
        timeDown:'.cyc_timedown',
        timeArea:'.cyc_time_area',
        beginOEnd:'.cyc_skill_begin_or_end',
        qrWrap:'.cyc_qr_wrap',
        qrImg:'.cyc_big_qr_img',
        recoMarquee:'#J_reco_list',
        recoItem:'.cyc_reco_item',
        recoMarqueeLeft:'#J_reco_list_left',
        recoMarqueeRight:'#J_reco_list_right',
        recoWrap:'.cyc_reco_wrap',
        hoverItem:'.cyc_hover_item',
        favProduct:'#J_fav',
        dialogCls:'.c_comm_dialog_close',
        gotoTop:'.c_fix_top',
        tipsDtl:'.cyc_tips_item',
        preDeadline: '.c_pre_deadline',
        finalDeadline: '.c_final_deadline',
        deliverTip: '.c_deliver_tip',
        prePrice: '.c_pre_price',
        finalPrice: '.c_final_price',
        prePercent: '.c_pre_percent',
        finalPercent: '.c_final_percent',
        preSaleHd:'.c_advance_sell_hd',
        preStepIcon: '.c_icon_num',
        preBar: '.c_advance_bar',
        largePicA: '.sp-large a',
        couponWrap: '.c_coupon_wrap',
        couponBox: '.c_coupon_box',
        couponCls: '.c_coupon_box_cls',
        getCoupon: '.c_coupon_get',
        stockNum: '.c_stock_num',
        originPrice: '.c_origin_price',
        discountStart: '.c_discount_start',
        discountEnd: '.c_discount_end',
        advanceRuleBtn: '.c_advance_sell_rule_btn',
        advanceRuleCtt: '.c_advance_rule_ctt',
        sellNum: '.c_sell_num',
        moneySaved: '.c_money_saved'
    },
    status:{
        hover:'cyc_hover'
    },
    data:{
        pid:$('#product_id').val(),
        isPresent: $('#isPresent').val()
    },
    Url:{
        couponUrl: $('#coupon_url').val()
    },
    init:function(){
        this.bindCusEvent();
        this.initPlugin();

        if (document.cookie.indexOf('PHPSESSID') != -1){
            this.recordProductId();
        }
    },
    initPlugin:function(){
        var that = this;
        fakeA.init();
        $($(that.UI.styleItem)[0]).trigger('click');
        // marquee
        $(this.UI.recoMarquee).kxbdSuperMarquee({
            distance:$(that.UI.recoItem).outerWidth(true),
            time:3,
            btnGo:{left:that.UI.recoMarqueeLeft,right:that.UI.recoMarqueeRight},
            direction:'left'
        });

        $(this.UI.timeDown).each(function () {
            var $self = $(this),
                $timeArea = $self.find(that.UI.timeArea),
                _time = $timeArea.data('time'),
                _is_begin = $timeArea.data('is-begin'),
                jqTitle = $self.closest(that.UI.todayInfo).find(that.UI.todayInfoTitle);

            $timeArea.timeCountDown({
                time: _time * 1000,
                callback: function (result) {
                    var day = this.fillZero(result.d).split(''),
                        hour = this.fillZero(result.h).split(''),
                        minute = this.fillZero(result.m).split(''),
                        second = this.fillZero(result.s).split(''),
                        ms = result.ms,
                        last_time = result.last_times;

                    if ( last_time == 0) {
                        if (_is_begin == 0) {
                            _start_time = $timeArea.data('product-start-time');
                            _end_time = $timeArea.data('product-end-time');
                            _is_begin = 1 ;
                            this.times = (_end_time - _start_time)*1000;
                        }else{
                            jqTitle.html('<font color="gray">秒杀已结束</font>');
                            this.callback = null;
                        }
                    }
                    $timeArea.find('.day_1').text(day[0]);
                    $timeArea.find('.day_2').text(day[1]);
                    
                    $timeArea.find('.hour_1').text(hour[0]);
                    $timeArea.find('.hour_2').text(hour[1]);
                    
                    $timeArea.find('.minute_1').text(minute[0]);
                    $timeArea.find('.minute_2').text(minute[1]);
                    
                    $timeArea.find('.second_1').text(second[0]);
                    $timeArea.find('.second_2').text(second[1]);
                    
                    $timeArea.find('.ms_1').text(ms);
                }
            });
        });

        $(window).load( function() {
            $('.sp-wrap').smoothproducts();
        });

        var isShowsellNum = $('.cyc_style_item.active').data('is-show-sellnum');    
    },
    bindCusEvent:function(){
        var that = this;
        $('body').on('click',this.UI.styleItem,function selectStyleHandler(){ //命名 用来解绑！！
            that.selectStyleHandler = selectStyleHandler;
            var jqThis = $(this);
            that.selectSizeItem(jqThis); 
        }).on('click',that.UI.addCart,function(){
           if ($(this).hasClass('off')){
                if ( $(this).data('is-pre') == 1){
                    layer.open({
                        content: '预售已结束，请收藏等待再次开放销售'
                    });   
                }else{
                    var secStatus = $(this).data('sec-status');
                    switch (secStatus) {
                        case 'notbegin' :
                            layer.open({content: '闪购未开始'});
                            break;
                        case 'finished' :
                            layer.open({content: '闪购已结束'});
                            break;
                    }
                }
            }else{
                that.addToCart();
            }
        }).on('click',that.UI.headerReg,function(){
            login.init({
                'headerReg':that.UI.headerReg,
                'headerLogin':that.UI.headerLogin,
                'logRegWrap':that.UI.logRegWrap
                ,type:'reg'
            },that.successCb);
        }).on('mouseover',that.UI.qrWrap,function(){
            $(that.UI.qrImg).show();
        }).on('mouseout',that.UI.qrWrap,function(){
            $(that.UI.qrImg).hide();
        }).on('mouseover',this.UI.recoWrap,function(){
            $(this).find('.cyc_list_left').show();
            $(this).find('.cyc_list_right').show();
        }).on('mouseout',this.UI.recoWrap,function(){
            $(this).find('.cyc_list_left').hide();
            $(this).find('.cyc_list_right').hide();
        }).on('mouseover',this.UI.hoverItem,function(){
            $(this).addClass(that.status.hover);
        }).on('mouseout',this.UI.hoverItem,function(){
            $(this).removeClass(that.status.hover);
        }).on('click',this.UI.favProduct,function(){
            var pid = $(this).data('pid');
            var fav = $(this).data('fav');
            that.favProduct(pid,fav);
        }).on('click',this.UI.dialogCls,function(){
            $('#c_comm_dialog_mask').hide();
            $('.c_comm_dialog').hide();
        }).on('mouseover',that.UI.tipsDtl,function(){
            $(this).addClass(that.status.hover);
        }).on('mouseout',that.UI.tipsDtl,function(){
            $(this).removeClass(that.status.hover);
        }).on('click', that.UI.largePicA, function(e){
            e.preventDefault();
        }).on('click', that.UI.couponWrap, function(e){
            e.stopPropagation();
            $(that.UI.couponBox).toggleClass('on');
        }).on('click', that.UI.couponCls, function(){
            $(that.UI.couponBox).removeClass('on');
        }).on('click', document, function(){
            $(that.UI.couponBox).removeClass('on');
        }).on('click', that.UI.getCoupon, function(){
            if($(this).hasClass('on')){
                var couponId = $(this).parent().data('coupon-act-id');
                that.getCoupon(couponId);
            };
        }).on('mouseenter', that.UI.advanceRuleBtn, function(){
            $(that.UI.advanceRuleCtt).addClass('on');
        }).on('mouseleave', that.UI.advanceRuleBtn, function(){
            $(that.UI.advanceRuleCtt).removeClass('on');
        });

        $(window).scroll(function(){
            var winHeight = $(window).height();
            var jqGotoTop = $(that.UI.gotoTop);
            $(window).scrollTop() > winHeight ? jqGotoTop.fadeIn(1000):jqGotoTop.fadeOut(1000);
        })
    },
    initPlugin:function(){
        var that = this;
        fakeA.init();
        if($(that.UI.styleItem).not(that.UI.saleOut).length >= 1){
            $(that.UI.styleItem).not(that.UI.saleOut).first().addClass('active');
            $(that.UI.styleItem+'.active').trigger('click');
        }else{
            $(that.UI.priceNum).html("卖光啦！(​⊙​o​⊙​)");
        }

        // marquee
        $(this.UI.recoMarquee).kxbdSuperMarquee({
            distance:$(that.UI.recoItem).outerWidth(true),
            time:3,
            btnGo:{left:that.UI.recoMarqueeLeft,right:that.UI.recoMarqueeRight},
            direction:'left'
        });

        $(this.UI.timeDown).each(function () {
            var $self = $(this),
                $timeArea = $self.find(that.UI.timeArea),
                _time = $timeArea.data('time'),
                _is_begin = $timeArea.data('is-begin'),
                jqBeginOrEnd = $self.siblings(that.UI.beginOEnd),
                jqTitle = $self.closest(that.UI.todayInfo).find(that.UI.todayInfoTitle);

            if (_is_begin == 0) { 
              jqBeginOrEnd.html('开始'); 
            };

            $timeArea.timeCountDown({
                time: _time * 1000,
                //type: 'ms',
                callback: function (result) {
                    var day = this.fillZero(result.d).split(''),
                        hour = this.fillZero(result.h).split(''),
                        minute = this.fillZero(result.m).split(''),
                        second = this.fillZero(result.s).split(''),
                        ms = result.ms,
                        last_time = result.last_times;

                    if ( last_time == 0) {
                   
                      if (_is_begin == 0) {
                        jqBeginOrEnd.html('结束'); 
                        _start_time = $timeArea.data('product-start-time');
                        _end_time = $timeArea.data('product-end-time');
                        _is_begin = 1 ;
                        this.times = (_end_time - _start_time)*1000;
                      }else{
                        jqTitle.html('<font color="gray">秒杀已结束</font>');
                        this.callback = null;
                      }
                    }
                    $timeArea.find('.day_1').text(day[0]);
                    $timeArea.find('.day_2').text(day[1]);
                    
                    $timeArea.find('.hour_1').text(hour[0]);
                    $timeArea.find('.hour_2').text(hour[1]);
                    
                    $timeArea.find('.minute_1').text(minute[0]);
                    $timeArea.find('.minute_2').text(minute[1]);
                    
                    $timeArea.find('.second_1').text(second[0]);
                    $timeArea.find('.second_2').text(second[1]);
                    
                    $timeArea.find('.ms_1').text(ms);
                }
            });
        });

        $(window).load( function() {
            $('.sp-wrap').smoothproducts();
        });

        var isShowsellNum = $('.cyc_style_item.active').data('is-show-sellnum');
        if(isShowsellNum == 1){
            $('.c_sell_num_wrap').show();
        }else{
            $('.c_sell_num_wrap').hide();
        }

    },
    selectSizeItem:function(jqThis){ 
        var that = detail,
            stepIcon = $(that.UI.preStepIcon),
            preBar = $(that.UI.preBar),
            limtedNums = jqThis.data('limit-nums'),
            sellNum = jqThis.data('sell-num'),
            isShowStock = jqThis.data('is-show-stock-nums'),
            stockNums = jqThis.data('stock-nums'),
            prePercent = jqThis.data('pre-pay-percent'),
            finalPercent = jqThis.data('final-pay-percent'),
            prePrice = jqThis.data('pre-pay-price'),
            finalPrice = jqThis.data('final-payment'),
            deliverTime = jqThis.data('delivery-time'),
            preDeadline = jqThis.data('pre-pay-end-time'),
            finalDeadline = jqThis.data('final-pay-end-time'),
            saleLastday = jqThis.data('pre-sale-last-day'),
            saleProgress = jqThis.data('pre-sale-progress'),
            discount = jqThis.data('discount'),
            price = jqThis.data('price').toFixed(2),
            originPrice = jqThis.data('origin-price').toFixed(2),
            isSeckill = jqThis.data('is-seckill'),
            isSecFinish = jqThis.data('is-sec-finish'),
            skuUrl = jqThis.data('sku-figure'),
            minNums = jqThis.data('min-nums');

            $(that.UI.sizeIpt).val(minNums);
            itemSize.init(that.UI.addMin);
            itemSize.maxNum = limtedNums;
            itemSize.initstatus();
        //判断sku状态、价格、库存显示、初始化数量等
            $(that.UI.styleItem).removeClass('active');
            $(jqThis).addClass('active');
            $(that.UI.originPrice).html(originPrice);
            $(that.UI.moneySaved).text((originPrice - price).toFixed(2));
            $(that.UI.sellNum).text(sellNum);
            if ( stockNums > 0 ){
                $(that.UI.priceWrap).removeClass('c_sale_out');
                if( isShowStock == 1 ){
                    $(that.UI.stockNum).show().text('（剩余库存'+ stockNums + '件）');
                }else if( isShowStock == 0 ){
                    $(that.UI.stockNum).hide();
                }
            }else{
                $(that.UI.priceWrap).addClass('c_sale_out');
                $(jqThis).addClass('off');
            }
        //闪购
            if ( isSeckill==1 && isSecFinish == 1) {
                $(jqThis).addClass('off');
            }
        //预售时间，价格
            $(that.UI.preDeadline).text(preDeadline);
            $(that.UI.finalDeadline).text(finalDeadline);
            $(that.UI.prePrice).text('￥'+ prePrice);
            $(that.UI.finalPrice).text('￥'+ finalPrice);
            $(that.UI.prePercent).text('( ' + prePercent + '% )');
            $( that.UI.finalPercent).text('( ' + finalPercent+ '% )');
            $(that.UI.preDeadline).text(preDeadline);
            $(that.UI.finalDeadline).html('最迟'+finalDeadline +'前支付尾款');
            $(that.UI.deliverTip).html(deliverTime + '后按照订单顺序发货');

            if( saleLastday > 0 ){
                $(that.UI.preSaleHd).html('火热预售中，还有 <span class="c_advance_days">' + saleLastday + '天</span> 结束预售');
            }else{
                $(that.UI.preSaleHd).text('预售已结束，请收藏等待再次开放销售');
            }
        //价格不小于原价则不显示原价、优惠价
            if ( Number(price) <= Number(originPrice) ) {
                $(that.UI.priceBenefit).show();
                $(that.UI.originPrice).show();
            }else{
                $(that.UI.priceBenefit).hide();
                $(that.UI.originPrice).hide();
            }
        //已售数量
            var isShowsellNum = $('.cyc_style_item.active').data('is-show-sellnum');
            if(isShowsellNum == 1){
                $('.c_sell_num_wrap').show();
            }else{
                $('.c_sell_num_wrap').hide();
            }
        //sku图片
            if (skuUrl) {
                that.showSkuImg(skuUrl);
            }else{
                var originFigure = $(that.UI.largePicA).find('img');
                $(that.UI.largePicA).attr('href',originFigure.data('origin-figure'));
                originFigure.attr('src',originFigure.data('origin-figure'));
            }
        //判断是否赠品
            if(that.data.isPresent == 1){
                $(that.UI.priceNum).html('非卖品');
                $(that.UI.styleItem).removeClass('active').addClass('c_style_item_disable');
                //解绑事件，禁止点击
                $('body').unbind('click', that.selectStyleHandler);
            }else{
                $(that.UI.priceNum).html('&yen;'+price);
            }
    },
    addToCart:function(){
        var that = detail;
        var skuId = $(that.UI.styleItem+'.active').data('sku-id');
        var num = $(that.UI.sizeIpt).val();
        if(!skuId) {
            layer.open({content:'请选择款式'});
            return;
        }
        $.ajax({
            url: 'buy.php?c=cart&a=add',
            type: 'POST',
            dataType: 'json',  
            data: {
                product_id: that.data.pid, 
                sku_id: skuId, 
                nums: num
            }
        }).done(function(data){
            if(data.code == 2002){
                login.init({
                    'headerReg':that.UI.headerReg,
                    'headerLogin':that.UI.headerLogin,
                    'logRegWrap':that.UI.logRegWrap,
                    type:'login'
                },that.successCb);
            }
            else if(data.code == 200) {
                that.picFly();
            }else{
                layer.open({content:data.result});
            }
        })
    },
    picFly:function(){
        var that = detail;
        var startTop = $(that.UI.addCart).offset().top,
            startLeft = $(that.UI.addCart).offset().left,
            endTop = $(that.UI.headCart).offset().top,
            endLeft = $(that.UI.headCart).offset().left;
            $('<img id="cyc_fly_icon" src='+$('#flyIconUrl').val()+'>', {'class': 'picfly'})
            .css({ top: startTop,left: startLeft ,position:'absolute'})
            .appendTo('body')
            .animate(
                { top: endTop, left: endLeft, opacity: '0.9'},
                700, 
                'swing', 
                function(){
                    $(this).remove();
                }
            )
        $.ajax({
            url: 'buy.php?c=cart&a=getSkuCounts',
            dataType: 'json'
        }).done(function(data) {
            $(that.UI.headCartNums).show().text(data.result);
        })
    },
    successCb : function(opt){
        $(opt.headerReg).remove();
        $(opt.headerLogin).remove();
        var arr = ['<a href="i.php" class="cyc_tools_item" target="_blank">用户中心</a>','<a href="i.php?c=login&a=logout?c=login&a=logout" class="cyc_tools_item" >退出</a>'];
        $(opt.logRegWrap).append(arr.join(''));
    },
    // 收藏商品
    favProduct:function(pid,fav){
        var that = detail;
        var url = !fav? 'index.php?c=fav&a=addProduct':'index.php?c=fav&a=deleteProduct';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {
                product_id: pid
            },
        })
        .done(function(data) {
            if(data.code==200){
                $('#c_comm_dialog_mask').show();
                $('.c_comm_dialog').css({
                    top: window.scrollY+100,
                    left:'45%'
                }).show(); 
                $('#c_comm_dialog_icon').addClass('comm_right_icon');
                $('.cyc_comm_dialog_text').text(data.result);
                var isFav = parseInt(fav)?0:1;
                $(that.UI.favProduct).data('fav',isFav);
                var text = '收藏';
                if(isFav){
                    text = '取消收藏';
                }
                $(that.UI.favProduct).text(text);
            }else if(data.code==3001 || data.code==2002 ){
                login.init({
                    'headerReg':that.UI.headerReg,
                    'headerLogin':that.UI.headerLogin,
                    'logRegWrap':that.UI.logRegWrap,
                    type:'login'
                },that.successCb);
            }else{
                $('#c_comm_dialog_mask').show();
                $('#c_comm_dialog_icon').addClass('comm_warm_icon');
                $('.cyc_comm_dialog_text').text(data.result);
            }
        })
        .fail(function() {
            $('#c_comm_dialog_mask').show();
            $('#c_comm_dialog_icon').addClass('comm_warm_icon');
            $('.cyc_comm_dialog_text').text('啊哦，网络错误，请稍后再试');
        });
    },
    getCoupon: function(couponId){
        var that = this;
        var couponUrl = that.Url.couponUrl;
        $.ajax({
            url: couponUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                coupon_act_id: couponId
            },
        })
        .done(function(rtnData) {
           if( rtnData.code==2002 ){
                login.init({
                    'headerReg':that.UI.headerReg,
                    'headerLogin':that.UI.headerLogin,
                    'logRegWrap':that.UI.logRegWrap,
                    type:'login'
                },that.successCb);
            }else{
                layer.open({
                    content: rtnData.result
                })
            }
        })
        .fail(function() {
            layer.open({
                content: '领取失败，请重新再试'
            })
        })
    },
    showSkuImg: function (skuUrl) {
        var that = this;
        var largePicA = $(that.UI.largePicA);
        var largePic = largePicA.find('img');
        largePicA.attr('href',skuUrl);
        largePic.attr('src', skuUrl);
    },
    recordProductId: function () {
        var that = this;
        var storedPid = store.get('product_id');
        if ( storedPid === undefined) {
            var pids = [];
            pids.push(that.data.pid);
            store.set('product_id', pids);
        }else{
            var equalValue = that.equalCompare(storedPid, that.data.pid);//判断是否记录过了
            if (equalValue == 'equal') {
                if( storedPid.length >= 20 ) {//长度为20的pid队列
                    storedPid.pop();
                }
                var pids = storedPid;
            }else{
                var pids = that.delArrayElement(storedPid, equalValue);
            }
            pids.unshift(that.data.pid);
            store.set('product_id', pids);
        }
    },
    equalCompare: function ( array, pid ) {
        for (var i=0; i<array.length; i++) {
            if (array[i] == pid) {
                return i;
            }
        };
        return 'equal';
    },
    delArrayElement: function (array, i) {
        array = array.slice(0,i).concat(array.slice(i+1));
        return array;
    }
}
detail.init();


},{"../plugins/FakeA":2,"../plugins/itemsize":3,"../plugins/login":4,"../plugins/template":5}],2:[function(require,module,exports){
/**
 * 伪a标签……没href的
 * @type {{init: init}}
 */
module.exports = {
    init:function() {
        $('body').on('click', '.c_fake_a', function (e) {
            e.preventDefault(); 
        });
    }
};
},{}],3:[function(require,module,exports){
var itemSize = {
	container:null,
	min:null,
	add:null,
	ipt:null,
	minNum:0,
	maxNum:0,
	val:0,
	init:function(containerId){
		this.container = $(containerId);
		this.min = this.container.find('.cyc_size_min');
		this.add = this.container.find('.cyc_size_add');
		this.ipt = this.container.find('.cyc_size_ipt');
		this.val = this.minNum = this.ipt.val();
		this.min.addClass('cyc_choose_limit');
		this.unbind();
		this.bind();
		this.initstatus();
	},
	bind:function(){
		var that = this;
		$('.cyc_size_min').on('click',function(){
			if($(this).hasClass('cyc_choose_limit'))return;
			that.val--;
			if(that.val <= that.minNum ){
				that.min.addClass('cyc_choose_limit');
			}else{
				that.add.removeClass('cyc_choose_limit');
				that.min.removeClass('cyc_choose_limit');
			}
			that.ipt.val(that.val);
		});
		$('.cyc_size_add').on('click',function(){
			if($(this).hasClass('cyc_choose_limit'))return;
			that.val++;
			that.ipt.val(that.val);
			if(that.val > that.maxNum){
				that.add.addClass('cyc_choose_limit');
			}else if(that.val >= that.minNum){
				that.add.removeClass('cyc_choose_limit');
				that.min.removeClass('cyc_choose_limit');
			}
		})
	},
	unbind:function(){
		$('.cyc_size_add').off('click');
		$('.cyc_size_min').off('click');
	},
	initstatus:function(){
		var val = this.ipt.val();
		if(val <= this.minNum){
			this.min.addClass('cyc_choose_limit');
		}else{
			this.min.removeClass('cyc_choose_limit');
		}
		if(val >= this.maxNum){
			this.add.addClass('cyc_choose_limit');
		}else{
			this.add.removeClass('cyc_choose_limit');
		}
	}
}
module.exports = itemSize;
},{}],4:[function(require,module,exports){
var login = {
	height:0,
	width:0,
	tabWrap:null,
	successCb:null,
	msgcode:null,
	opt:null,
	isInit:false,
	init:function(opt,cb){
		// init 的时候分两个步骤。 1个计算摆放位置 2对tab初始化 3 展示出来
		var winWidth = $(window).width();
		if(!this.isInit){
			this.isInit = true;
			this.opt = opt;
			this.tabWrap = $('#c_tab_wrap');
			this.width = this.tabWrap.outerWidth();
			this.height = this.tabWrap.outerHeight();
			this.tabWrap.css({
				left:(winWidth-this.height)/2,
				top:window.scrollY + 50
			});
			this.successCb = cb;
	        this.initStatus();
	        this.initPlugin();
	        this.cusEvent();
	        this.msgcode.init($('#c_get_sms_code'),'i.php?c=login&a=regSmsVerify');
        }else{
        	this.tabWrap.css({
				left:(winWidth-this.height)/2,
				top:window.scrollY + 50
			});
        	$('#c_dia_mask').show();
			$('#c_tab_wrap').show();
        }
        opt.type && $('#tab_'+opt.type+'_title').trigger('click');

        //wechat login
        this.wechatLogin();
        
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
	        params.captcha = $('#c_log_verify').val();
	        params.password = $('#c_user_psw').val();
	        params.remember = $('#remember').val();
	        if (params.phone == '') { alert('请填写用户名'); return false; };
	        if (params.password == '') { alert('请填写密码'); return false; };
	        if (params.captcha == '') { alert('请填写验证码'); return false; };
	        $.ajax({  
	            type: "post",  
	            url: 'i.php?c=login&a=checkLogin&is_ajax=1',  
	            dataType: "json",  
	            data: {
	                cycang_user: params.phone,
	                captcha: params.captcha,
	                cycang_pwd: params.password,
	                remember: params.remember
	            },  
	            success: function(ret){
	                if(ret.code == 200){
	                	if(that.successCb){
	                		alert('登录成功,可以买买买啦( ＞ω＜)!!!');
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
		}).on('click','.verify_img',function(){
			$(this).attr('src','i.php?c=login&a=captcha');
		}).on('click','#tab_login_title',function(){
			$('.log_form_wrap .verify_img').attr('src','i.php?c=login&a=captcha');
		}).on('click','#tab_reg_title',function(){
			$('.reg_form_wrap .verify_img').attr('src','i.php?c=login&a=captcha');
		}).on('click','#reg_btn',function(){
			var phone = $('#c_reg_name'),
                captcha = $('#c_reg_img_verify'),
                sms_verify = $('#c_reg_sms_code'),
                pwd = $('#c_reg_psw'),
                repwd =$('#c_reg_confirm_psw'),
                data = {
                    phone: phone.val(),
                    captcha: captcha.val(),
                    sms_verify: sms_verify.val(),
                    cycang_pwd: pwd.val(),
                    cycang_repwd: repwd.val()
                };

            if(that.NotBlank(['#c_reg_name', '#c_reg_img_verify', '#c_reg_sms_code', '#c_reg_psw', '#c_reg_confirm_psw'])) {
                if(pwd.val() !== repwd.val()) {
                    alert('两次密码不相同');
                    return;
                }
                $.ajax({  
                    type: "post",  
                    url: 'i.php?c=login&a=register',  
                    dataType: "json",  
                    data: data,  
                    success: function(ret){
                        if(ret.code == 200){
                        	if(that.successCb){
                        		alert('登录成功,可以买买买啦( ＞ω＜)!!!');
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
                    return false
                }

            }
            return true
	},
	initStatus:function(){
		$('#c_dia_mask').show();
		$('#c_tab_wrap').show();
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
	                   	var imgVerify = $('#c_reg_img_verify').val();
	                    if (!val) {
	                        alert('手机号码不能为空');
	                        return
	                    }else if (!imgVerify) {
	                        alert('图形验证码不能为空');
	                        return
	                    }
	                    $.ajax({
	                        url: link,
	                        type: 'POST',
	                        dataType: 'json',  
	                        data: {
	                            phone: val,
	                            captcha: imgVerify
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
                    count = 60;

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

	},
    wechatLogin: function(){
    	$('.icon_wechat').on('click', function(){
    		var obj = new WxLogin({
				id: "wechat_login_container",
				appid: "wxc475a3f1e55f542a",
				scope: "snsapi_login",
				redirect_uri: "https://cycang.com/wechat_login_callback.php",
				state: "",
				style: "",
				href: ""
			});
    		$('.tabs_content').css('display', 'none');
    		$('.c_wechat_login_box').fadeIn();
    	});	
    	$('.c_wechat_back').on('click', function(){
			$('.c_wechat_login_box').css('display', 'none');
			$('.tabs_content').fadeIn();
		});
    }

}

module.exports = login;
},{}],5:[function(require,module,exports){
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjeWh1Yi9wYy9QdWJsaWMvc3JjL2pzL3Nob3AvZGV0YWlsLmpzIiwiY3lodWIvcGMvUHVibGljL3NyYy9qcy9wbHVnaW5zL0Zha2VBLmpzIiwiY3lodWIvcGMvUHVibGljL3NyYy9qcy9wbHVnaW5zL2l0ZW1zaXplLmpzIiwiY3lodWIvcGMvUHVibGljL3NyYy9qcy9wbHVnaW5zL2xvZ2luLmpzIiwiY3lodWIvcGMvUHVibGljL3NyYy9qcy9wbHVnaW5zL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNobEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UkE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaXRlbVNpemUgPSByZXF1aXJlKCcuLi9wbHVnaW5zL2l0ZW1zaXplJyk7XHJcbnZhciBsb2dpbiA9IHJlcXVpcmUoJy4uL3BsdWdpbnMvbG9naW4nKTtcclxudmFyIGZha2VBID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9GYWtlQScpO1xyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbHVnaW5zL3RlbXBsYXRlJyk7XHJcblxyXG52YXIgZGV0YWlsID0ge1xyXG4gICAgVUk6e1xyXG4gICAgICAgIHN0eWxlSXRlbTonLmN5Y19zdHlsZV9pdGVtJyxcclxuICAgICAgICBhZGRNaW46JyNjeWNfYWRkX21pbicsXHJcbiAgICAgICAgc2l6ZUlwdDonI2NfbnVtX2lwdCcsICAgXHJcbiAgICAgICAgcHJpY2VOdW06JyNjX3ByaWNlX251bScsXHJcbiAgICAgICAgc2FsZU91dDonLmNfc2FsZV9vdXQnLFxyXG4gICAgICAgIHByaWNlV3JhcDogJy5jeWNfcHJpY2Vfd3JhcCcsXHJcbiAgICAgICAgcHJpY2VCbG9jazogJy5jX3ByaWNlX2Jsb2NrJyxcclxuICAgICAgICBwcmljZUJlbmVmaXQ6ICcuY19wcmljZV9iZW5lZml0JyxcclxuICAgICAgICBhZGRDYXJ0OicjY19hZGRfdG9fY2FydCcsXHJcbiAgICAgICAgdHlwZUl0ZW06Jy5jeWNfdHlwZV9pdGVtJyxcclxuICAgICAgICBoZWFkZXJMb2dpbjonI2N5Y19oZWFkZXJfbG9naW4nLFxyXG4gICAgICAgIGhlYWRlclJlZzonI2N5Y19oZWFkZXJfcmVnJyxcclxuICAgICAgICBsb2dSZWdXcmFwOicjY19sb2dfcmVnJyxcclxuICAgICAgICBoZWFkQ2FydDonLmN5Y19jYXJ0JyxcclxuICAgICAgICBoZWFkQ2FydE51bXM6Jy5jeWNfY2FydF9udW1zJyxcclxuICAgICAgICB0aW1lRG93bjonLmN5Y190aW1lZG93bicsXHJcbiAgICAgICAgdGltZUFyZWE6Jy5jeWNfdGltZV9hcmVhJyxcclxuICAgICAgICBiZWdpbk9FbmQ6Jy5jeWNfc2tpbGxfYmVnaW5fb3JfZW5kJyxcclxuICAgICAgICBxcldyYXA6Jy5jeWNfcXJfd3JhcCcsXHJcbiAgICAgICAgcXJJbWc6Jy5jeWNfYmlnX3FyX2ltZycsXHJcbiAgICAgICAgcmVjb01hcnF1ZWU6JyNKX3JlY29fbGlzdCcsXHJcbiAgICAgICAgcmVjb0l0ZW06Jy5jeWNfcmVjb19pdGVtJyxcclxuICAgICAgICByZWNvTWFycXVlZUxlZnQ6JyNKX3JlY29fbGlzdF9sZWZ0JyxcclxuICAgICAgICByZWNvTWFycXVlZVJpZ2h0OicjSl9yZWNvX2xpc3RfcmlnaHQnLFxyXG4gICAgICAgIHJlY29XcmFwOicuY3ljX3JlY29fd3JhcCcsXHJcbiAgICAgICAgaG92ZXJJdGVtOicuY3ljX2hvdmVyX2l0ZW0nLFxyXG4gICAgICAgIGZhdlByb2R1Y3Q6JyNKX2ZhdicsXHJcbiAgICAgICAgZGlhbG9nQ2xzOicuY19jb21tX2RpYWxvZ19jbG9zZScsXHJcbiAgICAgICAgZ290b1RvcDonLmNfZml4X3RvcCcsXHJcbiAgICAgICAgdGlwc0R0bDonLmN5Y190aXBzX2l0ZW0nLFxyXG4gICAgICAgIHByZURlYWRsaW5lOiAnLmNfcHJlX2RlYWRsaW5lJyxcclxuICAgICAgICBmaW5hbERlYWRsaW5lOiAnLmNfZmluYWxfZGVhZGxpbmUnLFxyXG4gICAgICAgIGRlbGl2ZXJUaXA6ICcuY19kZWxpdmVyX3RpcCcsXHJcbiAgICAgICAgcHJlUHJpY2U6ICcuY19wcmVfcHJpY2UnLFxyXG4gICAgICAgIGZpbmFsUHJpY2U6ICcuY19maW5hbF9wcmljZScsXHJcbiAgICAgICAgcHJlUGVyY2VudDogJy5jX3ByZV9wZXJjZW50JyxcclxuICAgICAgICBmaW5hbFBlcmNlbnQ6ICcuY19maW5hbF9wZXJjZW50JyxcclxuICAgICAgICBwcmVTYWxlSGQ6Jy5jX2FkdmFuY2Vfc2VsbF9oZCcsXHJcbiAgICAgICAgcHJlU3RlcEljb246ICcuY19pY29uX251bScsXHJcbiAgICAgICAgcHJlQmFyOiAnLmNfYWR2YW5jZV9iYXInLFxyXG4gICAgICAgIGxhcmdlUGljQTogJy5zcC1sYXJnZSBhJyxcclxuICAgICAgICBjb3Vwb25XcmFwOiAnLmNfY291cG9uX3dyYXAnLFxyXG4gICAgICAgIGNvdXBvbkJveDogJy5jX2NvdXBvbl9ib3gnLFxyXG4gICAgICAgIGNvdXBvbkNsczogJy5jX2NvdXBvbl9ib3hfY2xzJyxcclxuICAgICAgICBnZXRDb3Vwb246ICcuY19jb3Vwb25fZ2V0JyxcclxuICAgICAgICBzdG9ja051bTogJy5jX3N0b2NrX251bScsXHJcbiAgICAgICAgb3JpZ2luUHJpY2U6ICcuY19vcmlnaW5fcHJpY2UnLFxyXG4gICAgICAgIGRpc2NvdW50U3RhcnQ6ICcuY19kaXNjb3VudF9zdGFydCcsXHJcbiAgICAgICAgZGlzY291bnRFbmQ6ICcuY19kaXNjb3VudF9lbmQnLFxyXG4gICAgICAgIGFkdmFuY2VSdWxlQnRuOiAnLmNfYWR2YW5jZV9zZWxsX3J1bGVfYnRuJyxcclxuICAgICAgICBhZHZhbmNlUnVsZUN0dDogJy5jX2FkdmFuY2VfcnVsZV9jdHQnLFxyXG4gICAgICAgIHNlbGxOdW06ICcuY19zZWxsX251bScsXHJcbiAgICAgICAgbW9uZXlTYXZlZDogJy5jX21vbmV5X3NhdmVkJ1xyXG4gICAgfSxcclxuICAgIHN0YXR1czp7XHJcbiAgICAgICAgaG92ZXI6J2N5Y19ob3ZlcidcclxuICAgIH0sXHJcbiAgICBkYXRhOntcclxuICAgICAgICBwaWQ6JCgnI3Byb2R1Y3RfaWQnKS52YWwoKSxcclxuICAgICAgICBpc1ByZXNlbnQ6ICQoJyNpc1ByZXNlbnQnKS52YWwoKVxyXG4gICAgfSxcclxuICAgIFVybDp7XHJcbiAgICAgICAgY291cG9uVXJsOiAkKCcjY291cG9uX3VybCcpLnZhbCgpXHJcbiAgICB9LFxyXG4gICAgaW5pdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYmluZEN1c0V2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0UGx1Z2luKCk7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZignUEhQU0VTU0lEJykgIT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFByb2R1Y3RJZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0UGx1Z2luOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGZha2VBLmluaXQoKTtcclxuICAgICAgICAkKCQodGhhdC5VSS5zdHlsZUl0ZW0pWzBdKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIC8vIG1hcnF1ZWVcclxuICAgICAgICAkKHRoaXMuVUkucmVjb01hcnF1ZWUpLmt4YmRTdXBlck1hcnF1ZWUoe1xyXG4gICAgICAgICAgICBkaXN0YW5jZTokKHRoYXQuVUkucmVjb0l0ZW0pLm91dGVyV2lkdGgodHJ1ZSksXHJcbiAgICAgICAgICAgIHRpbWU6MyxcclxuICAgICAgICAgICAgYnRuR286e2xlZnQ6dGhhdC5VSS5yZWNvTWFycXVlZUxlZnQscmlnaHQ6dGhhdC5VSS5yZWNvTWFycXVlZVJpZ2h0fSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOidsZWZ0J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHRoaXMuVUkudGltZURvd24pLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgJHRpbWVBcmVhID0gJHNlbGYuZmluZCh0aGF0LlVJLnRpbWVBcmVhKSxcclxuICAgICAgICAgICAgICAgIF90aW1lID0gJHRpbWVBcmVhLmRhdGEoJ3RpbWUnKSxcclxuICAgICAgICAgICAgICAgIF9pc19iZWdpbiA9ICR0aW1lQXJlYS5kYXRhKCdpcy1iZWdpbicpLFxyXG4gICAgICAgICAgICAgICAganFUaXRsZSA9ICRzZWxmLmNsb3Nlc3QodGhhdC5VSS50b2RheUluZm8pLmZpbmQodGhhdC5VSS50b2RheUluZm9UaXRsZSk7XHJcblxyXG4gICAgICAgICAgICAkdGltZUFyZWEudGltZUNvdW50RG93bih7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiBfdGltZSAqIDEwMDAsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXkgPSB0aGlzLmZpbGxaZXJvKHJlc3VsdC5kKS5zcGxpdCgnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXIgPSB0aGlzLmZpbGxaZXJvKHJlc3VsdC5oKS5zcGxpdCgnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHRoaXMuZmlsbFplcm8ocmVzdWx0Lm0pLnNwbGl0KCcnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gdGhpcy5maWxsWmVybyhyZXN1bHQucykuc3BsaXQoJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcyA9IHJlc3VsdC5tcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lID0gcmVzdWx0Lmxhc3RfdGltZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbGFzdF90aW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc19iZWdpbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc3RhcnRfdGltZSA9ICR0aW1lQXJlYS5kYXRhKCdwcm9kdWN0LXN0YXJ0LXRpbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lbmRfdGltZSA9ICR0aW1lQXJlYS5kYXRhKCdwcm9kdWN0LWVuZC10aW1lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXNfYmVnaW4gPSAxIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXMgPSAoX2VuZF90aW1lIC0gX3N0YXJ0X3RpbWUpKjEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganFUaXRsZS5odG1sKCc8Zm9udCBjb2xvcj1cImdyYXlcIj7np5LmnYDlt7Lnu5PmnZ88L2ZvbnQ+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLmRheV8xJykudGV4dChkYXlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcuZGF5XzInKS50ZXh0KGRheVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVBcmVhLmZpbmQoJy5ob3VyXzEnKS50ZXh0KGhvdXJbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcuaG91cl8yJykudGV4dChob3VyWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLm1pbnV0ZV8xJykudGV4dChtaW51dGVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcubWludXRlXzInKS50ZXh0KG1pbnV0ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVBcmVhLmZpbmQoJy5zZWNvbmRfMScpLnRleHQoc2Vjb25kWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLnNlY29uZF8yJykudGV4dChzZWNvbmRbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcubXNfMScpLnRleHQobXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLmxvYWQoIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuc3Atd3JhcCcpLnNtb290aHByb2R1Y3RzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBpc1Nob3dzZWxsTnVtID0gJCgnLmN5Y19zdHlsZV9pdGVtLmFjdGl2ZScpLmRhdGEoJ2lzLXNob3ctc2VsbG51bScpOyAgICBcclxuICAgIH0sXHJcbiAgICBiaW5kQ3VzRXZlbnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsdGhpcy5VSS5zdHlsZUl0ZW0sZnVuY3Rpb24gc2VsZWN0U3R5bGVIYW5kbGVyKCl7IC8v5ZG95ZCNIOeUqOadpeino+e7ke+8ge+8gVxyXG4gICAgICAgICAgICB0aGF0LnNlbGVjdFN0eWxlSGFuZGxlciA9IHNlbGVjdFN0eWxlSGFuZGxlcjtcclxuICAgICAgICAgICAgdmFyIGpxVGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoYXQuc2VsZWN0U2l6ZUl0ZW0oanFUaGlzKTsgXHJcbiAgICAgICAgfSkub24oJ2NsaWNrJyx0aGF0LlVJLmFkZENhcnQsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb2ZmJykpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCAkKHRoaXMpLmRhdGEoJ2lzLXByZScpID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn6aKE5ZSu5bey57uT5p2f77yM6K+35pS26JeP562J5b6F5YaN5qyh5byA5pS+6ZSA5ZSuJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlY1N0YXR1cyA9ICQodGhpcykuZGF0YSgnc2VjLXN0YXR1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VjU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vdGJlZ2luJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5vcGVuKHtjb250ZW50OiAn6Zeq6LSt5pyq5byA5aeLJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5vcGVuKHtjb250ZW50OiAn6Zeq6LSt5bey57uT5p2fJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWRkVG9DYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5vbignY2xpY2snLHRoYXQuVUkuaGVhZGVyUmVnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxvZ2luLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgJ2hlYWRlclJlZyc6dGhhdC5VSS5oZWFkZXJSZWcsXHJcbiAgICAgICAgICAgICAgICAnaGVhZGVyTG9naW4nOnRoYXQuVUkuaGVhZGVyTG9naW4sXHJcbiAgICAgICAgICAgICAgICAnbG9nUmVnV3JhcCc6dGhhdC5VSS5sb2dSZWdXcmFwXHJcbiAgICAgICAgICAgICAgICAsdHlwZToncmVnJ1xyXG4gICAgICAgICAgICB9LHRoYXQuc3VjY2Vzc0NiKTtcclxuICAgICAgICB9KS5vbignbW91c2VvdmVyJyx0aGF0LlVJLnFyV3JhcCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkucXJJbWcpLnNob3coKTtcclxuICAgICAgICB9KS5vbignbW91c2VvdXQnLHRoYXQuVUkucXJXcmFwLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5xckltZykuaGlkZSgpO1xyXG4gICAgICAgIH0pLm9uKCdtb3VzZW92ZXInLHRoaXMuVUkucmVjb1dyYXAsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuY3ljX2xpc3RfbGVmdCcpLnNob3coKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuY3ljX2xpc3RfcmlnaHQnKS5zaG93KCk7XHJcbiAgICAgICAgfSkub24oJ21vdXNlb3V0Jyx0aGlzLlVJLnJlY29XcmFwLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmN5Y19saXN0X2xlZnQnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmN5Y19saXN0X3JpZ2h0JykuaGlkZSgpO1xyXG4gICAgICAgIH0pLm9uKCdtb3VzZW92ZXInLHRoaXMuVUkuaG92ZXJJdGVtLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3ModGhhdC5zdGF0dXMuaG92ZXIpO1xyXG4gICAgICAgIH0pLm9uKCdtb3VzZW91dCcsdGhpcy5VSS5ob3Zlckl0ZW0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyh0aGF0LnN0YXR1cy5ob3Zlcik7XHJcbiAgICAgICAgfSkub24oJ2NsaWNrJyx0aGlzLlVJLmZhdlByb2R1Y3QsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XHJcbiAgICAgICAgICAgIHZhciBmYXYgPSAkKHRoaXMpLmRhdGEoJ2ZhdicpO1xyXG4gICAgICAgICAgICB0aGF0LmZhdlByb2R1Y3QocGlkLGZhdik7XHJcbiAgICAgICAgfSkub24oJ2NsaWNrJyx0aGlzLlVJLmRpYWxvZ0NscyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcjY19jb21tX2RpYWxvZ19tYXNrJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcuY19jb21tX2RpYWxvZycpLmhpZGUoKTtcclxuICAgICAgICB9KS5vbignbW91c2VvdmVyJyx0aGF0LlVJLnRpcHNEdGwsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyh0aGF0LnN0YXR1cy5ob3Zlcik7XHJcbiAgICAgICAgfSkub24oJ21vdXNlb3V0Jyx0aGF0LlVJLnRpcHNEdGwsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyh0aGF0LnN0YXR1cy5ob3Zlcik7XHJcbiAgICAgICAgfSkub24oJ2NsaWNrJywgdGhhdC5VSS5sYXJnZVBpY0EsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSkub24oJ2NsaWNrJywgdGhhdC5VSS5jb3Vwb25XcmFwLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgJCh0aGF0LlVJLmNvdXBvbkJveCkudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgfSkub24oJ2NsaWNrJywgdGhhdC5VSS5jb3Vwb25DbHMsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5jb3Vwb25Cb3gpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgIH0pLm9uKCdjbGljaycsIGRvY3VtZW50LCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkuY291cG9uQm94KS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICB9KS5vbignY2xpY2snLCB0aGF0LlVJLmdldENvdXBvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnb24nKSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291cG9uSWQgPSAkKHRoaXMpLnBhcmVudCgpLmRhdGEoJ2NvdXBvbi1hY3QtaWQnKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2V0Q291cG9uKGNvdXBvbklkKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KS5vbignbW91c2VlbnRlcicsIHRoYXQuVUkuYWR2YW5jZVJ1bGVCdG4sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5hZHZhbmNlUnVsZUN0dCkuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgfSkub24oJ21vdXNlbGVhdmUnLCB0aGF0LlVJLmFkdmFuY2VSdWxlQnRuLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkuYWR2YW5jZVJ1bGVDdHQpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB3aW5IZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciBqcUdvdG9Ub3AgPSAkKHRoYXQuVUkuZ290b1RvcCk7XHJcbiAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoKSA+IHdpbkhlaWdodCA/IGpxR290b1RvcC5mYWRlSW4oMTAwMCk6anFHb3RvVG9wLmZhZGVPdXQoMTAwMCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBpbml0UGx1Z2luOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGZha2VBLmluaXQoKTtcclxuICAgICAgICBpZigkKHRoYXQuVUkuc3R5bGVJdGVtKS5ub3QodGhhdC5VSS5zYWxlT3V0KS5sZW5ndGggPj0gMSl7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5zdHlsZUl0ZW0pLm5vdCh0aGF0LlVJLnNhbGVPdXQpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkuc3R5bGVJdGVtKycuYWN0aXZlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCh0aGF0LlVJLnByaWNlTnVtKS5odG1sKFwi5Y2W5YWJ5ZWm77yBKOKAi+KKmeKAi2/igIviipnigIspXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbWFycXVlZVxyXG4gICAgICAgICQodGhpcy5VSS5yZWNvTWFycXVlZSkua3hiZFN1cGVyTWFycXVlZSh7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlOiQodGhhdC5VSS5yZWNvSXRlbSkub3V0ZXJXaWR0aCh0cnVlKSxcclxuICAgICAgICAgICAgdGltZTozLFxyXG4gICAgICAgICAgICBidG5Hbzp7bGVmdDp0aGF0LlVJLnJlY29NYXJxdWVlTGVmdCxyaWdodDp0aGF0LlVJLnJlY29NYXJxdWVlUmlnaHR9LFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246J2xlZnQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQodGhpcy5VSS50aW1lRG93bikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAkdGltZUFyZWEgPSAkc2VsZi5maW5kKHRoYXQuVUkudGltZUFyZWEpLFxyXG4gICAgICAgICAgICAgICAgX3RpbWUgPSAkdGltZUFyZWEuZGF0YSgndGltZScpLFxyXG4gICAgICAgICAgICAgICAgX2lzX2JlZ2luID0gJHRpbWVBcmVhLmRhdGEoJ2lzLWJlZ2luJyksXHJcbiAgICAgICAgICAgICAgICBqcUJlZ2luT3JFbmQgPSAkc2VsZi5zaWJsaW5ncyh0aGF0LlVJLmJlZ2luT0VuZCksXHJcbiAgICAgICAgICAgICAgICBqcVRpdGxlID0gJHNlbGYuY2xvc2VzdCh0aGF0LlVJLnRvZGF5SW5mbykuZmluZCh0aGF0LlVJLnRvZGF5SW5mb1RpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfaXNfYmVnaW4gPT0gMCkgeyBcclxuICAgICAgICAgICAgICBqcUJlZ2luT3JFbmQuaHRtbCgn5byA5aeLJyk7IFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHRpbWVBcmVhLnRpbWVDb3VudERvd24oe1xyXG4gICAgICAgICAgICAgICAgdGltZTogX3RpbWUgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgLy90eXBlOiAnbXMnLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5maWxsWmVybyhyZXN1bHQuZCkuc3BsaXQoJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VyID0gdGhpcy5maWxsWmVybyhyZXN1bHQuaCkuc3BsaXQoJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSB0aGlzLmZpbGxaZXJvKHJlc3VsdC5tKS5zcGxpdCgnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IHRoaXMuZmlsbFplcm8ocmVzdWx0LnMpLnNwbGl0KCcnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXMgPSByZXN1bHQubXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfdGltZSA9IHJlc3VsdC5sYXN0X3RpbWVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGxhc3RfdGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNfYmVnaW4gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqcUJlZ2luT3JFbmQuaHRtbCgn57uT5p2fJyk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RhcnRfdGltZSA9ICR0aW1lQXJlYS5kYXRhKCdwcm9kdWN0LXN0YXJ0LXRpbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2VuZF90aW1lID0gJHRpbWVBcmVhLmRhdGEoJ3Byb2R1Y3QtZW5kLXRpbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2lzX2JlZ2luID0gMSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXMgPSAoX2VuZF90aW1lIC0gX3N0YXJ0X3RpbWUpKjEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAganFUaXRsZS5odG1sKCc8Zm9udCBjb2xvcj1cImdyYXlcIj7np5LmnYDlt7Lnu5PmnZ88L2ZvbnQ+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLmRheV8xJykudGV4dChkYXlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcuZGF5XzInKS50ZXh0KGRheVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVBcmVhLmZpbmQoJy5ob3VyXzEnKS50ZXh0KGhvdXJbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcuaG91cl8yJykudGV4dChob3VyWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLm1pbnV0ZV8xJykudGV4dChtaW51dGVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcubWludXRlXzInKS50ZXh0KG1pbnV0ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVBcmVhLmZpbmQoJy5zZWNvbmRfMScpLnRleHQoc2Vjb25kWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZUFyZWEuZmluZCgnLnNlY29uZF8yJykudGV4dChzZWNvbmRbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lQXJlYS5maW5kKCcubXNfMScpLnRleHQobXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLmxvYWQoIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuc3Atd3JhcCcpLnNtb290aHByb2R1Y3RzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBpc1Nob3dzZWxsTnVtID0gJCgnLmN5Y19zdHlsZV9pdGVtLmFjdGl2ZScpLmRhdGEoJ2lzLXNob3ctc2VsbG51bScpO1xyXG4gICAgICAgIGlmKGlzU2hvd3NlbGxOdW0gPT0gMSl7XHJcbiAgICAgICAgICAgICQoJy5jX3NlbGxfbnVtX3dyYXAnKS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoJy5jX3NlbGxfbnVtX3dyYXAnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzZWxlY3RTaXplSXRlbTpmdW5jdGlvbihqcVRoaXMpeyBcclxuICAgICAgICB2YXIgdGhhdCA9IGRldGFpbCxcclxuICAgICAgICAgICAgc3RlcEljb24gPSAkKHRoYXQuVUkucHJlU3RlcEljb24pLFxyXG4gICAgICAgICAgICBwcmVCYXIgPSAkKHRoYXQuVUkucHJlQmFyKSxcclxuICAgICAgICAgICAgbGltdGVkTnVtcyA9IGpxVGhpcy5kYXRhKCdsaW1pdC1udW1zJyksXHJcbiAgICAgICAgICAgIHNlbGxOdW0gPSBqcVRoaXMuZGF0YSgnc2VsbC1udW0nKSxcclxuICAgICAgICAgICAgaXNTaG93U3RvY2sgPSBqcVRoaXMuZGF0YSgnaXMtc2hvdy1zdG9jay1udW1zJyksXHJcbiAgICAgICAgICAgIHN0b2NrTnVtcyA9IGpxVGhpcy5kYXRhKCdzdG9jay1udW1zJyksXHJcbiAgICAgICAgICAgIHByZVBlcmNlbnQgPSBqcVRoaXMuZGF0YSgncHJlLXBheS1wZXJjZW50JyksXHJcbiAgICAgICAgICAgIGZpbmFsUGVyY2VudCA9IGpxVGhpcy5kYXRhKCdmaW5hbC1wYXktcGVyY2VudCcpLFxyXG4gICAgICAgICAgICBwcmVQcmljZSA9IGpxVGhpcy5kYXRhKCdwcmUtcGF5LXByaWNlJyksXHJcbiAgICAgICAgICAgIGZpbmFsUHJpY2UgPSBqcVRoaXMuZGF0YSgnZmluYWwtcGF5bWVudCcpLFxyXG4gICAgICAgICAgICBkZWxpdmVyVGltZSA9IGpxVGhpcy5kYXRhKCdkZWxpdmVyeS10aW1lJyksXHJcbiAgICAgICAgICAgIHByZURlYWRsaW5lID0ganFUaGlzLmRhdGEoJ3ByZS1wYXktZW5kLXRpbWUnKSxcclxuICAgICAgICAgICAgZmluYWxEZWFkbGluZSA9IGpxVGhpcy5kYXRhKCdmaW5hbC1wYXktZW5kLXRpbWUnKSxcclxuICAgICAgICAgICAgc2FsZUxhc3RkYXkgPSBqcVRoaXMuZGF0YSgncHJlLXNhbGUtbGFzdC1kYXknKSxcclxuICAgICAgICAgICAgc2FsZVByb2dyZXNzID0ganFUaGlzLmRhdGEoJ3ByZS1zYWxlLXByb2dyZXNzJyksXHJcbiAgICAgICAgICAgIGRpc2NvdW50ID0ganFUaGlzLmRhdGEoJ2Rpc2NvdW50JyksXHJcbiAgICAgICAgICAgIHByaWNlID0ganFUaGlzLmRhdGEoJ3ByaWNlJykudG9GaXhlZCgyKSxcclxuICAgICAgICAgICAgb3JpZ2luUHJpY2UgPSBqcVRoaXMuZGF0YSgnb3JpZ2luLXByaWNlJykudG9GaXhlZCgyKSxcclxuICAgICAgICAgICAgaXNTZWNraWxsID0ganFUaGlzLmRhdGEoJ2lzLXNlY2tpbGwnKSxcclxuICAgICAgICAgICAgaXNTZWNGaW5pc2ggPSBqcVRoaXMuZGF0YSgnaXMtc2VjLWZpbmlzaCcpLFxyXG4gICAgICAgICAgICBza3VVcmwgPSBqcVRoaXMuZGF0YSgnc2t1LWZpZ3VyZScpLFxyXG4gICAgICAgICAgICBtaW5OdW1zID0ganFUaGlzLmRhdGEoJ21pbi1udW1zJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoYXQuVUkuc2l6ZUlwdCkudmFsKG1pbk51bXMpO1xyXG4gICAgICAgICAgICBpdGVtU2l6ZS5pbml0KHRoYXQuVUkuYWRkTWluKTtcclxuICAgICAgICAgICAgaXRlbVNpemUubWF4TnVtID0gbGltdGVkTnVtcztcclxuICAgICAgICAgICAgaXRlbVNpemUuaW5pdHN0YXR1cygpO1xyXG4gICAgICAgIC8v5Yik5patc2t154q25oCB44CB5Lu35qC844CB5bqT5a2Y5pi+56S644CB5Yid5aeL5YyW5pWw6YeP562JXHJcbiAgICAgICAgICAgICQodGhhdC5VSS5zdHlsZUl0ZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJChqcVRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGF0LlVJLm9yaWdpblByaWNlKS5odG1sKG9yaWdpblByaWNlKTtcclxuICAgICAgICAgICAgJCh0aGF0LlVJLm1vbmV5U2F2ZWQpLnRleHQoKG9yaWdpblByaWNlIC0gcHJpY2UpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkuc2VsbE51bSkudGV4dChzZWxsTnVtKTtcclxuICAgICAgICAgICAgaWYgKCBzdG9ja051bXMgPiAwICl7XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQuVUkucHJpY2VXcmFwKS5yZW1vdmVDbGFzcygnY19zYWxlX291dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYoIGlzU2hvd1N0b2NrID09IDEgKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoYXQuVUkuc3RvY2tOdW0pLnNob3coKS50ZXh0KCfvvIjliankvZnlupPlrZgnKyBzdG9ja051bXMgKyAn5Lu277yJJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiggaXNTaG93U3RvY2sgPT0gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhhdC5VSS5zdG9ja051bSkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQodGhhdC5VSS5wcmljZVdyYXApLmFkZENsYXNzKCdjX3NhbGVfb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICAkKGpxVGhpcykuYWRkQ2xhc3MoJ29mZicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLy/pl6rotK1cclxuICAgICAgICAgICAgaWYgKCBpc1NlY2tpbGw9PTEgJiYgaXNTZWNGaW5pc2ggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJChqcVRoaXMpLmFkZENsYXNzKCdvZmYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8v6aKE5ZSu5pe26Ze077yM5Lu35qC8XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5wcmVEZWFkbGluZSkudGV4dChwcmVEZWFkbGluZSk7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5maW5hbERlYWRsaW5lKS50ZXh0KGZpbmFsRGVhZGxpbmUpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkucHJlUHJpY2UpLnRleHQoJ++/pScrIHByZVByaWNlKTtcclxuICAgICAgICAgICAgJCh0aGF0LlVJLmZpbmFsUHJpY2UpLnRleHQoJ++/pScrIGZpbmFsUHJpY2UpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkucHJlUGVyY2VudCkudGV4dCgnKCAnICsgcHJlUGVyY2VudCArICclICknKTtcclxuICAgICAgICAgICAgJCggdGhhdC5VSS5maW5hbFBlcmNlbnQpLnRleHQoJyggJyArIGZpbmFsUGVyY2VudCsgJyUgKScpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkucHJlRGVhZGxpbmUpLnRleHQocHJlRGVhZGxpbmUpO1xyXG4gICAgICAgICAgICAkKHRoYXQuVUkuZmluYWxEZWFkbGluZSkuaHRtbCgn5pyA6L+fJytmaW5hbERlYWRsaW5lICsn5YmN5pSv5LuY5bC+5qy+Jyk7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5kZWxpdmVyVGlwKS5odG1sKGRlbGl2ZXJUaW1lICsgJ+WQjuaMieeFp+iuouWNlemhuuW6j+WPkei0pycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIHNhbGVMYXN0ZGF5ID4gMCApe1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLnByZVNhbGVIZCkuaHRtbCgn54Gr54Ot6aKE5ZSu5Lit77yM6L+Y5pyJIDxzcGFuIGNsYXNzPVwiY19hZHZhbmNlX2RheXNcIj4nICsgc2FsZUxhc3RkYXkgKyAn5aSpPC9zcGFuPiDnu5PmnZ/pooTllK4nKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQuVUkucHJlU2FsZUhkKS50ZXh0KCfpooTllK7lt7Lnu5PmnZ/vvIzor7fmlLbol4/nrYnlvoXlho3mrKHlvIDmlL7plIDllK4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8v5Lu35qC85LiN5bCP5LqO5Y6f5Lu35YiZ5LiN5pi+56S65Y6f5Lu344CB5LyY5oOg5Lu3XHJcbiAgICAgICAgICAgIGlmICggTnVtYmVyKHByaWNlKSA8PSBOdW1iZXIob3JpZ2luUHJpY2UpICkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLnByaWNlQmVuZWZpdCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLm9yaWdpblByaWNlKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLnByaWNlQmVuZWZpdCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLm9yaWdpblByaWNlKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvL+W3suWUruaVsOmHj1xyXG4gICAgICAgICAgICB2YXIgaXNTaG93c2VsbE51bSA9ICQoJy5jeWNfc3R5bGVfaXRlbS5hY3RpdmUnKS5kYXRhKCdpcy1zaG93LXNlbGxudW0nKTtcclxuICAgICAgICAgICAgaWYoaXNTaG93c2VsbE51bSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICQoJy5jX3NlbGxfbnVtX3dyYXAnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJCgnLmNfc2VsbF9udW1fd3JhcCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vc2t15Zu+54mHXHJcbiAgICAgICAgICAgIGlmIChza3VVcmwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd1NrdUltZyhza3VVcmwpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5GaWd1cmUgPSAkKHRoYXQuVUkubGFyZ2VQaWNBKS5maW5kKCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICQodGhhdC5VSS5sYXJnZVBpY0EpLmF0dHIoJ2hyZWYnLG9yaWdpbkZpZ3VyZS5kYXRhKCdvcmlnaW4tZmlndXJlJykpO1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luRmlndXJlLmF0dHIoJ3NyYycsb3JpZ2luRmlndXJlLmRhdGEoJ29yaWdpbi1maWd1cmUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvL+WIpOaWreaYr+WQpui1oOWTgVxyXG4gICAgICAgICAgICBpZih0aGF0LmRhdGEuaXNQcmVzZW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLnByaWNlTnVtKS5odG1sKCfpnZ7ljZblk4EnKTtcclxuICAgICAgICAgICAgICAgICQodGhhdC5VSS5zdHlsZUl0ZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnY19zdHlsZV9pdGVtX2Rpc2FibGUnKTtcclxuICAgICAgICAgICAgICAgIC8v6Kej57uR5LqL5Lu277yM56aB5q2i54K55Ye7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIHRoYXQuc2VsZWN0U3R5bGVIYW5kbGVyKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQuVUkucHJpY2VOdW0pLmh0bWwoJyZ5ZW47JytwcmljZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGRUb0NhcnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IGRldGFpbDtcclxuICAgICAgICB2YXIgc2t1SWQgPSAkKHRoYXQuVUkuc3R5bGVJdGVtKycuYWN0aXZlJykuZGF0YSgnc2t1LWlkJyk7XHJcbiAgICAgICAgdmFyIG51bSA9ICQodGhhdC5VSS5zaXplSXB0KS52YWwoKTtcclxuICAgICAgICBpZighc2t1SWQpIHtcclxuICAgICAgICAgICAgbGF5ZXIub3Blbih7Y29udGVudDon6K+36YCJ5oup5qy+5byPJ30pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJ2J1eS5waHA/Yz1jYXJ0JmE9YWRkJyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCAgXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHRoYXQuZGF0YS5waWQsIFxyXG4gICAgICAgICAgICAgICAgc2t1X2lkOiBza3VJZCwgXHJcbiAgICAgICAgICAgICAgICBudW1zOiBudW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuY29kZSA9PSAyMDAyKXtcclxuICAgICAgICAgICAgICAgIGxvZ2luLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJSZWcnOnRoYXQuVUkuaGVhZGVyUmVnLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJMb2dpbic6dGhhdC5VSS5oZWFkZXJMb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAnbG9nUmVnV3JhcCc6dGhhdC5VSS5sb2dSZWdXcmFwLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgfSx0aGF0LnN1Y2Nlc3NDYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBpY0ZseSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxheWVyLm9wZW4oe2NvbnRlbnQ6ZGF0YS5yZXN1bHR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcGljRmx5OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSBkZXRhaWw7XHJcbiAgICAgICAgdmFyIHN0YXJ0VG9wID0gJCh0aGF0LlVJLmFkZENhcnQpLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgc3RhcnRMZWZ0ID0gJCh0aGF0LlVJLmFkZENhcnQpLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgIGVuZFRvcCA9ICQodGhhdC5VSS5oZWFkQ2FydCkub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICBlbmRMZWZ0ID0gJCh0aGF0LlVJLmhlYWRDYXJ0KS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICAkKCc8aW1nIGlkPVwiY3ljX2ZseV9pY29uXCIgc3JjPScrJCgnI2ZseUljb25VcmwnKS52YWwoKSsnPicsIHsnY2xhc3MnOiAncGljZmx5J30pXHJcbiAgICAgICAgICAgIC5jc3MoeyB0b3A6IHN0YXJ0VG9wLGxlZnQ6IHN0YXJ0TGVmdCAscG9zaXRpb246J2Fic29sdXRlJ30pXHJcbiAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXHJcbiAgICAgICAgICAgIC5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgeyB0b3A6IGVuZFRvcCwgbGVmdDogZW5kTGVmdCwgb3BhY2l0eTogJzAuOSd9LFxyXG4gICAgICAgICAgICAgICAgNzAwLCBcclxuICAgICAgICAgICAgICAgICdzd2luZycsIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnYnV5LnBocD9jPWNhcnQmYT1nZXRTa3VDb3VudHMnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICQodGhhdC5VSS5oZWFkQ2FydE51bXMpLnNob3coKS50ZXh0KGRhdGEucmVzdWx0KTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3NDYiA6IGZ1bmN0aW9uKG9wdCl7XHJcbiAgICAgICAgJChvcHQuaGVhZGVyUmVnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKG9wdC5oZWFkZXJMb2dpbikucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGFyciA9IFsnPGEgaHJlZj1cImkucGhwXCIgY2xhc3M9XCJjeWNfdG9vbHNfaXRlbVwiIHRhcmdldD1cIl9ibGFua1wiPueUqOaIt+S4reW/gzwvYT4nLCc8YSBocmVmPVwiaS5waHA/Yz1sb2dpbiZhPWxvZ291dD9jPWxvZ2luJmE9bG9nb3V0XCIgY2xhc3M9XCJjeWNfdG9vbHNfaXRlbVwiID7pgIDlh7o8L2E+J107XHJcbiAgICAgICAgJChvcHQubG9nUmVnV3JhcCkuYXBwZW5kKGFyci5qb2luKCcnKSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5pS26JeP5ZWG5ZOBXHJcbiAgICBmYXZQcm9kdWN0OmZ1bmN0aW9uKHBpZCxmYXYpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gZGV0YWlsO1xyXG4gICAgICAgIHZhciB1cmwgPSAhZmF2PyAnaW5kZXgucGhwP2M9ZmF2JmE9YWRkUHJvZHVjdCc6J2luZGV4LnBocD9jPWZhdiZhPWRlbGV0ZVByb2R1Y3QnO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHBpZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihkYXRhLmNvZGU9PTIwMCl7XHJcbiAgICAgICAgICAgICAgICAkKCcjY19jb21tX2RpYWxvZ19tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNfY29tbV9kaWFsb2cnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93LnNjcm9sbFkrMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6JzQ1JSdcclxuICAgICAgICAgICAgICAgIH0pLnNob3coKTsgXHJcbiAgICAgICAgICAgICAgICAkKCcjY19jb21tX2RpYWxvZ19pY29uJykuYWRkQ2xhc3MoJ2NvbW1fcmlnaHRfaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmN5Y19jb21tX2RpYWxvZ190ZXh0JykudGV4dChkYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNGYXYgPSBwYXJzZUludChmYXYpPzA6MTtcclxuICAgICAgICAgICAgICAgICQodGhhdC5VSS5mYXZQcm9kdWN0KS5kYXRhKCdmYXYnLGlzRmF2KTtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJ+aUtuiXjyc7XHJcbiAgICAgICAgICAgICAgICBpZihpc0Zhdil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICflj5bmtojmlLbol48nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGF0LlVJLmZhdlByb2R1Y3QpLnRleHQodGV4dCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuY29kZT09MzAwMSB8fCBkYXRhLmNvZGU9PTIwMDIgKXtcclxuICAgICAgICAgICAgICAgIGxvZ2luLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJSZWcnOnRoYXQuVUkuaGVhZGVyUmVnLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJMb2dpbic6dGhhdC5VSS5oZWFkZXJMb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAnbG9nUmVnV3JhcCc6dGhhdC5VSS5sb2dSZWdXcmFwLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgfSx0aGF0LnN1Y2Nlc3NDYik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJCgnI2NfY29tbV9kaWFsb2dfbWFzaycpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyNjX2NvbW1fZGlhbG9nX2ljb24nKS5hZGRDbGFzcygnY29tbV93YXJtX2ljb24nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jeWNfY29tbV9kaWFsb2dfdGV4dCcpLnRleHQoZGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI2NfY29tbV9kaWFsb2dfbWFzaycpLnNob3coKTtcclxuICAgICAgICAgICAgJCgnI2NfY29tbV9kaWFsb2dfaWNvbicpLmFkZENsYXNzKCdjb21tX3dhcm1faWNvbicpO1xyXG4gICAgICAgICAgICAkKCcuY3ljX2NvbW1fZGlhbG9nX3RleHQnKS50ZXh0KCfllYrlk6bvvIznvZHnu5zplJnor6/vvIzor7fnqI3lkI7lho3or5UnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXRDb3Vwb246IGZ1bmN0aW9uKGNvdXBvbklkKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNvdXBvblVybCA9IHRoYXQuVXJsLmNvdXBvblVybDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGNvdXBvblVybCxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjb3Vwb25fYWN0X2lkOiBjb3Vwb25JZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24ocnRuRGF0YSkge1xyXG4gICAgICAgICAgIGlmKCBydG5EYXRhLmNvZGU9PTIwMDIgKXtcclxuICAgICAgICAgICAgICAgIGxvZ2luLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJSZWcnOnRoYXQuVUkuaGVhZGVyUmVnLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJMb2dpbic6dGhhdC5VSS5oZWFkZXJMb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAnbG9nUmVnV3JhcCc6dGhhdC5VSS5sb2dSZWdXcmFwLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgfSx0aGF0LnN1Y2Nlc3NDYik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogcnRuRGF0YS5yZXN1bHRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfpooblj5blpLHotKXvvIzor7fph43mlrDlho3or5UnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzaG93U2t1SW1nOiBmdW5jdGlvbiAoc2t1VXJsKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBsYXJnZVBpY0EgPSAkKHRoYXQuVUkubGFyZ2VQaWNBKTtcclxuICAgICAgICB2YXIgbGFyZ2VQaWMgPSBsYXJnZVBpY0EuZmluZCgnaW1nJyk7XHJcbiAgICAgICAgbGFyZ2VQaWNBLmF0dHIoJ2hyZWYnLHNrdVVybCk7XHJcbiAgICAgICAgbGFyZ2VQaWMuYXR0cignc3JjJywgc2t1VXJsKTtcclxuICAgIH0sXHJcbiAgICByZWNvcmRQcm9kdWN0SWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHN0b3JlZFBpZCA9IHN0b3JlLmdldCgncHJvZHVjdF9pZCcpO1xyXG4gICAgICAgIGlmICggc3RvcmVkUGlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIHBpZHMgPSBbXTtcclxuICAgICAgICAgICAgcGlkcy5wdXNoKHRoYXQuZGF0YS5waWQpO1xyXG4gICAgICAgICAgICBzdG9yZS5zZXQoJ3Byb2R1Y3RfaWQnLCBwaWRzKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGVxdWFsVmFsdWUgPSB0aGF0LmVxdWFsQ29tcGFyZShzdG9yZWRQaWQsIHRoYXQuZGF0YS5waWQpOy8v5Yik5pat5piv5ZCm6K6w5b2V6L+H5LqGXHJcbiAgICAgICAgICAgIGlmIChlcXVhbFZhbHVlID09ICdlcXVhbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmKCBzdG9yZWRQaWQubGVuZ3RoID49IDIwICkgey8v6ZW/5bqm5Li6MjDnmoRwaWTpmJ/liJdcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZWRQaWQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlkcyA9IHN0b3JlZFBpZDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlkcyA9IHRoYXQuZGVsQXJyYXlFbGVtZW50KHN0b3JlZFBpZCwgZXF1YWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGlkcy51bnNoaWZ0KHRoYXQuZGF0YS5waWQpO1xyXG4gICAgICAgICAgICBzdG9yZS5zZXQoJ3Byb2R1Y3RfaWQnLCBwaWRzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXF1YWxDb21wYXJlOiBmdW5jdGlvbiAoIGFycmF5LCBwaWQgKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PSBwaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gJ2VxdWFsJztcclxuICAgIH0sXHJcbiAgICBkZWxBcnJheUVsZW1lbnQ6IGZ1bmN0aW9uIChhcnJheSwgaSkge1xyXG4gICAgICAgIGFycmF5ID0gYXJyYXkuc2xpY2UoMCxpKS5jb25jYXQoYXJyYXkuc2xpY2UoaSsxKSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59XHJcbmRldGFpbC5pbml0KCk7XHJcblxyXG4iLCIvKipcclxuICog5LyqYeagh+etvuKApuKApuayoWhyZWbnmoRcclxuICogQHR5cGUge3tpbml0OiBpbml0fX1cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDpmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5jX2Zha2VfYScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IiwidmFyIGl0ZW1TaXplID0ge1xyXG5cdGNvbnRhaW5lcjpudWxsLFxyXG5cdG1pbjpudWxsLFxyXG5cdGFkZDpudWxsLFxyXG5cdGlwdDpudWxsLFxyXG5cdG1pbk51bTowLFxyXG5cdG1heE51bTowLFxyXG5cdHZhbDowLFxyXG5cdGluaXQ6ZnVuY3Rpb24oY29udGFpbmVySWQpe1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSAkKGNvbnRhaW5lcklkKTtcclxuXHRcdHRoaXMubWluID0gdGhpcy5jb250YWluZXIuZmluZCgnLmN5Y19zaXplX21pbicpO1xyXG5cdFx0dGhpcy5hZGQgPSB0aGlzLmNvbnRhaW5lci5maW5kKCcuY3ljX3NpemVfYWRkJyk7XHJcblx0XHR0aGlzLmlwdCA9IHRoaXMuY29udGFpbmVyLmZpbmQoJy5jeWNfc2l6ZV9pcHQnKTtcclxuXHRcdHRoaXMudmFsID0gdGhpcy5taW5OdW0gPSB0aGlzLmlwdC52YWwoKTtcclxuXHRcdHRoaXMubWluLmFkZENsYXNzKCdjeWNfY2hvb3NlX2xpbWl0Jyk7XHJcblx0XHR0aGlzLnVuYmluZCgpO1xyXG5cdFx0dGhpcy5iaW5kKCk7XHJcblx0XHR0aGlzLmluaXRzdGF0dXMoKTtcclxuXHR9LFxyXG5cdGJpbmQ6ZnVuY3Rpb24oKXtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdCQoJy5jeWNfc2l6ZV9taW4nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCQodGhpcykuaGFzQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKSlyZXR1cm47XHJcblx0XHRcdHRoYXQudmFsLS07XHJcblx0XHRcdGlmKHRoYXQudmFsIDw9IHRoYXQubWluTnVtICl7XHJcblx0XHRcdFx0dGhhdC5taW4uYWRkQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhhdC5hZGQucmVtb3ZlQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKTtcclxuXHRcdFx0XHR0aGF0Lm1pbi5yZW1vdmVDbGFzcygnY3ljX2Nob29zZV9saW1pdCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoYXQuaXB0LnZhbCh0aGF0LnZhbCk7XHJcblx0XHR9KTtcclxuXHRcdCQoJy5jeWNfc2l6ZV9hZGQnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCQodGhpcykuaGFzQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKSlyZXR1cm47XHJcblx0XHRcdHRoYXQudmFsKys7XHJcblx0XHRcdHRoYXQuaXB0LnZhbCh0aGF0LnZhbCk7XHJcblx0XHRcdGlmKHRoYXQudmFsID4gdGhhdC5tYXhOdW0pe1xyXG5cdFx0XHRcdHRoYXQuYWRkLmFkZENsYXNzKCdjeWNfY2hvb3NlX2xpbWl0Jyk7XHJcblx0XHRcdH1lbHNlIGlmKHRoYXQudmFsID49IHRoYXQubWluTnVtKXtcclxuXHRcdFx0XHR0aGF0LmFkZC5yZW1vdmVDbGFzcygnY3ljX2Nob29zZV9saW1pdCcpO1xyXG5cdFx0XHRcdHRoYXQubWluLnJlbW92ZUNsYXNzKCdjeWNfY2hvb3NlX2xpbWl0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSxcclxuXHR1bmJpbmQ6ZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5jeWNfc2l6ZV9hZGQnKS5vZmYoJ2NsaWNrJyk7XHJcblx0XHQkKCcuY3ljX3NpemVfbWluJykub2ZmKCdjbGljaycpO1xyXG5cdH0sXHJcblx0aW5pdHN0YXR1czpmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHZhbCA9IHRoaXMuaXB0LnZhbCgpO1xyXG5cdFx0aWYodmFsIDw9IHRoaXMubWluTnVtKXtcclxuXHRcdFx0dGhpcy5taW4uYWRkQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLm1pbi5yZW1vdmVDbGFzcygnY3ljX2Nob29zZV9saW1pdCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYodmFsID49IHRoaXMubWF4TnVtKXtcclxuXHRcdFx0dGhpcy5hZGQuYWRkQ2xhc3MoJ2N5Y19jaG9vc2VfbGltaXQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLmFkZC5yZW1vdmVDbGFzcygnY3ljX2Nob29zZV9saW1pdCcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGl0ZW1TaXplOyIsInZhciBsb2dpbiA9IHtcclxuXHRoZWlnaHQ6MCxcclxuXHR3aWR0aDowLFxyXG5cdHRhYldyYXA6bnVsbCxcclxuXHRzdWNjZXNzQ2I6bnVsbCxcclxuXHRtc2djb2RlOm51bGwsXHJcblx0b3B0Om51bGwsXHJcblx0aXNJbml0OmZhbHNlLFxyXG5cdGluaXQ6ZnVuY3Rpb24ob3B0LGNiKXtcclxuXHRcdC8vIGluaXQg55qE5pe25YCZ5YiG5Lik5Liq5q2l6aqk44CCIDHkuKrorqHnrpfmkYbmlL7kvY3nva4gMuWvuXRhYuWIneWni+WMliAzIOWxleekuuWHuuadpVxyXG5cdFx0dmFyIHdpbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblx0XHRpZighdGhpcy5pc0luaXQpe1xyXG5cdFx0XHR0aGlzLmlzSW5pdCA9IHRydWU7XHJcblx0XHRcdHRoaXMub3B0ID0gb3B0O1xyXG5cdFx0XHR0aGlzLnRhYldyYXAgPSAkKCcjY190YWJfd3JhcCcpO1xyXG5cdFx0XHR0aGlzLndpZHRoID0gdGhpcy50YWJXcmFwLm91dGVyV2lkdGgoKTtcclxuXHRcdFx0dGhpcy5oZWlnaHQgPSB0aGlzLnRhYldyYXAub3V0ZXJIZWlnaHQoKTtcclxuXHRcdFx0dGhpcy50YWJXcmFwLmNzcyh7XHJcblx0XHRcdFx0bGVmdDood2luV2lkdGgtdGhpcy5oZWlnaHQpLzIsXHJcblx0XHRcdFx0dG9wOndpbmRvdy5zY3JvbGxZICsgNTBcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuc3VjY2Vzc0NiID0gY2I7XHJcblx0ICAgICAgICB0aGlzLmluaXRTdGF0dXMoKTtcclxuXHQgICAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xyXG5cdCAgICAgICAgdGhpcy5jdXNFdmVudCgpO1xyXG5cdCAgICAgICAgdGhpcy5tc2djb2RlLmluaXQoJCgnI2NfZ2V0X3Ntc19jb2RlJyksJ2kucGhwP2M9bG9naW4mYT1yZWdTbXNWZXJpZnknKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICBcdHRoaXMudGFiV3JhcC5jc3Moe1xyXG5cdFx0XHRcdGxlZnQ6KHdpbldpZHRoLXRoaXMuaGVpZ2h0KS8yLFxyXG5cdFx0XHRcdHRvcDp3aW5kb3cuc2Nyb2xsWSArIDUwXHJcblx0XHRcdH0pO1xyXG4gICAgICAgIFx0JCgnI2NfZGlhX21hc2snKS5zaG93KCk7XHJcblx0XHRcdCQoJyNjX3RhYl93cmFwJykuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcHQudHlwZSAmJiAkKCcjdGFiXycrb3B0LnR5cGUrJ190aXRsZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgIC8vd2VjaGF0IGxvZ2luXHJcbiAgICAgICAgdGhpcy53ZWNoYXRMb2dpbigpO1xyXG4gICAgICAgIFxyXG5cdH0sXHJcblx0Y3VzRXZlbnQ6ZnVuY3Rpb24oKXtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCcuZGlhX2Nsb3NlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcjY19kaWFfbWFzaycpLmhpZGUoKTtcclxuXHRcdFx0JCgnI2NfdGFiX3dyYXAnKS5oaWRlKCk7XHJcblx0XHR9KS5vbignY2xpY2snLCcuaXB0X2xhYmVsJyxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIganFUaGlzID0gJCh0aGlzKS5zaWJsaW5ncygnLmlwdCcpO1xyXG5cdFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdGpxVGhpcy5zaWJsaW5ncygnbGFiZWwnKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5kcmVkLicranFUaGlzLmF0dHIoJ2lkJykrJ19sYWJlbCcpLmhpZGUoKTtcclxuXHRcdFx0anFUaGlzLmZvY3VzKCk7XHJcblx0XHR9KS5vbignZm9jdXMnLCdpbnB1dC5pcHQnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBqcVRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdGpxVGhpcy5zaWJsaW5ncygnbGFiZWwnKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5kcmVkLicranFUaGlzLmF0dHIoJ2lkJykrJ19sYWJlbCcpLmhpZGUoKTtcdFxyXG5cdFx0fSkub24oJ2JsdXInLCdpbnB1dC5pcHQnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBqcVRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHRpZigganFUaGlzLnZhbCgpID09ICcnKXtcclxuXHRcdFx0XHRqcVRoaXMuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdFx0anFUaGlzLnNpYmxpbmdzKCdsYWJlbCcpLnNob3coKTtcclxuXHRcdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGpxVGhpcy5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuXHRcdFx0XHRqcVRoaXMuc2libGluZ3MoJ2xhYmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdCQoJy5kcmVkLicranFUaGlzLmF0dHIoJ2lkJykrJ19sYWJlbCcpLmhpZGUoKTtcclxuXHRcdFx0fSBcclxuXHRcdH0pLm9uKCdjbGljaycsJyNsb2dfYnRuJyxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW1zID0ge307XHJcblx0ICAgICAgICBwYXJhbXMucGhvbmUgPSAkKCcjY191c2VyX25hbWUnKS52YWwoKTtcclxuXHQgICAgICAgIHBhcmFtcy5jYXB0Y2hhID0gJCgnI2NfbG9nX3ZlcmlmeScpLnZhbCgpO1xyXG5cdCAgICAgICAgcGFyYW1zLnBhc3N3b3JkID0gJCgnI2NfdXNlcl9wc3cnKS52YWwoKTtcclxuXHQgICAgICAgIHBhcmFtcy5yZW1lbWJlciA9ICQoJyNyZW1lbWJlcicpLnZhbCgpO1xyXG5cdCAgICAgICAgaWYgKHBhcmFtcy5waG9uZSA9PSAnJykgeyBhbGVydCgn6K+35aGr5YaZ55So5oi35ZCNJyk7IHJldHVybiBmYWxzZTsgfTtcclxuXHQgICAgICAgIGlmIChwYXJhbXMucGFzc3dvcmQgPT0gJycpIHsgYWxlcnQoJ+ivt+Whq+WGmeWvhueggScpOyByZXR1cm4gZmFsc2U7IH07XHJcblx0ICAgICAgICBpZiAocGFyYW1zLmNhcHRjaGEgPT0gJycpIHsgYWxlcnQoJ+ivt+Whq+WGmemqjOivgeeggScpOyByZXR1cm4gZmFsc2U7IH07XHJcblx0ICAgICAgICAkLmFqYXgoeyAgXHJcblx0ICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsICBcclxuXHQgICAgICAgICAgICB1cmw6ICdpLnBocD9jPWxvZ2luJmE9Y2hlY2tMb2dpbiZpc19hamF4PTEnLCAgXHJcblx0ICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLCAgXHJcblx0ICAgICAgICAgICAgZGF0YToge1xyXG5cdCAgICAgICAgICAgICAgICBjeWNhbmdfdXNlcjogcGFyYW1zLnBob25lLFxyXG5cdCAgICAgICAgICAgICAgICBjYXB0Y2hhOiBwYXJhbXMuY2FwdGNoYSxcclxuXHQgICAgICAgICAgICAgICAgY3ljYW5nX3B3ZDogcGFyYW1zLnBhc3N3b3JkLFxyXG5cdCAgICAgICAgICAgICAgICByZW1lbWJlcjogcGFyYW1zLnJlbWVtYmVyXHJcblx0ICAgICAgICAgICAgfSwgIFxyXG5cdCAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJldCl7XHJcblx0ICAgICAgICAgICAgICAgIGlmKHJldC5jb2RlID09IDIwMCl7XHJcblx0ICAgICAgICAgICAgICAgIFx0aWYodGhhdC5zdWNjZXNzQ2Ipe1xyXG5cdCAgICAgICAgICAgICAgICBcdFx0YWxlcnQoJ+eZu+W9leaIkOWKnyzlj6/ku6XkubDkubDkubDllaYoIO+8ns+J77ycKSEhIScpO1xyXG5cdCAgICAgICAgICAgICAgICBcdFx0JCgnLmRpYV9jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0ICAgICAgICAgICAgICAgIFx0XHR0aGF0LnN1Y2Nlc3NDYih0aGF0Lm9wdCk7XHJcblx0ICAgICAgICAgICAgICAgIFx0fWVsc2V7XHJcblx0ICAgICAgICAgICAgICAgIFx0XHQkKCcjY19kaWFfbWFzaycpLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjY190YWJfd3JhcCcpLmhpZGUoKTtcclxuXHQgICAgICAgICAgICAgICAgXHR9XHRcclxuXHQgICAgICAgICAgICAgICAgfWVsc2V7XHJcblx0ICAgICAgICAgICAgICAgICAgICBhbGVydChyZXQucmVzdWx0KTtcclxuXHQgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgIH0sXHJcblx0ICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbihyZXQpeyAgICAgIFxyXG5cdCAgICAgICAgICAgICAgICBhbGVydCgn5pyq55+l6ZSZ6K+v77yM6K+36YeN5paw5bCd6K+VJyk7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfSk7XHJcblx0XHR9KS5vbignY2xpY2snLCcudmVyaWZ5X2ltZycsZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdzcmMnLCdpLnBocD9jPWxvZ2luJmE9Y2FwdGNoYScpO1xyXG5cdFx0fSkub24oJ2NsaWNrJywnI3RhYl9sb2dpbl90aXRsZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLmxvZ19mb3JtX3dyYXAgLnZlcmlmeV9pbWcnKS5hdHRyKCdzcmMnLCdpLnBocD9jPWxvZ2luJmE9Y2FwdGNoYScpO1xyXG5cdFx0fSkub24oJ2NsaWNrJywnI3RhYl9yZWdfdGl0bGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5yZWdfZm9ybV93cmFwIC52ZXJpZnlfaW1nJykuYXR0cignc3JjJywnaS5waHA/Yz1sb2dpbiZhPWNhcHRjaGEnKTtcclxuXHRcdH0pLm9uKCdjbGljaycsJyNyZWdfYnRuJyxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGhvbmUgPSAkKCcjY19yZWdfbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGNoYSA9ICQoJyNjX3JlZ19pbWdfdmVyaWZ5JyksXHJcbiAgICAgICAgICAgICAgICBzbXNfdmVyaWZ5ID0gJCgnI2NfcmVnX3Ntc19jb2RlJyksXHJcbiAgICAgICAgICAgICAgICBwd2QgPSAkKCcjY19yZWdfcHN3JyksXHJcbiAgICAgICAgICAgICAgICByZXB3ZCA9JCgnI2NfcmVnX2NvbmZpcm1fcHN3JyksXHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0Y2hhOiBjYXB0Y2hhLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtc192ZXJpZnk6IHNtc192ZXJpZnkudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY3ljYW5nX3B3ZDogcHdkLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN5Y2FuZ19yZXB3ZDogcmVwd2QudmFsKClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0Lk5vdEJsYW5rKFsnI2NfcmVnX25hbWUnLCAnI2NfcmVnX2ltZ192ZXJpZnknLCAnI2NfcmVnX3Ntc19jb2RlJywgJyNjX3JlZ19wc3cnLCAnI2NfcmVnX2NvbmZpcm1fcHN3J10pKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwd2QudmFsKCkgIT09IHJlcHdkLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+S4pOasoeWvhueggeS4jeebuOWQjCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQuYWpheCh7ICBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIiwgIFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2kucGhwP2M9bG9naW4mYT1yZWdpc3RlcicsICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsICBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRpZih0aGF0LnN1Y2Nlc3NDYil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHRhbGVydCgn55m75b2V5oiQ5YqfLOWPr+S7peS5sOS5sOS5sOWVpigg77yez4nvvJwpISEhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0XHQkKCcuZGlhX2Nsb3NlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdHRoYXQuc3VjY2Vzc0NiKHRoYXQub3B0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHR9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdCQoJyNjX2RpYV9tYXNrJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0JCgnI2NfdGFiX3dyYXAnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmV0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24ocmV0KXsgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+acquefpemUmeivr++8jOivt+mHjeaWsOWwneivlScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9KVxyXG5cdH0sXHJcblx0Tm90Qmxhbms6ZnVuY3Rpb24oYXJyYXkpe1xyXG5cdFx0IHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IGxlbjsgaSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgdmFyIGRvbSA9ICQoYXJyYXlbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGRvbS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkb20uZGF0YSgndGV4dCcpKyfkuI3og73kuLrnqbonKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuXHR9LFxyXG5cdGluaXRTdGF0dXM6ZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNjX2RpYV9tYXNrJykuc2hvdygpO1xyXG5cdFx0JCgnI2NfdGFiX3dyYXAnKS5zaG93KCk7XHJcbiAgICAgICAgdmFyIGFUYWJCb2R5cyA9ICQoJyN0YWJzX2JvZHkgPiBkaXYnKTtcclxuICAgICAgICAkKCcjdGFicyA+IGEnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdvbicpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoKTtcclxuICAgICAgICAgICAgICAgIGFUYWJCb2R5cy5oaWRlKCkuZXEoaW5kZXgpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vIGFUYWJCb2R5cy5lcShpbmRleCkuZmluZCgnLnZlcmlmeV9pbWcnKS5hdHRyKCdzcmMnLCdpLnBocD9jPWxvZ2luJmE9Y2FwdGNoYScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCdpbnB1dC5pcHQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHR2YXIganFUaGlzID0gJCh0aGlzKTtcclxuICAgICAgICBcdGlmKGpxVGhpcy52YWwoKSAhPSAnJyl7XHJcbiAgICAgICAgXHRcdGpxVGhpcy5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuXHRcdFx0XHRqcVRoaXMuc2libGluZ3MoJ2xhYmVsJykuaGlkZSgpO1xyXG5cdFx0XHRcdCQoJy5kcmVkLicranFUaGlzLmF0dHIoJ2lkJykrJ19sYWJlbCcpLmhpZGUoKTtcclxuICAgICAgICBcdH1lbHNle1xyXG4gICAgICAgIFx0XHRqcVRoaXMuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcblx0XHRcdFx0anFUaGlzLnNpYmxpbmdzKCdsYWJlbCcpLnNob3coKTtcclxuXHRcdFx0XHQkKCcuZHJlZC4nK2pxVGhpcy5hdHRyKCdpZCcpKydfbGFiZWwnKS5zaG93KCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgfSk7XHJcblx0fSxcclxuXHRpbml0UGx1Z2luOmZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1zZ2NvZGUgPSB7XHJcbiAgICAgICAgICAgIGVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpcHM6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKGxpbmspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHRpZighdGhhdC5lbC5oYXNDbGFzcygnYnRuLWdyYXknKSl7XHJcblx0ICAgICAgICAgICAgICAgICAgIFx0dmFyIHZhbCA9ICQoJyNjX3JlZ19uYW1lJykudmFsKCk7XHJcblx0ICAgICAgICAgICAgICAgICAgIFx0dmFyIGltZ1ZlcmlmeSA9ICQoJyNjX3JlZ19pbWdfdmVyaWZ5JykudmFsKCk7XHJcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbCkge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfmiYvmnLrlj7fnoIHkuI3og73kuLrnqbonKTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuXHQgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICghaW1nVmVyaWZ5KSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+WbvuW9oumqjOivgeeggeS4jeiDveS4uuepuicpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG5cdCAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGxpbmssXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsICBcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB2YWwsXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRjaGE6IGltZ1ZlcmlmeVxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy/mnaHku7ZcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmNvZGUgPT0gMjAwKSB7IFxyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLnJlc3VsdCk7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWwuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5hZGRDbGFzcygnYnRuLWdyYXknKS5jc3MoJ2N1cnNvcicsICdub3QtYWxsb3dlZCcpO1xyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvdW50RG93bihmdW5jdGlvbigpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWwudmFsKCfojrflj5bpqozor4HnoIEnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdidG4tZ3JheScpLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI2VkM2YzZicpXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEucmVzdWx0KTtcclxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHR9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oZWwsbGluaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy50aXBzID0gdGlwc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kKGxpbmspO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb3VudERvd246IGZ1bmN0aW9uKGNiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSA2MDtcclxuXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gZmNvdW50KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvdW50IDwgMCkgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHRjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIFx0dGhhdC5lbC50ZXh0KCfph43mlrDojrflj5YnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBcdHRoYXQuZWwudGV4dCgn6YeN5paw6I635Y+WKCcrIGNvdW50LS0gKyAnKScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWwuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjQ0NDJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmY291bnQsIDEwMDApXHJcbiAgICAgICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdH0sXHJcbiAgICB3ZWNoYXRMb2dpbjogZnVuY3Rpb24oKXtcclxuICAgIFx0JCgnLmljb25fd2VjaGF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIFx0XHR2YXIgb2JqID0gbmV3IFd4TG9naW4oe1xyXG5cdFx0XHRcdGlkOiBcIndlY2hhdF9sb2dpbl9jb250YWluZXJcIixcclxuXHRcdFx0XHRhcHBpZDogXCJ3eGM0NzVhM2YxZTU1ZjU0MmFcIixcclxuXHRcdFx0XHRzY29wZTogXCJzbnNhcGlfbG9naW5cIixcclxuXHRcdFx0XHRyZWRpcmVjdF91cmk6IFwiaHR0cHM6Ly9jeWNhbmcuY29tL3dlY2hhdF9sb2dpbl9jYWxsYmFjay5waHBcIixcclxuXHRcdFx0XHRzdGF0ZTogXCJcIixcclxuXHRcdFx0XHRzdHlsZTogXCJcIixcclxuXHRcdFx0XHRocmVmOiBcIlwiXHJcblx0XHRcdH0pO1xyXG4gICAgXHRcdCQoJy50YWJzX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgXHRcdCQoJy5jX3dlY2hhdF9sb2dpbl9ib3gnKS5mYWRlSW4oKTtcclxuICAgIFx0fSk7XHRcclxuICAgIFx0JCgnLmNfd2VjaGF0X2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcuY193ZWNoYXRfbG9naW5fYm94JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdFx0JCgnLnRhYnNfY29udGVudCcpLmZhZGVJbigpO1xyXG5cdFx0fSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luOyIsIi8qIWFydC10ZW1wbGF0ZSAtIFRlbXBsYXRlIEVuZ2luZSB8IGh0dHA6Ly9hdWkuZ2l0aHViLmNvbS9hcnRUZW1wbGF0ZS8qL1xyXG4hZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiBhLnJlcGxhY2UodCxcIlwiKS5yZXBsYWNlKHUsXCIsXCIpLnJlcGxhY2UodixcIlwiKS5yZXBsYWNlKHcsXCJcIikucmVwbGFjZSh4LFwiXCIpLnNwbGl0KHkpfWZ1bmN0aW9uIGIoYSl7cmV0dXJuXCInXCIrYS5yZXBsYWNlKC8oJ3xcXFxcKS9nLFwiXFxcXCQxXCIpLnJlcGxhY2UoL1xcci9nLFwiXFxcXHJcIikucmVwbGFjZSgvXFxuL2csXCJcXFxcblwiKStcIidcIn1mdW5jdGlvbiBjKGMsZCl7ZnVuY3Rpb24gZShhKXtyZXR1cm4gbSs9YS5zcGxpdCgvXFxuLykubGVuZ3RoLTEsayYmKGE9YS5yZXBsYWNlKC9cXHMrL2csXCIgXCIpLnJlcGxhY2UoLzwhLS1bXFx3XFxXXSo/LS0+L2csXCJcIikpLGEmJihhPXNbMV0rYihhKStzWzJdK1wiXFxuXCIpLGF9ZnVuY3Rpb24gZihiKXt2YXIgYz1tO2lmKGo/Yj1qKGIsZCk6ZyYmKGI9Yi5yZXBsYWNlKC9cXG4vZyxmdW5jdGlvbigpe3JldHVybiBtKyssXCIkbGluZT1cIittK1wiO1wifSkpLDA9PT1iLmluZGV4T2YoXCI9XCIpKXt2YXIgZT1sJiYhL149Wz0jXS8udGVzdChiKTtpZihiPWIucmVwbGFjZSgvXj1bPSNdP3xbXFxzO10qJC9nLFwiXCIpLGUpe3ZhciBmPWIucmVwbGFjZSgvXFxzKlxcKFteXFwpXStcXCkvLFwiXCIpO25bZl18fC9eKGluY2x1ZGV8cHJpbnQpJC8udGVzdChmKXx8KGI9XCIkZXNjYXBlKFwiK2IrXCIpXCIpfWVsc2UgYj1cIiRzdHJpbmcoXCIrYitcIilcIjtiPXNbMV0rYitzWzJdfXJldHVybiBnJiYoYj1cIiRsaW5lPVwiK2MrXCI7XCIrYikscihhKGIpLGZ1bmN0aW9uKGEpe2lmKGEmJiFwW2FdKXt2YXIgYjtiPVwicHJpbnRcIj09PWE/dTpcImluY2x1ZGVcIj09PWE/djpuW2FdP1wiJHV0aWxzLlwiK2E6b1thXT9cIiRoZWxwZXJzLlwiK2E6XCIkZGF0YS5cIithLHcrPWErXCI9XCIrYitcIixcIixwW2FdPSEwfX0pLGIrXCJcXG5cIn12YXIgZz1kLmRlYnVnLGg9ZC5vcGVuVGFnLGk9ZC5jbG9zZVRhZyxqPWQucGFyc2VyLGs9ZC5jb21wcmVzcyxsPWQuZXNjYXBlLG09MSxwPXskZGF0YToxLCRmaWxlbmFtZToxLCR1dGlsczoxLCRoZWxwZXJzOjEsJG91dDoxLCRsaW5lOjF9LHE9XCJcIi50cmltLHM9cT9bXCIkb3V0PScnO1wiLFwiJG91dCs9XCIsXCI7XCIsXCIkb3V0XCJdOltcIiRvdXQ9W107XCIsXCIkb3V0LnB1c2goXCIsXCIpO1wiLFwiJG91dC5qb2luKCcnKVwiXSx0PXE/XCIkb3V0Kz10ZXh0O3JldHVybiAkb3V0O1wiOlwiJG91dC5wdXNoKHRleHQpO1wiLHU9XCJmdW5jdGlvbigpe3ZhciB0ZXh0PScnLmNvbmNhdC5hcHBseSgnJyxhcmd1bWVudHMpO1wiK3QrXCJ9XCIsdj1cImZ1bmN0aW9uKGZpbGVuYW1lLGRhdGEpe2RhdGE9ZGF0YXx8JGRhdGE7dmFyIHRleHQ9JHV0aWxzLiRpbmNsdWRlKGZpbGVuYW1lLGRhdGEsJGZpbGVuYW1lKTtcIit0K1wifVwiLHc9XCIndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycyxcIisoZz9cIiRsaW5lPTAsXCI6XCJcIikseD1zWzBdLHk9XCJyZXR1cm4gbmV3IFN0cmluZyhcIitzWzNdK1wiKTtcIjtyKGMuc3BsaXQoaCksZnVuY3Rpb24oYSl7YT1hLnNwbGl0KGkpO3ZhciBiPWFbMF0sYz1hWzFdOzE9PT1hLmxlbmd0aD94Kz1lKGIpOih4Kz1mKGIpLGMmJih4Kz1lKGMpKSl9KTt2YXIgej13K3greTtnJiYoej1cInRyeXtcIit6K1wifWNhdGNoKGUpe3Rocm93IHtmaWxlbmFtZTokZmlsZW5hbWUsbmFtZTonUmVuZGVyIEVycm9yJyxtZXNzYWdlOmUubWVzc2FnZSxsaW5lOiRsaW5lLHNvdXJjZTpcIitiKGMpK1wiLnNwbGl0KC9cXFxcbi8pWyRsaW5lLTFdLnJlcGxhY2UoL15cXFxccysvLCcnKX07fVwiKTt0cnl7dmFyIEE9bmV3IEZ1bmN0aW9uKFwiJGRhdGFcIixcIiRmaWxlbmFtZVwiLHopO3JldHVybiBBLnByb3RvdHlwZT1uLEF9Y2F0Y2goQil7dGhyb3cgQi50ZW1wPVwiZnVuY3Rpb24gYW5vbnltb3VzKCRkYXRhLCRmaWxlbmFtZSkge1wiK3orXCJ9XCIsQn19dmFyIGQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYj9xKGIse2ZpbGVuYW1lOmF9KTpnKGEsYil9O2QudmVyc2lvbj1cIjMuMC4wXCIsZC5jb25maWc9ZnVuY3Rpb24oYSxiKXtlW2FdPWJ9O3ZhciBlPWQuZGVmYXVsdHM9e29wZW5UYWc6XCI8JVwiLGNsb3NlVGFnOlwiJT5cIixlc2NhcGU6ITAsY2FjaGU6ITAsY29tcHJlc3M6ITEscGFyc2VyOm51bGx9LGY9ZC5jYWNoZT17fTtkLnJlbmRlcj1mdW5jdGlvbihhLGIpe3JldHVybiBxKGEsYil9O3ZhciBnPWQucmVuZGVyRmlsZT1mdW5jdGlvbihhLGIpe3ZhciBjPWQuZ2V0KGEpfHxwKHtmaWxlbmFtZTphLG5hbWU6XCJSZW5kZXIgRXJyb3JcIixtZXNzYWdlOlwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtyZXR1cm4gYj9jKGIpOmN9O2QuZ2V0PWZ1bmN0aW9uKGEpe3ZhciBiO2lmKGZbYV0pYj1mW2FdO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGRvY3VtZW50KXt2YXIgYz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChhKTtpZihjKXt2YXIgZD0oYy52YWx1ZXx8Yy5pbm5lckhUTUwpLnJlcGxhY2UoL15cXHMqfFxccyokL2csXCJcIik7Yj1xKGQse2ZpbGVuYW1lOmF9KX19cmV0dXJuIGJ9O3ZhciBoPWZ1bmN0aW9uKGEsYil7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIGEmJihiPXR5cGVvZiBhLFwibnVtYmVyXCI9PT1iP2ErPVwiXCI6YT1cImZ1bmN0aW9uXCI9PT1iP2goYS5jYWxsKGEpKTpcIlwiKSxhfSxpPXtcIjxcIjpcIiYjNjA7XCIsXCI+XCI6XCImIzYyO1wiLCdcIic6XCImIzM0O1wiLFwiJ1wiOlwiJiMzOTtcIixcIiZcIjpcIiYjMzg7XCJ9LGo9ZnVuY3Rpb24oYSl7cmV0dXJuIGlbYV19LGs9ZnVuY3Rpb24oYSl7cmV0dXJuIGgoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csail9LGw9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oYSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09e30udG9TdHJpbmcuY2FsbChhKX0sbT1mdW5jdGlvbihhLGIpe3ZhciBjLGQ7aWYobChhKSlmb3IoYz0wLGQ9YS5sZW5ndGg7ZD5jO2MrKyliLmNhbGwoYSxhW2NdLGMsYSk7ZWxzZSBmb3IoYyBpbiBhKWIuY2FsbChhLGFbY10sYyl9LG49ZC51dGlscz17JGhlbHBlcnM6e30sJGluY2x1ZGU6Zywkc3RyaW5nOmgsJGVzY2FwZTprLCRlYWNoOm19O2QuaGVscGVyPWZ1bmN0aW9uKGEsYil7b1thXT1ifTt2YXIgbz1kLmhlbHBlcnM9bi4kaGVscGVycztkLm9uZXJyb3I9ZnVuY3Rpb24oYSl7dmFyIGI9XCJUZW1wbGF0ZSBFcnJvclxcblxcblwiO2Zvcih2YXIgYyBpbiBhKWIrPVwiPFwiK2MrXCI+XFxuXCIrYVtjXStcIlxcblxcblwiO1wib2JqZWN0XCI9PXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLmVycm9yKGIpfTt2YXIgcD1mdW5jdGlvbihhKXtyZXR1cm4gZC5vbmVycm9yKGEpLGZ1bmN0aW9uKCl7cmV0dXJuXCJ7VGVtcGxhdGUgRXJyb3J9XCJ9fSxxPWQuY29tcGlsZT1mdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGQoYyl7dHJ5e3JldHVybiBuZXcgaShjLGgpK1wiXCJ9Y2F0Y2goZCl7cmV0dXJuIGIuZGVidWc/cChkKSgpOihiLmRlYnVnPSEwLHEoYSxiKShjKSl9fWI9Ynx8e307Zm9yKHZhciBnIGluIGUpdm9pZCAwPT09YltnXSYmKGJbZ109ZVtnXSk7dmFyIGg9Yi5maWxlbmFtZTt0cnl7dmFyIGk9YyhhLGIpfWNhdGNoKGope3JldHVybiBqLmZpbGVuYW1lPWh8fFwiYW5vbnltb3VzXCIsai5uYW1lPVwiU3ludGF4IEVycm9yXCIscChqKX1yZXR1cm4gZC5wcm90b3R5cGU9aS5wcm90b3R5cGUsZC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBpLnRvU3RyaW5nKCl9LGgmJmIuY2FjaGUmJihmW2hdPWQpLGR9LHI9bi4kZWFjaCxzPVwiYnJlYWssY2FzZSxjYXRjaCxjb250aW51ZSxkZWJ1Z2dlcixkZWZhdWx0LGRlbGV0ZSxkbyxlbHNlLGZhbHNlLGZpbmFsbHksZm9yLGZ1bmN0aW9uLGlmLGluLGluc3RhbmNlb2YsbmV3LG51bGwscmV0dXJuLHN3aXRjaCx0aGlzLHRocm93LHRydWUsdHJ5LHR5cGVvZix2YXIsdm9pZCx3aGlsZSx3aXRoLGFic3RyYWN0LGJvb2xlYW4sYnl0ZSxjaGFyLGNsYXNzLGNvbnN0LGRvdWJsZSxlbnVtLGV4cG9ydCxleHRlbmRzLGZpbmFsLGZsb2F0LGdvdG8saW1wbGVtZW50cyxpbXBvcnQsaW50LGludGVyZmFjZSxsb25nLG5hdGl2ZSxwYWNrYWdlLHByaXZhdGUscHJvdGVjdGVkLHB1YmxpYyxzaG9ydCxzdGF0aWMsc3VwZXIsc3luY2hyb25pemVkLHRocm93cyx0cmFuc2llbnQsdm9sYXRpbGUsYXJndW1lbnRzLGxldCx5aWVsZCx1bmRlZmluZWRcIix0PS9cXC9cXCpbXFx3XFxXXSo/XFwqXFwvfFxcL1xcL1teXFxuXSpcXG58XFwvXFwvW15cXG5dKiR8XCIoPzpbXlwiXFxcXF18XFxcXFtcXHdcXFddKSpcInwnKD86W14nXFxcXF18XFxcXFtcXHdcXFddKSonfFxccypcXC5cXHMqWyRcXHdcXC5dKy9nLHU9L1teXFx3JF0rL2csdj1uZXcgUmVnRXhwKFtcIlxcXFxiXCIrcy5yZXBsYWNlKC8sL2csXCJcXFxcYnxcXFxcYlwiKStcIlxcXFxiXCJdLmpvaW4oXCJ8XCIpLFwiZ1wiKSx3PS9eXFxkW14sXSp8LFxcZFteLF0qL2cseD0vXiwrfCwrJC9nLHk9L14kfCwrLztlLm9wZW5UYWc9XCJ7e1wiLGUuY2xvc2VUYWc9XCJ9fVwiO3ZhciB6PWZ1bmN0aW9uKGEsYil7dmFyIGM9Yi5zcGxpdChcIjpcIiksZD1jLnNoaWZ0KCksZT1jLmpvaW4oXCI6XCIpfHxcIlwiO3JldHVybiBlJiYoZT1cIiwgXCIrZSksXCIkaGVscGVycy5cIitkK1wiKFwiK2ErZStcIilcIn07ZS5wYXJzZXI9ZnVuY3Rpb24oYSl7YT1hLnJlcGxhY2UoL15cXHMvLFwiXCIpO3ZhciBiPWEuc3BsaXQoXCIgXCIpLGM9Yi5zaGlmdCgpLGU9Yi5qb2luKFwiIFwiKTtzd2l0Y2goYyl7Y2FzZVwiaWZcIjphPVwiaWYoXCIrZStcIil7XCI7YnJlYWs7Y2FzZVwiZWxzZVwiOmI9XCJpZlwiPT09Yi5zaGlmdCgpP1wiIGlmKFwiK2Iuam9pbihcIiBcIikrXCIpXCI6XCJcIixhPVwifWVsc2VcIitiK1wie1wiO2JyZWFrO2Nhc2VcIi9pZlwiOmE9XCJ9XCI7YnJlYWs7Y2FzZVwiZWFjaFwiOnZhciBmPWJbMF18fFwiJGRhdGFcIixnPWJbMV18fFwiYXNcIixoPWJbMl18fFwiJHZhbHVlXCIsaT1iWzNdfHxcIiRpbmRleFwiLGo9aCtcIixcIitpO1wiYXNcIiE9PWcmJihmPVwiW11cIiksYT1cIiRlYWNoKFwiK2YrXCIsZnVuY3Rpb24oXCIraitcIil7XCI7YnJlYWs7Y2FzZVwiL2VhY2hcIjphPVwifSk7XCI7YnJlYWs7Y2FzZVwiZWNob1wiOmE9XCJwcmludChcIitlK1wiKTtcIjticmVhaztjYXNlXCJwcmludFwiOmNhc2VcImluY2x1ZGVcIjphPWMrXCIoXCIrYi5qb2luKFwiLFwiKStcIik7XCI7YnJlYWs7ZGVmYXVsdDppZigvXlxccypcXHxcXHMqW1xcd1xcJF0vLnRlc3QoZSkpe3ZhciBrPSEwOzA9PT1hLmluZGV4T2YoXCIjXCIpJiYoYT1hLnN1YnN0cigxKSxrPSExKTtmb3IodmFyIGw9MCxtPWEuc3BsaXQoXCJ8XCIpLG49bS5sZW5ndGgsbz1tW2wrK107bj5sO2wrKylvPXoobyxtW2xdKTthPShrP1wiPVwiOlwiPSNcIikrb31lbHNlIGE9ZC5oZWxwZXJzW2NdP1wiPSNcIitjK1wiKFwiK2Iuam9pbihcIixcIikrXCIpO1wiOlwiPVwiK2F9cmV0dXJuIGF9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZT9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gZH0pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWQ6dGhpcy50ZW1wbGF0ZT1kfSgpOyJdfQ==
