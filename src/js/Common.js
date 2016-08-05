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
    tabcut2: function () {
        $('.dis-mes-tab').find('li').on('click', function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.dispaly-message').eq(thisi).show().siblings('.dispaly-message').hide();
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
        $('.modal1 li').click(function () {
            var thisi = $(this).index();
            $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
            $(".select").select2();
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
    //倒计时
    showTime: function (time,fn) {
        function show_time(){
            if(time>=0){
                d = Math.floor(time/3600/24);
                h = Math.floor((time/3600)%24);
                m = Math.floor((time/60)%60);
                s = Math.floor(time%60);
                if(d < 10){
                    d = "0" + d;
                }
                if(h < 10){
                    h = "0" + h;
                }
                if(m < 10){
                    m = "0" + m;
                }
                if(s < 10){
                    s = "0" + s;
                }
                var msg ;
                fn(msg);
                if(time == 5*60){
                    alert('请注意,距离考试结束还有5分钟');
                }
                time--;
            }else {
                clearInterval(timer);
                alert('时间到,结束')
            }
        }
        show_time();
        var timer = setInterval(function () {
            show_time();
        },1000);
    },
    //考试题目翻页
    page_topic:function (){
        var next = $('#next-topic');
        var prev = $('#prev-topic');
        var _Link = $('.topic-item li span');
        var now =  parseInt(_Link.index($('.topic-item li span.current')));
        _Link.eq(0).addClass('current');
        function process(_now,_Prev,_Next){
            _Link.removeClass('current');
            _Link.eq(_now).addClass('current');
            var total = parseInt($('.topic-item li span').length - 1);
            if(_now == 0){
                _Prev.hide();
                _Next.show();
            }
            else if(_now == total){
                _Prev.show();
                _Next.hide();
            }
            else {
                _Prev.show();
                _Next.show();
            }
        }
        process(0,prev,next);
        next.click(function(){
            process(now+1,prev,next);
            now =  parseInt(_Link.index($('.topic-item li span.current')));
        });
        prev.click(function(){
            process(now-1,prev,next);
            now =  parseInt(_Link.index($('.topic-item li span.current')));
        })
        _Link.click(function(){
            var that = $(this);
            _Link.removeClass('current');
            that.addClass('current');
            now =  parseInt(_Link.index($('.topic-item li span.current')));
            process(now,prev,next);
            console.log(_Link.index($('.topic-item li span.current')));
        })

    },
    //组员所有功能
    teamfuc: function () {
        $('.crew-menu').on('click', function (e) {
            if($('.crew-content').is(':hidden')){
                $(this).find('span').css({backgroundColor:"#ff503f",color:"#ffffff"})
                $(this).find('span').stop().animate({height:'700px'},300);
                $('.crew-content').stop().show(300);
                $('.task-back').on('click',function(e){
                    $('.task-main').hide();
                    $('.task-item').show();
                    e.stopPropagation();
                });
                $('.task-dea ul li').on('click',function(e){
                    $('.task-item').hide();
                    $('.task-main').show();
                    Common.tabcut2();
                    var texra = $('.input-content textarea.dis-mes-val');
                    var ulwidth = 0;
                    function send_mes(){
                        if(texra.val() != ''){
                            var d = new Date();
                            var h = d.getHours();
                            var m = d.getMinutes();
                            if(h<10){
                                h = '0'+h;
                            };
                            if(m<10){
                                m = '0'+m;
                            };
                            var html = "<div class='textformes'><div class='mem-name'>sadada:</div><p>"+texra.val()+"<span>"+h+":"+m+"</span></p></div>";
                            $('.dis-mes-box').append(html);
                            texra.val('');
                        }else {
                            alert('不能发送空内容');
                            texra.val('');
                        };
                    };
                    $('.x-scroll ul.annex li').each(function () {
                        ulwidth += parseInt($(this).outerWidth(true));
                    });
                    $(".x-scroll ul.annex").width(ulwidth);
                    $('.sendbox a').on('click', function () {
                        send_mes();
                    })
                    texra.keydown(function (event) {
                        if(event.keyCode == 13){
                            send_mes();
                        }
                    });
                    $('.task-main-right ul.team-members li').on('click', function (e) {
                        $('#group-task').show();
                        $('#group-task').find('h2').html("组员["+$(this).text()+"]任务"+"<a class='iconfont icon-guanbi closelayer'>退出</a>")
                        $('.closelayer').click(function (e) {
                            $(this).parents('#group-task').hide();
                            $('.task-size .write-task').val('');
                            e.stopPropagation();
                        })
                        e.stopPropagation();
                    })
                    e.stopPropagation();
                });
            }else {
                $(this).find('span').css({backgroundColor:"#e8e8e8",color:"#3c3c3c"})
                $(this).find('span').stop().animate({height:'150px'},300);
                $('.crew-content').stop().hide(300);
            };
            e.stopPropagation();
        });
    }

}
