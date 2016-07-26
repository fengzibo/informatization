/**
 * Created by wulinbo on 16/7/25.
 */

var Common = {
    commonblock:function(href){
        var comhtml = $.ajax({
            type:"GET",
            url: href,
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        return $(comhtml);
    },
    //公共头部
    cheader: function (whichPage,href) {
        var headhtml = $.ajax({
            type: "GET",
            url: href,
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        if (whichPage != '' && whichPage != false) {
            //给选中的一级导航栏添加选中样式
            $('.nav li a').find("." + whichPage).addClass('current');
        }
        return $(headhtml);
    },
    //公共尾部
    cfooter: function () {
        var foothtml = $.ajax({
            type: "GET",
            url: "/html/Common-footer.html",
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        return $(foothtml);
    },
    footerbottom: function () {
        var footerHeight = 0;
        var footerTop = 0;
        var contheight = 0;
        positionFooter();

        function positionFooter() {
            footerHeight = $(".footer").height();
            footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
            contheight = (($(window).scrollTop() + $(window).height() - footerHeight) - 84) + "px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位
            if (($(document.body).height() + footerHeight) < $(window).height()) {
                $(".footer").css({position: "absolute", left: "0"}).stop().css({top: footerTop});

            } else {
                footerTop = ($('body').height()+20) + "px";
                $(".footer").css({position: "absolute", left: "0"}).stop().css({top: footerTop});
            }
        }

        $(window).scroll(positionFooter).resize(positionFooter);
    },
    tabcut: function () {
        $('.tab-title').find('a').on('click', function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.tab-content').eq(thisi).stop().fadeIn().siblings('.tab-content').fadeOut();
        })
    },
    pasgrade: function () {
        $('.pasgrade').keyup(function () {
            if ($('.pasgrade').val().length < 5) {
                showgrade('.leave-fl:first-child', '#d7423f');
            } else if ($('.pasgrade').val().length < 10) {
                showgrade('.leave-fl:nth-child(2)', '#edb823');
            } else {
                showgrade('.leave-fl:nth-child(3)','#28ed23');
            }
        })
        function showgrade(obj, color) {
            $('.leave-fl').find('p').css('visibility', 'hidden');
            $('.leave-fl').find('i').css('background', 'transparent');
            $(obj).find('p').css('visibility', 'visible');
            $(obj).find('i').css('background', color);
        }
    },
    ifiationajax: function () {
        var x =[ '/html/initial-educationi.html','/html/campus-pursuit.html','/html/teacher-pupil.html'];
        $('.ification li').click(function () {
            var thisi = $(this).index();
            $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            $(".select").select2();//select美化
        })
    }
}
