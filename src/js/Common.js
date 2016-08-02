/**
 * Created by wulinbo on 16/7/25.
 */

var Common = {
    //公共ajax调用html
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
    //一直固定在底部的页脚
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
    //table切换
    tabcut: function () {
        $('.tab-title').find('a').on('click', function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.tab-content').eq(thisi).stop().fadeIn().siblings('.tab-content').fadeOut();
        })
    },
    //密码强度显示
    pasgrade: function () {
        $('.pasgrade').keyup(function () {
            if ($('.pasgrade').val().length < 6) {
                showgrade('.leave-fl:first-child', '#d7423f');
            } else if ($('.pasgrade').val().length < 9) {
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
    //始业教育调用页面方法
    ifiationajax: function () {
        var x =[ '/html/initial-educationi.html','/html/campus-pursuit.html','/html/teacher-pupil.html','/html/school-means.html','/html/write-report.html'];
        $('.ification li').click(function () {
            var thisi = $(this).index();
            $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            $(".select").select2();//select美化
            Common.footerbottom();
        })
    },
    //收藏状态
    collectState:function(){
        $('.collect').click(function(){
            var thisi = $(this).find('i')
            if(thisi.hasClass('icon-icon6')){
                thisi.removeClass('icon-icon6').addClass('icon-icon7');
                $(this).addClass('hovercolor');
            }else {
                thisi.removeClass('icon-icon7').addClass('icon-icon6');
                $(this).removeClass('hovercolor');
            }
        })
    },
    //我的首页调用页面方法
    ifiationajax2: function () {
        var x =[ '/html/initial-educationi.html','/html/course-introduction.html','/html/process-perception.html','/html/raise.html','/html/physical-simulation.html','/html/field-work.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
        })
    },
    //教学资源调用页面方法
    ifiationajax3: function () {
        var x =[ '/html/teaching-resources.html','/html/personal-resources.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
        })
    },
    //弹出层
    layer: function (ele,obj) {
        $(ele).on('click',function(){
            $(obj).show(500);
            $('.closelayer').click(function () {
                $(this).parents(obj).hide();
            })
        })
    },
    //成果管理调用页面方法
    ifiationajax4: function () {
        var x =[ '/html/on-display.html','/html/query-results.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
            $(".select").select2();
        })
    },

}
