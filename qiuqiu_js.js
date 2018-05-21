// ==UserScript==
// @name         斗鱼自动发弹幕
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  自动发送弹幕
// @author       edgar
// @match        https://www.douyu.com/*
// @match        http://www.douyu.com/*
// @match        http://www.douyu.com/t/*
// @match        https://xiu.douyu.com/*
// @match        http://xiu.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    // 随机发送的弹幕，可自行新增修改
    var danmuList = new Array(
    
        "点歌，",
        "点歌，",
        "点歌，",
        "点歌，",
        "点歌，",
        "点歌，",
        
        "OVER"
    ); 
       
    var  dm_siv = 0; // 弹幕定时接收值，用来控制定时开或关
    // 添加控制开关html
    $(function(){
        var switchHtml = '<li class="myFlLi fl assort current" style="margin-left:20px;" id="bx_switch">' +
            '<li class="myFlLi fl assort" style="height:50px;margin-left:20px" id="dm_switch">' +
            '<a href="javascript:;" data="0">发弹幕</a>' +
            '</li>';
        $(".head-nav").append(switchHtml);
        $("#header div.head").css("width", "100%");
        $("a.head-logo").css("margin-left", "30px");
        $("div.head-oth").css("margin-right", "50px");
    });
    
    dm_siv = setInterval(send, 85000);
    var maxIndex = danmuList.length;
    var curIndex = 0;
    function send() {
        var dm_switch = $("#dm_switch>a").attr("data")+"";
        if (dm_switch != "1") return;
        if (curIndex == maxIndex - 1) {
            curIndex = 0;
        }
        var danmu = danmuList[curIndex++];
        if(danmu != ""){
            $(".cs-textarea").val(danmu);
            $("div.b-btn[data-type='send']").click();
        }
    }
    
    // 弹幕开关控制
    $(document).on('click', '#dm_switch>a', function() {
		var old_switch = $("#dm_switch>a").attr("data")+"";
        if (old_switch=="1") { // 由开到关
            $("#dm_switch").removeClass("current");
            $("#dm_switch>a").attr("data", "0");
            clearInterval(dm_siv);
            
        } else {
            $("#dm_switch").addClass("current");
            $("#dm_switch>a").attr("data", "1");
            var dm_times = $(".dm_times.current").attr("data")+"";
            dm_siv = setInterval(send, 85000);
        }
	});
    

})();