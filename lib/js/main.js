
var debug = typeof window.debug != 'undefined' ? debug : true;
var conf = window.serverConfig;

function log() {
    if (debug && typeof console != 'undefined' && typeof console.log == 'function') {
        console.log.apply(console, arguments);
    }
}

$(function() {
    var $ttss_pic = $(".ttss_pic");
    //    iTrue = getCookie("username"); //随机产生1或0
    var $ttss_img = $ttss_pic.eq(0).find("img"),
        $ttss_a = $ttss_pic.eq(0).find("a");
    //    if (iTrue == 0) {
    $(".ttss_pic1").css("display", "none");
    setTimeout(change, 1000);
    //        setCookie('username', '1', '1');
    //    }

    function change() {
        $(".ttss").animate({
            height: $ttss_img.eq(0).height()
        }, 1000, function() {
            setTimeout(doMove, 1000);
        })

        function doMove() {
            $(".ttss").animate({
                height: $ttss_img.eq(1).height()
            }, 500, function() {
                $ttss_a.eq(0).animate({
                    "opacity": 0
                }, 100);
            });
        }
    };
});



    $(".sub-a").hover(function() {
        $(".sub-tips").css("display", "block");
        var _for = $(this).attr('for');
        $('.sub-tips ' + _for).show().siblings().hide();
    }, function() {
        $(".sub-tips").css("display", "none");
    });
    $(".sub-tips").hover(function() {
        $(".sub-tips").css("display", "block");
    }, function() {
        $(".sub-tips").css("display", "none");
    });


    $(".itzx-list .trl").hover(function() {
        $('.act-tre').css("display", "none");
        $(this).next().css("display", "block");
        $(this).next().addClass('act-tre');
    });

    //这个可以在自己的index.js里面调用
    // $(".setting-list").kxbdMarquee();
    // $(".video-content").kxbdMarquee();
    nav_click();




$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $('.actGotop').fadeIn(300);
        } else {
            $('.actGotop').fadeOut(300);
        }
    });
    $('.actGotop').click(function() {
        $('html,body').animate({
            scrollTop: '0px'
        }, 500);
    });
});


function nav_click() {
    $('.qyzp-nav ul li a').click(function() {
        $tab_id = $(this).attr('tab-id');
        $('.qyzp-cons div').removeClass('active');
        $('.tab' + $tab_id).addClass('active');
        $('.qyzp-nav ul li a').removeClass('active');
        $(this).addClass('active');
        return false;
    });
}



function clickVideo($video) {
    var htmlCons = "<embed src=" + $video + "allowFullScreen='true' quality='high' width='675' height='480' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>";
    showAlert(htmlCons, 'overlayQes1');
}


function showAlert(html, className) {
    $('#alert').remove();
    if (html && typeof html == 'string') {
        className = className ? ' ' + className : '';
        $(document.body).append('<div id="alert" class="alert' + className + '" style="display:none"><div>' + html + '</div><a class="closeAlert close" href="javascript:;"></a></div>');
        $('<div/>').overlay({
            closeOnClick: false,
            closeOnEsc: false,
            load: true,
            target: '#alert',
            mask: {
                color: 'black',
                loadSpeed: 200,
                opacity: 0.8
            },

        });
    }
}


$.fn.kxbdMarquee = function(options) {
    var opts = $.extend({}, $.fn.kxbdMarquee.defaults, options);

    return this.each(function() {
        var $marquee = $(this); //滚动元素容器
        var _scrollObj = $marquee.get(0); //滚动元素容器DOM
        var scrollW = $marquee.width(); //滚动元素容器的宽度
        var scrollH = $marquee.height(); //滚动元素容器的高度
        var $element = $marquee.children(); //滚动元素
        var $kids = $element.children(); //滚动子元素
        var scrollSize = 0; //滚动元素尺寸

        //滚动类型，1左右，0上下
        var _type = (opts.direction == "left" || opts.direction == "right") ? 1 : 0;

        //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
        $element.css(_type ? "width" : "height", 10000);

        //获取滚动元素的尺寸
        if (opts.isEqual) {
            scrollSize = $kids[_type ? "outerWidth" : "outerHeight"]() * $kids.length;
        } else {
            $kids.each(function() {
                scrollSize += $(this)[_type ? "outerWidth" : "outerHeight"]();
            });
        };

        //滚动元素总尺寸小于容器尺寸，不滚动
        if (scrollSize < (_type ? scrollW : scrollH)) {
            return;
        };

        //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
        $element.append($kids.clone()).css(_type ? "width" : "height", scrollSize * 2);

        var numMoved = 0;

        function scrollFunc() {
            var _dir = (opts.direction == "left" || opts.direction == "right") ? "scrollLeft" : "scrollTop";
            if (opts.loop > 0) {
                numMoved += opts.scrollAmount;
                if (numMoved > scrollSize * opts.loop) {
                    _scrollObj[_dir] = 0;
                    return clearInterval(moveId);
                };
            };

            if (opts.direction == "left" || opts.direction == "up") {
                var newPos = _scrollObj[_dir] + opts.scrollAmount;
                if (newPos >= scrollSize) {
                    newPos -= scrollSize;
                }
                _scrollObj[_dir] = newPos;
            } else {
                var newPos = _scrollObj[_dir] - opts.scrollAmount;
                if (newPos <= 0) {
                    newPos += scrollSize;
                };
                _scrollObj[_dir] = newPos;
            };
        };

        //滚动开始
        var moveId = setInterval(scrollFunc, opts.scrollDelay);

        //鼠标划过停止滚动
        $marquee.hover(function() {
            clearInterval(moveId);
        }, function() {
            clearInterval(moveId);
            moveId = setInterval(scrollFunc, opts.scrollDelay);
        });
    });
};

$.fn.kxbdMarquee.defaults = {
    isEqual: true, //所有滚动的元素长宽是否相等,true,false
    loop: 0, //循环滚动次数，0时无限
    direction: "left", //滚动方向，"left","right","up","down"
    scrollAmount: 2, //步长
    scrollDelay: 20, //时长
};

$.fn.kxbdMarquee.setDefaults = function(settings) {
    $.extend($.fn.kxbdMarquee.defaults, settings);
};

$(function() {
    //通用咨询
    $(".r_n li").mouseenter(function() {
        $(this).children("div").show();
    })
    $(".r_n li").mouseleave(function() {
        $(this).children("div").stop().hide();
    })
})
