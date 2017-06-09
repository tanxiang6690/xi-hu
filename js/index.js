

// 手动配置轮播并且规定轮播时间；主轮播
$('.carousel-nav').carousel({
    interval: 1000
});

// 手动配置轮播并且规定轮播时间；学校环境
$('.school-carouselr').carousel({
    interval:2000
});

// 手动配置轮播并且规定轮播时间；优秀学员
$('.star-carouselr').carousel({
    interval:1000
});

// 手动调用多图轮播
// 学校活动
$(".setting-list").kxbdMarquee();

// 就业明星
$(".setting-star-list").kxbdMarquee();

// 优秀教师展示
$('#setting-tech').scrollbox({
    direction: 'h',
    distance: 239,
    speed: 100
});




// you的选项卡切换
var detailTab = $(('a') ,$('.you-detail'));
var panels = $(('.panels') ,$('.you-detail-panel'));
detailTab.hover(function () {
    var index = detailTab.index(this);
    // 判断是否为动画状态阻止鼠标连续滑过事件
    if (!(panels.eq(index)).is(':animated')) panels.eq(index).toggleClass('active').slideDown().siblings().slideUp();
})

/*
* 不间断滚动函数
* obj = slide(最外层)
* obj1 = slide;
*obj2 = slide2,；
*speed = sppeed;
*/
function itemUp (obj, obj1, obj2, speed) {
    var speed = speed;
    var slide = document.getElementById(obj);
    var slide1 = document.getElementById(obj1);
    var slide2 = document.getElementById(obj2);
    // console.log(slide2);
    slide2.innerHTML = slide1.innerHTML;
    function Marquee(){
        if(slide2.offsetTop - slide.scrollTop <= 0){
            slide.scrollTop -= slide1.offsetHeight;
        } else {
            slide.scrollTop++;
        }
    }
    var MyMar = setInterval(Marquee,speed);
    slide.onmouseover = function(){
        clearInterval(MyMar);
    }
    slide.onmouseout = function(){
        MyMar = setInterval(Marquee,speed);
    }
}

$(function(){
    // 开班信息不间断滚动
    itemUp("panel-b-r","scroll-item", "scroll-item2", 40);
    //
    itemUp("tech-scroll","tech-scroll-item", "tech-scroll-item2", 40);
})
























//
