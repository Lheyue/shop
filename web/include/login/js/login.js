(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function (){
	var user = $('#cycang_user');
	var pwd = $('#cycang_pwd');
	var uIcon = $('.c_user_logo');
	var pIcon = $('.c_pwd_logo');

	//获得url中指定的字符串
	// var getQueryString = function(name){
	// 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	// 	var r = window.location.search.substr(1).match(reg);
	// 	if(r!=null){
	// 		return  unescape(r[2])
	// 	}else{
	// 		return "";
	// 	}
	// }
	// var referrer = getQueryString('redirect_url');

	var referrer = document.referrer;

	$('body').on('click','.c_login_input',function(){
		user.removeClass('ipt_error');
		uIcon.removeClass('ipt_error');
		pwd.removeClass('ipt_error');
		pIcon.removeClass('ipt_error');

	}).on('click','#login-btn',function(){
		var loginUrl = $('#J_login_url').val();
		var params = {};
		params.cycang_user = user.val();
		params.cycang_pwd = pwd.val();
		params.captcha = $('#code').val();

		if ( !params.cycang_user ) {
			uIcon.addClass('ipt_error');
			user.addClass('ipt_error');
			user.attr('placeholder', '用户名不能为空哦');
			return false;
		}
		if ( !params.cycang_pwd ) {
			pIcon.addClass('ipt_error');
			pwd.addClass('ipt_error');
			pwd.attr('placeholder', '输入密码才能登录哦');
			return false;
		}
		$.ajax({
			url: loginUrl,
			type: 'POST',
			dataType: 'json',
			data: params,
			success: function(logData){
				if( logData.code == 200 ){
					window.location.href = referrer;
				}else{
					alert(logData.result);
				}
			},
			error: function(){
				alert('未知错误，请重新尝试');
				window.location.reload();
			}
		})

	}).on('click','.c_fake_a',function(e){
		e.preventDefault();
	})

	});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjeWh1Yi9wYy9QdWJsaWMvc3JjL2pzL2kvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZnVuY3Rpb24gKCl7XHJcblx0dmFyIHVzZXIgPSAkKCcjY3ljYW5nX3VzZXInKTtcclxuXHR2YXIgcHdkID0gJCgnI2N5Y2FuZ19wd2QnKTtcclxuXHR2YXIgdUljb24gPSAkKCcuY191c2VyX2xvZ28nKTtcclxuXHR2YXIgcEljb24gPSAkKCcuY19wd2RfbG9nbycpO1xyXG5cclxuXHQvL+iOt+W+l3VybOS4reaMh+WumueahOWtl+espuS4slxyXG5cdC8vIHZhciBnZXRRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdC8vIFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiKyBuYW1lICtcIj0oW14mXSopKCZ8JClcIik7XHJcblx0Ly8gXHR2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XHJcblx0Ly8gXHRpZihyIT1udWxsKXtcclxuXHQvLyBcdFx0cmV0dXJuICB1bmVzY2FwZShyWzJdKVxyXG5cdC8vIFx0fWVsc2V7XHJcblx0Ly8gXHRcdHJldHVybiBcIlwiO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH1cclxuXHQvLyB2YXIgcmVmZXJyZXIgPSBnZXRRdWVyeVN0cmluZygncmVkaXJlY3RfdXJsJyk7XHJcblxyXG5cdHZhciByZWZlcnJlciA9IGRvY3VtZW50LnJlZmVycmVyO1xyXG5cclxuXHQkKCdib2R5Jykub24oJ2NsaWNrJywnLmNfbG9naW5faW5wdXQnLGZ1bmN0aW9uKCl7XHJcblx0XHR1c2VyLnJlbW92ZUNsYXNzKCdpcHRfZXJyb3InKTtcclxuXHRcdHVJY29uLnJlbW92ZUNsYXNzKCdpcHRfZXJyb3InKTtcclxuXHRcdHB3ZC5yZW1vdmVDbGFzcygnaXB0X2Vycm9yJyk7XHJcblx0XHRwSWNvbi5yZW1vdmVDbGFzcygnaXB0X2Vycm9yJyk7XHJcblxyXG5cdH0pLm9uKCdjbGljaycsJyNsb2dpbi1idG4nLGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbG9naW5VcmwgPSAkKCcjSl9sb2dpbl91cmwnKS52YWwoKTtcclxuXHRcdHZhciBwYXJhbXMgPSB7fTtcclxuXHRcdHBhcmFtcy5jeWNhbmdfdXNlciA9IHVzZXIudmFsKCk7XHJcblx0XHRwYXJhbXMuY3ljYW5nX3B3ZCA9IHB3ZC52YWwoKTtcclxuXHRcdHBhcmFtcy5jYXB0Y2hhID0gJCgnI2NvZGUnKS52YWwoKTtcclxuXHJcblx0XHRpZiAoICFwYXJhbXMuY3ljYW5nX3VzZXIgKSB7XHJcblx0XHRcdHVJY29uLmFkZENsYXNzKCdpcHRfZXJyb3InKTtcclxuXHRcdFx0dXNlci5hZGRDbGFzcygnaXB0X2Vycm9yJyk7XHJcblx0XHRcdHVzZXIuYXR0cigncGxhY2Vob2xkZXInLCAn55So5oi35ZCN5LiN6IO95Li656m65ZOmJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmICggIXBhcmFtcy5jeWNhbmdfcHdkICkge1xyXG5cdFx0XHRwSWNvbi5hZGRDbGFzcygnaXB0X2Vycm9yJyk7XHJcblx0XHRcdHB3ZC5hZGRDbGFzcygnaXB0X2Vycm9yJyk7XHJcblx0XHRcdHB3ZC5hdHRyKCdwbGFjZWhvbGRlcicsICfovpPlhaXlr4bnoIHmiY3og73nmbvlvZXlk6YnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiBsb2dpblVybCxcclxuXHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRkYXRhOiBwYXJhbXMsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGxvZ0RhdGEpe1xyXG5cdFx0XHRcdGlmKCBsb2dEYXRhLmNvZGUgPT0gMjAwICl7XHJcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZmVycmVyO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0YWxlcnQobG9nRGF0YS5yZXN1bHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0YWxlcnQoJ+acquefpemUmeivr++8jOivt+mHjeaWsOWwneivlScpO1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0fSkub24oJ2NsaWNrJywnLmNfZmFrZV9hJyxmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9KVxyXG5cclxuXHR9KTsiXX0=
