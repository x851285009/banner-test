var container = document.getElementById('container'),//获取父级控制器容器
    ul = document.getElementById('banner'),//获取图片容器
    prev = document.getElementById('prev'),//获取上一张按钮
    next = document.getElementById('next'),//获取下一张按钮
    indicatorItem = document.getElementById('indicator').getElementsByTagName('i'),//获取圆点存入数组
    index = 0,//创建图片索引默认为0表示为展示第一张
    timer;//存储计时器

//获取父级容器的宽度
var containerStyle = window.getComputedStyle(container,null);
var width = parseInt(containerStyle.width);
//获取图片容器内子元素的个数
var num = ul.childElementCount;
//阻止<a>标签的默认行为
prev.addEventListener('click',function (event) {
    event.preventDefault();
});
next.addEventListener('click',function (event) {
    event.preventDefault();
});
//圆点跟随显示
function indicatorA() {
    for(var i=0; i<indicatorItem.length; i++){
       if(indicatorItem[i].className == 'indicator-item indicator-item-active'){
           indicatorItem[i].className = 'indicator-item';
           break;
       }
    }
    indicatorItem[index].className = 'indicator-item indicator-item-active';
}
//点击圆点切换图片
for(var i=0; i<indicatorItem.length; i++){
    /*
      *利用闭包解决for循环中的由for语句创建的变量i即使在for循环执行结束后
      *也依旧会存在于循环外部的执行环境中的问题
     */
    (function (i) {
        indicatorItem[i].onclick = function () {
            var clickIndex = i;
            index = clickIndex;
            if(this.className == 'indicator-item indicator-item-active'){
                return;
               }
            //无缝切换动画
            var ulStyle = window.getComputedStyle(ul,null);
            var startLeft = parseInt(ulStyle.left);
            var endLeft = -width * index;
            var left = startLeft;
            if(startLeft > endLeft){
                var timer = setInterval(function(){
                    left -=79;
                    ul.style.left = left + 'px';
                    if (left <= endLeft){
                        clearInterval(timer);
                    }
                },25);
            } else {
                var timer = setInterval(function(){
                    left +=79;
                    ul.style.left = left + 'px';
                    if (left >= endLeft){
                        clearInterval(timer);
                    }
                },25);
            }
            indicatorA();
           }
        }
    )(i);
}
//点击前一张
prev.onclick = function () {
    index--;
    if(index < 0){
        index = num -1;
    }
    //无缝切换动画
    var ulStyle = window.getComputedStyle(ul,null);
    var startLeft = parseInt(ulStyle.left);
    var endLeft = -width * index;
    var left = startLeft;
    if(index == 7){
        var timer = setInterval(function(){
            left -=553;
            ul.style.left = left + 'px';
            if (left <= endLeft){
                clearInterval(timer);
            }
        },25);
    }else{
        var timer = setInterval(function(){
            left +=79;
            ul.style.left = left + 'px';
            if (left >= endLeft){
                clearInterval(timer);
            }
        },30);
    }
    indicatorA();
};
//点击后一张
next.onclick = function () {
    index++;
    if(index > (num-1)){
        index = 0;
    }
    //无缝切换动画
    var ulStyle = window.getComputedStyle(ul,null);
    var startLeft = parseInt(ulStyle.left);
    var endLeft = -width * index;
    var left = startLeft;
    if(index == 0){
        var timer = setInterval(function(){
            left +=553;
            ul.style.left = left + 'px';
            if (left >= endLeft){
                clearInterval(timer);
            }
        },25);
    }else{
        var timer = setInterval(function(){
            left -=79;
            ul.style.left = left + 'px';
            if (left <= endLeft){
                clearInterval(timer);
            }
        },30);
    }
    indicatorA();
};
function play() {
    timer = setInterval(function () {
    next.onclick();
    },4000);
}
function stop() {
    clearInterval(timer);
}
container.onmouseover = stop;
container.onmouseout = play;
play();