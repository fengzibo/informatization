/**
 * Created by wulinbo on 16/7/25.
 */

var Common = {
    //公共头部
    cheader: function (whichPage) {
        var headhtml = $.ajax({
            type: "GET",
            url: "/wtindex-new/common-top.html",
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        if (whichPage != '' && whichPage != false) {
            //给选中的一级导航栏添加选中样式
            $('#navbar').find("." + whichPage).addClass('current');
        }
        return $(headhtml);
    },
    //公共尾部
    cfooter: function () {
        var foothtml = $.ajax({
            type: "GET",
            url: "/wtindex-new/common-footer.html",
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        return $(foothtml);
    },
    footerbottom: function () {
        var footerHeight = 0;
        var footerTop = 0;
        var contheight = 0;
        positionFooter();

        function positionFooter() {
            footerHeight = $(".footer").height();
            footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
            contheight = (($(window).scrollTop()+$(window).height()-footerHeight)-84)+"px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位
            if(($(document.body).height()+footerHeight) < $(window).height()) {
                $(".footer").css({ position: "absolute",left:"0" }).stop().css({top:footerTop});

            }else{
                footerTop = ($('body').height())+"px";
                $(".footer").css({ position: "absolute",left:"0" }).stop().css({top:footerTop});
            }
        }
        $(window).scroll(positionFooter).resize(positionFooter);
    }
}
