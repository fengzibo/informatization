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
            $("select").select2();
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
    //专业认知调用页面方法
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
    ifiationajax11: function () {
        var x =[ '/html/teaching-resources-teacher.html','/html/teaching-tool.html','/html/personal-resources-teacher.html'];
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
            $("select").select2();
        })
    },
    ifiationajax10: function () {
        var x =[ '/html/on-display-teacher.html','/html/test-scores-query.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
            $("select").select2();
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
        })

    },
    //组员所有功能
    teamfuc: function () {
        $('.crew-menu').on('click', function (e) {
            if($('.crew-content').is(':hidden')){
                $(this).find('span').css({backgroundColor:"#ff503f",color:"#ffffff"})
                $(this).find('span').stop().animate({height:'702px'},300);
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
                        var theEvent = window.event || event;
                        var code = theEvent.keyCode || theEvent.which;
                        if(code == 13){
                            send_mes();
                            return false;
                        }
                    });
                    texra.keyup(function (event) {
                        var theEvent = window.event || event;
                        var code = theEvent.keyCode || theEvent.which;
                        if(code == 13){
                            texra.val('');
                            return false;
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
    },
    //侧边栏课程菜单
    sider_menu: function () {
        $('.course-item ul li>a').on('click', function (event) {
            if($(this).next('.item-child').is(":hidden")){
                $('.item-child').stop().slideUp();
                $('.course-item ul li>a').removeClass('current');
                $(this).next('.item-child').stop().slideDown();
                $(this).addClass('current');
            }else {
                $('.item-child').stop().slideUp();
                $('.course-item ul li>a').removeClass('current');
            }
            event.stopPropagation();
        })
        $(window).scroll(function(e){
            var doctop = $(document).scrollTop();
            if(doctop>200 && doctop<$('body').height()){
                $('.course-menu-box').stop().animate({top:doctop},100);
            }else {
                $('.course-menu-box').stop().animate({top:'180px'},100);
            }
            if(doctop>100 && doctop<$('body').height()){
                $('.conversation-box').stop().animate({top:doctop-150},100);
            }else {
                $('.conversation-box').stop().animate({top:0},100);
            }
            e.stopPropagation();
        })
        $('.course-menu').on('click',function(event){

            if($(this).next('.course-item').is(':hidden')){
                $(this).next('.course-item').stop().show(300);
                $(this).find('i').removeClass('icon-left').addClass('icon-right');
            }else {
                $(this).next('.course-item').stop().hide(300);
                $(this).find('i').removeClass('icon-right').addClass('icon-left');
            }
            event.stopPropagation();
        })
    },
    //领取任务
    get_task: function () {
        $('.table-for-task tr td button').on('click',function(){
            var thisindex = $(this).parent().index();
            $(this).addClass('btncolor getcur').text('已领取').css({border:'0'});
            $(this).prev('.get-number').find('span').css({color:'#ffffff'});
            $('.table-for-task tr td').each(function () {
                if($(this).index() == thisindex){
                    $(this).css({
                        backgroundColor: '#ff503f',
                        color: '#ffffff',
                        borderColor: '#ff503f'
                    })
                }
            })
        })
    },
    //教师端专业认知调用页面方法
    ifiationajax5: function () {
        var x =[ '/html/student-control.html','/html/course-introduction-teacher.html','/html/process-perception-teacher.html','/html/raise-teacher.html','/html/physical-simulation-teacher.html','/html/field-work-teacher.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
            $("select").select2();
        })
    },
    //教师端专业认知js
    control:function(){
        $('.tea-ify ul li').on('click',function(){
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.tea-table').eq(thisi).stop().show(400).siblings('.tea-table').hide(400);
            function timemsg(){
                var t = setTimeout(function () {
                    Common.footerbottom();
                },400);
            }
            timemsg();
        });
        $("select").select2();
        $('.edhca-show').on('click',function(){
            $('.educa-hide').show();
            Common.footerbottom();
        })
    },
    //理实一体>学生管控
    ifiationajax6: function () {
        var x =[ '/html/raise-teacher.html','/html/prepare-lessons.html'];
        $('.modal4 li').click(function () {
            var thisi = $(this).index();
            $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
            $("select").select2();
        })
    },
    //理实一体>学生管控
    ifiationajax7: function () {
        var x =[ '/html/physical-simulation-teacher.html','/html/phy-pre-lessons.html'];
        $('.modal5 li').click(function () {
            var thisi = $(this).index();
            $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
        })
    },
    //教学过程步骤
    step:function (){
        var next = $('#step-next');
        var prev = $('#step-prev');
        var finish = $('.step-finish')
        var _Link = $('.step-btn-box a');
        var step_tab = $('.step-content')
        step_tab.eq(0).addClass('current');
        var now =  parseInt(step_tab.index($('.step-content.current')));
        _Link.eq(0).addClass('current');
        function process(_now,_Prev,_Next){
            _Link.eq(_now).addClass('current');
            step_tab.eq(_now).stop().slideDown().siblings(step_tab).stop().slideUp();
            step_tab.eq(_now).addClass('current').siblings(step_tab).removeClass('current');
            var total = parseInt(step_tab.length - 1);
            if(_now == 0){
                _Prev.hide();
                _Next.show();
            }
            else if(_now == total-1){
                _Prev.show();
                _Next.hide();
                finish.show();
            }
            else if(_now == total){
                _Prev.show();
                _Next.hide();
                finish.hide();
            }
            else {
                _Prev.show();
                _Next.show();
                finish.hide();
            }
        }
        process(0,prev,next);
        next.click(function(){
            process(now+1,prev,next);
            now =  parseInt(step_tab.index($('.step-content.current')));
        });
        prev.click(function(){
            process(now-1,prev,next);
            if(now <= 3){
                _Link.eq(now).removeClass('current');
            }
            now =  parseInt(step_tab.index($('.step-content.current')));
        })
        _Link.click(function(){
            var that = $(this);
            now =  parseInt(that.index());
            _Link.removeClass('current');
            for(var i=0;i<now;i++){
                _Link.eq(i).addClass('current');
            };
            process(now,prev,next);
        })
        finish.click(function () {
            process(now+1,prev,next);
            now =  parseInt(step_tab.index($('.step-content.current')));
        })

    },
    //全选
    checkall: function () {
        $('.checkall').find('input').click(function () {
            $("input[name='zy']").prop('checked',this.checked);
        });
        $("input[name='zy']").click(function () {
            var izy = $("input[name='zy']");
            $('.checkall').find('input').prop('checked', izy.length == izy.filter(':checked').length ? true : false);
        });
    },
    //教师端小组
    teamfuc_teacher: function () {
        $('.crew-menu').on('click', function (e) {
            if($('.crew-content').is(':hidden')){
                $(this).find('span').css({backgroundColor:"#ff503f",color:"#ffffff"})
                $(this).find('span').stop().animate({height:'702px'},300);
                $('.crew-content').stop().show(300);
                $('.task-back').on('click',function(e){
                    $('.task-main').hide();
                    $('.team-discuss').hide();
                    $('.team-discuss2').hide();
                    $('.team-discuss3').hide();
                    $('.task-item').show();
                    e.stopPropagation();
                });
                function ulw(obj){
                    var ulwidth = 0;
                    $(obj).each(function () {
                        ulwidth = ulwidth +parseInt($(this).outerWidth(true));
                    });
                    $(obj).parent('ul').width(ulwidth);
                }
                ulw('.file-item .x-scroll ul.annex li');
                ulw('.team-discuss .x-scroll ul.annex li');
                ulw('.team-discuss2 .x-scroll ul.annex li');
                ulw('.discuss3-mod1 .x-scroll ul.annex li');
                ulw('.discuss3-mod2 .x-scroll ul.annex li');
                $('.examine-discuss').on('click',function(e){
                    $('.team-discuss3').hide();
                    $('.task-main').show();
                    Common.tabcut2();
                    var texra = $('.input-content textarea.dis-mes-val');
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
                            texra.val(' ');
                        };
                    };


                    $('.sendbox a').on('click', function () {
                        send_mes();
                    })
                    texra.keydown(function (event) {
                        var theEvent = window.event || event;
                        var code = theEvent.keyCode || theEvent.which;
                        if(code == 13){
                            send_mes();
                            return false;
                        }
                    });
                    texra.keyup(function () {
                        var theEvent = window.event || event;
                        var code = theEvent.keyCode || theEvent.which;
                        if(code == 13){
                            texra.val('');
                            return false;
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
                $('.team-stduy').click(function () {
                    $('.task-item').hide();
                    $('.team-discuss').show();
                });
                $('.team-simulate').click(function () {
                    $('.task-item').hide();
                    $('.team-discuss2').show();
                });
                $('.already-get').click(function () {
                    $('.task-item').hide();
                    $('.team-discuss3').show();
                });
                $('.team-discuss3 .discuss3-modle-box .member span').on('click', function () {
                    $(this).addClass('current').siblings('span').removeClass('current');
                })
            }else {
                $(this).find('span').css({backgroundColor:"#e8e8e8",color:"#3c3c3c"})
                $(this).find('span').stop().animate({height:'150px'},300);
                $('.crew-content').stop().hide(300);
            };
            e.stopPropagation();
        });
    },
    //删除
    removed: function () {
        $('li').on('click','.icon-remove', function () {
            var thatp = $(this).parent();
            $('#confirm-box').show(500);
            $('.confirm-remove').click(function () {
                $(this).parents('.layer-box').hide();
                thatp.fadeTo('fast',0.01, function () {
                    $(this).slideUp('fast', function () {
                        $(this).remove();
                    })
                })
            });
            $('.closelayer').click(function () {
                $(this).parents('.layer-box').hide();
            })
        })
    },
    //添加
    add_ele: function () {
        $('.add-learn-btn').on('click', function () {
            var html = "<li><span>sdsfsf</span><i class='iconfont icon-remove'></i></li>";
            $(this).prev('.add-task-item').append(html);
        })
    },
    ifiationajax8: function () {
        var x =[ '/html/examination.html','/html/question-bank.html'];
        $('.titlenav2 a').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.ification-content').html(Common.commonblock(x[thisi]));
            Common.footerbottom();
        })
    },
    //select动态加载
    dynamic_select: function (url,sId) {
        $.get(url, function (result) {
            var obj = data = JSON.parse(result);
            //result="{resultObject:{[{vlaue:1,text:男},vlaue:2,text:女}]}}"
            var str =  "<option value='请选择' selected='selected'>请选择</option>";
            var list = obj.resultObject;
            for (var i = 0; i < list.length;i++) {
                var opt = list[i];
                str += "<option value='" + opt.value + "'>" + opt.text + "<option>";
            }
            $("#" + sId).html(str);
        });
    },
    ifiationajaxforsj: function () {
        var x =[ '/html/admin-syjy.html','/html/admin-xyxz.html','/html/admin-xxzl.html','/html/admin-bxbg.html'];
        $('.cognition li').click(function () {
            var thisi = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');
            $('.cognition-main').html(Common.commonblock(x[thisi]));
        })
    },
    listselect:function(){
        var id =  '1';
        var sexmap = "[{value:1,text:'男'},{value:2,text:'女'}]";
        var lissex = eval("("+sexmap+")");
        for(var i = 0;i<lissex.length;i++){
            if(id == lissex[i].value){
                $('#testtd').html(lissex[i].text);
            }
        }

    }
}